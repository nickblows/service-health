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

// Test 5: Check if README.md exists
try {
  const readmePath = path.join(__dirname, '..', 'README.md');
  assert(fs.existsSync(readmePath), 'README.md should exist');
  console.log('✓ Test 5 passed: README.md exists');
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

console.log('\n✓ All tests passed!');
process.exit(0);
