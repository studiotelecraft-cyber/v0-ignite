"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Globe, ArrowRight, Check, Phone, Mail, MapPin, ChevronDown, Menu, X } from 'lucide-react'
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
      title: "CRM Services",
      subtitle:
        "Better Customer Relationships Start Here CRM isn't just software—it's your secret weapon for business growth. We help you organize customer data, spot opportunities, and turn insights into action that drives real results.",
      cta: "Talk to Us",
    },
    benefits: {
      title: "How Can CRM Help Your Organization?",
      card1: {
        title: "Centralize Customer and Lead Contact Data",
        desc: "Never lose valuable customer information again when sales staff are unavailable or leave the company. With CRM, all contact data is stored centrally in the system. You can also set permissions to view, manage, and transfer customers and leads seamlessly.",
      },
      card2: {
        title: "Know Exactly Where Your Revenue Is Coming From",
        desc: "Not all leads become customers—so how do you forecast monthly, quarterly, or yearly revenue accurately? CRM tracks every opportunity in your pipeline, giving you real-time insights into which deals will close and when.",
      },
      card3: {
        title: "Work From Anywhere with Multi-Device Access",
        desc: "Never be tied to your desk again. Our CRM gives you full access to customer data on desktop, mobile, and tablet—so you can work efficiently from anywhere, anytime.",
      },
    },
    details: {
      intro:
        "We provide comprehensive CRM services that help you work smarter, keep customers happier, and hit your business goals. Our team partners with you to create a custom CRM strategy that fits your needs and delivers real results.",
      heading: "What You'll Achieve with Our CRM Services",
      body:
        "Streamline your operations, boost customer satisfaction, and grow your business. Whether you want to increase sales, strengthen customer loyalty, or improve efficiency—we've got you covered.",
      outro:
        "Want to see how CRM can transform your business? Get in touch today for a free consultation.",
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
      title: "Request a Consultation",
      subtitle:
        "Our expert CRM team is ready to listen to your needs and help you implement CRM solutions for your business.",
      firstName: "First Name - Last Name",
      email: "Email",
      organization: "Organization Name",
      message: "Message",
      captcha: "13 + 15 =",
      submit: "Book Consultation",
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
      title: "CRM Services",
      subtitle:
        "สร้างความสัมพันธ์ที่ดีกับลูกค้า เริ่มต้นที่นี่ CRM ไม่ใช่แค่ซอฟต์แวร์ธรรมดา—แต่เป็นกุญแจสำคัญที่จะพาธุรกิจคุณเติบโต เราช่วยจัดการข้อมูลลูกค้าให้เป็นระบบ ค้นหาโอกาสทางธุรกิจ และเปลี่ยนข้อมูลให้กลายเป็นผลลัพธ์ที่จับต้องได้",
      cta: "นัดคุยกับเรา",
    },
    benefits: {
      title: "CRM สามารถช่วยองค์กรของคุณด้านใดได้บ้าง",
      card1: {
        title: "เก็บข้อมูลการติดต่อลูกค้า และลีด",
        desc: "ปัญหาในการหาข้อมูลติดต่อลูกค้าหากเซลล์ไม่อยู่หรือลาออกจะหมดไปหากเก็บข้อมูลการติดต่อลูกค้าผ่านระบบ CRM นอกจากนั้นระบบยังสามารถกำหนดสิทธิ์ตรวจสอบ โอน ลูกค้าและลีดที่มีอยู่ได้",
      },
      card2: {
        title: "ระบุโอกาสการขาย",
        desc: "ไม่ใช่ลีดทุกรายจะกลายมาเป็นลูกค้า แล้วเราจะรู้ได้อย่างไรว่าประมาณการรายได้ของเดือน ของไตรมาส หรือของปีนี้เป็นอย่างไรบ้าง ปัญหาเหล่านี้จะหมดไปหากองค์กรคุณเข้ามาใช้งาน CRM",
      },
      card3: {
        title: "เข้าถึงได้ผ่านทุกอุปกรณ์",
        desc: "ด้วยระบบ CRM ที่เราให้บริการ คุณสามารถมั่นใจได้ว่าสามารถเข้าถึงข้อมูลได้ผ่านทั้งคอมพิวเตอร์ มือถือ และ แท็บเล็ต เพื่อให้การทำงานเป็นไปได้อย่างราบรื่น",
      },
    },
    details: {
      intro:
        "เรานำเสนอชุดบริการ CRM ที่ครอบคลุมซึ่งออกแบบมาเพื่อช่วยให้ธุรกิจปรับปรุงการดำเนินงาน ปรับปรุงความพึงพอใจของลูกค้า และบรรลุเป้าหมาย ทีมผู้เชี่ยวชาญของเราจะทำงานร่วมกับคุณเพื่อพัฒนากลยุทธ์ CRM แบบกำหนดเองที่สอดคล้องกับวัตถุประสงค์ทางธุรกิจของคุณและผลักดันผลลัพธ์",
      heading: "ด้วยบริการ CRM ของเรา คุณจะได้อะไร",
      body:
        "ด้วยบริการ CRM ของเรา คุณสามารถปรับปรุงการดำเนินธุรกิจของคุณ ปรับปรุงความพึงพอใจของลูกค้า และบรรลุเป้าหมายทางธุรกิจของคุณ ไม่ว่าคุณจะต้องการเพิ่มยอดขาย เพิ่มความภักดีของลูกค้า หรือปรับปรุงประสิทธิภาพการดำเนินงาน ทีมผู้เชี่ยวชาญของเราสามารถช่วยให้องค์กรคุณบรรลุวัตถุประสงค์ CRM ที่วางไว้ได้",
      outro:
        "หากคุณสนใจที่จะเรียนรู้เพิ่มเติมเกี่ยวกับบริการ CRM ของเราและวิธีที่บริการเหล่านั้นจะเป็นประโยชน์ต่อธุรกิจของคุณ โปรดติดต่อเราวันนี้เพื่อนัดหมายเวลารับคำปรึกษา",
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
      subtitle: "ทีมผู้เชี่ยวชาญด้าน CRM ของเราพร้อมให้บริการในการรับฟังปัญหาในการรับฟังปัญหาในการรวารบบ CRM ของคุณ",
      firstName: "ชื่อ - นามสกุล",
      email: "อีเมล์",
      organization: "ชื่อองกร์กร",
      message: "ข้อความ",
      captcha: "13 + 15 =",
      submit: "นัดที่ปรึกษา",
    },
  },
}

