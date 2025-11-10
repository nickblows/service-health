# Service Health
A simple application for evaluating a live service

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
## Preview

![Service Health Monitor Preview](https://github.com/user-attachments/assets/614286a0-d7c8-44f1-9bcd-aade919d8570)

## Todo

### 1. Initial Setup
- [x] 1.1 Create basic prototype on main branch

### 2. Deployment
- [x] 2.1 Deploy app on Render
- [x] 2.2 Containerise the app

### 3. Configuration
- [ ] 3.1 Add .env file
- [ ] 3.2 Add a config file for the url of the service to monitor

### 4. Monitoring
- [x] 4.1 Add Health endpoints
- [ ] 4.2 Add a worker to periodically visit the monitored service to check its status and update the status on the homepage

### 5. Infrastructure
- [ ] 5.1 Add database

### 6. UI/Frontend
- [ ] 6.1 Add a defra logo svg
- [ ] 6.2 Add a GDS style Task List component to show all healthchecks and results

### 7. Documentation
- [x] 7.1 Update the readme to have a preview image of the finished site
- [x] 7.2 Add a link on Readme to the deployed site on Render
- [x] 7.3 Add a github copilot root instruction file (.github/copilot-instructions.md)
