"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Menu,
  X,
  Mail,
  MapPin,
  Send,
  ExternalLink,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import Image from "next/image";

/* ═══════════════ HELPERS ═══════════════ */

function In({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const r = useRef(null);
  const v = useInView(r, { once: true, margin: "-50px" });
  return (
    <motion.div ref={r} initial={{ opacity: 0, y: 24 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

function Count({ target, s = "" }: { target: number; s?: string }) {
  const [n, setN] = useState(0);
  const r = useRef(null);
  const v = useInView(r, { once: true });
  useEffect(() => {
    if (!v) return;
    let c = 0;
    const step = target / 50;
    const t = setInterval(() => { c += step; if (c >= target) { setN(target); clearInterval(t); } else setN(Math.floor(c)); }, 30);
    return () => clearInterval(t);
  }, [v, target]);
  return <span ref={r}>{n.toLocaleString()}{s}</span>;
}

function Stamp({ children, color = "bg-kaixin text-white", rotate = -3 }: { children: React.ReactNode; color?: string; rotate?: number }) {
  return (
    <span className={`inline-block ${color} font-mono text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 border-2 border-foreground shadow-[3px_3px_0_0_#111]`} style={{ transform: `rotate(${rotate}deg)` }}>
      {children}
    </span>
  );
}

function Block({ children, className = "", hover = true, bg = "bg-white" }: { children: React.ReactNode; className?: string; hover?: boolean; bg?: string }) {
  return (
    <div className={`${bg} border-2 border-foreground p-6 md:p-8 shadow-[4px_4px_0_0_#111] ${hover ? "hover:shadow-[6px_6px_0_0_#111] hover:-translate-y-1 transition-all duration-200" : ""} ${className}`}>
      {children}
    </div>
  );
}

/* ═══════════════ MARQUEE ═══════════════ */

function DualMarquee() {
  const { t } = useI18n();
  const top = [t("mq.design"), t("mq.engineer"), t("mq.ship"), t("mq.iterate")];
  const bottom = [t("mq.react"), t("mq.nextjs"), t("mq.ai"), t("mq.cloud"), t("mq.mobile"), t("mq.brand"), t("mq.devops"), t("mq.strategy")];
  return (
    <div className="border-y-2 border-foreground bg-kaixin text-white overflow-hidden select-none">
      <div className="py-3 border-b border-white/20">
        <div className="marquee-l flex whitespace-nowrap">
          {[...top, ...top].map((t2, i) => (
            <span key={i} className="mx-6 text-sm font-bold tracking-[0.2em]">{t2}<span className="ml-6 text-white/40">✦</span></span>
          ))}
        </div>
      </div>
      <div className="py-3 bg-white text-foreground">
        <div className="marquee-r flex whitespace-nowrap">
          {[...bottom, ...bottom].map((t2, i) => (
            <span key={i} className="mx-6 text-sm font-bold tracking-[0.2em]">{t2}<span className="ml-6 text-foreground/30">◆</span></span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ LANGUAGE TOGGLE ═══════════════ */

function LangToggle() {
  const { locale, setLocale, t } = useI18n();
  const toggle = () => setLocale(locale === "en" ? "id" : "en");
  const label = locale === "en" ? "ID" : "EN";

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold uppercase tracking-wider border-2 border-foreground bg-white hover:bg-kaixin hover:text-white transition-colors shadow-[2px_2px_0_0_#111]"
      aria-label={`Switch to ${label}`}
    >
      <Globe className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

/* ═══════════════ PAGE ═══════════════ */

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const { t } = useI18n();
  const { toast } = useToast();

  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: fd.get("name"), email: fd.get("email"), subject: fd.get("subject"), message: fd.get("message") }) });
      if (!res.ok) throw new Error();
      toast({ title: t("toast.sent"), description: t("toast.sent.desc") });
      e.currentTarget.reset();
    } catch { toast({ title: t("toast.error"), description: t("toast.error.desc"), variant: "destructive" }); }
    finally { setSending(false); }
  };

  const services = [
    { num: "01", titleKey: "svc.01.title", descKey: "svc.01.desc", tools: ["Figma", "Prototyping", "Design Systems"] },
    { num: "02", titleKey: "svc.02.title", descKey: "svc.02.desc", tools: ["React", "Next.js", "TypeScript"] },
    { num: "03", titleKey: "svc.03.title", descKey: "svc.03.desc", tools: ["OpenAI", "LangChain", "Python"] },
    { num: "04", titleKey: "svc.04.title", descKey: "svc.04.desc", tools: ["AWS", "Terraform", "Kubernetes"] },
    { num: "05", titleKey: "svc.05.title", descKey: "svc.05.desc", tools: ["Swift", "Kotlin", "React Native"] },
    { num: "06", titleKey: "svc.06.title", descKey: "svc.06.desc", tools: ["Strategy", "Visual ID", "Motion"] },
  ];

  const projects = [
    { tagKey: "prj.01.tag", titleKey: "prj.01.title", year: "24" },
    { tagKey: "prj.02.tag", titleKey: "prj.02.title", year: "24" },
    { tagKey: "prj.03.tag", titleKey: "prj.03.title", year: "24" },
    { tagKey: "prj.04.tag", titleKey: "prj.04.title", year: "23" },
  ];

  const donts = ["dnd.1", "dnd.2", "dnd.3", "dnd.4", "dnd.5"];

  const philosophies = [
    { labelKey: "ph.01.label", textKey: "ph.01.text", color: "bg-kaixin text-white border-foreground" },
    { labelKey: "ph.02.label", textKey: "ph.02.text", color: "bg-white text-foreground border-foreground" },
    { labelKey: "ph.03.label", textKey: "ph.03.text", color: "bg-white text-foreground border-foreground" },
    { labelKey: "ph.04.label", textKey: "ph.04.text", color: "bg-foreground text-white border-white" },
  ];

  const otherTeam = [
    { nameKey: "team.sarah.name", roleKey: "team.sarah.role", initials: "SC" },
    { nameKey: "team.budi.name", roleKey: "team.budi.role", initials: "BS" },
    { nameKey: "team.linda.name", roleKey: "team.linda.role", initials: "LK" },
    { nameKey: "team.reza.name", roleKey: "team.reza.role", initials: "RP" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ═══ NAV ═══ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background border-b-2 border-foreground">
        <nav className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2.5">
            <Image src="/logo-kaixin.png" alt="" width={28} height={28} className="rounded border border-foreground" />
            <span className="text-[16px] font-extrabold tracking-tight uppercase">Kaixin</span>
          </a>
          <div className="hidden md:flex items-center gap-2">
            {[t("nav.work"), t("nav.about"), t("nav.team"), t("nav.contact")].map((n, i) => (
              <a key={i} href={`#${["work","about","team","contact"][i]}`} className="px-3 py-1.5 text-[13px] font-bold uppercase tracking-wider hover:bg-foreground hover:text-white transition-colors border-2 border-transparent hover:border-foreground">{n}</a>
            ))}
            <div className="ml-2"><LangToggle /></div>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <LangToggle />
            <button onClick={() => setMenuOpen(!menuOpen)} className="w-10 h-10 flex items-center justify-center border-2 border-foreground bg-white hover:bg-foreground hover:text-white transition-colors" aria-label="Menu">
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-kaixin flex flex-col items-center justify-center gap-6 transition-all duration-400 border-2 border-foreground md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {[t("nav.work"), t("nav.about"), t("nav.team"), t("nav.contact")].map((n, i) => (
          <a key={i} href={`#${["work","about","team","contact"][i]}`} onClick={() => setMenuOpen(false)} className="text-3xl font-extrabold uppercase text-white tracking-wider hover:underline">{n}</a>
        ))}
      </div>

      <main className="flex-1">

        {/* ═══ HERO ═══ */}
        <section className="relative min-h-[92dvh] flex items-center border-b-2 border-foreground">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, #111 0, #111 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #111 0, #111 1px, transparent 1px, transparent 40px)" }} />
          <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-28 pb-20 w-full">
            <div className="grid md:grid-cols-12 gap-8 md:gap-6 items-end">
              <div className="md:col-span-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <Stamp color="bg-kaixin text-white" rotate={-2}>{t("hero.stamp.est")}</Stamp>
                    <Stamp color="bg-white text-foreground" rotate={1}>{t("hero.stamp.jakarta")}</Stamp>
                  </div>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                  className="text-[clamp(2.5rem,7.5vw,6.5rem)] font-extrabold leading-[0.9] tracking-[-0.03em] uppercase"
                >
                  {t("hero.line1")}
                  <br />
                  {t("hero.line2")}
                  <br />
                  <span className="relative inline-block">
                    <span className="bg-kaixin text-white px-3 -rotate-1 inline-block">{t("hero.highlight")}</span>
                  </span>
                  <span className="text-kaixin">.</span>
                </motion.h1>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-end">
                  <p className="text-[15px] leading-relaxed max-w-sm text-foreground/70">{t("hero.desc")}</p>
                  <a href="#work" className="inline-flex items-center gap-2 bg-foreground text-white px-5 py-3 font-bold text-[13px] uppercase tracking-wider border-2 border-foreground hover:bg-kaixin transition-colors shadow-[4px_4px_0_0_#FF6600]">
                    {t("hero.cta")}
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
              <div className="md:col-span-4">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <Block hover={false} className="bg-kaixin border-foreground shadow-[4px_4px_0_0_#111]">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-white/60 mb-4">
                      {t("hero.desc").split(".")[0]}
                    </p>
                    <div className="space-y-3 text-white">
                      {[
                        { l: t("stat.projects"), v: "200+" },
                        { l: t("stat.retention"), v: "98%" },
                        { l: t("stat.team"), v: "15" },
                        { l: t("stat.rating"), v: "4.9/5" },
                      ].map((item) => (
                        <div key={item.l} className="flex justify-between border-b border-white/20 pb-2 last:border-0">
                          <span className="font-bold text-[13px] uppercase">{item.l}</span>
                          <span className="font-mono text-[13px]">{item.v}</span>
                        </div>
                      ))}
                    </div>
                  </Block>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <DualMarquee />

        {/* ═══ SERVICES ═══ */}
        <section id="work" className="py-20 md:py-28">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <In className="mb-14 md:mb-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <Stamp color="bg-kaixin text-white" rotate={-2}>{t("svc.stamp")}</Stamp>
                  <h2 className="text-3xl md:text-[3rem] font-extrabold tracking-tight uppercase mt-5">
                    {t("svc.title")}
                    <br />
                    <span className="text-foreground/40">{t("svc.subtitle")}</span>
                  </h2>
                </div>
              </div>
            </In>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((s, i) => (
                <In key={s.num} delay={i * 0.06}>
                  <Block className="group cursor-pointer h-full">
                    <div className="flex items-start justify-between mb-5">
                      <span className="font-mono text-[13px] font-bold text-foreground/30">{s.num}</span>
                      <ExternalLink className="w-4 h-4 text-foreground/20 group-hover:text-kaixin transition-colors" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight mb-3 group-hover:text-kaixin transition-colors">{t(s.titleKey)}</h3>
                    <p className="text-[14px] leading-relaxed text-foreground/60 mb-6">{t(s.descKey)}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tools.map((tl) => (
                        <span key={tl} className="font-mono text-[11px] uppercase tracking-wider bg-background border border-foreground px-2.5 py-1">{tl}</span>
                      ))}
                    </div>
                  </Block>
                </In>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PROJECTS ═══ */}
        <section className="py-20 md:py-28 bg-foreground text-white border-y-2 border-foreground">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <In className="mb-14">
              <Stamp color="bg-white text-foreground border-white" rotate={2}>{t("prj.stamp")}</Stamp>
              <h2 className="text-3xl md:text-[3rem] font-extrabold tracking-tight uppercase mt-5 text-white">
                {t("prj.title")}
              </h2>
            </In>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((p, i) => (
                <In key={i} delay={i * 0.08}>
                  <Block hover={true} bg="bg-foreground" className="border-white group cursor-pointer">
                    <div className="flex items-start justify-between mb-6">
                      <span className="font-mono text-[11px] font-bold text-kaixin bg-kaixin/20 px-2 py-1">{t(p.tagKey)}</span>
                      <span className="font-mono text-[12px] text-white/40">{p.year}</span>
                    </div>
                    <p className="text-lg md:text-xl font-bold uppercase leading-snug text-white mb-5">{t(p.titleKey)}</p>
                    <div className="flex items-center gap-2 text-white/50 group-hover:text-kaixin group-hover:gap-3 transition-all text-[13px] font-bold uppercase tracking-wider">
                      <span>{t("svc.case")}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </Block>
                </In>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section id="about" className="py-20 md:py-28">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-7">
                <In>
                  <Stamp color="bg-kaixin text-white" rotate={-3}>{t("abt.stamp")}</Stamp>
                  <h2 className="text-3xl md:text-[3rem] font-extrabold tracking-tight uppercase mt-5 leading-[1.05]">
                    {t("abt.title")}
                    <br />
                    {t("abt.title2")}<span className="text-foreground/30">.</span>
                  </h2>
                </In>
                <In delay={0.1} className="mt-8 space-y-6 text-[15px] leading-[1.85] text-foreground/70 max-w-lg">
                  <p>
                    {t("abt.p1")} <span className="text-foreground font-bold border-b-2 border-kaixin">{t("abt.p1.bold")}</span> {t("abt.p1.rest")}
                  </p>
                  <p>
                    {t("abt.p2")} <span className="font-bold text-foreground">{t("abt.p2.bold")}</span>. {t("abt.p2.end")}
                  </p>
                </In>
                <In delay={0.2} className="mt-12">
                  <Block hover={false} className="bg-secondary">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-foreground/40 mb-5">{t("dnd.title")}</p>
                    <div className="space-y-3">
                      {donts.map((key) => (
                        <div key={key} className="flex items-start gap-3">
                          <span className="font-mono text-kaixin font-bold text-lg leading-none mt-0.5">✕</span>
                          <span className="text-[14px] text-foreground/70">{t(key)}</span>
                        </div>
                      ))}
                    </div>
                  </Block>
                </In>
              </div>
              <div className="md:col-span-5 space-y-4">
                {philosophies.map((item, i) => (
                  <In key={i} delay={i * 0.08}>
                    <Block hover={true} className={item.color} style={{ boxShadow: "4px 4px 0 0 #FF6600" }}>
                      <p className="font-mono text-[10px] tracking-[0.2em] opacity-50 mb-3">{t(item.labelKey)}</p>
                      <p className="text-[17px] font-bold leading-snug">{t(item.textKey)}</p>
                    </Block>
                  </In>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TEAM ═══ */}
        <section id="team" className="py-20 md:py-28 bg-secondary border-y-2 border-foreground">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <In className="mb-14">
              <Stamp color="bg-foreground text-white" rotate={2}>{t("team.stamp")}</Stamp>
              <h2 className="text-3xl md:text-[3rem] font-extrabold tracking-tight uppercase mt-5">
                {t("team.title")}
              </h2>
            </In>
            <In className="mb-6">
              <Block hover={true} className="md:flex md:items-center md:gap-12">
                <div className="flex items-start gap-6 md:w-1/3">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-none border-2 border-foreground bg-kaixin flex items-center justify-center shadow-[3px_3px_0_0_#111] flex-shrink-0" style={{ transform: "rotate(2deg)" }}>
                    <span className="text-3xl md:text-4xl font-extrabold text-white">YW</span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight">{t("team.yovi.name")}</h3>
                    <Stamp color="bg-kaixin text-white border-foreground" rotate={-2}>{t("team.founder.stamp")}</Stamp>
                  </div>
                </div>
                <div className="mt-6 md:mt-0 md:w-2/3">
                  <p className="text-[15px] leading-[1.8] text-foreground/60 mb-6">{t("team.yovi.desc")}</p>
                  <div className="flex gap-2">
                    {["LinkedIn", "GitHub", "Twitter"].map((s) => (
                      <button key={s} className="px-3 py-2 text-[12px] font-bold uppercase tracking-wider border-2 border-foreground bg-white hover:bg-kaixin hover:text-white transition-colors shadow-[2px_2px_0_0_#111]">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </Block>
            </In>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {otherTeam.map((m) => (
                <In key={m.initials}>
                  <Block hover={true} className="text-center group">
                    <div className="w-14 h-14 mx-auto border-2 border-foreground bg-secondary flex items-center justify-center mb-4 group-hover:bg-kaixin group-hover:text-white transition-colors shadow-[2px_2px_0_0_#111]">
                      <span className="font-bold text-[13px]">{m.initials}</span>
                    </div>
                    <p className="font-bold text-[14px] uppercase tracking-tight">{t(m.nameKey)}</p>
                    <p className="font-mono text-[10px] tracking-[0.15em] text-foreground/40 mt-1">{t(m.roleKey)}</p>
                  </Block>
                </In>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-20 md:py-24">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
            <In>
              <h2 className="text-4xl md:text-[4.5rem] font-extrabold tracking-tight uppercase leading-[0.95]">
                {t("cta.title")}
              </h2>
              <p className="text-foreground/50 text-[15px] mt-4 max-w-md mx-auto">{t("cta.desc")}</p>
              <div className="mt-8 flex justify-center gap-4">
                <a href="#contact" className="inline-flex items-center gap-2 bg-kaixin text-white px-6 py-3.5 font-bold text-[13px] uppercase tracking-wider border-2 border-foreground shadow-[4px_4px_0_0_#111] hover:shadow-[2px_2px_0_0_#111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  {t("cta.btn")}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </In>
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="contact" className="py-20 md:py-28 bg-foreground text-white border-t-2 border-white">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              <div>
                <In>
                  <Stamp color="bg-kaixin text-white border-white" rotate={-2}>{t("con.stamp")}</Stamp>
                  <h2 className="text-3xl md:text-[3rem] font-extrabold tracking-tight uppercase mt-5 text-white">
                    {t("con.title")}
                  </h2>
                </In>
                <In delay={0.1} className="mt-10 space-y-5">
                  <p className="text-white/50 text-[15px] leading-relaxed max-w-sm">{t("con.desc")}</p>
                  <div className="space-y-3">
                    {[
                      { icon: Mail, label: "hello@kaixin.tech" },
                      { icon: MapPin, label: "Jakarta, Indonesia" },
                    ].map((c) => (
                      <div key={c.label} className="flex items-center gap-3">
                        <div className="w-10 h-10 border-2 border-white flex items-center justify-center"><c.icon className="w-4 h-4 text-white/60" /></div>
                        <span className="text-[14px] text-white/60">{c.label}</span>
                      </div>
                    ))}
                  </div>
                </In>
              </div>
              <In delay={0.15}>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2">{t("con.name")}</label>
                      <Input name="name" placeholder={t("con.name.ph")} required className="h-12 bg-transparent border-2 border-white text-white text-[15px] placeholder:text-white/30 focus:border-kaixin focus:ring-0 rounded-none shadow-none" />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2">{t("con.email")}</label>
                      <Input name="email" type="email" placeholder={t("con.email.ph")} required className="h-12 bg-transparent border-2 border-white text-white text-[15px] placeholder:text-white/30 focus:border-kaixin focus:ring-0 rounded-none shadow-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2">{t("con.subject")}</label>
                    <Input name="subject" placeholder={t("con.subject.ph")} required className="h-12 bg-transparent border-2 border-white text-white text-[15px] placeholder:text-white/30 focus:border-kaixin focus:ring-0 rounded-none shadow-none" />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2">{t("con.message")}</label>
                    <Textarea name="message" placeholder={t("con.message.ph")} required rows={5} className="bg-transparent border-2 border-white text-white text-[15px] placeholder:text-white/30 focus:border-kaixin focus:ring-0 rounded-none shadow-none resize-none" />
                  </div>
                  <Button type="submit" disabled={sending} className="h-12 w-full sm:w-auto bg-kaixin hover:bg-kaixin-dark text-white text-[13px] font-bold uppercase tracking-wider px-8 border-2 border-white shadow-[3px_3px_0_0_rgba(255,255,255,0.3)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all gap-2">
                    {sending ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                    {sending ? t("con.sending") : t("con.btn")}
                  </Button>
                </form>
              </In>
            </div>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t-2 border-foreground">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logo-kaixin.png" alt="" width={22} height={22} className="rounded border border-foreground" />
            <span className="text-[13px] font-bold uppercase tracking-wider">Kaixin</span>
          </div>
          <p className="font-mono text-[11px] text-foreground/40 uppercase tracking-wider">© {new Date().getFullYear()} — {t("ft.copy")}</p>
          <div className="flex gap-4">
            {["Twitter", "GitHub", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="font-mono text-[11px] text-foreground/40 uppercase tracking-wider hover:text-kaixin transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </footer>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={showTop ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-kaixin text-white border-2 border-foreground flex items-center justify-center shadow-[3px_3px_0_0_#111] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
        aria-label="Top"
      >
        <ArrowUpRight className="w-4 h-4 -rotate-45" />
      </motion.button>
    </div>
  );
}
