"use client";
import { useState, useRef, ChangeEvent, CSSProperties } from "react";

const COUNTRY_CODES = [
    { code: "+91", flag: "🇮🇳", name: "India" },
    { code: "+1", flag: "🇺🇸", name: "USA" },
    { code: "+44", flag: "🇬🇧", name: "UK" },
    { code: "+61", flag: "🇦🇺", name: "Australia" },
    { code: "+971", flag: "🇦🇪", name: "UAE" },
    { code: "+65", flag: "🇸🇬", name: "Singapore" },
    { code: "+49", flag: "🇩🇪", name: "Germany" },
    { code: "+33", flag: "🇫🇷", name: "France" },
    { code: "+81", flag: "🇯🇵", name: "Japan" },
    { code: "+86", flag: "🇨🇳", name: "China" },
    { code: "+55", flag: "🇧🇷", name: "Brazil" },
    { code: "+27", flag: "🇿🇦", name: "South Africa" },
    { code: "+34", flag: "🇪🇸", name: "Spain" },
    { code: "+39", flag: "🇮🇹", name: "Italy" },
    { code: "+7", flag: "🇷🇺", name: "Russia" },
    { code: "+82", flag: "🇰🇷", name: "South Korea" },
    { code: "+31", flag: "🇳🇱", name: "Netherlands" },
    { code: "+46", flag: "🇸🇪", name: "Sweden" },
    { code: "+47", flag: "🇳🇴", name: "Norway" },
    { code: "+41", flag: "🇨🇭", name: "Switzerland" },
];

const CATEGORIES = [
    { id: 1, label: "Digital Foundations" },
    { id: 2, label: "Perception & Interaction" },
    { id: 3, label: "Growth Mechanics" },
];

const SUB_OPTIONS: Record<number, string[]> = {
    1: ["Web platforms", "Mobile applications", "API integrations", "Scalable infrastructure"],
    2: ["Brand identity", "UX & UI design", "Design systems", "Visual language"],
    3: ["Performance marketing", "SEO & content strategy", "Conversion optimization", "Analytics & tracking"],
};

type FormState = {
    name: string;
    cc: string;
    phone: string;
    email: string;
    category: number | null;
    subOptions: string[];
    file: File | null;
};

