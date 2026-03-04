"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Globe, ArrowRight, Check, Phone, Mail, MapPin, ChevronDown, Menu, X, TrendingUp, Target, Zap } from 'lucide-react'
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
      title: "CRM Services",
      subtitle:
        "สร้างความสัมพันธ์ที่ดีกับลูกค้า เริ่มต้นที่นี่ CRM ไม่ใช่แค่ซอฟต์แวร์ธรรมดา—แต่เป็นกุญแจสำคัญที่จะพาธุรกิจคุณเติบโต เราช่วยจัดการข้อมูลลูกค้าให้เป็นระบบ ค้นหาโอกาสทางธุรกิจ และเปลี่ยนข้อมูลให้กลายเป็นผลลัพธ์ที่จับต้องได้",
      cta: "นัดคุยกับเรา",
    },
    scheduleModal: {
      title: "รับสิทธิ์ปรึกษาฟรี 30 นาที",
      subtitle: "พูดคุยเกี่ยวกับความท้าทายของคุณและค้นพบโซลูชันที่เหมาะสม",
      projectLabel: "อธิบายความต้องการโปรเจค",
      projectPlaceholder: "อธิบายความต้องการโปรเจคที่นี่...",
      nameLabel: "ชื่อของคุณ",
      emailLabel: "อีเมลบริษัท",
      submit: "ส่ง",
    },
    stats: {
      title: "Sales Increases",
      stat1: "เพิ่มอัตราการขายได้สำเร็จ",
      stat2: "เพิ่มประสิทธิภาพให้แก่เซลล์",
      stat3: "เพิ่มความเร็วในการปิดการขาย",
      stat4: "เพิ่มความแม่นยำในการคาดการณ์รายได้",
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
    partner: {
      title: "Technology Partner",
      subtitle: "Powered by industry-leading CRM platform",
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
      subtitle: "ทีมผู้เชี่ยวชาญด้าน CRM ของเราพร้อมให้บริการในการรับฟังปัญหาในการรารบบ CRM ของคุณ",
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
  const { lang, setLang } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false)
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
              <div className="text-xl font-black text-white tracking-wide" style={{ fontFamily: 'var(--font-nunito)' }}>Ignite Idea</div>
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
                          href="/about"
                          className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link href="/resources" className="text-white/90 hover:text-white transition-colors">
                {/* Placeholder for Resources */}
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
                        href="/service/customer-services-centre"
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
                <Link
                  href="/resources"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2"
                >
                  {/* Placeholder for Resources */}
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

      <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="/images/design-mode/SalesSolutionIMG_001.jpg"
            alt="CRM Data Visualization"
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
                onClick={() => setScheduleModalOpen(true)}
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

      <section className="py-20 px-6 white bg-card leading-7">
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
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t.benefits.card1.title}</h3>
                <p className="text-gray-700 leading-relaxed">{t.benefits.card1.desc}</p>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-100 to-transparent rounded-tl-full opacity-50" />
            </div>

            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t.benefits.card2.title}</h3>
                <p className="text-gray-700 leading-relaxed">{t.benefits.card2.desc}</p>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyan-100 to-transparent rounded-tl-full opacity-50" />
            </div>

            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t.benefits.card3.title}</h3>
                <p className="text-gray-700 leading-relaxed">{t.benefits.card3.desc}</p>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-teal-100 to-transparent rounded-tl-full opacity-50" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-primary-foreground">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
            {t.stats.title}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="items-center justify-center group-hover:scale-180 transition-transform">
                  <img 
                    src="/images/design-mode/coins.png"
                    alt="Coins"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <div className="text-5xl font-bold text-blue-600 mb-2">35%</div>
                  <h4 className="text-gray-900 font-bold leading-relaxed">{t.stats.stat1}</h4>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="items-center justify-center group-hover:scale-180 transition-transform">
                  <img 
                    src="/images/design-mode/costumer.png"
                    alt="Customer"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <div className="text-5xl font-bold text-cyan-600 mb-2">32%</div>
                  <h4 className="text-gray-900 font-bold leading-relaxed">{t.stats.stat2}</h4>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="items-center justify-center group-hover:scale-180 transition-transform">
                  <img 
                    src="/images/design-mode/clock.png"
                    alt="Clock"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <div className="text-5xl font-bold text-purple-600 mb-2">34%</div>
                  <h4 className="text-gray-900 font-bold leading-relaxed">{t.stats.stat3}</h4>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="items-center justify-center group-hover:scale-180 transition-transform">
                  <img 
                    src="/images/design-mode/target.png"
                    alt="Target"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <div className="text-5xl font-bold text-orange-600 mb-2">45%</div>
                  <h4 className="text-gray-900 font-bold leading-relaxed">{t.stats.stat4}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.partner.title}
          </h2>
          <p className="text-xl text-gray-600 mb-12">{t.partner.subtitle}</p>
          
          <div className="flex justify-center items-center py-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <img 
                src="/images/design-mode/Group-1597881657.png.webp"
                alt="Salesforce" 
                className="relative h-42 md:h-50 object-contain drop-shadow-2xl transform group-hover:scale-144 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8 text-white">
            <p className="text-lg leading-relaxed">{t.details.intro}</p>
            
            <p className="text-lg leading-relaxed">{t.details.body}</p>
            <p className="text-lg leading-relaxed">{t.details.outro}</p>
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
                      <p className="text-gray-800 text-sm mt-2 font-bold">{t.contact.hours}</p>
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
                    <Link href="/service/customer-services-centre" className="text-blue-600 hover:text-blue-700 transition-colors font-medium flex items-center gap-2 group">
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
                  {t.booking.submit}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 bg-gray-50 border-t border-gray-200">
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
