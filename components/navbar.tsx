"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useLanguage } from "@/context/language-context"

const translations = {
  en: {
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
  th: {
    home: "หน้าแรก",
    service: "บริการของเรา",
    services: [
      { name: "การจัดการ Lead to Cash (Order)", href: "/service/lead-to-cash-mgn" },
      { name: "การดำเนินการขายภาคสนาม", href: "/service/field-sales" },
      { name: "การรวมข้อมูลลูกค้า 360 องศา", href: "/service/customer-360" },
      { name: "ศูนย์บริการลูกค้ายุคใหม่", href: "/service/customer-services-centre" },
      { name: "Salesforce Manage Service", href: "/service/salesforce-manage-service" },
    ],
    resources: "คลังทรัพยากร",
    about: "เกี่ยวกับเรา",
    schedule: "นัดที่ปรึกษา",
  },
}

export function Navbar() {
  const { lang, setLang } = useLanguage()
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
    <nav className={`fixed top-0 left-0 right-0 z-[9999] pointer-events-auto backdrop-blur-xl border-b shadow-sm transition-all duration-300 ${
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
              <button
                onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                className={`transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0 font-[inherit] text-[inherit] ${
                isDarkBg || isScrolled
                  ? 'text-blue-100 hover:text-white' 
                  : 'text-gray-700 hover:text-blue-600'
              } ${currentPath.startsWith('/service') ? 'font-semibold' : ''}`}>
                {t.service}
                <ChevronDown className={`w-4 h-4 transition-transform ${serviceDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {serviceDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[480px]">
                  {/* invisible bridge prevents mouseLeave from firing in the gap */}
                  <div className="h-3 w-full" />
                  <div className="w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
                    <div className="space-y-3">
                      {t.services.map((item, idx) => (
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
