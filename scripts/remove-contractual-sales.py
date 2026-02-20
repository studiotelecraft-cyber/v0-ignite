#!/usr/bin/env python3
import os
import re

# Base directory
base_dir = '/vercel/share/v0-project'

# Files to update
files_to_update = [
    'app/about/page.tsx',
    'app/privacy-policy/page.tsx',
    'app/resources/page.tsx',
    'app/resources/[slug]/page.tsx',
    'app/service/lead-to-cash-mgn/page.tsx',
    'app/service/field-sales/page.tsx',
    'app/service/customer-360/page.tsx',
    'app/service/customer-services-centre/page.tsx',
    'app/service/call-center/page.tsx',
    'app/service/crm/page.tsx',
    'app/service/data-management/page.tsx',
    'app/service/demand-supply-planning/page.tsx',
    'app/service/financial-planning-analysis/page.tsx',
    'app/service/integrated-business-planning/page.tsx',
    'app/service/marketing/page.tsx',
    'app/service/production-planning/page.tsx',
    'app/service/sales-operations-planning/page.tsx',
]

# Pattern to match the Contractual Sales line (both English and Thai)
patterns = [
    r'\s*\{\s*name:\s*"Contractual Sales for Manufacturing",\s*href:\s*"/service/contractual-sales"\s*\},?\n',
    r'\s*\{\s*name:\s*"การขายตามสัญญาสำหรับการผลิต",\s*href:\s*"/service/contractual-sales"\s*\},?\n',
]

updated_count = 0

for file_path in files_to_update:
    full_path = os.path.join(base_dir, file_path)
    
    if not os.path.exists(full_path):
        print(f"File not found: {file_path}")
        continue
    
    try:
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Remove both English and Thai versions
        for pattern in patterns:
            content = re.sub(pattern, '', content)
        
        if content != original_content:
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {file_path}")
            updated_count += 1
        else:
            print(f"No changes needed: {file_path}")
            
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}")

print(f"\nTotal files updated: {updated_count}")
