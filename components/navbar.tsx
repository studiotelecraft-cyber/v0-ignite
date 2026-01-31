"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'

const translations = {
  en: {
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
          { name: "Financial Planning & Analysis (FP&A)", href: "/service/financial-planning-analysis" },
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
  th: {
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
}

export function Navbar() {
  const [lang, setLang] = useState<"en" | "th">("en")
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDarkBg, setIsDarkBg] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)
      
      const navbar = document.querySelector('nav')
      if (!navbar) return

      const navbarHeight = navbar.getBoundingClientRect().height
      const elementBelow = document.elementFromPoint(
        window.innerWidth / 2,
        navbarHeight + 10
      )

      if (elementBelow) {
        const bgColor = window.getComputedStyle(elementBelow).backgroundColor
        const rgb = bgColor.match(/\d+/g)
        if (rgb) {
          const [r, g, b] = rgb.map(Number)
          const brightness = (r * 299 + g * 587 + b * 114) / 1000
          setIsDarkBg(brightness > 200 || scrollY > 50)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentPath = pathname || '/'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b shadow-sm transition-all duration-300 ${
      isDarkBg || isScrolled
        ? 'bg-blue-900/90 border-blue-800' 
        : 'bg-white/80 border-gray-200'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/ignite-logo.png" alt="IGNITE IDEA" className="h-12 w-12" />
            <div className={`text-xl font-bold transition-colors ${
              isDarkBg || isScrolled ? 'text-white' : 'text-gray-900'
            }`}>
              IGNITE IDEA
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className={`transition-colors ${
                isDarkBg || isScrolled
                  ? 'text-blue-100 hover:text-white' 
                  : 'text-gray-700 hover:text-blue-600'
              } ${currentPath === '/' ? 'font-semibold' : ''}`}
            >
              {t.home}
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setServiceDropdownOpen(true)}
              onMouseLeave={() => setServiceDropdownOpen(false)}
            >
              <Link href="/service/crm" className={`transition-colors flex items-center gap-1 ${
                isDarkBg || isScrolled
                  ? 'text-blue-100 hover:text-white' 
                  : 'text-gray-700 hover:text-blue-600'
              } ${currentPath.startsWith('/service') ? 'font-semibold' : ''}`}>
                {t.service}
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
                            {t.serviceGroups.group1.title}
                          </h3>
                        </div>
                        <div className="border-b-2 border-orange-400 mb-4"></div>
                        <div className="space-y-3">
                          {t.serviceGroups.group1.items.map((item, idx) => (
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
                            {t.serviceGroups.group2.title}
                          </h3>
                        </div>
                        <div className="border-b-2 border-blue-400 mb-4"></div>
                        <div className="space-y-3">
                          {t.serviceGroups.group2.items.map((item, idx) => (
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
                            {t.serviceGroups.group3.title}
                          </h3>
                        </div>
                        <div className="border-b-2 border-green-400 mb-4"></div>
                        <div className="space-y-3">
                          {t.serviceGroups.group3.items.map((item, idx) => (
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
                      <Link
                        href="/#contact"
                        className="px-6 py-2.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
                      >
                        Schedule Consultation
                      </Link>
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
            <Link 
              href="/resources" 
              className={`transition-colors ${
                isDarkBg || isScrolled
                  ? 'text-blue-100 hover:text-white' 
                  : 'text-gray-700 hover:text-blue-600'
              } ${currentPath === '/resources' ? 'font-semibold' : ''}`}
            >
              {t.resources}
            </Link>
            <Link 
              href="/about" 
              className={`transition-colors ${
                isDarkBg || isScrolled
                  ? 'text-blue-100 hover:text-white' 
                  : 'text-gray-700 hover:text-blue-600'
              } ${currentPath === '/about' ? 'font-semibold' : ''}`}
            >
              {t.about}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-1 rounded-full p-1 ${
              isDarkBg || isScrolled ? 'bg-blue-800/50' : 'bg-gray-100'
            }`}>
              <button
                onClick={() => setLang("th")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  lang === "th" 
                    ? (isDarkBg || isScrolled)
                      ? "bg-blue-600 text-white shadow-md" 
                      : "bg-white text-blue-600 shadow-md"
                    : (isDarkBg || isScrolled)
                      ? "text-blue-200 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                }`}
              >
                TH
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  lang === "en" 
                    ? (isDarkBg || isScrolled)
                      ? "bg-blue-600 text-white shadow-md" 
                      : "bg-white text-blue-600 shadow-md"
                    : (isDarkBg || isScrolled)
                      ? "text-blue-200 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isDarkBg || isScrolled
                  ? 'text-white hover:bg-blue-800/50' 
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden border-t py-4 ${
            isDarkBg || isScrolled ? 'bg-blue-900/95 border-blue-800' : 'bg-white border-gray-200'
          }`}>
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`px-4 py-2 transition-colors ${
                  isDarkBg || isScrolled ? 'text-blue-100 hover:text-white' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {t.home}
              </Link>
              <Link 
                href="/resources" 
                className={`px-4 py-2 transition-colors ${
                  isDarkBg || isScrolled ? 'text-blue-100 hover:text-white' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {t.resources}
              </Link>
              <Link 
                href="/about" 
                className={`px-4 py-2 transition-colors ${
                  isDarkBg || isScrolled ? 'text-blue-100 hover:text-white' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {t.about}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
