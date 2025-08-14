# ---- build stage (pin Node LTS + Alpine) ----
FROM node:20.16.0-alpine3.20 AS build
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Build
COPY . .
RUN npm run build

# ---- runtime (non-root, minimal CVEs) ----
# Use official nginx on pinned Alpine; we’ll drop privileges ourselves
FROM nginx:1.27-alpine3.20

# Create unprivileged user/group with stable UID/GID (101)
RUN addgroup -S web && adduser -S web -G web -u 101 \
  && mkdir -p /var/cache/nginx /var/run /usr/share/nginx/html \
  && chown -R 101:101 /var/cache/nginx /var/run /usr/share/nginx/html /etc/nginx

# Static site + vhost (make sure files are owned by the non-root user)
COPY --chown=101:101 --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Run as non-root, listen on high port (no CAP_NET_BIND)
USER 101
EXPOSE 8080

# Container-level healthcheck (K8s probes also added below)
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q -O - http://127.0.0.1:8080/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]

