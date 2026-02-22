import { readFileSync, writeFileSync } from 'fs';

const files = [
  '/vercel/share/v0-project/app/service/data-management/page.tsx',
  '/vercel/share/v0-project/app/service/contractual-sales/page.tsx',
  '/vercel/share/v0-project/app/service/customer-services-centre/page.tsx',
  '/vercel/share/v0-project/app/service/demand-supply-planning/page.tsx',
  '/vercel/share/v0-project/app/service/financial-planning-analysis/page.tsx',
  '/vercel/share/v0-project/app/service/integrated-business-planning/page.tsx',
  '/vercel/share/v0-project/app/service/production-planning/page.tsx',
  '/vercel/share/v0-project/app/service/sales-operations-planning/page.tsx'
];

// Pattern for the old 3-column dropdown
const oldPattern = `                    <div className="w-[820px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
                      <div className="grid grid-cols-3 gap-10">`;

// Pattern for new single-column dropdown
const newPattern = `                    <div className="w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
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
                      </div>`;

files.forEach(filePath => {
  console.log(`Processing ${filePath}...`);
  let content = readFileSync(filePath, 'utf-8');
  
  // Find and replace the old grid structure with the new simple list
  // Match the entire dropdown section from w-[820px] to the closing tags
  const regex = /<div className="w-\[820px\] bg-white rounded-2xl.*?<\/div>\s*<\/div>\s*<\/div>\s*\)\}/s;
  
  if (content.includes('w-[820px] bg-white rounded-2xl')) {
    // Extract from start of w-[820px] div to closing )}
    const startMarker = '<div className="w-[820px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">';
    const startIndex = content.indexOf(startMarker);
    
    if (startIndex > -1) {
      // Find the matching closing for the entire dropdown
      let openCount = 0;
      let searchStart = startIndex;
      let endIndex = -1;
      
      // Count divs to find closing
      for (let i = searchStart; i < content.length; i++) {
        if (content.substr(i, 5) === '<div ') {
          openCount++;
        }
        // Look for the closing )} that ends the dropdown
        if (content.substr(i, 2) === ')}' && openCount === 0) {
          endIndex = i;
          break;
        }
        if (content.substr(i, 6) === '</div>') {
          openCount--;
        }
      }
      
      if (endIndex > startIndex) {
        const oldDropdown = content.substring(startIndex, endIndex);
        const newDropdown = newPattern + '\n                    </div>\n                  </div>';
        
        content = content.substring(0, startIndex) + newDropdown + content.substring(endIndex);
        writeFileSync(filePath, content, 'utf-8');
        console.log(`✓ Updated ${filePath}`);
      } else {
        console.log(`✗ Could not find closing for ${filePath}`);
      }
    }
  } else {
    console.log(`✗ Pattern not found in ${filePath}`);
  }
});

console.log('Done!');
