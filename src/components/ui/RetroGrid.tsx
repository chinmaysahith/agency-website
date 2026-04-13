"use client";

import { useEffect, useRef } from "react";

interface RetroGridProps {
  gridColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

function RetroGrid({
  gridColor = "#3b82f6",
  className = "",
  style,
}: RetroGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let dpr = 1;

    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const cellWidth = 110;
    const cellDepth = 70;
    const numCellsWide = 18;
    const numCellsDeep = 22;

    const cameraX = 0;
    const cameraY = 55;
    const cameraZ = 380;
    const focalLength = 480;

    let offset = 0;
    const speed = 1.0;

    const project = (x: number, y: number, z: number) => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const relX = x - cameraX;
      const relY = y - cameraY;
      const relZ = z - cameraZ;
      if (relZ <= 10) return null;
      const scale = focalLength / relZ;
      return {
        x: W / 2 + relX * scale,
        y: H * 0.42 - relY * scale,
        z: relZ,
      };
    };

    const drawCell = (x: number, z: number, zOff: number) => {
      if (!ctx) return;
      const az = z - zOff;
      if (az < -cellDepth || az > numCellsDeep * cellDepth) return;
      if (az < 0) return;

      const tl = project(x - cellWidth / 2, 0, az);
      const tr = project(x + cellWidth / 2, 0, az);
      const bl = project(x - cellWidth / 2, 0, az + cellDepth);
      const br = project(x + cellWidth / 2, 0, az + cellDepth);
      if (!tl || !tr || !bl || !br) return;

      const df = Math.min(1, az / (numCellsDeep * cellDepth));
      const alpha = Math.max(0.04, 0.45 * (1 - df * 0.9));
      const lw = Math.max(0.5, 1.8 * (1 - df * 0.65));

      ctx.lineWidth = lw;
      ctx.strokeStyle = gridColor;
      ctx.globalAlpha = alpha;

      ctx.beginPath();
      ctx.moveTo(bl.x, bl.y);
      ctx.lineTo(br.x, br.y);
      ctx.lineTo(tr.x, tr.y);
      ctx.lineTo(tl.x, tl.y);
      ctx.closePath();
      ctx.stroke();

      ctx.globalAlpha = 1;
    };

    const animate = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      if (!ctx) return;

      ctx.clearRect(0, 0, W, H);

      offset += speed;
      if (offset >= cellDepth) offset = 0;

      for (let row = -5; row < numCellsDeep + 5; row++) {
        const z = row * cellDepth;
        for (let col = -Math.floor(numCellsWide / 2); col <= Math.floor(numCellsWide / 2); col++) {
          drawCell(col * cellWidth, z, offset);
        }
      }

      // Soft side fades so grid doesn't cut off harshly
      const fadeW = W * 0.12;

      const leftFade = ctx.createLinearGradient(0, 0, fadeW, 0);
      leftFade.addColorStop(0, "rgba(255,255,255,0.9)");
      leftFade.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = leftFade;
      ctx.fillRect(0, 0, fadeW, H);

      const rightFade = ctx.createLinearGradient(W - fadeW, 0, W, 0);
      rightFade.addColorStop(0, "rgba(255,255,255,0)");
      rightFade.addColorStop(1, "rgba(255,255,255,0.9)");
      ctx.fillStyle = rightFade;
      ctx.fillRect(W - fadeW, 0, fadeW, H);

      // Bottom edge softening
      const btmH = H * 0.15;
      const bottomFade = ctx.createLinearGradient(0, H - btmH, 0, H);
      bottomFade.addColorStop(0, "rgba(255,255,255,0)");
      bottomFade.addColorStop(1, "rgba(255,255,255,0.7)");
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, H - btmH, W, btmH);

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [gridColor]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        ...style,
      }}
    />
  );
}

export default RetroGrid;
