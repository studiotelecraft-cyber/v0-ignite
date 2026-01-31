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
      serviceGroups: {
        group1: {
          title: "Customer Experience & Sales Execution",
          items: [
            { name: "Lead to Cash (Order) Management", href: "/service/crm" },
            { name: "Field Sales Execution", href: "/service/crm" },
            { name: "Customer 360 Data Consolidation", href: "/service/data-management" },
            { name: "Next Gen. Customer Service Centre", href: "/service/call-center" },
            { name: "Contractual Sales for Manufacturing", href: "/service/crm" },
          ],
        },
        group2: {
          title: "Strategic Planning & Intelligence",
          items: [
            { name: "Integrated Business Planning (IBP)", href: "/service/data-management" },
            { name: "Sales & Operations Planning (S&OP)", href: "/service/crm" },
            { name: "Financial Planning & Analysis (FP&A)", href: "/service/data-management" },
          ],
        },
        group3: {
          title: "Supply Chain & Operations",
          items: [
            { name: "Demand & Supply Planning", href: "/service/data-management" },
            { name: "Production Planning", href: "/service/data-management" },
          ],
        },
      },
      resources: "Resources",
      about: "About",
      schedule: "Schedule a call",
    },
    hero: {
      title: "Call Center System",
      subtitle:
        "Comprehensive call center system for faster response, improved service efficiency, and higher customer satisfaction.",
      cta: "Contact Us",
    },
    benefitsTitle: "How Call Center Systems Can Help Your Organization",
    benefits: {
      benefit1: {
        title: "Improved Service Efficiency",
        desc: "The call center system enables your team to respond to customer inquiries faster and more accurately. With complete customer information and call history at your fingertips, agents can resolve issues promptly, reducing customer frustration and increasing satisfaction.",
      },
      benefit2: {
        title: "Increase Efficiency",
        desc: "Advanced call center features help you manage call flow effectively. With automatic call routing, intelligent queue management, and comprehensive reporting, you can optimize agent productivity and improve your team's overall performance.",
      },
      benefit3: {
        title: "Enhance Customer Satisfaction",
        desc: "The call center system enables your team to deliver consistent, high-quality service across all touchpoints. Real-time dashboards, customer sentiment tracking, and comprehensive analytics help you identify areas for improvement and enhance the overall customer experience.",
      },
    },
    detailsSection: {
      paragraph1:
        "Our call center system is designed to improve your customer service efficiency with cutting-edge technology. Features include automatic call routing to ensure customers reach the right agent, real-time monitoring of all calls, and comprehensive reporting that helps you analyze and improve your service quality.",
      paragraph2:
        "Advanced ticketing system integration ensures no customer inquiry goes unanswered. With CRM integration, your agents have instant access to complete customer information, enabling personalized service. Interactive voice response (IVR) helps reduce wait times and direct customers to the right department automatically, improving both efficiency and customer satisfaction.",
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
      subtitle: "ทีมผู้เชี่ยวชาญด้าน CRM ของเราพร้อมให้บริการในการรับฟังปัญหาในการรับฟังปัญหาในการรวาระบบ CRM ของคุณ",
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
      serviceGroups: {
        group1: {
          title: "ประสบการณ์ลูกค้าและการดำเนินการขาย",
          items: [
            { name: "การจัดการ Lead to Cash (Order)", href: "/service/crm" },
            { name: "การดำเนินการขายภาคสนาม", href: "/service/crm" },
            { name: "การรวมข้อมูลลูกค้า 360 องศา", href: "/service/data-management" },
            { name: "ศูนย์บริการลูกค้ายุคใหม่", href: "/service/call-center" },
            { name: "การขายตามสัญญาสำหรับการผลิต", href: "/service/crm" },
          ],
        },
        group2: {
          title: "การวางแผนเชิงกลยุทธ์และข่าวกรอง",
          items: [
            { name: "การวางแผนธุรกิจแบบบูรณาการ (IBP)", href: "/service/data-management" },
            { name: "การวางแผนการขายและการดำเนินงาน (S&OP)", href: "/service/crm" },
            { name: "การวางแผนและวิเคราะห์ทางการเงิน (FP&A)", href: "/service/data-management" },
          ],
        },
        group3: {
          title: "ห่วงโซ่อุปทานและการดำเนินงาน",
          items: [
            { name: "การวางแผนอุปสงค์และอุปทาน", href: "/service/data-management" },
            { name: "การวางแผนการผลิต", href: "/service/data-management" },
          ],
        },
      },
      resources: "คลังทรัพยากร",
      about: "เกี่ยวกับเรา",
      schedule: "นัดที่ปรึกษา",
    },
    hero: {
      title: "Call Center System",
      subtitle: "ระบบคอลเซ็นเตอร์ครบวงจร สำหรับการตอบสนองที่รวดเร็ว ปรับปรุงประสิทธิภาพการบริการ และสร้างความพึงพอใจให้ลูกค้า",
      cta: "ติดต่อเรา",
    },
    benefitsTitle: "ระบบ Call Center สามารถช่วยองค์กรของคุณด้านใดได้บ้าง",
    benefits: {
      benefit1: {
        title: "ปรับปรุงประสิทธิภาพการบริการ",
        desc: "ระบบคอลเซ็นเตอร์ช่วยให้ทีมของคุณตอบสนองคำถามลูกค้าได้เร็วและแม่นยำยิ่งขึ้น ด้วยข้อมูลลูกค้าที่ครบถ้วนและประวัติการสนทนาที่อยู่ในมือ เจ้าหน้าที่สามารถแก้ไขปัญหาได้ทันท่วงที ลดความไม่พอใจของลูกค้า และเพิ่มความพึงพอใจ",
      },
      benefit2: {
        title: "เพิ่มประสิทธิภาพการทำงาน",
        desc: "ฟีเจอร์คอลเซ็นเตอร์ขั้นสูงช่วยคุณจัดการการไหลของสายได้อย่างมีประสิทธิภาพ ด้วยระบบกระจายสายอัตโนมัติ การจัดการคิวอัจฉริยะ และการรายงานที่ครบถ้วน คุณสามารถเพิ่มผลิตภาพของเจ้าหน้าที่และปรับปรุงประสิทธิภาพโดยรวมของทีม",
      },
      benefit3: {
        title: "ยกระดับความพึงพอใจลูกค้า",
        desc: "ระบบคอลเซ็นเตอร์ช่วยให้ทีมของคุณมอบการบริการที่สม่ำเสมอและมีคุณภาพสูงในทุกช่องทาง แดชบอร์ดแบบเรียลไทม์ การติดตามความรู้สึกของลูกค้า และการวิเคราะห์ที่ครบถ้วนช่วยให้คุณระบุจุดที่ต้องปรับปรุงและยกระดับประสบการณ์ลูกค้าโดยรวม",
      },
    },
    detailsSection: {
      paragraph1:
        "ระบบคอลเซ็นเตอร์ของเราออกแบบมาเพื่อปรับปรุงประสิทธิภาพการบริการลูกค้าด้วยเทคโนโลยีล้ำสมัย ฟีเจอร์ต่างๆ รวมถึงการกระจายสายอัตโนมัติเพื่อให้แน่ใจว่าลูกค้าจะได้พูดคุยกับเจ้าหน้าที่ที่เหมาะสม การติดตามสายแบบเรียลไทม์ทุกสาย และการรายงานที่ครบถ้วนที่ช่วยให้คุณวิเคราะห์และปรับปรุงคุณภาพการบริการของคุณ",
      paragraph2:
        "การผสานระบบตั๋วงาน (Ticketing) ขั้นสูงช่วยให้แน่ใจว่าไม่มีคำถามของลูกค้าใดตกหล่น ด้วยการผสาน CRM เจ้าหน้าที่ของคุณสามารถเข้าถึงข้อมูลลูกค้าที่สมบูรณ์ได้ทันที ช่วยให้สามารถบริการแบบเฉพาะบุคคลได้ ระบบตอบรับเสียงอัตโนมัติ (IVR) ช่วยลดเวลารอและนำลูกค้าไปยังแผนกที่ถูกต้องโดยอัตโนมัติ ปรับปรุงทั้งประสิทธิภาพและความพึงพอใจของลูกค้า",
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
      subtitle: "ทีมผู้เชี่ยวชาญด้าน CRM ของเราพร้อมให้บริการในการรับฟังปัญหาในการรับฟังปัญหาในการรวาระบบ CRM ของคุณ",
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

export default function CallCenterPage() {
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
                    <div className="w-[700px] backdrop-blur-xl bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
                      <div className="grid grid-cols-3 gap-8">
                        {/* Group 1 */}
                        <div>
                          <h3 className="font-bold text-sm mb-4 pb-2 border-b-2 border-[#0083d8]" style={{ color: '#0083d8' }}>
                            {t.nav.serviceGroups.group1.title}
                          </h3>
                          <div className="space-y-1">
                            {t.nav.serviceGroups.group1.items.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className="block py-2 text-sm text-gray-600 hover:text-[#0083d8] hover:bg-blue-50 hover:pl-2 rounded transition-all duration-200"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                        {/* Group 2 */}
                        <div>
                          <h3 className="font-bold text-sm mb-4 pb-2 border-b-2 border-[#0083d8]" style={{ color: '#0083d8' }}>
                            {t.nav.serviceGroups.group2.title}
                          </h3>
                          <div className="space-y-1">
                            {t.nav.serviceGroups.group2.items.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className="block py-2 text-sm text-gray-600 hover:text-[#0083d8] hover:bg-blue-50 hover:pl-2 rounded transition-all duration-200"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                        {/* Group 3 */}
                        <div>
                          <h3 className="font-bold text-sm mb-4 pb-2 border-b-2 border-[#0083d8]" style={{ color: '#0083d8' }}>
                            {t.nav.serviceGroups.group3.title}
                          </h3>
                          <div className="space-y-1">
                            {t.nav.serviceGroups.group3.items.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className="block py-2 text-sm text-gray-600 hover:text-[#0083d8] hover:bg-blue-50 hover:pl-2 rounded transition-all duration-200"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
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
                  {serviceDropdownOpen && (
                    <div className="ml-4 mt-2 space-y-2">
                      <Link href="/service/crm" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-blue-600 transition-colors py-2">
                        {t.nav.serviceSubmenu.crm}
                      </Link>
                      <Link href="/service/call-center" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-blue-600 transition-colors py-2">
                        {t.nav.serviceSubmenu.callCenter}
                      </Link>
                      <Link href="/service/marketing" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-blue-600 transition-colors py-2">
                        {t.nav.serviceSubmenu.marketing}
                      </Link>
                      <Link href="/service/data-management" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-blue-600 transition-colors py-2">
                        {t.nav.serviceSubmenu.dataManagement}
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

      {/* Floating Call Button */}
      <FloatingCallButton onClick={() => setScheduleModalOpen(true)} text={t.nav.schedule} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/design-mode/callcenter(1).png"
            alt="Call Center Professional"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight text-balance">{t.hero.title}</h1>
              <p className="text-xl text-white/90 leading-relaxed">{t.hero.subtitle}</p>
              <Button onClick={() => setScheduleModalOpen(true)} size="lg" className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-8 shadow-lg">
                {lang === "en" ? "Contact Us" : "ติดต่อเรา"} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="relative">
              
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            
          </svg>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16 text-balance">
            {t.benefitsTitle}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">{t.benefits.benefit1.title}</h3>
              <p className="text-gray-700 leading-relaxed">{t.benefits.benefit1.desc}</p>
            </div>

            {/* Benefit 2 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">{t.benefits.benefit2.title}</h3>
              <p className="text-gray-700 leading-relaxed">{t.benefits.benefit2.desc}</p>
            </div>

            {/* Benefit 3 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">{t.benefits.benefit3.title}</h3>
              <p className="text-gray-700 leading-relaxed">{t.benefits.benefit3.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-6 text-white">
            <p className="text-lg leading-relaxed">{t.detailsSection.paragraph1}</p>
            <p className="text-lg leading-relaxed">{t.detailsSection.paragraph2}</p>
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
                  <Input
                    placeholder={t.booking.firstName}
                    className="bg-white border-0 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl shadow-sm"
                  />
                  <Input
                    placeholder={t.booking.email}
                    type="email"
                    className="bg-white border-0 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl shadow-sm"
                  />
                </div>
                <Input
                  placeholder={t.booking.organization}
                  className="bg-white border-0 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl shadow-sm"
                />
                <Textarea
                  placeholder={t.booking.message}
                  rows={5}
                  className="bg-white border-0 text-gray-900 placeholder:text-gray-500 resize-none rounded-xl shadow-sm"
                />
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

      {/* Consultation Dialog */}
      <Dialog open={scheduleModalOpen} onOpenChange={setScheduleModalOpen}>
        <DialogContent className="sm:max-w-5xl bg-white border-2 border-gray-200 text-gray-900 overflow-hidden p-0 max-h-[90vh]">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Image */}
            <div className="md:col-span-1 h-[400px] md:h-auto overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <img 
                src="/images/design-mode/BookConsultIMG_001.jpg"
                alt="Video Conference"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Right Side - Form */}
            <div className="md:col-span-1 p-12 overflow-y-auto max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  {t.scheduleModal.title}
                </DialogTitle>
                <DialogDescription className="text-xl text-gray-700 leading-relaxed">
                  {t.scheduleModal.subtitle}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-8">
                <div className="space-y-3">
                  <Label htmlFor="project" className="text-lg text-gray-900 font-semibold">
                    {t.scheduleModal.projectLabel}
                  </Label>
                  <Textarea
                    id="project"
                    placeholder={t.scheduleModal.projectPlaceholder}
                    className="bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-900 placeholder:text-gray-400 text-lg"
                    rows={4}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-lg text-gray-900 font-semibold">
                    {t.scheduleModal.nameLabel}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    className="bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-900 placeholder:text-gray-400 text-lg h-14"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-lg text-gray-900 font-semibold">
                    {t.scheduleModal.emailLabel}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-900 placeholder:text-gray-400 text-lg h-14"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-xl font-bold py-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  {t.scheduleModal.submit}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 bg-white">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2025 IGNITE IDEA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
