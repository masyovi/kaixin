"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
  Mail,
  MapPin,
  Send,
  ChevronDown,
  Sparkles,
  Code2,
  Palette,
  Server,
  Smartphone,
  BrainCircuit,
  PenTool,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";
import Image from "next/image";

/* ═══════════════ ANIMATION HELPERS ═══════════════ */

function FadeUp({
  children,
  delay = 0,
  className = "",
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "left",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "left" | "right";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: direction === "left" ? -40 : 40,
      }}
      animate={
        isInView ? { opacity: 1, x: 0 } : {}
      }
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerChild({
  children,
  index = 0,
  className = "",
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
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
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setN(target);
        clearInterval(timer);
      } else {
        setN(Math.floor(current));
      }
    }, 25);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

/* ═══════════════ DECORATIVE BLOBS ═══════════════ */

function OrangeBlob({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full animate-blob pointer-events-none ${className}`}
      style={{
        background:
          "radial-gradient(circle, rgba(255,102,0,0.15) 0%, rgba(255,102,0,0) 70%)",
      }}
    />
  );
}

function OrangeBlobAlt({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full animate-blob-delay pointer-events-none ${className}`}
      style={{
        background:
          "radial-gradient(circle, rgba(255,102,0,0.1) 0%, rgba(255,102,0,0) 70%)",
      }}
    />
  );
}

/* ═══════════════ LANGUAGE TOGGLE ═══════════════ */

