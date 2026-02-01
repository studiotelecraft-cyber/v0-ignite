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
            { name: "Next Gen. Customer Service Centre", href: "/service/customer-services-centre" },
            { name: "Contractual Sales for Manufacturing", href: "/service/contractual-sales" },
          ],
        },
        group2: {
          title: "Strategic Planning & Intelligence",
          items: [
            { name: "Integrated Business Planning (IBP)", href: "/service/integrated-business-planning" },
            { name: "Sales & Operations Planning (S&OP)", href: "/service/sales-operations-planning" },
            { name: "Financial Planning & Analysis (FP&A)", href: "/service/financial-planning-analysis" },
          ],
        },
        group3: {
          title: "Supply Chain & Operations",
          items: [
            { name: "Demand & Supply Planning", href: "/service/demand-supply-planning" },
            { name: "Production Planning", href: "/service/production-planning" },
          ],
        },
      },
      resources: "Resources",
      about: "About",
      schedule: "Schedule a call",
    },
    hero: {
      title: "Customer 360 Data Consolidation",
      subtitle: "Creates a single source of truth for customer data. Breaks data silos across Sales, Service, Marketing, and Commerce.",
      cta: "Contact Us",
    },
    benefitsTitle: "How Can Customer 360 Help Your Organization?",
    benefits: {
      benefit1: {
        title: "Creates a single source of truth for customer data",
        desc: "Consolidate customer information from all touchpoints into a unified, trusted customer profile. Eliminate duplicate records and data inconsistencies that plague multi-system environments. Enable every team member to access the same accurate, real-time customer information.",
      },
      benefit2: {
        title: "Breaks data silos across Sales, Service, Marketing, and Commerce",
        desc: "Seamlessly connect data between Salesforce clouds and external systems to enable cross-functional visibility. Marketing teams see service interactions, sales teams understand customer sentiment, and service representatives know the full customer history. Break down organizational silos and improve collaboration.",
      },
      benefit3: {
        title: "Enables personalization and better decision-making",
        desc: "Use comprehensive customer intelligence to deliver personalized experiences at every interaction. Data-driven insights empower better business decisions with complete understanding of customer behavior, preferences, and lifetime value. Enhance customer satisfaction and drive competitive advantage through smarter engagement.",
      },
    },
    summary: {
      title: "Summary",
      description: "Customer 360 Data Consolidation (powered by Salesforce Data Cloud and Customer 360 Data Manager) solves the challenge of fragmented customer data across different systems. It uses the Customer 360 Data Model to standardize data structures, create unified customer profiles, and enable seamless data exchange between Salesforce clouds (Sales, Service, Marketing, Commerce) and external systems. The solution employs data streams, identity resolution, and data lake objects to create a comprehensive, real-time view of each customer.",
    },
    bestFor: {
      title: "Best for",
      items: [
        "Enterprises with fragmented customer data",
        "Organizations focused on personalization & analytics",
      ],
    },
    detailsSection: {
      paragraph1:
        "Customer 360 Data Consolidation transforms how enterprises manage customer information by creating a unified, intelligent platform that breaks down data silos and enables seamless integration across all business functions. The solution provides a single source of truth for customer data, eliminating the complexity and inefficiency of managing fragmented customer records across multiple disconnected systems.",
      paragraph2:
        "By leveraging advanced data management capabilities including identity resolution, data standardization, and real-time synchronization, Customer 360 enables organizations to gain deeper customer insights and deliver more personalized experiences. Sales teams can see complete customer histories, service teams can provide contextual support, and marketing teams can create targeted campaigns based on unified customer profiles. This integrated approach improves operational efficiency, enhances customer satisfaction, and unlocks new opportunities for revenue growth and customer loyalty.",
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
      subtitle: "Our Customer 360 experts are ready to help unify your customer data",
      firstName: "Full Name",
      email: "Email",
      organization: "Organization",
      message: "Message",
      captcha: "13 + 15 =",
      submit: "Book Consultation",
    },
    scheduleModal: {
      title: "Book a Free 30-Minute Strategy Call",
      subtitle: "Discuss your data consolidation challenges and discover practical solutions",
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
            { name: "การรวมข้อมูลลูกค้า 360 องศา", href: "/service/customer-360" },
            { name: "ศูนย์บริการลูกค้ายุคใหม่", href: "/service/customer-services-centre" },
            { name: "การขายตามสัญญาสำหรับการผลิต", href: "/service/contractual-sales" },
          ],
        },
        group2: {
          title: "การวางแผนเชิงกลยุทธ์และข่าวกรอง",
          items: [
            { name: "การวางแผนธุรกิจแบบบูรณาการ (IBP)", href: "/service/data-management" },
            { name: "การวางแผนการขายและการดำเนินงาน (S&OP)", href: "/service/crm" },
            { name: "การวางแผนและวิเคราะห์ทางการเงิน (FP&A)", href: "/service/financial-planning-analysis" },
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
      title: "การรวมข้อมูลลูกค้า 360 องศา",
      subtitle: "สร้างแหล่งข้อมูลเดี่ยวที่เชื่อถือได้สำหรับข้อมูลลูกค้า ทำลายสิ่งกีดขวางข้อมูลทั่วการขาย บริการ การตลาด และการค้า",
      cta: "ติดต่อเรา",
    },
    benefitsTitle: "การรวมข้อมูลลูกค้า 360 องศาสามารถช่วยองค์กรของคุณด้านใดได้บ้าง",
    benefits: {
      benefit1: {
        title: "สร้างแหล่งข้อมูลเดี่ยวที่เชื่อถือได้สำหรับข้อมูลลูกค้า",
        desc: "รวมข้อมูลลูกค้าจากทุกจุดสัมผัสเข้ากับโปรไฟล์ลูกค้าแบบรวมที่เชื่อถือได้ ลบบันทึกที่ซ้ำซ้อนและความไม่สอดคล้องของข้อมูลที่สำนักเหล่านี้เผชิญในสภาพแวดล้อมแบบมัลติระบบ เปิดใช้งานให้สมาชิกทีมทุกคนเข้าถึงข้อมูลลูกค้าแบบเดียวกันที่ถูกต้องและเป็นปัจจุบัน",
      },
      benefit2: {
        title: "ทำลายสิ่งกีดขวางข้อมูลทั่วการขาย บริการ การตลาด และการค้า",
        desc: "เชื่อมต่อข้อมูลระหว่าง Salesforce Clouds และระบบภายนอกได้อย่างราบรื่นเพื่อเปิดใช้งานการมองเห็นข้ามฟังก์ชัน ทีมการตลาดเห็นการมีปฏิสัมพันธ์ด้านการบริการ ทีมการขายเข้าใจความรู้สึกของลูกค้า และตัวแทนด้านการบริการรู้จักประวัติลูกค้าแบบเต็ม ทำลายสิ่งกีดขวางของมนุษย์และปรับปรุงการทำงานร่วมกัน",
      },
      benefit3: {
        title: "เปิดใช้งานการปรับแต่งและการตัดสินใจที่ดีขึ้น",
        desc: "ใช้ข่าวกรองลูกค้าที่ครอบคลุมเพื่อให้บริการการสัมผัสที่ปรับแต่งเองได้ในทุกการโต้ตอบ ข้อมูลเชิงลึกที่ขับเคลื่อนด้วยข้อมูลช่วยให้สามารถตัดสินใจทางธุรกิจได้ดีขึ้นด้วยความเข้าใจที่สมบูรณ์เกี่ยวกับพฤติกรรมของลูกค้า ความต้องการ และมูลค่าตลอดอายุของลูกค้า ปรับปรุงความพึงพอใจของลูกค้าและขับเคลื่อนข้อได้เปรียบในการแข่งขันผ่านการมีส่วนร่วมที่ฉลาดขึ้น",
      },
    },
    summary: {
      title: "สรุป",
      description: "การรวมข้อมูลลูกค้า 360 องศา (ขับเคลื่อนโดย Salesforce Data Cloud และ Customer 360 Data Manager) แก้ไขปัญหาของข้อมูลลูกค้าที่แตกกระจายในระบบต่างๆ ใช้ Customer 360 Data Model เพื่อทำให้โครงสร้างข้อมูลเป็นมาตรฐาน สร้างโปรไฟล์ลูกค้าแบบรวม และเปิดใช้งานการแลกเปลี่ยนข้อมูลได้อย่างราบรื่นระหว่าง Salesforce Clouds (Sales, Service, Marketing, Commerce) และระบบภายนอก วิธีแก้ปัญหาใช้ data streams, identity resolution และ data lake objects เพื่อสร้างมุมมองที่ครอบคลุมและแบบเรียลไทม์ของลูกค้าแต่ละรายคน",
    },
    bestFor: {
      title: "เหมาะสำหรับ",
      items: [
        "วิสาหกิจที่มีข้อมูลลูกค้าแตกกระจาย",
        "องค์กรที่มุ่งเน้นไปที่การปรับแต่งและการวิเคราะห์",
      ],
    },
    detailsSection: {
      paragraph1:
        "การรวมข้อมูลลูกค้า 360 องศาแปลงวิธีการจัดการข้อมูลลูกค้าของวิสาหกิจโดยสร้างแพลตฟอร์มที่ชาญฉลาดและเป็นแบบรวมที่ทำลายสิ่งกีดขวางข้อมูลและเปิดใช้งานการบูรณาการที่ราบรื่นในทุกฟังก์ชันทางธุรกิจ วิธีแก้ปัญหาให้แหล่งข้อมูลเดี่ยวที่เชื่อถือได้สำหรับข้อมูลลูกค้า ช่วยขจัดความซับซ้อนและความไม่มีประสิทธิภาพของการจัดการบันทึกลูกค้าที่แตกกระจายในระบบที่ไม่เชื่อมต่อหลายระบบ",
      paragraph2:
        "ด้วยการใช้ประโยชน์จากความสามารถด้านการจัดการข้อมูลขั้นสูง รวมถึง identity resolution, data standardization และการซิงโครไนซ์แบบเรียลไทม์ Customer 360 ช่วยให้องค์กรสามารถรับข้อมูลเชิงลึกของลูกค้าที่ลึกซึ้งยิ่งขึ้นและให้บริการที่ปรับแต่งเองได้มากขึ้น ทีมการขายสามารถเห็นประวัติลูกค้าแบบเต็ม ทีมการบริการสามารถให้การสนับสนุนที่มีความเหมาะสม และทีมการตลาดสามารถสร้างแคมเปญที่มีเป้าหมายตามโปรไฟล์ลูกค้าแบบรวม วิธีการแบบบูรณาการนี้ปรับปรุงประสิทธิภาพการปฏิบัติงาน ปรับปรุงความพึงพอใจของลูกค้า และปลดล็อกโอกาสใหม่สำหรับการเติบโตของรายได้และความจงรักภักดีของลูกค้า",
    },
    contact: {
      title: "ติดต่อเรา",
      phone: "+662-231-8088",
      email: "contact@ignite-idea.com",
      address: "Suite 0871, Level 8, 1-7 Zuellig House, Silom Road, Silom, Bangrak, Bangkok, 10500, Thailand",
      hours: "จันทร์-ศุกร์: 9น. – 18น.",
      services: "บริการและการปรึกษาของเรา",
      crm: "การจัดการความสัมพันธ์ลูกค้า (CRM)",
      callCenter: "ระบบศูนย์สายด่วน",
      marketing: "ระบบการตลาดอัตโนมัติ",
      dataManagement: "การจัดการข้อมูล",
      partners: "พันธมิตรผลิตภัณฑ์ของเรา",
    },
    booking: {
      title: "จองการปรึกษา",
      subtitle: "ผู้เชี่ยวชาญด้านลูกค้า 360 ของเราพร้อมที่จะช่วยรวมข้อมูลลูกค้าของคุณ",
      firstName: "ชื่อเต็ม",
      email: "อีเมล",
      organization: "องค์กร",
      message: "ข้อความ",
      captcha: "13 + 15 =",
      submit: "จองการปรึกษา",
    },
    scheduleModal: {
      title: "จองการเรียกปรึกษาเชิงกลยุทธ์ฟรี 30 นาที",
      subtitle: "อภิปรายความท้าทายในการรวมข้อมูลของคุณและค้นพบวิธีแก้ปัญหาที่ใช้ได้จริง",
      projectLabel: "อธิบายความต้องการของโครงการ",
      projectPlaceholder: "อธิบายความต้องการของโครงการที่นี่...",
      nameLabel: "ชื่อของคุณ",
      emailLabel: "อีเมลบริษัท",
      submit: "ส่ง",
    },
  },
}

