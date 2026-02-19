#!/usr/bin/env python3
import os
import re
from pathlib import Path

# Base directory
base_dir = Path('/vercel/share/v0-project')

# Files to update
files_to_update = [
    'app/service/sales-operations-planning/page.tsx',
    'app/service/production-planning/page.tsx',
    'app/service/marketing/page.tsx',
    'app/service/integrated-business-planning/page.tsx',
    'app/service/financial-planning-analysis/page.tsx',
    'app/service/field-sales/page.tsx',
    'app/service/demand-supply-planning/page.tsx',
    'app/service/data-management/page.tsx',
    'app/service/customer-services-centre/page.tsx',
    'app/service/customer-360/page.tsx',
    'app/service/crm/page.tsx',
    'app/service/contractual-sales/page.tsx',
    'app/service/call-center/page.tsx',
    'app/resources/page.tsx',
    'app/resources/[slug]/page.tsx',
    'app/privacy-policy/page.tsx',
    'app/about/page.tsx',
]

# English services
en_services = '''services: [
        { name: "Lead to Cash (Order) Management", href: "/service/lead-to-cash-mgn" },
        { name: "Field Sales Execution", href: "/service/field-sales" },
        { name: "Contractual Sales for Manufacturing", href: "/service/contractual-sales" },
        { name: "Customer 360 Data Consolidation", href: "/service/customer-360" },
        { name: "Next Gen. Customer Service Centre", href: "/service/customer-services-centre" },
        { name: "Salesforce Manage Service", href: "/service/salesforce-manage-service" },
      ],'''

# Thai services
th_services = '''services: [
        { name: "การจัดการ Lead to Cash (Order)", href: "/service/lead-to-cash-mgn" },
        { name: "การดำเนินการขายภาคสนาม", href: "/service/field-sales" },
        { name: "การขายตามสัญญาสำหรับการผลิต", href: "/service/contractual-sales" },
        { name: "การรวมข้อมูลลูกค้า 360 องศา", href: "/service/customer-360" },
        { name: "ศูนย์บริการลูกค้ายุคใหม่", href: "/service/customer-services-centre" },
        { name: "Salesforce Manage Service", href: "/service/salesforce-manage-service" },
      ],'''

# Pattern for English serviceGroups
en_pattern = r'serviceGroups:\s*\{[^}]+group1:[^}]+\}[^}]+group2:[^}]+\}[^}]+group3:[^}]+\}\s*\},'

# Pattern for Thai serviceGroups
th_pattern = r'serviceGroups:\s*\{[^}]+group1:[^}]+\}[^}]+group2:[^}]+\}[^}]+group3:[^}]+\}\s*\},'

updated_count = 0

for file_path in files_to_update:
    full_path = base_dir / file_path
    
    if not full_path.exists():
        print(f"⚠️  File not found: {file_path}")
        continue
    
    try:
        content = full_path.read_text(encoding='utf-8')
        original_content = content
        
        # Replace English serviceGroups
        content = re.sub(en_pattern, en_services, content, flags=re.DOTALL)
        
        # Replace Thai serviceGroups
        content = re.sub(th_pattern, th_services, content, flags=re.DOTALL)
        
        if content != original_content:
            full_path.write_text(content, encoding='utf-8')
            updated_count += 1
            print(f"✅ Updated: {file_path}")
        else:
            print(f"ℹ️  No changes needed: {file_path}")
            
    except Exception as e:
        print(f"❌ Error updating {file_path}: {str(e)}")

print(f"\n📊 Total files updated: {updated_count}/{len(files_to_update)}")
