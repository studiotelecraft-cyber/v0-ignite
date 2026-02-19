const fs = require('fs');
const path = require('path');

const files = [
  'app/service/call-center/page.tsx',
  'app/service/contractual-sales/page.tsx',
  'app/service/crm/page.tsx',
  'app/service/customer-360/page.tsx',
  'app/service/customer-services-centre/page.tsx',
  'app/service/data-management/page.tsx',
  'app/service/demand-supply-planning/page.tsx',
  'app/service/field-sales/page.tsx',
  'app/service/financial-planning-analysis/page.tsx',
  'app/service/integrated-business-planning/page.tsx',
  'app/service/lead-to-cash-mgn/page.tsx',
  'app/service/marketing/page.tsx',
  'app/service/production-planning/page.tsx',
  'app/service/sales-operations-planning/page.tsx',
  'app/resources/page.tsx',
  'app/resources/[slug]/page.tsx',
  'app/privacy-policy/page.tsx',
  'app/about/page.tsx',
];

const newEnServices = `services: [
        { name: "Lead to Cash (Order) Management", href: "/service/lead-to-cash-mgn" },
        { name: "Field Sales Execution", href: "/service/field-sales" },
        { name: "Contractual Sales for Manufacturing", href: "/service/contractual-sales" },
        { name: "Customer 360 Data Consolidation", href: "/service/customer-360" },
        { name: "Next Gen. Customer Service Centre", href: "/service/customer-services-centre" },
        { name: "Salesforce Manage Service", href: "/service/salesforce-manage-service" },
      ],`;

const newThServices = `services: [
        { name: "การจัดการ Lead to Cash (Order)", href: "/service/lead-to-cash-mgn" },
        { name: "การดำเนินการขายภาคสนาม", href: "/service/field-sales" },
        { name: "การขายตามสัญญาสำหรับการผลิต", href: "/service/contractual-sales" },
        { name: "การรวมข้อมูลลูกค้า 360 องศา", href: "/service/customer-360" },
        { name: "ศูนย์บริการลูกค้ายุคใหม่", href: "/service/customer-services-centre" },
        { name: "Salesforce Manage Service", href: "/service/salesforce-manage-service" },
      ],`;

files.forEach(file => {
  const filePath = path.join('/vercel/share/v0-project', file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file} - file not found`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace English serviceGroups with services array
  content = content.replace(
    /serviceGroups:\s*\{[\s\S]*?group1:\s*\{[\s\S]*?title:[\s\S]*?items:\s*\[[\s\S]*?\],[\s\S]*?\},[\s\S]*?group2:[\s\S]*?\{[\s\S]*?title:[\s\S]*?items:\s*\[[\s\S]*?\],[\s\S]*?\},[\s\S]*?group3:[\s\S]*?\{[\s\S]*?title:[\s\S]*?items:\s*\[[\s\S]*?\],[\s\S]*?\},[\s\S]*?\},/,
    newEnServices
  );
  
  // Update dropdown UI from 3-column to single column - desktop
  content = content.replace(
    /<div className="w-\[820px\] bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">[\s\S]*?<div className="grid grid-cols-3 gap-10">[\s\S]*?{\/\* Group 1[\s\S]*?{\/\* Group 2[\s\S]*?{\/\* Group 3[\s\S]*?<\/div>[\s\S]*?{\/\* Bottom CTA Section \*\/}/,
    `<div className="w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
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
                      {/* Bottom CTA Section */}`
  );

  // Update mobile menu
  content = content.replace(
    /{serviceDropdownOpen && \([\s\S]*?<div className="ml-4 mt-2 space-y-4">[\s\S]*?{\/\* Mobile Group 1[\s\S]*?{\/\* Mobile Group 2[\s\S]*?{\/\* Mobile Group 3[\s\S]*?<\/div>[\s\S]*?\)}/,
    `{serviceDropdownOpen && (
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
                  )}`
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});

console.log('All files updated successfully!');
