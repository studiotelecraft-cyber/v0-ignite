"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import Link from "next/link"
import { FloatingCallButton } from "@/components/floating-call-button"
import { FloatingChatButton } from "@/components/floating-chat-button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Navbar } from "@/components/navbar"
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
      title: "Salesforce Managed Services",
      subtitle:
        "Ongoing support, maintenance, and optimization for your Salesforce environment. Keep your system running smoothly and evolving with your business needs.",
      cta: "Contact Us",
    },
    benefitsTitle: "How Can Salesforce Managed Services Help Your Organization?",
    benefits: {
      benefit1: {
        title: "24/7 expert support and maintenance",
        desc: "Access to certified Salesforce experts whenever you need assistance. Proactive monitoring and maintenance ensure your system stays healthy and performs optimally. Quick response times minimize downtime and keep your team productive.",
      },
      benefit2: {
        title: "Continuous optimization and improvements",
        desc: "Regular system audits identify opportunities for enhancement and efficiency gains. Ongoing customizations adapt your Salesforce environment to evolving business requirements. Stay current with Salesforce releases and new features through managed upgrades.",
      },
      benefit3: {
        title: "Cost-effective alternative to in-house team",
        desc: "Reduce the overhead of hiring, training, and retaining full-time Salesforce administrators. Access a full team of specialists for the cost of a fraction of one employee. Scale support up or down based on your changing needs without long-term commitments.",
      },
    },
    summary: {
      title: "Summary",
      description: "Salesforce Managed Services provides comprehensive, ongoing support for your Salesforce platform. Our team of certified experts handles day-to-day administration, user support, system optimization, customization requests, and strategic guidance. We ensure your Salesforce investment continues to deliver value as your business grows and evolves, with flexible engagement models tailored to your needs.",
    },
    bestFor: {
      title: "Best for",
      items: [
        "Companies without dedicated Salesforce administrators",
        "Organizations seeking to optimize existing Salesforce investments",
        "Businesses requiring ongoing system improvements and support",
      ],
    },
    detailsSection: {
      paragraph1:
        "Salesforce Managed Services transforms how organizations maintain and evolve their Salesforce platforms by providing dedicated expert support without the overhead of building an in-house team. Our comprehensive service includes proactive system monitoring, regular health checks, user training, and strategic consulting to ensure your Salesforce environment aligns with business objectives.",
      paragraph2:
        "Beyond day-to-day support, our managed services include continuous optimization, feature enhancements, integration management, and release management. We work as an extension of your team, understanding your business processes and recommending improvements that drive efficiency and adoption. This partnership approach ensures your Salesforce platform evolves alongside your business, maximizing ROI and user satisfaction.",
    },
    contact: {
      title: "Contact Us",
      phone: "02-1243295",
      email: "contact@ignite-idea.com",
      address: "No. 9 G Tower Grand Rama 9 Building, 31st Floor, Room No. T01, Rama 9 Road, Huai Khwang, Huai Khwang, Bangkok 10310",
      hours: "Monday - Friday: 9:00 AM – 6:00 PM",
      services: "Our consult & services",
      crm: "Customer Relationship Management (CRM)",
      callCenter: "Call Center System",
      marketing: "Marketing Automation System",
      dataManagement: "Data Management",
      partners: "Our product partner",
    },
    booking: {
      title: "Book a Consultation",
      subtitle: "Our Salesforce Managed Services experts are ready to discuss your support needs",
      firstName: "Full Name",
      email: "Email",
      organization: "Organization",
      message: "Message",
      captcha: "13 + 15 =",
      submit: "Book Consultation",
    },
    scheduleModal: {
      title: "Book a Free 30-Minute Strategy Call",
      subtitle: "Discuss your Salesforce support challenges and discover how managed services can help",
      projectLabel: "Describe your project need",
      projectPlaceholder: "Describe your project need here...",
      nameLabel: "Your name",
      emailLabel: "Company Email",
      submit: "Submit",
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
        { name: "บริการจัดการ Salesforce", href: "/service/salesforce-manage-service" },
      ],
      resources: "คลังทรัพยากร",
      about: "เกี่ยวกับเรา",
      schedule: "นัดที่ปรึกษา",
    },
    hero: {
      title: "บริการจัดการ Salesforce",
      subtitle: "การสนับสนุน การบำรุงรักษา และการปรับปรุงอย่างต่อเนื่องสำหรับสภาพแวดล้อม Salesforce ของคุณ รักษาระบบของคุณให้ทำงานได้อย่างราบรื่นและพัฒนาไปพร้อมกับความต้องการทางธุรกิจของคุณ",
      cta: "ติดต่อเรา",
    },
    benefitsTitle: "บริการจัดการ Salesforce สามารถช่วยองค์กรของคุณด้านใดได้บ้าง",
    benefits: {
      benefit1: {
        title: "การสนับสนุนและบำรุงรักษาจากผู้เชี่ยวชาญตลอด 24/7",
        desc: "เข้าถึงผู้เชี่ยวชาญ Salesforce ที่ได้รับการรับรองเมื่อใดก็ตามที่คุณต้องการความช่วยเหลือ การตรวจสอบและบำรุงรักษาเชิงรุกช่วยให้ระบบของคุณมีสุขภาพดีและทำงานได้อย่างเหมาะสม เวลาตอบสนองที่รวดเร็วช่วยลดเวลาหยุดทำงานและรักษาผลิตภาพของทีมของคุณ",
      },
      benefit2: {
        title: "การเพิ่มประสิทธิภาพและการปรับปรุงอย่างต่อเนื่อง",
        desc: "การตรวจสอบระบบเป็นประจำระบุโอกาสในการปรับปรุงและเพิ่มประสิทธิภาพ การปรับแต่งอย่างต่อเนื่องปรับสภาพแวดล้อม Salesforce ของคุณให้เหมาะสมกับความต้องการทางธุรกิจที่เปลี่ยนแปลงไป อัปเดตให้ทันสมัยกับการเผยแพร่ Salesforce และคุณสมบัติใหม่ผ่านการอัปเกรดที่จัดการ",
      },
      benefit3: {
        title: "ทางเลือกที่คุ้มค่าแทนทีมภายใน",
        desc: "ลดค่าใช้จ่ายในการจ้าง ฝึกอบรม และรักษาผู้ดูแลระบบ Salesforce แบบเต็มเวลา เข้าถึงทีมผู้เชี่ยวชาญเต็มรูปแบบในราคาเพียงส่วนเล็กน้อยของพนักงานหนึ่งคน ปรับขนาดการสนับสนุนขึ้นหรือลงตามความต้องการที่เปลี่ยนแปลงของคุณโดยไม่มีภาระผูกพันระยะยาว",
      },
    },
    summary: {
      title: "สรุป",
      description: "บริการจัดการ Salesforce ให้การสนับสนุนอย่างครอบคลุมและต่อเนื่องสำหรับแพลตฟอร์ม Salesforce ของคุณ ทีมผู้เชี่ยวชาญที่ได้รับการรับรองของเราจัดการการบริหารประจำวัน การสนับสนุนผู้ใช้ การเพิ่มประสิทธิภาพระบบ คำขอปรับแต่ง และคำแนะนำเชิงกลยุทธ์ เราช่วยให้การลงทุน Salesforce ของคุณยังคงมอบคุณค่าเมื่อธุรกิจของคุณเติบโตและพัฒนา ด้วยรูปแบบความร่วมมือที่ยืดหยุ่นตามความต้องการของคุณ",
    },
    bestFor: {
      title: "เหมาะสำหรับ",
      items: [
        "บริษัทที่ไม่มีผู้ดูแลระบบ Salesforce เฉพาะ",
        "องค์กรที่ต้องการปรับการลงทุน Salesforce ที่มีอยู่ให้เหมาะสม",
        "ธุรกิจที่ต้องการการปรับปรุงและการสนับสนุนระบบอย่างต่อเนื่อง",
      ],
    },
    detailsSection: {
      paragraph1:
        "บริการจัดการ Salesforce เปลี่ยนวิธีการที่องค์กรดูแลและพัฒนาแพลตฟอร์ม Salesforce ของตนโดยการให้การสนับสนุนจากผู้เชี่ยวชาญโดยไม่มีค่าใช้จ่ายในการสร้างทีมภายใน บริการครอบคลุมของเรารวมถึงการตรวจสอบระบบเชิงรุก การตรวจสุขภาพเป็นประจำ การฝึกอบรมผู้ใช้ และการให้คำปรึกษาเชิงกลยุทธ์เพื่อให้แน่ใจว่าสภาพแวดล้อม Salesforce ของคุณสอดคล้องกับวัตถุปร��สงค์ทางธุรกิจ",
      paragraph2:
        "นอกเหนือจากการสนับสนุนประจำวัน บริการจัดการของเรารวมถึงการปรับปร��งอย่างต่อเนื่อง การปรับปรุงคุณสมบัติ การจัดการการบูรณาการ และการจัดการการเผยแพร่ เราทำงานเป็นส่วนขยายของทีมของคุณ เข้าใจกระบวนการทางธุรกิจของคุณและแนะนำการปรับปรุงที่ขับเคลื่อนประสิทธิภาพและการนำไปใช้ วิธีการหุ้นส่วนนี้ช่วยให้แพลตฟอร์ม Salesforce ของคุณพัฒนาไปพร้อมกับธุรกิจของคุณ เพิ่ม ROI และความพึงพอใจของผู้ใช้สูงสุด",
    },
    contact: {
      title: "ติดต่อเรา",
      phone: "02-1243295",
      email: "contact@ignite-idea.com",
      address: "เลขที่ 9 อาคารจี ทาวเวอร์ แกรนด์พระราม9 ชั้นที่ 31 ห้องเลขที่ T01 ถนนพระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพมหานคร 10310",
      hours: "จันทร์-ศุกร์: 9:00 น. – 18:00 น.",
      services: "บริการและการปรึกษาของเรา",
      crm: "การจัดการความสัมพันธ์ลูกค้า (CRM)",
      callCenter: "ระบบศูนย์สายด่วน",
      marketing: "ระบบการตลาดอัตโนมัติ",
      dataManagement: "การจัดการข้อมูล",
      partners: "พันธมิตรผลิตภัณฑ์ของเรา",
    },
    booking: {
      title: "จองการปรึกษา",
      subtitle: "ทีมผู้เชี่ยวชาญด้านบริการจัดการ Salesforce ของเราพร้อมพูดคุยเกี่ยวกับความต้องการการสนับสนุนของคุณ",
      firstName: "ชื่อ - นามสกุล",
      email: "อีเมล์",
      organization: "ชื่อองค์กร",
      message: "ข้อความ",
      captcha: "13 + 15 =",
      submit: "จองการปรึกษา",
    },
    scheduleModal: {
      title: "จองการเรียกปรึกษาเชิงกลยุทธ์ฟรี 30 นาที",
      subtitle: "พูดคุยเกี่ยวกับความท้าทายในการสนับสนุน Salesforce ของคุณและค้นพบว่าบริการจัดการสามารถช่วยได้อย่างไร",
      projectLabel: "อธิบายความต้องการโครงการ��องคุณ",
      projectPlaceholder: "อธิบายควา��ต้องการโครงการของคุณที่นี่...",
      nameLabel: "ชื่อของคุณ",
      emailLabel: "อีเมลบริษัท",
      submit: "ส่ง",
    },
  },
}

