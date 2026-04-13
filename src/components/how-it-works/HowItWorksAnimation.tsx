"use client";
import { useEffect, useRef } from "react";

interface Props {
  activeStep: number | null;
  resetSignal?: number;
}

export default function HowItWorksAnimation({ activeStep, resetSignal = 0 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const T = useRef(0);
  const lastT = useRef(0);
  const stepN = useRef(-1);
  const asmProgress = useRef(0);
  const asmStart = useRef<number | null>(null);
  const bpResetFlag = useRef(false);
  const prevStep = useRef<number | null>(null);

  /* sync activeStep prop → internal ref + handle resets */
  useEffect(() => {
    if (activeStep === null) {
      stepN.current = -1;
    } else {
      stepN.current = activeStep;
      if (activeStep === 0) {
        bpResetFlag.current = true;
      }
      if (activeStep === 2 && prevStep.current !== 2) {
        asmProgress.current = 0;
        asmStart.current = null;
      }
    }
    prevStep.current = activeStep;
  }, [activeStep]);

  /* handle visibility-triggered reset from parent */
  useEffect(() => {
    if (resetSignal > 0 && stepN.current === 0) {
      bpResetFlag.current = true;
    }
  }, [resetSignal]);

  /* ── canvas animation ── */
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    const W = 220, H = 300;
    const CX = 110;

    /* ── Icon geometry ── */
    const OL = 20, OR = 200;
    const OT = 40, OB = 260;
    const OAR = (OR - OL) / 2;
    const ACY = OT + OAR;
    const BCR = 7;
    const IL = 50, IR = 170;
    const IAR = (IR - IL) / 2;
    const DR = IAR;
    const DOME_SH = 95;
    const DCY = OB;

    const OUTER_LEN = 730;
    const INNER_LEN = 450;
    const DOME_LEN = 260;
    void DOME_LEN;

    /* helpers */
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const easeOut3 = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeOutBack = (t: number) => {
      const c = 2.5;
      return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
    };
    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    /* ── Path traces ── */
    function traceOuter() {
      ctx.moveTo(OL, OB - BCR);
      ctx.lineTo(OL, ACY);
      ctx.arc(CX, ACY, OAR, Math.PI, 0, false);
      ctx.lineTo(OR, OB - BCR);
      ctx.arcTo(OR, OB, OR - BCR, OB, BCR);
      ctx.lineTo(OL + BCR, OB);
      ctx.arcTo(OL, OB, OL, OB - BCR, BCR);
      ctx.closePath();
    }
    function traceInnerArch() {
      ctx.moveTo(IL, OB);
      ctx.lineTo(IL, ACY);
      ctx.arc(CX, ACY, IAR, Math.PI, 0, false);
      ctx.lineTo(IR, OB);
    }
    function traceDome() {
      ctx.ellipse(CX, DCY, DR, DOME_SH, 0, Math.PI, 0, false);
    }

    /* ─────────────────────────────────────────────────
       DORMANT — faint static outline when nothing is hovered
    ───────────────────────────────────────────────── */
    function drawDormant() {
      ctx.clearRect(0, 0, W, H);

      /* very faint grid */
      ctx.strokeStyle = "rgba(200,208,218,0.025)";
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx < W; gx += 20) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += 20) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      /* faint outline */
      ctx.strokeStyle = "rgba(200,208,218,0.3)";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.setLineDash([4, 6]);
      ctx.beginPath(); traceOuter(); ctx.stroke();
      ctx.beginPath(); traceInnerArch(); ctx.stroke();
      ctx.beginPath(); traceDome(); ctx.stroke();
      ctx.setLineDash([]);
    }

    /* ─────────────────────────────────────────────────
       STAGE 1 — Antigravity blueprint emerge
    ───────────────────────────────────────────────── */
    const bpStartRef = { v: null as number | null };
    const BP_DURATION = 3.0;

    const antigravity = (t: number): number => {
      if (t >= 1) return 1;
      if (t <= 0) return 0;
      const c = 1.2;
      return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
    };

    function drawBlueprintAnim(t: number) {
      ctx.clearRect(0, 0, W, H);

      if (bpResetFlag.current) {
        bpStartRef.v = null;
        bpResetFlag.current = false;
      }
      if (bpStartRef.v === null) bpStartRef.v = t;
      const elapsed = t - bpStartRef.v;
      const prog = Math.min(1, elapsed / BP_DURATION);

      const gridAlpha = Math.min(1, prog * 4) * 0.03;
      ctx.strokeStyle = `rgba(180,185,195,${gridAlpha})`;
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx < W; gx += 20) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += 20) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      if (prog <= 0) return;

      const riseProg = antigravity(prog);
      const yOffset = (1 - riseProg) * 60;
      const maskProg = easeOut3(Math.min(1, prog / 0.85));
      const revealH = maskProg * ((OB - OT) + 40);
      const clipY = OB - revealH;
      const alpha = Math.min(1, prog * 2);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.rect(0, Math.max(0, clipY), W, H);
      ctx.clip();
      ctx.translate(0, yOffset);

      ctx.strokeStyle = "rgba(180,185,195,0.55)";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath(); traceOuter(); ctx.stroke();
      ctx.beginPath(); traceInnerArch(); ctx.stroke();
      ctx.beginPath(); traceDome(); ctx.stroke();

      ctx.restore();
    }

    /* ─────────────────────────────────────────────────
       STAGE 2 — Blueprint Animation: looping sketch draw
    ───────────────────────────────────────────────── */
    function drawSketch(t: number) {
      ctx.clearRect(0, 0, W, H);

      const cycle = 5;
      const ct = t % cycle;
      const drawDur = 2.8, holdDur = 0.8, fadeDur = 1.4;

      let prog = 0, alpha = 1;
      if (ct < drawDur) {
        prog = easeInOut(ct / drawDur);
      } else if (ct < drawDur + holdDur) {
        prog = 1;
      } else {
        prog = 1;
        alpha = 1 - (ct - drawDur - holdDur) / fadeDur;
      }
      alpha = clamp(alpha, 0, 1);

      ctx.strokeStyle = `rgba(59,130,246,${0.045 * alpha})`;
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx < W; gx += 20) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += 20) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      ctx.strokeStyle = `rgba(59,130,246,${0.09 * alpha})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 5]);
      ctx.beginPath(); traceOuter(); ctx.stroke();
      ctx.beginPath(); traceInnerArch(); ctx.stroke();
      ctx.setLineDash([]);

      const op = clamp(prog / 0.55, 0, 1);
      if (op > 0) {
        ctx.save();
        ctx.strokeStyle = `rgba(59,130,246,${0.88 * alpha})`;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.setLineDash([OUTER_LEN, OUTER_LEN]);
        ctx.lineDashOffset = OUTER_LEN * (1 - op);
        ctx.beginPath(); traceOuter(); ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      const ip = clamp((prog - 0.40) / 0.38, 0, 1);
      if (ip > 0) {
        ctx.save();
        ctx.strokeStyle = `rgba(59,130,246,${0.88 * alpha})`;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.setLineDash([INNER_LEN, INNER_LEN]);
        ctx.lineDashOffset = INNER_LEN * (1 - ip);
        ctx.beginPath(); traceInnerArch(); ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      if (prog > 0.72) {
        const da = clamp((prog - 0.72) / 0.18, 0, 1) * alpha;
        ctx.fillStyle = `rgba(59,130,246,${0.12 * da})`;
        ctx.beginPath(); traceDome(); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = `rgba(59,130,246,${0.3 * da})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.beginPath(); traceDome(); ctx.stroke();
        ctx.setLineDash([]);
      }

      if (prog > 0.9) {
        const da = clamp((prog - 0.9) / 0.1, 0, 1) * alpha;
        ctx.strokeStyle = `rgba(59,130,246,${0.3 * da})`;
        ctx.lineWidth = 0.6;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(OL, OB + 14); ctx.lineTo(OR, OB + 14); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(OL, OB + 10); ctx.lineTo(OL, OB + 18);
        ctx.moveTo(OR, OB + 10); ctx.lineTo(OR, OB + 18); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(OL - 6, OT); ctx.lineTo(OL - 6, OB); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(OL - 10, OT); ctx.lineTo(OL - 2, OT);
        ctx.moveTo(OL - 10, OB); ctx.lineTo(OL - 2, OB); ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    /* ─────────────────────────────────────────────────
       STAGE 3 — Colored icon (final form animation)
    ───────────────────────────────────────────────── */
    function drawSnapAssembly(prog: number) {
      ctx.clearRect(0, 0, W, H);

      const outlineProg = clamp(prog / 0.35, 0, 1);
      if (outlineProg > 0) {
        const op = easeOut3(outlineProg);
        ctx.save();
        ctx.strokeStyle = "#4176FD";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.setLineDash([OUTER_LEN, OUTER_LEN]);
        ctx.lineDashOffset = OUTER_LEN * (1 - op);
        ctx.beginPath(); traceOuter(); ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        const ip = clamp((outlineProg - 0.4) / 0.6, 0, 1);
        if (ip > 0) {
          ctx.save();
          ctx.strokeStyle = "#4176FD";
          ctx.lineWidth = 2.5;
          ctx.lineCap = "round";
          ctx.setLineDash([INNER_LEN, INNER_LEN]);
          ctx.lineDashOffset = INNER_LEN * (1 - easeOut3(ip));
          ctx.beginPath(); traceInnerArch(); ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
        }
      }

      const fillProg = clamp((prog - 0.30) / 0.35, 0, 1);
      if (fillProg > 0) {
        const fa = easeOut3(fillProg);
        ctx.save();
        ctx.globalAlpha = fa;
        ctx.fillStyle = "#4176FD";
        ctx.beginPath(); traceOuter(); ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.globalAlpha = fa;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath(); traceInnerArch(); ctx.closePath(); ctx.fill();
        ctx.restore();
      }

      const domeProg = clamp((prog - 0.55) / 0.25, 0, 1);
      if (domeProg > 0) {
        const dp = easeOutBack(domeProg);
        ctx.save();
        ctx.globalAlpha = Math.min(domeProg * 3, 1);
        ctx.fillStyle = "#9FB9FD";
        ctx.beginPath();
        ctx.ellipse(CX, DCY, DR * dp, DOME_SH * dp, 0, Math.PI, 0, false);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      const glowProg = clamp((prog - 0.75) / 0.25, 0, 1);
      if (glowProg > 0) {
        const gp = easeOut3(glowProg);
        ctx.save();
        ctx.globalAlpha = gp;
        ctx.strokeStyle = "rgba(65,118,253,0.7)";
        ctx.lineWidth = 1.5;
        ctx.beginPath(); traceOuter(); ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.globalAlpha = gp * 0.6;
        ctx.strokeStyle = "#4176FD";
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "#4176FD";
        ctx.shadowBlur = gp * 20;
        ctx.beginPath(); traceOuter(); ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.restore();
      }
    }

    /* main loop */
    function loop(ts: number) {
      const dt = (ts - lastT.current) * 0.001;
      lastT.current = ts;
      T.current = ts * 0.001;
      void dt;

      const s = stepN.current;
      if (s === -1) {
        drawDormant();
      } else if (s === 0) {
        drawBlueprintAnim(T.current);
      } else if (s === 1) {
        drawSketch(T.current);
      } else {
        if (asmStart.current === null) asmStart.current = T.current;
        asmProgress.current = Math.min(1, (T.current - asmStart.current) / 2.6);
        drawSnapAssembly(asmProgress.current);
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas ref={canvasRef} width={220} height={300}
      style={{ width: 200, height: 260, display: "block" }} />
  );
}
