const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../dist/netproCleaning/browser');

fs.copyFileSync(
  path.join(distPath, 'index.html'),
  path.join(distPath, '404.html')
);

fs.writeFileSync(path.join(distPath, '.nojekyll'), '');

console.log('GitHub Pages setup complete:');
console.log('- 404.html created');
console.log('- .nojekyll created');
