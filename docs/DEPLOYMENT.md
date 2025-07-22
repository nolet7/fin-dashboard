# FinanceHub Deployment Guide

## Overview

This guide covers deploying FinanceHub in various environments using Docker and Docker Compose.

## Prerequisites

- Docker and Docker Compose installed
- PostgreSQL database (local or remote)
- Environment variables configured

## Environment Setup

1. **Copy environment template:**
```bash
cp .env.example .env
```

2. **Configure environment variables:**
```env
# Production settings
NODE_ENV=production
APP_PORT=80

# Database (your PostgreSQL server)
DB_HOST=192.168.0.103
DB_PORT=5432
DB_NAME=financehub
DB_USER=your_username
DB_PASSWORD=your_secure_password

# Security
JWT_SECRET=your_very_secure_jwt_secret_key
```

## Deployment Options

### Option 1: Using External PostgreSQL (Recommended)

Use your existing PostgreSQL server at 192.168.0.103:

```bash
# 1. Configure .env for external database
DB_HOST=192.168.0.103
DB_USER=your_username
DB_PASSWORD=your_password

# 2. Setup database schema
./scripts/setup-db.sh

# 3. Deploy application
docker-compose up -d --build
```

### Option 2: With Containerized Database

Deploy with a containerized PostgreSQL database:

```bash
# 1. Configure .env for container database
DB_HOST=postgres
DB_USER=financehub
DB_PASSWORD=your_secure_password

# 2. Deploy with database container
docker-compose --profile db up -d --build
```

### Option 3: Development Mode

For development with hot reload:

```bash
# Deploy in development mode
docker-compose --profile dev up --build
```

## Production Deployment Steps

### 1. Server Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Application Deployment

```bash
# Clone repository
git clone <your-repo-url> financehub
cd financehub

# Configure environment
cp .env.example .env
nano .env  # Edit with your values

# Setup database
chmod +x scripts/setup-db.sh
./scripts/setup-db.sh

# Deploy application
docker-compose up -d --build
```

### 3. SSL/HTTPS Setup (Optional)

Add SSL certificate configuration to nginx.conf:

```nginx
server {
    listen 443 ssl;
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # ... rest of configuration
}
```

## Monitoring and Maintenance

### Health Checks

```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f

# Check database connection
docker-compose exec financehub curl -f http://localhost/health || exit 1
```

### Backup Database

```bash
# Run backup script
./scripts/backup-db.sh

# Manual backup
docker-compose exec postgres pg_dump -U financehub financehub > backup.sql
```

### Updates

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

## Scaling

### Horizontal Scaling

```yaml
# docker-compose.yml
services:
  financehub:
    deploy:
      replicas: 3
    # ... rest of configuration
```

### Load Balancer

Add nginx load balancer:

```nginx
upstream financehub_backend {
    server financehub_1:80;
    server financehub_2:80;
    server financehub_3:80;
}
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DB_HOST, DB_PORT, DB_USER, DB_PASSWORD in .env
   - Ensure PostgreSQL is accessible from Docker network

2. **Permission Denied**
   - Check file permissions: `chmod +x scripts/*.sh`
   - Ensure Docker daemon is running

3. **Port Already in Use**
   - Change APP_PORT in .env
   - Stop conflicting services: `sudo lsof -i :80`

### Logs

```bash
# Application logs
docker-compose logs financehub

# Database logs
docker-compose logs postgres

# All logs
docker-compose logs
```

## Security Considerations

1. **Environment Variables**
   - Never commit .env files to version control
   - Use strong passwords and JWT secrets
   - Rotate secrets regularly

2. **Network Security**
   - Use firewall to restrict database access
   - Enable SSL/TLS for production
   - Regular security updates

3. **Database Security**
   - Use dedicated database user with minimal privileges
   - Enable PostgreSQL SSL if possible
   - Regular backups and backup testing

## Performance Optimization

1. **Database**
   - Regular VACUUM and ANALYZE
   - Monitor query performance
   - Add indexes for frequently queried columns

2. **Application**
   - Enable gzip compression (already configured)
   - Use CDN for static assets
   - Monitor memory usage

3. **Caching**
   - Add Redis for session storage
   - Cache exchange rates
   - Implement API response caching