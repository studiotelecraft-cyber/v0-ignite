#!/bin/bash

# This script updates all page.tsx files to replace serviceGroups with services

files=(
  "/vercel/share/v0-project/app/service/field-sales/page.tsx"
  "/vercel/share/v0-project/app/service/contractual-sales/page.tsx"
  "/vercel/share/v0-project/app/service/customer-360/page.tsx"
  "/vercel/share/v0-project/app/service/customer-services-centre/page.tsx"
  "/vercel/share/v0-project/app/service/call-center/page.tsx"
  "/vercel/share/v0-project/app/service/crm/page.tsx"
  "/vercel/share/v0-project/app/service/data-management/page.tsx"
  "/vercel/share/v0-project/app/service/demand-supply-planning/page.tsx"
  "/vercel/share/v0-project/app/service/financial-planning-analysis/page.tsx"
  "/vercel/share/v0-project/app/service/integrated-business-planning/page.tsx"
  "/vercel/share/v0-project/app/service/marketing/page.tsx"
  "/vercel/share/v0-project/app/service/production-planning/page.tsx"
  "/vercel/share/v0-project/app/service/sales-operations-planning/page.tsx"
  "/vercel/share/v0-project/app/resources/page.tsx"
  "/vercel/share/v0-project/app/resources/[slug]/page.tsx"
  "/vercel/share/v0-project/app/privacy-policy/page.tsx"
  "/vercel/share/v0-project/app/about/page.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing: $file"
    # Use sed to replace t.nav.serviceGroups with t.nav.services
    sed -i 's/t\.nav\.serviceGroups\.group[123]\.items/t.nav.services/g' "$file"
    sed -i 's/t\.nav\.serviceGroups\.group[123]\.title//g' "$file"
    echo "✅ Updated: $file"
  else
    echo "⚠️  File not found: $file"
  fi
done

echo "Done!"
