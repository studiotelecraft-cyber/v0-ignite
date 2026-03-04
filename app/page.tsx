"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Lightbulb, Wrench, ShieldCheck, TrendingUp, Phone, Mail, MapPin, ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import { FloatingCallButton } from "@/components/floating-call-button"
import { FloatingChatButton } from "@/components/floating-chat-button"
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
      title: "Better understand your customers",
      subtitle:
        "Optimize your CRM system with expert guidance for sharp decision-making and accelerate your business growth.",
      cta1: "Schedule Consultation",
      cta2: "Download Case Study",
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
    tech: {
      title: "Technology That Grows With You",
      leadToCash: {
        title: "Lead to Cash (Order) Management",
        tagline: "Streamline Your Revenue Process.",
        desc: "Transform your entire revenue cycle from lead capture to order fulfillment. Our Lead to Cash solution connects sales, operations, and finance to eliminate bottlenecks and accelerate cash flow.",
      },
      fieldSales: {
        title: "Field Sales Execution",
        tagline: "Empower Your Sales Team in the Field.",
        desc: "Give your field sales team the mobile tools they need to close deals anywhere. Real-time access to customer data, inventory, and pricing helps your reps work smarter and faster on the go.",
      },
      customer360: {
        title: "Customer 360 Data Consolidation",
        tagline: "See the Complete Customer Picture.",
        desc: "Break down data silos and get a unified view of every customer. Our Customer 360 solution consolidates information from all touchpoints, enabling personalized experiences and informed decisions.",
      },
      customerService: {
        title: "Next Gen. Customer Service Centre",
        tagline: "Deliver Exceptional Service.",
        desc: "Transform your customer support with our next-generation service centre. Manage all interactions from one intelligent platform and resolve issues faster to create happier, more loyal customers.",
      },
      salesforceManage: {
        title: "Salesforce Manage Service",
        tagline: "Expert Salesforce Management.",
        desc: "Focus on your business while we handle your Salesforce platform. Our managed services ensure your Salesforce environment stays optimized, secure, and aligned with your evolving business needs.",
      },
    },
    partners: {
      title: "Technology Partners",
      subtitle: "We work with industry-leading platforms",
    },
    contact: {
      title: "Contact Us",
      phone: "02-1243295",
      email: "contact@ignite-idea.com",
      address: "No. 9 G Tower Grand Rama 9 Building, 31st Floor, Room No. T01, Rama 9 Road, Huai Khwang, Huai Khwang, Bangkok 10310",
      hours: "Monday - Friday: 9:00 AM – 6:00 PM",
      services: "Our consult & services",
      service1: "Lead to Cash (Order) Management",
      service2: "Field Sales Execution",
      service3: "Customer 360 Data Consolidation",
      service4: "Next Gen. Customer Service Centre",
      service5: "Salesforce Manage Service",
      partners: "Our product partner",
    },
    booking: {
      title: "จองคำปรึกษา",
      subtitle: "ทีมผู้เชี่ยวชาญด้าน CRM ของเราพร้อมให้บริการในการรับฟังปัญหาในการรับฟังปัญหาในการราระบบ CRM ของคุณ",
      firstName: "ชื่อ - นามสกุล",
      email: "อีเมล์",
      organization: "ชื่อองกร์กร",
      message: "ข้อความ",
      captcha: "13 + 15 =",
      submit: "นัดที่ปรึกษา",
    },
    scheduleModal: {
      title: "Book a Free 30-Minute Strategy Call",
      subtitle: "Discuss your challenges and discover practical solutions that work",
      projectLabel: "Describe your project need",
      projectPlaceholder: "Describe your project need here...",
      nameLabel: "Your name",
      emailLabel: "Company Email",
      submit: "Submit",
    },
    caseStudyModal: {
      title: "Download Case Study",
      nameLabel: "Name",
      emailLabel: "Company email",
      download: "Download Now",
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
      title: "เข้าใจลูกค้าของคุณได้ดีขึ้น",
      subtitle:
        "เพิ่มประสิทธิภาพการวางระบบ CRM ของคุณด้วยคำแนะนำจากผู้เชี่ยวชาญ �����พื่อการตัดสินใจที่เฉียบคม และขับเคลื่อนธุรกิจ���ห้เติบโตเร็วยิ่งขึ้น",
      cta1: "��ัดที่ปรึกษา",
      cta2: "ดาวน์โหลดเคสสตัดดี้",
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
    tech: {
      title: "เทคโนโลยีที่เติบโตไปกับคุณ",
      leadToCash: {
        title: "การจัดการ Lead to Cash (Order)",
        tagline: "ปรับปรุงกระบวนการรายได้",
        desc: "เปลี่ยนวงจรรายได้ทั้งหมดตั้งแต่การรับ Lead จนถึงการส่งมอบคำสั่งซื้อ โซลูชัน Lead to Cash ของเราเชื่อมต่อฝ่ายขาย ฝ่ายปฏิบัติการ และฝ่ายการเงิน เพื่อขจัดอุปสรรคและเร่งกระแสเงินสด",
      },
      fieldSales: {
        title: "การดำเนินการขายภาคสนาม",
        tagline: "เสริมพลังให้ทีมขายของคุณ",
        desc: "มอบเครื่องมือมือถือที่ทีมขายภาคสนามของคุณต้องการเพื่อปิดการขายได้ทุกที่ การเข้าถึงข้อมูลลูกค้า สินค้าคงคลัง และราคาแบบเรียลไทม์ช่วยให้พนักงานของคุณทำงานได้อย่างชาญฉลาดและรวดเร็วขึ้น",
      },
      customer360: {
        title: "การรวมข้อมูลลูกค้า 360 องศา",
        tagline: "มองเห็นภาพลูกค้าที่สมบูรณ์",
        desc: "ทำลายอุปสรรคข้อมูลและรับมุมมองลูกค้าแบบครบวงจร โซลูชัน Customer 360 ของเรารวมข้อมูลจากทุกจุดสัมผัส ช่วยให้สามารถสร้างประสบการณ์ที่เป็นส่วนตัวและการตัดสินใจอย่างมีข้อมูล",
      },
      customerService: {
        title: "��ูนย์บริการลูกค้ายุคใหม่",
        tagline: "มอบบริการที่เหนือความคาดหมาย",
        desc: "พลิกโฉมการสนับสนุนลูกค้าด้วยศูนย์บริการยุคใหม่ของเรา จัดการทุกการติดต่อจากแพลตฟอร์มอัจฉริยะเดียว และแก้ไขปัญหาได้เร็วขึ้นเพื่อสร้างลูกค้าที่มี��วามสุขและภักดีมากขึ้น",
      },
      salesforceManage: {
        title: "บริการจัดการ Salesforce",
        tagline: "การจัดการ Salesforce ระดับมืออาชีพ",
        desc: "มุ่งเน้นธุรกิจของคุณในขณะที่เราจัดการแพลตฟอร์ม Salesforce ของคุณ บริการจัดการของเราทำให้มั่นใจว่าสภาพแวดล้อม Salesforce ของคุณจะได้รับการเพิ่มประสิทธิภาพ ปลอดภัย และสอดคล้องกับความต้องการทางธุรกิจที่เปลี่ยนแปลง",
      },
    },
    partners: {
      title: "พาร์ทเนอร์ด้านเทคโนโลยี",
      subtitle: "เราทำงานร่วมกับแพลตฟอร์มชั้นนำของอุตสาหกรรม",
    },
    contact: {
      title: "ติดต่อเรา",
      phone: "02-1243295",
      email: "contact@ignite-idea.com",
      address: "เลขที่ 9 อาคารจี ทาวเวอร์ แกรนด์พระราม9 ชั้นที่ 31 ห้องเลขที่ T01 ถนนพระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพมหานคร 10310",
      hours: "จันทร์-ศุกร์: 9:00 น. – 18:00 น.",
      services: "บริการและการปรึกษาของเรา",
      service1: "การจัดการ Lead to Cash (Order)",
      service2: "การดำเนินการขายภาคสนาม",
      service3: "การรวมข้อมูลลูกค้า 360 องศา",
      service4: "ศูนย์บริการลูกค้ายุคใหม่",
      service5: "บริการจัดการ Salesforce",
      partners: "พันธมิตรผลิตภัณฑ์ของเรา",
    },
    booking: {
      title: "จองคำปรึกษา",
      subtitle: "ทีมผู้เชี่ยวชาญด้าน CRM ของเราพร้อมให้บริการในการรับฟังปัญหาในการรับฟังปัญหาในการราระบบ CRM ของคุณ",
      firstName: "ชื่อ - นามสกุล",
      email: "อีเมล์",
      organization: "ชื่ออง���ร์กร",
      message: "ข้อความ",
      captcha: "13 + 15 =",
      submit: "นัดที่ปรึกษา",
    },
    scheduleModal: {
      title: "รับสิทธิ์ปรึกษาฟรี 30 นาที",
      subtitle: "ปรึกษาปัญหาและค้นหาแนวทางแก้ไขที�����ใ��้ได��จร����������",
      projectLabel: "อธิบายความต้องการโครงการของคุณ",
      projectPlaceholder: "อธิบายความต้องการโครงการของคุณที่นี่...",
      nameLabel: "ชื่อของคุณ",
      emailLabel: "������เมล���ริษัท",
      submit: "ส่ง",
    },
    caseStudyModal: {
      title: "ดาวน์โหลดเคสสตัดดี้",
      nameLabel: "ชื่อ",
      emailLabel: "���ีเมลบริษัท",
      download: "ดาวน์โหลดเลย",
    },
  },
}

