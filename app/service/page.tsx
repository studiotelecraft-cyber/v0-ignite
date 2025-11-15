"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe, ArrowRight } from "lucide-react"
import Link from "next/link"

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
      title: "Our Services",
      subtitle: "Comprehensive CRM solutions designed to transform your business operations and drive growth.",
    },
    services: {
      crm: {
        title: "CRM Services",
        description:
          "CRM or Customer Relationship Management is a system that can help your organization build long-term relationships with customers and create opportunities to convert prospects into customers by presenting what targets are looking for.",
        question: "How can CRM help your organization?",
        features: [
          {
            title: "Customer data collection",
            subtitle: "Store customer and lead contact information",
            desc: "The problem of finding customer contact information when a salesperson is absent or has resigned will be solved if contact information is stored through a CRM system. In addition, the system can also assign rights to check, transfer customers and existing leads.",
          },
          {
            title: "Percent to close deal",
            subtitle: "Identify sales opportunities",
            desc: "Not every lead will become a customer. So how do we know what the estimated revenue for the month, quarter or year is? These problems will be solved when your organization starts using CRM.",
          },
          {
            title: "Access from all devices",
            subtitle: "Access through all devices",
            desc: "With the CRM system we provide, you can be confident that you can access information through computers, mobile phones, and tablets to ensure smooth operation.",
          },
        ],
        value:
          "We offer a comprehensive suite of CRM services designed to help businesses streamline operations, improve customer satisfaction, and achieve goals. Our team of experts will work with you to develop a custom CRM strategy that aligns with your business objectives and drives results.",
        benefits:
          "With our CRM services, you can streamline your business operations, improve customer satisfaction, and achieve your business goals. Whether you want to increase sales, increase customer loyalty, or improve operational efficiency, our team of experts can help your organization achieve your CRM objectives.",
        stats: [
          { value: "35%", label: "Increase successful sales rate" },
          { value: "32%", label: "Increase sales team efficiency" },
          { value: "34%", label: "Increase speed in closing sales" },
          { value: "45%", label: "Increase accuracy in revenue forecasting" },
        ],
        cta: "If you are interested in learning more about our CRM services and how they can benefit your business, please contact us today to schedule a consultation.",
      },
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
      title: "บริการของเรา",
      subtitle: "โซลูชัน CRM ที่ครอบคลุมที่ออกแบบมาเพื่อเปลี่ยนแปลงการดำเนินธุรกิจของคุณและขับเคลื่อนการเติบโต",
    },
    services: {
      crm: {
        title: "CRM Services",
        description:
          "CRM หรือ Customer Relationship Management เป็นระบบที่สามารถช่วยให้องค์กรคุณสร้างความสัมพันธ์ระยะยาวกับลูกค้า และสร้างโอกาสในการเปลี่ยนลูกค้าเป้าหมายเป็นลูกค้าด้วยการนำเสนอสิ่งที่เป้าหมายกำลังต้องการ",
        question: "CRM สามารถช่วยองค์กรของคุณด้านใดได้บ้าง",
        features: [
          {
            title: "Customer data collection",
            subtitle: "เก็บข้อมูลการติดต่อลูกค้า และลีด",
            desc: "ปัญหาในการหาข้อมูลติดต่อลูกค้าหากเซลล์ไม่อยู่หรือลาออกจะหมดไปหากเก็บข้อมูลการติดต่อลูกค้าผ่านระบบ CRM นอกจากนั้นระบบยังสามารถกำหนดสิทธิ์ตรวจสอบ โอน ลูกค้าและลีดที่มีอยู่ได้",
          },
          {
            title: "percent to close deal",
            subtitle: "ระบุโอกาสการขาย",
            desc: "ไม่ใช่ลีคทุกรายจะกลายมาเป็นลูกค้า แล้วเราจะรู้ได้อย่างไรว่าประมาณการรายได้ของเดือน ของไตรมาส หรือของปีนี้เป็นอย่างไรบ้าง ปัญหาเหล่านี้จะหมดไปหากองค์กรคุณเข้ามาใช้งาน CRM",
          },
          {
            title: "Access from all devices",
            subtitle: "เข้าถึงได้ผ่านทุกอุปกรณ์",
            desc: "ด้วยระบบ CRM ที่เราให้บริการ คุณสามารถมั่นใจได้ว่าขะสามารถเข้าถึงข้อมูลได้ผ่านทั้งคอมพิวเตอร์ มือถือ และ แท็บเล็ต เพื่อให้การทำงานเป็นไปได้อย่างราบรื่น",
          },
        ],
        value:
          "เรานำเสนอชุดบริการ CRM ที่ครอบคลุมซึ่งออกแบบมาเพื่อช่วยให้ธุรกิจปรับปรุงการดำเนินงาน ปรับปรุงความพึงพอใจของลูกค้า และบรรลุเป้าหมาย ทีมผู้เชี่ยวชาญของเราจะทำงานร่วมกับคุณเพื่อพัฒนากลยุทธ์ CRM แบบกำหนดเองที่สอดคล้องกับวัตถุประสงค์ทางธุรกิจของคุณและผลักดันผลลัพธ์",
        benefits:
          "ด้วยบริการ CRM ของเรา คุณสามารถปรับปรุงการดำเนินธุรกิจของคุณ ปรับปรุงความพึงพอใจของลูกค้า และบรรลุเป้าหมายทางธุรกิจของคุณ ไม่ว่าคุณจะต้องการเพิ่มยอดขาย เพิ่มความภักดีของลูกค้า หรือปรับปรุงประสิทธิภาพการดำเนินงาน ทีมผู้เชี่ยวชาญของเราสามารถช่วยให้องค์กรคุณบรรลุวัตถุประสงค์ CRM ที่วางไว้ได้",
        stats: [
          { value: "35%", label: "เพิ่มอัตราการขายได้สำเร็จ" },
          { value: "32%", label: "เพิ่มประสิทธิภาพให้แก่เซลล์" },
          { value: "34%", label: "เพิ่มความเร็วในการปิดการขาย" },
          { value: "45%", label: "เพิ่มแม่นยำในการคาดการณ์รายได้" },
        ],
        cta: "หากคุณสนใจที่จะเรียนรู้เพิ่มเติมเกี่ยวกับบริการ CRM ของเราและวิธีที่บริการเหล่านั้นจะเป็นประโยชน์ต่อธุรกิจของคุณ โปรดติดต่อเราวันนี้เพื่อนัดหมายเวลารับคำปรึกษา",
      },
    },
  },
}

