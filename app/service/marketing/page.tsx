"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, ChevronDown, ArrowRight, Menu, X } from 'lucide-react'
import Link from "next/link"
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
      title: "Marketing Automation",
      subtitle: "Maximize efficiency, increase conversions, and unlock ROI from your marketing automation system with Marketing Automation.",
      cta: "Schedule Consultation",
    },
    benefits: {
      title: "Marketing Automation benefits that help organizations achieve success",
      benefit1: {
        title: "Automate Repetitive Tasks",
        desc: "Marketing Automation systems streamline marketing operations by automating tasks such as email marketing, scheduling posts on social media, and managing advertising campaigns, reducing manual work time.",
      },
      benefit2: {
        title: "Improve Campaign Efficiency",
        desc: "Marketing Automation allows for marketing campaign planning with better timing. Sending messages at the right moments increases Conversion Rates. Campaigns can be segmented according to different customer groups.",
      },
      benefit3: {
        title: "Comprehensive Campaign Tracking",
        desc: "Comprehensive Marketing Automation systems provide tools to analyze campaign results, track ROI, and measure campaign effectiveness in real-time, helping refine strategies for maximum ROI.",
      },
    },
    detailsTitle: "Transform your marketing with powerful automation",
    details: {
      p1: "Marketing Automation systems help manage all aspects of your marketing operations, enabling organizations to automate complex workflows, personalize customer experiences, and scale marketing efforts without proportionally increasing resources.",
      p2: "Ignite Idea specialists help implement and customize Marketing Automation solutions tailored to your organization's needs. We can integrate the system with existing CRM systems, set up sophisticated workflows, and create personalized automated campaigns that deliver results.",
      p3: "The best part? Marketing Automation systems eliminate repetitive manual tasks, allowing marketing teams to focus on strategic initiatives and creative work. Real-time analytics help track campaign performance and continuously optimize strategies based on data-driven insights.",
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
      resources: "ทรัพยากร",
      about: "เกี่ยวกับเรา",
      schedule: "นัดที่ปรึกษา",
    },
    hero: {
      title: "Marketing Automation",
      subtitle: "เพิ่มประสิทธิภาพ เพิ่มประสิทธิภาพ และเพิ่ม ROI อาการการทำการตลาดของคุณอย่างเต็มที่ด้วยระบบ Marketing Automation",
      cta: "นัดปรึกษา",
    },
    benefits: {
      title: "ระบบ Marketing Automation สามารถช่วยองค์กรของคุณด้านใดได้บ้าง",
      benefit1: {
        title: "แคมเปญเอโต้ได้ทั้ง",
        desc: "ระบบ Marketing Automation ช่วยประหยัดเวลาการทำงานขอองคุณด้วยการทำงานเคื่อง เช่น การส่ง Email การโพสต์ Social Media การจัดการ Conversion อย่างเป็นระบบ",
      },
      benefit2: {
        title: "การเปิดคะแนนท์ที่เป้าหมาย",
        desc: "ระบบ Marketing Automation ช่วยให้คุณสามารถส่งข้อความตามเวลาที่เหมาะสม เพื่อเพิ่ม Conversion Rate ทั้งนี้คุณยังสามารถทำการส่ง Campaign ที่แตกต่างกันไปตามกลุ่มลูกค้าที่แตกต่างกันไป",
      },
      benefit3: {
        title: "การวัดการสำเร็จนับมัล",
        desc: "ระบบ Marketing Automation ที่ดีจะต้องพัฒนาในส่วน Analytics ให้คุณสามารถดูผลการทำ Campaign คำนวณ ROI และเข้าใจได้ว่า Campaign ของคุณได้ผลแค่ไหน เพื่อให้คุณสามารถปรับปรุง Campaign ของคุณให้มี ROI สูงสุด",
      },
    },
    detailsTitle: "เปลี่ยนวิธีทำการตลาดของคุณด้วยระบบอัตโนมัติที่ทรงพลัง",
    details: {
      p1: "ระบบ Marketing Automation ช่วยจัดการทุกการดำเนินงานทางการตลาด เปิดโอกาสให้องค์กรทำงานอัตโนมัติที่ซับซ้อน สร้างประสบการณ์ส่วนบุคคลให้กับลูกค้า และขยายงานการตลาดโดยไม่ต้องเพิ่มทรัพยากรแบบตามสัดส่วน",
      p2: "ผู้เชี่ยวชาญของ Ignite Idea ช่วยติดตั้งและปรับแต่งระบบ Marketing Automation ให้เหมาะกับความต้องการขององค์กร เราสามารถผสานระบบกับระบบ CRM ที่มีอยู่ ตั้งค่า workflow ที่ซับซ้อน และสร้างแคมเปญอัตโนมัติส่วนบุคคลที่สร้างผลลัพธ์จริง",
      p3: "ส่วนที่ดีที่สุด? ระบบ Marketing Automation ช่วยกำจัดงานซ้ำๆ ที่ต้องทำด้วยมือ ทำให้ทีมการตลาดสามารถมุ่งเน้นไปที่การริเริ่มเชิงกลยุทธ์และงานสร้างสรรค์ Analytics แบบ real-time ช่วยติดตามประสิทธิภาพแคมเปญและปรับกลยุทธ์อย่างต่อเนื่องตามข้อมูลเชิงลึก",
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
      partners: "คู่ค้าผลิตภัณฑ์ของเรา",
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

export default function MarketingPage() {
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
      <FloatingChatButton onClick={scrollToContact} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <img src="/images/ignite-logo.png" alt="IGNITE IDEA" className="h-12 w-12" />
              <div className="text-xl font-bold text-white">IGNITE IDEA</div>
            </Link>

            {/* Desktop Menu */}
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

            {/* Right Section */}
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
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/design-mode/MarketingIMG_001.jpg"
            alt="Marketing Automation Network"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight text-balance drop-shadow-lg">
                {t.hero.title}
              </h1>
              <p className="text-xl text-white leading-relaxed text-pretty drop-shadow-md">
                {t.hero.subtitle}
              </p>
              <Button 
                onClick={() => setScheduleModalOpen(true)}
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl cursor-pointer"
              >
                {lang === "en" ? "Contact Us" : "ติดต่อเรา"} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Benefits Section */}
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

      {/* Details Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-600">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 text-balance">
            {t.detailsTitle}
          </h2>
          <div className="space-y-6 text-white/95 text-lg leading-relaxed">
            <p>{t.details.p1}</p>
            <p>{t.details.p2}</p>
            <p>{t.details.p3}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-us" className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.contact.title}</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Information */}
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

            {/* Right Side - Booking Form */}
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

      {/* Schedule Modal */}
      <Dialog open={scheduleModalOpen} onOpenChange={setScheduleModalOpen}>
        <DialogContent className="sm:max-w-4xl backdrop-blur-xl bg-gradient-to-br from-white via-blue-50 to-cyan-50 border-2 border-blue-200 text-gray-900 overflow-hidden p-0 max-h-[90vh]">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="md:col-span-1 h-[400px] md:h-auto overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <img 
                src="/images/design-mode/A%20single%20person%20confidently%20presenting%20during%20a%20Zoom%20call%2C%20with%20another%20person%20participants%20on%20the%20screen%20looking%20engaged%20and%20happy.%20Everyone%20is%20Thai.jpg"
                alt="Video Conference"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="md:col-span-1 p-8 overflow-y-auto max-h-[90vh]">
              <DialogHeader className="space-y-3 mb-6">
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  {t.scheduleModal.title}
                </DialogTitle>
                <DialogDescription className="text-lg text-gray-600">
                  {t.scheduleModal.subtitle}
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="project" className="text-base font-semibold text-gray-700">
                    {t.scheduleModal.projectLabel}
                  </Label>
                  <Textarea
                    id="project"
                    placeholder={t.scheduleModal.projectPlaceholder}
                    className="min-h-[120px] resize-none bg-white/70 border-2 border-blue-200 focus:border-blue-400 focus:ring-blue-400 text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-semibold text-gray-700">
                      {t.scheduleModal.nameLabel}
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      className="bg-white/70 border-2 border-blue-200 focus:border-blue-400 focus:ring-blue-400 text-gray-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-semibold text-gray-700">
                      {t.scheduleModal.emailLabel}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="bg-white/70 border-2 border-blue-200 focus:border-blue-400 focus:ring-blue-400 text-gray-900"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
                >
                  {t.scheduleModal.submit}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
