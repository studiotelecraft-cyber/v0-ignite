// Script to batch update service page dropdowns
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const servicePages = [
  'call-center',
  'data-management',
  'contractual-sales',
  'customer-services-centre',
  'demand-supply-planning',
  'financial-planning-analysis',
  'integrated-business-planning',
  'production-planning',
  'sales-operations-planning'
];

const newDropdown = `                {serviceDropdownOpen && (
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
                          href="/about"
                          className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                )}`;

servicePages.forEach(page => {
  const filePath = join(process.cwd(), 'app', 'service', page, 'page.tsx');
  let content = readFileSync(filePath, 'utf-8');
  
  // Find the old dropdown pattern and replace it
  const dropdownRegex = /\{serviceDropdownOpen && \(\s*<div className="absolute top-full[^}]+\}\)\}/s;
  
  if (dropdownRegex.test(content)) {
    // Extract the old dropdown to find its full extent
    const matches = content.match(/(\{serviceDropdownOpen && \(\s*<div className="absolute top-full.*?<\/div>\s*<\/div>\s*\)\})/s);
    
    if (matches) {
      content = content.replace(matches[0], newDropdown);
      writeFileSync(filePath, content, 'utf-8');
      console.log(`✓ Updated ${page}`);
    } else {
      console.log(`✗ Could not find dropdown pattern in ${page}`);
    }
  } else {
    console.log(`✗ No dropdown found in ${page}`);
  }
});

console.log('Done!');
