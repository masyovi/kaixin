"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MapPin,
  Send,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";
import Image from "next/image";

/* ═══════════════ ANIMATIONS ═══════════════ */

function Reveal({
  children,
  delay = 0,
  className = "",
  y = 20,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Pop({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
      animate={visible ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const visible = useInView(ref, { once: true });
  useEffect(() => {
    if (!visible) return;
    let c = 0;
    const step = target / 50;
    const t = setInterval(() => {
      c += step;
      if (c >= target) { setN(target); clearInterval(t); }
      else setN(Math.floor(c));
    }, 25);
    return () => clearInterval(t);
  }, [visible, target]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ═══════════════ SVG DOODLES ═══════════════ */

function SquiggleLine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 12" className={`w-full h-3 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6C30 2 50 10 80 6C110 2 130 10 160 6C190 2 210 10 240 6C270 2 290 10 320 6C350 2 370 10 398 6" stroke="#C4B99A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ArrowDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 20" className={`w-10 h-5 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10H35M28 4L36 10L28 16" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`w-5 h-5 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 1L12.5 7.5L19 8L14 12.5L15.5 19L10 15.5L4.5 19L6 12.5L1 8L7.5 7.5L10 1Z" stroke="#FF6600" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function CircleDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`w-4 h-4 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6" stroke="#C4B99A" strokeWidth="1.2" strokeDasharray="3 3" />
    </svg>
  );
}

/* ═══════════════ TAPE COMPONENT ═══════════════ */

function Tape({ color = "orange" }: { color?: "orange" | "mud" }) {
  const bg = color === "orange" ? "rgba(255,102,0,0.12)" : "rgba(196,185,154,0.3)";
  const border = color === "orange" ? "rgba(255,102,0,0.15)" : "rgba(196,185,154,0.5)";
  return (
    <div
      className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 rounded-sm z-10"
      style={{ background: bg, border: `1px solid ${border}`, transform: `translateX(-50%) rotate(-1.5deg)` }}
    />
  );
}

/* ═══════════════ LANG TOGGLE ═══════════════ */

function LangToggle() {
  const { locale, setLocale } = useI18n();
  const toggle = () => setLocale(locale === "en" ? "id" : "en");
  const label = locale === "en" ? "ID" : "EN";
  return (
    <button
      onClick={toggle}
      className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest border-2 border-foreground bg-paper hover:bg-kaixin hover:text-white hover:border-kaixin transition-all duration-200"
      style={{ transform: "rotate(1deg)" }}
      aria-label={`Switch to ${label}`}
    >
      {label}
    </button>
  );
}

/* ═══════════════ PAGE ═══════════════ */

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();
  const { toast } = useToast();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"), email: fd.get("email"),
          subject: fd.get("subject"), message: fd.get("message"),
        }),
      });
      if (!res.ok) throw new Error();
      toast({ title: t("toast.sent"), description: t("toast.sent.desc") });
      e.currentTarget.reset();
    } catch {
      toast({ title: t("toast.error"), description: t("toast.error.desc"), variant: "destructive" });
    } finally { setSending(false); }
  };

  const services = [
    { titleKey: "svc.01.title", descKey: "svc.01.desc", tools: ["Figma", "Prototype", "Design System"], emoji: "🎨" },
    { titleKey: "svc.02.title", descKey: "svc.02.desc", tools: ["React", "Next.js", "TypeScript"], emoji: "⚡" },
    { titleKey: "svc.03.title", descKey: "svc.03.desc", tools: ["OpenAI", "LangChain", "Python"], emoji: "🧠" },
    { titleKey: "svc.04.title", descKey: "svc.04.desc", tools: ["AWS", "Docker", "K8s"], emoji: "🛠" },
    { titleKey: "svc.05.title", descKey: "svc.05.desc", tools: ["Swift", "Kotlin", "RN"], emoji: "📱" },
    { titleKey: "svc.06.title", descKey: "svc.06.desc", tools: ["Strategy", "Visual ID", "Motion"], emoji: "✏️" },
  ];

  const projects = [
    { tagKey: "prj.01.tag", titleKey: "prj.01.title", year: "24", note: "+340% konversi" },
    { tagKey: "prj.02.tag", titleKey: "prj.02.title", year: "24", note: "50K sesi/bulan" },
    { tagKey: "prj.03.tag", titleKey: "prj.03.title", year: "24", note: "2M+ pengguna" },
    { tagKey: "prj.04.tag", titleKey: "prj.04.title", year: "23", note: "400+ enterprise" },
  ];

  const team = [
    { nameKey: "team.sarah.name", roleKey: "team.sarah.role", initials: "SC" },
    { nameKey: "team.budi.name", roleKey: "team.budi.role", initials: "BS" },
    { nameKey: "team.linda.name", roleKey: "team.linda.role", initials: "LK" },
    { nameKey: "team.reza.name", roleKey: "team.reza.role", initials: "RP" },
  ];

  const nav = [
    { label: t("nav.work"), href: "#work" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.team"), href: "#team" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ═══════════ NAV ═══════════ */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-paper/90 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 group">
            <Image
              src="/logo-kaixin.png"
              alt="Kaixin"
              width={30}
              height={30}
              className="rounded-sm transition-transform duration-300 group-hover:rotate-[-6deg]"
            />
            <span className="font-[family-name:var(--font-playfair)] text-xl font-semibold italic tracking-tight">
              Kaixin
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-[13px] font-medium text-foreground/60 hover:text-foreground hover:bg-kaixin/10 rounded-md transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
            <div className="ml-2"><LangToggle /></div>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 rough-border flex items-center justify-center text-sm transition-all duration-200"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <span className="text-lg font-bold">☰</span>}
          </button>
        </nav>
      </header>

      {/* ═══════════ MOBILE MENU ═══════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-paper flex flex-col items-center justify-center gap-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {nav.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-[family-name:var(--font-playfair)] font-semibold italic"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.06 }}
              >
                {item.label}
              </motion.a>
            ))}
            <LangToggle />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* ═══════════ HERO ═══════════ */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          {/* Dot grid background */}
          <div className="absolute inset-0 dot-grid pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-8 md:gap-6 items-start">
              {/* Left: Big text */}
              <div className="md:col-span-7 relative">
                {/* Decorative tape on top */}
                <Reveal>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="sticker">{t("hero.stamp.est")}</div>
                    <div className="w-2 h-2 rounded-full bg-kaixin" />
                    <span className="text-[13px] font-mono text-foreground/40 tracking-wider">
                      {t("hero.stamp.jakarta")}
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <h1 className="text-[clamp(2.8rem,8vw,6rem)] font-bold leading-[0.92] tracking-tight font-[family-name:var(--font-playfair)]">
                    <span className="inline-block" style={{ transform: "rotate(-0.5deg)" }}>
                      {t("hero.line1")}
                    </span>
                    <br />
                    <span className="inline-block" style={{ transform: "rotate(0.3deg)" }}>
                      {t("hero.line2")}
                    </span>
                    <br />
                    <span className="relative inline-block text-kaixin" style={{ transform: "rotate(-0.8deg)" }}>
                      {t("hero.highlight")}
                      <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 10" preserveAspectRatio="none" fill="none">
                        <path d="M1 7C15 3, 30 9, 50 5C70 1, 85 8, 99 4" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="text-foreground/30">.</span>
                  </h1>
                </Reveal>

                <Reveal delay={0.25}>
                  <p className="mt-8 text-[15px] text-foreground/50 max-w-md leading-relaxed">
                    {t("hero.desc")}
                  </p>
                </Reveal>

                <Reveal delay={0.35}>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                      href="#work"
                      className="group inline-flex items-center gap-2 rough-border px-5 py-3 bg-white text-[13px] font-bold uppercase tracking-wider card-lift"
                    >
                      {t("hero.cta")}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                    <a
                      href="#about"
                      className="inline-flex items-center gap-2 px-5 py-3 text-[13px] font-medium text-foreground/50 hover:text-foreground hover:bg-kaixin/5 rounded transition-all duration-200"
                    >
                      {t("nav.about")}
                    </a>
                  </div>
                </Reveal>

                {/* Decorative elements */}
                <StarDoodle className="absolute -top-6 -right-4 md:right-8 opacity-40 rotate-12" />
                <CircleDoodle className="absolute top-1/2 -right-8 opacity-30" />
              </div>

              {/* Right: Bento stat cards */}
              <div className="md:col-span-5">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: t("stat.projects"), value: "200+", suffix: "" },
                    { label: t("stat.retention"), value: 98, suffix: "%" },
                    { label: t("stat.team"), value: 15, suffix: "+" },
                    { label: t("stat.rating"), value: 4.9, suffix: "/5" },
                  ].map((stat, i) => (
                    <Pop key={stat.label} delay={0.15 + i * 0.08} className="col-span-1">
                      <div
                        className="relative bg-white p-4 card-lift rough-border"
                        style={{ transform: `rotate(${(i % 2 === 0 ? -0.5 : 0.8) + (i * 0.3)}deg)` }}
                      >
                        <div className="text-2xl font-bold font-mono">
                          {typeof stat.value === "number" ? (
                            <CountUp target={stat.value} suffix={stat.suffix} />
                          ) : (
                            <span>{stat.value}</span>
                          )}
                        </div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-foreground/35 mt-1">
                          {stat.label}
                        </div>
                      </div>
                    </Pop>
                  ))}

                  {/* Big orange card */}
                  <Pop delay={0.5} className="col-span-2">
                    <div className="relative bg-kaixin text-white p-6 rough-border" style={{ boxShadow: "3px 3px 0 #CC5200" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <StarDoodle className="w-4 h-4 opacity-60" />
                        <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">Kaixin 开心</span>
                      </div>
                      <p className="text-sm leading-snug opacity-90 font-[family-name:var(--font-playfair)] italic">
                        {t("abt.p2.bold")} = {t("abt.p2.bold")}
                      </p>
                      <p className="text-[11px] mt-2 opacity-50">
                        That&apos;s the bar.
                      </p>
                    </div>
                  </Pop>
                </div>
              </div>
            </div>
          </div>

          {/* Doodle decorations */}
          <ArrowDoodle className="absolute bottom-8 left-[10%] opacity-30 rotate-12" />
          <CircleDoodle className="absolute top-40 right-[5%] opacity-20" />
          <StarDoodle className="absolute bottom-20 right-[15%] opacity-25 -rotate-12" />
        </section>

        {/* Wavy divider */}
        <div className="w-full px-6">
          <SquiggleLine />
        </div>

        {/* ═══════════ SERVICES ═══════════ */}
        <section id="work" className="relative py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal className="mb-14">
              <div className="flex items-center gap-3 mb-3">
                <StarDoodle />
                <span className="text-[11px] font-mono uppercase tracking-widest text-foreground/40">
                  {t("svc.stamp")}
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                <h2 className="text-3xl md:text-[2.8rem] font-bold font-[family-name:var(--font-playfair)] leading-tight">
                  {t("svc.title")}{" "}
                  <span className="text-foreground/25 text-2xl md:text-[2rem]">{t("svc.subtitle")}</span>
                </h2>
                <ArrowDoodle className="hidden md:block opacity-40" />
              </div>
            </Reveal>

            {/* Masonry-like service cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {services.map((svc, i) => {
                const rotations = [-0.3, 0.5, -0.2, 0.4, -0.6, 0.3];
                const heights = [
                  "md:row-span-1",
                  "md:row-span-1",
                  "md:row-span-1",
                  "md:row-span-1",
                  "md:row-span-1",
                  "md:row-span-1",
                ];
                return (
                  <Pop key={i} delay={i * 0.06} className={heights[i]}>
                    <div
                      className="relative bg-white p-5 rough-border card-lift h-full group cursor-pointer"
                      style={{ transform: `rotate(${rotations[i]}deg)` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-2xl" role="img" aria-hidden="true">{svc.emoji}</span>
                        <span className="text-[10px] font-mono text-foreground/20 tracking-wider">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="text-base font-bold mb-1.5 group-hover:text-kaixin transition-colors">
                        {t(svc.titleKey)}
                      </h3>
                      <p className="text-[13px] text-foreground/40 leading-relaxed mb-4">
                        {t(svc.descKey)}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {svc.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-paper text-foreground/50 rounded-sm border border-mud-light/50"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Pop>
                );
              })}
            </div>
          </div>

          {/* Doodles */}
          <CircleDoodle className="absolute top-32 -left-4 opacity-20 rotate-45" />
          <StarDoodle className="absolute bottom-20 -right-2 opacity-20" />
        </section>

        {/* ═══════════ PROJECTS ═══════════ */}
        <section className="relative py-16 md:py-24 bg-foreground text-paper overflow-hidden">
          {/* Dot grid on dark */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "radial-gradient(circle, #C4B99A 0.8px, transparent 0.8px)",
            backgroundSize: "24px 24px",
          }} />

          <div className="relative max-w-5xl mx-auto px-6">
            <Reveal className="mb-12">
              <div className="flex items-center gap-3 mb-3">
                <StarDoodle className="!text-paper opacity-40" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-paper/30">
                  {t("prj.stamp")}
                </span>
              </div>
              <h2 className="text-3xl md:text-[2.8rem] font-bold font-[family-name:var(--font-playfair)] text-paper">
                {t("prj.title")}
              </h2>
            </Reveal>

            <div className="flex gap-4 overflow-x-auto scroll-hide pb-4 -mx-6 px-6">
              {projects.map((project, i) => (
                <Pop key={i} delay={i * 0.08} className="flex-shrink-0 w-[300px] sm:w-[340px]">
                  <div
                    className="bg-paper text-foreground p-6 relative fold-corner h-full cursor-pointer card-lift"
                    style={{
                      transform: `rotate(${i % 2 === 0 ? -0.5 : 0.3}deg)`,
                      boxShadow: `4px 4px 0 #CC5200`,
                    }}
                  >
                    <Tape color="mud" />
                    <div className="flex items-center justify-between mb-5 mt-2">
                      <span className="sticker !bg-foreground !text-paper !shadow-none !rotate-0 text-[9px] px-2.5 py-1">
                        {t(project.tagKey)}
                      </span>
                      <span className="text-[11px] font-mono text-foreground/25">{project.year}</span>
                    </div>
                    <p className="text-[15px] font-bold leading-snug mb-4">
                      {t(project.titleKey)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-kaixin">{project.note}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-foreground/25" />
                    </div>
                  </div>
                </Pop>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ ABOUT ═══════════ */}
        <section id="about" className="relative py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-8">
              {/* Left col */}
              <div className="md:col-span-7">
                <Reveal>
                  <div className="flex items-center gap-3 mb-3">
                    <StarDoodle />
                    <span className="text-[11px] font-mono uppercase tracking-widest text-foreground/40">
                      {t("abt.stamp")}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-[2.8rem] font-bold font-[family-name:var(--font-playfair)] leading-tight mb-2">
                    {t("abt.title")}
                  </h2>
                  <p className="text-foreground/25 text-xl font-[family-name:var(--font-playfair)] italic">
                    {t("abt.title2")}
                  </p>
                </Reveal>

                <Reveal delay={0.1} className="mt-8 space-y-5 text-[15px] text-foreground/50 leading-[1.85] max-w-lg">
                  <p>
                    {t("abt.p1")}{" "}
                    <span className="handmark font-semibold text-foreground">{t("abt.p1.bold")}</span>{" "}
                    {t("abt.p1.rest")}
                  </p>
                  <p>
                    {t("abt.p2")}{" "}
                    <span className="font-semibold text-foreground">{t("abt.p2.bold")}</span>.{" "}
                    {t("abt.p2.end")}
                  </p>
                </Reveal>

                {/* Don't do list */}
                <Reveal delay={0.2} className="mt-10">
                  <div className="relative bg-white p-6 rough-border" style={{ transform: "rotate(0.3deg)" }}>
                    <Tape />
                    <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/30 mb-4 mt-1">
                      {t("dnd.title")}
                    </p>
                    <div className="space-y-2.5">
                      {["dnd.1", "dnd.2", "dnd.3", "dnd.4", "dnd.5"].map((key) => (
                        <div key={key} className="flex items-center gap-2.5 text-[13px] text-foreground/50">
                          <span className="text-kaixin text-sm">✕</span>
                          {t(key)}
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right col: Philosophy cards */}
              <div className="md:col-span-5 space-y-3">
                {[
                  { labelKey: "ph.01.label", textKey: "ph.01.text", rot: -0.8, accent: true },
                  { labelKey: "ph.02.label", textKey: "ph.02.text", rot: 0.5, accent: false },
                  { labelKey: "ph.03.label", textKey: "ph.03.text", rot: -0.3, accent: false },
                  { labelKey: "ph.04.label", textKey: "ph.04.text", rot: 0.7, accent: true },
                ].map((item, i) => (
                  <Pop key={i} delay={0.15 + i * 0.08}>
                    <div
                      className={`p-5 rough-border card-lift cursor-default ${
                        item.accent ? "bg-kaixin text-white" : "bg-white"
                      }`}
                      style={{
                        transform: `rotate(${item.rot}deg)`,
                        boxShadow: item.accent ? "3px 3px 0 #CC5200" : undefined,
                      }}
                    >
                      <p className={`text-[9px] font-mono tracking-[0.15em] uppercase mb-2 ${
                        item.accent ? "opacity-50" : "text-foreground/25"
                      }`}>
                        {t(item.labelKey)}
                      </p>
                      <p className="text-[14px] font-medium leading-snug font-[family-name:var(--font-playfair)] italic">
                        {t(item.textKey)}
                      </p>
                    </div>
                  </Pop>
                ))}
              </div>
            </div>
          </div>

          <SquiggleLine className="absolute bottom-0 left-0" />
          <ArrowDoodle className="absolute bottom-16 right-[8%] opacity-20 rotate-6" />
        </section>

        {/* ═══════════ TEAM ═══════════ */}
        <section id="team" className="relative py-20 md:py-28 bg-secondary/50">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal className="mb-14 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <StarDoodle />
                <span className="text-[11px] font-mono uppercase tracking-widest text-foreground/40">
                  {t("team.stamp")}
                </span>
                <StarDoodle />
              </div>
              <h2 className="text-3xl md:text-[2.8rem] font-bold font-[family-name:var(--font-playfair)]">
                {t("team.title")}
              </h2>
            </Reveal>

            {/* Founder */}
            <Pop className="mb-10">
              <div
                className="relative max-w-2xl mx-auto bg-white p-8 md:p-10 rough-border"
                style={{ transform: "rotate(0.3deg)", boxShadow: "5px 5px 0 #1A1A1A" }}
              >
                <Tape color="mud" />
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10 mt-2">
                  {/* Avatar — founder photo */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-24 h-28 overflow-hidden"
                      style={{
                        clipPath: "polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)",
                        boxShadow: "3px 3px 0 #CC5200",
                      }}
                    >
                      <Image
                        src="/founder-yovi.png"
                        alt={t("team.yovi.name")}
                        width={96}
                        height={112}
                        className="w-full h-full object-cover object-top"
                        priority
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border-2 border-foreground shadow-sm" style={{ transform: "rotate(3deg)" }}>
                      {t("team.founder.stamp")}
                    </div>
                  </div>
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)]">
                      {t("team.yovi.name")}
                    </h3>
                    <p className="mt-3 text-[13px] text-foreground/40 leading-relaxed">
                      {t("team.yovi.desc")}
                    </p>
                    <div className="mt-5 flex gap-2">
                      {["LinkedIn", "GitHub", "Twitter"].map((s) => (
                        <button
                          key={s}
                          className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border-2 border-foreground bg-white hover:bg-kaixin hover:text-white hover:border-kaixin transition-all duration-200"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Pop>

            {/* Team grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {team.map((member, i) => {
                const rots = [-0.8, 0.5, -0.3, 0.7];
                return (
                  <Pop key={member.initials} delay={0.1 + i * 0.06}>
                    <div
                      className="bg-white p-5 text-center rough-border card-lift"
                      style={{ transform: `rotate(${rots[i]}deg)` }}
                    >
                      <div
                        className="w-12 h-12 mx-auto mb-3 flex items-center justify-center text-white text-sm font-bold"
                        style={{
                          background: i === 0 ? "#E91E63" : i === 1 ? "#3F51B5" : i === 2 ? "#009688" : "#FF9800",
                          borderRadius: i % 2 === 0 ? "30% 70% 70% 30% / 30% 30% 70% 70%" : "50% 20% 50% 20% / 20% 50% 20% 50%",
                        }}
                      >
                        {member.initials}
                      </div>
                      <p className="text-[13px] font-bold">{t(member.nameKey)}</p>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/30 mt-1">
                        {t(member.roleKey)}
                      </p>
                    </div>
                  </Pop>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ CTA ═══════════ */}
        <section className="py-20 md:py-24">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] leading-tight">
                {t("cta.title")}
              </h2>
              <p className="mt-4 text-foreground/35 text-[14px] max-w-sm mx-auto">
                {t("cta.desc")}
              </p>
              <div className="mt-8">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 bg-kaixin text-white px-6 py-3 font-bold text-[13px] uppercase tracking-wider rough-border card-lift"
                  style={{ boxShadow: "3px 3px 0 #CC5200" }}
                >
                  {t("cta.btn")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ CONTACT ═══════════ */}
        <section id="contact" className="relative py-20 md:py-28 bg-foreground text-paper overflow-hidden">
          <div className="absolute inset-0 opacity-8" style={{
            backgroundImage: "radial-gradient(circle, #C4B99A 0.8px, transparent 0.8px)",
            backgroundSize: "24px 24px",
            opacity: 0.06,
          }} />

          <div className="relative max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              {/* Left */}
              <Reveal>
                <div className="flex items-center gap-3 mb-3">
                  <StarDoodle className="!text-paper opacity-40" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-paper/30">
                    {t("con.stamp")}
                  </span>
                </div>
                <h2 className="text-3xl md:text-[2.8rem] font-bold font-[family-name:var(--font-playfair)] text-paper">
                  {t("con.title")}
                </h2>
                <p className="mt-5 text-paper/35 text-[14px] max-w-sm leading-relaxed">
                  {t("con.desc")}
                </p>
                <div className="mt-8 space-y-3">
                  {[
                    { icon: Mail, label: "hello@kaixin.tech" },
                    { icon: MapPin, label: "Brondong, Lamongan, Jawa Timur 62263" },
                  ].map((c) => (
                    <div key={c.label} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded border border-paper/20 flex items-center justify-center">
                        <c.icon className="w-3.5 h-3.5 text-paper/40" />
                      </div>
                      <span className="text-[13px] text-paper/50">{c.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Right — Form */}
              <Reveal delay={0.1}>
                <form
                  onSubmit={handleSubmit}
                  className="bg-paper text-foreground p-6 md:p-8 relative"
                  style={{
                    transform: "rotate(-0.3deg)",
                    boxShadow: "5px 5px 0 rgba(255,102,0,0.3)",
                  }}
                >
                  <Tape color="orange" />
                  <div className="space-y-4 mt-2">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-foreground/30 mb-1.5">
                          {t("con.name")}
                        </label>
                        <Input
                          name="name"
                          placeholder={t("con.name.ph")}
                          required
                          className="h-11 bg-paper border-2 border-foreground/10 rounded-none text-[14px] focus:border-kaixin focus:ring-0"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-foreground/30 mb-1.5">
                          {t("con.email")}
                        </label>
                        <Input
                          name="email"
                          type="email"
                          placeholder={t("con.email.ph")}
                          required
                          className="h-11 bg-paper border-2 border-foreground/10 rounded-none text-[14px] focus:border-kaixin focus:ring-0"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-foreground/30 mb-1.5">
                        {t("con.subject")}
                      </label>
                      <Input
                        name="subject"
                        placeholder={t("con.subject.ph")}
                        required
                        className="h-11 bg-paper border-2 border-foreground/10 rounded-none text-[14px] focus:border-kaixin focus:ring-0"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-foreground/30 mb-1.5">
                        {t("con.message")}
                      </label>
                      <Textarea
                        name="message"
                        placeholder={t("con.message.ph")}
                        required
                        rows={5}
                        className="bg-paper border-2 border-foreground/10 rounded-none text-[14px] focus:border-kaixin focus:ring-0 resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={sending}
                      className="h-11 px-7 bg-kaixin hover:bg-kaixin-dark text-white text-[12px] font-bold uppercase tracking-wider border-2 border-foreground rounded-none hover:shadow-[3px_3px_0_#CC5200] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200 gap-2"
                    >
                      {sending ? (
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      {sending ? t("con.sending") : t("con.btn")}
                    </Button>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t-2 border-foreground">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo-kaixin.png" alt="" width={20} height={20} className="rounded-sm" />
            <span className="font-[family-name:var(--font-playfair)] text-sm italic font-semibold">
              Kaixin
            </span>
          </div>
          <p className="text-[11px] text-foreground/30 font-mono">
            © {new Date().getFullYear()} — {t("ft.copy")}
          </p>
          <div className="flex gap-4">
            {["Twitter", "GitHub", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[11px] text-foreground/30 hover:text-kaixin transition-colors font-mono uppercase tracking-wider"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
