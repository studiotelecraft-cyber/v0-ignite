"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, Globe, ArrowRight, ChevronDown, X, Menu } from 'lucide-react'
import Link from "next/link"
import { FloatingCallButton } from "@/components/floating-call-button"
import { FloatingChatButton } from "@/components/floating-chat-button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Navbar } from "@/components/navbar"
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
      title: "Sales & Operations Planning (S&OP)",
      subtitle: "Brings sales, operations, finance, and marketing together to establish shared revenue and growth goals. Ensures operational capacity matches sales commitments.",
      cta: "Contact Us",
    },
    benefitsTitle: "How Can S&OP Help Your Organization?",
    benefits: {
      benefit1: {
        title: "Aligns Departments & Prevents Overselling",
        desc: "Brings sales, operations, finance, and marketing together to establish shared revenue and growth goals across the entire organization. Ensures operational capacity matches sales commitments to avoid supply chain issues and delivery failures. Enable cross-functional collaboration through a single source of truth that connects sales data with supply chain systems.",
      },
      benefit2: {
        title: "Improves Business Agility & Enhances Decision-Making",
        desc: "Scenario management helps teams prepare for unexpected market changes and disruptions with pre-planned responses. Data-driven planning processes provide visibility across departments for better strategic choices and resource allocation. Enable real-time collaboration between departments and automated scenario planning to optimize operations.",
      },
      benefit3: {
        title: "Reduces Surprises",
        desc: "Proactive planning ensures materials, staff, and infrastructure are ready to meet forecasted demand before it arrives. Monthly S&OP cycles including demand planning, supply planning, pre-meetings, and executive reviews keep everyone aligned. Enable organizations to meet customer demands profitably by synchronizing sales forecasts with operational capabilities.",
      },
    },
    summary: {
      title: "Summary",
      description: "Sales & Operations Planning is a collaborative business process that aligns sales forecasts with operational capabilities to ensure organizations can meet customer demands profitably. The S&OP process typically includes demand planning, supply planning, pre-meetings, and executive reviews on a monthly cycle. Salesforce-integrated S&OP solutions (like ketteQ, Rootstock, and Manufacturing Cloud) connect sales data with supply chain systems to create a single source of truth, enabling real-time collaboration between departments and automated scenario planning to optimize resource allocation and prevent costly misalignments.",
    },
    bestFor: {
      title: "Best for",
      items: [
        "Manufacturing & distribution companies",
        "Organizations facing forecast vs capacity mismatch",
      ],
    },
    detailsSection: {
      paragraph1:
        "Sales & Operations Planning transforms how organizations align demand with supply by creating a collaborative framework that connects sales, operations, finance, and marketing. The monthly S&OP cycle brings cross-functional teams together to review forecasts, assess capacity, and make strategic decisions about resource allocation. By integrating Salesforce sales data with supply chain systems, organizations create a single source of truth that enables data-driven decision-making.",
      paragraph2:
        "With automated scenario planning and real-time collaboration capabilities, S&OP solutions help organizations prepare for market changes and disruptions before they occur. The process reduces surprises by ensuring materials, staff, and infrastructure are aligned with forecasted demand. By synchronizing sales commitments with operational capabilities, S&OP prevents overselling, optimizes resource utilization, and enables profitable growth while maintaining high service levels.",
    },
    contact: {
      title: "Contact Us",
      phone: "02-1243295",
      email: "contact@ignite-idea.com",
      address: "No. 9 G Tower Grand Rama 9 Building, 31st Floor, Room No. T01, Rama 9 Road, Huai Khwang, Huai Khwang, Bangkok 10310",
      hours: "Monday - Friday: 9:00 AM – 6:00 PM",
      services: "Our consult & services",
      crm: "Customer Relationship Management (CRM)",
      callCenter: "Call Center System",
      marketing: "Marketing Automation System",
      dataManagement: "Data Management",
      partners: "Our product partner",
    },
    booking: {
      title: "Book a Consultation",
      subtitle: "Our S&OP experts are ready to help align your sales and operations",
      firstName: "Full Name",
      email: "Email",
      organization: "Organization",
      message: "Message",
      captcha: "13 + 15 =",
      submit: "Book Consultation",
    },
    scheduleModal: {
      title: "Book a Free 30-Minute Strategy Call",
      subtitle: "Discuss your sales and operations planning challenges and discover alignment solutions",
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
            { name: "การวางแผนธุรกิจแบบบูรณาการ (IBP)", href: "/service/integrated-business-planning" },
            { name: "การวางแผนการขายและการดำเนินงาน (S&OP)", href: "/service/sales-operations-planning" },
            { name: "การวางแผนและวิเคราะห์ทางการเงิน (FP&A)", href: "/service/financial-planning-analysis" },
          ],
        },
        group3: {
          title: "ห่วงโซ่อุปทานและการดำเนินงาน",
          items: [
            { name: "การวางแผนอุปสงค์และอุปทาน", href: "/service/demand-supply-planning" },
            { name: "การวางแผนการผลิต", href: "/service/production-planning" },
          ],
        },
      },
      resources: "คลังทรัพยากร",
      about: "เกี่ยวกับเรา",
      schedule: "นัดที่ปรึกษา",
    },
    hero: {
      title: "การวางแผนการขายและการดำเนินงาน (S&OP)",
      subtitle: "รวมแผนกการขาย การดำเนินงาน การเงิน และการตลาดเข้าด้วยกันเพื่อกำหนดเป้าหมายรายได้และการเติบโตร่วมกัน ทำให้กำลังการผลิตตรงกับคำมั่นสัญญาการขาย",
      cta: "ติดต่อเรา",
    },
    benefitsTitle: "S&OP สามารถช่วยองค์กรของคุณได้อย่างไร",
    benefits: {
      benefit1: {
        title: "จัดเรียงแผนกและป้องกันการขายเกิน",
        desc: "รวมแผนกการขาย การดำเนินงาน การเงิน และการตลาดเข้าด้วยกันเพื่อกำหนดเป้าหมายรายได้และการเติบโตร่วมกันทั่วทั้งองค์กร ทำให้กำลังการผลิตตรงกับคำมั่นสัญญาการขายเพื่อหลีกเลี่ยงปัญหาห่วงโซ่อุปทานและความล้มเหลวในการส่งมอบ เปิดใช้งานความร่วมมือข้ามสายงานผ่านแหล่งความจริงเดียวที่เชื่อมต่อข้อมูลการขายกับระบบห่วงโซ่อุปทาน",
      },
      benefit2: {
        title: "ปรับปรุงความคล่องตัวทางธุรกิจและเพิ่มประสิทธิภาพการตัดสินใจ",
        desc: "การจัดการสถานการณ์ช่วยให้ทีมเตรียมพร้อมสำหรับการเปลี่ยนแปลงของตลาดที่ไม่คาดคิดและการหยุดชะงักด้วยการตอบสนองที่วางแผนไว้ล่วงหน้า กระบวนการวางแผนที่ขับเคลื่อนด้วยข้อมูลให้การมองเห็นในทุกแผนกเพื่อตัดสินใจเชิงกลยุทธ์และการจัดสรรทรัพยากรที่ดีขึ้น เปิดใช้งานความร่วมมือแบบเรียลไทม์ระหว่างแผนกและการวางแผนสถานการณ์อัตโนมัติเพื่อเพิ่มประสิทธิภาพการดำเนินงาน",
      },
      benefit3: {
        title: "ลดความประหลาดใจ",
        desc: "การวางแผนเชิงรุกรับประกันว่าวัสดุ พนักงาน และโครงสร้างพื้นฐานพร้อมที่จะตอบสนองความต้องการที่พยากรณ์ไว้ก่อนที่จะมาถึง วงจร S&OP รายเดือนรวมถึงการวางแผนความต้องการ การวางแผนอุปทาน การประชุมเตรียมการ และการทบทวนของผู้บริหารเพื่อให้ทุกคนสอดคล้องกัน เปิดใช้งานองค์กรเพื่อตอบสนองความต้องการของลูกค้าอย่างทำกำไรโดยซิงโครไนซ์การพยากรณ์การขายกับความสามารถในการดำเนินงาน",
      },
    },
    summary: {
      title: "สรุป",
      description: "การวางแผนการขายและการดำเนินงานเป็นกระบวนการทางธุรกิจแบบร่วมมือที่จัดเรียงการพยากรณ์การขายกับความสามารถในการดำเนินงานเพื่อให้องค์กรสามารถ���อบสนองความต้องการของลูกค้าอย่างทำกำไร กระบวนการ S&OP โดยทั่วไปรวมถึงการวางแผนความต้องการ การวางแผนอุปทาน การประชุมเตรียมการ และการทบทวนของผู้บริหารในวงจรรายเดือน โซลูชั่�� S&OP ที่รว��กับ Salesforce (เช่น ketteQ, Rootstock และ Manufacturing Cloud) เชื่อมต่อข้อมูลการขายกับระบบห่วงโซ่อุปทานเพื่อสร้างแหล่งความจริงเดียว เปิดใช้งานความร่วมมือแบบเรียลไทม์ระหว่างแผนกและการวางแผนสถานการณ์อัตโนมัติเพื่อเพิ่มประสิทธิภาพการจัดสรรทรัพยากรและป้องกันการไม่สอดคล้องกันที่มีค่าใช้จ่ายสูง",
    },
    bestFor: {
      title: "เหมาะสำหรับ",
      items: [
        "บริษัทการผลิตและการจัดจำหน่าย",
        "องค์กรที่เผชิญกับความไม่สอดคล้องระหว่างการพยากรณ์กับกำลังการผลิต",
      ],
    },
    detailsSection: {
      paragraph1:
        "การวางแผนการขายและการดำเนินงานแปลงวิธีการที่องค์กรจัดเรียงความต้องการกับอุปทานโดยการสร้างกรอบความร่วมมือที่เชื่อมต่อการขาย การดำเนินงาน การเงิน และการตลาด วงจร S&OP รายเดือนนำทีมข้ามสายงานมารวมกันเพื่อทบทวนกา��พยากรณ์ ประเมินกำลังการผลิต และตัดสินใจเชิงกลยุทธ์เกี่ยวกับการจัดสรรทรัพยากร ด้วยการรวมข้อมูลการขาย Salesforce กับระบบห่วง���ซ่อุปทาน องค์กรสร้างแหล่งความจ��ิงเดียวที่เปิดใช้งานการตัดสินใจที่ขับเคลื่อนด้วยข้อมูล",
      paragraph2:
        "ด้วยการวางแผนสถานการณ์อัตโนมัติและความสามารถในการทำงานร่วมกันแบบเรียลไทม์ โซลูชั่น S&OP ช่วยให้องค์กรเตรียมพร้อมสำหรับการเปลี่ยนแปลงของตลาดและการหยุดชะงักก่อนที่จะเกิดขึ้น กระบวนการลดความประหลาดใจโดยรับประกันว่าวัสดุ พนักงาน และโครงสร้างพื้นฐานสอดคล้องกับความต้องการที่พยากรณ์ไว้ ด้วยการซิงโครไนซ์คำมั่นสัญญาการขายกับความสามารถในการดำเนินงาน S&OP ป้องกันการขายเกิน เพิ่มประสิทธิภาพการใช้ทรัพยากร และเปิดใช้งานการเติบโตที่ทำกำไรในขณะที่รักษาระดับการบริการสูง",
    },
    contact: {
      title: "ติดต่อเรา",
      phone: "02-1243295",
      email: "contact@ignite-idea.com",
      address: "เลขที่ 9 อาคารจี ทาวเวอร์ แกรนด์พระราม9 ชั้นที่ 31 ห้องเลขที่ T01 ถนนพระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพมหานคร 10310",
      hours: "จันทร์-ศุกร์: 9:00 น. – 18:00 น.",
      services: "บริการและการปรึกษาของเรา",
      crm: "การจัดการความสัมพันธ์ลูกค้า (CRM)",
      callCenter: "ระบบศูนย์สายด่วน",
      marketing: "ระบบการตลาดอัตโนมัติ",
      dataManagement: "การจัดการข้อมูล",
      partners: "พันธมิตรผลิตภัณฑ์ของเรา",
    },
    booking: {
      title: "จองการปรึกษา",
      subtitle: "ผู้เชี่ยวชาญด้าน S&OP ของเราพร้อมที่จะช่วยจัดเรียงการขายและการดำเนินงานของคุณ",
      firstName: "ชื่อเต็ม",
      email: "อีเมล",
      organization: "องค์กร",
      message: "ข้อความ",
      captcha: "13 + 15 =",
      submit: "จองการปรึกษา",
    },
    scheduleModal: {
      title: "จองการเรียกปรึกษาเชิงกลยุทธ์ฟรี 30 นาที",
      subtitle: "อภิปรายความท้าทายด้านการวางแผนการขายและการดำเนินงานของคุณและค้นพบโซลูชั่นการจัดเรียง",
      projectLabel: "อธิบายความต้องการของโครงการ",
      projectPlaceholder: "อธิบายความต้องการของโครงการที่นี่...",
      nameLabel: "ชื่อของคุณ",
      emailLabel: "อีเมลบริษัท",
      submit: "ส่ง",
    },
  },
}

