"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Calendar, ArrowRight } from 'lucide-react'
import { FloatingChatButton } from "@/components/floating-chat-button"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    id: 4,
    slug: "unlock-productivity-salesforce-outlook-integration-guide-2025",
    title: "Unlock Productivity: Salesforce Outlook Integration Guide 2025",
    excerpt: "Master the art of seamless CRM-email integration and transform your sales workflow with our comprehensive 2025 guide.",
    image: "/salesforce-outlook-integration-dashboard.jpg",
    date: "March 20, 2025",
    category: "Productivity Guide",
  },
  {
    id: 1,
    slug: "salesforce-outlook-integration-2025",
    title: "Everything You Need to Know About Salesforce Outlook Integration in 2025",
    excerpt: "Discover how to seamlessly connect Salesforce with Outlook to boost productivity and streamline your workflow in 2025.",
    image: "/salesforce-outlook-integration-dashboard.jpg",
    date: "March 15, 2025",
    category: "Integration",
  },
  {
    id: 2,
    slug: "salesforce-summer-25-release",
    title: "Salesforce Summer '25 Release: What You Need to Know",
    excerpt: "Explore the latest features and updates from the Salesforce Summer '25 release that will transform your CRM experience.",
    image: "/salesforce-summer-release-features.jpg",
    date: "March 10, 2025",
    category: "Updates",
  },
  {
    id: 3,
    slug: "why-hire-salesforce-integration-consultant",
    title: "Why Should You Hire a Salesforce Integration Consultant?",
    excerpt: "Learn why partnering with a Salesforce integration consultant is essential for maximizing your CRM investment and achieving seamless integrations.",
    image: "/salesforce-consultant-business-meeting.jpg",
    date: "March 5, 2025",
    category: "Consulting",
  },
]

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
      title: "Resources & Insights",
      subtitle: "Expert guidance, industry trends, and best practices for CRM success",
    },
    blog: {
      readMore: "Read More",
      latestPosts: "Latest Blog Posts",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Have questions about our resources or need expert CRM guidance?",
      button: "Contact Us Today",
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
      title: "ทรัพยากรและข้อมูลเชิงลึก",
      subtitle: "คำแนะนำจากผู้เชี่ยวชาญ แนวโน้มอุตสาหกรรม และแนวปฏิบัติที่ดีที่สุดสำหรับความสำเร็จของ CRM",
    },
    blog: {
      readMore: "อ่านเพิ่มเติม",
      latestPosts: "บทความล่าสุด",
    },
    contact: {
      title: "ติดต่อเรา",
      subtitle: "มีคำถามเกี่ยวกับทรัพยากรของเราหรือต้องการคำแนะนำ CRM ที่เชี่ยวชาญ?",
      button: "ติดต่อเราทันที",
    },
  },
}

export default function ResourcesPage() {
  const [lang, setLang] = useState<"en" | "th">("en")
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <FloatingChatButton onClick={() => window.location.href = '/#contact-us'} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm">
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
                    <div className="w-80 backdrop-blur-xl bg-white/95 rounded-lg shadow-xl border border-gray-200 py-2">
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
              <Link href="/resources" className="text-blue-600 font-semibold">
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
                <Link href="/resources" className="text-blue-600 font-semibold px-4 py-2">
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

      {/* Hero Section with Glass Effect */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-500" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTZjMC02LjYyNyA1LjM3My0xMiAxMiAxMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMi0xMi01LjM3My0xMi0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 shadow-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">{t.hero.title}</h1>
            <p className="text-2xl text-white/90 leading-relaxed">{t.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">{t.blog.latestPosts}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/resources/${post.slug}`}>
                <div className="group h-full rounded-2xl bg-white border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-[1.02]">
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
                      onLoad={(e) => {
                        e.currentTarget.classList.remove("opacity-0")
                        e.currentTarget.classList.add("opacity-100")
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 rounded-full text-xs font-bold bg-blue-600 text-white shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                      <span>{t.blog.readMore}</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-500" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTIgMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">{t.contact.title}</h2>
            <p className="text-2xl text-white/90 leading-relaxed mb-8">{t.contact.subtitle}</p>
            <Link href="/#contact-us">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-6 rounded-full shadow-xl">
                {t.contact.button}
              </Button>
            </Link>
          </div>
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
