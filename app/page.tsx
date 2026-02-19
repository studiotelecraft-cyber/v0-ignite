"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Users, Headphones, Zap, BarChart3, Phone, Mail, MapPin, ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import { FloatingCallButton } from "@/components/floating-call-button"
import { FloatingChatButton } from "@/components/floating-chat-button"

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
      title: "Better understand your customers",
      subtitle:
        "Optimize your CRM system with expert guidance for sharp decision-making and accelerate your business growth.",
      cta1: "Schedule Consultation",
      cta2: "Download Case Study",
    },
    features: {
      feature1: {
        title: "Build stronger customer relationships",
        desc: "Centralize your customer data and improve your sales efficiency. Works on computers, mobile, and tablets.",
      },
      feature2: {
        title: "Connect with customers 24/7",
        desc: "Deliver excellent customer service, increase customer satisfaction, and boost customer loyalty.",
      },
      feature3: {
        title: "Automate your sales and marketing",
        desc: "Enhance your marketing efficiency, build brand awareness, foster customer relationships, and increase sales.",
      },
      feature4: {
        title: "Unlock the power of your data",
        desc: "Make more precise business decisions using insights from analyzing existing data.",
      },
    },
    tech: {
      title: "Technology That Grows With You",
      sales: {
        title: "Sales Solution (CRM)",
        tagline: "Close More Deals, Faster.",
        desc: "Our Sales Solution (CRM) empowers your team with the tools to manage customer relationships, track every opportunity, and accelerate your sales pipeline.",
      },
      service: {
        title: "Customer Service Solution (Call Center)",
        tagline: "Deliver Exceptional Service.",
        desc: "Transform your customer support with our Call Center Solution. Manage all interactions from one place and resolve issues faster to create happier, more loyal customers.",
      },
      marketing: {
        title: "Marketing Automation Solution",
        tagline: "Marketing on Autopilot.",
        desc: "Grow your business 24/7. Our Marketing Automation platform nurtures leads, engages customers with personalized journeys, and drives revenue while you sleep.",
      },
      data: {
        title: "Data Management Solution",
        tagline: "Turn Data into Decisions.",
        desc: "Stop guessing. Our Data Management Solution cleans, organizes, and unlocks the power of your business data, giving you the clear insights you need to make smarter moves.",
      },
    },
    partners: {
      title: "Technology Partners",
      subtitle: "We work with industry-leading platforms",
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
      title: "เข้าใจลูกค้าของคุณได้ดีขึ้น",
      subtitle:
        "เพิ่มประสิทธิภาพการวางระบบ CRM ของคุณด้วยคำแนะนำจากผู้เชี่ยวชาญ เพื่อการตัดสินใจที่เฉียบคม และขับเคลื่อนธุรกิจให้เติบโตเร็วยิ่งขึ้น",
      cta1: "นัดที่ปรึกษา",
      cta2: "ดาวน์โหลดเคสสตัดดี้",
    },
    features: {
      feature1: {
        title: "สร้างความสัมพันธ์กับลูกค้าให้แน่นแฟ้นยิ่งขึ้น",
        desc: "รวม���ูนย์ข้อมูลลูกค้าของคุณและปรับปรุงประสิทธิภาพการขายของคุณ สามารถใช้งานได้ทั้งคอมพิวเตอร์ มือถือ และแท็บเล็ต",
      },
      feature2: {
        title: "เชื่อมต่อกับลูกค้า 24/7",
        desc: "มอบการบริการลูกค้าที่เป็นเลิศ เพิ่มความพึงพอใจของลูกค้า และเพิ่มความภักดีของลูกค้า",
      },
      feature3: {
        title: "ทำใ��้การขายและการตลาดของคุณเป็นอัตโนมัติ",
        desc: "ปรับปรุงความประสิทธิภาพในการทำการการตลาดของคุณ สร้างการรับรู้ของแบรนด์ สร้างความสัมพันธ์ที่ดีให้กับลูกค้า และเพิ่มยอดขาย",
      },
      feature4: {
        title: "ปลดล็อกพลังของข้อมูลของคุณ",
        desc: "ให้การตัดสินใจทางธุรกิจแม่นยำยิ่งขึ้น โดยใช้ข้อมูลเชิงลึกจากการวิเคราะห์ข้อมูลที่มีอยู่",
      },
    },
    tech: {
      title: "เทคโนโลยีที่เติบโตไปกับคุณ",
      sales: {
        title: "โซลูชันการขาย (CRM)",
        tagline: "ปิดการขายได้เร็วขึ้น",
        desc: "โซลูชันการขาย (CRM) ของเรา มอบเครื่องมือที่ช่วยให้ทีมของคุณบริหารความสัมพันธ์ลูกค้า ติดตามทุกโอกาส และเร่งกระบวนการขายให้ไวยิ่งขึ้น",
      },
      service: {
        title: "โซลูชันบริการลูกค้า (Call Center)",
        tagline: "มอบบริการที่เหนือความคาดหมาย",
        desc: "พลิกโฉมการบริการลูกค้าด้วยโซลูชัน Call Center ของเรา จัดการทุกการติดต่อได้ในที่เดียว และแก้ปัญหาได้รวดเร็วขึ้น เพื่อสร้างลูกค้าที่พึงพอใจและภักดีต่อแบรนด์",
      },
      marketing: {
        title: "โซลูชันการตลาดอัตโนมัติ",
        tagline: "ทำการตลาดแบบอัตโนมัติ",
        desc: "ขยายธุรกิจของคุณตลอด 24 ชั่วโมง แพลตฟอร์มการตลาดอัตโนมัติของเราจะช่วยฟูมฟักผู้มุ่งหวัง (leads) สร้างการมีส่วนร่วมด้วยแคมเปญที่ตรงจุด และสร้างยอดขายให้คุณแม้ในยามพักผ่อน",
      },
      data: {
        title: "โซลูชันการจัดการข้อมูล",
        tagline: "เปลี่ยนข้อมูลสู่การตัดสินใจ",
        desc: "หยุดการคาดเดา โซลูชันการจัดการข้อมูลของเราจะช่วยจัดระเบียบและปลดล็อกพลังข้อมูลธุรกิจของคุณ มอบข้อมูลเชิงลึกที่ชัดเจนเพื่อการตัดสินใจที่เฉียบคมยิ่งขึ้น",
      },
    },
    partners: {
      title: "พาร์ทเนอร์ด้านเทคโนโลยี",
      subtitle: "เราทำงาน���่วมกับแพลตฟอร์มชั้นนำของอุตสาหกรรม",
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
      subtitle: "ทีมผู้เชี่ยวชาญด้าน CRM ของเราพร้อมให้บริการในการรับฟังปัญหาในการรับฟังปัญหาในการราระบบ CRM ของคุณ",
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
    caseStudyModal: {
      title: "ดาวน์โหลดเคสสตัดดี้",
      nameLabel: "ชื่อ",
      emailLabel: "อีเมลบริษัท",
      download: "ดาวน์โหลดเลย",
    },
  },
}

