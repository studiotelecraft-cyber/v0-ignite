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
            { name: "Lead to Cash (Order) Management", href: "/service/lead-to-cash-mgn" },
            { name: "Field Sales Execution", href: "/service/field-sales" },
            { name: "Customer 360 Data Consolidation", href: "/service/customer-360" },
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
      title: "Field Sales Execution",
      subtitle:
        "Empowers sales reps with real-time customer data on the go. Improves visit planning, route optimization, and follow-ups.",
      cta: "Contact Us",
    },
    benefitsTitle: "How Can Field Sales Execution Help Your Organization?",
    benefits: {
      benefit1: {
        title: "Empowers sales reps with real-time customer data on the go",
        desc: "Field sales teams access comprehensive customer information, purchase history, and interaction records directly from mobile devices. Real-time data synchronization ensures reps always have the latest account details, enabling informed conversations and better decision-making during customer visits.",
      },
      benefit2: {
        title: "Improves visit planning, route optimization, and follow-ups",
        desc: "Intelligent route planning minimizes travel time and maximizes the number of customer visits per day. Automated task lists and follow-up reminders keep reps organized, while managers can monitor territory progress and make real-time adjustments to territories and priorities.",
      },
      benefit3: {
        title: "Increases productivity and win rates in face-to-face selling",
        desc: "With mobile-first capabilities and data-driven insights, field sales teams close more deals faster. Analytics dashboards provide visibility into performance metrics, helping managers identify top performers, coaching opportunities, and best practices to replicate across the team.",
      },
    },
    summary: {
      title: "Summary",
      description: "Field Sales Execution (primarily through Consumer Goods Cloud Retail Execution) is designed for companies with field sales teams who need to manage in-store activities and customer relationships on-the-go. It revolutionizes how sales teams operate from headquarters to the field with a connected, intelligent platform grounded in real-time data. The solution includes mobile apps for field reps, detailed account information, recommended routes, automated task lists, and analytics for managers to track performance and optimize execution.",
    },
    bestFor: {
      title: "Best for",
      items: [
        "FMCG, Pharma, Manufacturing, and Distribution",
        "Companies with large field or territory-based sales teams",
      ],
    },
    detailsSection: {
      paragraph1:
        "Field Sales Execution transforms how sales teams operate in the field by providing a mobile-first platform that connects front-line reps with critical business information. The solution breaks down barriers between headquarters and field operations, enabling real-time collaboration and decision-making based on current market conditions.",
      paragraph2:
        "By combining Consumer Goods Cloud Retail Execution capabilities with intelligent route optimization and mobile analytics, Field Sales Execution enables companies to maximize territory coverage, increase customer engagement frequency, and drive higher win rates. Field teams become more efficient, productive, and accountable with clear visibility into performance metrics and automated workflows.",
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
      title: "Book a Consultation",
      subtitle: "Our Field Sales Execution experts are ready to listen to your challenges in optimizing field operations",
      firstName: "Full Name",
      email: "Email",
      organization: "Organization",
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
      service: "บริการของเรา",
      serviceGroups: {
        group1: {
          title: "ประสบการณ์ลูกค้าและการดำเนินการขาย",
          items: [
            { name: "การจัดการ Lead to Cash (Order)", href: "/service/lead-to-cash-mgn" },
            { name: "การดำเนินการขายภาคสนาม", href: "/service/field-sales" },
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
      title: "การดำเนินการขายภาคสนาม",
      subtitle: "ให้อำนาจแก่ตัวแทนขายด้วยข้อมูลลูกค้าแบบเรียลไทม์ในขณะเดินทาง ปรับปรุงการวางแผนการเยี่ยม การปรับเส้นทาง และการติดตาม",
      cta: "ติดต่อเรา",
    },
    benefitsTitle: "การดำเนินการขายภาคสนามสามารถช่วยองค์กรของคุณด้านใดได้บ้าง",
    benefits: {
      benefit1: {
        title: "ให้อำนาจแก่ตัวแทนขายด้วยข้อมูลลูกค้าแบบเรียลไทม์ในขณะเดินทาง",
        desc: "ทีมขายภาคสนามเข้าถึงข้อมูลลูกค้าที่ครอบคลุม ประวัติการซื้อ และบันทึกการโต้ตอบได้โดยตรงจากอุปกรณ์มือถือ การซิงค์ข้อมูลแบบเรียลไทม์ช่วยให้ตัวแทนมีรายละเอียดบัญชีล่าสุดเสมอ ซึ่งเป็นการเพิ่มความสามารถในการสนทนาและการตัดสินใจที่ดีขึ้นในระหว่างการเยี่ยมชมลูกค้า",
      },
      benefit2: {
        title: "ปรับปรุงการวางแผนการเยี่ยม การปรับเส้นทาง และการติดตาม",
        desc: "การวางแผนเส้นทางแบบอัจฉริยะลดเวลาในการเดินทางและเพิ่มจำนวนการเยี่ยมชมลูกค้าต่อวัน รายการงานอัตโนมัติและการเตือนการติดตามช่วยให้ตัวแทนเก็บระเบียบ ในขณะที่ผู้จัดการสามารถติดตามความคืบหน้าของอาณาเขตและทำการปรับปรุงเป็นเวลาจริง",
      },
      benefit3: {
        title: "เพิ่มประสิทธิผลและอัตราการชนะในการขายแบบหน้าตัวต่อตัว",
        desc: "ด้วยความสามารถที่มุ่งเน้นไปที่มือถือและข้อมูลเชิงลึกที่ขับเคลื่อนด้วยข้อมูล ทีมขายภาคสนามสามารถปิดดีลได้เร็วขึ้น แดชบอร์ดการวิเคราะห์ให้ความมองเห็นลงในเมตริกประสิทธิภาพ ช่วยให้ผู้จัดการระบุนักแสดงชั้นนำ โอกาสในการฝึกอบรม และแนวปฏิบัติที่ดีที่สุดเพื่อเลียนแบบทั่วทั้งทีม",
      },
    },
    summary: {
      title: "สรุป",
      description: "Field Sales Execution (ส่วนใหญ่ผ่าน Consumer Goods Cloud Retail Execution) ออกแบบมาสำหรับบริษัทที่มีทีมขายภาคสนามและต้องการจัดการกิจกรรมในร้านค้าและความสัมพันธ์ลูกค้าขณะเดินทาง ซึ่งเปลี่ยนวิธีการทำงานของทีมขายจากสำนักงานใหญ่ไปยังภาคสนามโดยมีแพลตฟอร์มที่เชื่อมต่อและอัจฉริยะบนพื้นฐานของข้อมูลแบบเรียลไทม์ สารละลายรวมแอปมือถือสำหรับตัวแทนภาคสนาม ข้อมูลบัญชีโดยละเอียด เส้นทางที่แนะนำ รายการงานอัตโนมัติ และการวิเคราะห์สำหรับผู้จัดการเพื่อติดตามประสิทธิภาพและปรับเปลี่ยนการดำเนินการ",
    },
    bestFor: {
      title: "เหมาะสำหรับ",
      items: [
        "FMCG บรรจุภัณฑ์ การผลิต และการจัดจำหน่าย",
        "บริษัทที่มีทีมขายภาคสนามหรือทีมตามพื้นที่จำนวนมาก",
      ],
    },
    detailsSection: {
      paragraph1:
        "Field Sales Execution เปลี่ยนวิธีการทำงานของทีมขายในภาคสนามโดยการให้แพลตฟอร์มที่มุ่งเน้นไปที่มือถือซึ่งเชื่อมต่อตัวแทนส่วนหน้าระหว่างข้อมูลธุรกิจที่สำคัญ สารละลายทำลายกำแพงระหว่างสำนักงานใหญ่และการดำเนินงานภาคสนาม ช่วยให้สามารถทำงานร่วมกันแบบเรียลไทม์และการตัดสินใจโดยยึดตามเงื่อนไขตลาดปัจจุบัน",
      paragraph2:
        "ด้วยการรวม Consumer Goods Cloud Retail Execution ความสามารถในการปรับเส้นทางให้เหมาะสม และการวิเคราะห์มือถือ Field Sales Execution ช่วยให้บริษัทเพิ่มความครอบคลุมของอาณาเขต เพิ่มความถี่ของการมีส่วนร่วมกับลูกค้า และขับเคลื่อนอัตราการชนะที่สูงขึ้น ทีมภาคสนามกลายเป็นที่มีประสิทธิภาพ ผลิตภาพ และสามารถมองเห็นได้ชัดเจนเกี่ยวกับเมตริกประสิทธิภาพและขั้นตอนการทำงานอัตโนมัติ",
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
      subtitle: "ทีมผู้เชี่ยวชาญด้านการดำเนินการขายภาคสนามของเราพร้อมให้บริการในการรับฟังปัญหาในการปรับปรุงการดำเนินการภาคสนามของคุณ",
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

export default function FieldSalesPage() {
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

      {/* Floating Call Button */}
      <FloatingCallButton onClick={() => setScheduleModalOpen(true)} text={t.nav.schedule} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
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
            {/* SVG path here */}
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

      {/* Summary Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance">{t.summary.title}</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{t.summary.description}</p>
          </div>
        </div>
      </section>

      {/* Best For Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-balance">{t.bestFor.title}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {t.bestFor.items.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-100 hover:border-blue-300">
                <p className="text-lg font-semibold text-gray-900">{item}</p>
              </div>
            ))}
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
                    <Link href="/service/crm" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                      {t.contact.crm}
                    </Link>
                  </li>
                  <li>
                    <Link href="/service/call-center" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
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
              <p className="text-gray-600 mb-8">{lang === "en" ? "Get expert advice on Field Sales Execution implementation" : "รับคำแนะนำจากผู้เชี่ยวชาญเกี่ยวกับการใช้งาน Field Sales Execution"}</p>
              
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
