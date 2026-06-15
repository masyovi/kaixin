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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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

/* ═══════════════ STICKER / STAMP ═══════════════ */
function Stamp({ children, color = "bg-kaixin text-white", rotate = -3 }: { children: React.ReactNode; color?: string; rotate?: number }) {
  return (
    <span className={`inline-block ${color} font-mono text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 border-2 border-foreground shadow-[3px_3px_0_0_#111]`} style={{ transform: `rotate(${rotate}deg)` }}>
      {children}
    </span>
  );
}

/* ═══════════════ BLOCK (brutalist card) ═══════════════ */
function Block({ children, className = "", hover = true, bg = "bg-white" }: { children: React.ReactNode; className?: string; hover?: boolean; bg?: string }) {
  return (
    <div className={`${bg} border-2 border-foreground p-6 md:p-8 shadow-[4px_4px_0_0_#111] ${hover ? "hover:shadow-[6px_6px_0_0_#111] hover:-translate-y-1 transition-all duration-200" : ""} ${className}`}>
      {children}
    </div>
  );
}

/* ═══════════════ MARQUEE ═══════════════ */
const marqueeL = ["DESIGN", "ENGINEER", "SHIP", "ITERATE", "DESIGN", "ENGINEER", "SHIP", "ITERATE"];
const marqueeR = ["REACT", "NEXT.JS", "AI/ML", "CLOUD", "MOBILE", "BRAND", "DEVOPS", "STRATEGY"];

