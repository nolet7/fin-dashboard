# FinanceHub Helm Chart

This Helm chart deploys FinanceHub application to Kubernetes with external PostgreSQL database support.

## Prerequisites

- Kubernetes 1.19+
- Helm 3.0+
- External PostgreSQL database accessible from the cluster

## Installation

### 1. Create Database Secret

First, create a Kubernetes secret with your database credentials:

```bash
kubectl create namespace financehub

kubectl -n financehub create secret generic financehub-db \
  --from-literal=DB_HOST=<YOUR_DB_HOST> \
  --from-literal=DB_PORT=5432 \
  --from-literal=DB_NAME=financehub \
  --from-literal=DB_USER=admin \
  --from-literal=DB_PASSWORD=<YOUR_DB_PASSWORD>
```

### 2. Install the Chart

#### Option 1: Using envFromSecret (Recommended)

```bash
helm upgrade --install financehub ./helm \
  --namespace financehub \
  --set envFromSecret=financehub-db
```

#### Option 2: Using Individual Environment Variables

```bash
helm upgrade --install financehub ./helm \
  --namespace financehub \
  --set env.DB_HOST=<YOUR_DB_HOST> \
  --set env.DB_PASSWORD=<YOUR_DB_PASSWORD>
```

### 3. Run Database Migration

Run the database migration to set up the schema:

```bash
# Method 1: Using kubectl run (one-time job)
kubectl -n financehub run migration --rm -i --restart=Never \
  --image=postgres:15-alpine \
  --env="PGPASSWORD=<YOUR_DB_PASSWORD>" \
  -- psql "postgresql://admin:<PASSWORD>@<DB_HOST>:5432/financehub" \
  -f /dev/stdin < supabase/migrations/20250722215635_stark_band.sql

# Method 2: Copy migration file to pod and execute
kubectl -n financehub cp supabase/migrations/20250722215635_stark_band.sql migration-pod:/tmp/migration.sql
kubectl -n financehub exec migration-pod -- psql "postgresql://admin:<PASSWORD>@<DB_HOST>:5432/financehub" -f /tmp/migration.sql
```

## Configuration

### Database Configuration

The chart supports two methods for database configuration:

#### Method 1: envFromSecret (Recommended)

Set `envFromSecret` to the name of a Kubernetes secret containing database credentials:

```yaml
envFromSecret: "financehub-db"
```

The secret should contain these keys:
- `DB_HOST`: Database hostname/IP
- `DB_PORT`: Database port (usually 5432)
- `DB_NAME`: Database name (usually financehub)
- `DB_USER`: Database username (usually admin)
- `DB_PASSWORD`: Database password

#### Method 2: Individual Environment Variables

Set database credentials directly in values:

```yaml
env:
  DB_HOST: "your-db-host"
  DB_PORT: "5432"
  DB_NAME: "financehub"
  DB_USER: "admin"
  DB_PASSWORD: "your-password"
```

**⚠️ Warning**: This method exposes credentials in Helm values. Use envFromSecret for production.

### Other Configuration Options

| Parameter | Description | Default |
|-----------|-------------|---------|
| `replicaCount` | Number of replicas | `1` |
| `image.repository` | Image repository | `financehub` |
| `image.tag` | Image tag | `latest` |
| `service.type` | Service type | `ClusterIP` |
| `service.port` | Service port | `80` |
| `ingress.enabled` | Enable ingress | `false` |
| `resources` | Resource limits/requests | `{}` |

## Examples

### Production Deployment with Ingress

```yaml
# values-prod.yaml
replicaCount: 3
envFromSecret: "financehub-db"

ingress:
  enabled: true
  className: "nginx"
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
  hosts:
    - host: financehub.yourdomain.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: financehub-tls
      hosts:
        - financehub.yourdomain.com

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi
```

Deploy with:
```bash
helm upgrade --install financehub ./helm \
  --namespace financehub \
  --values values-prod.yaml
```

### Development Deployment

```yaml
# values-dev.yaml
replicaCount: 1
envFromSecret: "financehub-db-dev"

env:
  NODE_ENV: "development"

resources:
  limits:
    cpu: 200m
    memory: 256Mi
  requests:
    cpu: 100m
    memory: 128Mi
```

## Troubleshooting

### Database Connection Issues

1. **Check secret exists and has correct keys:**
   ```bash
   kubectl -n financehub get secret financehub-db -o yaml
   kubectl -n financehub describe secret financehub-db
   ```

2. **Test database connectivity from cluster:**
   ```bash
   kubectl -n financehub run db-test --rm -i --restart=Never \
     --image=postgres:15-alpine \
     --env="PGPASSWORD=<PASSWORD>" \
     -- psql "postgresql://admin:<PASSWORD>@<DB_HOST>:5432/financehub" -c "SELECT version();"
   ```

3. **Check application logs:**
   ```bash
   kubectl -n financehub logs -l app.kubernetes.io/name=financehub
   ```

### Common Issues

- **"Missing required database environment variables"**: Ensure the secret exists and is properly referenced
- **"Database connection failed"**: Check network connectivity and database credentials
- **"relation does not exist"**: Run the database migration script

## Uninstalling

```bash
helm uninstall financehub --namespace financehub
kubectl delete secret financehub-db --namespace financehub
```