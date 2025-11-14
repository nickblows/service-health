
# Service Health
A simple application for evaluating a live service

## Table of Contents

- [Live Demo](#live-demo)
- [Health Endpoints](#health-endpoints)
- [Configuration](#configuration)
- [Preview](#preview)
- [Todo](#todo)

# Optional Sections (remove any you don't want)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


## Live Demo
The service is deployed and available at: [https://service-health-nk4s.onrender.com](https://service-health-nk4s.onrender.com)

> **Note:** The Render hosted app goes to sleep after 15 minutes of inactivity and may take a few seconds to wake up.

## Health Endpoints

The service provides three health check endpoints for monitoring and orchestration:

### `/health`
Returns comprehensive service health information including status, timestamp, service name, and version.

**Response Example:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-09T19:26:41.957Z",
  "service": "service-health",
  "version": "1.0.0"
}
```

**HTTP Status:** `200 OK`

**Use Case:** General health monitoring and service discovery

### `/health/live`
Liveness probe endpoint that indicates whether the service is running and operational.

**Response Example:**
```json
{
  "status": "ok",
  "message": "Service is alive"
}
```

**HTTP Status:** `200 OK`

**Use Case:** Container orchestration liveness probes (e.g., Kubernetes, Docker Swarm)

### `/health/ready`
Readiness probe endpoint that indicates whether the service is ready to accept traffic.

**Response Example:**
```json
{
  "status": "ok",
  "message": "Service is ready"
}
```

**HTTP Status:** `200 OK`

**Use Case:** Load balancer health checks and container orchestration readiness probes

## Configuration

The application uses environment variables for configuration. You can configure the service by creating a `.env` file in the root directory.

### Environment Variables

Copy `.env.example` to `.env` and customize the values:

```bash
cp .env.example .env
```

Available environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port the server listens on | `3000` |
| `HOST` | Host address to bind to | `0.0.0.0` |
| `SERVICE_NAME` | Service name displayed in health endpoint | `service-health` |
| `SERVICE_VERSION` | Service version displayed in health endpoint | `1.0.0` |
| `MONITORED_SERVICE_URL` | URL of the service to monitor | `https://service-health-nk4s.onrender.com` |
| `NODE_ENV` | Node environment (development, production) | `development` |

### Example `.env` file

```env
PORT=3000
HOST=0.0.0.0
SERVICE_NAME=service-health
SERVICE_VERSION=1.0.0
MONITORED_SERVICE_URL=https://service-health-nk4s.onrender.com
NODE_ENV=development
```

## Preview

![Service Health Monitor Preview](https://github.com/user-attachments/assets/614286a0-d7c8-44f1-9bcd-aade919d8570)

## Todo

### 1. Initial Setup
- [x] 1.1 Create basic prototype on main branch

### 2. Deployment
- [x] 2.1 Deploy app on Render
- [x] 2.2 Containerise the app

### 3. Configuration
- [x] 3.1 Add .env file
- [x] 3.2 Add a config file for the url of the service to monitor

### 4. Monitoring
- [x] 4.1 Add Health endpoints
- [ ] 4.2 Add a worker to periodically visit the monitored service to check its status and update the status on the homepage

### 5. Infrastructure
- [ ] 5.1 Add database

### 6. UI/Frontend
- [ ] 6.1 Add a defra logo svg
- [x] 6.2 Add a GDS style Task List component to show all healthchecks and results

### 7. Documentation
- [x] 7.1 Update the readme to have a preview image of the finished site
- [x] 7.2 Add a link on Readme to the deployed site on Render
- [x] 7.3 Add a github copilot root instruction file (.github/copilot-instructions.md)
- [x] 7.4 Add Table of Contents to README
