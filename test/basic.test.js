'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('Running basic tests...\n');

// Test 1: Check if server.js exists
try {
  const serverPath = path.join(__dirname, '..', 'server.js');
  assert(fs.existsSync(serverPath), 'server.js should exist');
  console.log('✓ Test 1 passed: server.js exists');
} catch (error) {
  console.error('✗ Test 1 failed:', error.message);
  process.exit(1);
}

// Test 2: Check if package.json exists and has required scripts
try {
  const packagePath = path.join(__dirname, '..', 'package.json');
  assert(fs.existsSync(packagePath), 'package.json should exist');
  
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  assert(packageJson.scripts.start, 'package.json should have start script');
  assert(packageJson.scripts.test, 'package.json should have test script');
  assert(packageJson.scripts.build, 'package.json should have build script');
  
  console.log('✓ Test 2 passed: package.json has required scripts');
} catch (error) {
  console.error('✗ Test 2 failed:', error.message);
  process.exit(1);
}

// Test 3: Check if public/index.html exists
try {
  const indexPath = path.join(__dirname, '..', 'public', 'index.html');
  assert(fs.existsSync(indexPath), 'public/index.html should exist');
  
  const content = fs.readFileSync(indexPath, 'utf8');
  assert(content.includes('Service Health'), 'index.html should contain "Service Health"');
  assert(content.includes('GOV.UK'), 'index.html should contain "GOV.UK"');
  
  console.log('✓ Test 3 passed: public/index.html exists and has required content');
} catch (error) {
  console.error('✗ Test 3 failed:', error.message);
  process.exit(1);
}

// Test 4: Check if public/styles.css exists
try {
  const stylesPath = path.join(__dirname, '..', 'public', 'styles.css');
  assert(fs.existsSync(stylesPath), 'public/styles.css should exist');
  
  const content = fs.readFileSync(stylesPath, 'utf8');
  assert(content.includes('govuk'), 'styles.css should contain GDS styles');
  
  console.log('✓ Test 4 passed: public/styles.css exists and has GDS styles');
} catch (error) {
  console.error('✗ Test 4 failed:', error.message);
  process.exit(1);
}

// Test 5: Check if README.md exists and contains deployed site link
try {
  const readmePath = path.join(__dirname, '..', 'README.md');
  assert(fs.existsSync(readmePath), 'README.md should exist');
  
  const content = fs.readFileSync(readmePath, 'utf8');
  assert(content.includes('https://service-health-nk4s.onrender.com'), 
         'README.md should contain link to deployed site');
  
  console.log('✓ Test 5 passed: README.md exists and contains deployed site link');
} catch (error) {
  console.error('✗ Test 5 failed:', error.message);
  process.exit(1);
}

// Test 6: Check if LICENSE exists
try {
  const licensePath = path.join(__dirname, '..', 'LICENSE');
  assert(fs.existsSync(licensePath), 'LICENSE should exist');
  
  const content = fs.readFileSync(licensePath, 'utf8');
  assert(content.includes('MIT'), 'LICENSE should be MIT license');
  
  console.log('✓ Test 6 passed: LICENSE exists and is MIT');
} catch (error) {
  console.error('✗ Test 6 failed:', error.message);
  process.exit(1);
}

// Test 7: Check if .gitignore exists
try {
  const gitignorePath = path.join(__dirname, '..', '.gitignore');
  assert(fs.existsSync(gitignorePath), '.gitignore should exist');
  console.log('✓ Test 7 passed: .gitignore exists');
} catch (error) {
  console.error('✗ Test 7 failed:', error.message);
  process.exit(1);
}

// Test 8: Check if Dockerfile exists
try {
  const dockerfilePath = path.join(__dirname, '..', 'Dockerfile');
  assert(fs.existsSync(dockerfilePath), 'Dockerfile should exist');
  
  const content = fs.readFileSync(dockerfilePath, 'utf8');
  assert(content.includes('FROM'), 'Dockerfile should have FROM instruction');
  assert(content.includes('WORKDIR'), 'Dockerfile should have WORKDIR instruction');
  assert(content.includes('COPY'), 'Dockerfile should have COPY instruction');
  assert(content.includes('EXPOSE'), 'Dockerfile should have EXPOSE instruction');
  assert(content.includes('CMD'), 'Dockerfile should have CMD instruction');
  
  console.log('✓ Test 8 passed: Dockerfile exists and has required instructions');
} catch (error) {
  console.error('✗ Test 8 failed:', error.message);
  process.exit(1);
}

// Test 9: Check if .dockerignore exists
try {
  const dockerignorePath = path.join(__dirname, '..', '.dockerignore');
  assert(fs.existsSync(dockerignorePath), '.dockerignore should exist');
  
  const content = fs.readFileSync(dockerignorePath, 'utf8');
  assert(content.includes('node_modules'), '.dockerignore should exclude node_modules');
  
  console.log('✓ Test 9 passed: .dockerignore exists and excludes node_modules');
} catch (error) {
  console.error('✗ Test 9 failed:', error.message);
  process.exit(1);
}

// Test 10: Check if .env.example exists with required configuration
try {
  const envExamplePath = path.join(__dirname, '..', '.env.example');
  assert(fs.existsSync(envExamplePath), '.env.example should exist');
  
  const content = fs.readFileSync(envExamplePath, 'utf8');
  assert(content.includes('PORT'), '.env.example should include PORT configuration');
  assert(content.includes('HOST'), '.env.example should include HOST configuration');
  assert(content.includes('SERVICE_NAME'), '.env.example should include SERVICE_NAME configuration');
  assert(content.includes('SERVICE_VERSION'), '.env.example should include SERVICE_VERSION configuration');
  assert(content.includes('MONITORED_SERVICE_URL'), '.env.example should include MONITORED_SERVICE_URL configuration');
  
  console.log('✓ Test 10 passed: .env.example exists with required configuration');
} catch (error) {
  console.error('✗ Test 10 failed:', error.message);
  process.exit(1);
}

console.log('\n✓ All tests passed!');
process.exit(0);
