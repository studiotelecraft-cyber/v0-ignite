#!/usr/bin/env python3
import re
from pathlib import Path

# Get all page.tsx files
base = Path('/vercel/share/v0-project/app')
files = list(base.rglob('page.tsx'))

# English service group pattern (multiline)
en_old = r"serviceGroups:\s*\{\s*group1:\s*\{[^}]*title:[^,]*,[^}]*items:\s*\[[^\]]*\][^}]*\}[^}]*group2:\s*\{[^}]*title:[^,]*,[^}]*items:\s*\[[^\]]*\][^}]*\}[^}]*group3:\s*\{[^}]*title:[^,]*,[^}]*items:\s*\[[^\]]*\][^}]*\}\s*\},"

en_new = '''services: [
        { name: "Lead to Cash (Order) Management", href: "/service/lead-to-cash-mgn" },
        { name: "Field Sales Execution", href: "/service/field-sales" },
        { name: "Contractual Sales for Manufacturing", href: "/service/contractual-sales" },
        { name: "Customer 360 Data Consolidation", href: "/service/customer-360" },
        { name: "Next Gen. Customer Service Centre", href: "/service/customer-services-centre" },
        { name: "Salesforce Manage Service", href: "/service/salesforce-manage-service" },
      ],'''

# Thai service group pattern (multiline)
th_old = r"serviceGroups:\s*\{\s*group1:\s*\{[^}]*title:[^,]*,[^}]*items:\s*\[[^\]]*\][^}]*\}[^}]*group2:\s*\{[^}]*title:[^,]*,[^}]*items:\s*\[[^\]]*\][^}]*\}[^}]*group3:\s*\{[^}]*title:[^,]*,[^}]*items:\s*\[[^\]]*\][^}]*\}\s*\},"

th_new = '''services: [
        { name: "การจัดการ Lead to Cash (Order)", href: "/service/lead-to-cash-mgn" },
        { name: "การดำเนินการขายภาคสนาม", href: "/service/field-sales" },
        { name: "การขายตามสัญญาสำหรับการผลิต", href: "/service/contractual-sales" },
        { name: "การรวมข้อมูลลูกค้า 360 องศา", href: "/service/customer-360" },
        { name: "ศูนย์บริการลูกค้ายุคใหม่", href: "/service/customer-services-centre" },
        { name: "Salesforce Manage Service", href: "/service/salesforce-manage-service" },
      ],'''

# Dropdown UI pattern - the three column group display
dropdown_old = r'\{serviceDropdownOpen && \(\s*<div className="absolute[^>]*>.*?<div className="grid grid-cols-3.*?</div>\s*</div>\s*</div>\s*\)\}'

dropdown_new = '''{serviceDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                    <div className="w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
                      <div className="space-y-3">
                        {t.nav.services.map((item, idx) => (
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
                )}'''

# Mobile menu pattern
mobile_old = r'\{serviceDropdownOpen && \(\s*<div className="ml-4[^>]*>.*?{t\.nav\.serviceGroups\.group3\.items\.map.*?</div>\s*\)\}'

mobile_new = '''{serviceDropdownOpen && (
                    <div className="ml-4 mt-2 space-y-2">
                      {t.nav.services.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-gray-600 hover:text-[#0083d8] transition-colors py-1.5 text-sm"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}'''

updated = 0
for file in files:
    try:
        content = file.read_text()
        original = content
        
        # Replace patterns
        content = re.sub(en_old, en_new, content, flags=re.DOTALL)
        content = re.sub(th_old, th_new, content, flags=re.DOTALL)
        content = re.sub(dropdown_old, dropdown_new, content, flags=re.DOTALL)
        content = re.sub(mobile_old, mobile_new, content, flags=re.DOTALL)
        
        if content != original:
            file.write_text(content)
            updated += 1
            print(f"✅ {file.relative_to(base.parent)}")
    except Exception as e:
        print(f"❌ {file.relative_to(base.parent)}: {e}")

print(f"\n✅ Updated {updated} files")
