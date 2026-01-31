"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Users, Target, Award, Heart, Phone, Mail, MapPin, Shield, Lock, Eye, Lightbulb, TrendingUp, Zap, CheckCircle, UserCheck, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { FloatingChatButton } from "@/components/floating-chat-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
            { name: "Lead to Cash (Order) Management", href: "/service/lead-to-cash-mgn" },
            { name: "Field Sales Execution", href: "/service/field-sales" },
            { name: "Customer 360 Data Consolidation", href: "/service/data-management" },
            { name: "Next Gen. Customer Service Centre", href: "/service/call-center" },
            { name: "Contractual Sales for Manufacturing", href: "/service/contractual-sales" },
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
      title: "IGNITE IDEA",
      subtitle: "We are CRM experts who enhance the performance of your Sales, Customer Service, and Marketing teams through secure, user-friendly systems with measurable results that boost sales and customer satisfaction.",
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
      title: "IGNITE IDEA",
      subtitle: "เราคือผู้เชี่ยวชาญด้านระบบ CRM ที่ช่วยเพิ่มประสิทธิภาพการทำงานของทีมขาย บริการลูกค้า และการตลาดของคุณ ด้วยระบบที่ปลอดภัย ใช้งานง่าย และสามารถวัดผลได้ชัดเจน เพื่อเพิ่มยอดขายและความพึงพอใจของลูกค้า",
    },
    mission: {
      title: "พันธกิจของเรา",
      description: "เราเสริมพลังให้ธุรกิจปลดล็อกศักยภาพสูงสุด ด้วยการส่งมอบโซลูชัน CRM และระบบอัตโนมัติที่ออกแบบเฉพาะ เพื่อขับเคลื่อนการเติบโตร การสร้างความสัมพันธ์กับลูกค้า และปรับปรุงการดำเนินงาน",
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

  return (
    <div className="min-h-screen bg-white">
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
                    <div className="w-[820px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
                      <div className="grid grid-cols-3 gap-10">
                        {/* Group 1 - Customer Experience & Sales Execution */}
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                              <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <circle cx="12" cy="12" r="6" />
                                <circle cx="12" cy="12" r="2" />
                              </svg>
                            </div>
                            <h3 className="font-bold text-sm text-orange-500 leading-tight">
                              {t.nav.serviceGroups.group1.title}
                            </h3>
                          </div>
                          <div className="border-b-2 border-orange-400 mb-4"></div>
                          <div className="space-y-3">
                            {t.nav.serviceGroups.group1.items.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className="block text-sm text-gray-700 hover:text-orange-500 transition-colors duration-200"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                        {/* Group 2 - Strategic Planning & Intelligence */}
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                              <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="10" width="4" height="10" rx="1" fill="currentColor" opacity="0.3" />
                                <rect x="10" y="6" width="4" height="14" rx="1" fill="currentColor" opacity="0.5" />
                                <rect x="17" y="2" width="4" height="18" rx="1" fill="currentColor" opacity="0.7" />
                              </svg>
                            </div>
                            <h3 className="font-bold text-sm text-blue-500 leading-tight">
                              {t.nav.serviceGroups.group2.title}
                            </h3>
                          </div>
                          <div className="border-b-2 border-blue-400 mb-4"></div>
                          <div className="space-y-3">
                            {t.nav.serviceGroups.group2.items.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className="block text-sm text-gray-700 hover:text-blue-500 transition-colors duration-200"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                        {/* Group 3 - Supply Chain & Operations */}
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                              <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                              </svg>
                            </div>
                            <h3 className="font-bold text-sm text-green-500 leading-tight">
                              {t.nav.serviceGroups.group3.title}
                            </h3>
                          </div>
                          <div className="border-b-2 border-green-400 mb-4"></div>
                          <div className="space-y-3">
                            {t.nav.serviceGroups.group3.items.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className="block text-sm text-gray-700 hover:text-green-500 transition-colors duration-200"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Bottom CTA Section */}
                      <div className="border-t border-dashed border-gray-300 mt-8 pt-6 flex items-center justify-center gap-4">
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

      <FloatingChatButton onClick={() => setScheduleModalOpen(true)} />

      <section 
        className="h-screen relative overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: `url('/images/backgroud.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-blue-950/70 to-purple-950/80" />
        <div className="container mx-auto max-w-6xl text-center relative z-10 px-6">
         <h3 className="text-6xl md:text-8xl font-bold text-white mb-8 drop-shadow-2xl animate-fade-in">ABOUT</h3>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 drop-shadow-2xl animate-fade-in">{t.hero.title}</h1>
          <p className="text-xl md:text-2xl text-blue-100/90 drop-shadow-lg leading-relaxed max-w-5xl mx-auto">{t.hero.subtitle}</p>
          
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      </section>

      <section className="py-32 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-300/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              {t.values.title}
            </h2>
            <div className="h-2 w-40 bg-white/80 mx-auto rounded-full" />
          </div>
          
          <div className="relative max-w-6xl mx-auto h-[900px] md:h-[700px]">
            {Object.entries(t.values)
              .filter(([key]) => key.startsWith("value"))
              .map(([key, value], index) => {
                const icons = [
                  <Lightbulb className="w-8 h-8" />,
                  <TrendingUp className="w-8 h-8" />,
                  <Award className="w-8 h-8" />,
                  <Heart className="w-8 h-8" />
                ]
                const gradients = [
                  "from-blue-500 to-cyan-500",
                  "from-purple-500 to-pink-500",
                  "from-orange-500 to-yellow-500",
                  "from-green-500 to-teal-500"
                ]
                
                const angle = (index * 90 - 45) * (Math.PI / 180)
                const radius = 320
                const top = 50 + Math.sin(angle) * radius / 9
                const left = 50 + Math.cos(angle) * radius / 9
                
                return (
                  <div 
                    key={key}
                    className="absolute w-144 group"
                    style={{
                      top: `${top}%`,
                      left: `${left}%`,
                      transform: 'translate(-50%, -50%)',
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="relative p-8 rounded-3xl bg-white/90 backdrop-blur-xl border-2 border-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:rotate-1 px-8 mx-36 ml-[111px]">
                      <div className={`absolute inset-0 bg-gradient-to-br mx-36 ${gradients[index]} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
                      <div className="text-center">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center text-white shadow-lg mx-auto mb-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                          {icons[index]}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-cyan-600 transition-all">
                          {value.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{value.desc}</p>
                      </div>
                      
                      <div 
                        className="absolute w-0.5 bg-gradient-to-b from-transparent via-blue-300/50 to-transparent opacity-20 group-hover:opacity-40 transition-opacity"
                        style={{
                          height: '80px',
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${-angle * 180 / Math.PI + 90}deg) translateX(-50%)`,
                          transformOrigin: 'top center'
                        }}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      

      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTIgMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMgMTItMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {lang === "en" ? "Your Privacy Matters" : "ความเป็นส่วนตัวของคุณสำคัญ"}
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              {lang === "en" 
                ? "We are committed to protecting your personal data and maintaining transparency in how we handle your information." 
                : "เรามุ่งมั่นในการปกป้องข้อมูลส่วนบุคคลของคุณและรักษาความโปร่งใสในการจัดการข้อมูลของคุณ"}
            </p>
            <Link href="/privacy-policy">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-6 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
              >
                {lang === "en" ? "Read Privacy Policy" : "อ่านนโยบายความเป็นส่วนตัว"} →
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <Lock className="w-10 h-10 text-white mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">
                {lang === "en" ? "Data Security" : "ความปลอดภัยของข้อมูล"}
              </h3>
              <p className="text-white/80 text-sm">
                {lang === "en" 
                  ? "Your data is protected with industry-leading security standards" 
                  : "ข้อมูลของคุณได้รับการปกป้องด้วยมาตรฐานความปลอดภัยชั้นนำ"}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <Eye className="w-10 h-10 text-white mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">
                {lang === "en" ? "Full Transparency" : "ความโปร่งใสเต็มรูปแบบ"}
              </h3>
              <p className="text-white/80 text-sm">
                {lang === "en" 
                  ? "Clear information about how we collect and use your data" 
                  : "ข้อมูลที่ชัดเจนเกี่ยวกับวิธีที่เราเก็บรวบรวมและใช้ข้อมูลของคุณ"}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <Users className="w-10 h-10 text-white mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">
                {lang === "en" ? "Your Rights" : "สิทธิของคุณ"}
              </h3>
              <p className="text-white/80 text-sm">
                {lang === "en" 
                  ? "Full control over your personal information and how it's used" 
                  : "ควบคุมข้อมูลส่วนบุคคลของคุณอย่างเต็มที่"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section 
        className="py-24 px-6 relative overflow-hidden"
        style={{
          backgroundImage: `url('/images/Hompage_HeroIMG_001.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-purple-950/50 to-black/50" />
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <h2 
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            style={{
              textShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.4), 0 0 80px rgba(59, 130, 246, 0.2)'
            }}
          >
            {lang === "en" ? "Let's Ignite Your Ideas" : "มาจุดประกายไอเดียของคุณ"}
          </h2>
          <p 
            className="text-2xl md:text-3xl text-blue-100 leading-relaxed max-w-3xl mx-auto"
            style={{
              textShadow: '0 0 15px rgba(147, 197, 253, 0.7), 0 0 30px rgba(147, 197, 253, 0.5), 0 0 45px rgba(147, 197, 253, 0.3)'
            }}
          >
            {lang === "en" 
              ? "Your business has unlimited potential. Let's unlock it together." 
              : "ธุรกิจของคุณมีศักยภาพไร้ขีดจำกัด มาปลดล็อกมันไปด้วยกัน"}
          </p>
        </div>
      </section>

      <section id="contact-us" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-500" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTIgMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMgMTItMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">{t.contactUs.title}</h2>
            <div className="h-1.5 w-32 bg-white/80 mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
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

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">{t.contactUs.servicesTitle}</h3>
                <ul className="space-y-3">
                  <li key="service1">
                    <Link href="/service/crm" className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-3 group">
                      <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:scale-125 transition-all" />
                      {t.nav.serviceGroups.group1.items[0].name}
                    </Link>
                  </li>
                  <li key="service2">
                    <Link href="/service/call-center" className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-3 group">
                      <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:scale-125 transition-all" />
                      {t.nav.serviceGroups.group1.items[3].name}
                    </Link>
                  </li>
                  <li key="service3">
                    <Link href="/service/marketing" className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-3 group">
                      <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:scale-125 transition-all" />
                      {t.nav.serviceGroups.group1.items[2].name}
                    </Link>
                  </li>
                  <li key="service4">
                    <Link href="/service/data-management" className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-3 group">
                      <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:scale-125 transition-all" />
                      {t.nav.serviceGroups.group1.items[1].name}
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

      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2025 IGNITE IDEA. All rights reserved.</p>
        </div>
      </footer>

      <Dialog open={scheduleModalOpen} onOpenChange={setScheduleModalOpen}>
        <DialogContent className="sm:max-w-5xl backdrop-blur-xl bg-white border-2 border-blue-200 text-gray-900 overflow-hidden p-0 max-h-[90vh]">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="md:col-span-1 h-[400px] md:h-auto overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <img 
                src="/images/design-mode/BookConsultIMG_001.jpg"
                alt="Consultation"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="md:col-span-1 p-8 overflow-y-auto max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {lang === "en" ? "Book a Free 30-Minute Strategy Call" : "รับสิทธิ์ปรึกษาฟรี 30 นาที"}
                </DialogTitle>
                <DialogDescription className="text-xl text-gray-700 leading-relaxed">
                  {lang === "en" 
                    ? "Discuss your challenges and discover practical solutions that work" 
                    : "ปรึกษาปัญหาและค้นหาแนวทางแก้ไขที่ใช้ได้จริง"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="project" className="text-gray-900 font-semibold text-lg">
                    {lang === "en" ? "Describe your project need" : "อธิบายความต้องการโครงการของคุณ"}
                  </Label>
                  <Textarea
                    id="project"
                    placeholder={lang === "en" ? "Describe your project need here..." : "อธิบายความต้องการโครงการของคุณที่นี่..."}
                    className="bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-900 placeholder:text-gray-400 text-lg"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-900 font-semibold text-lg">
                    {lang === "en" ? "Your name" : "ชื่อของคุณ"}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    className="bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-900 placeholder:text-gray-400 h-14 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 font-semibold text-lg">
                    {lang === "en" ? "Company Email" : "อีเมลบริษัท"}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-900 placeholder:text-gray-400 h-14 text-lg"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-xl py-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  {lang === "en" ? "Submit" : "ส่ง"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

<style jsx>{`
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }
`}</style>
