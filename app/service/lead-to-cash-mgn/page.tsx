"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, Globe, ChevronDown, Menu, X, ArrowRight } from 'lucide-react'
import Link from "next/link"
import { FloatingCallButton } from "@/components/floating-call-button"
import { FloatingChatButton } from "@/components/floating-chat-button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const translations = {
  en: {
    nav: {
      home: "Home",
      service: "Our Services",
      services: [
        { name: "Lead to Cash (Order) Management", href: "/service/lead-to-cash-mgn" },
        { name: "Field Sales Execution", href: "/service/field-sales" },
        { name: "Contractual Sales for Manufacturing", href: "/service/contractual-sales" },
        { name: "Customer 360 Data Consolidation", href: "/service/customer-360" },
        { name: "Next Gen. Customer Service Centre", href: "/service/customer-services-centre" },
        { name: "Salesforce Manage Service", href: "/service/salesforce-manage-service" },
      ],
      resources: "Resources",
      about: "About",
      schedule: "Schedule a call",
    },
    hero: {
      title: "Lead to Cash (Order) Management",
      subtitle:
        "Connects sales, pricing, contracts, orders, billing, and payments into one seamless flow. Reduces manual handoffs between Sales, Finance, and Operations.",
      cta: "Contact Us",
    },
    benefitsTitle: "How Can Lead to Cash Help Your Organization?",
    benefits: {
      benefit1: {
        title: "Connects sales, pricing, contracts, orders, billing, and payments into one seamless flow",
        desc: "Lead to Cash integrates your entire revenue management process, eliminating data silos and creating a unified customer journey. From initial quote to final payment, all information flows seamlessly across departments, ensuring consistency and reducing errors.",
      },
      benefit2: {
        title: "Reduces manual handoffs between Sales, Finance, and Operations",
        desc: "Automation eliminates the need for manual data entry and transfers between teams. Sales processes flow directly into billing systems, Finance has real-time visibility into orders and revenue recognition, and Operations receives accurate fulfillment data instantly.",
      },
      benefit3: {
        title: "Speeds up revenue recognition and minimizes billing errors",
        desc: "With automated order-to-cash processes, revenue recognition happens faster and more accurately. Your finance team spends less time chasing down orders and correcting billing issues, allowing them to focus on strategic financial planning.",
      },
    },
    summary: {
      title: "Summary",
      description: "Lead to Cash is an end-to-end business process that encompasses the complete customer lifecycle from lead generation through final payment. It combines Salesforce CPQ, Order Management, and Billing capabilities to create a unified revenue management system. The solution connects lead qualification, opportunity management, quoting, order fulfillment, invoicing, and payment collection within a single platform, replacing fragmented systems and manual processes.",
    },
    bestFor: {
      title: "Best for",
      items: [
        "B2B companies",
        "Subscription or contract-based businesses",
        "Organizations struggling with order errors or delayed billing",
      ],
    },
    detailsSection: {
      paragraph1:
        "Lead to Cash transforms revenue management by creating a unified system that connects all stages of the customer lifecycle. From sales qualification to quote generation, order management, billing, and payment collection, every step is optimized and automated within a single platform.",
      paragraph2:
        "By integrating Salesforce CPQ, Order Management, and Billing capabilities, Lead to Cash eliminates fragmented systems and manual processes. Your sales team works faster with accurate quotes, your operations team fulfills orders without delays, and your finance team recognizes revenue accurately and promptly.",
    },
    contact: {
      title: "Contact Us",
      phone: "+662-231-8088",
      email: "contact@ignite-idea.com",
      address: "Suite 0871, Level 8, 1-7 Zuellig House, Silom Road, Silom, Bangrak, Bangkok, 10500, Thailand",
      hours: "Monday-Friday: 9am – 6pm",
      services: "Our consult & services",
      crm: "Customer Relationship Management (CRM)",
      callCenter: "Call Center System",
      marketing: "Marketing Automation System",
      dataManagement: "Data Management",
      partners: "Our product partner",
    },
    booking: {
      title: "จองคำปรึกษา",
      subtitle: "ทีมผู้เชี่ยวชาญด้าน Lead to Cash ของเราพร้อมให้บริการในการรับฟังปัญหาในการรวาระบบของคุณ",
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
  },
  th: {
    nav: {
      home: "หน้าแรก",
      service: "บริการของเรา",
      services: [
        { name: "การจัดการ Lead to Cash (Order)", href: "/service/lead-to-cash-mgn" },
        { name: "การดำเนินการขายภาคสนาม", href: "/service/field-sales" },
        { name: "การขายตามสัญญาสำหรับการผลิต", href: "/service/contractual-sales" },
        { name: "การรวมข้อมูลลูกค้า 360 องศา", href: "/service/customer-360" },
        { name: "ศูนย์บริการลูกค้ายุคใหม่", href: "/service/customer-services-centre" },
        { name: "Salesforce Manage Service", href: "/service/salesforce-manage-service" },
      ],
      resources: "คลังทรัพยากร",
      about: "เกี่ยวกับเรา",
      schedule: "นัดที่ปรึกษา",
    },
    hero: {
      title: "Lead to Cash (Order) Management",
      subtitle: "เชื่อมต่อการขาย การกำหนดราคา สัญญา คำสั่งซื้อ การเรียกเก็บเงิน และการชำระเงินเข้าเป็นการไหลที่ราบรื่นเดียว ลดการส่งต่อด้วยตนเองระหว่างฝ่ายขาย การเงิน และการดำเนินงาน",
      cta: "ติดต่อเรา",
    },
    benefitsTitle: "Lead to Cash สามารถช่วยองค์กรของคุณด้านใดได้บ้าง",
    benefits: {
      benefit1: {
        title: "เชื่อมต่อการขาย การกำหนดราคา สัญญา คำสั่งซื้อ การเรียกเก็บเงิน และการชำระเงิน",
        desc: "Lead to Cash รวมกระบวนการจัดการรายได้ทั้งหมดของคุณ ลบข้อมูลไซโล และสร้างการเดินทางลูกค้าที่เป็นเอกโปรตีน ตั้งแต่ใบเสนอราคาเบื้องต้นจนถึงการชำระเงินครั้งสุดท้าย ข้อมูลทั้งหมดไหลราบรื่นในทั่วทั้งแผนก เพื่อให้มีความสอดคล้องและลดข้อผิดพลาด",
      },
      benefit2: {
        title: "ลดการส่งต่อด้วยตนเองระหว่างฝ่ายขาย การเงิน และการดำเนินงาน",
        desc: "การทำอัตโนมัติกำจัดความจำเป็นในการป้อนข้อมูลด้วยตนเองและการโอนระหว่างทีม กระบวนการขายไหลโดยตรงเข้าระบบการเรียกเก็บเงิน การเงินจึงมีมองเห็น คำสั่งซื้อและการรับรู้รายได้แบบเรียลไทม์ และการดำเนินงานได้รับข้อมูลการตอบสนองที่แม่นยำทันที",
      },
      benefit3: {
        title: "เพิ่มความเร็วในการรับรู้รายได้และลดข้อผิดพลาดในการเรียกเก็บเงิน",
        desc: "ด้วยกระบวนการจากคำสั่งซื้อไปยังเงินสดอัตโนมัติ การรับรู้รายได้เกิดขึ้นเร็วขึ้นและแม่นยำยิ่งขึ้น ทีมการเงินของคุณใช้เวลาน้อยลงในการตามหาคำสั่งซื้อและการแก้ไขปัญหาการเรียกเก็บเงิน ซึ่งช่วยให้พวกเขาสามารถเน้นไปที่การวางแผนทางการเงินด้านกลยุทธ์",
      },
    },
    summary: {
      title: "สรุป",
      description: "Lead to Cash เป็นกระบวนการทางธุรกิจแบบครบวงจรที่ครอบคลุมวงจรชีวิตลูกค้าที่สมบูรณ์ตั้งแต่การสร้างลีดไปจนถึงการชำระเงินครั้งสุดท้าย โดยรวมความสามารถของ Salesforce CPQ การจัดการคำสั่งซื้อ และการเรียกเก็บเงิน เพื่อสร้างระบบการจัดการรายได้ที่เป็นเอกภาพ",
    },
    bestFor: {
      title: "เหมาะสำหรับ",
      items: [
        "บริษัท B2B",
        "ธุรกิจตามการสมัครสมาชิกหรือสัญญา",
        "องค์กรที่มีปัญหาขาดแคลนคำสั่งซื้อหรือการเรียกเก็บเงินที่ล่าช้า",
      ],
    },
    detailsSection: {
      paragraph1:
        "Lead to Cash เปลี่ยนแปลงการจัดการรายได้โดยการสร้างระบบเอกภาพที่เชื่อมต่อขั้นตอนทั้งหมดของวงจรชีวิตลูกค้า ตั้งแต่การคัดกรองการขายจนถึงการสร้างใบเสนอราคา การจัดการคำสั่งซื้อ การเรียกเก็บเงิน และการเก็บเงิน ทุกขั้นตอนได้รับการปรับให้เหมาะสมและทำอัตโนมัติภายในแพลตฟอร์มเดียว",
      paragraph2:
        "ด้วยการรวม Salesforce CPQ ความสามารถในการจัดการคำสั่งซื้อ และการเรียกเก็บเงิน Lead to Cash จึงกำจัดระบบที่แตกแยกและกระบวนการด้วยตนเอง ทีมขายของคุณจึงทำงานได้เร็วขึ้นด้วยใบเสนอราคาที่แม่นยำ ทีมดำเนินงานของคุณตอบสนองคำสั่งซื้อได้โดยไม่ล่าช้า และทีมการเงินของคุณรับรู้รายได้ได้อย่างแม่นยำและทันท่วงที",
    },
    contact: {
      title: "Contact Us",
      phone: "+662-231-8088",
      email: "contact@ignite-idea.com",
      address: "Suite 0871, Level 8, 1-7 Zuellig House, Silom Road, Silom, Bangrak, Bangkok, 10500, Thailand",
      hours: "Monday-Friday: 9am – 6pm",
      services: "Our consult & services",
      crm: "Customer Relationship Management (CRM)",
      callCenter: "Call Center System",
      marketing: "Marketing Automation System",
      dataManagement: "Data Management",
      partners: "Our product partner",
    },
    booking: {
      title: "จองคำปรึกษา",
      subtitle: "ทีมผู้เชี่ยวชาญด้าน Lead to Cash ของเราพร้อมให้บริการในการรับฟังปัญหาในการรวาระบบของคุณ",
      firstName: "ชื่อ - นามสกุล",
      email: "อีเมล์",
      organization: "ชื่อองกร์กร",
      message: "ข้อความ",
      captcha: "13 + 15 =",
      submit: "นัดที่ปรึกษา",
    },
    scheduleModal: {
      title: "รับสิทธิ์ปรึกษาฟรี 30 นาที",
      subtitle: "ปรึกษาปัญหาและค้นหาแนวทางแก้ไขที่ใช้ได้จริง",
      projectLabel: "อธิบายความต้องการโครงการของคุณ",
      projectPlaceholder: "อธิบายความต้องการโครงการของคุณที่นี่...",
      nameLabel: "ชื่อของคุณ",
      emailLabel: "อีเมลบริษัท",
      submit: "ส่ง",
    },
  },
}

