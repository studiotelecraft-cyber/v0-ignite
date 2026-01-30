"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, ChevronDown, ArrowRight, X, Menu, Workflow, DollarSign, Zap } from 'lucide-react'
import Link from "next/link"
import { FloatingCallButton } from "@/components/floating-call-button"
import { FloatingChatButton } from "@/components/floating-chat-button"

const translations = {
  en: {
    nav: {
      home: "Home",
      service: "Service",
      resources: "Resources",
      about: "About",
      schedule: "Schedule a call",
    },
    hero: {
      title: "Lead to Cash Management",
      subtitle: "Transform your revenue operations with seamless Lead to Cash processes. Connect sales, pricing, contracts, orders, billing, and payments into one unified flow.",
      cta: "Schedule Consultation",
    },
    benefits: {
      title: "How Can Lead to Cash Help Your Organization?",
      benefit1: {
        title: "Seamless Revenue Flow",
        desc: "Connects sales, pricing, contracts, orders, billing, and payments into one seamless flow, eliminating data silos and manual handoffs between departments.",
      },
      benefit2: {
        title: "Reduce Manual Handoffs",
        desc: "Reduces manual handoffs between Sales, Finance, and Operations teams, minimizing errors and accelerating the quote-to-cash cycle.",
      },
      benefit3: {
        title: "Faster Revenue Recognition",
        desc: "Speeds up revenue recognition and minimizes billing errors with automated workflows and real-time visibility across the entire customer lifecycle.",
      },
    },
    summary: {
      title: "Complete Customer Lifecycle Management",
      content: "Lead to Cash is an end-to-end business process that encompasses the complete customer lifecycle from lead generation through final payment. It combines Salesforce CPQ, Order Management, and Billing capabilities to create a unified revenue management system. The solution connects lead qualification, opportunity management, quoting, order fulfillment, invoicing, and payment collection within a single platform, replacing fragmented systems and manual processes."
    },
    bestFor: {
      title: "Best For",
      item1: "B2B companies with complex sales cycles",
      item2: "Subscription or contract-based businesses",
      item3: "Organizations struggling with order errors or delayed billing",
    },
    detailsTitle: "Unify your revenue operations from lead to cash",
    details: {
      p1: "Lead to Cash Management systems help organizations streamline the entire revenue lifecycle by integrating CRM, CPQ (Configure, Price, Quote), Order Management, and Billing systems. This unified approach eliminates disconnected processes and provides end-to-end visibility from initial lead capture through final payment.",
      p2: "Ignite Idea specialists help implement and customize Lead to Cash solutions tailored to your organization's needs. We can integrate Salesforce CPQ with your existing systems, automate complex pricing and approval workflows, and create seamless handoffs between sales, operations, and finance teams.",
      p3: "The best part? Lead to Cash systems eliminate revenue leakage, reduce Days Sales Outstanding (DSO), and improve forecast accuracy. With automated billing and payment processing, your finance team can focus on strategic initiatives while the system handles routine transactions flawlessly.",
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
      leadToCash: "Lead to Cash Management",
      partners: "Our product partner",
    },
    booking: {
      title: "Request a Consultation",
      subtitle: "Our expert revenue operations team is ready to listen to your needs and help you implement Lead to Cash solutions for your business.",
      firstName: "First Name - Last Name",
      email: "Email",
      organization: "Organization Name",
      message: "Message",
      captcha: "13 + 15 =",
      submit: "Book Consultation",
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
      service: "บริการ",
      resources: "คลังทรัพยากร",
      about: "เกี่ยวกับเรา",
      schedule: "นัดที่ปรึกษา",
    },
    hero: {
      title: "Lead to Cash Management",
      subtitle: "เปลี่ยนการดำเนินงานด้านรายได้ของคุณด้วยกระบวนการ Lead to Cash ที่ราบรื่น เชื่อมต่อการขาย การกำหนดราคา สัญญา คำสั่งซื้อ การเรียกเก็บเงิน และการชำระเงินเข้าด้วยกันในระบบเดียว",
      cta: "นัดปรึกษา",
    },
    benefits: {
      title: "Lead to Cash สามารถช่วยองค์กรของคุณอย่างไร",
      benefit1: {
        title: "กระบวนการรายได้ที่ราบรื่น",
        desc: "เชื่อมต่อการขาย การกำหนดราคา สัญญา คำสั่งซื้อ การเรียกเก็บเงิน และการชำระเงินเข้าด้วยกันอย่างราบรื่น กำจัดข้อมูลที่แยกส่วนและการส่งต่องานด้วยตนเองระหว่างแผนก",
      },
      benefit2: {
        title: "ลดการส่งต่องานด้วยตนเอง",
        desc: "ลดการส่งต่องานด้วยตนเองระหว่างทีมขาย การเงิน และปฏิบัติการ ลดข้อผิดพลาดและเร่งวงจรจากใบเสนอราคาสู่เงินสด",
      },
      benefit3: {
        title: "รับรู้รายได้เร็วขึ้น",
        desc: "เร่งการรับรู้รายได้และลดข้อผิดพลาดในการเรียกเก็บเงินด้วยเวิร์กโฟลว์อัตโนมัติและการมองเห็นแบบเรียลไทม์ตลอดวงจรชีวิตลูกค้าทั้งหมด",
      },
    },
    summary: {
      title: "การจัดการวงจรชีวิตลูกค้าแบบครบวงจร",
      content: "Lead to Cash เป็นกระบวนการทางธุรกิจแบบครบวงจรที่ครอบคลุมวงจรชีวิตลูกค้าทั้งหมดตั้งแต่การสร้างลีดไปจนถึงการชำระเงินขั้นสุดท้าย รวม Salesforce CPQ, Order Management และ Billing เข้าด้วยกันเพื่อสร้างระบบจัดการรายได้แบบครบวงจร โซลูชันเชื่อมต่อการคัดเลือกลีด การจัดการโอกาส การเสนอราคา การดำเนินการคำสั่งซื้อ การออกใบแจ้งหนี้ และการเก็บเงินภายในแพลตฟอร์มเดียว แทนที่ระบบที่แยกส่วนและกระบวนการด้วยตนเอง"
    },
    bestFor: {
      title: "เหมาะสำหรับ",
      item1: "บริษัท B2B ที่มีวงจรการขายที่ซับซ้อน",
      item2: "ธุรกิจแบบสมัครสมาชิกหรือสัญญา",
      item3: "องค์กรที่ประสบปัญหาข้อผิดพลาดในคำสั่งซื้อหรือการเรียกเก็บเงินล่าช้า",
    },
    detailsTitle: "รวมการดำเนินงานด้านรายได้ของคุณตั้งแต่ลีดถึงเงินสด",
    details: {
      p1: "ระบบ Lead to Cash Management ช่วยองค์กรปรับปรุงวงจรรายได้ทั้งหมดโดยการรวม CRM, CPQ (Configure, Price, Quote), Order Management และระบบ Billing เข้าด้วยกัน วิธีการที่เป็นหนึ่งเดียวนี้กำจัดกระบวนการที่ไม่เชื่อมต่อกันและให้การมองเห็นแบบครบวงจรตั้งแต่การจับลีดเริ่มต้นจนถึงการชำระเงินขั้นสุดท้าย",
      p2: "ผู้เชี่ยวชาญของ Ignite Idea ช่วยติดตั้งและปรับแต่งโซลูชัน Lead to Cash ให้เหมาะกับความต้องการขององค์กร เราสามารถผสาน Salesforce CPQ กับระบบที่มีอยู่ของคุณ ทำให้เวิร์กโฟลว์การกำหนดราคาและการอนุมัติที่ซับซ้อนเป็นแบบอัตโนมัติ และสร้างการส่งต่อที่ราบรื่นระหว่างทีมขาย ปฏิบัติการ และการเงิน",
      p3: "ส่วนที่ดีที่สุด? ระบบ Lead to Cash กำจัดการรั่วไหลของรายได้ ลด Days Sales Outstanding (DSO) และปรับปรุงความแม่นยำในการคาดการณ์ ด้วยการเรียกเก็บเงินและการประมวลผลการชำระเงินอัตโนมัติ ทีมการเงินของคุณสามารถมุ่งเน้นไปที่โครงการเชิงกลยุทธ์ในขณะที่ระบบจัดการธุรกรรมประจำได้อย่างไร้ที่ติ",
    },
    contact: {
      title: "ติดต่อเรา",
      phone: "+662-231-8088",
      email: "contact@ignite-idea.com",
      address: "Suite 0871, Level 8, 1-7 Zuellig House, Silom Road, Silom, Bangrak, Bangkok, 10500, Thailand",
      hours: "Monday-Friday: 9am – 6pm",
      services: "บริการของเรา",
      crm: "ระบบบริหารความสัมพันธ์กับลูกค้า (CRM)",
      callCenter: "ระบบศูนย์บริการโทรศัพท์",
      marketing: "ระบบการตลาดอัตโนมัติ",
      dataManagement: "การจัดการข้อมูล",
      leadToCash: "การจัดการจากลีดสู่เงินสด",
      partners: "คู่ค้าผลิตภัณฑ์ของเรา",
    },
    booking: {
      title: "จองคำปรึกษา",
      subtitle: "ทีมผู้เชี่ยวชาญด้านการดำเนินงานรายได้ของเราพร้อมให้บริการในการรับฟังความต้องการและช่วยคุณใช้งานโซลูชัน Lead to Cash สำหรับธุรกิจของคุณ",
      firstName: "ชื่อ - นามสกุล",
      email: "อีเมล์",
      organization: "ชื่อองค์กร",
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
      <FloatingChatButton onClick={() => setScheduleModalOpen(true)} />
      <FloatingCallButton onClick={() => setScheduleModalOpen(true)} text={t.nav.schedule} />

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
                <Link href="/service/crm" className="text-white/90 hover:text-white transition-colors flex items-center gap-1">
                  {t.nav.service}
                  <ChevronDown className="w-4 h-4" />
                </Link>
                {serviceDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="w-80 backdrop-blur-xl bg-white/95 rounded-lg shadow-xl border border-gray-200 py-2">
                      <Link href="/service/crm" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        Sales Solution (CRM)
                      </Link>
                      <Link href="/service/call-center" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        Customer Service Solution (Call Center)
                      </Link>
                      <Link href="/service/marketing" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        Marketing Automation Solution
                      </Link>
                      <Link href="/service/data-management" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        Data Management Solution
                      </Link>
                      <Link href="/service/lead-to-cash" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        Lead to Cash Management
                      </Link>
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
                  {serviceDropdownOpen && (
                    <div className="ml-4 mt-2 space-y-2">
                      <Link href="/service/crm" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-blue-600 transition-colors py-2">
                        Sales Solution (CRM)
                      </Link>
                      <Link href="/service/call-center" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-blue-600 transition-colors py-2">
                        Customer Service Solution
                      </Link>
                      <Link href="/service/marketing" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-blue-600 transition-colors py-2">
                        Marketing Automation
                      </Link>
                      <Link href="/service/data-management" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-blue-600 transition-colors py-2">
                        Data Management
                      </Link>
                      <Link href="/service/lead-to-cash" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-blue-600 transition-colors py-2">
                        Lead to Cash
                      </Link>
                    </div>
                  )}
                </div>
                <Link href="/resources" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2">
                  {t.nav.resources}
                </Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2">
                  {t.nav.about}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="/images/design-mode/SalesSolutionIMG_001.jpg"
            alt="Revenue Management Visualization"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight text-balance drop-shadow-lg">{t.hero.title}</h1>
              <p className="text-xl text-white leading-relaxed text-pretty drop-shadow-md">{t.hero.subtitle}</p>
              <Button 
                onClick={() => setScheduleModalOpen(true)}
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl cursor-pointer"
              >
                {lang === "en" ? "Contact Us" : "ติดต่อเรา"} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-card">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
            {t.benefits.title}
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full mb-16" />

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Workflow className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t.benefits.benefit1.title}</h3>
                <p className="text-gray-700 leading-relaxed">{t.benefits.benefit1.desc}</p>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-100 to-transparent rounded-tl-full opacity-50" />
            </div>

            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t.benefits.benefit2.title}</h3>
                <p className="text-gray-700 leading-relaxed">{t.benefits.benefit2.desc}</p>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyan-100 to-transparent rounded-tl-full opacity-50" />
            </div>

            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t.benefits.benefit3.title}</h3>
                <p className="text-gray-700 leading-relaxed">{t.benefits.benefit3.desc}</p>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-teal-100 to-transparent rounded-tl-full opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-600">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 text-balance">
            {t.summary.title}
          </h2>
          <div className="space-y-6 text-white/95 text-lg leading-relaxed">
            <p>{t.summary.content}</p>
          </div>
        </div>
      </section>

      {/* Best For Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
            {t.bestFor.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-blue-100">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">{t.bestFor.item1}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-cyan-100">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">{t.bestFor.item2}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-teal-100">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">{t.bestFor.item3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12 text-balance">
            {t.detailsTitle}
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>{t.details.p1}</p>
            <p>{t.details.p2}</p>
            <p>{t.details.p3}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-us" className="py-20 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.contact.title}</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Information */}
            <div className="space-y-8">
              <div className="grid gap-6">
                <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 border border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Phone</h3>
                      <p className="text-blue-100">{t.contact.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 border border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Email</h3>
                      <p className="text-blue-100">{t.contact.email}</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 border border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-blue-400 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Office</h3>
                      <p className="text-blue-100">{t.contact.address}</p>
                      <p className="text-blue-200 text-sm mt-2">{t.contact.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Booking Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.booking.title}</h3>
              <p className="text-gray-600 mb-6">{t.booking.subtitle}</p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <Label htmlFor="name" className="text-gray-700">{t.booking.firstName}</Label>
                  <Input id="name" placeholder={t.booking.firstName} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700">{t.booking.email}</Label>
                  <Input id="email" type="email" placeholder={t.booking.email} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="organization" className="text-gray-700">{t.booking.organization}</Label>
                  <Input id="organization" placeholder={t.booking.organization} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-700">{t.booking.message}</Label>
                  <Textarea id="message" placeholder={t.booking.message} rows={4} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="captcha" className="text-gray-700">{t.booking.captcha}</Label>
                  <Input id="captcha" placeholder="28" className="mt-1" />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                  {t.booking.submit}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Modal */}
      <Dialog open={scheduleModalOpen} onOpenChange={setScheduleModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{t.scheduleModal.title}</DialogTitle>
            <DialogDescription>{t.scheduleModal.subtitle}</DialogDescription>
          </DialogHeader>
          <form className="space-y-4 mt-4" onSubmit={(e) => { e.preventDefault(); setScheduleModalOpen(false); }}>
            <div>
              <Label htmlFor="modal-project">{t.scheduleModal.projectLabel}</Label>
              <Textarea
                id="modal-project"
                placeholder={t.scheduleModal.projectPlaceholder}
                rows={3}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="modal-name">{t.scheduleModal.nameLabel}</Label>
              <Input id="modal-name" placeholder={t.scheduleModal.nameLabel} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="modal-email">{t.scheduleModal.emailLabel}</Label>
              <Input id="modal-email" type="email" placeholder={t.scheduleModal.emailLabel} className="mt-1" />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              {t.scheduleModal.submit}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
