#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const servicePagesToUpdate = [
  'app/service/contractual-sales/page.tsx',
  'app/service/customer-services-centre/page.tsx',
  'app/service/demand-supply-planning/page.tsx',
  'app/service/financial-planning-analysis/page.tsx',
  'app/service/integrated-business-planning/page.tsx',
  'app/service/production-planning/page.tsx',
  'app/service/sales-operations-planning/page.tsx',
];

servicePagesToUpdate.forEach((filePath) => {
  console.log(`Processing ${filePath}...`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Step 1: Add Navbar import if not present
    if (!content.includes('import { Navbar }')) {
      content = content.replace(
        /(import { Dialog[^}]+} from "@\/components\/ui\/dialog")/,
        '$1\nimport { Navbar } from "@/components/navbar"'
      );
    }
    
    // Step 2: Remove unused imports
    content = content.replace(/Menu,\s*/g, '');
    content = content.replace(/,\s*X,\s*/g, ', ');
    content = content.replace(/,\s*ChevronDown/g, '');
    
    // Step 3: Remove old navigation state variables
    content = content.replace(/\s*const \[serviceDropdownOpen, setServiceDropdownOpen\] = useState\(false\)\n/, '');
    content = content.replace(/\s*const \[mobileMenuOpen, setMobileMenuOpen\] = useState\(false\)\n/, '');
    
    // Step 4: Replace old navbar with <Navbar />
    const navbarRegex = /\s*{\/\* Navbar \*\/}\s*<nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-900[\s\S]*?<\/nav>\s*\n\s*{\/\* Floating Call Button \*\/}\s*<FloatingCallButton[^>]+\/>/;
    content = content.replace(navbarRegex, '      <Navbar />');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated ${filePath}`);
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
});

console.log('\nAll service pages updated!');
