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
    "abt.p1": "Kaixin was founded by",
    "abt.p1.bold": "Yovi Widianto",
    "abt.p1.rest": "with the belief that great products should be crafted with care, attention to detail, and a commitment to quality. After seeing many talented teams ship products that failed to reach their full potential, he set out to build a studio where craftsmanship remains at the heart of the process.",
    "abt.p2": `We are a team of designers and engineers guided by one simple question: "Will this make someone's day a little better?"`,
    "abt.p2.bold": "",
    "abt.p2.end": `The name Kaixin (开心) means "happiness." For us, happiness is not just a metric or a feature to showcase. It is the standard by which we design every experience we create.`,

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
    "hero.line1": "Kami tidak",
    "hero.line2": "membangun software",
    "hero.highlight": "yang biasa-biasa saja",
    "hero.desc": "Studio kecil. Standar tinggi. Kami membangun produk digital yang berkualitas dan berkesan — didirikan oleh Yovi Widianto.",
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
    "svc.stamp": "Layanan Kami",
    "svc.title": "Enam layanan.",
    "svc.subtitle": "Tidak lebih, tidak kurang.",
    "svc.01.title": "Desain Produk",
    "svc.01.desc": "Figma → Prototype → Handoff. Kami tidak hanya membuat tampilan — kami merancang alur pengalaman yang benar-benar berfungsi.",
    "svc.02.title": "Web Engineering",
    "svc.02.desc": "React, Next.js, TypeScript. Performa sebagai prioritas utama. Bundel 20MB tidak kami perbolehkan.",
    "svc.03.title": "Integrasi AI",
    "svc.03.desc": "LLM, RAG, NLP. Kami membangun fitur AI yang memberikan nilai nyata, bukan sekadar pelengkap.",
    "svc.04.title": "Cloud & Infra",
    "svc.04.desc": "AWS, Docker, K8s. Infrastruktur yang tangguh sehingga Anda tidak perlu terbangun pukul 3 pagi.",
    "svc.05.title": "Aplikasi Mobile",
    "svc.05.desc": "Native atau cross-platform. Kami memahami kapan harus memilih pendekatan yang tepat.",
    "svc.06.title": "Identitas Brand",
    "svc.06.desc": "Logo, tipografi, warna, motion. Fondasi visual yang membuat audiens mengenali dan mengingat brand Anda.",
    "svc.case": "Studi Kasus",

    /* projects */
    "prj.stamp": "Pilihan Terbaik",
    "prj.title": "Proyek yang telah kami selesaikan.",
    "prj.01.tag": "FINTECH",
    "prj.01.title": "Platform pinjaman digital yang dibangun ulang untuk 2Juta+ pengguna",
    "prj.02.tag": "KESEHATAN",
    "prj.02.title": "Platform telemedisin yang menangani 50.000 sesi per bulan",
    "prj.03.tag": "ECOMMERCE",
    "prj.03.title": "Optimisasi alur checkout — peningkatan konversi +34% dalam semalam",
    "prj.04.tag": "SAAS",
    "prj.04.title": "Dashboard analitik untuk 400+ tim perusahaan enterprise",

    /* about */
    "abt.stamp": "Tentang",
    "abt.title": "Tim kecil.",
    "abt.title2": "Tanpa basa-basi.",
    "abt.p1": "Kaixin didirikan oleh",
    "abt.p1.bold": "Yovi Widianto",
    "abt.p1.rest": "dengan keyakinan bahwa produk yang baik harus dibangun dengan penuh ketelitian, perhatian terhadap detail, serta komitmen terhadap kualitas. Setelah menyaksikan banyak tim berbakat menghasilkan produk yang belum sepenuhnya memaksimalkan potensinya, ia membangun sebuah studio yang menempatkan craftsmanship di jantung setiap proses pengerjaan.",
    "abt.p2": 'Kami adalah tim desainer dan engineer yang dipandu oleh satu pertanyaan sederhana: \"Apakah ini mampu membuat hari seseorang menjadi sedikit lebih baik?\"',
    "abt.p2.bold": "",
    "abt.p2.end": `Nama Kaixin (开心) berarti \"kebahagiaan\". Bagi kami, kebahagiaan bukan sekadar metrik atau fitur yang dipamerkan — melainkan standar yang menjadi landasan dalam merancang setiap pengalaman yang kami ciptakan.`,

    /* don't do */
    "dnd.title": "Hal-hal yang pasti tidak kami lakukan",
    "dnd.1": "Membebankan biaya per jam",
    "dnd.2": "Mengalihankan proyek Anda ke pihak ketiga",
    "dnd.3": "Menyusun proposal 40 halaman yang tidak akan dibaca siapa pun",
    "dnd.4": "Menggunakan istilah 'sinergi' tanpa kontensi yang jelas",
    "dnd.5": "Menyelesaikan proyek lalu menghilang tanpa kabar",

    /* philosophy */
    "ph.01.label": "FILOSOFI 01",
    "ph.01.text": "Kode terbaik adalah kode yang tidak perlu dipikirkan penggunanya.",
    "ph.02.label": "FILOSOFI 02",
    "ph.02.text": "Jika pengguna harus membaca panduan untuk menggunakannya, berarti kami gagal.",
    "ph.03.label": "FILOSOFI 03",
    "ph.03.text": "Rilis cepat. Perbaiki segera. Ulangi prosesnya.",
    "ph.04.label": "FILOSOFI 04",
    "ph.04.text": "Desain yang baik tidak terlihat. Desain yang luar biasa tidak terlupakan.",

    /* team */
    "team.stamp": "Tim",
    "team.title": "Orang-orang di balik Kaixin.",
    "team.founder.stamp": "Pendiri",
    "team.yovi.name": "Yovi Widianto",
    "team.yovi.desc": "Mendirikan Kaixin karena terus menyaksikan tim berbakat membangun produk yang biasa-biasa saja. Percaya bahwa kode terbaik adalah kode yang tidak perlu dipikirkan oleh penggunanya. Sebelumnya telah meluncurkan produk-produk yang digunakan jutaan orang di seluruh Asia Tenggara.",
    "team.sarah.name": "Sarah Chen",
    "team.sarah.role": "CTO",
    "team.budi.name": "Budi Santoso",
    "team.budi.role": "DESAIN",
    "team.linda.name": "Linda Kusuma",
    "team.linda.role": "ENG LEAD",
    "team.reza.name": "Reza Pratama",
    "team.reza.role": "PRODUK",

    /* cta */
    "cta.title": "Memiliki proyek yang ingin diwujudkan?",
    "cta.desc": "Hubungi kami. Kami merespons dalam 24 jam. Tanpa pitch penjualan, itu janji kami.",
    "cta.btn": "Mari Berdiskusi",

    /* contact */
    "con.stamp": "Kontak",
    "con.title": "Hubungi kami.",
    "con.desc": "Proyek, ide, atau sketsa kasar — kami membaca setiap pesan yang masuk dan merespons dalam 24 jam.",
    "con.name": "Nama",
    "con.name.ph": "Nama lengkap Anda",
    "con.email": "Email",
    "con.email.ph": "anda@perusahaan.com",
    "con.subject": "Subjek",
    "con.subject.ph": "Perihal pesan Anda",
    "con.message": "Pesan",
    "con.message.ph": "Ceritakan kebutuhan Anda secara detail.",
    "con.btn": "Kirim Pesan",
    "con.sending": "Sedang mengirim...",

    /* toast */
    "toast.sent": "Terkirim ✓",
    "toast.sent.desc": "Kami akan merespons dalam satu hari kerja.",
    "toast.error": "Gagal Mengirim",
    "toast.error.desc": "Terjadi kesalahan. Silakan coba lagi.",

    /* footer */
    "ft.copy": "Dibangun dengan keteguhan dan dedikasi",

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