export default function Home() {
  const [lang, setLang] = useState<"en" | "th">("en")
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
              <div className="text-xl font-bold text-white">IGNITE IDEA</div>
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
                <Link
                  href="/service/crm"
                  className="text-white/90 hover:text-white transition-colors flex items-center gap-1"
                >
                  {t.nav.service}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${serviceDropdownOpen ? 'rotate-180' : ''}`} />
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
          <img 
            src="/images/Hompage_HeroIMG_001.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
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
        {/* Features Section */}
        <section id="service" className="py-20 px-6 overflow-hidden">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {lang === "en" ? "What we do" : "สิ่งที่เราทำ"}
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
            </div>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Side - Mascot */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative">
                  <img
                    src="/images/design-mode/Untitled%20design%20%282%29.png"
                    alt="IGNITE Mascot"
                    className="w-[350px] md:w-[450px] lg:w-[500px] object-contain animate-float"
                  />
                </div>
              </div>

              {/* Right Side - Service Cards */}
              <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
                {/* Feature 1 - CRM */}
                <div className="group relative p-8 rounded-2xl bg-white border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t.features.feature1.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{t.features.feature1.desc}</p>
                </div>

                {/* Feature 2 - Call Center */}
                <div className="group relative p-8 rounded-2xl bg-white border-2 border-gray-200 hover:border-cyan-500 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t.features.feature2.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{t.features.feature2.desc}</p>
                </div>

                {/* Feature 3 - Marketing */}
                <div className="group relative p-8 rounded-2xl bg-white border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t.features.feature3.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{t.features.feature3.desc}</p>
                </div>

                {/* Feature 4 - Data Management */}
                <div className="group relative p-8 rounded-2xl bg-white border-2 border-gray-200 hover:border-cyan-500 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t.features.feature4.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{t.features.feature4.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Solutions Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-6 text-balance">
              {t.tech.title}
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-16 rounded-full" />

            <div className="space-y-8">
              {/* Sales Solution */}
              <Link href="/service/crm" className="block">
                <div className="group rounded-3xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src="/images/design-mode/SalesSolutionIMG_001.jpg"
                        alt="Sales Solution"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-10 flex flex-col justify-center">
                      <h3 className="text-3xl font-bold text-blue-600 mb-2">{t.tech.sales.title}</h3>
                      <p className="text-xl font-semibold text-gray-900 mb-4">{t.tech.sales.tagline}</p>
                      <p className="text-gray-700 leading-relaxed text-lg">{t.tech.sales.desc}</p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Customer Service Solution */}
              <Link href="/service/customer-services-centre" className="block">
                <div className="group rounded-3xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src="/images/design-mode/callcenter.png"
                        alt="Call Center Solution"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-10 flex flex-col justify-center">
                      <h3 className="text-3xl font-bold text-blue-600 mb-2">{t.tech.service.title}</h3>
                      <p className="text-xl font-semibold text-gray-900 mb-4">{t.tech.service.tagline}</p>
                      <p className="text-gray-700 leading-relaxed text-lg">{t.tech.service.desc}</p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Marketing Automation Solution */}
              <Link href="/service/marketing" className="block">
                <div className="group rounded-3xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src="/images/design-mode/MarketingIMG_001.jpg"
                        alt="Marketing Automation"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-10 flex flex-col justify-center">
                      <h3 className="text-3xl font-bold text-blue-600 mb-2">{t.tech.marketing.title}</h3>
                      <p className="text-xl font-semibold text-gray-900 mb-4">{t.tech.marketing.tagline}</p>
                      <p className="text-gray-700 leading-relaxed text-lg">{t.tech.marketing.desc}</p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Data Management Solution */}
              <Link href="/service/data-management" className="block">
                <div className="group rounded-3xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src="/images/datamanagement.jpg"
                        alt="Data Management"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-10 flex flex-col justify-center">
                      <h3 className="text-3xl font-bold text-blue-600 mb-2">{t.tech.data.title}</h3>
                      <p className="text-xl font-semibold text-gray-900 mb-4">{t.tech.data.tagline}</p>
                      <p className="text-gray-700 leading-relaxed text-lg">{t.tech.data.desc}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">{t.partners.title}</h2>
              <p className="text-xl text-gray-600">{t.partners.subtitle}</p>
            </div>
            <div className="flex justify-center items-center gap-24 flex-wrap">
              <img
                src="/images/design-mode/Group-1597881657.png.webp"
                alt="Salesforce"
                className="h-16 opacity-70 hover:opacity-100 transition-opacity"
              />
              <img
                src="/images/design-mode/Microsoft_logo_%282012%29.svg.png"
                alt="Microsoft"
                className="h-16 opacity-70 hover:opacity-100 transition-opacity"
              />
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
                      <p className="text-white/80 text-sm mt-3 font-medium">{t.contact.hours}</p>
                    </div>
                  </div>
                </div>

                {/* Services & Partners */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6">{t.contact.services}</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/service/crm"
                        className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-3 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:scale-125 transition-all" />
                        {t.contact.crm}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/customer-services-centre"
                        className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-3 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:scale-125 transition-all" />
                        {t.contact.callCenter}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/marketing"
                        className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-3 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:scale-125 transition-all" />
                        {t.contact.marketing}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/data-management"
                        className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-3 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:scale-125 transition-all" />
                        {t.contact.dataManagement}
                      </Link>
                    </li>
                  </ul>

                  <div className="mt-8 pt-8 border-t border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-6">{t.contact.partners}</h3>
                    <div className="flex items-center gap-8 flex-wrap">
                      <img
                        src="/images/design-mode/Group-1597881657.png.webp"
                        alt="Salesforce"
                        className="h-12 opacity-90 hover:opacity-100 transition-opacity"
                      />
                      <img
                        src="/images/design-mode/Microsoft_logo_%282012%29.svg.png"
                        alt="Microsoft"
                        className="h-12 opacity-90 hover:opacity-100 transition-opacity"
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
