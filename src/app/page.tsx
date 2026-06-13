"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Rocket,
  Shield,
  Zap,
  Users,
  Code,
  Globe,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Send,
  ChevronUp,
  Heart,
  Lightbulb,
  Target,
  Sparkles,
  Star,
  CheckCircle2,
  Linkedin,
  Twitter,
  Github,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

/* ─── Animated Counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Fade-in wrapper ─── */
function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const dirMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section Heading ─── */
function SectionHeading({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <FadeIn>
        <Badge
          variant="secondary"
          className="bg-kaixin-50 text-kaixin-600 hover:bg-kaixin-100 border-kaixin-200 mb-4 px-4 py-1.5 text-sm font-medium"
        >
          {badge}
        </Badge>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
          {title}
        </h2>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {subtitle}
        </p>
      </FadeIn>
    </div>
  );
}

/* ─────────────────────────── MAIN PAGE ─────────────────────────── */
export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name") as string,
      email: data.get("email") as string,
      subject: data.get("subject") as string,
      message: data.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
        className: "bg-kaixin-50 border-kaixin-200 text-kaixin-800",
      });
      form.reset();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ───── NAVBAR ───── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-lg shadow-sm border-b border-kaixin-100"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/logo-kaixin.png"
                alt="Kaixin Logo"
                width={42}
                height={42}
                className="rounded-xl transition-transform group-hover:scale-105"
              />
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-kaixin-400 to-kaixin-600 opacity-0 group-hover:opacity-20 blur transition-opacity" />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight">
              <span className="text-foreground">Kai</span>
              <span className="text-kaixin">xin</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-kaixin transition-colors rounded-lg hover:bg-kaixin-50"
              >
                {l.label}
              </a>
            ))}
            <Button
              asChild
              className="ml-3 bg-kaixin hover:bg-kaixin-dark text-white shadow-lg shadow-kaixin/25 hover:shadow-kaixin/40 transition-all"
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-kaixin-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-kaixin-100 overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-kaixin hover:bg-kaixin-50 rounded-lg transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
                <Button
                  asChild
                  className="mt-2 bg-kaixin hover:bg-kaixin-dark text-white"
                >
                  <a href="#contact" onClick={() => setMobileOpen(false)}>
                    Get in Touch
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        {/* ───── HERO ───── */}
        <section className="relative overflow-hidden min-h-[100vh] flex items-center">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-kaixin-50 via-white to-kaixin-50/30" />
          <div className="absolute top-20 right-10 w-72 h-72 md:w-[500px] md:h-[500px] bg-kaixin/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-60 h-60 md:w-96 md:h-96 bg-kaixin-200/20 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #FF6600 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <FadeIn>
                  <Badge
                    variant="secondary"
                    className="bg-kaixin-100/80 text-kaixin-700 border-kaixin-200 mb-6 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    Innovation-Driven Startup
                  </Badge>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
                    Building the{" "}
                    <span className="gradient-text">Future</span>
                    <br />
                    with{" "}
                    <span className="relative inline-block">
                      Kaixin
                      <svg
                        className="absolute -bottom-2 left-0 w-full"
                        viewBox="0 0 200 12"
                        fill="none"
                      >
                        <path
                          d="M2 8C50 2 150 2 198 8"
                          stroke="#FF6600"
                          strokeWidth="4"
                          strokeLinecap="round"
                          opacity="0.4"
                        />
                      </svg>
                    </span>
                  </h1>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
                    We create innovative technology solutions that empower
                    businesses and bring happiness to people&apos;s lives.
                    Simplifying complexity, one solution at a time.
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-kaixin hover:bg-kaixin-dark text-white shadow-lg shadow-kaixin/30 hover:shadow-kaixin/50 transition-all text-base px-8"
                    >
                      <a href="#services">
                        Explore Our Solutions
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-kaixin-200 text-kaixin hover:bg-kaixin-50 hover:text-kaixin-dark transition-all text-base px-8"
                    >
                      <a href="#about">Learn More</a>
                    </Button>
                  </div>
                </FadeIn>
                <FadeIn delay={0.4}>
                  <div className="mt-12 flex items-center gap-8">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-kaixin-300 to-kaixin-500 flex items-center justify-center text-white text-xs font-bold"
                        >
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Trusted by 200+ clients
                      </p>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-kaixin text-kaixin"
                          />
                        ))}
                        <span className="ml-1.5 text-xs text-muted-foreground">
                          4.9/5 rating
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Hero visual */}
              <FadeIn delay={0.3} direction="right">
                <div className="relative hidden lg:block">
                  <div className="relative w-full aspect-square max-w-[520px] mx-auto">
                    {/* Floating cards */}
                    <motion.div
                      animate={{ y: [0, -12, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-8 -left-4 bg-white rounded-2xl shadow-xl shadow-kaixin/10 p-4 border border-kaixin-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-kaixin to-kaixin-dark flex items-center justify-center">
                          <Rocket className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            Fast Delivery
                          </p>
                          <p className="text-xs text-muted-foreground">
                            2x faster
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                      className="absolute top-32 -right-4 bg-white rounded-2xl shadow-xl shadow-kaixin/10 p-4 border border-kaixin-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-kaixin-300 to-kaixin-500 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            Secure
                          </p>
                          <p className="text-xs text-muted-foreground">
                            99.9% uptime
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      className="absolute bottom-24 left-8 bg-white rounded-2xl shadow-xl shadow-kaixin/10 p-4 border border-kaixin-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-kaixin-400 to-kaixin-600 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            Performance
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Optimized
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Main logo showcase */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 rounded-[2rem] bg-gradient-to-br from-kaixin via-kaixin-light to-kaixin-300 shadow-2xl shadow-kaixin/30 flex items-center justify-center animate-pulse-glow">
                        <Image
                          src="/logo-kaixin.png"
                          alt="Kaixin Logo"
                          width={180}
                          height={180}
                          className="rounded-[1.5rem]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 rounded-full border-2 border-kaixin/30 flex justify-center pt-2">
              <div className="w-1.5 h-3 rounded-full bg-kaixin" />
            </div>
          </motion.div>
        </section>

        {/* ───── ABOUT ───── */}
        <section id="about" className="py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="About Us"
              title="Who We Are"
              subtitle="A passionate team driven by innovation, building technology that makes a real difference in people's lives."
            />

            <div className="grid lg:grid-cols-2 gap-16 items-center mt-8">
              <FadeIn direction="right">
                <div className="relative">
                  <div className="bg-gradient-to-br from-kaixin-50 to-kaixin-100 rounded-3xl p-8 md:p-12">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-kaixin-100">
                        <Heart className="w-8 h-8 text-kaixin mb-3" />
                        <h4 className="font-bold text-foreground text-sm mb-1">
                          Passion
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Love for what we build
                        </p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-kaixin-100 mt-8">
                        <Lightbulb className="w-8 h-8 text-kaixin mb-3" />
                        <h4 className="font-bold text-foreground text-sm mb-1">
                          Innovation
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Always pushing boundaries
                        </p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-kaixin-100">
                        <Users className="w-8 h-8 text-kaixin mb-3" />
                        <h4 className="font-bold text-foreground text-sm mb-1">
                          Community
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Together we grow
                        </p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-kaixin-100 mt-8">
                        <Target className="w-8 h-8 text-kaixin mb-3" />
                        <h4 className="font-bold text-foreground text-sm mb-1">
                          Excellence
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Quality in every detail
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Decorative */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-kaixin-200/30 rounded-full blur-xl" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-kaixin-100/50 rounded-full blur-xl" />
                </div>
              </FadeIn>

              <div className="space-y-6">
                <FadeIn delay={0.1}>
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                      Our{" "}
                      <span className="gradient-text">Mission</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      At Kaixin, we believe that technology should serve to make
                      life simpler and more joyful. Our name means &ldquo;happy&rdquo; in
                      Chinese, and that&apos;s exactly what we aim to deliver — happiness
                      through innovation. We build products that empower businesses
                      to grow while creating delightful experiences for their users.
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                      Our{" "}
                      <span className="gradient-text">Vision</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To become the leading technology partner for businesses
                      across Southeast Asia, known for our commitment to quality,
                      innovation, and customer satisfaction. We envision a future
                      where every business, regardless of size, has access to
                      world-class technology solutions.
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {[
                      "Innovation First",
                      "User-Centric",
                      "Quality Driven",
                      "Community Focused",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 bg-kaixin-50 text-kaixin-700 px-4 py-2 rounded-full text-sm font-medium border border-kaixin-100"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {item}
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* ───── STATS ───── */}
        <section className="py-20 bg-gradient-to-r from-kaixin to-kaixin-dark relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                {
                  value: 200,
                  suffix: "+",
                  label: "Happy Clients",
                },
                { value: 50, suffix: "+", label: "Projects Delivered" },
                { value: 15, suffix: "+", label: "Team Members" },
                { value: 98, suffix: "%", label: "Client Satisfaction" },
              ].map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 0.1}>
                  <div className="text-center">
                    <p className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-kaixin-100 text-sm md:text-base font-medium">
                      {stat.label}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ───── SERVICES ───── */}
        <section id="services" className="py-24 md:py-32 bg-gradient-to-b from-white to-kaixin-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Our Services"
              title="What We Do"
              subtitle="We offer a comprehensive suite of technology services designed to help your business thrive in the digital era."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: Code,
                  title: "Software Development",
                  desc: "Custom software solutions tailored to your business needs. From web applications to enterprise systems, we build with quality and scalability in mind.",
                  features: ["Web Applications", "Mobile Apps", "API Development"],
                },
                {
                  icon: Globe,
                  title: "Digital Solutions",
                  desc: "Transform your digital presence with our comprehensive digital solutions. We create engaging experiences that convert visitors into loyal customers.",
                  features: ["UI/UX Design", "Digital Strategy", "Brand Identity"],
                },
                {
                  icon: Zap,
                  title: "Cloud & DevOps",
                  desc: "Optimize your infrastructure with our cloud and DevOps expertise. We help you scale efficiently while maintaining reliability and security.",
                  features: ["Cloud Migration", "CI/CD Pipelines", "Monitoring"],
                },
                {
                  icon: Shield,
                  title: "Cybersecurity",
                  desc: "Protect your digital assets with our robust security solutions. We implement industry best practices to keep your data safe and secure.",
                  features: ["Security Audits", "Penetration Testing", "Compliance"],
                },
                {
                  icon: Lightbulb,
                  title: "AI & Machine Learning",
                  desc: "Leverage the power of artificial intelligence to automate processes, gain insights, and create intelligent experiences for your users.",
                  features: ["AI Integration", "Data Analytics", "Automation"],
                },
                {
                  icon: Users,
                  title: "IT Consulting",
                  desc: "Get expert guidance on your technology strategy. Our consultants help you make informed decisions and implement solutions that drive growth.",
                  features: ["Tech Strategy", "System Architecture", "Team Augmentation"],
                },
              ].map((service, i) => (
                <FadeIn key={service.title} delay={i * 0.1}>
                  <Card className="group h-full border-kaixin-100 hover:border-kaixin-300 bg-white hover:shadow-xl hover:shadow-kaixin/5 transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-kaixin to-kaixin-dark flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-kaixin/20">
                        <service.icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {service.desc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((f) => (
                          <Badge
                            key={f}
                            variant="secondary"
                            className="bg-kaixin-50 text-kaixin-700 border-kaixin-100 text-xs"
                          >
                            {f}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ───── WHY CHOOSE US ───── */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Why Kaixin"
              title="Why Choose Us"
              subtitle="We combine technical excellence with a genuine passion for creating solutions that make a difference."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Rocket,
                  title: "Rapid Development",
                  desc: "We use cutting-edge tools and methodologies to deliver projects faster without compromising quality. Your time-to-market matters to us.",
                },
                {
                  icon: Heart,
                  title: "Client-Centric Approach",
                  desc: "Every project begins with understanding your unique needs. We tailor our solutions to perfectly align with your business goals.",
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  desc: "Security is baked into everything we build. Our solutions follow industry best practices and comply with international standards.",
                },
                {
                  icon: Users,
                  title: "Dedicated Team",
                  desc: "Work with a team of experienced professionals who are passionate about technology and committed to your success.",
                },
                {
                  icon: Zap,
                  title: "Scalable Solutions",
                  desc: "Our solutions are built to grow with your business. From startups to enterprises, we ensure your technology scales seamlessly.",
                },
                {
                  icon: Star,
                  title: "Proven Track Record",
                  desc: "With 200+ satisfied clients and counting, we have a demonstrated history of delivering exceptional results across industries.",
                },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.08}>
                  <div className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-kaixin-50 border border-kaixin-100 flex items-center justify-center group-hover:bg-kaixin group-hover:border-kaixin transition-all duration-300">
                      <item.icon className="w-6 h-6 text-kaixin group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ───── TEAM ───── */}
        <section id="team" className="py-24 md:py-32 bg-gradient-to-b from-kaixin-50/40 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Our Team"
              title="Meet the People Behind Kaixin"
              subtitle="A talented and dedicated team united by a common vision — to create technology that brings happiness."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Founder */}
              <FadeIn className="sm:col-span-2 lg:col-span-3 flex justify-center">
                <Card className="w-full max-w-md border-kaixin-100 bg-white overflow-hidden hover:shadow-xl hover:shadow-kaixin/10 transition-all duration-300">
                  <div className="h-32 bg-gradient-to-r from-kaixin to-kaixin-dark relative">
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-kaixin-200 to-kaixin-400 border-4 border-white shadow-lg flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">YW</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="pt-16 pb-8 text-center">
                    <Badge className="bg-kaixin text-white mb-3 border-0">
                      Founder & CEO
                    </Badge>
                    <h3 className="text-2xl font-bold text-foreground mb-1">
                      Yovi Widianto
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Visionary leader with a passion for innovation and a mission
                      to make technology accessible to everyone. With years of
                      experience in software development and business strategy,
                      Yovi founded Kaixin to bridge the gap between technology and
                      human happiness.
                    </p>
                    <div className="flex justify-center gap-3">
                      {[
                        { icon: Linkedin, label: "LinkedIn" },
                        { icon: Twitter, label: "Twitter" },
                        { icon: Github, label: "GitHub" },
                      ].map((social) => (
                        <button
                          key={social.label}
                          aria-label={social.label}
                          className="w-10 h-10 rounded-xl bg-kaixin-50 hover:bg-kaixin border border-kaixin-100 hover:border-kaixin flex items-center justify-center transition-all"
                        >
                          <social.icon className="w-4 h-4 text-kaixin hover:text-white transition-colors" />
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Other team members */}
              {[
                {
                  name: "Sarah Chen",
                  role: "CTO",
                  desc: "Engineering leader with deep expertise in cloud architecture",
                },
                {
                  name: "Budi Santoso",
                  role: "Head of Design",
                  desc: "Creative mind focused on user experience and visual storytelling",
                },
              ].map((member, i) => (
                <FadeIn key={member.name} delay={i * 0.15}>
                  <Card className="border-kaixin-100 bg-white hover:shadow-lg hover:shadow-kaixin/5 transition-all duration-300 text-center">
                    <CardContent className="pt-8 pb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-kaixin-100 to-kaixin-200 border-2 border-kaixin-100 mx-auto mb-4 flex items-center justify-center">
                        <span className="text-lg font-bold text-kaixin">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <h4 className="font-bold text-foreground mb-0.5">
                        {member.name}
                      </h4>
                      <p className="text-xs text-kaixin font-medium mb-2">
                        {member.role}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {member.desc}
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ───── TESTIMONIALS ───── */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Testimonials"
              title="What Our Clients Say"
              subtitle="Don't just take our word for it — hear from the businesses we've helped transform."
            />

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  quote:
                    "Kaixin transformed our digital presence completely. Their team understood our vision and delivered beyond expectations. Our sales increased by 150% within the first quarter.",
                  name: "Diana Putri",
                  role: "CEO, TechMart Indonesia",
                  avatar: "DP",
                },
                {
                  quote:
                    "Working with Kaixin felt like having an extension of our own team. Their technical expertise and dedication to quality is unmatched. Highly recommended!",
                  name: "Arif Rahman",
                  role: "CTO, FinanceHub",
                  avatar: "AR",
                },
                {
                  quote:
                    "The mobile app Kaixin built for us has been a game-changer. User engagement tripled and customer satisfaction scores are at an all-time high.",
                  name: "Mei Ling",
                  role: "Product Manager, GoFresh",
                  avatar: "ML",
                },
              ].map((t, i) => (
                <FadeIn key={t.name} delay={i * 0.15}>
                  <Card className="border-kaixin-100 bg-white h-full hover:shadow-lg hover:shadow-kaixin/5 transition-all duration-300">
                    <CardContent className="pt-6 pb-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className="w-4 h-4 fill-kaixin text-kaixin"
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-kaixin to-kaixin-dark flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            {t.avatar}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {t.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ───── CTA ───── */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-kaixin to-kaixin-dark" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-kaixin-400/20 rounded-full blur-3xl" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
                Ready to Transform
                <br />
                Your Business?
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-kaixin-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                Let&apos;s build something amazing together. Reach out to us and
                discover how Kaixin can help your business grow.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-kaixin hover:bg-kaixin-50 shadow-lg shadow-kaixin/30 transition-all text-base px-8 font-semibold"
                >
                  <a href="#contact">
                    Start a Project
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 transition-all text-base px-8"
                >
                  <a href="#services">View Services</a>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ───── CONTACT ───── */}
        <section id="contact" className="py-24 md:py-32 bg-gradient-to-b from-white to-kaixin-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Contact Us"
              title="Get in Touch"
              subtitle="Have a project in mind? We'd love to hear about it. Send us a message and we'll respond within 24 hours."
            />

            <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
              {/* Contact info */}
              <FadeIn direction="left" className="lg:col-span-2">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-6">
                      Let&apos;s Connect
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Whether you have a question about our services, pricing, or
                      anything else, our team is ready to answer all your questions.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {[
                      {
                        icon: Mail,
                        label: "Email Us",
                        value: "hello@kaixin.tech",
                      },
                      {
                        icon: Phone,
                        label: "Call Us",
                        value: "+62 812 3456 7890",
                      },
                      {
                        icon: MapPin,
                        label: "Visit Us",
                        value: "Jakarta, Indonesia",
                      },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-kaixin-50 border border-kaixin-100 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-kaixin" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-0.5">
                            {item.label}
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <p className="text-xs font-medium text-muted-foreground mb-3">
                      Follow Us
                    </p>
                    <div className="flex gap-3">
                      {[
                        { icon: Linkedin },
                        { icon: Twitter },
                        { icon: Github },
                        { icon: Instagram },
                      ].map((s, i) => (
                        <button
                          key={i}
                          aria-label="Social media"
                          className="w-10 h-10 rounded-xl bg-kaixin-50 hover:bg-kaixin border border-kaixin-100 hover:border-kaixin flex items-center justify-center transition-all"
                        >
                          <s.icon className="w-4 h-4 text-kaixin hover:text-white transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Contact form */}
              <FadeIn direction="right" className="lg:col-span-3">
                <Card className="border-kaixin-100 bg-white shadow-lg shadow-kaixin/5">
                  <CardContent className="p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Full Name
                          </label>
                          <Input
                            name="name"
                            placeholder="John Doe"
                            required
                            className="border-kaixin-100 focus:border-kaixin focus:ring-kaixin/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Email Address
                          </label>
                          <Input
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            className="border-kaixin-100 focus:border-kaixin focus:ring-kaixin/20"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Subject
                        </label>
                        <Input
                          name="subject"
                          placeholder="Project inquiry"
                          required
                          className="border-kaixin-100 focus:border-kaixin focus:ring-kaixin/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Message
                        </label>
                        <Textarea
                          name="message"
                          placeholder="Tell us about your project..."
                          required
                          rows={5}
                          className="border-kaixin-100 focus:border-kaixin focus:ring-kaixin/20 resize-none"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={sending}
                        className="w-full bg-kaixin hover:bg-kaixin-dark text-white shadow-lg shadow-kaixin/25 hover:shadow-kaixin/40 transition-all py-6 text-base font-semibold"
                      >
                        {sending ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Send Message
                          </span>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      {/* ───── FOOTER ───── */}
      <footer className="bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-kaixin rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-kaixin rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo-kaixin.png"
                  alt="Kaixin Logo"
                  width={36}
                  height={36}
                  className="rounded-lg"
                />
                <span className="text-xl font-bold">
                  <span className="text-white">Kai</span>
                  <span className="text-kaixin">xin</span>
                </span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed max-w-xs">
                Innovation that brings happiness. Building technology solutions
                that empower businesses and delight users.
              </p>
              <div className="flex gap-3 mt-6">
                {[Linkedin, Twitter, Github, Instagram].map((Icon, i) => (
                  <button
                    key={i}
                    aria-label="Social media"
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-kaixin flex items-center justify-center transition-all"
                  >
                    <Icon className="w-4 h-4 text-white/70 hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-white">Company</h4>
              <ul className="space-y-3">
                {["About", "Services", "Team", "Contact"].map((l) => (
                  <li key={l}>
                    <a
                      href={`#${l.toLowerCase()}`}
                      className="text-sm text-white/60 hover:text-kaixin transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-4 text-white">Services</h4>
              <ul className="space-y-3">
                {[
                  "Software Development",
                  "Digital Solutions",
                  "Cloud & DevOps",
                  "AI & ML",
                ].map((s) => (
                  <li key={s}>
                    <a
                      href="#services"
                      className="text-sm text-white/60 hover:text-kaixin transition-colors"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-4 text-white">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <Mail className="w-4 h-4 text-kaixin" />
                  hello@kaixin.tech
                </li>
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <Phone className="w-4 h-4 text-kaixin" />
                  +62 812 3456 7890
                </li>
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <MapPin className="w-4 h-4 text-kaixin" />
                  Jakarta, Indonesia
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50">
              &copy; {new Date().getFullYear()} Kaixin. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (p) => (
                  <a
                    key={p}
                    href="#"
                    className="text-xs text-white/50 hover:text-white/80 transition-colors"
                  >
                    {p}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* ───── BACK TO TOP ───── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-xl bg-kaixin text-white shadow-lg shadow-kaixin/30 hover:shadow-kaixin/50 flex items-center justify-center hover:bg-kaixin-dark transition-all"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
