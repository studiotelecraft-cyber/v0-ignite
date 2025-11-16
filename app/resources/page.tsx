"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Calendar, ArrowRight, Sparkles, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { FloatingChatButton } from "@/components/floating-chat-button"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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
  {
    id: 5,
    slug: "crm-best-practices-2025",
    title: "CRM Best Practices for 2025: A Complete Guide",
    excerpt: "Discover the essential CRM strategies and best practices that will drive your business success in 2025.",
    image: "/images/crm-best-practices-hero.jpg",
    date: "March 1, 2025",
    category: "Best Practices",
  },
  {
    id: 7,
    slug: "marketing-automation-trends-2026",
    title: "Marketing Automation Trends to Watch in 2026",
    excerpt: "Stay ahead of the curve with these marketing automation trends that are shaping the future of digital marketing.",
    image: "/images/marketing-automation-trends-hero.jpg",
    date: "February 25, 2025",
    category: "Marketing",
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
      showingResults: "Showing",
      of: "of",
      articles: "articles",
    },
    quote: {
      title: "Let's Ignite Your Ideas",
      subtitle: "Your business has unlimited potential. Let's unlock it together.",
      button: "Schedule Consultant",
    },
    consultDialog: {
      title: "รับสิทธิ์ปรึกษาฟรี 30 นาที",
      subtitle: "Free 30-Minute Consultation",
      name: "Name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      message: "Message",
      submit: "Submit",
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
      resources: "คลังทรัพยากร",
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
      showingResults: "แสดง",
      of: "จาก",
      articles: "บทความ",
    },
    quote: {
      title: "มาจุดประกายไอเดียของคุณ",
      subtitle: "ธุรกิจของคุณมีศักยภาพไร้ขีดจำกัด มาปลดล็อกมันไปด้วยกัน",
      button: "นัดที่ปรึกษา",
    },
    consultDialog: {
      title: "รับสิทธิ์ปรึกษาฟรี 30 นาที",
      subtitle: "Free 30-Minute Consultation",
      name: "ชื่อ",
      email: "อีเมล",
      phone: "เบอร์โทรศัพท์",
      company: "บริษัท",
      message: "ข้อความ",
      submit: "ส่ง",
    },
    contact: {
      title: "ติดต่อเรา",
      subtitle: "มีคำถามเกี่ยวกับทรัพยากรของเราหรือต้องการคำแนะนำ CRM ที่เชี่ยวชาญ?",
      button: "ติดต่อเราทันที",
    },
  },
}

const POSTS_PER_PAGE = 6

