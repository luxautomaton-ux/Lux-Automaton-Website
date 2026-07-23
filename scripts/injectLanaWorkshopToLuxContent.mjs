import fs from 'fs';

const lanaWorkshop = JSON.parse(fs.readFileSync('./scripts/generated_lana_workshop.json', 'utf8'));

let content = fs.readFileSync('lib/luxContent.ts', 'utf8');

// Replace the concise lana-content-command-center object in WORKSHOP_PROGRAMS
const targetRegex = /{\s*slug:\s*"lana-content-command-center"[\s\S]*?},/m;

const replacementString = JSON.stringify(lanaWorkshop, null, 2) + ',';

if (targetRegex.test(content)) {
  content = content.replace(targetRegex, replacementString);
  fs.writeFileSync('lib/luxContent.ts', content);
  console.log('Successfully injected detailed LANA Content Command Center into lib/luxContent.ts!');
} else {
  console.error('Could not find target slug in lib/luxContent.ts');
}