function LangToggle() {
  const { locale, setLocale } = useI18n();
  const toggle = () => setLocale(locale === "en" ? "id" : "en");
  const label = locale === "en" ? "ID" : "EN";

  return (
    <button
      onClick={toggle}
      className="relative w-9 h-9 rounded-full glass glass-hover flex items-center justify-center text-xs font-bold tracking-wider transition-all duration-300 hover:scale-105"
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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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
          name: fd.get("name"),
          email: fd.get("email"),
          subject: fd.get("subject"),
          message: fd.get("message"),
        }),
      });
      if (!res.ok) throw new Error();
      toast({ title: t("toast.sent"), description: t("toast.sent.desc") });
      e.currentTarget.reset();
    } catch {
      toast({
        title: t("toast.error"),
        description: t("toast.error.desc"),
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const services = [
    {
      icon: Palette,
      titleKey: "svc.01.title",
      descKey: "svc.01.desc",
      tools: ["Figma", "Prototyping", "Design Systems"],
    },
    {
      icon: Code2,
      titleKey: "svc.02.title",
      descKey: "svc.02.desc",
      tools: ["React", "Next.js", "TypeScript"],
    },
    {
      icon: BrainCircuit,
      titleKey: "svc.03.title",
      descKey: "svc.03.desc",
      tools: ["OpenAI", "LangChain", "Python"],
    },
    {
      icon: Server,
      titleKey: "svc.04.title",
      descKey: "svc.04.desc",
      tools: ["AWS", "Terraform", "Kubernetes"],
    },
    {
      icon: Smartphone,
      titleKey: "svc.05.title",
      descKey: "svc.05.desc",
      tools: ["Swift", "Kotlin", "React Native"],
    },
    {
      icon: PenTool,
      titleKey: "svc.06.title",
      descKey: "svc.06.desc",
      tools: ["Strategy", "Visual ID", "Motion"],
    },
  ];

  const projects = [
    {
      tagKey: "prj.01.tag",
      titleKey: "prj.01.title",
      year: "24",
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      tagKey: "prj.02.tag",
      titleKey: "prj.02.title",
      year: "24",
      color: "from-emerald-500/20 to-teal-500/20",
    },
    {
      tagKey: "prj.03.tag",
      titleKey: "prj.03.title",
      year: "24",
      color: "from-violet-500/20 to-purple-500/20",
    },
    {
      tagKey: "prj.04.tag",
      titleKey: "prj.04.title",
      year: "23",
      color: "from-sky-500/20 to-cyan-500/20",
    },
  ];

  const otherTeam = [
    { nameKey: "team.sarah.name", roleKey: "team.sarah.role", initials: "SC", color: "from-pink-500 to-rose-500" },
    { nameKey: "team.budi.name", roleKey: "team.budi.role", initials: "BS", color: "from-blue-500 to-indigo-500" },
    { nameKey: "team.linda.name", roleKey: "team.linda.role", initials: "LK", color: "from-emerald-500 to-teal-500" },
    { nameKey: "team.reza.name", roleKey: "team.reza.role", initials: "RP", color: "from-amber-500 to-orange-500" },
  ];

  const navItems = [
    { label: t("nav.work"), href: "#work" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.team"), href: "#team" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      {/* ═══════════ NAV ═══════════ */}
      <motion.header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between h-18">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-kaixin/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src="/logo-kaixin.png"
                alt="Kaixin"
                width={34}
                height={34}
                className="relative rounded-full"
              />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Kaixin
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm text-foreground/60 hover:text-foreground rounded-full hover:bg-white/5 transition-all duration-300"
              >
                {item.label}
              </a>
            ))}
            <div className="ml-3">
              <LangToggle />
            </div>
            <a
              href="#contact"
              className="ml-3 px-5 py-2.5 text-sm font-medium bg-kaixin hover:bg-kaixin-light text-white rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,102,0,0.3)]"
            >
              {t("cta.btn")}
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-full glass flex items-center justify-center"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </nav>
      </motion.header>

      {/* ═══════════ MOBILE MENU ═══════════ */}
      <motion.div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        initial={false}
        animate={
          menuOpen
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        transition={{ duration: 0.3 }}
      >
        {navItems.map((item, i) => (
          <motion.a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="text-2xl font-semibold tracking-tight text-foreground/80 hover:text-kaixin transition-colors"
            initial={false}
            animate={menuOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            {item.label}
          </motion.a>
        ))}
        <motion.div
          initial={false}
          animate={menuOpen ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-4"
        >
          <LangToggle />
        </motion.div>
      </motion.div>

      <main className="flex-1">
        {/* ═══════════ HERO ═══════════ */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background blobs */}
          <OrangeBlob className="w-[500px] h-[500px] -top-40 -right-40" />
          <OrangeBlobAlt className="w-[400px] h-[400px] top-1/2 -left-32" />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,102,0,0.08) 0%, transparent 60%)",
            }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="h-px w-8 bg-kaixin" />
                <span className="text-sm font-medium text-foreground/50 tracking-wider uppercase">
                  {t("hero.stamp.est")} — {t("hero.stamp.jakarta")}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
              >
                <span className="text-gradient-subtle">{t("hero.line1")}</span>
                <br />
                <span className="text-gradient-subtle">{t("hero.line2")}</span>
                <br />
                <span className="text-gradient-orange">{t("hero.highlight")}</span>
                <span className="text-kaixin">.</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 text-lg text-foreground/50 max-w-lg leading-relaxed"
              >
                {t("hero.desc")}
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-kaixin hover:bg-kaixin-light text-white font-medium rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,102,0,0.3)]"
                >
                  {t("hero.cta")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 glass glass-hover rounded-full font-medium text-sm transition-all duration-300"
                >
                  {t("nav.about")}
                </a>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { label: t("stat.projects"), value: "200+", suffix: "" },
                { label: t("stat.retention"), value: 98, suffix: "%" },
                { label: t("stat.team"), value: 15, suffix: "+" },
                { label: t("stat.rating"), value: 4.9, suffix: "/5" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-2xl p-5 text-center group hover:border-kaixin/20 transition-all duration-300"
                >
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    {typeof stat.value === "number" ? (
                      <CountUp target={stat.value} suffix={stat.suffix} />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-xs text-foreground/40 mt-1.5 font-medium tracking-wider uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-foreground/20" />
          </motion.div>
        </section>

        {/* ═══════════ SERVICES ═══════════ */}
        <section id="work" className="relative py-28 md:py-36">
          <OrangeBlob className="w-[400px] h-[400px] top-20 -right-32" />

          <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
            <FadeUp className="mb-16 md:mb-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-kaixin/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-kaixin" />
                </div>
                <span className="text-sm font-medium text-kaixin tracking-wider uppercase">
                  {t("svc.stamp")}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {t("svc.title")}
              </h2>
              <p className="text-foreground/40 mt-2 text-lg">{t("svc.subtitle")}</p>
            </FadeUp>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, i) => (
                <StaggerChild key={i} index={i}>
                  <div className="glass glass-hover rounded-2xl p-6 h-full group cursor-pointer transition-all duration-500 hover:shadow-[0_8px_40px_rgba(255,102,0,0.06)]">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-kaixin/10 flex items-center justify-center group-hover:bg-kaixin/20 transition-colors duration-300">
                        <service.icon className="w-5 h-5 text-kaixin" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-foreground/15 group-hover:text-kaixin group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-kaixin transition-colors duration-300">
                      {t(service.titleKey)}
                    </h3>
                    <p className="text-sm text-foreground/40 leading-relaxed mb-5">
                      {t(service.descKey)}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/5 text-foreground/40 border border-white/5"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerChild>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ PROJECTS (Horizontal Scroll) ═══════════ */}
        <section className="relative py-28 md:py-36 overflow-hidden">
          <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
            <FadeUp className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-kaixin/10 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-kaixin -rotate-45" />
                </div>
                <span className="text-sm font-medium text-kaixin tracking-wider uppercase">
                  {t("prj.stamp")}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {t("prj.title")}
              </h2>
            </FadeUp>
          </div>

          <div className="relative pl-6 lg:pl-[calc((100vw-72rem)/2+2rem)]">
            <div className="flex gap-5 overflow-x-auto scroll-hide pb-4 pr-6">
              {projects.map((project, i) => (
                <StaggerChild key={i} index={i} className="flex-shrink-0">
                  <div className="w-[340px] sm:w-[420px] rounded-2xl overflow-hidden glass glass-hover group cursor-pointer transition-all duration-500">
                    {/* Gradient header */}
                    <div
                      className={`h-40 bg-gradient-to-br ${project.color} flex items-end p-6`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-white/10 text-white/80 backdrop-blur-sm">
                          {t(project.tagKey)}
                        </span>
                        <span className="text-xs text-white/40 font-mono">
                          {project.year}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-base font-semibold leading-snug text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                        {t(project.titleKey)}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-kaixin/70 group-hover:text-kaixin transition-colors duration-300">
                        {t("svc.case")}
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </StaggerChild>
              ))}
            </div>
            {/* Fade edges */}
            <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>
        </section>

        {/* ═══════════ ABOUT ═══════════ */}
        <section id="about" className="relative py-28 md:py-36">
          <OrangeBlobAlt className="w-[500px] h-[500px] -bottom-40 -left-40" />

          <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
              <FadeIn direction="left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-kaixin/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-kaixin" />
                  </div>
                  <span className="text-sm font-medium text-kaixin tracking-wider uppercase">
                    {t("abt.stamp")}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                  {t("abt.title")} <br />
                  <span className="text-foreground/40">{t("abt.title2")}</span>
                </h2>

                <div className="mt-8 space-y-5 text-foreground/50 leading-relaxed">
                  <p>
                    {t("abt.p1")}{" "}
                    <span className="text-foreground font-semibold">
                      {t("abt.p1.bold")}
                    </span>{" "}
                    {t("abt.p1.rest")}
                  </p>
                  <p>
                    {t("abt.p2")}{" "}
                    <span className="text-foreground font-semibold">
                      {t("abt.p2.bold")}
                    </span>
                    . {t("abt.p2.end")}
                  </p>
                </div>
              </FadeIn>

              <div className="space-y-6">
                {/* Philosophy cards */}
                <FadeIn direction="right">
                  <div className="glass rounded-2xl p-6 glow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-kaixin animate-pulse" />
                      <span className="text-xs font-medium text-kaixin tracking-wider uppercase">
                        {t("dnd.title")}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {["dnd.1", "dnd.2", "dnd.3", "dnd.4", "dnd.5"].map(
                        (key) => (
                          <div
                            key={key}
                            className="flex items-center gap-3 text-sm text-foreground/50"
                          >
                            <div className="w-5 h-5 rounded-full bg-kaixin/10 flex items-center justify-center flex-shrink-0">
                              <X className="w-3 h-3 text-kaixin" />
                            </div>
                            {t(key)}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </FadeIn>

                {/* Philosophy statements */}
                <FadeIn direction="right" delay={0.15}>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { labelKey: "ph.01.label", textKey: "ph.01.text", accent: true },
                      { labelKey: "ph.02.label", textKey: "ph.02.text", accent: false },
                      { labelKey: "ph.03.label", textKey: "ph.03.text", accent: false },
                      { labelKey: "ph.04.label", textKey: "ph.04.text", accent: true },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] ${
                          item.accent
                            ? "bg-kaixin/10 border border-kaixin/15"
                            : "glass"
                        }`}
                      >
                        <p className="text-[10px] font-mono tracking-[0.15em] text-foreground/30 mb-2.5">
                          {t(item.labelKey)}
                        </p>
                        <p className="text-sm font-medium leading-snug text-foreground/70">
                          {t(item.textKey)}
                        </p>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ TEAM ═══════════ */}
        <section id="team" className="relative py-28 md:py-36">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, rgba(255,102,0,0.3), transparent 70%)" }} />
          </div>

          <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
            <FadeUp className="mb-16 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-kaixin/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-kaixin" />
                </div>
                <span className="text-sm font-medium text-kaixin tracking-wider uppercase">
                  {t("team.stamp")}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {t("team.title")}
              </h2>
            </FadeUp>

            {/* Founder */}
            <StaggerChild index={0} className="mb-8">
              <div className="glass rounded-2xl p-8 md:p-10 max-w-2xl mx-auto text-center relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,102,0,0.06), transparent 60%)" }} />
                <div className="relative">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-kaixin/20 animate-pulse-ring" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-kaixin to-kaixin-dark flex items-center justify-center shadow-lg shadow-kaixin/20">
                      <span className="text-2xl font-bold text-white">YW</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">
                    {t("team.yovi.name")}
                  </h3>
                  <span className="inline-block mt-2 px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-kaixin/10 text-kaixin border border-kaixin/15">
                    {t("team.founder.stamp")}
                  </span>
                  <p className="mt-6 text-sm text-foreground/40 leading-relaxed max-w-md mx-auto">
                    {t("team.yovi.desc")}
                  </p>
                  <div className="mt-6 flex justify-center gap-2">
                    {["LinkedIn", "GitHub", "Twitter"].map((s) => (
                      <button
                        key={s}
                        className="px-4 py-2 text-xs font-medium rounded-full glass glass-hover transition-all duration-300"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </StaggerChild>

            {/* Team grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {otherTeam.map((member, i) => (
                <StaggerChild key={member.initials} index={i + 1}>
                  <div className="glass glass-hover rounded-2xl p-6 text-center group transition-all duration-500 hover:scale-[1.02]">
                    <div
                      className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-sm font-bold text-white">
                        {member.initials}
                      </span>
                    </div>
                    <p className="text-sm font-semibold">{t(member.nameKey)}</p>
                    <p className="text-[11px] text-foreground/30 mt-1 tracking-wider font-medium">
                      {t(member.roleKey)}
                    </p>
                  </div>
                </StaggerChild>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CTA ═══════════ */}
        <section className="relative py-24 md:py-32">
          <OrangeBlob className="w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <FadeUp>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                {t("cta.title")}
              </h2>
              <p className="mt-5 text-foreground/40 text-lg max-w-md mx-auto">
                {t("cta.desc")}
              </p>
              <div className="mt-10">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-kaixin hover:bg-kaixin-light text-white font-medium rounded-full transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,102,0,0.35)] text-base"
                >
                  {t("cta.btn")}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ═══════════ CONTACT ═══════════ */}
        <section id="contact" className="relative py-28 md:py-36">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(255,102,0,0.04), transparent 50%)" }} />

          <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
              {/* Left */}
              <FadeIn direction="left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-kaixin/10 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-kaixin" />
                  </div>
                  <span className="text-sm font-medium text-kaixin tracking-wider uppercase">
                    {t("con.stamp")}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                  {t("con.title")}
                </h2>
                <p className="mt-5 text-foreground/40 max-w-sm leading-relaxed">
                  {t("con.desc")}
                </p>

                <div className="mt-10 space-y-4">
                  {[
                    {
                      icon: Mail,
                      label: "hello@kaixin.tech",
                    },
                    {
                      icon: MapPin,
                      label: "Brondong, Lamongan, Jawa Timur 62263",
                    },
                  ].map((contact) => (
                    <div
                      key={contact.label}
                      className="flex items-center gap-4 glass rounded-xl p-4 w-fit"
                    >
                      <div className="w-10 h-10 rounded-xl bg-kaixin/10 flex items-center justify-center">
                        <contact.icon className="w-4 h-4 text-kaixin" />
                      </div>
                      <span className="text-sm text-foreground/60">
                        {contact.label}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* Right — Form */}
              <FadeIn direction="right">
                <form
                  onSubmit={handleSubmit}
                  className="glass rounded-2xl p-6 md:p-8 space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground/30 mb-2 tracking-wider uppercase">
                        {t("con.name")}
                      </label>
                      <Input
                        name="name"
                        placeholder={t("con.name.ph")}
                        required
                        className="h-12 bg-white/5 border-white/10 rounded-xl text-sm placeholder:text-foreground/20 focus:border-kaixin/50 focus:ring-0 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground/30 mb-2 tracking-wider uppercase">
                        {t("con.email")}
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder={t("con.email.ph")}
                        required
                        className="h-12 bg-white/5 border-white/10 rounded-xl text-sm placeholder:text-foreground/20 focus:border-kaixin/50 focus:ring-0 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground/30 mb-2 tracking-wider uppercase">
                      {t("con.subject")}
                    </label>
                    <Input
                      name="subject"
                      placeholder={t("con.subject.ph")}
                      required
                      className="h-12 bg-white/5 border-white/10 rounded-xl text-sm placeholder:text-foreground/20 focus:border-kaixin/50 focus:ring-0 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground/30 mb-2 tracking-wider uppercase">
                      {t("con.message")}
                    </label>
                    <Textarea
                      name="message"
                      placeholder={t("con.message.ph")}
                      required
                      rows={5}
                      className="bg-white/5 border-white/10 rounded-xl text-sm placeholder:text-foreground/20 focus:border-kaixin/50 focus:ring-0 transition-colors resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={sending}
                    className="h-12 w-full sm:w-auto px-8 bg-kaixin hover:bg-kaixin-light text-white text-sm font-medium rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,102,0,0.3)] gap-2"
                  >
                    {sending ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {sending ? t("con.sending") : t("con.btn")}
                  </Button>
                </form>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo-kaixin.png"
              alt="Kaixin"
              width={20}
              height={20}
              className="rounded-full opacity-70"
            />
            <span className="text-sm font-medium text-foreground/50">
              Kaixin
            </span>
          </div>
          <p className="text-xs text-foreground/25">
            © {new Date().getFullYear()} — {t("ft.copy")}
          </p>
          <div className="flex gap-5">
            {["Twitter", "GitHub", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs text-foreground/25 hover:text-kaixin transition-colors duration-300"
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
