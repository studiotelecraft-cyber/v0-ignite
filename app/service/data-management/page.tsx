"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, ChevronDown, ArrowRight, X, Menu } from 'lucide-react'
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
      title: "Data Management",
      subtitle: "Transform your data into actionable insights with a secure Data Management system. Organize, analyze, and unlock the full potential of your business data.",
      cta: "Schedule Consultation",
    },
    benefits: {
      title: "Data Management benefits that help organizations achieve success",
      benefit1: {
        title: "Improve Data Quality",
        desc: "Data Management systems help organizations centralize and standardize data from multiple sources, reducing redundancy and errors while improving data accessibility across all departments.",
      },
      benefit2: {
        title: "Strengthen Security and Compliance",
        desc: "Data Management systems provide robust security features, data encryption, and automated compliance reporting to protect sensitive information and meet regulatory requirements.",
      },
      benefit3: {
        title: "Improve Data-Driven Decision Making",
        desc: "Comprehensive Data Management systems enable real-time analytics, visualization tools, and automated reporting to transform raw data into actionable business intelligence for strategic decision-making.",
      },
    },
    detailsSection: {
      title: "How Data Management Can Help Your Organization",
      content: "With our Data Management services, we can help you improve your data quality by ensuring it is accurate, complete, and up-to-date. This can help you make better decisions, improve customer relationships, and reduce the risk of errors and fraud.\n\nBeyond improving data quality, our data management services can also help you make more informed and efficient decisions. By providing you with accurate and reliable information, we can help you identify trends, patterns, and insights that can help you improve business performance, increase efficiency, and enhance customer satisfaction.\n\nFinally, our data management services can help you comply with relevant regulations and industry standards, as well as protect your data from security threats. By implementing robust security measures and using the latest technology, we can help you keep your data safe.\n\nOverall, our data management services provide businesses with the tools and expertise necessary to unlock the power of data. With better data quality, better decision-making, and enhanced security, our data management services can help businesses transform their operations and achieve their goals."
    },
    detailsTitle: "Transform raw data into strategic business intelligence",
    details: {
      p1: "Data Management systems help organizations collect, store, organize, and analyze data effectively. Modern data management solutions provide centralized platforms for data governance, quality control, and seamless integration across all business systems.",
      p2: "Ignite Idea specialists help implement and customize Data Management solutions tailored to your organization's needs. We can integrate the system with existing databases, set up automated data pipelines, and create comprehensive analytics dashboards that deliver real-time insights.",
      p3: "The best part? Data Management systems eliminate data silos and ensure data consistency across your organization. Advanced analytics and visualization tools help identify trends, predict outcomes, and make data-driven decisions that drive business growth and competitive advantage.",
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
      subtitle: "ทีมผู้เชี่ยวชาญด้าน CRM ของเราพร้อมให้บริการในการรับฟังปัญหาในการรวาระบบ CRM ของคุณ",
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
      service: "บริการ",
      resources: "คลังทรัพยากร",
      about: "เกี่ยวกับเรา",
      schedule: "นัดที่ปรึกษา",
    },
    hero: {
      title: "Data Management",
      subtitle: "พลิกโฉมข้อมูลของคุณให้เป็นข้อมูลเชิงลึกที่นำมาใช้ได้จริงด้วย ปลดล็อกพลังของข้อมูล (Data Management) ของคุณที่มีอยู่ให้เต็มศักยภาพ ชื่อข้อมูลให้เป็นระเบียบ ชื่อข้อมูลให้เป็นระเบียบ และค้นหาศักยภาพสูงสุดของข้อมูลธุรกิจของคุณในที่เดียว",
      cta: "นัดปรึกษา",
    },
    benefits: {
      title: "Data Management สามารถช่วยองค์กรของคุณด้านใดได้บ้าง",
      benefit1: {
        title: "ปรับปรุงคุณภาพข้อมูล",
        desc: "การจัดการข้อมูลสามารถช่วยให้ธุรกิจปรับปรุงคุณภาพข้อมูลของตนได้ด้วยการรับรองว่าถูกต้อง สมบูรณ์ และเป็นปัจจุบัน สิ่งนี้สามารถช่วยให้ธุรกิจตัดสินใจได้ดีขึ้น ปรับปรุงความสัมพันธ์กับลูกค้า และลดความเสี่ยงของข้อผิดพลาดและการฉ้อโกง",
      },
      benefit2: {
        title: "การตัดสินใจที่ดีขึ้น",
        desc: "ด้วยการจัดการข้อมูลที่ถูกต้องและเชื่อถือได้ให้กับธุรกิจ บริการจัดการข้อมูลสามารถช่วยให้ผู้บริหาร และผู้มีอำนาจตัดสินใจทำการตัดสินใจได้อย่างมีประสิทธิภาพมากขึ้น สิ่งนี้สามารถนำไปสู่การปรับปรุงประสิทธิภาพทางธุรกิจ ประสิทธิภาพที่เพิ่มขึ้น และความพึงพอใจของลูกค้าที่ดีขึ้น",
      },
      benefit3: {
        title: "การปฏิบัติตามข้อกำหนดและความปลอดภัย",
        desc: "บริการจัดการข้อมูลสามารถช่วยให้ธุรกิจมั่นใจได้ว่าข้อมูลองค์กรของคุณเป็นไปตามข้อบังคับและมาตรฐานอุตสาหกรรมที่เกี่ยวข้อง นอกจากนี้ บริการจัดการข้อมูลยังช่วยให้ธุรกิจปกป้องข้อมูลของตนจากภัยคุกคามด้านความปลอดภัย เช่น การแฮ็กและการละเมิดข้อมูล ได้อีกด้วย",
      },
    },
    detailsSection: {
      title: "Data Management สามารถช่วยองค์กรของคุณอย่างไร",
      content: "ด้วยบริการจัดการข้อมูล (Data Management) ของเรา เราสามารถช่วยคุณปรับปรุงคุณภาพข้อมูลของคุณโดยรับรองว่าถูกต้อง สมบูรณ์ และเป็นปัจจุบัน สิ่งนี้สามารถช่วยให้คุณตัดสินใจได้ดีขึ้น ปรับปรุงความสัมพันธ์กับลูกค้า และลดความเสี่ยงของข้อผิดพลาดและการฉ้อโกง\n\nนอกเหนือจากการปรับปรุงคุณภาพข้อมูลแล้ว บริการจัดการข้อมูลของเรายังสามารถช่วยให้คุณตัดสินใจได้อย่างมีข้อมูลและมีประสิทธิภาพมากขึ้น ด้วยการให้ข้อมูลที่ถูกต้องและเชื่อถือได้แก่คุณ เราสามารถช่วยคุณระบุแนวโน้ม รูปแบบ และข้อมูลเชิงลึกที่สามารถช่วยคุณปรับปรุงประสิทธิภาพของธุรกิจ เพิ่มประสิทธิภาพ และเพิ่มความพึงพอใจของลูกค้า\n\nประการสุดท้าย บริการจัดการข้อมูลของเราสามารถช่วยให้คุณปฏิบัติตามกฎระเบียบที่เกี่ยวข้องและมาตรฐานอุตสาหกรรม ตลอดจนปกป้องข้อมูลของคุณจากภัยคุกคามด้านความปลอดภัย ด้วยการใช้มาตรการรักษาความปลอดภัยที่แข็งแกร่งและใช้เทคโนโลยีล่าสุด เราสามารถช่วยคุณรักษาข้อมูลของคุณให้ปลอดภัย\n\nโดยรวมแล้ว บริการจัดการข้อมูลของเราช่วยให้ธุรกิจมีเครื่องมือและความเชี่ยวชาญที่จำเป็นในการปลดล็อกพลังของข้อมูล ด้วยคุณภาพของข้อมูลที่ดีขึ้น การตัดสินใจที่ดีขึ้น และการรักษาความปลอดภัยที่เพิ่มขึ้น บริการจัดการข้อมูลของเราสามารถช่วยให้ธุรกิจเปลี่ยนรูปแบบการดำเนินงานและบรรลุเป้าหมายได้"
    },
    detailsTitle: "เปลี่ยนข้อมูลดิบให้กลายเป็นข้อมูลเชิงลึกทางธุรกิจ",
    details: {
      p1: "ระบบการจัดการข้อมูลช่วยให้องค์กรสามารถรวบรวม จัดเก็บ จัดระเบียบ และวิเคราะห์ข้อมูลอย่างมีประสิทธิภาพ โซลูชันการจัดการข้อมูลสมัยใหม่ให้แพลตฟอร์มกลางสำหรับการควบคุมข้อมูล ควบคุมคุณภาพ และการผสานระบบอย่างราบรื่น",
      p2: "ผู้เชี่ยวชาญของ Ignite Idea ช่วยติดตั้งและปรับแต่งโซลูชันการจัดการข้อมูลให้เหมาะกับความต้องการขององค์กร เราสามารถผสานระบบกับฐานข้อมูลที่มีอยู่ ตั้งค่าขั้นตอนการทำงานอัตโนมัติสำหรับข้อมูล และสร้างแดชบอร์ดวิเคราะห์ที่ครอบคลุมและให้ข้อมูลเชิงลึกแบบเรียลไทม์",
      p3: "ส่วนที่ดีที่สุด? ระบบการจัดการข้อมูลช่วยกำจัดการแยกข้อมูล (data silos) และรับประกันความสอดคล้องของข้อมูลทั่วทั้งองค์กร เครื่องมือวิเคราะห์และการแสดงผลแบบอินเทอร์แอคทีฟช่วยระบุแนวโน้ม คาดการณ์ผล และทำการตัดสินใจบนฐานข้อมูลที่ขับเคลื่อนการเติบโตทางธุรกิจและข้อได้เปรียบทางการแข่งขัน",
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
      subtitle: "ทีมผู้เชี่ยวชาญด้าน CRM ของเราพร้อมให้บริการในการรับฟังปัญหาในการรวาระบบ CRM ของคุณ",
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

export default function DataManagementPage() {
  const [lang, setLang] = useState<"en" | "th">("en")
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    window.scrollTo(0, 0)
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

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/10">
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
                <Link href="/service" className="text-white/90 hover:text-white transition-colors flex items-center gap-1">
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
                    </div>
                  )}
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

      <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="/images/datalake.jpg"
            alt="Data Lake Visualization"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight text-balance drop-shadow-lg">{t.hero.title}</h1>
              <p className="text-xl text-white leading-relaxed text-pretty drop-shadow-md">{t.hero.subtitle}</p>
              <Button 
                onClick={scrollToContact}
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl cursor-pointer"
              >
                {lang === "en" ? "Contact Us" : "ติดต่อเรา"} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            
          </svg>
        </div>
      </section>

      <div className="bg-white">
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16 text-balance">
              {t.benefits.title}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-blue-400 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.benefits.benefit1.title}</h3>
                <p className="text-gray-700 leading-relaxed">{t.benefits.benefit1.desc}</p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-blue-400 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.benefits.benefit2.title}</h3>
                <p className="text-gray-700 leading-relaxed">{t.benefits.benefit2.desc}</p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-blue-400 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.benefits.benefit3.title}</h3>
                <p className="text-gray-700 leading-relaxed">{t.benefits.benefit3.desc}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-gradient-to-br from-white via-gray-50 to-blue-50">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12 text-balance">
              {t.detailsSection.title}
            </h2>
            
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200">
              <div className="prose prose-lg max-w-none">
                {t.detailsSection.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6 last:mb-0 text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact-us" className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.contact.title}</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
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
                        <p className="text-gray-600 text-sm mt-2">{t.contact.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.contact.services}</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/service/crm" className="text-blue-600 hover:text-blue-700 transition-colors font-medium flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-blue-600" />
                        {t.contact.crm}
                      </Link>
                    </li>
                    <li>
                      <Link href="/service/call-center" className="text-blue-600 hover:text-blue-700 transition-colors font-medium flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-blue-600" />
                        {t.contact.callCenter}
                      </Link>
                    </li>
                    <li>
                      <Link href="/service/marketing" className="text-blue-600 hover:text-blue-700 transition-colors font-medium flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-blue-600" />
                        {t.contact.marketing}
                      </Link>
                    </li>
                    <li>
                      <Link href="/service/data-management" className="text-blue-600 hover:text-blue-700 transition-colors font-medium flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-blue-600" />
                        {t.contact.dataManagement}
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Partners */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.contact.partners}</h3>
                  <div className="flex items-center gap-8 flex-wrap">
                    <img 
                      src="/images/design-mode/Group-1597881657.png.webp"
                      alt="Salesforce" 
                      className="h-12 opacity-70 hover:opacity-100 transition-opacity" 
                    />
                    <img 
                      src="/images/design-mode/Microsoft_logo_%282012%29.svg.png"
                      alt="Microsoft" 
                      className="h-12 opacity-70 hover:opacity-100 transition-opacity" 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 p-10 md:p-12 rounded-3xl shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{t.booking.title}</h2>
                <p className="text-white/90 mb-8 leading-relaxed">{t.booking.subtitle}</p>

                <form className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder={t.booking.firstName} className="bg-white border-0 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl shadow-sm" />
                    <Input placeholder={t.booking.email} type="email" className="bg-white border-0 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl shadow-sm" />
                  </div>
                  <Input placeholder={t.booking.organization} className="bg-white border-0 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl shadow-sm" />
                  <Textarea placeholder={t.booking.message} rows={5} className="bg-white border-0 text-gray-900 placeholder:text-gray-500 resize-none rounded-xl shadow-sm" />
                  <div className="flex items-center gap-4">
                    <Label className="text-white font-semibold text-lg">{t.booking.captcha}</Label>
                    <Input className="bg-white border-0 text-gray-900 max-w-[120px] h-12 rounded-xl shadow-sm" />
                  </div>
                  <Button className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    {t.booking.submit} →
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

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
    </div>
  )
}
