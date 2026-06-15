"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  X,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

/* ──────── utilities ──────── */

function Up({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const r = useRef(null);
  const v = useInView(r, { once: true, margin: "-60px" });
  return (
    <motion.div ref={r} initial={{ opacity: 0, y: 32 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Clip({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const r = useRef(null);
  const v = useInView(r, { once: true, margin: "-40px" });
  return (
    <div ref={r} className="overflow-hidden">
      <motion.div initial={{ y: "100%" }} animate={v ? { y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.div>
    </div>
  );
}

function Count({ target, s = "" }: { target: number; s?: string }) {
  const [n, setN] = useState(0);
  const r = useRef(null);
  const v = useInView(r, { once: true });
  useEffect(() => {
    if (!v) return;
    let c = 0;
    const step = target / 60;
    const t = setInterval(() => { c += step; if (c >= target) { setN(target); clearInterval(t); } else setN(Math.floor(c)); }, 25);
    return () => clearInterval(t);
  }, [v, target]);
  return <span ref={r}>{n.toLocaleString()}{s}</span>;
}

/* ──────── marquee ──────── */

const ticker = ["Product Design", "Web Apps", "Brand Systems", "Cloud Infra", "AI Products", "Mobile", "Strategy", "DevOps", "Rapid Prototyping"];

function Ticker() {
  const all = [...ticker, ...ticker];
  return (
    <div className="relative overflow-hidden border-t border-b border-ink/[0.08] py-4 select-none">
      <div className="animate-marquee flex whitespace-nowrap">
        {all.map((t, i) => (
          <span key={i} className="flex items-center gap-6 mx-6 text-[13px] font-medium tracking-wide text-ink-light">
            {t}
            <span className="w-1.5 h-1.5 rounded-full bg-kaixin/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────── horizontal projects ──────── */

const projects = [
  { tag: "Fintech", title: "Rebuilt the entire lending platform for 2M+ users", year: "2024" },
  { tag: "Healthcare", title: "Telemedicine app that handles 50K sessions monthly", year: "2024" },
  { tag: "E-Commerce", title: "Custom checkout that increased conversion by 34%", year: "2024" },
  { tag: "SaaS", title: "Analytics dashboard used by 400+ enterprise teams", year: "2023" },
  { tag: "Education", title: "LMS that went from 0 to 120K students in 8 months", year: "2023" },
];

function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <Up className="max-w-[1400px] mx-auto px-6 md:px-10 mb-10 md:mb-14">
        <p className="text-[13px] font-mono text-ink-faint tracking-wider uppercase mb-3">Selected work</p>
        <h2 className="text-3xl md:text-[2.8rem] font-bold tracking-tight">Things we shipped<span className="text-kaixin">.</span></h2>
      </Up>
      <div ref={scrollRef} className="flex gap-4 md:gap-5 overflow-x-auto px-6 md:px-10 pb-4 snap-x snap-mandatory scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {projects.map((p, i) => (
          <Up key={i} delay={i * 0.08} className="flex-shrink-0 w-[280px] md:w-[360px] snap-start">
            <div className="group h-full rounded-2xl border border-ink/[0.07] bg-white p-7 md:p-8 flex flex-col justify-between hover-lift cursor-pointer">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[12px] font-mono text-kaixin bg-kaixin/[0.08] px-2.5 py-1 rounded-md">{p.tag}</span>
                  <span className="text-[12px] font-mono text-ink-faint">{p.year}</span>
                </div>
                <p className="text-[17px] font-semibold leading-snug">{p.title}</p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-ink-light group-hover:text-kaixin group-hover:gap-2.5 transition-all text-[14px]">
                <span>View case</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Up>
        ))}
      </div>
    </section>
  );
}

/* ──────── page ──────── */

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const { toast } = useToast();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fd.get("name"), email: fd.get("email"), subject: fd.get("subject"), message: fd.get("message") }),
      });
      if (!res.ok) throw new Error();
      toast({ title: "Sent.", description: "We'll reply within 24 hours." });
      e.currentTarget.reset();
    } catch {
      toast({ title: "Oops.", description: "Something broke. Try again.", variant: "destructive" });
    } finally { setSending(false); }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* ═══ NAV ═══ */}
      <header className="fixed top-0 inset-x-0 z-50">
        <nav className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <a href="#" className="relative z-10 flex items-center gap-2.5 group">
            <Image src="/logo-kaixin.png" alt="" width={28} height={28} className="rounded-lg" />
            <span className="text-[15px] font-bold tracking-tight text-white mix-blend-difference">kaixin</span>
          </a>
          <div className="hidden md:flex items-center gap-1">
            {["Work", "About", "Team", "Contact"].map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} className="px-3.5 py-2 text-[13px] font-medium text-white/70 hover:text-white rounded-md hover:bg-white/10 transition-colors mix-blend-difference">{n}</a>
            ))}
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden z-10 w-10 h-10 flex items-center justify-center text-white mix-blend-difference" aria-label="Menu">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* mobile overlay */}
      <div className={`fixed inset-0 z-40 bg-ink flex flex-col items-center justify-center gap-8 transition-all duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {["Work", "About", "Team", "Contact"].map((n) => (
          <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-4xl font-extrabold text-white/90 hover:text-kaixin transition-colors tracking-tight">{n}</a>
        ))}
      </div>

      <main className="flex-1">

        {/* ═══ HERO ═══ */}
        <section ref={heroRef} className="relative overflow-hidden bg-ink min-h-[100dvh] flex items-center">
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full bg-kaixin/[0.06] blur-[100px]" />
            <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-kaixin/[0.03] blur-[80px]" />
          </motion.div>

          {/* Giant K background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="text-[clamp(20rem,50vw,42rem)] font-extrabold text-white/[0.03] leading-none tracking-tighter">K</span>
          </div>

          {/* diagonal line accent */}
          <div className="absolute top-0 right-[20%] w-px h-[40vh] bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

          <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-32 pb-24 md:pb-40 w-full">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mb-8">
                <span className="inline-flex items-center gap-2 text-[13px] font-mono text-white/40 tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-kaixin" />
                  Jakarta, ID
                </span>
              </motion.div>

              <Clip delay={0.1}>
                <h1 className="text-[clamp(2.8rem,8vw,7.5rem)] font-extrabold leading-[0.88] tracking-[-0.04em] text-white">
                  We make<br />
                  things that<br />
                  <span className="relative inline-block">
                    <span className="text-kaixin">matter</span>
                    <span className="absolute -bottom-2 left-0 w-full h-3 bg-kaixin/20 -skew-x-3 rounded" />
                  </span>
                  <span className="text-kaixin">.</span>
                </h1>
              </Clip>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-10 md:mt-14 flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-16">
                <p className="text-white/40 text-[15px] leading-[1.8] max-w-sm">
                  A small studio in Jakarta that designs, engineers, and ships digital products people actually enjoy using.
                </p>
                <a href="#work" className="group inline-flex items-center gap-2 text-[14px] font-semibold text-kaixin hover:gap-3 transition-all">
                  Scroll down
                  <ArrowDownRight className="w-4 h-4 group-hover:translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        <Ticker />

        {/* ═══ WORK ═══ */}
        <section id="work" className="py-20 md:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <Up>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 md:mb-20">
                <div>
                  <p className="text-[13px] font-mono text-ink-faint tracking-wider uppercase mb-3">01 — Capabilities</p>
                  <h2 className="text-3xl md:text-[3.2rem] font-bold tracking-tight leading-[1.05] max-w-lg">
                    We keep it focused.<br />Six things, done well.
                  </h2>
                </div>
                <p className="text-ink-light text-[15px] max-w-[260px] leading-relaxed">No &ldquo;full-service agency&rdquo; fluff. We do what we&rsquo;re great at.</p>
              </div>
            </Up>

            {/* Asymmetric list — NOT a grid */}
            <div className="space-y-0 divide-y divide-ink/[0.06]">
              {[
                { num: "01", title: "Product Design & Engineering", desc: "End-to-end. Research → design → code → ship. We don't hand off.", tags: ["React", "Next.js", "TypeScript", "Tailwind", "Figma"] },
                { num: "02", title: "AI & Machine Learning", desc: "LLM integration, NLP pipelines, computer vision. Useful, not gimmicky.", tags: ["Python", "LangChain", "OpenAI", "RAG"] },
                { num: "03", title: "Cloud & Infrastructure", desc: "AWS, GCP, Docker, Kubernetes. Systems that don't break at 3 AM.", tags: ["AWS", "Docker", "Terraform", "K8s"] },
                { num: "04", title: "Mobile Development", desc: "Native when it matters. React Native when it doesn't. We know the difference.", tags: ["Swift", "Kotlin", "React Native", "Flutter"] },
                { num: "05", title: "Brand & Identity", desc: "Logo, type, color, motion. The stuff that makes people recognize you instantly.", tags: ["Brand Strategy", "Visual Identity", "Motion Design"] },
                { num: "06", title: "Technical Consulting", desc: "Architecture reviews, tech audits, team mentoring. We've seen the pitfalls.", tags: ["Architecture", "Code Review", "CTO-as-a-Service"] },
              ].map((item, i) => (
                <Up key={item.num} delay={i * 0.06}>
                  <div className="group py-7 md:py-9 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 cursor-pointer hover:bg-ink/[0.02] -mx-3 px-3 md:-mx-6 md:px-6 rounded-xl transition-colors">
                    <span className="text-[13px] font-mono text-ink-faint md:w-12 flex-shrink-0">{item.num}</span>
                    <h3 className="text-lg md:text-[22px] font-bold tracking-tight md:w-72 flex-shrink-0 group-hover:text-kaixin transition-colors">{item.title}</h3>
                    <p className="text-ink-light text-[14px] leading-relaxed md:flex-1">{item.desc}</p>
                    <div className="hidden md:flex flex-wrap gap-1.5 flex-shrink-0">
                      {item.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-[11px] font-mono text-ink-faint bg-surface px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-ink-faint group-hover:text-kaixin group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0 hidden md:block" />
                  </div>
                </Up>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PROJECTS ═══ */}
        <Projects />

        {/* ═══ MANIFESTO ═══ */}
        <section className="relative overflow-hidden bg-ink">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-28 md:py-40 relative">
            {/* Giant quote mark */}
            <span className="absolute top-12 left-6 md:left-10 text-[12rem] md:text-[18rem] leading-none font-serif text-white/[0.03] select-none">&ldquo;</span>

            <Up>
              <p className="text-[13px] font-mono text-white/30 tracking-wider uppercase mb-12 relative">02 — Manifesto</p>
            </Up>
            <Up delay={0.1}>
              <blockquote className="relative max-w-4xl text-[clamp(1.5rem,3.5vw,2.6rem)] font-bold leading-[1.25] tracking-tight text-white">
                Technology should be invisible. The <span className="rough-underline text-kaixin">experience</span> is all that matters. We build things that work so well, people don&rsquo;t think about what&rsquo;s behind them.
              </blockquote>
            </Up>
            <Up delay={0.25} className="mt-14 flex items-center gap-4 relative">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-kaixin to-kaixin-dark flex items-center justify-center text-white text-[12px] font-bold shadow-lg shadow-kaixin/20">YW</div>
              <div>
                <p className="text-white text-[15px] font-semibold">Yovi Widianto</p>
                <p className="text-white/35 text-[13px]">Founder</p>
              </div>
            </Up>

            {/* Diagonal accent */}
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-kaixin/[0.04] rounded-full blur-3xl" />
          </div>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section id="about" className="py-24 md:py-36">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-12 gap-10 md:gap-0 items-start">
              {/* Left — huge text */}
              <div className="md:col-span-7 md:pr-16">
                <Up>
                  <p className="text-[13px] font-mono text-ink-faint tracking-wider uppercase mb-4">03 — About</p>
                </Up>
                <Clip>
                  <h2 className="text-4xl md:text-[4.5rem] font-extrabold tracking-tight leading-[0.95] mb-10">
                    Small team.<span className="text-ink-light">.<br /></span>
                    Outsized output<span className="text-ink-light">.</span>
                  </h2>
                </Clip>
                <Up delay={0.15}>
                  <div className="space-y-6 text-[15px] leading-[1.85] text-ink-light max-w-lg">
                    <p>
                      Kaixin started with a frustration: why do talented teams keep building mediocre products? Founded by <span className="text-ink font-semibold">Yovi Widianto</span>, we&rsquo;re designers and engineers who believe craft still matters.
                    </p>
                    <p>
                      We don&rsquo;t chase trends. We don&rsquo;t over-engineer. We ask one question: <em className="not-italic font-semibold text-ink">&ldquo;Does this make someone&rsquo;s day better?&rdquo;</em> The name Kaixin (开心) means &ldquo;happy&rdquo; — that&rsquo;s the bar.
                    </p>
                  </div>
                </Up>

                {/* We don't do — personality section */}
                <Up delay={0.25} className="mt-14">
                  <p className="text-[13px] font-mono text-ink-faint tracking-wider uppercase mb-5">Things we don&rsquo;t do</p>
                  <div className="space-y-3">
                    {[
                      "Charge by the hour",
                      "Promise the moon, deliver a rock",
                      "Outsource to random freelancers",
                      "Write 40-page proposals nobody reads",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <span className="text-kaixin text-lg leading-none">×</span>
                        <span className="text-[14px] text-ink-light">{item}</span>
                      </div>
                    ))}
                  </div>
                </Up>
              </div>

              {/* Right — numbers + visual */}
              <div className="md:col-span-5 md:pl-12 md:border-l md:border-ink/[0.08]">
                <div className="grid grid-cols-2 gap-x-8 gap-y-10 mb-14">
                  {[
                    { n: 200, s: "+", l: "Projects shipped" },
                    { n: 98, s: "%", l: "Client retention" },
                    { n: 15, s: "", l: "People" },
                    { n: 4.9, s: "/5", l: "Avg. rating" },
                  ].map((item) => (
                    <Up key={item.l}>
                      <div className="border-t border-ink/[0.08] pt-4">
                        <p className="text-3xl md:text-4xl font-extrabold tracking-tight"><Count target={item.n} s={item.s} /></p>
                        <p className="text-[12px] text-ink-faint mt-1 font-mono tracking-wider uppercase">{item.l}</p>
                      </div>
                    </Up>
                  ))}
                </div>

                <Up delay={0.2}>
                  <div className="relative rounded-2xl overflow-hidden aspect-[5/4] bg-paper">
                    <Image src="/logo-kaixin.png" alt="Kaixin" width={100} height={100} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl opacity-60 scale-75" />
                    <div className="absolute top-6 right-6 w-20 h-20 rounded-xl border border-ink/[0.06] rotate-6" />
                    <div className="absolute bottom-6 left-6 w-10 h-10 rounded-lg bg-kaixin/10" />
                    <div className="absolute top-1/2 right-8 w-3 h-3 rounded-full bg-kaixin/30" />
                  </div>
                </Up>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TEAM ═══ */}
        <section id="team" className="py-24 md:py-36 bg-paper">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <Up className="mb-16 md:mb-20">
              <p className="text-[13px] font-mono text-ink-faint tracking-wider uppercase mb-3">04 — Team</p>
              <h2 className="text-3xl md:text-[3.2rem] font-bold tracking-tight">People, not headcount.</h2>
            </Up>

            {/* Founder — editorial feature */}
            <Up className="mb-14 md:mb-20">
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-ink group">
                <div className="absolute inset-0 bg-gradient-to-r from-kaixin/[0.08] via-transparent to-transparent" />
                <div className="relative grid md:grid-cols-[1fr_1fr] gap-0">
                  <div className="p-10 md:p-16 lg:p-20 flex flex-col justify-center order-2 md:order-1">
                    <div className="flex items-center gap-3 mb-8">
                      <span className="text-[13px] font-mono text-white/30 tracking-wider">FOUNDER</span>
                      <span className="w-12 h-px bg-white/10" />
                    </div>
                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[0.95]">
                      Yovi<br />Widianto
                    </h3>
                    <p className="text-white/40 text-[15px] leading-[1.8] max-w-sm mt-6">
                      Started Kaixin because he kept seeing talented teams build mediocre products. Believes the best code is the code you never have to think about. Previously shipped products used by millions.
                    </p>
                    <div className="flex gap-2 mt-8">
                      {["LinkedIn", "GitHub", "Twitter"].map((s) => (
                        <button key={s} className="px-4 py-2.5 rounded-lg text-[13px] font-medium text-white/60 bg-white/[0.06] hover:bg-kaixin/20 hover:text-kaixin transition-all border border-white/[0.06] hover:border-kaixin/20">
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="relative hidden md:flex items-center justify-center min-h-[400px] lg:min-h-[500px] order-1 md:order-2">
                    <div className="w-44 h-44 lg:w-56 lg:h-56 rounded-3xl bg-gradient-to-br from-kaixin to-kaixin-dark/70 flex items-center justify-center shadow-2xl shadow-kaixin/20 rotate-[3deg] group-hover:rotate-0 transition-transform duration-700">
                      <span className="text-5xl lg:text-7xl font-extrabold text-white/80">YW</span>
                    </div>
                    <div className="absolute top-16 right-16 w-6 h-6 rounded-full border-2 border-white/[0.08]" />
                    <div className="absolute bottom-20 left-20 w-4 h-4 rounded-full bg-kaixin/20" />
                    <div className="absolute top-1/3 left-1/3 w-3 h-3 rounded-sm bg-white/[0.04] rotate-45" />
                  </div>
                </div>
              </div>
            </Up>

            {/* Other team — horizontal strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { name: "Sarah Chen", role: "CTO", i: "SC" },
                { name: "Budi Santoso", role: "Design Lead", i: "BS" },
                { name: "Linda Kusuma", role: "Eng. Lead", i: "LK" },
                { name: "Reza Pratama", role: "Product", i: "RP" },
              ].map((m) => (
                <Up key={m.name}>
                  <div className="p-6 md:p-7 rounded-2xl border border-ink/[0.05] bg-white hover-lift group">
                    <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center mb-4 group-hover:bg-kaixin/10 transition-colors">
                      <span className="text-[11px] font-bold text-ink/30 group-hover:text-kaixin transition-colors">{m.i}</span>
                    </div>
                    <p className="font-semibold text-[15px] leading-tight">{m.name}</p>
                    <p className="text-[12px] text-ink-light mt-1">{m.role}</p>
                  </div>
                </Up>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="contact" className="py-24 md:py-36">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-12 gap-10 md:gap-0">
              <div className="md:col-span-5 md:pr-16">
                <Up>
                  <p className="text-[13px] font-mono text-ink-faint tracking-wider uppercase mb-3">05 — Contact</p>
                  <h2 className="text-3xl md:text-[3.2rem] font-bold tracking-tight leading-[1.05] mb-6">
                    Let&rsquo;s make<br />something<span className="text-kaixin">.</span>
                  </h2>
                </Up>
                <Up delay={0.1}>
                  <p className="text-ink-light text-[15px] leading-[1.8] max-w-sm mb-10">
                    Project, idea, or napkin sketch — we&rsquo;re all ears. Reply within 24 hours, no exceptions.
                  </p>
                </Up>
                <Up delay={0.15}>
                  <div className="space-y-4">
                    {[
                      { icon: Mail, label: "hello@kaixin.tech" },
                      { icon: MapPin, label: "Jakarta, Indonesia" },
                    ].map((c) => (
                      <div key={c.label} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center"><c.icon className="w-4 h-4 text-ink-light" /></div>
                        <span className="text-[14px] text-ink-light">{c.label}</span>
                      </div>
                    ))}
                  </div>
                </Up>
              </div>

              <div className="md:col-span-7 md:pl-12 md:border-l md:border-ink/[0.08]">
                <Up delay={0.1}>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[13px] font-medium text-ink-light mb-2">Name</label>
                        <Input name="name" placeholder="Your name" required className="h-12 rounded-xl border-ink/10 bg-white text-[15px] placeholder:text-ink-faint focus:border-kaixin/40 focus:ring-kaixin/10" />
                      </div>
                      <div>
                        <label className="block text-[13px] font-medium text-ink-light mb-2">Email</label>
                        <Input name="email" type="email" placeholder="you@company.com" required className="h-12 rounded-xl border-ink/10 bg-white text-[15px] placeholder:text-ink-faint focus:border-kaixin/40 focus:ring-kaixin/10" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-ink-light mb-2">Subject</label>
                      <Input name="subject" placeholder="What's this about?" required className="h-12 rounded-xl border-ink/10 bg-white text-[15px] placeholder:text-ink-faint focus:border-kaixin/40 focus:ring-kaixin/10" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-ink-light mb-2">Message</label>
                      <Textarea name="message" placeholder="Tell us about your project, timeline, budget — whatever you've got." required rows={6} className="rounded-xl border-ink/10 bg-white text-[15px] placeholder:text-ink-faint focus:border-kaixin/40 focus:ring-kaixin/10 resize-none" />
                    </div>
                    <Button type="submit" disabled={sending} className="h-12 rounded-xl bg-ink hover:bg-ink/85 text-white text-[15px] font-medium px-8 gap-2 shadow-none hover:shadow-none transition-all">
                      {sending ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                      Send it
                    </Button>
                  </form>
                </Up>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-ink/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <Image src="/logo-kaixin.png" alt="" width={20} height={20} className="rounded-md" />
            <span className="text-[14px] font-bold text-ink">kaixin</span>
            <span className="text-[13px] text-ink-faint ml-2">&copy; {new Date().getFullYear()}</span>
          </div>
          <p className="text-[13px] text-ink-faint">Built with stubbornness in Jakarta.</p>
          <div className="flex gap-5">
            {["Twitter", "GitHub", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="text-[13px] text-ink-faint hover:text-ink transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </footer>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={showTop ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-xl bg-ink text-white flex items-center justify-center hover:bg-ink/80 transition-colors"
        aria-label="Top"
      >
        <ArrowUpRight className="w-4 h-4 -rotate-45" />
      </motion.button>
    </div>
  );
}
