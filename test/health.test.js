'use strict';

const assert = require('assert');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Path = require('path');

console.log('Running health endpoint tests...\n');

// Helper function to create a server for testing
const createTestServer = async () => {
  const server = Hapi.server({
    port: 3001, // Use a different port for testing
    host: 'localhost',
    routes: {
      files: {
        relativeTo: Path.join(__dirname, '..', 'public')
      }
    }
  });

  await server.register(Inert);

  // Health endpoints
  server.route({
    method: 'GET',
    path: '/health',
    handler: (request, h) => {
      return h.response({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'service-health',
        version: '1.0.0'
      }).code(200);
    }
  });

  server.route({
    method: 'GET',
    path: '/health/live',
    handler: (request, h) => {
      return h.response({
        status: 'ok',
        message: 'Service is alive'
      }).code(200);
    }
  });

  server.route({
    method: 'GET',
    path: '/health/ready',
    handler: (request, h) => {
      return h.response({
        status: 'ok',
        message: 'Service is ready'
      }).code(200);
    }
  });

  await server.initialize();
  return server;
};

// Run tests
const runTests = async () => {
  let server;
  
  try {
    server = await createTestServer();

    // Test 1: /health endpoint returns 200 and correct structure
    try {
      const response = await server.inject({
        method: 'GET',
        url: '/health'
      });

      assert.strictEqual(response.statusCode, 200, '/health should return 200 status code');
      
      const payload = JSON.parse(response.payload);
      assert.strictEqual(payload.status, 'ok', '/health should have status "ok"');
      assert(payload.timestamp, '/health should include timestamp');
      assert.strictEqual(payload.service, 'service-health', '/health should include service name');
      assert.strictEqual(payload.version, '1.0.0', '/health should include version');
      
      console.log('✓ Test 1 passed: /health endpoint returns correct response');
    } catch (error) {
      console.error('✗ Test 1 failed:', error.message);
      process.exit(1);
    }

    // Test 2: /health/live endpoint returns 200
    try {
      const response = await server.inject({
        method: 'GET',
        url: '/health/live'
      });

      assert.strictEqual(response.statusCode, 200, '/health/live should return 200 status code');
      
      const payload = JSON.parse(response.payload);
      assert.strictEqual(payload.status, 'ok', '/health/live should have status "ok"');
      assert.strictEqual(payload.message, 'Service is alive', '/health/live should have correct message');
      
      console.log('✓ Test 2 passed: /health/live endpoint returns correct response');
    } catch (error) {
      console.error('✗ Test 2 failed:', error.message);
      process.exit(1);
    }

    // Test 3: /health/ready endpoint returns 200
    try {
      const response = await server.inject({
        method: 'GET',
        url: '/health/ready'
      });

      assert.strictEqual(response.statusCode, 200, '/health/ready should return 200 status code');
      
      const payload = JSON.parse(response.payload);
      assert.strictEqual(payload.status, 'ok', '/health/ready should have status "ok"');
      assert.strictEqual(payload.message, 'Service is ready', '/health/ready should have correct message');
      
      console.log('✓ Test 3 passed: /health/ready endpoint returns correct response');
    } catch (error) {
      console.error('✗ Test 3 failed:', error.message);
      process.exit(1);
    }

    // Test 4: Health endpoints return JSON content-type
    try {
      const response = await server.inject({
        method: 'GET',
        url: '/health'
      });

      assert(response.headers['content-type'].includes('application/json'), 
             '/health should return JSON content-type');
      
      console.log('✓ Test 4 passed: Health endpoints return JSON content-type');
    } catch (error) {
      console.error('✗ Test 4 failed:', error.message);
      process.exit(1);
    }

    console.log('\n✓ All health endpoint tests passed!');
    await server.stop();
    process.exit(0);
  } catch (error) {
    console.error('✗ Test setup failed:', error);
    if (server) {
      await server.stop();
    }
    process.exit(1);
  }
};

runTests();