export default function CRMPage() {
  const [lang, setLang] = useState<"en" | "th">("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false)

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
      <FloatingCallButton onClick={scrollToContact} text={t.nav.schedule} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
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
                <Link
                  href="/service"
                  className="text-white/90 hover:text-white transition-colors flex items-center gap-1"
                >
                  {t.nav.service}
                  <ChevronDown className="w-4 h-4" />
                </Link>
                {serviceDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="w-80 backdrop-blur-xl bg-white/95 rounded-lg shadow-xl border border-gray-200 py-2">
                      <Link
                        href="/service/crm"
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        Sales Solution (CRM)
                      </Link>
                      <Link
                        href="/service/call-center"
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        Customer Service Solution (Call Center)
                      </Link>
                      <Link
                        href="/service/marketing"
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        Marketing Automation Solution
                      </Link>
                      <Link
                        href="/service/data-management"
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
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
                <Link
                  href="/#home"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2"
                >
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
                      <Link
                        href="/service/crm"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                      >
                        Sales Solution (CRM)
                      </Link>
                      <Link
                        href="/service/call-center"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                      >
                        Customer Service Solution
                      </Link>
                      <Link
                        href="/service/marketing"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                      >
                        Marketing Automation
                      </Link>
                      <Link
                        href="/service/data-management"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                      >
                        Data Management
                      </Link>
                    </div>
                  )}
                </div>
                <a
                  href="#resources"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2"
                >
                  {t.nav.resources}
                </a>
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2"
                >
                  {t.nav.about}
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/design-mode/Massive%20translucent%20sphere%20containing%20swirling%20galaxies%20of%20customer%20data%20points%2C%20each%20point%20representing%20an%20individual%20customer%20glowing%20like%20stars%2C%20display%20customer%20in%20card%2C%20business%20professional%20standing%20b%20%286%29.jpg"
            alt="CRM Data Visualization"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
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
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16 text-balance">
            {t.benefits.title}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Check className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{t.benefits.card1.title}</h3>
              <p className="text-gray-600 leading-relaxed">{t.benefits.card1.desc}</p>
            </div>

            {/* Card 2 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">
                <Check className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{t.benefits.card2.title}</h3>
              <p className="text-gray-600 leading-relaxed">{t.benefits.card2.desc}</p>
            </div>

            {/* Card 3 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                <Check className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{t.benefits.card3.title}</h3>
              <p className="text-gray-600 leading-relaxed">{t.benefits.card3.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8 text-white">
            <p className="text-lg leading-relaxed">{t.details.intro}</p>
            
            <p className="text-lg leading-relaxed">{t.details.body}</p>
            <p className="text-lg leading-relaxed">{t.details.outro}</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
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

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2025 IGNITE IDEA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
