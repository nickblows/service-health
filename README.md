# Service Health
A simple application for evaluating a live service

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

- [x] 1.  Create basic prototype on main branch
- [x] 2.  Deploy app on Render
- [x] 3.  Containerise the app
- [ ] 4.  Add a defra logo svg
- [x] 5.  Update the readme to have a preview image of the finished site
- [ ] 6.  Add .env file
- [x] 7.  Add Health endpoints
- [ ] 8.  Add database
- [ ] 9.  Add a github copilor root instruction file (.github/copilot-instructions.md)
- [ ] 10. Add a link on Readme to the deployed site on Render
- [ ] 11. Add a GDS style Task List component to show all healthchecks and results