export default function SalesOperationsPlanningPage() {
  const { lang, setLang } = useLanguage()
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
      <section className="relative pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}} />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 backdrop-blur-md px-6 py-3 rounded-full border border-teal-400/40 shadow-xl shadow-teal-500/20">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                <span className="text-white text-lg md:text-xl font-bold tracking-wide">{lang === "en" ? "Demand-Supply Alignment" : "การจัดเรียงอุปสงค์-อุปทาน"}</span>
              </div>
              <div className="space-y-6">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.95] text-balance tracking-tight">
                  {t.hero.title}
                </h1>
                <div className="h-2 w-40 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 rounded-full" />
              </div>
              <p className="text-2xl md:text-3xl text-teal-100 leading-relaxed max-w-2xl font-light">{t.hero.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={scrollToContact} size="lg" className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-full px-10 py-7 shadow-2xl shadow-teal-500/40 text-xl font-bold">
                  {lang === "en" ? "Get Started" : "เริ่มต้น"} <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-600/20 blur-2xl animate-pulse" />
                
                

                

                
              </div>
            </div>
          </div>
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
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-100">
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
                      <p className="text-gray-800 text-sm mt-2 font-bold">{t.contact.hours}</p>
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
              <p className="text-gray-600 mb-8">{lang === "en" ? "Get expert advice on Sales & Operations Planning implementation" : "รับคำแนะนำจากผู้เชี่ยวชาญเกี่ยวกับการใช้งานการวางแผนการขายและการดำเนินงาน"}</p>
              
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