const SERVICES = [
  {
    key: "leadToCash" as const,
    href: "/service/lead-to-cash-mgn",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/A%20close-up%2C%20perspective%20shot%20of%20a%20massive%2C%20transparent%20_Minority%20Report_%20style%20glass%20control%20screen.%20The%20display%20shows%20a%20unified%20L2C%20dashboard.%20The%20left%20panel%20shows%20_Marketing%20Metrics%2C_%20the%20middl-13GE68dKByHSqRCBbgbQO5wEZZMATm.jpg",
    color: "from-sky-500 to-blue-600",
  },
  {
    key: "fieldSales" as const,
    href: "/service/field-sales",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Perfect%20Shelf_%20A%20wide-angle%2C%20cinematic%20shot%20of%20a%20Professional%20Thai%20retail%20sales%20representative%20in%20a%20branded%20polo%20shirt%20using%20a%20tablet%20to%20audit%20a%20perfectly%20organized%20grocery%20shelf.%20Bright%2C%20nat-UpfXk7oAjNNqyEtxdxtnSXI9S5jWTb.jpg",
    color: "from-cyan-500 to-sky-600",
  },
  {
    key: "customer360" as const,
    href: "/service/customer-360",
    img: "/images/datamanagement.jpg",
    color: "from-blue-600 to-indigo-600",
  },
  {
    key: "customerService" as const,
    href: "/service/customer-services-centre",
    img: "/images/design-mode/callcenter.png",
    color: "from-sky-400 to-cyan-600",
  },
  {
    key: "salesforceManage" as const,
    href: "/service/salesforce-manage-service",
    img: "/images/design-mode/SalesSolutionIMG_001.jpg",
    color: "from-blue-500 to-sky-400",
  },
]

