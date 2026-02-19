import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join } from 'path';

const baseDir = '/vercel/share/v0-project';

// Recursively find all page.tsx files
function findPageFiles(dir, files = []) {
  const entries = readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
      findPageFiles(fullPath, files);
    } else if (entry === 'page.tsx') {
      files.push(fullPath);
    }
  }
  
  return files;
}

const oldDropdownPattern = /\{serviceDropdownOpen && \(\s*<div className="absolute top-full left-1\/2 -translate-x-1\/2 pt-3">\s*<div className="w-\[820px\][\s\S]*?<\/div>\s*<\/div>\s*\)\}/;

const newDropdown = `{serviceDropdownOpen && (
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
                )}`;

console.log('Finding all page.tsx files...');
const pageFiles = findPageFiles(baseDir);
console.log(`Found ${pageFiles.length} page.tsx files`);

let updatedCount = 0;

for (const file of pageFiles) {
  try {
    let content = readFileSync(file, 'utf8');
    
    // Skip if file doesn't contain serviceGroups
    if (!content.includes('serviceGroups')) {
      continue;
    }
    
    console.log(`\nProcessing: ${file}`);
    
    // Check if it has the old dropdown pattern
    if (oldDropdownPattern.test(content)) {
      content = content.replace(oldDropdownPattern, newDropdown);
      writeFileSync(file, content, 'utf8');
      console.log(`✓ Updated dropdown in ${file}`);
      updatedCount++;
    } else {
      console.log(`- No old dropdown pattern found in ${file}`);
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
}

console.log(`\n✓ Updated ${updatedCount} files`);