function DualMarquee() {
  return (
    <div className="border-y-2 border-foreground bg-kaixin text-white overflow-hidden select-none">
      <div className="py-3 border-b border-white/20">
        <div className="marquee-l flex whitespace-nowrap">
          {[...marqueeL, ...marqueeL].map((t, i) => (
            <span key={i} className="mx-6 text-sm font-bold tracking-[0.2em]">{t}<span className="ml-6 text-white/40">✦</span></span>
          ))}
        </div>
      </div>
      <div className="py-3 bg-white text-foreground">
        <div className="marquee-r flex whitespace-nowrap">
          {[...marqueeR, ...marqueeR].map((t, i) => (
            <span key={i} className="mx-6 text-sm font-bold tracking-[0.2em]">{t}<span className="ml-6 text-ink-faint">◆</span></span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ PAGE ═══════════════ */

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [showTop, setShowTop] = useState(false);
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
      toast({ title: "Sent ✓", description: "We'll reply within a day." });
      e.currentTarget.reset();
    } catch { toast({ title: "Error", description: "Try again.", variant: "destructive" }); }
    finally { setSending(false); }
  };

  const services = [
    { num: "01", title: "Product Design", desc: "Figma → Prototype → Handoff. We don't just draw screens — we design flows that actually work.", tools: ["Figma", "Prototyping", "Design Systems"] },
    { num: "02", title: "Web Engineering", desc: "React, Next.js, TypeScript. Performance-first. No 20MB bundles allowed.", tools: ["React", "Next.js", "TypeScript"] },
    { num: "03", title: "AI Integration", desc: "LLMs, RAG, NLP. We build AI features that feel useful, not forced.", tools: ["OpenAI", "LangChain", "Python"] },
    { num: "04", title: "Cloud & Infra", desc: "AWS, Docker, K8s. Infrastructure that doesn't wake you up at 3AM.", tools: ["AWS", "Terraform", "Kubernetes"] },
    { num: "05", title: "Mobile Apps", desc: "Native or cross-platform. We know when to pick which.", tools: ["Swift", "Kotlin", "React Native"] },
    { num: "06", title: "Brand Identity", desc: "Logo, type, color, motion. The DNA of how people recognize you.", tools: ["Strategy", "Visual ID", "Motion"] },
  ];

  const projects = [
    { tag: "FINTECH", title: "Lending platform rebuilt for 2M+ users", year: "24" },
    { tag: "HEALTH", title: "Telemedicine handling 50K monthly sessions", year: "24" },
    { tag: "ECOM", title: "Checkout flow — +34% conversion overnight", year: "24" },
    { tag: "SaaS", title: "Analytics dashboard for 400+ enterprise teams", year: "23" },
  ];

  const team = [
    { name: "Yovi Widianto", role: "FOUNDER", initials: "YW", founder: true },
    { name: "Sarah Chen", role: "CTO", initials: "SC", founder: false },
    { name: "Budi Santoso", role: "DESIGN", initials: "BS", founder: false },
    { name: "Linda Kusuma", role: "ENG LEAD", initials: "LK", founder: false },
    { name: "Reza Pratama", role: "PRODUCT", initials: "RP", founder: false },
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
          <div className="hidden md:flex items-center gap-1">
            {["Work", "About", "Team", "Contact"].map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} className="px-3 py-1.5 text-[13px] font-bold uppercase tracking-wider hover:bg-foreground hover:text-white transition-colors border-2 border-transparent hover:border-foreground">{n}</a>
            ))}
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-10 h-10 flex items-center justify-center border-2 border-foreground bg-white hover:bg-foreground hover:text-white transition-colors" aria-label="Menu">
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-kaixin flex flex-col items-center justify-center gap-6 transition-all duration-400 border-2 border-foreground md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {["Work", "About", "Team", "Contact"].map((n) => (
          <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-3xl font-extrabold uppercase text-white tracking-wider hover:underline">{n}</a>
        ))}
      </div>

      <main className="flex-1">

        {/* ═══ HERO ═══ */}
        <section className="relative min-h-[92dvh] flex items-center border-b-2 border-foreground">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, #111 0, #111 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #111 0, #111 1px, transparent 1px, transparent 40px)" }} />

          <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-28 pb-20 w-full">
            <div className="grid md:grid-cols-12 gap-8 md:gap-6 items-end">
              <div className="md:col-span-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <Stamp color="bg-kaixin text-white" rotate={-2}>Est. 2024</Stamp>
                    <Stamp color="bg-white text-foreground" rotate={1}>Jakarta, ID</Stamp>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                  className="text-[clamp(2.5rem,7.5vw,6.5rem)] font-extrabold leading-[0.9] tracking-[-0.03em] uppercase"
                >
                  We don&rsquo;t
                  <br />
                  do boring
                  <br />
                  <span className="relative inline-block">
                    <span className="bg-kaixin text-white px-3 -rotate-1 inline-block">software</span>
                  </span>
                  <span className="text-kaixin">.</span>
                </motion.h1>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-end">
                  <p className="text-[15px] leading-relaxed max-w-sm text-foreground/70">
                    Small studio. Big standards. We build digital products that don&rsquo;t suck — founded by Yovi Widianto.
                  </p>
                  <a href="#work" className="inline-flex items-center gap-2 bg-foreground text-white px-5 py-3 font-bold text-[13px] uppercase tracking-wider border-2 border-foreground hover:bg-kaixin transition-colors shadow-[4px_4px_0_0_#FF6600]">
                    See Work
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>

              {/* Side block */}
              <div className="md:col-span-4">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <Block hover={false} className="bg-kaixin border-foreground shadow-[4px_4px_0_0_#111]">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-white/60 mb-4">The short version</p>
                    <div className="space-y-3 text-white">
                      <div className="flex justify-between border-b border-white/20 pb-2">
                        <span className="font-bold text-[13px] uppercase">Projects</span>
                        <span className="font-mono text-[13px]">200+</span>
                      </div>
                      <div className="flex justify-between border-b border-white/20 pb-2">
                        <span className="font-bold text-[13px] uppercase">Retention</span>
                        <span className="font-mono text-[13px]">98%</span>
                      </div>
                      <div className="flex justify-between border-b border-white/20 pb-2">
                        <span className="font-bold text-[13px] uppercase">Team</span>
                        <span className="font-mono text-[13px]">15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-[13px] uppercase">Rating</span>
                        <span className="font-mono text-[13px]">4.9/5</span>
                      </div>
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
                  <Stamp color="bg-kaixin text-white" rotate={-2}>What we do</Stamp>
                  <h2 className="text-3xl md:text-[3rem] font-extrabold tracking-tight uppercase mt-5">
                    Six things.
                    <br />
                    <span className="text-foreground/40">No more, no less.</span>
                  </h2>
                </div>
              </div>
            </In>

            {/* Stacked blocks — brutalist style */}
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((s, i) => (
                <In key={s.num} delay={i * 0.06}>
                  <Block className="group cursor-pointer h-full">
                    <div className="flex items-start justify-between mb-5">
                      <span className="font-mono text-[13px] font-bold text-foreground/30">{s.num}</span>
                      <ExternalLink className="w-4 h-4 text-foreground/20 group-hover:text-kaixin transition-colors" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight mb-3 group-hover:text-kaixin transition-colors">{s.title}</h3>
                    <p className="text-[14px] leading-relaxed text-foreground/60 mb-6">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tools.map((t) => (
                        <span key={t} className="font-mono text-[11px] uppercase tracking-wider bg-background border border-foreground px-2.5 py-1">{t}</span>
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
              <Stamp color="bg-white text-foreground border-white" rotate={2}>Selected</Stamp>
              <h2 className="text-3xl md:text-[3rem] font-extrabold tracking-tight uppercase mt-5 text-white">
                Things we shipped<span className="text-kaixin">.</span>
              </h2>
            </In>

            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((p, i) => (
                <In key={i} delay={i * 0.08}>
                  <Block hover={true} bg="bg-foreground" className="border-white group cursor-pointer">
                    <div className="flex items-start justify-between mb-6">
                      <span className="font-mono text-[11px] font-bold text-kaixin bg-kaixin/20 px-2 py-1">{p.tag}</span>
                      <span className="font-mono text-[12px] text-white/40">{p.year}</span>
                    </div>
                    <p className="text-lg md:text-xl font-bold uppercase leading-snug text-white mb-5">{p.title}</p>
                    <div className="flex items-center gap-2 text-white/50 group-hover:text-kaixin group-hover:gap-3 transition-all text-[13px] font-bold uppercase tracking-wider">
                      <span>Case study</span>
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
                  <Stamp color="bg-kaixin text-white" rotate={-3}>About</Stamp>
                  <h2 className="text-3xl md:text-[3rem] font-extrabold tracking-tight uppercase mt-5 leading-[1.05]">
                    Small team.
                    <br />
                    No BS<span className="text-foreground/30">.</span>
                  </h2>
                </In>
                <In delay={0.1} className="mt-8 space-y-6 text-[15px] leading-[1.85] text-foreground/70 max-w-lg">
                  <p>
                    Kaixin started because <span className="text-foreground font-bold border-b-2 border-kaixin">Yovi Widianto</span> was tired of seeing talented teams ship mediocre products. So he built a studio where craft still matters.
                  </p>
                  <p>
                    We&rsquo;re designers and engineers who ask one question: <em>&ldquo;Does this make someone&rsquo;s day better?&rdquo;</em> The name Kaixin (开心) means <span className="font-bold text-foreground">happy</span>. That&rsquo;s the bar. Not metrics. Not vanity features. Happiness.
                  </p>
                </In>

                {/* Things we don't do — brutalist list */}
                <In delay={0.2} className="mt-12">
                  <Block hover={false} className="bg-secondary">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-foreground/40 mb-5">Things we absolutely don&rsquo;t do</p>
                    <div className="space-y-3">
                      {[
                        "Charge by the hour",
                        "Outsource your project to strangers",
                        "Write 40-page proposals nobody reads",
                        "Use the word 'synergy' unironically",
                        "Ship and ghost",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <span className="font-mono text-kaixin font-bold text-lg leading-none mt-0.5">✕</span>
                          <span className="text-[14px] text-foreground/70">{item}</span>
                        </div>
                      ))}
                    </div>
                  </Block>
                </In>
              </div>

              {/* Right — philosophy cards */}
              <div className="md:col-span-5 space-y-4">
                {[
                  { label: "PHILOSOPHY 01", text: "The best code is the code nobody thinks about.", color: "bg-kaixin text-white border-foreground" },
                  { label: "PHILOSOPHY 02", text: "If it takes a tutorial to use, we failed.", color: "bg-white text-foreground border-foreground" },
                  { label: "PHILOSOPHY 03", text: "Ship early. Fix fast. Repeat.", color: "bg-white text-foreground border-foreground" },
                  { label: "PHILOSOPHY 04", text: "Good design is invisible. Great design is unforgettable.", color: "bg-foreground text-white border-white" },
                ].map((item, i) => (
                  <In key={i} delay={i * 0.08}>
                    <Block hover={true} className={item.color} style={{ boxShadow: "4px 4px 0 0 #FF6600" }}>
                      <p className="font-mono text-[10px] tracking-[0.2em] opacity-50 mb-3">{item.label}</p>
                      <p className="text-[17px] font-bold leading-snug">{item.text}</p>
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
              <Stamp color="bg-foreground text-white" rotate={2}>Team</Stamp>
              <h2 className="text-3xl md:text-[3rem] font-extrabold tracking-tight uppercase mt-5">
                The humans<span className="text-foreground/30">.</span>
              </h2>
            </In>

            {/* Founder — big block */}
            <In className="mb-6">
              <Block hover={true} className="md:flex md:items-center md:gap-12">
                <div className="flex items-start gap-6 md:w-1/3">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-none border-2 border-foreground bg-kaixin flex items-center justify-center shadow-[3px_3px_0_0_#111] flex-shrink-0 stamp-alt">
                    <span className="text-3xl md:text-4xl font-extrabold text-white">YW</span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight">Yovi Widianto</h3>
                    <Stamp color="bg-kaixin text-white border-foreground" rotate={-2}>Founder</Stamp>
                  </div>
                </div>
                <div className="mt-6 md:mt-0 md:w-2/3">
                  <p className="text-[15px] leading-[1.8] text-foreground/60 mb-6">
                    Started Kaixin because he kept seeing talented teams build mediocre products. Believes the best code is the code you never think about. Previously shipped products used by millions across Southeast Asia.
                  </p>
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

            {/* Other team — row of blocks */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {team.filter(t => !t.founder).map((m) => (
                <In key={m.name}>
                  <Block hover={true} className="text-center group">
                    <div className="w-14 h-14 mx-auto border-2 border-foreground bg-secondary flex items-center justify-center mb-4 group-hover:bg-kaixin group-hover:text-white transition-colors shadow-[2px_2px_0_0_#111]">
                      <span className="font-bold text-[13px]">{m.initials}</span>
                    </div>
                    <p className="font-bold text-[14px] uppercase tracking-tight">{m.name}</p>
                    <p className="font-mono text-[10px] tracking-[0.15em] text-foreground/40 mt-1">{m.role}</p>
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
                Got a project<span className="text-kaixin">?</span>
              </h2>
              <p className="text-foreground/50 text-[15px] mt-4 max-w-md mx-auto">Drop us a line. We reply within 24 hours. No sales pitch, we promise.</p>
              <div className="mt-8 flex justify-center gap-4">
                <a href="#contact" className="inline-flex items-center gap-2 bg-kaixin text-white px-6 py-3.5 font-bold text-[13px] uppercase tracking-wider border-2 border-foreground shadow-[4px_4px_0_0_#111] hover:shadow-[2px_2px_0_0_#111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  Let&rsquo;s Talk
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
                  <Stamp color="bg-kaixin text-white border-white" rotate={-2}>Contact</Stamp>
                  <h2 className="text-3xl md:text-[3rem] font-extrabold tracking-tight uppercase mt-5 text-white">
                    Write us<span className="text-kaixin">.</span>
                  </h2>
                </In>
                <In delay={0.1} className="mt-10 space-y-5">
                  <p className="text-white/50 text-[15px] leading-relaxed max-w-sm">Project, idea, or rough sketch. We read every message. Reply within 24 hours.</p>
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
                      <label className="block font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2">Name</label>
                      <Input name="name" placeholder="Your name" required className="h-12 bg-transparent border-2 border-white text-white text-[15px] placeholder:text-white/30 focus:border-kaixin focus:ring-0 rounded-none shadow-none" />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2">Email</label>
                      <Input name="email" type="email" placeholder="you@co.com" required className="h-12 bg-transparent border-2 border-white text-white text-[15px] placeholder:text-white/30 focus:border-kaixin focus:ring-0 rounded-none shadow-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2">Subject</label>
                    <Input name="subject" placeholder="What's this about?" required className="h-12 bg-transparent border-2 border-white text-white text-[15px] placeholder:text-white/30 focus:border-kaixin focus:ring-0 rounded-none shadow-none" />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2">Message</label>
                    <Textarea name="message" placeholder="Tell us everything." required rows={5} className="bg-transparent border-2 border-white text-white text-[15px] placeholder:text-white/30 focus:border-kaixin focus:ring-0 rounded-none shadow-none resize-none" />
                  </div>
                  <Button type="submit" disabled={sending} className="h-12 w-full sm:w-auto bg-kaixin hover:bg-kaixin-dark text-white text-[13px] font-bold uppercase tracking-wider px-8 border-2 border-white shadow-[3px_3px_0_0_rgba(255,255,255,0.3)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all gap-2">
                    {sending ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                    Send it
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
          <p className="font-mono text-[11px] text-foreground/40 uppercase tracking-wider">© {new Date().getFullYear()} — Built with stubbornness</p>
          <div className="flex gap-4">
            {["Twitter", "GitHub", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="font-mono text-[11px] text-foreground/40 uppercase tracking-wider hover:text-kaixin transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* Back to top */}
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
