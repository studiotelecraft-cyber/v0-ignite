const fs = require('fs');
const path = require('path');

const files = [
  '/vercel/share/v0-project/app/service/lead-to-cash-mgn/page.tsx',
  '/vercel/share/v0-project/app/service/field-sales/page.tsx',
  '/vercel/share/v0-project/app/service/contractual-sales/page.tsx',
  '/vercel/share/v0-project/app/service/customer-360/page.tsx',
  '/vercel/share/v0-project/app/service/customer-services-centre/page.tsx',
  '/vercel/share/v0-project/app/service/call-center/page.tsx',
  '/vercel/share/v0-project/app/service/crm/page.tsx',
  '/vercel/share/v0-project/app/service/data-management/page.tsx',
  '/vercel/share/v0-project/app/service/demand-supply-planning/page.tsx',
  '/vercel/share/v0-project/app/service/financial-planning-analysis/page.tsx',
  '/vercel/share/v0-project/app/service/integrated-business-planning/page.tsx',
  '/vercel/share/v0-project/app/service/marketing/page.tsx',
  '/vercel/share/v0-project/app/service/production-planning/page.tsx',
  '/vercel/share/v0-project/app/service/sales-operations-planning/page.tsx',
  '/vercel/share/v0-project/app/resources/page.tsx',
  '/vercel/share/v0-project/app/resources/[slug]/page.tsx',
  '/vercel/share/v0-project/app/privacy-policy/page.tsx',
  '/vercel/share/v0-project/app/about/page.tsx',
];

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${filePath} - file not found`);
    return;
  }
  
  console.log(`Processing ${filePath}...`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace t.nav.serviceGroups.group1.title with t.nav.services
  content = content.replace(/t\.nav\.serviceGroups\.group1\.title/g, 't.nav.services');
  content = content.replace(/t\.nav\.serviceGroups\.group2\.title/g, 't.nav.services');
  content = content.replace(/t\.nav\.serviceGroups\.group3\.title/g, 't.nav.services');
  
  // Replace t.nav.serviceGroups.group1.items.map with t.nav.services.map
  content = content.replace(/t\.nav\.serviceGroups\.group1\.items\.map/g, 't.nav.services.map');
  content = content.replace(/t\.nav\.serviceGroups\.group2\.items\.map/g, 't.nav.services.map');
  content = content.replace(/t\.nav\.serviceGroups\.group3\.items\.map/g, 't.nav.services.map');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Updated ${filePath}`);
});

console.log('\nAll files processed successfully!');
