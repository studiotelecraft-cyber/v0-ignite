"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Users, Target, Award, Heart, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { FloatingChatButton } from "@/components/floating-chat-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const translations = {
  en: {
    nav: {
      home: "Home",
      service: "Service",
      serviceSubmenu: {
        crm: "Sales Solution (CRM)",
        callCenter: "Customer Service Solution (Call Center)",
        marketing: "Marketing Automation Solution",
        dataManagement: "Data Management Solution",
      },
      resources: "Resources",
      about: "About",
      schedule: "Schedule a call",
    },
    hero: {
      title: "About IGNITE IDEA",
      subtitle: "Empowering Businesses Through Technology and Innovation",
    },
    mission: {
      title: "Our Mission",
      description: "We empower businesses to unlock their full potential by delivering tailored CRM and automation solutions that drive growth, enhance customer relationships, and streamline operations.",
    },
    vision: {
      title: "Our Vision",
      description: "To be the leading provider of customer-centric technology solutions that transform how businesses connect with their customers and achieve sustainable success.",
    },
    values: {
      title: "Our Core Values",
      value1: {
        title: "Innovation",
        desc: "We continuously seek new and better ways to solve complex business challenges through cutting-edge technology.",
      },
      value2: {
        title: "Customer Success",
        desc: "Your success is our success. We are committed to delivering solutions that drive measurable results for your business.",
      },
      value3: {
        title: "Excellence",
        desc: "We maintain the highest standards in everything we do, from solution design to implementation and support.",
      },
      value4: {
        title: "Partnership",
        desc: "We build long-term relationships based on trust, transparency, and mutual growth with our clients.",
      },
    },
    team: {
      title: "Why Choose Us",
      reason1: "Expert team with deep industry knowledge",
      reason2: "Proven track record of successful implementations",
      reason3: "Tailored solutions that fit your unique needs",
      reason4: "Ongoing support and partnership",
      reason5: "Integration with leading platforms",
      reason6: "Data-driven approach to business growth",
    },
    cta: {
      title: "Ready to Transform Your Business?",
      subtitle: "Let's discuss how we can help you achieve your goals",
      button: "Contact Us",
    },
    contactUs: {
      title: "Contact Us",
      subtitle: "Get in touch with us for a consultation",
      phone: "+662-231-8088",
      email: "contact@ignite-idea.com",
      address: "Suite 0871, Level 8, 1-7 Zuellig House, Silom Road, Silom, Bangrak, Bangkok, 10500, Thailand",
      servicesTitle: "Our consult & services",
      partnersTitle: "Our product partner",
      bookingFormTitle: "Schedule a call",
      bookingFormSubtitle: "Our CRM experts are ready to listen to your CRM system challenges",
    },
  },
  th: {
    nav: {
      home: "หน้าแรก",
      service: "บริการ",
      serviceSubmenu: {
        crm: "โซลูชันการขาย (CRM)",
        callCenter: "โซลูชันบริการลูกค้า (Call Center)",
        marketing: "โซลูชันการตลาดอัตโนมัติ",
        dataManagement: "โซลูชันการจัดการข้อมูล",
      },
      resources: "ทรัพยากร",
      about: "เกี่ยวกับเรา",
      schedule: "นัดที่ปรึกษา",
    },
    hero: {
      title: "เกี่ยวกับ IGNITE IDEA",
      subtitle: "เสริมพลังธุรกิจด้วยเทคโนโลยีและนวัตกรรม",
    },
    mission: {
      title: "พันธกิจของเรา",
      description: "เราเสริมพลังให้ธุรกิจปลดล็อกศักยภาพสูงสุด ด้วยการส่งมอบโซลูชัน CRM และระบบอัตโนมัติที่ออกแบบเฉพาะ เพื่อขับเคลื่อนการเติบโต สร้างความสัมพันธ์กับลูกค้า และปรับปรุงการดำเนินงาน",
    },
    vision: {
      title: "วิสัยทัศน์ของเรา",
      description: "เป็นผู้ให้บริการชั้นนำด้านโซลูชันเทคโนโลยีที่เน้นลูกค้าเป็นศูนย์กลาง เพื่อเปลี่ยนแปลงวิธีที่ธุรกิจเชื่อมต่อกับลูกค้าและบรรลุความสำเร็จอย่างยั่งยืน",
    },
    values: {
      title: "คุณค่าหลักของเรา",
      value1: {
        title: "นวัตกรรม",
        desc: "เราแสวงหาวิธีใหม่ๆ ที่ดีกว่าอยู่เสมอในการแก้ปัญหาทางธุรกิจที่ซับซ้อนด้วยเทคโนโลยีล้ำสมัย",
      },
      value2: {
        title: "ความสำเร็จของลูกค้า",
        desc: "ความสำเร็จของคุณคือความสำเร็จของเรา เรามุ่งมั่นส่งมอบโซลูชันที่สร้างผลลัพธ์ที่วัดได้สำหรับธุรกิจของคุณ",
      },
      value3: {
        title: "ความเป็นเลิศ",
        desc: "เรารักษามาตรฐานสูงสุดในทุกสิ่งที่เราทำ ตั้งแต่การออกแบบโซลูชันไปจนถึงการนำไปใช้และการสนับสนุน",
      },
      value4: {
        title: "ความเป็นพันธมิตร",
        desc: "เราสร้างความสัมพันธ์ระยะยาวบนพื้นฐานของความไว้วางใจ ความโปร่งใส และการเติบโตร่วมกันกับลูกค้า",
      },
    },
    team: {
      title: "ทำไมต้องเลือกเรา",
      reason1: "ทีมผู้เชี่ยวชาญที่มีความรู้อุตสาหกรรมลึกซึ้ง",
      reason2: "ประวัติความสำเร็จที่พิสูจน์แล้ว",
      reason3: "โซลูชันที่ปรับแต่งตามความต้องการเฉพาะของคุณ",
      reason4: "การสนับสนุนและความเป็นพันธมิตรที่ต่อเนื่อง",
      reason5: "บูรณาการกับแพลตฟอร์มชั้นนำ",
      reason6: "แนวทางที่ขับเคลื่อนด้วยข้อมูลเพื่อการเติบโตทางธุรกิจ",
    },
    cta: {
      title: "พร้อมที่จะเปลี่ยนแปลงธุรกิจของคุณ?",
      subtitle: "มาพูดคุยกันว่าเราจะช่วยคุณบรรลุเป้าหมายได้อย่างไร",
      button: "ติดต่อเรา",
    },
    contactUs: {
      title: "ติดต่อเรา",
      subtitle: "ติดต่อเราเพื่อขอคำปรึกษา",
      phone: "+662-231-8088",
      email: "contact@ignite-idea.com",
      address: "Suite 0871, Level 8, 1-7 Zuellig House, Silom Road, Silom, Bangrak, Bangkok, 10500, Thailand",
      servicesTitle: "บริการของเรา",
      partnersTitle: "คู่ค้าผลิตภัณฑ์ของเรา",
      bookingFormTitle: "นัดที่ปรึกษา",
      bookingFormSubtitle: "ทีมผู้เชี่ยวชาญด้าน CRM ของเราพร้อมให้บริการในการรับฟังปัญหาในการระบบ CRM ของคุณ",
    },
  },
}