export default function ServicePage() {
  const [lang, setLang] = useState<"en" | "th">("en")
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false)

  const t = translations[lang]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <img src="/images/ignite-logo.png" alt="IGNITE IDEA" className="h-12 w-12" />
              <div className="text-xl font-bold text-gray-900">IGNITE IDEA</div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/#home" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t.nav.home}
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setServiceDropdownOpen(true)}
                onMouseLeave={() => setServiceDropdownOpen(false)}
              >
                <Link href="/service" className="text-blue-600 font-semibold flex items-center gap-1">
                  {t.nav.service}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {serviceDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 backdrop-blur-xl bg-white rounded-lg shadow-xl border border-gray-200 py-2">
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
                )}
              </div>
              <Link href="/#resources" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t.nav.resources}
              </Link>
              <Link href="/#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t.nav.about}
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setLang(lang === "en" ? "th" : "en")}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{lang === "en" ? "TH" : "EN"}</span>
              </button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">{t.nav.schedule}</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">{t.hero.title}</h1>
          <p className="text-xl text-gray-600 leading-relaxed">{t.hero.subtitle}</p>
        </div>
      </section>

      {/* CRM Services Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t.services.crm.title}</h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-12">{t.services.crm.description}</p>

          <h3 className="text-3xl font-bold text-blue-600 mb-8">{t.services.crm.question}</h3>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {t.services.crm.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-blue-600 font-semibold mb-3">{feature.subtitle}</p>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 md:p-12 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{t.services.crm.value}</p>
            <p className="text-lg text-gray-700 leading-relaxed">{t.services.crm.benefits}</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {t.services.crm.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-center text-white"
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm leading-relaxed">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <p className="text-lg leading-relaxed mb-6">{t.services.crm.cta}</p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              {t.nav.schedule}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2025 IGNITE IDEA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
