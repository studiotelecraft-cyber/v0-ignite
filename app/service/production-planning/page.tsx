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
            { name: "Sales & Operations Planning (S&OP)", href: "/service/crm" },
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
      title: "Production Planning",
      subtitle: "Provides 360-degree view of production capacity, work orders, and shop floor operations. Automates materials planning with MRP capabilities.",
      cta: "Contact Us",
    },
    benefitsTitle: "How Can Production Planning Help Your Organization?",
    benefits: {
      benefit1: {
        title: "Improves Schedule Visibility & Automates Materials Planning",
        desc: "Provides 360-degree view of production capacity, work orders, and shop floor operations for complete manufacturing visibility. MRP capabilities automatically calculate material requirements based on sales orders and forecasts to ensure materials are available when needed. Enable real-time tracking of production progress from raw materials through finished goods.",
      },
      benefit2: {
        title: "Enhances Resource Utilization & Accelerates Order Fulfillment",
        desc: "Optimizes labor, equipment, and facility allocation for maximum efficiency across all production resources. Streamlines work order management from creation through completion with automated workflows and shop floor control. Enable faster order fulfillment through intelligent production scheduling that balances capacity with demand.",
      },
      benefit3: {
        title: "Reduces Production Costs",
        desc: "Minimizes waste, overtime, and carrying costs through intelligent production scheduling and resource optimization. Reduce excess inventory holding costs while preventing stock-outs that disrupt production. Enable cost-effective manufacturing operations by synchronizing production with customer demand and sales agreements.",
      },
    },
    summary: {
      title: "Summary",
      description: "Production Planning within Salesforce Manufacturing Cloud coordinates manufacturing activities with customer demand and sales agreements to ensure efficient production operations. Solutions like Rootstock Cloud ERP provide comprehensive work order management, shop floor control, and production scheduling capabilities natively on the Salesforce platform. The system integrates sales forecasts and actual orders to generate production plans, automate materials procurement, track production progress in real-time, and provide visibility across the entire manufacturing process from raw materials to finished goods.",
    },
    bestFor: {
      title: "Best for",
      items: [
        "Manufacturing plants",
        "Multi-site or complex production environments",
      ],
    },
    detailsSection: {
      paragraph1:
        "Production Planning transforms manufacturing operations by connecting customer demand with production capacity and shop floor execution. The solution integrates with Salesforce Manufacturing Cloud to leverage sales orders, forecasts, and contractual agreements to create optimized production schedules. MRP capabilities automatically calculate material requirements and trigger procurement processes, ensuring all necessary materials are available when production begins.",
      paragraph2:
        "With comprehensive work order management and shop floor control, production planning solutions enable manufacturers to track every aspect of production in real-time. From resource allocation and capacity planning to progress tracking and quality control, the system provides complete visibility into manufacturing operations. By synchronizing production with actual demand and automating materials planning, manufacturers can reduce costs, improve efficiency, and deliver products on time while maintaining optimal inventory levels.",
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
      subtitle: "Our Production Planning experts are ready to help optimize your manufacturing operations",
      firstName: "Full Name",
      email: "Email",
      organization: "Organization",
      message: "Message",
      captcha: "13 + 15 =",
      submit: "Book Consultation",
    },
    scheduleModal: {
      title: "Book a Free 30-Minute Strategy Call",
      subtitle: "Discuss your production planning challenges and discover manufacturing solutions",
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
            { name: "การวางแผนการขายและการดำเนินงาน (S&OP)", href: "/service/crm" },
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
      title: "การวางแผนการผลิต",
      subtitle: "ให้มุมมอง 360 องศาของกำลังการผลิต ใบสั่งงาน และการดำเนินงานพื้นโรงงาน ทำให้การวางแผนวัสดุเป็นอัตโนมัติด้วยความสามารถ MRP",
      cta: "ติดต่อเรา",
    },
    benefitsTitle: "การวางแผนการผลิตสามารถช่วยองค์กรของคุณได้อย่างไร",
    benefits: {
      benefit1: {
        title: "ปรับปรุงการมองเห็นตารางเวลาและทำให้การวางแผนวัสดุเป็นอัตโนมัติ",
        desc: "ให้มุมมอง 360 องศาของกำลังการผลิต ใบสั่งงาน และการดำเนินงานพื้นโรงงานเพื่อการมองเห็นการผลิตที่สมบูรณ์ ความสามารถ MRP คำนวณความต้องการวัสดุโดยอัตโนมัติตามคำสั่งซื้อและการพยากรณ์เพื่อให้แน่ใจว่ามีวัสดุพร้อมเมื่อจำเป็น เปิดใช้งานการติดตามความคืบหน้าการผลิตแบบเรียลไทม์จากวัตถุดิบถึงสินค้าสำเร็จรูป",
      },
      benefit2: {
        title: "เพิ่มประสิทธิภาพการใช้ทรัพยากรและเร่งการดำเนินการตามคำสั่งซื้อ",
        desc: "เพิ่มประสิทธิภาพการจัดสรรแรงงาน อุปกรณ์ และสิ่งอำนวยความสะดวกเพื่อประสิทธิภาพสูงสุดในทุกทรัพยากรการผลิต ทำให้การจัดการใบสั่งงานคล่องตัวตั้งแต่การสร้างจนเสร็จสมบูรณ์ด้วยเวิร์กโฟลว์อัตโนมัติและการควบคุมพื้นโรงงาน เปิดใช้งานการดำเนินการตามคำสั่งซื้อที่เร็วขึ้นผ่านการจัดตารางการผลิตที่ชาญฉลาดซึ่งสมดุลกำลังการผลิตกับความต้องการ",
      },
      benefit3: {
        title: "ลดต้นทุนการผลิต",
        desc: "ลดของเสีย ค่าล่วงเวลา และต้นทุนการถือครองผ่านการจัดตารางการผลิตที่ชาญฉลาดและการเพิ่มประสิทธิภาพทรัพยากร ลดต้นทุนการถือครองสินค้าคงคลังส่วนเกินในขณะที่ป้องกันการสต็อกหมดที่ขัดขวางการผลิต เปิดใช้งานการดำเนินการผลิตที่คุ้มค่าโดยการซิงโครไนซ์การผลิตกับความต้องการของลูกค้าและข้อตกลงการขาย",
      },
    },
    summary: {
      title: "สรุป",
      description: "การวางแผนการผลิตภายใน Salesforce Manufacturing Cloud ประสานกิจกรรมการผลิตกับความต้องการของลูกค้าและข้อตกลงการขายเพื่อให้การดำเนินการผลิตมีประสิทธิภาพ โซลูชั่นเช่น Rootstock Cloud ERP ให้การจัดการใบสั่งงานที่ครอบคลุม การควบคุมพื้นโรงงาน และความสามารถในการจัดตารางการผลิตบนแพลตฟอร์ม Salesforce โดยกำเนิด ระบบรวมการพยากรณ์การขายและคำสั่งซื้อจริงเพื่อสร้างแผนการผลิต ทำให้การจัดซื้อวัสดุเป็นอัตโนมัติ ติดตามความคืบหน้าการผลิตแบบเรียลไทม์ และให้การมองเห็นทั่วทั้งกระบวนการผลิตตั้งแต่วัตถุดิบจนถึงสินค้าสำเร็จรูป",
    },
    bestFor: {
      title: "เหมาะสำหรับ",
      items: [
        "โรงงานผลิต",
        "สภาพแวดล้อมการผลิตหลายสถานที่หรือซับซ้อน",
      ],
    },
    detailsSection: {
      paragraph1:
        "การวางแผนการผลิตแปลงการดำเนินงานการผลิตโดยการเชื่อมต่อความต้องการของลูกค้ากับกำลังการผลิตและการดำเนินการพื้นโรงงาน โซลูชั่นรวมเข้ากับ Salesforce Manufacturing Cloud เพื่อใช้ประโยชน์จากคำสั่งซื้อ การพยากรณ์ และข้อตกลงตามสัญญาเพื่อสร้างตารางการผลิตที่เหมาะสมที่สุด ความสามารถ MRP คำนวณความต้องการวัสดุโดยอัตโนมัติและกระตุ้นกระบวนการจัดซื้อ เพื่อให้แน่ใจว่ามีวัสดุที่จำเป็นทั้งหมดพร้อมเมื่อเริ่มการผลิต",
      paragraph2:
        "ด้วยการจัดการใบสั่งงานที่ครอบคลุมและการควบคุมพื้นโรงงาน โซลูชั่นการวางแผนการผลิตช่วยให้ผู้ผลิตติดตามทุกแง่มุมของการผลิตแบบเรียลไทม์ ตั้งแต่การจัดสรรทรัพยากรและการวางแผนกำลังการผลิตไปจนถึงการติดตามความคืบหน้าและการควบคุมคุณภาพ ระบบให้การมองเห็นที่สมบูรณ์ในการดำเนินงานการผลิต ด้วยการซิงโครไนซ์การผลิตกับความต้องการจริงและการทำให้การวางแผนวัสดุเป็นอัตโนมัติ ผู้ผลิตสามารถลดต้นทุน ปรับปรุงประสิทธิภาพ และส่งมอบผลิตภัณฑ์ตรงเวลาในขณะที่รักษาระดับสินค้าคงคลังที่เหมาะสม",
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
      subtitle: "ผู้เชี่ยวชาญด้านการวางแผนการผลิตของเราพร้อมที่จะช่วยเพิ่มประสิทธิภาพการดำเนินงานการผลิตของคุณ",
      firstName: "ชื่อเต็ม",
      email: "อีเมล",
      organization: "องค์กร",
      message: "ข้อความ",
      captcha: "13 + 15 =",
      submit: "จองการปรึกษา",
    },
    scheduleModal: {
      title: "จองการเรียกปรึกษาเชิงกลยุทธ์ฟรี 30 นาที",
      subtitle: "อภิปรายความท้าทายด้านการวางแผนการผลิตของคุณและค้นพบโซลูชั่นการผลิต",
      projectLabel: "อธิบายความต้องการของโครงการ",
      projectPlaceholder: "อธิบายความต้องการของโครงการที่นี่...",
      nameLabel: "ชื่อของคุณ",
      emailLabel: "อีเมลบริษัท",
      submit: "ส่ง",
    },
  },
}

export default function ProductionPlanningPage() {
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
              <p className="text-gray-600 mb-8">{lang === "en" ? "Get expert advice on Production Planning implementation" : "รับคำแนะนำจากผู้เชี่ยวชาญเกี่ยวกับการใช้งานการวางแผนการผลิต"}</p>
              
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
