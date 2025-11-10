'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('Running Task List component tests...\n');

let testsRun = 0;
let testsPassed = 0;

function test(description, fn) {
  testsRun++;
  try {
    fn();
    testsPassed++;
    console.log(`✓ Test ${testsRun} passed: ${description}`);
  } catch (error) {
    console.log(`✗ Test ${testsRun} failed: ${description}`);
    console.log(`  Error: ${error.message}`);
  }
}

// Test 1: Verify index.html contains Task List structure
test('index.html contains Task List component', () => {
  const indexPath = path.join(__dirname, '..', 'public', 'index.html');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  assert(indexContent.includes('govuk-task-list'), 'HTML should contain govuk-task-list class');
  assert(indexContent.includes('govuk-task-list__item'), 'HTML should contain task list items');
  assert(indexContent.includes('govuk-task-list__status'), 'HTML should contain status elements');
});

// Test 2: Verify all three health check endpoints are listed
test('Task List includes all three health check endpoints', () => {
  const indexPath = path.join(__dirname, '..', 'public', 'index.html');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  assert(indexContent.includes('/health'), 'Should list /health endpoint');
  assert(indexContent.includes('/health/live'), 'Should list /health/live endpoint');
  assert(indexContent.includes('/health/ready'), 'Should list /health/ready endpoint');
});

// Test 3: Verify JavaScript health check logic is present
test('index.html contains health check JavaScript', () => {
  const indexPath = path.join(__dirname, '..', 'public', 'index.html');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  assert(indexContent.includes('checkEndpoint'), 'Should contain checkEndpoint function');
  assert(indexContent.includes('runHealthChecks'), 'Should contain runHealthChecks function');
  assert(indexContent.includes('fetch(endpoint)'), 'Should use fetch API to call endpoints');
});

// Test 4: Verify CSS contains Task List styles
test('styles.css contains Task List component styles', () => {
  const cssPath = path.join(__dirname, '..', 'public', 'styles.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  assert(cssContent.includes('.govuk-task-list'), 'CSS should contain task list styles');
  assert(cssContent.includes('.govuk-task-list__item'), 'CSS should contain task list item styles');
  assert(cssContent.includes('.govuk-task-list__status'), 'CSS should contain status styles');
  assert(cssContent.includes('.govuk-task-list__status--completed'), 'CSS should contain completed status style');
  assert(cssContent.includes('.govuk-task-list__status--error'), 'CSS should contain error status style');
});

// Test 5: Verify Task List has proper hints
test('Task List items include descriptive hints', () => {
  const indexPath = path.join(__dirname, '..', 'public', 'index.html');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  assert(indexContent.includes('govuk-task-list__hint'), 'Should contain hint elements');
  assert(indexContent.includes('General health monitoring'), 'Should describe /health endpoint');
  assert(indexContent.includes('Liveness probe'), 'Should describe /health/live endpoint');
  assert(indexContent.includes('Readiness probe'), 'Should describe /health/ready endpoint');
});

// Test 6: Verify auto-refresh functionality
test('JavaScript includes auto-refresh functionality', () => {
  const indexPath = path.join(__dirname, '..', 'public', 'index.html');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  assert(indexContent.includes('setInterval'), 'Should include auto-refresh with setInterval');
  assert(indexContent.includes('30000'), 'Should refresh every 30 seconds');
});

console.log('\n' + (testsRun === testsPassed ? '✓' : '✗') + ` All tests passed! (${testsPassed}/${testsRun})`);
process.exit(testsRun === testsPassed ? 0 : 1);
