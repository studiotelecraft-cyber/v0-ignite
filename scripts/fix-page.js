import fs from 'fs';

// Read the file
const filePath = '/vercel/share/v0-project/app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace all occurrences of t.nav.serviceGroups pattern with simpler approach
content = content.replace(/t\.nav\.serviceGroups\.group\d+\.title/g, '""');
content = content.replace(/t\.nav\.serviceGroups\.group\d+\.items/g, 't.nav.services');

// Write back
fs.writeFileSync(filePath, content, 'utf8');

console.log('[v0] Fixed page.tsx serviceGroups references');
