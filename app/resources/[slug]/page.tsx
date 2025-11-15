"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from 'next/navigation'
import { Menu, X, ChevronDown, Calendar, ArrowLeft, Share2, User, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { FloatingChatButton } from "@/components/floating-chat-button"

const blogContent = {
  "salesforce-outlook-integration-2025": {
    title: "Everything You Need to Know About Salesforce Outlook Integration in 2025",
    date: "March 15, 2025",
    category: "Integration",
    image: "/salesforce-outlook-integration-dashboard.jpg",
    content: `
      <p>In today's fast-paced business environment, seamless integration between your CRM and email platform is no longer optional—it's essential. Salesforce Outlook Integration bridges the gap between these two critical tools, enabling your team to work more efficiently and make data-driven decisions.</p>

      <h2>Why Salesforce Outlook Integration Matters</h2>
      <p>Email remains the primary communication channel for most businesses, while Salesforce serves as the central hub for customer data. By integrating these platforms, you eliminate the need to switch between applications, reduce manual data entry, and ensure that all customer interactions are automatically logged and accessible.</p>

      <h2>Key Benefits of Integration</h2>
      <ul>
        <li><strong>Automated Activity Logging:</strong> Every email, meeting, and task is automatically synced to Salesforce, providing a complete view of customer interactions.</li>
        <li><strong>Real-Time Data Access:</strong> View Salesforce records, opportunities, and contact information directly within Outlook without switching applications.</li>
        <li><strong>Enhanced Productivity:</strong> Reduce time spent on administrative tasks and focus on building customer relationships.</li>
        <li><strong>Improved Collaboration:</strong> Ensure your entire team has access to the same up-to-date information.</li>
      </ul>

      <h2>Integration Methods in 2025</h2>
      <p>Salesforce offers several integration options to suit different business needs:</p>
      
      <h3>1. Salesforce Inbox</h3>
      <p>The newest and most advanced integration option, Salesforce Inbox provides a seamless experience with AI-powered insights, mobile optimization, and advanced analytics. It works as both an Outlook add-in and a standalone application.</p>

      <h3>2. Einstein Activity Capture</h3>
      <p>This server-side integration automatically syncs emails and events between Outlook and Salesforce without requiring an add-in. It's ideal for organizations that want automatic syncing with minimal user interaction.</p>

      <h3>3. Outlook Integration (Classic)</h3>
      <p>While being phased out, the classic integration still serves many organizations well. However, we recommend migrating to Salesforce Inbox for access to the latest features and continued support.</p>

      <h2>Best Practices for Implementation</h2>
      <p>Successfully implementing Salesforce Outlook Integration requires careful planning:</p>

      <ul>
        <li><strong>Define Clear Objectives:</strong> Identify what you want to achieve with the integration—whether it's improving data quality, increasing adoption, or automating workflows.</li>
        <li><strong>Train Your Team:</strong> Invest in comprehensive training to ensure users understand how to leverage the integration effectively.</li>
        <li><strong>Establish Data Governance:</strong> Create guidelines for what should be synced to Salesforce to maintain data quality.</li>
        <li><strong>Monitor and Optimize:</strong> Regularly review adoption metrics and user feedback to continuously improve the integration.</li>
      </ul>

      <h2>Common Challenges and Solutions</h2>
      <p>While the integration offers tremendous benefits, organizations may face challenges:</p>

      <p><strong>Challenge:</strong> Users forgetting to use the integration</p>
      <p><strong>Solution:</strong> Implement change management strategies, provide ongoing training, and showcase quick wins to demonstrate value.</p>

      <p><strong>Challenge:</strong> Data synchronization issues</p>
      <p><strong>Solution:</strong> Work with a certified consultant to properly configure sync settings and establish data governance policies.</p>

      <h2>Ready to Transform Your Sales Workflow?</h2>
      <p>Salesforce Outlook Integration isn't just a nice-to-have—it's a competitive advantage. Organizations that seamlessly connect their email and CRM see measurable improvements in productivity, data accuracy, and revenue growth. The question isn't whether you should integrate, but how quickly you can get started.</p>

      <p>Don't let technical complexity hold you back. Our certified Salesforce consultants at Ignite Idea have helped dozens of businesses successfully implement their unique workflows and requirements.</p>

      <h3>Take the first step today:</h3>
      <ul>
        <li>Schedule a free 30-minute consultation to discuss your specific needs</li>
        <li>Get a customized integration roadmap tailored to your business</li>
        <li>Start seeing results</li>
      </ul>

      <p><strong>Contact Ignite Idea Consult now – Let's turn your email into your most powerful sales tool.</strong></p>

      <p><strong>Call Us:</strong> +662-231-8088</p>
      <p><strong>Email:</strong> contact@igniteidea.com</p>
    `,
  },
  "salesforce-summer-25-release": {
    title: "Salesforce Summer '25 Release: What You Need to Know",
    date: "March 10, 2025",
    category: "Updates",
    image: "/salesforce-summer-release-features.jpg",
    content: `
      <p>The Salesforce Summer '25 Release is packed with innovative features designed to help businesses work smarter, faster, and more efficiently. From AI-powered enhancements to improved user experiences, this release continues Salesforce's commitment to delivering cutting-edge CRM capabilities.</p>

      <h2>Top Features You Can't Miss</h2>

      <h3>1. Einstein GPT Enhancements</h3>
      <p>Salesforce has significantly upgraded Einstein GPT with new natural language processing capabilities. Now you can generate more accurate email responses, create detailed customer summaries, and automate routine tasks with even greater precision.</p>

      <p><strong>Key improvements include:</strong></p>
      <ul>
        <li>Enhanced context awareness for more relevant AI suggestions</li>
        <li>Multi-language support expansion</li>
        <li>Improved integration with third-party data sources</li>
        <li>Real-time sentiment analysis in customer communications</li>
      </ul>

      <h3>2. Flow Builder Evolution</h3>
      <p>The Summer '25 release brings major updates to Flow Builder, making automation more accessible to admin-level users:</p>
      <ul>
        <li>Drag-and-drop interface improvements</li>
        <li>Pre-built flow templates for common use cases</li>
        <li>Enhanced debugging tools</li>
        <li>Better performance for complex flows</li>
      </ul>

      <h3>3. Dynamic Forms 2.0</h3>
      <p>Dynamic Forms get even more powerful with new conditional visibility rules, field dependencies, and layout options that adapt based on user roles and record types.</p>

      <h3>4. Enhanced Mobile Experience</h3>
      <p>The Salesforce mobile app receives a complete interface overhaul with:</p>
      <ul>
        <li>Faster load times</li>
        <li>Offline-first architecture</li>
        <li>Customizable home screens</li>
        <li>Voice-activated commands</li>
      </ul>

      <h2>Sales Cloud Updates</h2>

      <h3>Opportunity Scoring 2.0</h3>
      <p>The new AI-driven opportunity scoring model considers more factors than ever before, including historical data, industry benchmarks, and real-time market conditions.</p>

      <h3>Revenue Intelligence Enhancements</h3>
      <p>Get deeper insights into your sales pipeline with improved forecasting accuracy, deal risk indicators, and rep performance analytics.</p>

      <h2>Service Cloud Innovations</h2>

      <h3>Intelligent Case Routing</h3>
      <p>Cases are now automatically routed not just based on rules, but on agent expertise, workload, and predicted resolution time.</p>

      <h3>Self-Service Portal Upgrades</h3>
      <p>The customer self-service portal now features AI-powered search, video tutorials, and community integration for peer-to-peer support.</p>

      <h2>Marketing Cloud Advancements</h2>

      <h3>Journey Builder AI</h3>
      <p>Marketing journeys now leverage predictive AI to automatically adjust paths based on customer behavior, maximizing engagement and conversion rates.</p>

      <h3>Real-Time Personalization Engine</h3>
      <p>Deliver hyper-personalized content across all channels with the new real-time personalization engine that adapts messages based on the latest customer interactions.</p>

      <h2>Security and Compliance</h2>
      <p>Salesforce continues to prioritize security with new features including:</p>
      <ul>
        <li>Enhanced data encryption options</li>
        <li>Improved compliance reporting tools</li>
        <li>Advanced threat detection</li>
        <li>Zero-trust architecture support</li>
      </ul>

      <h2>Preparing for the Release</h2>
      <p>To make the most of the Summer '25 Release:</p>

      <ol>
        <li><strong>Review Release Notes:</strong> Familiarize yourself with all new features and changes</li>
        <li><strong>Test in Sandbox:</strong> Always test new features in a sandbox environment before deploying to production</li>
        <li><strong>Update Training Materials:</strong> Ensure your team knows about new capabilities</li>
        <li><strong>Plan Your Rollout:</strong> Prioritize which features to implement first</li>
        <li><strong>Monitor Performance:</strong> Track how new features impact your KPIs</li>
      </ol>

      <h2>Impact on Your Business</h2>
      <p>The Summer '25 Release is designed to:</p>
      <ul>
        <li>Reduce time spent on administrative tasks</li>
        <li>Improve data quality and insights</li>
        <li>Enhance customer experiences across all touchpoints</li>
        <li>Increase team productivity and collaboration</li>
        <li>Drive better business outcomes through AI-powered intelligence</li>
      </ul>

      <h2>Next Steps</h2>
      <p>Don't let your organization fall behind on the latest Salesforce capabilities. Our team of certified Salesforce consultants can help you:</p>
      <ul>
        <li>Evaluate which new features benefit your business</li>
        <li>Plan and execute a smooth upgrade</li>
        <li>Train your team on new functionality</li>
        <li>Optimize your Salesforce instance for maximum ROI</li>
      </ul>

      <p>Ready to unlock the full potential of the Summer '25 Release? Contact us today to schedule your consultation.</p>
    `,
  },
  "why-hire-salesforce-integration-consultant": {
    title: "Why Should You Hire a Salesforce Integration Consultant?",
    date: "March 5, 2025",
    category: "Consulting",
    image: "/salesforce-consultant-business-meeting.jpg",
    content: `
      <p>Integrating Salesforce with your existing business systems is one of the most impactful decisions you can make for your organization. However, the complexity of modern integrations often requires specialized expertise. Here's why partnering with a Salesforce integration consultant is essential for success.</p>

      <h2>The Integration Challenge</h2>
      <p>Today's businesses rely on multiple software systems—from ERP and accounting platforms to marketing automation and customer service tools. Salesforce integration brings these systems together, creating a unified view of your business operations.</p>

      <p>However, integration projects come with significant challenges:</p>
      <ul>
        <li>Complex technical requirements</li>
        <li>Data migration and synchronization</li>
        <li>Security and compliance considerations</li>
        <li>Legacy system compatibility</li>
        <li>Custom business logic implementation</li>
      </ul>

      <h2>What a Salesforce Integration Consultant Brings to the Table</h2>

      <h3>1. Technical Expertise</h3>
      <p>Salesforce consultants possess deep technical knowledge across multiple integration methods:</p>
      <ul>
        <li><strong>API Integration:</strong> REST, SOAP, and Bulk APIs for different use cases</li>
        <li><strong>Middleware Platforms:</strong> MuleSoft, Dell Boomi, Informatica</li>
        <li><strong>AppExchange Solutions:</strong> Pre-built connectors and integrations</li>
        <li><strong>Custom Development:</strong> Apex, Lightning Web Components, and external systems</li>
      </ul>

      <h3>2. Strategic Planning</h3>
      <p>Beyond technical implementation, consultants help you:</p>
      <ul>
        <li>Define integration objectives and success metrics</li>
        <li>Choose the right integration architecture</li>
        <li>Prioritize which systems to integrate first</li>
        <li>Plan for scalability and future growth</li>
        <li>Optimize costs and resource allocation</li>
      </ul>

      <h3>3. Risk Mitigation</h3>
      <p>Integration projects carry risks that experienced consultants help you avoid:</p>
      <ul>
        <li><strong>Data Loss:</strong> Proper data mapping and validation prevents information loss during migration</li>
        <li><strong>Security Vulnerabilities:</strong> Consultants implement security best practices and compliance requirements</li>
        <li><strong>Performance Issues:</strong> Optimized integration patterns prevent system slowdowns</li>
        <li><strong>User Adoption Challenges:</strong> Change management strategies ensure smooth transitions</li>
      </ul>

      <h2>Real-World Integration Scenarios</h2>

      <h3>ERP Integration</h3>
      <p>Connecting Salesforce with your ERP system (SAP, Oracle, NetSuite) enables:</p>
      <ul>
        <li>Real-time inventory visibility for sales teams</li>
        <li>Automated order processing and fulfillment</li>
        <li>Synchronized customer and product data</li>
        <li>Unified financial reporting</li>
      </ul>

      <h3>Marketing Automation Integration</h3>
      <p>Integrating marketing platforms (HubSpot, Marketo, Pardot) delivers:</p>
      <ul>
        <li>Complete lead journey tracking</li>
        <li>Automated lead scoring and routing</li>
        <li>Campaign performance analytics</li>
        <li>Personalized customer experiences</li>
      </ul>

      <h3>E-commerce Integration</h3>
      <p>Connecting online stores (Shopify, Magento, WooCommerce) provides:</p>
      <ul>
        <li>360-degree customer view</li>
        <li>Automated customer service workflows</li>
        <li>Cross-channel order management</li>
        <li>Personalized product recommendations</li>
      </ul>

      <h2>The ROI of Professional Integration Services</h2>

      <h3>Faster Time to Value</h3>
      <p>Professional consultants accelerate implementation, helping you realize benefits months faster than DIY approaches.</p>

      <h3>Reduced Total Cost of Ownership</h3>
      <p>While there's an upfront cost, proper integration prevents expensive mistakes, rework, and maintenance issues.</p>

      <h3>Improved Data Quality</h3>
      <p>Expert data mapping and cleansing ensure you're making decisions based on accurate, reliable information.</p>

      <h3>Enhanced User Adoption</h3>
      <p>Well-designed integrations that fit naturally into existing workflows encourage user adoption and maximize ROI.</p>

      <h2>Choosing the Right Consultant</h2>
      <p>When selecting a Salesforce integration consultant, consider:</p>

      <h3>Certifications and Experience</h3>
      <ul>
        <li>Salesforce Certified Integration Architecture Designer</li>
        <li>Salesforce Certified Application Architect</li>
        <li>Platform-specific certifications (MuleSoft, etc.)</li>
        <li>Years of integration experience</li>
        <li>Industry-specific expertise</li>
      </ul>

      <h3>Proven Track Record</h3>
      <ul>
        <li>Case studies and client references</li>
        <li>Similar project experience</li>
        <li>System-specific expertise</li>
        <li>Post-implementation support</li>
      </ul>

      <h3>Partnership Approach</h3>
      <ul>
        <li>Commitment to knowledge transfer</li>
        <li>Transparent communication</li>
        <li>Flexible engagement models</li>
        <li>Long-term support options</li>
      </ul>

      <h2>The Integration Process</h2>
      <p>A typical Salesforce integration project includes:</p>

      <ol>
        <li><strong>Discovery:</strong> Understanding your business processes, systems, and objectives</li>
        <li><strong>Architecture Design:</strong> Creating a comprehensive integration blueprint</li>
        <li><strong>Development:</strong> Building and configuring integration components</li>
        <li><strong>Testing:</strong> Rigorous testing in sandbox environments</li>
        <li><strong>Deployment:</strong> Careful rollout to production systems</li>
        <li><strong>Training:</strong> Ensuring your team can leverage new capabilities</li>
        <li><strong>Support:</strong> Ongoing monitoring and optimization</li>
      </ol>

      <h2>Common Integration Mistakes to Avoid</h2>
      <ul>
        <li><strong>Skipping the planning phase:</strong> Jumping straight to development without proper architecture</li>
        <li><strong>Ignoring data quality:</strong> Migrating dirty data into Salesforce</li>
        <li><strong>Over-engineering solutions:</strong> Creating unnecessarily complex integrations</li>
        <li><strong>Neglecting security:</strong> Failing to implement proper authentication and encryption</li>
        <li><strong>Poor documentation:</strong> Making future maintenance difficult</li>
      </ul>

      <h2>Making the Investment Decision</h2>
      <p>Consider hiring a Salesforce integration consultant if:</p>
      <ul>
        <li>You're integrating multiple complex systems</li>
        <li>Your internal team lacks integration experience</li>
        <li>You need to meet aggressive timelines</li>
        <li>Data security and compliance are critical</li>
        <li>You want to avoid costly mistakes</li>
        <li>Long-term scalability is important</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Salesforce integration is a strategic investment that can transform your business operations, improve customer experiences, and drive growth. While the complexity of modern integrations can be daunting, partnering with an experienced Salesforce integration consultant ensures you achieve your objectives while avoiding common pitfalls.</p>

      <p>The right consultant brings not just technical skills, but strategic thinking, industry expertise, and a commitment to your long-term success. By investing in professional integration services, you're setting your organization up for sustained competitive advantage.</p>

      <h2>Ready to Get Started?</h2>
      <p>Our team of certified Salesforce integration consultants has helped dozens of organizations successfully connect Salesforce with their critical business systems. We bring deep technical expertise, proven methodologies, and a partnership approach that ensures your success.</p>

      <p>Contact us today to discuss your integration needs and discover how we can help you maximize your Salesforce investment.</p>
    `,
  },
  "unlock-productivity-salesforce-outlook-integration-guide-2025": {
    title: "Unlock Productivity: Salesforce Outlook Integration Guide 2025",
    date: "March 20, 2025",
    category: "Productivity Guide",
    image: "/salesforce-outlook-integration-dashboard.jpg",
    content: `
      <p>In today's fast-paced business environment, seamless integration between your CRM and email platform is no longer optional—it's essential. Salesforce Outlook Integration bridges the gap between these two critical tools, enabling your team to work more efficiently and make data-driven decisions.</p>

      <h2>Why Salesforce Outlook Integration Matters</h2>
      <p>Email remains the primary communication channel for most businesses, while Salesforce serves as the central hub for customer data. By integrating these platforms, you eliminate the need to switch between applications, reduce manual data entry, and ensure that all customer interactions are automatically logged and accessible.</p>

      <h2>Key Benefits of Integration</h2>
      <ul>
        <li><strong>Automated Activity Logging:</strong> Every email, meeting, and task is automatically synced to Salesforce, providing a complete view of customer interactions.</li>
        <li><strong>Real-Time Data Access:</strong> View Salesforce records, opportunities, and contact information directly within Outlook without switching applications.</li>
        <li><strong>Enhanced Productivity:</strong> Reduce time spent on administrative tasks and focus on building customer relationships.</li>
        <li><strong>Improved Collaboration:</strong> Ensure your entire team has access to the same up-to-date information.</li>
      </ul>

      <h2>Integration Methods in 2025</h2>
      <p>Salesforce offers several integration options to suit different business needs:</p>
      
      <h3>1. Salesforce Inbox</h3>
      <p>The newest and most advanced integration option, Salesforce Inbox provides a seamless experience with AI-powered insights, mobile optimization, and advanced analytics. It works as both an Outlook add-in and a standalone application.</p>

      <h3>2. Einstein Activity Capture</h3>
      <p>This server-side integration automatically syncs emails and events between Outlook and Salesforce without requiring an add-in. It's ideal for organizations that want automatic syncing with minimal user interaction.</p>

      <h3>3. Outlook Integration (Classic)</h3>
      <p>While being phased out, the classic integration still serves many organizations well. However, we recommend migrating to Salesforce Inbox for access to the latest features and continued support.</p>

      <h2>Best Practices for Implementation</h2>
      <p>Successfully implementing Salesforce Outlook Integration requires careful planning:</p>

      <ul>
        <li><strong>Define Clear Objectives:</strong> Identify what you want to achieve with the integration—whether it's improving data quality, increasing adoption, or automating workflows.</li>
        <li><strong>Train Your Team:</strong> Invest in comprehensive training to ensure users understand how to leverage the integration effectively.</li>
        <li><strong>Establish Data Governance:</strong> Create guidelines for what should be synced to Salesforce to maintain data quality.</li>
        <li><strong>Monitor and Optimize:</strong> Regularly review adoption metrics and user feedback to continuously improve the integration.</li>
      </ul>

      <h2>Common Challenges and Solutions</h2>
      <p>While the integration offers tremendous benefits, organizations may face challenges:</p>

      <p><strong>Challenge:</strong> Users forgetting to use the integration</p>
      <p><strong>Solution:</strong> Implement change management strategies, provide ongoing training, and showcase quick wins to demonstrate value.</p>

      <p><strong>Challenge:</strong> Data synchronization issues</p>
      <p><strong>Solution:</strong> Work with a certified consultant to properly configure sync settings and establish data governance policies.</p>

      <h2>Ready to Transform Your Sales Workflow?</h2>
      <p>Salesforce Outlook Integration isn't just a nice-to-have—it's a competitive advantage. Organizations that seamlessly connect their email and CRM see measurable improvements in productivity, data accuracy, and revenue growth. The question isn't whether you should integrate, but how quickly you can get started.</p>

      <p>Don't let technical complexity hold you back. Our certified Salesforce consultants at Ignite Idea have helped dozens of businesses successfully implement their unique workflows and requirements.</p>

      <h3>Take the first step today:</h3>
      <ul>
        <li>Schedule a free 30-minute consultation to discuss your specific needs</li>
        <li>Get a customized integration roadmap tailored to your business</li>
        <li>Start seeing results</li>
      </ul>

      <p><strong>Contact Ignite Idea Consult now – Let's turn your email into your most powerful sales tool.</strong></p>

      <p><strong>Call Us:</strong> +662-231-8088</p>
      <p><strong>Email:</strong> contact@igniteidea.com</p>
    `,
  },
}

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
    },
    backToResources: "Back to Resources",
    share: "Share",
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
    },
    backToResources: "กลับไปที่ทรัพยากร",
    share: "แชร์",
  },
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = blogContent[slug as keyof typeof blogContent]

  const [lang, setLang] = useState<"en" | "th">("en")
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  if (!post) {
    return <div>Post not found</div>
  }

  const relatedPosts = Object.entries(blogContent)
    .filter(([key]) => key !== slug)
    .slice(0, 2)
    .map(([key, value]) => ({ slug: key, ...value }))

  return (
    <div className="min-h-screen bg-white">
      <FloatingChatButton onClick={() => window.location.href = '/#contact-us'} />

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <img src="/images/ignite-logo.png" alt="IGNITE IDEA" className="h-12 w-12" />
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                IGNITE IDEA
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                {t.nav.home}
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setServiceDropdownOpen(true)}
                onMouseLeave={() => setServiceDropdownOpen(false)}
              >
                <button className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1 font-medium">
                  {t.nav.service}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {serviceDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="w-80 backdrop-blur-xl bg-white/95 rounded-2xl shadow-2xl border border-gray-200 py-2">
                      <Link
                        href="/service/crm"
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                      >
                        {t.nav.serviceSubmenu.crm}
                      </Link>
                      <Link
                        href="/service/call-center"
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                      >
                        {t.nav.serviceSubmenu.callCenter}
                      </Link>
                      <Link
                        href="/service/marketing"
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                      >
                        {t.nav.serviceSubmenu.marketing}
                      </Link>
                      <Link
                        href="/service/data-management"
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
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
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                {t.nav.about}
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-gray-100/80 backdrop-blur-sm rounded-full p-1">
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
            <div className="md:hidden border-t border-gray-200 py-4 backdrop-blur-xl bg-white/95">
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

      <section className="pt-24">
        <div className="relative h-[70vh] overflow-hidden">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover opacity-0 transition-opacity duration-700"
            onLoad={(e) => {
              e.currentTarget.classList.remove("opacity-0")
              e.currentTarget.classList.add("opacity-100")
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <Link href="/resources">
            <Button variant="ghost" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 mb-8 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToResources}
            </Button>
          </Link>

          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mb-6 tracking-wide uppercase">
            {post.category}
          </span>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight tracking-tight font-serif">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-500 text-sm pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>IGNITE IDEA Team</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>8 min read</span>
            </div>
          </div>
        </div>
      </section>

      <article className="py-12 px-6 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div
            className="article-content prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:leading-tight prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg prose-p:font-sans prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:my-8 prose-ul:space-y-4 prose-ol:my-8 prose-ol:space-y-4 prose-li:text-gray-700 prose-li:text-lg prose-li:leading-relaxed first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:text-blue-600 first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85] first-letter:mt-1"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="my-16 py-8 px-10 border-l-4 border-blue-400 bg-blue-50/30">
            <blockquote className="text-2xl font-serif text-gray-800 leading-relaxed italic">
              "Professional Salesforce integration transforms business operations and drives sustainable growth."
            </blockquote>
          </div>
        </div>
      </article>

      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-6 p-8 bg-white rounded-2xl border border-gray-200">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl font-bold">II</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">About IGNITE IDEA</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                IGNITE IDEA is a leading Salesforce consulting partner specializing in CRM implementation, 
                integration services, and digital transformation. Our team of certified experts helps businesses 
                maximize their Salesforce investment and achieve their strategic goals.
              </p>
              <Link href="/about">
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 font-serif">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/resources/${relatedPost.slug}`}
                className="group block overflow-hidden rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={relatedPost.image || "/placeholder.svg"}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mb-3">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors font-serif line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-gray-500">{relatedPost.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2025 IGNITE IDEA. All rights reserved.</p>
        </div>
      </footer>

      <style jsx global>{`
        .article-content > p:first-of-type::first-letter {
          font-family: 'Georgia', 'Times New Roman', serif;
        }
        
        html {
          scroll-behavior: smooth;
        }

        .article-content h2,
        .article-content h3 {
          font-family: 'Georgia', 'Times New Roman', serif;
        }

        .article-content p {
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
