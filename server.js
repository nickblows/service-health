'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Path = require('path');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
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

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true
      }
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
