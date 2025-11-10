# GitHub Copilot Instructions for Service Health

## Project Overview

Service Health is a Node.js application for monitoring and evaluating live services. The application provides health check endpoints and a web interface following UK Government Digital Service (GDS) design patterns and Defra branding.

## Technology Stack

- **Runtime**: Node.js (v18.x and v20.x)
- **Web Framework**: Hapi.js (@hapi/hapi v21.3.2)
- **Static Files**: @hapi/inert for serving static content
- **Deployment**: Docker containers on Render
- **Testing**: Native Node.js assert module

## Code Style and Conventions

### General Guidelines
- Use `'use strict';` at the top of all JavaScript files
- Use `const` and `let` for variable declarations (no `var`)
- Follow 2-space indentation
- Use single quotes for strings
- Use semicolons at the end of statements
- Keep code simple and readable

### Naming Conventions
- Use camelCase for variables and functions
- Use PascalCase for class names
- Use UPPERCASE for constants
- Use descriptive, meaningful names

### Error Handling
- Handle unhandled rejections with `process.on('unhandledRejection')`
- Use try-catch blocks for async operations in tests
- Provide clear error messages
- Exit with appropriate exit codes (0 for success, 1 for failure)

## Health Endpoints Pattern

The application provides three standard health check endpoints following Kubernetes probe conventions:

### `/health`
- Returns comprehensive service information
- Includes: status, timestamp, service name, and version
- HTTP 200 OK response
- Use case: General health monitoring and service discovery

### `/health/live`
- Liveness probe endpoint
- Simple status check to verify service is running
- HTTP 200 OK response
- Use case: Container orchestration liveness probes

### `/health/ready`
- Readiness probe endpoint
- Indicates service is ready to accept traffic
- HTTP 200 OK response
- Use case: Load balancer health checks and readiness probes

When adding new health endpoints, follow this pattern with consistent response structures.

## Frontend Guidelines

### GDS Design System
- Follow GOV.UK Design System patterns and components
- Use GDS typography classes (govuk-heading-*, govuk-body-*)
- Maintain semantic HTML structure
- Include appropriate ARIA attributes for accessibility

### Defra Branding
- Use Defra logo and branding in headers
- Maintain consistent styling with Defra services
- Keep the phase banner (prototype/alpha/beta tags)

### Accessibility
- Ensure semantic HTML with proper heading hierarchy
- Include appropriate ARIA labels and roles
- Maintain keyboard navigation support
- Use GDS patterns for accessible components

## Testing Strategy

### Test Organization
- Place all tests in the `test/` directory
- Use descriptive test file names (e.g., `basic.test.js`, `health.test.js`)
- Each test file should be executable with Node.js directly

### Test Structure
- Start with `'use strict';`
- Use native `assert` module for assertions
- Provide clear test descriptions with console output
- Use ✓ for passing tests, ✗ for failing tests
- Exit with code 0 on success, 1 on failure

### Test Types
- **Basic Tests**: File existence, configuration validation, documentation checks
- **Health Tests**: Endpoint testing using Hapi's `server.inject()` for integration tests
- Create test servers on different ports (e.g., 3001) to avoid conflicts

### Running Tests
- `npm test` runs the basic test suite
- Tests should be fast and not require external dependencies
- Mock or use test instances of the server rather than starting the actual server

## Docker and Deployment

### Containerization
- Base image: Node.js 20 LTS
- Working directory: `/app`
- Expose port: 3000
- Use `npm ci` for dependency installation in production builds
- Follow Docker best practices for layer caching

### Environment Configuration
- Server binds to `0.0.0.0` for container compatibility
- Port defaults to 3000 but can be overridden with `PORT` environment variable
- Future: Configuration will be moved to .env files (see TODO 3.1)

## Project Structure

```
service-health/
├── .github/
│   ├── workflows/       # CI/CD workflows
│   └── copilot-instructions.md  # This file
├── public/              # Static web content
│   ├── index.html      # Main page with GDS styling
│   └── styles.css      # GDS-based styles
├── test/                # Test files
│   ├── basic.test.js   # Basic validation tests
│   └── health.test.js  # Health endpoint tests
├── server.js            # Main Hapi.js server
├── package.json         # Dependencies and scripts
├── Dockerfile           # Container definition
└── README.md            # Project documentation
```

## Development Workflow

### Adding New Features
1. Follow the TODO list in README.md for planned features
2. Write tests first when possible (TDD approach)
3. Keep changes minimal and focused
4. Update documentation (README.md) when adding new features
5. Ensure all tests pass before committing

### Adding Dependencies
- Only add dependencies when necessary
- Prefer established, well-maintained packages
- Use exact versions or lock files for reproducibility
- Update package.json with proper versioning

### Documentation
- Keep README.md up to date with new features
- Document all API endpoints with examples
- Include clear usage instructions
- Provide deployment information

## Future Development (TODO Items)

Refer to the TODO section in README.md for planned features:
- Configuration management (.env files)
- Periodic health check workers
- Database integration
- Enhanced UI components (task lists, logos)
- Additional monitoring capabilities

When implementing TODO items, update the README.md to mark them complete and add corresponding documentation.

## Important Notes

- This is a prototype service (indicated by phase banner)
- Follows UK Government digital service standards
- Designed for container deployment (Kubernetes-ready)
- MIT licensed open source project
- Deployed on Render with auto-sleep after 15 minutes of inactivity

## Getting Help

- Refer to README.md for setup and deployment instructions
- Check package.json for available npm scripts
- Review test files for examples of proper patterns
- Follow Hapi.js documentation for server-related code
- Consult GOV.UK Design System for frontend components