function ServiceCard({
  service,
  idx,
  techData,
}: {
  service: (typeof SERVICES)[number]
  idx: number
  techData: { title: string; tagline: string; desc: string }
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const reversed = idx % 2 !== 0

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${idx * 0.1}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${idx * 0.1}s`,
      }}
    >
      <Link href={service.href} className="block group">
        <div className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} min-h-[400px] overflow-hidden`}>

          {/* Image panel */}
          <div className="relative w-full lg:w-[52%] overflow-hidden min-h-[280px]">
            <img
              src={service.img}
              alt={techData.title}
              className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* dark gradient toward content */}
            <div className={`absolute inset-0 bg-gradient-to-${reversed ? "l" : "r"} from-transparent via-transparent to-slate-950/60`} />
            {/* top gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-transparent" />

            {/* large index watermark */}
            <span className="absolute top-6 left-6 text-[80px] font-black leading-none text-white/10 select-none">
              {String(idx + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Content panel */}
          <div className="relative flex-1 bg-slate-900 flex flex-col justify-center px-10 py-12 lg:px-14">
            {/* Accent top edge */}
            <div className={`absolute top-0 ${reversed ? "right-0" : "left-0"} w-1 h-full bg-gradient-to-b ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Number pill */}
            <div className={`inline-flex items-center gap-2 mb-6 w-fit`}>
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                <span className="text-white text-xs font-bold">{String(idx + 1).padStart(2, "0")}</span>
              </div>
              <span className="text-sky-400/60 text-xs font-semibold tracking-[0.2em] uppercase">
                {idx === 0 ? "Revenue" : idx === 1 ? "Sales" : idx === 2 ? "Data" : idx === 3 ? "Service" : "Platform"}
              </span>
            </div>

            <h3 className={`text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-sky-300 transition-colors duration-300 text-balance`}>
              {techData.title}
            </h3>
            <p className="text-amber-400 font-semibold text-base mb-4 leading-snug">
              {techData.tagline}
            </p>
            <p className="text-slate-400 leading-relaxed text-sm lg:text-base mb-8">
              {techData.desc}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <span className="text-sky-400 text-sm font-semibold tracking-wide group-hover:text-white transition-colors duration-300">
                Learn More
              </span>
              <div className={`h-px bg-sky-500/40 group-hover:bg-white/40 transition-all duration-500`}
                style={{ width: "32px" }}
              />
              <svg
                className="w-4 h-4 text-sky-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

type TechKey = "leadToCash" | "fieldSales" | "customer360" | "customerService" | "salesforceManage"

function TechSection({ t }: { t: typeof translations["en"] }) {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-slate-950 overflow-hidden">
      {/* Header */}
      <div
        ref={headerRef}
        className="relative py-20 px-6 text-center"
      >
        {/* subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, #7dd3fc 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        />
        <p
          className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-5 relative z-10"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          Our Services
        </p>
        <h2
          className="text-5xl md:text-6xl font-bold text-white text-balance relative z-10"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s",
          }}
        >
          {t.tech.title}
        </h2>
        <div
          className="mx-auto mt-6 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent relative z-10"
          style={{
            width: headerVisible ? "160px" : "0px",
            transition: "width 1s cubic-bezier(0.22,1,0.36,1) 0.4s",
          }}
        />
      </div>

      {/* Service cards stacked */}
      <div className="divide-y divide-slate-800/60">
        {SERVICES.map((service, idx) => (
          <ServiceCard
            key={service.key}
            service={service}
            idx={idx}
            techData={t.tech[service.key as TechKey]}
          />
        ))}
      </div>
    </section>
  )
}

function VisionBanner({ lang }: { lang: "en" | "th" }) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const lines =
    lang === "th"
      ? [
          { text: "เป็นที่ปรึกษาด้านเทคโนโลยีที่", accent: false },
          { text: "ไว้วางใจได้", accent: true },
          { text: "ที่จุดประกายการเติบโตอย่างยั่งยืน ผ่าน", accent: false },
          { text: "โซลูชันที่รอบคอบ", accent: true },
        ]
      : [
          { text: "To be the", accent: false },
          { text: "trusted", accent: true },
          { text: "technology advisor that ignites", accent: false },
          { text: "sustainable growth", accent: true },
          { text: "through thoughtful solutions", accent: false },
        ]

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950 px-6 py-24"
    >
      {/* Background: dark image overlay */}
      <div className="absolute inset-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picture1-kc0NxcsyQQ3z4NnP7Dd1EyJxWqQBDz.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/80" />
        {/* subtle blue sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/60 via-transparent to-cyan-950/30" />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, #93c5fd 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      {/* Horizontal rule top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-sky-500 via-cyan-400 to-transparent"
        style={{
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 1s cubic-bezier(0.22,1,0.36,1)',
        }}
      />

      {/* Content */}
      <div className="container mx-auto max-w-5xl relative z-10 text-center">

        {/* Label */}
        <p
          className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          }}
        >
          {lang === "th" ? "วิสัยทัศน์ของ Ignite" : "Ignite's Vision"}
        </p>

        {/* Animated lines */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] text-balance">
          {lines.map((line, i) => (
            <span
              key={i}
              className="inline"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${0.25 + i * 0.15}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${0.25 + i * 0.15}s`,
                display: 'inline',
              }}
            >
              {line.accent ? (
                <span className="text-amber-400">{line.text}</span>
              ) : (
                <span className="text-sky-300">{line.text} </span>
              )}
              {line.accent && i < lines.length - 1 && <span className="text-sky-300"> </span>}
            </span>
          ))}
        </h2>

        {/* Bottom accent bar */}
        <div className="flex items-center justify-center gap-3 mt-14">
          <div
            className="h-px bg-sky-600/40"
            style={{
              width: visible ? '80px' : '0px',
              transition: 'width 1s cubic-bezier(0.22,1,0.36,1) 0.9s',
            }}
          />
          <div
            className="w-2 h-2 rounded-full bg-amber-400"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0)',
              transition: 'opacity 0.5s ease 1.1s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 1.1s',
            }}
          />
          <div
            className="h-px bg-sky-600/40"
            style={{
              width: visible ? '80px' : '0px',
              transition: 'width 1s cubic-bezier(0.22,1,0.36,1) 0.9s',
            }}
          />
        </div>
      </div>

      {/* Horizontal rule bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-right bg-gradient-to-l from-amber-500/60 via-amber-400/30 to-transparent"
        style={{
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 1s cubic-bezier(0.22,1,0.36,1) 0.3s',
        }}
      />
    </section>
  )
}

export default function Home() {
  const { lang, setLang } = useLanguage()
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [caseStudyModalOpen, setCaseStudyModalOpen] = useState(false)
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    window.scrollTo(0, 0)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-us")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen">
      <FloatingChatButton onClick={() => setScheduleModalOpen(true)} />
      <FloatingCallButton onClick={() => setScheduleModalOpen(true)} text={t.nav.schedule} />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
          isScrolled ? "bg-blue-900/90 border-blue-800/10" : "bg-white/10 border-white/10"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/images/ignite-logo.png" alt="IGNITE IDEA" className="h-12 w-12" />
              <div className="text-xl font-black text-white tracking-wide" style={{ fontFamily: 'var(--font-nunito)' }}>Ignite Idea</div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-white/90 hover:text-white transition-colors">
                {t.nav.home}
              </a>
              <div
                className="relative"
                onMouseEnter={() => setServiceDropdownOpen(true)}
                onMouseLeave={() => setServiceDropdownOpen(false)}
              >
                <button
                  className="text-white/90 hover:text-white transition-colors flex items-center gap-1 cursor-default"
                >
                  {t.nav.service}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${serviceDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
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

            {/* Right Section - Language Toggle and Hamburger */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full p-1">
                <button
                  onClick={() => setLang("th")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    lang === "th" ? "bg-white text-blue-600 shadow-md" : "text-white/70 hover:text-white"
                  }`}
                >
                  TH
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    lang === "en" ? "bg-white text-blue-600 shadow-md" : "text-white/70 hover:text-white"
                  }`}
                >
                  EN
                </button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 py-4 backdrop-blur-xl bg-white/95">
              <div className="flex flex-col space-y-4">
                <a
                  href="#home"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2"
                >
                  {t.nav.home}
                </a>
                <div className="px-4">
                  <button
                    onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                    className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 transition-colors py-2"
                  >
                    {t.nav.service}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${serviceDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {serviceDropdownOpen && (
                    <div className="ml-4 mt-2 space-y-4">
                      {/* Mobile Group 1 */}
                      <div>
                        <h4 className="font-bold text-sm mb-2" style={{ color: '#0083d8' }}>{t.nav.serviceGroups.group1.title}</h4>
                        {t.nav.serviceGroups.group1.items.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-gray-600 hover:text-[#0083d8] transition-colors py-1.5 text-sm"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                      {/* Mobile Group 2 */}
                      <div>
                        <h4 className="font-bold text-sm mb-2" style={{ color: '#0083d8' }}>{t.nav.serviceGroups.group2.title}</h4>
                        {t.nav.serviceGroups.group2.items.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-gray-600 hover:text-[#0083d8] transition-colors py-1.5 text-sm"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                      {/* Mobile Group 3 */}
                      <div>
                        <h4 className="font-bold text-sm mb-2" style={{ color: '#0083d8' }}>{t.nav.serviceGroups.group3.title}</h4>
                        {t.nav.serviceGroups.group3.items.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-gray-600 hover:text-[#0083d8] transition-colors py-1.5 text-sm"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Link
                  href="/resources"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2"
                >
                  {t.nav.resources}
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2"
                >
                  {t.nav.about}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VDO1-zORJd82UJMheGSHUMtIJAKJqs5ziJE.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/50 to-blue-950/60" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance">
              {t.hero.title}
            </h1>
            <p className="text-xl text-blue-100/90 leading-relaxed text-pretty max-w-3xl mx-auto">{t.hero.subtitle}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30"
              >
                {t.hero.cta1}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setCaseStudyModalOpen(true)}
                className="backdrop-blur-md bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {t.hero.cta2}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white">

        {/* Vision Banner Section */}
        <VisionBanner lang={lang} />

        {/* Technology Solutions Section */}
        <TechSection t={t} />

        {/* Partners Section */}
        <section className="py-20 px-6 overflow-hidden">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">{t.partners.title}</h2>
              <p className="text-xl text-gray-600">{t.partners.subtitle}</p>
            </div>
            <div className="flex justify-center items-center">
              <div className="relative group">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Reseller-Badge-siIusAWgY6c3Xszg6rwOEBGKUzHgws.png"
                  alt="Salesforce Authorized Cloud Reseller"
                  className="h-[156px] md:h-[195px] lg:h-[234px] w-auto object-contain transform transition-all duration-700 ease-out group-hover:scale-105 opacity-0 animate-fade-in"
                  style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="contact-us" className="relative py-24 px-6 overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-500" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjctNS4zNzMtMTIgMTIgMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMgMTItMTI8L2g+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">{t.contact.title}</h2>
              <div className="h-1.5 w-32 bg-white/80 mx-auto rounded-full" />
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left Side - Contact Information (2 columns) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Cards */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg mb-2">Phone</h3>
                      <a
                        href={`tel:${t.contact.phone}`}
                        className="text-white/90 hover:text-white transition-colors font-medium text-lg"
                      >
                        {t.contact.phone}
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
                        href={`mailto:${t.contact.email}`}
                        className="text-white/90 hover:text-white transition-colors font-medium"
                      >
                        {t.contact.email}
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
                      <p className="text-white/90 leading-relaxed">{t.contact.address}</p>
                      <p className="text-white text-sm mt-3 font-bold">{t.contact.hours}</p>
                    </div>
                  </div>
                </div>

                {/* Services & Partners */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6">{t.contact.services}</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/service/lead-to-cash-mgn"
                        className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-3 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:scale-125 transition-all" />
                        {t.contact.service1}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/field-sales"
                        className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-3 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:scale-125 transition-all" />
                        {t.contact.service2}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/customer-360"
                        className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-3 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:scale-125 transition-all" />
                        {t.contact.service3}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/customer-services-centre"
                        className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-3 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:scale-125 transition-all" />
                        {t.contact.service4}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/salesforce-manage-service"
                        className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-3 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:scale-125 transition-all" />
                        {t.contact.service5}
                      </Link>
                    </li>
                  </ul>

                  <div className="mt-8 pt-8 border-t border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-6">{t.contact.partners}</h3>
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

              {/* Right Side - Booking Form (3 columns) */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-3xl p-10 md:p-12 shadow-2xl border border-gray-200 h-full">
                  <div className="mb-8">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                      {t.booking.title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">{t.booking.subtitle}</p>
                  </div>

                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-900 font-semibold text-base">
                          {t.booking.firstName}
                        </Label>
                        <Input
                          id="name"
                          placeholder={t.booking.firstName}
                          className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-gray-50 focus:bg-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-900 font-semibold text-base">
                          {t.booking.email}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t.booking.email}
                          className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-gray-50 focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization" className="text-gray-900 font-semibold text-base">
                        {t.booking.organization}
                      </Label>
                      <Input
                        id="organization"
                        placeholder={t.booking.organization}
                        className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-gray-50 focus:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-900 font-semibold text-base">
                        {t.booking.message}
                      </Label>
                      <Textarea
                        id="message"
                        placeholder={t.booking.message}
                        rows={5}
                        className="border-2 border-gray-200 focus:border-blue-400 rounded-xl resize-none bg-gray-50 focus:bg-white transition-all"
                      />
                    </div>
                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                      <Label className="text-gray-900 font-bold text-lg">{t.booking.captcha}</Label>
                      <Input className="max-w-[120px] h-12 border-2 border-gray-300 focus:border-blue-400 rounded-xl" />
                    </div>
                    <Button className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      {t.booking.submit} →
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-gray-200">
          <div className="container mx-auto text-center text-gray-600">
            <p>© 2025 IGNITE IDEA. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* Schedule Modal */}
      <Dialog open={scheduleModalOpen} onOpenChange={setScheduleModalOpen}>
        <DialogContent className="sm:max-w-4xl backdrop-blur-xl bg-gradient-to-br from-white via-blue-50 to-cyan-50 border-2 border-blue-200 text-gray-900 overflow-hidden p-0 max-h-[90vh]">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="md:col-span-1 h-[400px] md:h-auto overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <img
                src="/images/design-mode/BookConsultIMG_001.jpg"
                alt="Video Conference"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Right Side - Form */}
            <div className="md:col-span-1 p-8 overflow-y-auto max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {t.scheduleModal.title}
                </DialogTitle>
                <DialogDescription className="text-gray-700 leading-relaxed">
                  {t.scheduleModal.subtitle}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="project" className="text-gray-900 font-semibold">
                    {t.scheduleModal.projectLabel}
                  </Label>
                  <Textarea
                    id="project"
                    placeholder={t.scheduleModal.projectPlaceholder}
                    className="bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-900 placeholder:text-gray-400"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-900 font-semibold">
                    {t.scheduleModal.nameLabel}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    className="bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 font-semibold">
                    {t.scheduleModal.emailLabel}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  {t.scheduleModal.submit}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Case Study Modal */}
      <Dialog open={caseStudyModalOpen} onOpenChange={setCaseStudyModalOpen}>
        <DialogContent className="sm:max-w-5xl backdrop-blur-xl bg-white border-2 border-gray-200 text-gray-900 overflow-hidden p-0 max-h-[90vh]">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Image */}
            <div className="md:col-span-1 h-[400px] md:h-auto overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <img
                src="/images/CaseStudy_IMG001.jpg"
                alt="Case Study Download"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Right Side - Form */}
            <div className="md:col-span-1 p-12 flex flex-col justify-center">
              <DialogHeader className="mb-8">
                <DialogTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                  {t.caseStudyModal.title}
                </DialogTitle>
                <DialogDescription className="text-xl text-gray-600 leading-relaxed">
                  {lang === "en"
                    ? "Get insights from real success stories and learn how companies transformed their business"
                    : "รับข้อมูลเชิงลึกจากเรื่องราวความสำเร็จจริงและเรียนรู้ว่าบริษัทต่างๆ เปลี่ยนแปลงธุรกิจของพวกเขาอย่างไร"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cs-name" className="text-gray-900 font-semibold text-lg">
                    {t.caseStudyModal.nameLabel}
                  </Label>
                  <Input
                    id="cs-name"
                    type="text"
                    className="bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-900 placeholder:text-gray-400 h-12 text-base"
                    placeholder={lang === "en" ? "Your full name" : "ชื่อ-นามสกุลของคุณ"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cs-email" className="text-gray-900 font-semibold text-lg">
                    {t.caseStudyModal.emailLabel}
                  </Label>
                  <Input
                    id="cs-email"
                    type="email"
                    className="bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-900 placeholder:text-gray-400 h-12 text-base"
                    placeholder={lang === "en" ? "your.email@company.com" : "อีเมลบริษัทของคุณ"}
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  {t.caseStudyModal.download}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
