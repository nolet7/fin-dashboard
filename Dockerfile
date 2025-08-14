# ---- build stage ----
FROM node:20.11-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# ---- runtime (non-root, port 8080) ----
FROM nginxinc/nginx-unprivileged:1.27.2-alpine

# Static files
COPY --from=build /app/dist /usr/share/nginx/html

# vhost config (no http{} wrapper)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# í±‡ satisfy CKV_DOCKER_3 and make it explicit weâ€™re non-root
USER 101

EXPOSE 8080

# Healthcheck for scanners/ops
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q -O - http://127.0.0.1:8080/ >/dev/null 2>&1 || exit 1
# CMD is inherited from base image (nginx -g 'daemon off;')

