import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Find all page.tsx files recursively
function findPageFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findPageFiles(filePath, fileList);
    } else if (file === 'page.tsx') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

const pageFiles = findPageFiles(join(projectRoot, 'app'));

console.log(`Found ${pageFiles.length} page files to update`);

let updatedCount = 0;

pageFiles.forEach(filePath => {
  try {
    let content = readFileSync(filePath, 'utf-8');
    
    // Check if file contains serviceGroups
    if (!content.includes('serviceGroups')) {
      return;
    }
    
    console.log(`\nUpdating: ${filePath.replace(projectRoot, '')}`);
    
    // Replace all serviceGroups.group1.items with services
    content = content.replace(/t\.nav\.serviceGroups\.group1\.items/g, 't.nav.services');
    content = content.replace(/t\.nav\.serviceGroups\.group2\.items/g, 't.nav.services');
    content = content.replace(/t\.nav\.serviceGroups\.group3\.items/g, 't.nav.services');
    
    // Replace serviceGroups.group1.title (and similar) - these should be removed from rendering
    content = content.replace(/t\.nav\.serviceGroups\.group1\.title/g, '"Services"');
    content = content.replace(/t\.nav\.serviceGroups\.group2\.title/g, '"Services"');
    content = content.replace(/t\.nav\.serviceGroups\.group3\.title/g, '"Services"');
    
    writeFileSync(filePath, content, 'utf-8');
    updatedCount++;
    console.log(`✓ Updated successfully`);
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});

console.log(`\n✅ Updated ${updatedCount} files successfully!`);
