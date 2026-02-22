import fs from 'fs/promises';
import path from 'path';

const filesToUpdate = [
  'app/about/page.tsx',
  'app/service/crm/page.tsx',
  'app/service/marketing/page.tsx',
  'app/service/call-center/page.tsx',
  'app/service/data-management/page.tsx',
  'app/service/field-sales/page.tsx',
  'app/service/lead-to-cash-mgn/page.tsx',
  'app/service/customer-360/page.tsx',
  'app/service/customer-services-centre/page.tsx',
  'app/service/contractual-sales/page.tsx',
  'app/service/production-planning/page.tsx',
  'app/service/sales-operations-planning/page.tsx',
  'app/service/demand-supply-planning/page.tsx',
  'app/service/financial-planning-analysis/page.tsx',
  'app/service/integrated-business-planning/page.tsx',
  'app/service/salesforce-manage-service/page.tsx',
  'app/resources/[slug]/page.tsx',
];

const oldServicesPattern = `      crm: "Customer Relationship Management (CRM)",
      callCenter: "Call Center System",
      marketing: "Marketing Automation System",
      dataManagement: "Data Management",`;

const newServicesPattern = `      service1: "Lead to Cash (Order) Management",
      service2: "Field Sales Execution",
      service3: "Customer 360 Data Consolidation",
      service4: "Next Gen. Customer Service Centre",
      service5: "Salesforce Manage Service",`;

const oldServicesThaiPattern = `      crm: "Customer Relationship Management (CRM)",
      callCenter: "Call Center System",
      marketing: "Marketing Automation System",
      dataManagement: "Data Management",`;

const newServicesThaiPattern = `      service1: "การจัดการ Lead to Cash (Order)",
      service2: "การดำเนินการขายภาคสนาม",
      service3: "การรวมข้อมูลลูกค้า 360 องศา",
      service4: "ศูนย์บริการลูกค้ายุคใหม่",
      service5: "บริการจัดการ Salesforce",`;

async function updateFile(filePath) {
  try {
    const fullPath = path.join('/vercel/share/v0-project', filePath);
    let content = await fs.readFile(fullPath, 'utf-8');
    let updated = false;

    // Replace old services with new services
    if (content.includes(oldServicesPattern)) {
      content = content.replace(oldServicesPattern, newServicesPattern);
      updated = true;
    }

    // Replace Thai services too
    if (content.includes(oldServicesThaiPattern)) {
      content = content.replace(oldServicesThaiPattern, newServicesThaiPattern);
      updated = true;
    }

    if (updated) {
      await fs.writeFile(fullPath, content, 'utf-8');
      console.log(`✓ Updated: ${filePath}`);
      return true;
    } else {
      console.log(`- Skipped (no match): ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`✗ Error updating ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('Starting batch update of contact services...\n');
  
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const file of filesToUpdate) {
    const result = await updateFile(file);
    if (result === true) successCount++;
    else if (result === false) skipCount++;
    else errorCount++;
  }

  console.log(`\nUpdate complete!`);
  console.log(`✓ Updated: ${successCount} files`);
  console.log(`- Skipped: ${skipCount} files`);
  console.log(`✗ Errors: ${errorCount} files`);
}

main();