export default function AboutPage() {
  const [lang, setLang] = useState<"en" | "th">("en")
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <img src="/images/ignite-logo.png" alt="IGNITE IDEA" className="h-12 w-12" />
              <div className="text-xl font-bold text-gray-900">IGNITE IDEA</div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t.nav.home}
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setServiceDropdownOpen(true)}
                onMouseLeave={() => setServiceDropdownOpen(false)}
              >
                <button className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                  {t.nav.service}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {serviceDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                      <Link
                        href="/service/crm"
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {t.nav.serviceSubmenu.crm}
                      </Link>
                      <Link
                        href="/service/call-center"
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {t.nav.serviceSubmenu.callCenter}
                      </Link>
                      <Link
                        href="/service/marketing"
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {t.nav.serviceSubmenu.marketing}
                      </Link>
                      <Link
                        href="/service/data-management"
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {t.nav.serviceSubmenu.dataManagement}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Link href="/resources" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t.nav.resources}
              </Link>
              <Link href="/about" className="text-blue-600 font-semibold">
                {t.nav.about}
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setLang("th")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    lang === "th" ? "bg-white text-blue-600 shadow-md" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  TH
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    lang === "en" ? "bg-white text-blue-600 shadow-md" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  EN
                </button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 bg-white">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2">
                  {t.nav.home}
                </Link>
                <Link href="/resources" className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2">
                  {t.nav.resources}
                </Link>
                <Link href="/about" className="text-blue-600 font-semibold px-4 py-2">
                  {t.nav.about}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Floating Chat Button */}
      <FloatingChatButton onClick={() => window.location.href = '/#contact-us'} />

      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 px-6 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/backgroud-GSKMeJj5qu8IPDsAN8der8S4Nnq985.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-blue-950/60 to-purple-950/70" />
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">{t.hero.title}</h1>
          <p className="text-2xl text-blue-100/90">{t.hero.subtitle}</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.mission.title}</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{t.mission.description}</p>
            </div>

            <div className="p-10 rounded-3xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100">
              <div className="w-16 h-16 rounded-2xl bg-cyan-600 flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.vision.title}</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{t.vision.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">{t.values.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(t.values)
              .filter(([key]) => key.startsWith("value"))
              .map(([_, value], index) => (
                <div key={index} className="p-8 rounded-2xl bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold text-blue-600 mb-3">{value.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{value.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">{t.team.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(t.team)
              .filter(([key]) => key.startsWith("reason"))
              .map(([_, reason], index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                  <p className="text-gray-800 font-medium leading-relaxed">{reason}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="relative py-24 px-6 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-500" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTIgMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">{t.contactUs.title}</h2>
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
                      href={`tel:${t.contactUs.phone}`}
                      className="text-white/90 hover:text-white transition-colors font-medium text-lg"
                    >
                      {t.contactUs.phone}
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
                      href={`mailto:${t.contactUs.email}`}
                      className="text-white/90 hover:text-white transition-colors font-medium"
                    >
                      {t.contactUs.email}
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
                    <p className="text-white/90 leading-relaxed">{t.contactUs.address}</p>
                    <p className="text-white/80 text-sm mt-3 font-medium">Monday-Friday: 9am – 6pm</p>
                  </div>
                </div>
              </div>

              {/* Services & Partners */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">{t.contactUs.servicesTitle}</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/service/crm" className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-3 group">
                      <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:scale-125 transition-all" />
                      {t.nav.serviceSubmenu.crm}
                    </Link>
                  </li>
                  <li>
                    <Link href="/service/call-center" className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-3 group">
                      <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:scale-125 transition-all" />
                      {t.nav.serviceSubmenu.callCenter}
                    </Link>
                  </li>
                  <li>
                    <Link href="/service/marketing" className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-3 group">
                      <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:scale-125 transition-all" />
                      {t.nav.serviceSubmenu.marketing}
                    </Link>
                  </li>
                  <li>
                    <Link href="/service/data-management" className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-3 group">
                      <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:scale-125 transition-all" />
                      {t.nav.serviceSubmenu.dataManagement}
                    </Link>
                  </li>
                </ul>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">{t.contactUs.partnersTitle}</h3>
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
                    {t.contactUs.bookingFormTitle}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">{t.contactUs.bookingFormSubtitle}</p>
                </div>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-900 font-semibold text-base">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Name"
                        className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-gray-50 focus:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-900 font-semibold text-base">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-gray-50 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization" className="text-gray-900 font-semibold text-base">
                      Organization
                    </Label>
                    <Input
                      id="organization"
                      placeholder="Organization"
                      className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-gray-50 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-900 font-semibold text-base">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Message"
                      rows={5}
                      className="border-2 border-gray-200 focus:border-blue-400 rounded-xl resize-none bg-gray-50 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                    <Label className="text-gray-900 font-bold text-lg">13 + 15 =</Label>
                    <Input className="max-w-[120px] h-12 border-2 border-gray-300 focus:border-blue-400 rounded-xl" />
                  </div>
                  <Button className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    {t.nav.schedule}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-cyan-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.cta.title}</h2>
          <p className="text-xl text-blue-100 mb-8">{t.cta.subtitle}</p>
          <Link href="/#contact-us">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              {t.cta.button}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2025 IGNITE IDEA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