export default function LeadToCashPage() {
  const [lang, setLang] = useState<"en" | "th">("en")
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    window.scrollTo(0, 0)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-us')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Floating Chat Button */}
      <FloatingChatButton onClick={() => setScheduleModalOpen(true)} />

      {/* Navigation */}
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
              <Link href="/#home" className="text-white/90 hover:text-white transition-colors">
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
              <a href="#resources" className="text-white/90 hover:text-white transition-colors">
                {t.nav.resources}
              </a>
              <a href="#about" className="text-white/90 hover:text-white transition-colors">
                {t.nav.about}
              </a>
            </div>

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
                <Link href="/#home" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2">
                  {t.nav.home}
                </Link>
                <div className="px-4">
                  <button
                    onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                    className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 transition-colors py-2"
                  >
                    {t.nav.service}
                    <ChevronDown className={`w-4 h-4 transition-transform ${serviceDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                <a href="#resources" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2">
                  {t.nav.resources}
                </a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2">
                  {t.nav.about}
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Floating Call Button */}
      <FloatingCallButton onClick={() => setScheduleModalOpen(true)} text={t.nav.schedule} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}} />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-blue-200 text-sm font-medium">{lang === "en" ? "End-to-End Revenue Management" : "การจัดการรายได้แบบครบวงจร"}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] text-balance">{t.hero.title}</h1>
              <p className="text-xl text-blue-100 leading-relaxed max-w-xl">{t.hero.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={scrollToContact} size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 shadow-xl shadow-blue-500/30 text-lg">
                  {lang === "en" ? "Get Started" : "เริ่มต้น"} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="relative">
              {/* Flow Visualization */}
              
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
            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 - Seamless Flow */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-blue-100 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{t.benefits.benefit1.title}</h3>
                <p className="text-gray-600 leading-relaxed">{t.benefits.benefit1.desc}</p>
                
                {/* Icon decoration */}
                <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>

            {/* Benefit 2 - Reduced Handoffs */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-purple-100 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{t.benefits.benefit2.title}</h3>
                <p className="text-gray-600 leading-relaxed">{t.benefits.benefit2.desc}</p>
                
                {/* Icon decoration */}
                <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>

            {/* Benefit 3 - Speed & Accuracy */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-amber-100 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{t.benefits.benefit3.title}</h3>
                <p className="text-gray-600 leading-relaxed">{t.benefits.benefit3.desc}</p>
                
                {/* Icon decoration */}
                <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Section with Visual Process */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-[3rem] p-12 md:p-16 shadow-2xl border border-blue-800/30 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px'}} />
            </div>
            
            <div className="relative space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30">
                <span className="text-blue-200 text-sm font-semibold uppercase tracking-wider">{t.summary.title}</span>
              </div>
              <p className="text-xl md:text-2xl text-blue-50 leading-relaxed max-w-4xl">{t.summary.description}</p>
              
              {/* Visual Process Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                  <div className="text-green-300 font-semibold text-sm">Lead Gen</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                  <div className="text-blue-300 font-semibold text-sm">Quote & CPQ</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                  <div className="text-purple-300 font-semibold text-sm">Order Mgmt</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <span className="text-3xl font-bold text-white">4</span>
                  </div>
                  <div className="text-amber-300 font-semibold text-sm">Billing & Cash</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best For Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-50/50 via-white to-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">{t.bestFor.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{lang === "en" ? "Perfect fit for organizations looking to streamline their revenue operations" : "���หมาะสำหรับองค์กรที่ต้องการปรับปรุงการดำเนินงานรายได้"}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {t.bestFor.items.map((item, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500" />
                <div className="relative bg-white rounded-3xl p-8 border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                    <span className="text-2xl font-bold text-white">{idx + 1}</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 leading-tight">{item}</p>
                  
                  {/* Checkmark icon */}
                  <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px'}} />
        </div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8 text-white">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30 mb-6">
                  <span className="text-blue-200 text-sm font-semibold uppercase tracking-wider">{lang === "en" ? "How It Works" : "วิธีการทำงาน"}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-balance">{lang === "en" ? "Transform Your Revenue Management" : "เปลี่ยนแปลงการจัดการรายได้ของคุณ"}</h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-blue-100 leading-relaxed">{t.detailsSection.paragraph1}</p>
                <p className="text-lg md:text-xl text-blue-100 leading-relaxed">{t.detailsSection.paragraph2}</p>
              </div>

              <Button onClick={() => setScheduleModalOpen(true)} size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 shadow-xl shadow-blue-500/30">
                {lang === "en" ? "Schedule Demo" : "จองการสาธิต"} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Right: Stats/Metrics */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold text-blue-400 mb-2">85%</div>
                <div className="text-blue-200 text-sm leading-tight">{lang === "en" ? "Faster Quote Generation" : "การสร้างใบเสนอราคาเร็วขึ้น"}</div>
              </div>
              
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold text-purple-400 mb-2">60%</div>
                <div className="text-purple-200 text-sm leading-tight">{lang === "en" ? "Reduced Manual Errors" : "ลดข้อผิดพลาดด้วยตนเอง"}</div>
              </div>
              
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold text-green-400 mb-2">40%</div>
                <div className="text-green-200 text-sm leading-tight">{lang === "en" ? "Faster Revenue Recognition" : "การรับรู้รายได้เร็วขึ้น"}</div>
              </div>
              
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold text-amber-400 mb-2">100%</div>
                <div className="text-amber-200 text-sm leading-tight">{lang === "en" ? "Cross-Dept Visibility" : "การมองเห็นข้ามแผนก"}</div>
              </div>
            </div>
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
              {/* Contact Details Cards */}
              <div className="grid gap-6">
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <a
                        href={`tel:${t.contact.phone}`}
                        className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                      >
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
                      <a
                        href={`mailto:${t.contact.email}`}
                        className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                      >
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
                      <p className="text-gray-600 text-sm mt-2">{t.contact.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.contact.services}</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/service/crm" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                      {t.contact.crm}
                    </Link>
                  </li>
                  <li>
                    <Link href="/service/customer-services-centre" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                      {t.contact.callCenter}
                    </Link>
                  </li>
                  <li>
                    <Link href="/service/marketing" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                      {t.contact.marketing}
                    </Link>
                  </li>
                  <li>
                    <Link href="/service/data-management" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                      {t.contact.dataManagement}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - Booking Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{lang === "en" ? "Schedule Your Strategy Call" : "จองเรียกปรึกษาเชิงกลยุทธ์ของคุณ"}</h3>
              <p className="text-gray-600 mb-8">{lang === "en" ? "Get expert advice on Lead to Cash implementation" : "รับคำแนะนำจากผู้เชี่ยวชาญเกี่ยวกับการใช้งาน Lead to Cash"}</p>
              
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
            <DialogTitle>{t.scheduleModal.title}</DialogTitle>
            <DialogDescription>{t.scheduleModal.subtitle}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-6">
            <div>
              <Label htmlFor="project" className="text-gray-900 font-semibold">{t.scheduleModal.projectLabel}</Label>
              <Textarea id="project" placeholder={t.scheduleModal.projectPlaceholder} rows={4} className="mt-2 rounded-lg" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="modal-name" className="text-gray-900 font-semibold">{t.scheduleModal.nameLabel}</Label>
                <Input id="modal-name" placeholder="John Doe" className="mt-2 rounded-lg" />
              </div>
              <div>
                <Label htmlFor="modal-email" className="text-gray-900 font-semibold">{t.scheduleModal.emailLabel}</Label>
                <Input id="modal-email" type="email" placeholder="john@company.com" className="mt-2 rounded-lg" />
              </div>
            </div>

            <Button onClick={() => setScheduleModalOpen(false)} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 text-lg font-semibold">
              {t.scheduleModal.submit}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
