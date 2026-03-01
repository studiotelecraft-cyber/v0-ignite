"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Users, Target, Award, Heart, Phone, Mail, MapPin, Shield, Lock, Eye, Lightbulb, TrendingUp, Zap, CheckCircle, UserCheck, Sparkles, Wrench, ShieldCheck } from 'lucide-react'
import { OurMissionSection, CoreValuesSection } from '@/components/about-sections'
import { Button } from "@/components/ui/button"
import { FloatingChatButton } from "@/components/floating-chat-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useLanguage } from "@/context/language-context"

const translations = {
  en: {
    nav: {
      home: "Home",
      service: "Our Services",
      services: [
        { name: "Lead to Cash (Order) Management", href: "/service/lead-to-cash-mgn" },
        { name: "Field Sales Execution", href: "/service/field-sales" },
        { name: "Customer 360 Data Consolidation", href: "/service/customer-360" },
        { name: "Next Gen. Customer Service Centre", href: "/service/customer-services-centre" },
        { name: "Salesforce Manage Service", href: "/service/salesforce-manage-service" },
      ],
      resources: "Resources",
      about: "About",
      schedule: "Schedule a call",
    },
    hero: {
      title: "WHO WE ARE",
      subtitle: "Our mission aim is to assist and support our customers in fueling their ideas with the power of technology to achieve next level of success.\n\nWe experience in area of supporting customer to connect to their customers in a whole new way.",
    },
    mission: {
      title: "Our Mission",
      description: "We empower businesses to unlock their full potential by delivering tailored CRM and automation solutions that drive growth, enhance customer relationships, and streamline operations.",
    },
    features: {
      feature1: {
        title: "Help businesses make better decisions through technology",
        desc: "We bring the right technology to the right problem — so your team can act with clarity and confidence.",
      },
      feature2: {
        title: "Turn ideas into practical, working solutions",
        desc: "We don't just consult — we build. Every engagement ends with something real, live, and used by your people.",
      },
      feature3: {
        title: "Stay beyond go-live to ensure real adoption",
        desc: "Go-live is just the beginning. We stay close to make sure your team actually embraces and benefits from the solution.",
      },
      feature4: {
        title: "Grow alongside the organizations we serve",
        desc: "We measure our success by yours. As your business evolves, we evolve with you — long-term, trusted partners.",
      },
    },
    vision: {
      title: "Our Vision",
      description: "To be the leading provider of customer-centric technology solutions that transform how businesses connect with their customers and achieve sustainable success.",
    },
    values: {
      title: "Ignite's Core Value",
      value1: {
        title: "Client Success is First",
        desc: "We create real outcomes for our clients' businesses.",
      },
      value2: {
        title: "Think Beyond the Solution",
        desc: "We think beyond the obvious for more sustainable choices.",
      },
      value3: {
        title: "Ownership & Accountability",
        desc: "We take responsibility as if it were our own business.",
      },
      value4: {
        title: "Professional with Heart",
        desc: "We work with expertise, sincerity, and genuine care.",
      },
      value5: {
        title: "Integrity & Trust",
        desc: "We stand firm in honesty and long-term reliability.",
      },
      value6: {
        title: "People Grow, Company Grows",
        desc: "We believe people's growth is the foundation of our company.",
      },
    },
    team: {
      title: "Why Choose Us",
      reason1: "Expert team with deep industry knowledge",
      reason2: "Proven track record of successful implementations",
      reason3: "Tailored solutions that fit your unique needs",
      reason4: "Ongoing support and partnership",
      reason5: "Integration with leading platforms",
      reason6: "Data-driven approach to business growth",
    },
    cta: {
      title: "Ready to Transform Your Business?",
      subtitle: "Let's discuss how we can help you achieve your goals",
      button: "Contact Us",
    },
    contactUs: {
      title: "Contact Us",
      subtitle: "Get in touch with us for a consultation",
      phone: "02-1243295",
      email: "contact@ignite-idea.com",
      address: "No. 9 G Tower Grand Rama 9 Building, 31st Floor, Room No. T01, Rama 9 Road, Huai Khwang, Huai Khwang, Bangkok 10310",
      servicesTitle: "Our consult & services",
      partnersTitle: "Our product partner",
      bookingFormTitle: "Schedule a call",
      bookingFormSubtitle: "Our CRM experts are ready to listen to your CRM system challenges",
    },
  },
  th: {
    nav: {
      home: "หน้าแรก",
      service: "บริการของเรา",
      services: [
        { name: "การจัดการ Lead to Cash (Order)", href: "/service/lead-to-cash-mgn" },
        { name: "การดำเนินการขายภาคสนาม", href: "/service/field-sales" },
        { name: "การรวมข้อมูลลูกค้า 360 องศา", href: "/service/customer-360" },
        { name: "ศูนย์บริการลูกค้ายุคใหม่", href: "/service/customer-services-centre" },
        { name: "Salesforce Manage Service", href: "/service/salesforce-manage-service" },
      ],
      resources: "คลังทรัพยากร",
      about: "เกี่ยวกับเรา",
      schedule: "นัดที่ปรึกษา",
    },
    hero: {
      title: "WHO WE ARE",
      subtitle: "Our mission aim is to assist and support our customers in fueling their ideas with the power of technology to achieve next level of success.\n\nWe experience in area of supporting customer to connect to their customers in a whole new way.",
    },
    mission: {
      title: "พันธกิจของเรา",
      description: "เราเสริมพลังให้ธุรกิจปลดล็อกศักยภาพสูงสุด ด้วยการส่งมอบโซลูชัน CRM และระบบอัตโนมัติที่ออกแบบเฉพาะ เพื่อขับเคลื่อนการเติบโตร การสร้างความสัมพันธ์กับลูกค้า และปรับปรุงการดำเนินงาน",
    },
    features: {
      feature1: {
        title: "ช่วยธุรกิจตัดสินใจได้ดีขึ้นด้วยเทคโนโลยี",
        desc: "เรานำเทคโนโลยีที่เหมาะสมมาแก้ปัญหาที่ถูกต้อง เพื่อให้ทีมของคุณดำเนินงานได้อย่างมั่นใจและชัดเจน",
      },
      feature2: {
        title: "เปลี่ยนไอเดียให้กลายเป็นโซลูชันที่ใช้งานได้จริง",
        desc: "เราไม่ได้แค่ให้คำปรึกษา — เราสร้างสิ่งที่ใช้งานได้จริง ทุกโครงการจบด้วยผลลัพธ์ที่ทีมของคุณใช้งานได้จริง",
      },
      feature3: {
        title: "ดูแลต่อเนื่องหลัง Go-live เพื่อให้เกิดการใช้งานจริง",
        desc: "การเปิดตัวระบบเป็นแค่จุดเริ่มต้น เราอยู่เคียงข้างเพื่อให้แน่ใจว่าทีมของคุณใช้ประโยชน์จากโซลูชันได้อย่างเต็มที่",
      },
      feature4: {
        title: "เติบโตไปพร้อมกับองค์กรที่เราดูแล",
        desc: "เราวัดความสำเร็จของเราจากความสำเร็จของคุณ เมื่อธุรกิจของคุณพัฒนา เราพัฒนาไปด้วย — พันธมิตรระยะยาวที่ไว้วางใจได้",
      },
    },
    vision: {
      title: "วิสัยทัศน์ของเรา",
      description: "เป็นผู้ให้บริการชั้นนำด้านโซลูชันเทค��นโลยีที่เน้นลูกค้าเป็นศูนย์กลาง เพื่อเปลี่ยนแปลงวิธีที่ธุรกิจเชื่อมต่อกับลูกค้าและบรรลุความสำเร็จอย่างยั่งยืน",
    },
    values: {
      title: "คุณค่าหลักของ Ignite",
      value1: {
        title: "Client Success is First",
        desc: "เราสร้างผลลัพธ์ที่เกิดขึ้นจริงกับธุรกิจของลูกค้า",
      },
      value2: {
        title: "Think Beyond the Solution",
        desc: "เราคิดโลกกว่าโจทย์ เพื่อทางเลือกที่ยิ่งยืนกว่า",
      },
      value3: {
        title: "Ownership & Accountability",
        desc: "เรารับผิดชอบงานเหมือนเป็นธุรกิจของเราเอง",
      },
      value4: {
        title: "Professional with Heart",
        desc: "เราทำงานอย่างมืออาชีพ พร้อมความจริงใจและความเคารพ",
      },
      value5: {
        title: "Integrity & Trust",
        desc: "เรายึดมั่นในความซื่อสัตย์และความเชื่อมั่นระยะยาว",
      },
      value6: {
        title: "People Grow, Company Grows",
        desc: "เราเชื่อว่าการเติบโตของคน คือรากฐานของบริษัท",
      },
    },
    team: {
      title: "ทำไมต้องเลือกเรา",
      reason1: "ทีมผู้เชี่ยวชาญที่มีความรู้อุตสาหกรรมลึกซึ้ง",
      reason2: "ประวัติความสำเร็จที่พิสูจน์แล้ว",
      reason3: "โซลูชันที่ปรับแต่งตามความต้องการเฉพาะของคุณ",
      reason4: "การสนับสนุนและความเป็นพันธมิตรที่ต่อเนื่อง",
      reason5: "บูรณาการกับแพลตฟอร์มชั้นนำ",
      reason6: "แนวทางที่ขับเคลื่อนด้วยข้อมูลเพื่อการเติบโตทางธุรกิจ",
    },
    cta: {
      title: "พร้อมที่จะเปลี่ยนแปลงธุรกิจของคุณ?",
      subtitle: "มาพูดคุยกันว่าเราจะ���่วยคุณ��รรลุเป้าหมายได้อย่างไร",
      button: "ติดต่อเรา",
    },
    contactUs: {
      title: "ติดต่อเรา",
      subtitle: "ติดต่อเราเพื่อขอคำปรึกษา",
      phone: "02-1243295",
      email: "contact@ignite-idea.com",
      address: "เลขที่ 9 อาคารจี ทาวเวอร์ แกรนด์พระราม9 ชั้นที่ 31 ห้องเลขที่ T01 ถนนพระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพมหานคร 10310",
      servicesTitle: "บริการของเรา",
      partnersTitle: "คู่ค้าผลิตภัณฑ์ของเรา",
      bookingFormTitle: "นัดที่ปรึกษา",
      bookingFormSubtitle: "ทีมผู้เชี่ยวชาญด้าน CRM ของเราพร้อมให้บริการในการรับฟังปัญหาในการระบบ CRM ของคุณ",
    },
  },
}

