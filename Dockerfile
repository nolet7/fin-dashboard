# ---- build stage ----
FROM node:20.11-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# ---- runtime (non-root, port 8080) ----
# This image runs as an unprivileged user and listens on 8080 by default
FROM nginxinc/nginx-unprivileged:1.27.2-alpine

# Static files
COPY --from=build /app/dist /usr/share/nginx/html

# Site config (vhost)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

# Liveness/readiness for scanners
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q -O - http://127.0.0.1:8080/ >/dev/null 2>&1 || exit 1

# Base image already sets a non-root user and CMD ["nginx", "-g", "daemon off;"]