export default function ResourcesPage() {
  const [lang, setLang] = useState<"en" | "th">("en")
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isDarkBg, setIsDarkBg] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsDarkBg(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = blogPosts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 600, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      <FloatingChatButton onClick={() => setScheduleModalOpen(true)} />

      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b shadow-sm transition-colors duration-300 ${
        isDarkBg 
          ? 'bg-blue-900/90 border-blue-800' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <img src="/images/ignite-logo.png" alt="IGNITE IDEA" className="h-12 w-12" />
              <div className={`text-xl font-bold transition-colors ${
                isDarkBg ? 'text-white' : 'text-gray-900'
              }`}>IGNITE IDEA</div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className={`transition-colors ${
                isDarkBg ? 'text-blue-100 hover:text-white' : 'text-gray-700 hover:text-blue-600'
              }`}>
                {t.nav.home}
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setServiceDropdownOpen(true)}
                onMouseLeave={() => setServiceDropdownOpen(false)}
              >
                <Link
                  href="/service/crm"
                  className={`transition-colors flex items-center gap-1 ${
                    isDarkBg ? 'text-blue-100 hover:text-white' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {t.nav.service}
                  <ChevronDown className="w-4 h-4" />
                </Link>
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
              <Link href="/resources" className={`font-semibold ${
                isDarkBg ? 'text-white' : 'text-blue-600'
              }`}>
                {t.nav.resources}
              </Link>
              <Link href="/about" className={`transition-colors ${
                isDarkBg ? 'text-blue-100 hover:text-white' : 'text-gray-700 hover:text-blue-600'
              }`}>
                {t.nav.about}
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-1 rounded-full p-1 ${
                isDarkBg ? 'bg-blue-800/50' : 'bg-gray-100'
              }`}>
                <button
                  onClick={() => setLang("th")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    lang === "th" 
                      ? isDarkBg
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-white text-blue-600 shadow-md" 
                      : isDarkBg
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
                      ? isDarkBg
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-white text-blue-600 shadow-md" 
                      : isDarkBg
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
                  isDarkBg
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
              isDarkBg ? 'bg-blue-900/95 border-blue-800' : 'bg-white border-gray-200'
            }`}>
              <div className="flex flex-col space-y-4">
                <Link href="/" className={`px-4 py-2 transition-colors ${
                  isDarkBg ? 'text-blue-100 hover:text-white' : 'text-gray-700 hover:text-blue-600'
                }`}>
                  {t.nav.home}
                </Link>
                <Link href="/resources" className={`px-4 py-2 font-semibold ${
                  isDarkBg ? 'text-white' : 'text-blue-600'
                }`}>
                  {t.nav.resources}
                </Link>
                <Link href="/about" className={`px-4 py-2 transition-colors ${
                  isDarkBg ? 'text-blue-100 hover:text-white' : 'text-gray-700 hover:text-blue-600'
                }`}>
                  {t.nav.about}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section 
        className="h-screen relative overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ResourceIMG_001-sk3v2Io6cqMsvlRJkDV5fEeiMzFdE6.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-blue-950/70 to-purple-950/80" />
        
        <div className="container mx-auto max-w-6xl text-center relative z-10 px-6">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 drop-shadow-2xl animate-fade-in">{t.hero.title}</h1>
          <p className="text-2xl md:text-3xl text-blue-100/90 drop-shadow-lg leading-relaxed">{t.hero.subtitle}</p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      </section>

      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {t.blog.latestPosts}
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 mx-auto rounded-full mb-6" />
            <p className="text-gray-600 text-lg">
              {t.blog.showingResults} {startIndex + 1}-{Math.min(endIndex, blogPosts.length)} {t.blog.of} {blogPosts.length} {t.blog.articles}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentPosts.map((post, index) => (
              <Link key={post.id} href={`/resources/${post.slug}`}>
                <div 
                  className="group h-full rounded-3xl bg-white border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:scale-[1.03] hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-all line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all pt-2">
                      <span>{t.blog.readMore}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  <div className="h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent group-hover:via-cyan-400 transition-all" />
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-3 rounded-xl bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-12 h-12 rounded-xl font-bold transition-all ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-3 rounded-xl bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
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
            {t.quote.title}
          </h2>
          
          <p 
            className="text-2xl md:text-3xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-12"
            style={{
              textShadow: '0 0 15px rgba(147, 197, 253, 0.7), 0 0 30px rgba(147, 197, 253, 0.5), 0 0 45px rgba(147, 197, 253, 0.3)'
            }}
          >
            {t.quote.subtitle}
          </p>

          <Button 
            size="lg"
            onClick={() => setScheduleModalOpen(true)}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold text-xl px-12 py-7 rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-110 border-2 border-yellow-300"
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            {t.quote.button}
          </Button>
        </div>
      </section>

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
                  {t.consultDialog.title}
                </DialogTitle>
                <DialogDescription className="text-xl text-gray-700 leading-relaxed">
                  {t.consultDialog.subtitle}
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
                    {t.consultDialog.name}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    className="bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-900 placeholder:text-gray-400 h-14 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 font-semibold text-lg">
                    {t.consultDialog.email}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-900 placeholder:text-gray-400 h-14 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-900 font-semibold text-lg">
                    {t.consultDialog.phone}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-900 placeholder:text-gray-400 h-14 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-gray-900 font-semibold text-lg">
                    {t.consultDialog.company}
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    className="bg-white border-2 border-gray-200 focus:border-blue-400 text-gray-900 placeholder:text-gray-400 h-14 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  
                  
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-xl py-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  {t.consultDialog.submit}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="py-12 px-6 border-t border-gray-200 bg-slate-950">
        <div className="container mx-auto text-center text-gray-400">
          <p>© 2025 IGNITE IDEA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

<style jsx>{`
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
  
  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }
`}</style>
