"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Shield, FileText, Lock, Eye, Users, Scale } from 'lucide-react'
import { FloatingChatButton } from "@/components/floating-chat-button"

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
      title: "Privacy Policy",
      subtitle: "Ignite Ideas Co., Ltd.",
      lastUpdated: "Last Updated: 2025",
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
      title: "นโยบายความเป็นส่วนตัว",
      subtitle: "บริษัท อิกไนท ไอเดีย จำกัด",
      lastUpdated: "อัปเดตล่าสุด: 2568",
    },
  },
}

export default function PrivacyPolicyPage() {
  const [lang, setLang] = useState<"en" | "th">("th")
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
                <Link
                  href="/service/crm"
                  className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1"
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
              <Link href="/resources" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t.nav.resources}
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
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
                <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2">
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
          backgroundImage: `url('/images/backgroud.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-blue-950/60 to-purple-950/70" />
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">{t.hero.title}</h1>
          <p className="text-2xl text-blue-100/90 mb-2">{t.hero.subtitle}</p>
          <p className="text-sm text-blue-200/70">{t.hero.lastUpdated}</p>
        </div>
      </section>

      {/* Content Section */}
      <article className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <style jsx global>{`
              .prose h2 {
                font-size: 2rem;
                font-weight: 700;
                color: #1e40af;
                margin-top: 3rem;
                margin-bottom: 1.5rem;
                padding-bottom: 0.5rem;
                border-bottom: 3px solid #3b82f6;
              }
              
              .prose h3 {
                font-size: 1.5rem;
                font-weight: 600;
                color: #1f2937;
                margin-top: 2rem;
                margin-bottom: 1rem;
              }
              
              .prose p {
                color: #374151;
                line-height: 1.8;
                margin-bottom: 1.5rem;
                font-size: 1.125rem;
                text-align: justify;
              }
              
              .prose ul, .prose ol {
                margin: 1.5rem 0;
                padding-left: 2rem;
              }
              
              .prose li {
                color: #374151;
                margin-bottom: 1rem;
                line-height: 1.7;
                font-size: 1.125rem;
              }
              
              .prose strong {
                color: #1f2937;
                font-weight: 600;
              }
              
              .prose .contact-box {
                background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
                border-left: 4px solid #2563eb;
                padding: 2rem;
                margin: 2rem 0;
                border-radius: 0.5rem;
              }
              
              .prose .contact-box p {
                margin-bottom: 0.5rem;
              }
            `}</style>

            <div className="mb-12 p-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border-l-4 border-blue-600">
              <p className="text-xl leading-relaxed text-gray-800">
                Ignite Ideas Co., Ltd. ("บริษัท") ให้ความสำคัญและเคารพสิทธิของลูกค้าในฐานะเจ้าของข้อมูลส่วนบุคคล โดยบริษัทรับรองว่าจะเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของลูกค้าอย่างถูกต้อง โปร่งใส และเท่าที่จำเป็นสำหรับการให้บริการหรือปฏิบัติพันธกิจต่อท่านอย่างเต็มประสิทธิภาพ พร้อมทั้งปฏิบัติตามกฎหมายที่เกี่ยวข้องด้วยมาตรฐานการรักษาความปลอดภัยที่ดีที่สุด
              </p>
            </div>

            <h2>จุดประสงค์ของนโยบายความเป็นส่วนตัว</h2>
            <p>
              บริษัทประกาศนโยบายฉบับนี้เพื่อแจ้งลูกค้า ("ลูกค้า") ถึงเงื่อนไขเกี่ยวกับการเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลที่บริษัทจำเป็นต้องดำเนินการ
            </p>

            <h2>การยอมรับนโยบายข้อมูลส่วนบุคคลฉบับนี้</h2>
            <p>
              เมื่อลูกค้าติดต่อมายังบริษัท เพื่อสอบถามข้อมูลข่าวสารผ่านช่องทางต่าง ๆ ซึ่งอาจรวมถึงช่องทางการติดต่อผ่านเว็บไซต์หรือผ่านช่องทางอื่น รวมถึงเมื่อลูกค้าตกลงเข้าทำสัญญา และ/หรือเอกสารธุรกรรมใด ๆ กับบริษัท บริษัทจะถือว่า ลูกค้ายอมรับและรับทราบเงื่อนไขการประมวลผลข้อมูลส่วนบุคคลที่บริษัทประกาศในนโยบายฉบับนี้ทั้งหมด และตราบที่ลูกค้ายังคงมีความสัมพันธ์ทางการค้ากับบริษัทอยู่ บริษัทจะถือว่า ลูกค้ายอมรับนโยบายฉบับนี้และฉบับแก้ไขทั้งหมดเสมอ
            </p>

            <h2>การเปลี่ยนแปลงนโยบายข้อมูลส่วนบุคคล</h2>
            <p>
              ทั้งนี้ ทางบริษัทอาจปรับปรุงนโยบายฉบับนี้ตามแต่ละระยะเวลาเพื่อให้สอดคล้องกับกฎหมาย ข้อบังคับที่เกี่ยวข้อง และให้สอดคล้องกับการให้บริการต่าง ๆ ของบริษัทที่ให้แก่ลูกค้า ทั้งนี้ บริษัทจะแจ้งให้ลูกค้าทราบถึงการเปลี่ยนแปลงด้วยการประกาศนโยบายฉบับปรับปรุงผ่านช่องทางการติดต่อต่าง ๆ ของบริษัท
            </p>

            <h2>นิยามและขอบเขตข้อมูลส่วนบุคคลที่บริษัทประมวลผล</h2>
            <p>
              ข้อมูลส่วนบุคคล หมายถึง ข้อมูลเกี่ยวกับบุคคลซึ่งทำให้สามารถระบุตัวบุคคลนั้นได้ไม่ว่าทางตรงหรือทางอ้อมตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 และที่จะมีการแก้ไขเพิ่มเติมและกฎหมายอื่นที่เกี่ยวข้อง ทั้งนี้เพื่อหลีกเลี่ยงข้อสงสัย "ข้อมูลส่วนบุคคล" ภายใต้นโยบายฉบับนี้หมายความรวมถึง ข้อมูลส่วนบุคคลของตัวแทนผู้มีอำนาจของลูกค้าที่เป็นนิติบุคคล ("ตัวแทน")
            </p>
            <p>
              สำหรับการประมวลผลข้อมูลส่วนบุคคลของลูกค้าของบริษัท ให้รวมถึงการประมวลผลข้อมูลส่วนบุคคลของของกรรมการผู้มีอำนาจลงนาม และ/หรือตัวแทนผู้ได้รับมอบหมาย หรือมอบอำนาจจากลูกค้าในการติดต่อประสานงานกับบริษัท หรือพนักงานอื่นใดที่มีส่วนเกี่ยวข้องในการใช้บริการของบริษัท โดยลูกค้าดังกล่าว
            </p>

            <h2>แหล่งที่มาของข้อมูลส่วนบุคคลที่บริษัทจะประมวลผล</h2>
            <p>บริษัทอาจได้รับข้อมูลส่วนบุคคลของลูกค้าจากแหล่งที่มา ดังนี้</p>
            <ol>
              <li>ได้รับโดยตรงจากลูกค้า ที่ติดต่อหรือนำส่งมายังบริษัท ผ่านแต่ละช่องทางการติดต่อ การเข้าทำสัญญา หรือเอกสารธุรกรรมต่าง ๆ</li>
              <li>ข้อมูลส่วนบุคคลที่บริษัทอาจได้รับจากข้อมูลสาธารณะ (Public Records) และที่ไม่ใช่สาธารณะ (Non-Public Records) ที่บริษัทสิทธิเก็บรวบรวมได้ตามกฎหมาย หรือข้อมูลส่วนบุคคลที่บริษัทอาจได้รับจากบุคคลอื่นที่อาจให้คำแนะนำมา ซึ่งในกรณีดังกล่าวบริษัทจะแจ้งให้ท่านทราบถึงแหล่งที่มาของข้อมูลดังกล่าว</li>
            </ol>

            <h2>ข้อมูลส่วนบุคคลที่มีการประมวลผล</h2>
            <p>ในระหว่างการติดต่อสื่อสาร และประสานงาน ในการทำธุรกรรมระหว่างบริษัทและลูกค้า บริษัทจำเป็นต้องเก็บ รวบรวม ใช้ และประมวลผลข้อมูลส่วนบุคคล ดังต่อไปนี้</p>
            <ol>
              <li><strong>ข้อมูลการติดต่อ</strong> ได้แก่ ชื่อนามสกุล และข้อมูลการติดต่อของตัวแทนของลูกค้านิติบุคคล (เช่น เบอร์โทรศัพท์ อีเมล สถานที่ติดต่อ) รวมถึงข้อมูลการแสดงตนของตัวแทนของลูกค้านิติบุคคลดังกล่าว ได้แก่ สำเนาบัตรประจำตัวประชาชน หรือสำเนาหนังสือเดินทางเพื่อประกอบการลงนามและทำสัญญา</li>
              <li><strong>ข้อมูลส่วนบุคคลของพนักงาน</strong> ที่จะเป็นผู้ดำเนินการใช้บริการระบบ และผลิตภัณฑ์ของบริษัท ซึ่งอาจรวมถึงข้อมูลชื่อนามสกุลเบอร์โทรศัพท์ อีเมล ที่ต้องใช้สำหรับการลงทะเบียนเป็นลูกค้าหรือผู้ใช้บริการ</li>
              <li><strong>ข้อมูลทางเทคนิค</strong> ที่ระบบของบริษัทอาจเก็บรวบรวมเกี่ยวกับการใช้งานระบบอิเล็กทรอนิกส์ของบริษัท หรือใช้เพื่อเชื่อมต่อกับระบบของบริษัท ได้แก่ หมายเลขไอพี (IP Address) ประเภทของโปรแกรมบราวเซอร์ (Browser) ข้อมูล Username / Password และ Log-in Logs</li>
              <li><strong>ข้อมูลส่วนบุคคลอื่น</strong> ที่อาจมีการส่งต่อเปิดเผยระหว่างการติดต่อสื่อสารที่ลูกค้าอาจมีกับบริษัท</li>
            </ol>

            <h2>วัตถุประสงค์และระยะเวลาการประมวลผลข้อมูลส่วนบุคคล</h2>
            <p>บริษัทจะเก็บ รวบรวม ใช้ข้อมูลส่วนบุคคลทั้งหมดของลูกค้า เพื่อวัตถุประสงค์ดังต่อไปนี้</p>
            <ol>
              <li>กรติดต่อสื่อสารเพื่อให้ข้อมูลที่ลูกค้าอาจร้องขอ หรือติดต่อเพื่อขอรับจากบริษัท</li>
              <li>การปฏิบัติสิทธิและหน้าที่ของบริษัทภายใต้สัญญาที่บริษัทลงนามกับลูกค้า</li>
              <li>การคุ้มครองสิทธิประโยชน์อันชอบด้วยกฎหมายของบริษัท</li>
              <li>เพื่อการพัฒนาความสัมพันธ์อันดีระหว่างบริษัทและลูกค้า</li>
              <li>กรณีที่ลูกค้าให้ความยินยอมโดยเฉพาะแก่บริษัท บริษัทอาจดำเนินการประมวลผลข้อมูลส่วนบุคคลเพื่อวัตถุประสงค์เฉพาะอื่น</li>
            </ol>

            <h3>ระยะเวลาการเก็บรักษาข้อมูลส่วนบุคคล</h3>
            <p>
              บริษัทมีความจำเป็นในการเก็บรักษาข้อมูลส่วนบุคคลของลูกค้า เป็นระยะเวลาเท่าที่จำเป็นเพื่อวัตถุประสงค์ซึ่งได้ระบุไว้ในนโยบายฉบับนี้ ทั้งนี้ บริษัทจะอ้างอิงหลักเกณฑ์ที่ใช้กำหนดระยะเวลาเก็บ ดังนี้ (ก) บริษัทจะเก็บรักษาข้อมูลส่วนบุคคลของลูกค้าไว้ตลอดระยะเวลาที่บริษัทยังมีความสัมพันธ์กับลูกค้า และ (ข) อาจเก็บต่อไปตามระยะเวลาที่จำเป็นเพื่อการปฏิบัติตามกฎหมายหรือตามอายุความทางกฎหมาย
            </p>

            <h2>การเปิดเผยหรือส่งต่อข้อมูลส่วนบุคคลของลูกค้า</h2>
            <p>โดยหลักการข้อมูลส่วนบุคคลของลูกค้าจะไม่ถูกเปิดเผยออกไปให้แก่ บุคคลภายนอก แต่ในกรณีที่จำเป็น บริษัทอาจต้องเปิดเผยและ/หรือส่งต่อข้อมูลส่วนบุคคลของลูกค้าให้แก่บุคคลภายนอก ดังนี้</p>
            <ol>
              <li>เปิดเผยให้แก่ผู้ให้บริการภายนอกของบริษัท รวมถึงแต่ไม่จำกัดเพียงบริษัทในเครือ บริษัทผู้รับเหมาช่วง บริษัทที่ปรึกษา หรือบริษัทตรวจสอบบัญชี</li>
              <li>เปิดเผยตามหน้าที่ที่บริษัทมีตามกฎหมายที่เกี่ยวข้อง ให้แก่หน่วยงานภาครัฐต่าง ๆ</li>
            </ol>

            <h2>สิทธิของลูกค้าในฐานะเจ้าของข้อมูล</h2>
            <p>บริษัทเคารพสิทธิเกี่ยวข้องกับข้อมูลส่วนบุคคลที่ลูกค้ามีตามกฎหมายที่เกี่ยวข้อง โดยลูกค้าสามารถขอใช้สิทธิต่าง ๆ ดังนี้ ได้ภายใต้ข้อกำหนดของกฎหมายและนโยบายที่กำหนดไว้</p>
            <ol>
              <li><strong>สิทธิขอถอนความยินยอม</strong> หากลูกค้าได้ให้ความยินยอมให้บริษัท เก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคล</li>
              <li><strong>สิทธิขอเข้าถึงข้อมูล</strong> ของลูกค้าที่อยู่ในความรับผิดชอบของบริษัท</li>
              <li><strong>สิทธิขอถ่ายโอนข้อมูล</strong> ในกรณีที่บริษัทได้ทำให้ข้อมูลนั้นอยู่ในรูปแบบที่สามารถอ่านหรือใช้งานโดยทั่วไปได้</li>
              <li><strong>สิทธิขอคัดค้าน</strong> ในเวลาใดก็ได้</li>
              <li><strong>สิทธิขอให้ลบหรือทำลายข้อมูล</strong> หรือทำให้เป็นข้อมูลที่ไม่สามารถระบุตัวลูกค้าได้</li>
              <li><strong>สิทธิขอให้ระงับการใช้ข้อมูลชั่วคราว</strong> ในกรณีที่บริษัทอยู่ระหว่างตรวจสอบ</li>
              <li><strong>สิทธิขอให้แก้ไขข้อมูล</strong> ให้ถูกต้อง เป็นปัจจุบัน สมบูรณ์ และไม่ก่อให้เกิดความเข้าใจผิด</li>
              <li><strong>สิทธิร้องเรียนต่อหน่วยงานผู้มีอำนาจ</strong> หากลูกค้าเชื่อว่า การเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลเป็นการกระทำที่ฝ่าฝืนกฎหมาย</li>
            </ol>

            <h2>เจ้าหน้าที่ / คณะทำงานคุ้มครองข้อมูลส่วนบุคคล</h2>
            <p>
              บริษัทได้แต่งตั้งเจ้าหน้าที่ / คณะทำงานคุ้มครองข้อมูลส่วนบุคคล (Data Protection Officer : DPO) เพื่อตรวจสอบการดำเนินการของบริษัทที่เกี่ยวกับการเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลให้สอดคล้องกับพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 รวมถึงกฎหมายที่เกี่ยวข้องกับการคุ้มครองข้อมูลส่วนบุคคล
            </p>

            <div className="contact-box">
              <h3 style={{ marginTop: 0, color: '#1e40af' }}>ติดต่อเรา</h3>
              <p><strong>ชื่อบริษัท:</strong> บริษัท อิกไนท ไอเดีย จำกัด</p>
              <p><strong>ที่อยู่:</strong> 1-7 ชั้น 8 ห้องเลขที่ 0871 อาคารซิลลิคเฮ้าส์ ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500</p>
              <p><strong>โทรศัพท์ติดต่อ:</strong> +662-231-8088</p>
              <p><strong>อีเมล:</strong> <a href="mailto:dpo@ignite-idea.com" className="text-blue-600 hover:text-blue-800 font-semibold">dpo@ignite-idea.com</a></p>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2025 IGNITE IDEA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