function AwardSection({ lang }: { lang: "en" | "th" }) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const ease = "cubic-bezier(0.22,1,0.36,1)"

  return (
    <section ref={ref} className="relative overflow-hidden bg-slate-950 min-h-screen flex flex-col lg:flex-row">

      {/* ══════════════════════════════════════════
          LEFT PANEL — typography (50%)
      ══════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-1/2 px-8 md:px-14 xl:px-20 py-24 lg:py-0">

        {/* Ambient amber glow behind text */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />

        {/* Top expanding rule */}
        <div
          className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-amber-400 via-yellow-300/70 to-transparent"
          style={{ width: visible ? "80%" : "0%", transition: `width 1.4s ${ease} 0.1s` }}
        />

        {/* Eyebrow */}
        <div
          className="flex items-center gap-3 mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transition: `opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s`,
          }}
        >
          <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <p className="text-amber-400 text-xs font-semibold tracking-[0.4em] uppercase">
            {lang === "en" ? "Award Winner" : "ผู้ได้รับรางวัล"}
          </p>
          <div className="h-px flex-1 bg-amber-400/20" />
        </div>

        {/* "WINNER" — giant display word slides up from clip */}
        <div className="overflow-hidden mb-3">
          <p
            className="font-black text-amber-400 leading-[0.85] tracking-tighter select-none"
            style={{
              fontSize: "clamp(5rem, 14vw, 11rem)",
              transform: visible ? "translateY(0)" : "translateY(105%)",
              transition: `transform 1.1s ${ease} 0.35s`,
            }}
          >
            WINNER
          </p>
        </div>

        {/* Expanding divider under WINNER */}
        <div
          className="h-[2px] bg-gradient-to-r from-amber-400/50 to-transparent mb-8 rounded-full"
          style={{ width: visible ? "100%" : "0%", transition: `width 1.1s ${ease} 0.75s` }}
        />

        {/* Award name — two lines, clip reveal */}
        <div className="overflow-hidden mb-2">
          <h2
            className="text-3xl md:text-4xl xl:text-5xl font-bold text-white leading-tight"
            style={{
              transform: visible ? "translateY(0)" : "translateY(80%)",
              transition: `transform 1s ${ease} 0.65s`,
            }}
          >
            ASEAN Rising Star
          </h2>
        </div>
        <div className="overflow-hidden mb-10">
          <h3
            className="text-3xl md:text-4xl xl:text-5xl font-bold text-sky-400 leading-tight"
            style={{
              transform: visible ? "translateY(0)" : "translateY(80%)",
              transition: `transform 1s ${ease} 0.8s`,
            }}
          >
            Partner of the Year
          </h3>
        </div>

        {/* Description */}
        <p
          className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.9s ease 1s, transform 0.9s ease 1s`,
          }}
        >
          {lang === "en"
            ? "Recognized by Salesforce for exceptional growth and innovation in delivering customer-centric technology solutions across the ASEAN region."
            : "ได้รับการยอมรับจาก Salesforce สำหรับการเติบโตและนวัตกรรมที่โดดเด่นในการส่งมอบโซลูชันเทคโนโลยีที่เน้นลูกค้าเป็นศูนย์กลางทั่วภูมิภาคอาเซียน"}
        </p>

        {/* Credential pills */}
        <div
          className="flex flex-wrap gap-3"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 0.8s ease 1.15s, transform 0.8s ease 1.15s`,
          }}
        >
          {[
            { label: "Salesforce Partner", icon: "★" },
            { label: "FY25 APAC", icon: "◆" },
            { label: "ASEAN Region", icon: "●" },
          ].map((pill) => (
            <div
              key={pill.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <span className="text-amber-400 text-xs">{pill.icon}</span>
              <span className="text-white/70 text-sm font-semibold">{pill.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom rule */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-sky-500/50 to-transparent"
          style={{ width: visible ? "70%" : "0%", transition: `width 1.3s ${ease} 0.4s` }}
        />
      </div>

      {/* ══════════════════════════════════════════
          RIGHT PANEL — full-height image (50%)
      ══════════════════════════════════════════ */}
      <div
        className="relative w-full lg:w-1/2 min-h-[420px] lg:min-h-screen overflow-hidden"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(40px)",
          transition: `opacity 1.2s ${ease} 0.4s, transform 1.2s ${ease} 0.4s`,
        }}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FY25%20APAC%20POTY%20Rising%20Star%20Winner%20-AppExchange%20listing-%20Ignite-YmGFZ1KKK3qGDCkWFkazfZ0hIRmHrL.jpg"
          alt="ASEAN Rising Star Partner of the Year - Ignite Idea Co., Ltd."
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Left-edge feather so image blends into dark panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/10 to-transparent" />
        {/* Top + bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60" />

        {/* Floating FY25 badge */}
        <div
          className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/70 backdrop-blur-md border border-amber-400/30"
          style={{
            opacity: visible ? 1 : 0,
            transition: `opacity 0.8s ease 1.3s`,
          }}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-white/80 text-xs font-semibold tracking-widest uppercase">FY25 APAC</span>
        </div>
      </div>

    </section>
  )
}

function HeroSection({ title, subtitle }: { title: string; subtitle: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  const subtitleLines = subtitle.split("\n\n")

  return (
    <section
      className="h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picture1-kc0NxcsyQQ3z4NnP7Dd1EyJxWqQBDz.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Layered overlays */}
      <div className="absolute inset-0 bg-slate-950/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

      {/* Expanding top rule */}
      <div
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-sky-500 via-cyan-400 to-transparent"
        style={{
          width: mounted ? "60%" : "0%",
          transition: "width 1.2s cubic-bezier(0.22,1,0.36,1) 0.2s",
        }}
      />

      {/* Content */}
      <div className="container mx-auto max-w-6xl text-center relative z-10 px-6">

        {/* Eyebrow label */}
        <p
          className="text-sky-400 text-xs font-semibold tracking-[0.35em] uppercase mb-8"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
          }}
        >
          Ignite Idea Co., Ltd.
        </p>

        {/* Main title — split into characters for dramatic reveal */}
        <h1
          className="font-black text-white leading-none tracking-tight mb-10 text-balance"
          style={{
            fontSize: "clamp(4rem, 14vw, 11rem)",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
            transition: "opacity 1s cubic-bezier(0.22,1,0.36,1) 0.45s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.45s",
          }}
        >
          <span className="text-white">{title.split(" ").slice(0, 2).join(" ")}</span>
          {title.split(" ").length > 2 && (
            <>
              {" "}
              <span
                className="text-sky-400"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(30px)",
                  transition: "opacity 1s cubic-bezier(0.22,1,0.36,1) 0.6s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.6s",
                  display: "inline-block",
                }}
              >
                {title.split(" ").slice(2).join(" ")}
              </span>
            </>
          )}
        </h1>

        {/* Divider */}
        <div
          className="mx-auto mb-10 h-[2px] bg-gradient-to-r from-transparent via-sky-500/60 to-transparent"
          style={{
            width: mounted ? "200px" : "0px",
            transition: "width 1s cubic-bezier(0.22,1,0.36,1) 0.8s",
          }}
        />

        {/* Subtitle paragraphs */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {subtitleLines.map((line, i) => (
            <p
              key={i}
              className="text-lg md:text-xl text-blue-100/80 leading-relaxed"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.9s ease ${0.9 + i * 0.15}s, transform 0.9s ease ${0.9 + i * 0.15}s`,
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Expanding bottom rule */}
      <div
        className="absolute bottom-0 right-0 h-[3px] bg-gradient-to-l from-amber-500/50 via-amber-400/20 to-transparent"
        style={{
          width: mounted ? "40%" : "0%",
          transition: "width 1.2s cubic-bezier(0.22,1,0.36,1) 0.5s",
        }}
      />

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.8s ease 1.4s",
        }}
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 text-white/50 animate-bounce" />
      </div>
    </section>
  )
}

export default function AboutPage() {
  const { lang, setLang } = useLanguage()
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    window.scrollTo(0, 0)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        isScrolled 
          ? 'bg-blue-900/90 border-blue-800/10' 
          : 'bg-white/10 border-white/10'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <img src="/images/ignite-logo.png" alt="IGNITE IDEA" className="h-12 w-12" />
              <div className="text-xl font-bold text-white">IGNITE IDEA</div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-white/90 hover:text-white transition-colors">
                {t.nav.home}
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setServiceDropdownOpen(true)}
                onMouseLeave={() => setServiceDropdownOpen(false)}
              >
                <Link
                  href="/service/crm"
                  className="text-white/90 hover:text-white transition-colors flex items-center gap-1"
                >
                  {t.nav.service}
                  <ChevronDown className="w-4 h-4" />
                </Link>
                {serviceDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                    <div className="w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
                      <div className="space-y-3">
                        {t.nav.services.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            className="block text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-200"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                      {/* Bottom CTA Section */}
                      <div className="border-t border-dashed border-gray-300 mt-6 pt-6 flex items-center justify-center gap-4">
                        <button
                          onClick={() => setScheduleModalOpen(true)}
                          className="px-6 py-2.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
                        >
                          Schedule Consultation
                        </button>
                        <Link
                          href="/resources"
                          className="px-6 py-2.5 border border-gray-300 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                          Download Case Study
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link href="/resources" className="text-white/90 hover:text-white transition-colors">
                {t.nav.resources}
              </Link>
              <Link href="/about" className="text-white/90 hover:text-white transition-colors">
                {t.nav.about}
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setLang("th")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    lang === "th" ? "bg-white text-blue-600 shadow-md" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  TH
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    lang === "en" ? "bg-white text-blue-600 shadow-md" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  EN
                </button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 bg-white">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2">
                  {t.nav.home}
                </Link>
                <Link href="/resources" className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2">
                  {t.nav.resources}
                </Link>
                <Link href="/about" className="text-blue-600 font-semibold px-4 py-2">
                  {t.nav.about}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <FloatingChatButton onClick={() => setScheduleModalOpen(true)} />

      <HeroSection title={t.hero.title} subtitle={t.hero.subtitle} />

      {/* ASEAN Rising Star Award Section */}
      <AwardSection lang={lang} />

      {/* Salesforce Certification Badges Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picture1-MJFzQubsB1d9lCApA8f3RmHkKGq4OI.png"
            alt="Salesforce Certifications"
            className="w-full h-auto"
          />
        </div>
      </section>

      <OurMissionSection t={t} />

      <CoreValuesSection lang={lang} values={t.values} />

      {/* Why Choose Us */}
      

      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{
          backgroundImage: `url('/images/Hompage_HeroIMG_001.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-purple-950/50 to-black/50" />
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <h2 
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            style={{
              textShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.4), 0 0 80px rgba(59, 130, 246, 0.2)'
            }}
          >
            {lang === "en" ? "Let's Ignite Your Ideas" : "มาจุดประกายไอเดียของคุณ"}
          </h2>
          <p 
            className="text-2xl md:text-3xl text-blue-100 leading-relaxed max-w-3xl mx-auto"
            style={{
              textShadow: '0 0 15px rgba(147, 197, 253, 0.7), 0 0 30px rgba(147, 197, 253, 0.5), 0 0 45px rgba(147, 197, 253, 0.3)'
            }}
          >
            {lang === "en" 
              ? "Your business has unlimited potential. Let's unlock it together." 
              : "ธุรกิจของคุณมีศักยภาพไร้ขีดจำกัด มาปลดล็อกมันไปด้วยกัน"}
          </p>
        </div>
      </section>

      <section id="contact-us" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-500" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTIgMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMgMTItMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">{t.contactUs.title}</h2>
            <div className="h-1.5 w-32 bg-white/80 mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">Phone</h3>
                    <a
                      href={`tel:${t.contactUs.phone}`}
                      className="text-white/90 hover:text-white transition-colors font-medium text-lg"
                    >
                      {t.contactUs.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">Email</h3>
                    <a
                      href={`mailto:${t.contactUs.email}`}
                      className="text-white/90 hover:text-white transition-colors font-medium"
                    >
                      {t.contactUs.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-lg">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">Address</h3>
                    <p className="text-white/90 leading-relaxed">{t.contactUs.address}</p>
                    <p className="text-white text-sm mt-3 font-bold">{lang === "th" ? "จันทร์-ศุกร์: 9:00 น. – 18:00 น." : "Monday - Friday: 9:00 AM – 6:00 PM"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">{t.contactUs.servicesTitle}</h3>
                <ul className="space-y-3">
                  {t.nav.services.slice(0, 4).map((service, idx) => (
                    <li key={`service${idx}`}>
                      <Link href={service.href} className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-3 group">
                        <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:scale-125 transition-all" />
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">{t.contactUs.partnersTitle}</h3>
                  <div className="flex items-center">
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Reseller-Badge-siIusAWgY6c3Xszg6rwOEBGKUzHgws.png"
                      alt="Salesforce Authorized Cloud Reseller" 
                      className="h-[98px] md:h-[117px] w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-500 hover:scale-105" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-10 md:p-12 shadow-2xl border border-gray-200 h-full">
                <div className="mb-8">
                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                    {t.contactUs.bookingFormTitle}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">{t.contactUs.bookingFormSubtitle}</p>
                </div>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-900 font-semibold text-base">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Name"
                        className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-gray-50 focus:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-900 font-semibold text-base">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-gray-50 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization" className="text-gray-900 font-semibold text-base">
                      Organization
                    </Label>
                    <Input
                      id="organization"
                      placeholder="Organization"
                      className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-gray-50 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-900 font-semibold text-base">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Message"
                      rows={5}
                      className="border-2 border-gray-200 focus:border-blue-400 rounded-xl resize-none bg-gray-50 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                    <Label className="text-gray-900 font-bold text-lg">13 + 15 =</Label>
                    <Input className="max-w-[120px] h-12 border-2 border-gray-300 focus:border-blue-400 rounded-xl" />
                  </div>
                  <Button className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    {t.nav.schedule}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-cyan-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.cta.title}</h2>
          <p className="text-xl text-blue-100 mb-8">{t.cta.subtitle}</p>
          <Link href="/#contact-us">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              {t.cta.button}
            </Button>
          </Link>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2025 IGNITE IDEA. All rights reserved.</p>
        </div>
      </footer>

      <Dialog open={scheduleModalOpen} onOpenChange={setScheduleModalOpen}>
        <DialogContent className="sm:max-w-5xl backdrop-blur-xl bg-white border-2 border-blue-200 text-gray-900 overflow-hidden p-0 max-h-[90vh]">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="md:col-span-1 h-[400px] md:h-auto overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <img 
                src="/images/design-mode/BookConsultIMG_001.jpg"
                alt="Consultation"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="md:col-span-1 p-8 overflow-y-auto max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {lang === "en" ? "Book a Free 30-Minute Strategy Call" : "รับสิทธิ์ปรึกษาฟรี 30 นาที"}
                </DialogTitle>
                <DialogDescription className="text-xl text-gray-700 leading-relaxed">
                  {lang === "en" 
                    ? "Discuss your challenges and discover practical solutions that work" 
                    : "ปรึกษาปัญหาและค้นหาแนวทางแก้ไขที่ใช้ได้จริง"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="project" className="text-gray-900 font-semibold text-lg">
                    {lang === "en" ? "Describe your project need" : "อธิบายความต้องการโครงการของคุณ"}
                  </Label>
                  <Textarea
                    id="project"
                    placeholder={lang === "en" ? "Describe your project need here..." : "��ธิบายความต้องการโครงการของคุณที่นี่..."}
                    className="bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-900 placeholder:text-gray-400 text-lg"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-900 font-semibold text-lg">
                    {lang === "en" ? "Your name" : "ช��่อของคุ���"}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    className="bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-900 placeholder:text-gray-400 h-14 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 font-semibold text-lg">
                    {lang === "en" ? "Company Email" : "อีเมลบริษัท"}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-900 placeholder:text-gray-400 h-14 text-lg"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-xl py-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  {lang === "en" ? "Submit" : "ส่ง"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

<style jsx>{`
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }
`}</style>
