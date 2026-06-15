"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Locale = "en" | "id";

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: (k: string) => k,
});

/* ─────────────────────────── DICTIONARY ─────────────────────────── */

const dict: Record<Locale, Record<string, string>> = {
  en: {
    /* nav */
    "nav.work": "Work",
    "nav.about": "About",
    "nav.team": "Team",
    "nav.contact": "Contact",

    /* hero */
    "hero.stamp.est": "Est. 2024",
    "hero.stamp.jakarta": "Lamongan, ID",
    "hero.line1": "We don't",
    "hero.line2": "do boring",
    "hero.highlight": "software",
    "hero.desc": "Small studio. Big standards. We build digital products that don't suck — founded by Yovi Widianto.",
    "hero.cta": "See Work",

    /* stats */
    "stat.projects": "Projects",
    "stat.retention": "Retention",
    "stat.team": "Team",
    "stat.rating": "Rating",

    /* marquee top */
    "mq.design": "DESIGN",
    "mq.engineer": "ENGINEER",
    "mq.ship": "SHIP",
    "mq.iterate": "ITERATE",
    /* marquee bottom */
    "mq.react": "REACT",
    "mq.nextjs": "NEXT.JS",
    "mq.ai": "AI/ML",
    "mq.cloud": "CLOUD",
    "mq.mobile": "MOBILE",
    "mq.brand": "BRAND",
    "mq.devops": "DEVOPS",
    "mq.strategy": "STRATEGY",

    /* services */
    "svc.stamp": "What we do",
    "svc.title": "Six things.",
    "svc.subtitle": "No more, no less.",
    "svc.01.title": "Product Design",
    "svc.01.desc": "Figma → Prototype → Handoff. We don't just draw screens — we design flows that actually work.",
    "svc.02.title": "Web Engineering",
    "svc.02.desc": "React, Next.js, TypeScript. Performance-first. No 20MB bundles allowed.",
    "svc.03.title": "AI Integration",
    "svc.03.desc": "LLMs, RAG, NLP. We build AI features that feel useful, not forced.",
    "svc.04.title": "Cloud & Infra",
    "svc.04.desc": "AWS, Docker, K8s. Infrastructure that doesn't wake you up at 3AM.",
    "svc.05.title": "Mobile Apps",
    "svc.05.desc": "Native or cross-platform. We know when to pick which.",
    "svc.06.title": "Brand Identity",
    "svc.06.desc": "Logo, type, color, motion. The DNA of how people recognize you.",
    "svc.case": "Case study",

    /* projects */
    "prj.stamp": "Selected",
    "prj.title": "Things we shipped.",
    "prj.01.tag": "FINTECH",
    "prj.01.title": "Lending platform rebuilt for 2M+ users",
    "prj.02.tag": "HEALTH",
    "prj.02.title": "Telemedicine handling 50K monthly sessions",
    "prj.03.tag": "ECOM",
    "prj.03.title": "Checkout flow — +34% conversion overnight",
    "prj.04.tag": "SAAS",
    "prj.04.title": "Analytics dashboard for 400+ enterprise teams",

    /* about */
    "abt.stamp": "About",
    "abt.title": "Small team.",
    "abt.title2": "No BS.",
    "abt.p1": "Kaixin started because",
    "abt.p1.bold": "Yovi Widianto",
    "abt.p1.rest": "was tired of seeing talented teams ship mediocre products. So he built a studio where craft still matters.",
    "abt.p2": `We're designers and engineers who ask one question: "Does this make someone's day better?" The name Kaixin (开心) means`,
    "abt.p2.bold": "happy",
    "abt.p2.end": "That's the bar. Not metrics. Not vanity features. Happiness.",

    /* don't do */
    "dnd.title": "Things we absolutely don't do",
    "dnd.1": "Charge by the hour",
    "dnd.2": "Outsource your project to strangers",
    "dnd.3": "Write 40-page proposals nobody reads",
    "dnd.4": "Use the word 'synergy' unironically",
    "dnd.5": "Ship and ghost",

    /* philosophy */
    "ph.01.label": "PHILOSOPHY 01",
    "ph.01.text": "The best code is the code nobody thinks about.",
    "ph.02.label": "PHILOSOPHY 02",
    "ph.02.text": "If it takes a tutorial to use, we failed.",
    "ph.03.label": "PHILOSOPHY 03",
    "ph.03.text": "Ship early. Fix fast. Repeat.",
    "ph.04.label": "PHILOSOPHY 04",
    "ph.04.text": "Good design is invisible. Great design is unforgettable.",

    /* team */
    "team.stamp": "Team",
    "team.title": "The humans.",
    "team.founder.stamp": "Founder",
    "team.yovi.name": "Yovi Widianto",
    "team.yovi.desc": "Started Kaixin because he kept seeing talented teams build mediocre products. Believes the best code is the code you never think about. Previously shipped products used by millions across Southeast Asia.",
    "team.sarah.name": "Sarah Chen",
    "team.sarah.role": "CTO",
    "team.budi.name": "Budi Santoso",
    "team.budi.role": "DESIGN",
    "team.linda.name": "Linda Kusuma",
    "team.linda.role": "ENG LEAD",
    "team.reza.name": "Reza Pratama",
    "team.reza.role": "PRODUCT",

    /* cta */
    "cta.title": "Got a project?",
    "cta.desc": "Drop us a line. We reply within 24 hours. No sales pitch, we promise.",
    "cta.btn": "Let's Talk",

    /* contact */
    "con.stamp": "Contact",
    "con.title": "Write us.",
    "con.desc": "Project, idea, or rough sketch. We read every message. Reply within 24 hours.",
    "con.name": "Name",
    "con.name.ph": "Your name",
    "con.email": "Email",
    "con.email.ph": "you@co.com",
    "con.subject": "Subject",
    "con.subject.ph": "What's this about?",
    "con.message": "Message",
    "con.message.ph": "Tell us everything.",
    "con.btn": "Send it",
    "con.sending": "Sending...",

    /* toast */
    "toast.sent": "Sent ✓",
    "toast.sent.desc": "We'll reply within a day.",
    "toast.error": "Error",
    "toast.error.desc": "Try again.",

    /* footer */
    "ft.copy": "Built with stubbornness",

    /* lang */
    "lang.en": "EN",
    "lang.id": "ID",
  },

  id: {
    /* nav */
    "nav.work": "Karya",
    "nav.about": "Tentang",
    "nav.team": "Tim",
    "nav.contact": "Kontak",

    /* hero */
    "hero.stamp.est": "Est. 2024",
    "hero.stamp.jakarta": "Lamongan, ID",
    "hero.line1": "Kami nggak",
    "hero.line2": "buat software",
    "hero.highlight": "membosankan",
    "hero.desc": "Studio kecil. Standar besar. Kami membangun produk digital yang nggak payah — didirikan oleh Yovi Widianto.",
    "hero.cta": "Lihat Karya",

    /* stats */
    "stat.projects": "Proyek",
    "stat.retention": "Retensi",
    "stat.team": "Tim",
    "stat.rating": "Rating",

    /* marquee top */
    "mq.design": "DESAIN",
    "mq.engineer": "ENGINEERING",
    "mq.ship": "SHIP",
    "mq.iterate": "ITERASI",
    /* marquee bottom */
    "mq.react": "REACT",
    "mq.nextjs": "NEXT.JS",
    "mq.ai": "AI/ML",
    "mq.cloud": "CLOUD",
    "mq.mobile": "MOBILE",
    "mq.brand": "BRAND",
    "mq.devops": "DEVOPS",
    "mq.strategy": "STRATEGI",

    /* services */
    "svc.stamp": "Layanan kami",
    "svc.title": "Enam hal.",
    "svc.subtitle": "Nggak lebih, nggak kurang.",
    "svc.01.title": "Desain Produk",
    "svc.01.desc": "Figma → Prototype → Handoff. Kami nggak cuma gambar layar — kami desain alur yang beneran kerja.",
    "svc.02.title": "Web Engineering",
    "svc.02.desc": "React, Next.js, TypeScript. Performa dulu. Bundel 20MB nggak diperbolehkan.",
    "svc.03.title": "Integrasi AI",
    "svc.03.desc": "LLM, RAG, NLP. Kami bangun fitur AI yang berasa berguna, bukan dipaksakan.",
    "svc.04.title": "Cloud & Infra",
    "svc.04.desc": "AWS, Docker, K8s. Infrastruktur yang nggak bikin bangun jam 3 pagi.",
    "svc.05.title": "Aplikasi Mobile",
    "svc.05.desc": "Native atau cross-platform. Kami tahu kapan pilih yang mana.",
    "svc.06.title": "Identitas Brand",
    "svc.06.desc": "Logo, tipografi, warna, motion. DNA supaya orang kenal kamu.",
    "svc.case": "Studi kasus",

    /* projects */
    "prj.stamp": "Terpilih",
    "prj.title": "Yang sudah kami kirim.",
    "prj.01.tag": "FINTECH",
    "prj.01.title": "Platform pinjaman dibangun ulang untuk 2M+ pengguna",
    "prj.02.tag": "KESEHATAN",
    "prj.02.title": "Telemedisin menangani 50K sesi per bulan",
    "prj.03.tag": "ECOM",
    "prj.03.title": "Alur checkout — +34% konversi semalam",
    "prj.04.tag": "SAAS",
    "prj.04.title": "Dashboard analitik untuk 400+ tim enterprise",

    /* about */
    "abt.stamp": "Tentang",
    "abt.title": "Tim kecil.",
    "abt.title2": "Nggak muluk.",
    "abt.p1": "Kaixin mulai karena",
    "abt.p1.bold": "Yovi Widianto",
    "abt.p1.rest": "capek lihat tim berbakat ngirim produk yang biasa aja. Jadi dia bangun studio yang tetap mikirin craftsmanship.",
    "abt.p2": 'Kami desainer dan engineer yang tanya satu hal: "Ini bikin hari seseorang jadi lebih baik?" Nama Kaixin (开心) artinya',
    "abt.p2.bold": "bahagia",
    "abt.p2.end": "Itu standarnya. Bukan metrik. Bukan fitur gaya-gayaan. Kebahagiaan.",

    /* don't do */
    "dnd.title": "Yang pasti nggak kami lakuin",
    "dnd.1": "Narik bayaran per jam",
    "dnd.2": "Outsourcen proyek kamu ke orang asing",
    "dnd.3": "Bikin proposal 40 halaman yang nggak ada yang baca",
    "dnd.4": "Pakai kata 'sinergi' tanpa sadar",
    "dnd.5": "Ship terus ilang",

    /* philosophy */
    "ph.01.label": "FILOSOFI 01",
    "ph.01.text": "Kode terbaik adalah kode yang nggak ada yang kepikiran.",
    "ph.02.label": "FILOSOFI 02",
    "ph.02.text": "Kalau butuh tutorial buat pakai, kami gagal.",
    "ph.03.label": "FILOSOFI 03",
    "ph.03.text": "Ship cepat. Perbaiki cepat. Ulangi.",
    "ph.04.label": "FILOSOFI 04",
    "ph.04.text": "Desain bagus itu nggak kelihatan. Desain hebat itu nggak terlupakan.",

    /* team */
    "team.stamp": "Tim",
    "team.title": "Orang-orangnya.",
    "team.founder.stamp": "Pendiri",
    "team.yovi.name": "Yovi Widianto",
    "team.yovi.desc": "Mendirikan Kaixin karena terus melihat tim berbakat membangun produk biasa-biasa saja. Percaya kode terbaik adalah kode yang nggak perlu dipikirkan. Sebelumnya sudah mengirim produk yang dipakai jutaan orang di Asia Tenggara.",
    "team.sarah.name": "Sarah Chen",
    "team.sarah.role": "CTO",
    "team.budi.name": "Budi Santoso",
    "team.budi.role": "DESAIN",
    "team.linda.name": "Linda Kusuma",
    "team.linda.role": "ENG LEAD",
    "team.reza.name": "Reza Pratama",
    "team.reza.role": "PRODUK",

    /* cta */
    "cta.title": "Punya proyek?",
    "cta.desc": "Tulis aja. Kami balas dalam 24 jam. Tanpa sales pitch, janji.",
    "cta.btn": "Ngobrol Yuk",

    /* contact */
    "con.stamp": "Kontak",
    "con.title": "Tulis ke kami.",
    "con.desc": "Proyek, ide, atau sketsa kasar. Kami baca semua pesan. Balas dalam 24 jam.",
    "con.name": "Nama",
    "con.name.ph": "Nama kamu",
    "con.email": "Email",
    "con.email.ph": "kamu@perusahaan.com",
    "con.subject": "Subjek",
    "con.subject.ph": "Ini soal apa?",
    "con.message": "Pesan",
    "con.message.ph": "Ceritakan semuanya.",
    "con.btn": "Kirim",
    "con.sending": "Mengirim...",

    /* toast */
    "toast.sent": "Terkirim ✓",
    "toast.sent.desc": "Kami balas dalam sehari.",
    "toast.error": "Error",
    "toast.error.desc": "Coba lagi.",

    /* footer */
    "ft.copy": "Dibangun dengan kekerasan kepala",

    /* lang */
    "lang.en": "EN",
    "lang.id": "ID",
  },
};

/* ─────────────────────────── PROVIDER ─────────────────────────── */

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const t = useCallback(
    (key: string): string => {
      return dict[locale]?.[key] ?? dict.en[key] ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