export default function SalesforceManagedServicePage() {
  const { lang, setLang } = useLanguage()
  const [t, setT] = useState(translations.en)
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)

  useEffect(() => {
    setT(lang === "en" ? translations.en : translations.th)
  }, [lang])

  const scrollToContact = () => {
    document.getElementById("contact-us")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white">
      <FloatingCallButton onClick={() => setScheduleModalOpen(true)} text={t.nav.schedule} />
      <FloatingChatButton />

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}} />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 backdrop-blur-md px-6 py-3 rounded-full border border-blue-400/40 shadow-xl shadow-blue-500/20">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                <span className="text-white text-lg md:text-xl font-bold tracking-wide">{lang === "en" ? "Expert Support & Optimization" : "การสนับสนุนและการปรับปรุงจากผู้เชี่ยวชาญ"}</span>
              </div>
              <div className="space-y-6">
                <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] text-balance tracking-tight lg:text-8xl">
                  {t.hero.title}
                </h1>
                <div className="h-2 w-40 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full" />
              </div>
              <p className="text-2xl md:text-3xl text-blue-100 leading-relaxed max-w-2xl font-light">{t.hero.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={scrollToContact} size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full px-10 py-7 shadow-2xl shadow-blue-500/40 text-xl font-bold">
                  {lang === "en" ? "Get Started" : "เริ่มต้น"} <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </div>
            </div>

            <div className="relative">
              {/* Support Visualization */}
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-600/20 blur-2xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              {t.benefitsTitle}
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-blue-100 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{t.benefits.benefit1.title}</h3>
                <p className="text-gray-600 leading-relaxed">{t.benefits.benefit1.desc}</p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-indigo-100 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{t.benefits.benefit2.title}</h3>
                <p className="text-gray-600 leading-relaxed">{t.benefits.benefit2.desc}</p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-green-100 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-green-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{t.benefits.benefit3.title}</h3>
                <p className="text-gray-600 leading-relaxed">{t.benefits.benefit3.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary & Best For Section */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Summary */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t.summary.title}</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{t.summary.description}</p>
            </div>

            {/* Best For */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">{t.bestFor.title}</h3>
              <ul className="space-y-4">
                {t.bestFor.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-lg leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
            <p>{t.detailsSection.paragraph1}</p>
            <p>{t.detailsSection.paragraph2}</p>
          </div>
        </div>
      </section>

      {/* Contact & Booking Section */}
      <section id="contact-us" className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.contact.title}</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Information */}
            <div className="space-y-8">
              {/* Contact Detail Cards */}
              <div className="grid gap-6">
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <a href={`tel:${t.contact.phone}`} className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                        {t.contact.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-100 hover:border-cyan-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a href={`mailto:${t.contact.email}`} className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                        {t.contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                      <p className="text-gray-700 leading-relaxed">{t.contact.address}</p>
                      <p className="text-gray-800 text-sm mt-2 font-bold">{t.contact.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Our Consult & Services */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.contact.services}</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/service/lead-to-cash-mgn" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                      {lang === "en" ? "Lead to Cash (Order) Management" : "การจัดการ Lead to Cash (Order)"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/service/field-sales" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                      {lang === "en" ? "Field Sales Execution" : "การดำเนินการขายภาคสนาม"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/service/customer-360" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                      {lang === "en" ? "Customer 360 Data Consolidation" : "การรวมข้อมูลลูกค้า 360 องศา"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/service/customer-services-centre" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                      {lang === "en" ? "Next Gen. Customer Service Centre" : "ศูนย์บริการลูกค้ายุคใหม่"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/service/salesforce-manage-service" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                      {lang === "en" ? "Salesforce Manage Service" : "บริการจัดการ Salesforce"}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - Booking Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {lang === "en" ? "Schedule Your Strategy Call" : "จองเรียกปรึกษาเชิงกลยุทธ์ของคุณ"}
              </h3>
              <p className="text-gray-600 mb-8">
                {lang === "en" ? "Get expert advice on Salesforce Managed Services" : "รับคำแนะนำจากผู้เชี่ยวชาญเกี่ยวกับบริการจัดการ Salesforce"}
              </p>

              <div className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-gray-900 font-semibold">{lang === "en" ? "Your Name" : "ชื่อของคุณ"}</Label>
                  <Input id="name" placeholder={lang === "en" ? "John Doe" : "ชื่อ-นามสกุล"} className="mt-2 rounded-lg" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-900 font-semibold">{lang === "en" ? "Company Email" : "อีเมลบริษัท"}</Label>
                  <Input id="email" type="email" placeholder="company@example.com" className="mt-2 rounded-lg" />
                </div>
                <div>
                  <Label htmlFor="company" className="text-gray-900 font-semibold">{lang === "en" ? "Company Name" : "ชื่อบริษัท"}</Label>
                  <Input id="company" placeholder={lang === "en" ? "Your Company" : "บริษัทของคุณ"} className="mt-2 rounded-lg" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-900 font-semibold">{lang === "en" ? "Project Needs" : "ความต้องการโครงการ"}</Label>
                  <Textarea id="message" placeholder={lang === "en" ? "Tell us about your needs..." : "บอกเราเกี่ยวกับความต้องการของคุณ..."} className="mt-2 rounded-lg" rows={4} />
                </div>
                <Button onClick={() => setScheduleModalOpen(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-6 text-lg font-semibold transition-all">
                  {lang === "en" ? "Schedule Call" : "จองการติดต่อ"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Modal */}
      <Dialog open={scheduleModalOpen} onOpenChange={setScheduleModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-900">{t.scheduleModal.title}</DialogTitle>
            <DialogDescription className="text-gray-600 text-lg">{t.scheduleModal.subtitle}</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.scheduleModal.projectLabel}</label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder={t.scheduleModal.projectPlaceholder}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.scheduleModal.nameLabel}</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.scheduleModal.emailLabel}</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg py-6 text-lg font-bold">
              {t.scheduleModal.submit}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