export default function Customer360Page() {
  const [lang, setLang] = useState("en")
  const [t, setT] = useState(translations.en)
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)

  useEffect(() => {
    setT(lang === "en" ? translations.en : translations.th)
  }, [lang])

  const scrollToContact = () => {
    document.getElementById("contact-us")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white">
      <FloatingCallButton onClick={() => setScheduleModalOpen(true)} text={t.nav.schedule} />
      <FloatingChatButton />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white hover:text-blue-100 transition-colors">
              Ignite Idea
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
      <section className="relative pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}} />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 backdrop-blur-md px-6 py-3 rounded-full border border-indigo-400/40 shadow-xl shadow-indigo-500/20">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                <span className="text-white text-lg md:text-xl font-bold tracking-wide">{lang === "en" ? "Unified Customer Intelligence" : "ข่าวกรองลูกค้าแบบรวม"}</span>
              </div>
              <div className="space-y-6">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.95] text-balance tracking-tight">
                  {t.hero.title}
                </h1>
                <div className="h-2 w-40 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full" />
              </div>
              <p className="text-2xl md:text-3xl text-indigo-100 leading-relaxed max-w-2xl font-light">{t.hero.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={scrollToContact} size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full px-10 py-7 shadow-2xl shadow-indigo-500/40 text-xl font-bold">
                  {lang === "en" ? "Get Started" : "เริ่มต้น"} <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </div>
            </div>

            <div className="relative">
              {/* Data Hub Visualization */}
              <div className="relative">
                {/* Outer Glow Ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur-2xl animate-pulse" />
                
                {/* Center Hub */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-indigo-500/60 z-10 border-4 border-white/20">
                  <div className="text-center relative z-10">
                    <div className="text-5xl font-black text-white mb-2 drop-shadow-lg">360°</div>
                    <div className="text-lg font-bold text-indigo-100 tracking-wider">Customer</div>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent animate-pulse" />
                  {/* Inner rings */}
                  <div className="absolute inset-8 rounded-full border-2 border-white/20" />
                  <div className="absolute inset-16 rounded-full border-2 border-white/10" />
                </div>

                {/* Orbiting Data Sources */}
                <div className="relative w-full h-96">
                  {/* Sales */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-4 w-32 shadow-lg">
                    <div className="w-10 h-10 mx-auto rounded-full bg-blue-500 flex items-center justify-center mb-2 shadow-lg shadow-blue-500/50">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div className="text-blue-100 text-xs font-semibold text-center">Sales</div>
                  </div>

                  {/* Service */}
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-2xl p-4 w-32 shadow-lg">
                    <div className="w-10 h-10 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-2 shadow-lg shadow-green-500/50">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <div className="text-green-100 text-xs font-semibold text-center">Service</div>
                  </div>

                  {/* Marketing */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-4 w-32 shadow-lg">
                    <div className="w-10 h-10 mx-auto rounded-full bg-purple-500 flex items-center justify-center mb-2 shadow-lg shadow-purple-500/50">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
                    </div>
                    <div className="text-purple-100 text-xs font-semibold text-center">Marketing</div>
                  </div>

                  {/* Commerce */}
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur-sm border border-amber-400/30 rounded-2xl p-4 w-32 shadow-lg">
                    <div className="w-10 h-10 mx-auto rounded-full bg-amber-500 flex items-center justify-center mb-2 shadow-lg shadow-amber-500/50">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <div className="text-amber-100 text-xs font-semibold text-center">Commerce</div>
                  </div>

                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: 1}}>
                    <line x1="50%" y1="20%" x2="50%" y2="50%" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite"/>
                    </line>
                    <line x1="85%" y1="50%" x2="50%" y2="50%" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite"/>
                    </line>
                    <line x1="50%" y1="80%" x2="50%" y2="50%" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite"/>
                    </line>
                    <line x1="15%" y1="50%" x2="50%" y2="50%" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite"/>
                    </line>
                  </svg>
                </div>

                {/* Badge */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-white px-8 py-5 rounded-3xl shadow-2xl shadow-green-500/60 font-black text-xl md:text-2xl whitespace-nowrap border-4 border-white/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>{lang === "en" ? "Single Source of Truth" : "แหล่งความจริงเดียว"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              {t.benefitsTitle}
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 - Single Source of Truth */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-indigo-100 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{t.benefits.benefit1.title}</h3>
                <p className="text-gray-600 leading-relaxed">{t.benefits.benefit1.desc}</p>
                
                <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>

            {/* Benefit 2 - Break Silos */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-purple-100 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{t.benefits.benefit2.title}</h3>
                <p className="text-gray-600 leading-relaxed">{t.benefits.benefit2.desc}</p>
                
                <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>

            {/* Benefit 3 - Personalization */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-green-100 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-green-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{t.benefits.benefit3.title}</h3>
                <p className="text-gray-600 leading-relaxed">{t.benefits.benefit3.desc}</p>
                
                <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Section with Tech Stack */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-[3rem] p-12 md:p-16 shadow-2xl border border-indigo-800/30 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px'}} />
            </div>
            
            <div className="relative space-y-8">
              <div className="inline-flex items-center gap-2 bg-indigo-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-400/30">
                <span className="text-indigo-200 text-sm font-semibold uppercase tracking-wider">{t.summary.title}</span>
              </div>
              <p className="text-xl md:text-2xl text-indigo-50 leading-relaxed max-w-4xl">{t.summary.description}</p>
              
              {/* Technology Stack Icons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                  </div>
                  <div className="text-indigo-300 font-semibold text-sm">Data Cloud</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <div className="text-purple-300 font-semibold text-sm">Identity</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                  </div>
                  <div className="text-blue-300 font-semibold text-sm">Unification</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div className="text-green-300 font-semibold text-sm">Real-time Sync</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best For Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-indigo-50/50 via-white to-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">{t.bestFor.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{lang === "en" ? "Perfect for organizations seeking complete customer visibility" : "เหมาะสำหรับองค์กรที่ต้องการมองเห็นลูกค้าอย่างสมบูรณ์"}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {t.bestFor.items.map((item, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500" />
                <div className="relative bg-white rounded-3xl p-8 border-2 border-indigo-100 hover:border-indigo-300 transition-all duration-300 shadow-lg hover:shadow-xl h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                    <span className="text-2xl font-bold text-white">{idx + 1}</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 leading-tight">{item}</p>
                  
                  <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px'}} />
        </div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-white">
              <div>
                <div className="inline-flex items-center gap-2 bg-indigo-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-400/30 mb-6">
                  <span className="text-indigo-200 text-sm font-semibold uppercase tracking-wider">{lang === "en" ? "How It Works" : "วิธีการทำงาน"}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-balance">{lang === "en" ? "Transform Your Customer Data Strategy" : "เปลี่ยนแปลงกลยุทธ์ข้อมูลลูกค้าของคุณ"}</h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-indigo-100 leading-relaxed">{t.detailsSection.paragraph1}</p>
                <p className="text-lg md:text-xl text-indigo-100 leading-relaxed">{t.detailsSection.paragraph2}</p>
              </div>

              <Button onClick={scrollToContact} size="lg" className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-8 shadow-xl shadow-indigo-500/30">
                {lang === "en" ? "Schedule Demo" : "จองการสาธิต"} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold text-indigo-400 mb-2">100%</div>
                <div className="text-indigo-200 text-sm leading-tight">{lang === "en" ? "Unified Customer View" : "มุมมองลูกค้าแบบรวม"}</div>
              </div>
              
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold text-purple-400 mb-2">70%</div>
                <div className="text-purple-200 text-sm leading-tight">{lang === "en" ? "Faster Data Access" : "การเข้าถึงข้อมูลเร็วขึ้น"}</div>
              </div>
              
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold text-blue-400 mb-2">4X</div>
                <div className="text-blue-200 text-sm leading-tight">{lang === "en" ? "Better Personalization" : "การปรับแต่งดีขึ้น"}</div>
              </div>
              
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold text-green-400 mb-2">360°</div>
                <div className="text-green-200 text-sm leading-tight">{lang === "en" ? "Complete Visibility" : "การมองเห็นสมบูรณ์"}</div>
              </div>
            </div>
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
                    <Link href="/service/customer-services-centre" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
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
              <p className="text-gray-600 mb-8">{lang === "en" ? "Get expert advice on Customer 360 implementation" : "รับคำแนะนำจากผู้เชี่ยวชาญเกี่ยวกับการใช้งาน Customer 360"}</p>
              
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
