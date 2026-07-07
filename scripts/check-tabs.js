#!/usr/bin/env node

// This script generates the device-tabs pattern for all remaining CMS admin pages.
// It reads each page, wraps the state in {desktop, mobile}, and adds DeviceTabsWrapper.

const fs = require('fs');
const path = require('path');

const dashboardDir = path.join(__dirname, '..', 'app', '(admin)', 'dashboard');

// Pages that already have tabs or have been done manually
const skipPages = ['hero', 'top-performers', 'target-audience'];

// Get all subdirectories
const pages = fs.readdirSync(dashboardDir).filter(f => {
  const fullPath = path.join(dashboardDir, f);
  return fs.statSync(fullPath).isDirectory() && !skipPages.includes(f);
});

function transformPage(pagePath) {
  const content = fs.readFileSync(pagePath, 'utf8');
  
  // Skip if already has DeviceTabsWrapper
  if (content.includes('DeviceTabsWrapper')) {
    console.log(`  ⏭️  Already has DeviceTabsWrapper, skipping`);
    return null;
  }

  let result = content;

  // 1. Add the import for DeviceTabsWrapper
  const lastImport = result.lastIndexOf("import ");
  const endOfLastImport = result.indexOf('\n', lastImport);
  const importLine = `\nimport { DeviceTabsWrapper, migrateToDeviceStructure } from '@/components/admin/device-tabs-wrapper'`;
  result = result.slice(0, endOfLastImport) + importLine + result.slice(endOfLastImport);

  // 2. Find the defaultContent variable name and extract it
  const defaultMatch = result.match(/const\s+(\w+)\s*=\s*\{/);
  if (!defaultMatch) {
    console.log(`  ⚠️  Could not find defaultContent variable`);
    return null;
  }
  const defaultVarName = defaultMatch[1];

  // 3. Find the component function and the useState for content
  // Look for: const [content, setContent] = useState<typeof defaultContent>(defaultContent)
  // or: const [content, setContent] = useState<any>({...})
  
  // 4. Find the state type and update it
  // Replace: useState<typeof defaultContent>(defaultContent) 
  //   with: useState<{ desktop: typeof defaultContent; mobile: typeof defaultContent }>({desktop: {...defaultContent}, mobile: {...defaultContent}})
  
  // For pages using useState<any>({...}), we need a different approach
  
  // 5. Find the useEffect fetch and update migration logic
  // Replace: setContent({ ...defaultContent, ...data })
  //   with: setContent(migrateToDeviceStructure(data, defaultContent))
  
  // 6. Find the handleChange function and make it device-aware
  // Replace: const handleChange = (key: string, value: any) => {
  //            setContent(prev => ({ ...prev, [key]: value }))
  //          }
  //   with: const handleChange = (device: 'desktop' | 'mobile', key: string, value: any) => {
  //            setContent(prev => ({ ...prev, [device]: { ...prev[device], [key]: value } }))
  //          }

  // 7. Wrap main form in renderForm(device) and replace return with DeviceTabsWrapper

  // This is very complex to do with string manipulation. Let's return the page name
  // so we know which pages need manual updating.
  return pagePath;
}

console.log('Pages needing device-tabs update:');
pages.forEach(page => {
  const pagePath = path.join(dashboardDir, page, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    console.log(`- ${page}`);
  }
});
