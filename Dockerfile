# ---- build stage ----
FROM node:20.16.0-alpine3.20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# ---- runtime (non-root, port 8080) ----
FROM nginx:1.27-alpine3.20

# Make runtime paths writable by non-root and owned by nginx user (UID/GID 101)
RUN mkdir -p /var/cache/nginx /var/run /usr/share/nginx/html \
  && chown -R nginx:nginx /var/cache/nginx /var/run /usr/share/nginx/html /etc/nginx

# Copy site and vhost config with correct ownership
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

# Run as the existing unprivileged user from the base image
USER nginx

EXPOSE 8080

# Simple liveness/readiness probe target for scanners/K8s
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q -O - http://127.0.0.1:8080/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