export default function ContactPage() {
    const [step, setStep] = useState(1);
    const [dir, setDir] = useState(1);
    const [visible, setVisible] = useState(true);
    const [form, setForm] = useState<FormState>({
        name: "", cc: "+91", phone: "", email: "",
        category: null, subOptions: [], file: null,
    });
    const [fileError, setFileError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const goTo = (next: number) => {
        setDir(next > step ? 1 : -1);
        setVisible(false);
        setTimeout(() => { setStep(next); setVisible(true); }, 220);
    };

    const handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
        setForm((f) => ({ ...f, phone: e.target.value.replace(/[^0-9]/g, "") }));
    };

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) { setFileError("File exceeds 10 MB limit."); e.target.value = ""; return; }
        setFileError("");
        setForm((f) => ({ ...f, file }));
    };

    const toggleSub = (opt: string) =>
        setForm((f) => ({
            ...f,
            subOptions: f.subOptions.includes(opt) ? f.subOptions.filter((o) => o !== opt) : [...f.subOptions, opt],
        }));

    const progress = ((step - 1) / 4) * 100;

    if (submitted) return (
        <div style={S.page}>
            <div style={S.successWrap}>
                <div style={S.tick}>✓</div>
                <h2 style={S.successTitle}>We've got your message.</h2>
                <p style={S.successSub}>Someone from APSLOCK will reach out within 24 hours.</p>
            </div>
        </div>
    );

    return (
        <div style={S.page}>
            <p style={S.eyebrow}>Let's Build Together</p>
            <h1 style={S.title}>Get in touch</h1>

            <div style={S.progressTrack}>
                <div style={{ ...S.progressBar, width: `${progress}%`, transition: "width .4s cubic-bezier(.4,0,.2,1)" }} />
            </div>

            <div style={S.stepRow}>
                {[1, 2, 3, 4].map((s) => (
                    <div key={s} style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ ...S.dot, background: s <= step ? "#333" : "transparent", border: `1.5px solid ${s <= step ? "#333" : "#c8c4bc"}`, color: s <= step ? "#f5f2ed" : "#c8c4bc" }}>
                            {s < step ? "✓" : s}
                        </div>
                        {s < 4 && <div style={S.stepLine} />}
                    </div>
                ))}
                <p style={S.stepLabel}>{["Your details", "Contact", "Service", "Scope"][step - 1]}</p>
            </div>

            <div style={{ ...S.card, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : `translateY(${dir * 12}px)`, transition: "opacity .22s ease,transform .22s ease" }}>

                {step === 1 && (
                    <div style={S.group}>
                        <p style={S.stepTitle}>Who are we talking to?</p>
                        <label style={S.lbl}>Full name <span style={S.star}>*</span></label>
                        <input style={S.inp} placeholder="Enter Your Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                        <label style={S.lbl}>Contact number <span style={S.star}>*</span></label>
                        <div style={S.phoneRow}>
                            <select style={S.ccSel} value={form.cc} onChange={e => setForm(f => ({ ...f, cc: e.target.value }))}>
                                {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code} {c.name}</option>)}
                            </select>
                            <input style={S.phoneInp} placeholder="Enter Mobile Number" value={form.phone} inputMode="numeric" maxLength={15} onChange={handlePhoneInput} />
                        </div>
                        <button style={{ ...S.btn, opacity: form.name.trim() && form.phone.trim() ? 1 : .38 }} disabled={!form.name.trim() || !form.phone.trim()} onClick={() => goTo(2)}>Continue →</button>
                    </div>
                )}

                {step === 2 && (
                    <div style={S.group}>
                        <p style={S.stepTitle}>Where can we reach you?</p>
                        <label style={S.lbl}>Email address <span style={S.star}>*</span></label>
                        <input style={S.inp} type="text" placeholder=" Enter Email Address" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                        <div style={S.nav}>
                            <button style={S.btnSec} onClick={() => goTo(1)}>← Back</button>
                            <button style={{ ...S.btn, opacity: form.email.trim() ? 1 : .38 }} disabled={!form.email.trim()} onClick={() => goTo(3)}>Continue →</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div style={S.group}>
                        <p style={S.stepTitle}>What are you building? <span style={S.star}>*</span></p>
                        {CATEGORIES.map(cat => (
                            <button key={cat.id} onClick={() => setForm(f => ({ ...f, category: cat.id, subOptions: [] }))}
                                style={{ ...S.catCard, borderColor: form.category === cat.id ? "#333" : "#dedad3", background: form.category === cat.id ? "#333" : "transparent" }}>
                                <span style={{ ...S.catLabel, color: form.category === cat.id ? "#f5f2ed" : "#333" }}>{cat.label}</span>
                            </button>
                        ))}
                        <div style={S.nav}>
                            <button style={S.btnSec} onClick={() => goTo(2)}>← Back</button>
                            <button style={{ ...S.btn, opacity: form.category !== null ? 1 : .38 }} disabled={form.category === null} onClick={() => goTo(4)}>Continue →</button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div style={S.group}>
                        <p style={S.stepTitle}>What do you need specifically? <span style={S.star}>*</span></p>
                        <p style={S.stepSub}>Select all that apply</p>
                        {(form.category ? SUB_OPTIONS[form.category] || [] : []).map(opt => {
                            const chk = form.subOptions.includes(opt);
                            return (
                                <button key={opt} onClick={() => toggleSub(opt)}
                                    style={{ ...S.checkRow, borderColor: chk ? "#333" : "#dedad3", background: chk ? "#f0ede7" : "transparent" }}>
                                    <span style={{ ...S.chkBox, background: chk ? "#333" : "transparent", borderColor: chk ? "#333" : "#aaa89f" }}>
                                        {chk && <span style={{ color: "#f5f2ed", fontSize: 11 }}>✓</span>}
                                    </span>
                                    <span style={{ fontSize: 14, color: "#333" }}>{opt}</span>
                                </button>
                            );
                        })}
                        <div style={{ marginTop: 20 }}>
                            <label style={{ ...S.lbl, display: "block", marginBottom: 6 }}>Attachment </label>
                            <div style={S.fileZone} onClick={() => fileRef.current?.click()}>
                                {form.file
                                    ? <span style={{ fontSize: 13, color: "#333" }}>📎 {form.file.name}</span>
                                    : <span style={{ fontSize: 13, color: "#9b9891" }}>Click to attach a file</span>}
                            </div>
                            <input ref={fileRef} type="file" style={{ display: "none" }} onChange={handleFile} />
                            {fileError && <p style={{ fontSize: 12, color: "#c0392b", marginTop: 4 }}>{fileError}</p>}
                        </div>
                        <div style={S.nav}>
                            <button style={S.btnSec} onClick={() => goTo(3)}>← Back</button>
                            <button style={{ ...S.btn, opacity: form.subOptions.length ? 1 : .38 }} disabled={!form.subOptions.length} onClick={() => setSubmitted(true)}>Send message</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const S: Record<string, CSSProperties> = {
    page: { fontFamily: "'Nunito',sans-serif", background: "#f5f2ed", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 20px 80px" },
    eyebrow: { fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9b9891", margin: "0 0 10px", fontWeight: 600 },
    title: { fontSize: 38, fontWeight: 700, color: "#333", margin: "0 0 36px", letterSpacing: "-.02em", lineHeight: 1.15 },
    star: { color: "#c0392b", marginLeft: 2 },
    progressTrack: { width: "100%", maxWidth: 480, height: 2, background: "#e4e0d9", borderRadius: 2, overflow: "hidden", marginBottom: 20 },
    progressBar: { height: "100%", background: "#333", borderRadius: 2 },
    stepRow: { display: "flex", alignItems: "center", marginBottom: 28 },
    dot: { width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, transition: "all .25s ease" },
    stepLine: { width: 32, height: 1, background: "#dedad3" },
    stepLabel: { fontSize: 12, color: "#9b9891", margin: "0 0 0 12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" },
    card: { width: "100%", maxWidth: 480, background: "#fff", borderRadius: 16, border: "1px solid #e4e0d9", padding: "32px 28px" },
    group: { display: "flex", flexDirection: "column" },
    stepTitle: { fontSize: 20, fontWeight: 700, color: "#333", margin: "0 0 20px", letterSpacing: "-.01em" },
    stepSub: { fontSize: 13, color: "#9b9891", margin: "-12px 0 14px" },
    lbl: { fontSize: 12, fontWeight: 700, color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 },
    inp: { width: "100%", padding: "11px 14px", border: "1px solid #dedad3", borderRadius: 10, fontSize: 15, fontFamily: "'Nunito',sans-serif", color: "#333", background: "#faf9f7", marginBottom: 16 },
    phoneRow: { display: "flex", gap: 8, marginBottom: 16 },
    ccSel: { padding: "11px 10px", border: "1px solid #dedad3", borderRadius: 10, fontSize: 13, fontFamily: "'Nunito',sans-serif", color: "#333", background: "#faf9f7", width: 130, flexShrink: 0 },
    phoneInp: { flex: 1, padding: "11px 14px", border: "1px solid #dedad3", borderRadius: 10, fontSize: 15, fontFamily: "'Nunito',sans-serif", color: "#333", background: "#faf9f7" },
    btn: { padding: "12px 22px", background: "#333", color: "#f5f2ed", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'Nunito',sans-serif", cursor: "pointer", letterSpacing: "0.02em", alignSelf: "flex-end", marginTop: 8 },
    btnSec: { padding: "12px 20px", background: "transparent", color: "#6b6b6b", border: "1px solid #dedad3", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'Nunito',sans-serif", cursor: "pointer" },
    nav: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24 },
    catCard: { display: "flex", alignItems: "center", padding: "14px 16px", border: "1.5px solid", borderRadius: 12, cursor: "pointer", fontFamily: "'Nunito',sans-serif", transition: "all .18s ease", marginBottom: 10 },
    catLabel: { fontSize: 15, fontWeight: 700, letterSpacing: "-.01em" },
    checkRow: { display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", border: "1.5px solid", borderRadius: 10, cursor: "pointer", fontFamily: "'Nunito',sans-serif", transition: "all .15s ease", marginBottom: 8 },
    chkBox: { width: 18, height: 18, border: "1.5px solid", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .15s ease" },
    fileZone: { border: "1.5px dashed #dedad3", borderRadius: 10, padding: "16px 14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: "#faf9f7" },
    successWrap: { textAlign: "center", marginTop: 80 },
    tick: { width: 60, height: 60, borderRadius: "50%", background: "#333", color: "#f5f2ed", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" },
    successTitle: { fontSize: 28, fontWeight: 700, color: "#333", margin: "0 0 10px", letterSpacing: "-.02em" },
    successSub: { fontSize: 15, color: "#6b6b6b", margin: 0 },
};