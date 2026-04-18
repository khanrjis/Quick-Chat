const pkg = require('./node_modules/@google/generative-ai/package.json');
console.log('package main:', pkg.main);
console.log('exports keys:', Object.keys(pkg.exports));
try {
  const mod = require('./node_modules/@google/generative-ai/dist/server/index.js');
  console.log('server module loaded, keys:', Object.keys(mod));
} catch (e) {
  console.error('server module load error', e.message);
}
try {
  const dist = require('./node_modules/@google/generative-ai/dist/index.js');
  console.log('dist module loaded, keys:', Object.keys(dist));
} catch (e) {
  console.error('dist module load error', e.message);
}
