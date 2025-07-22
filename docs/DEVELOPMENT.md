# FinanceHub Development Guide

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 12+
- Docker and Docker Compose (optional)
- Git

### Local Development Setup

1. **Clone the repository:**
```bash
git clone <repository-url>
cd financehub
```

2. **Install dependencies:**
```bash
npm install
```

3. **Environment setup:**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. **Database setup:**
```bash
# Option 1: Use setup script
chmod +x scripts/setup-db.sh
./scripts/setup-db.sh

# Option 2: Manual setup
psql -h 192.168.0.103 -U postgres -c "CREATE DATABASE financehub;"
psql -h 192.168.0.103 -U your_user -d financehub -f supabase/migrations/20250722215635_stark_band.sql
```

5. **Start development server:**
```bash
npm run dev
```

### Docker Development

```bash
# Start with external database
docker-compose --profile dev up --build

# Start with containerized database
docker-compose --profile db --profile dev up --build
```

## Project Structure

```
financehub/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── forms/          # Form components
│   │   └── layout/         # Layout components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   ├── services/           # API services
│   └── types/              # TypeScript type definitions
├── database/               # Database scripts
├── docs/                   # Documentation
├── scripts/                # Utility scripts
├── supabase/
│   └── migrations/         # Database migrations
└── docker/                 # Docker configurations
```

## Development Workflow

### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# ... code changes ...

# Test changes
npm run dev

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

### 2. Database Changes

```bash
# Create new migration
# Add SQL file to supabase/migrations/

# Test migration
psql -h 192.168.0.103 -U your_user -d financehub_test -f supabase/migrations/new_migration.sql

# Update services if needed
# Edit src/services/*.ts
```

### 3. Component Development

```bash
# Create new component
touch src/components/NewComponent.tsx

# Add to exports
# Update src/components/index.ts

# Add stories (if using Storybook)
touch src/components/NewComponent.stories.tsx
```

## Code Standards

### TypeScript

- Use strict TypeScript configuration
- Define interfaces for all data structures
- Use proper typing for props and state
- Avoid `any` type

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

// Bad
const user: any = { ... };
```

### React Components

- Use functional components with hooks
- Implement proper prop typing
- Use meaningful component names
- Keep components focused and small

```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false
}) => {
  // Component implementation
};
```

### Styling

- Use Tailwind CSS for styling
- Follow consistent naming conventions
- Use CSS variables for theme colors
- Implement responsive design

```typescript
// Good
<div className="bg-light-surface dark:bg-dark-surface p-6 rounded-xl">

// Bad
<div style={{ backgroundColor: '#fff', padding: '24px' }}>
```

### State Management

- Use React Context for global state
- Use local state for component-specific data
- Implement proper error handling
- Use custom hooks for complex logic

## Testing

### Unit Tests

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Integration Tests

```bash
# Test database connection
npm run test:db

# Test API endpoints
npm run test:api
```

### E2E Tests

```bash
# Run end-to-end tests
npm run test:e2e
```

## Database Development

### Migrations

1. **Create migration file:**
```sql
-- supabase/migrations/YYYYMMDD_description.sql
-- Add your SQL changes here
```

2. **Test migration:**
```bash
psql -h 192.168.0.103 -U your_user -d financehub_test -f supabase/migrations/new_migration.sql
```

3. **Update services:**
```typescript
// Update corresponding service files
// src/services/userService.ts
```

### Seeding Data

```bash
# Run seed script
psql -h 192.168.0.103 -U your_user -d financehub -f database/seed.sql
```

## API Development

### Service Layer

```typescript
// src/services/userService.ts
export const getUserById = async (id: string): Promise<User> => {
  const result = await query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};
```

### Error Handling

```typescript
try {
  const user = await getUserById(id);
  return user;
} catch (error) {
  console.error('Error fetching user:', error);
  throw new Error('Failed to fetch user');
}
```

## Performance Optimization

### React Performance

- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Use useMemo and useCallback when appropriate
- Avoid unnecessary re-renders

### Database Performance

- Use proper indexes
- Optimize queries
- Implement pagination
- Use connection pooling

### Bundle Optimization

- Use dynamic imports for code splitting
- Optimize images and assets
- Minimize bundle size
- Use proper caching strategies

## Debugging

### Development Tools

- React Developer Tools
- Redux DevTools (if using Redux)
- Browser DevTools
- Database query tools

### Logging

```typescript
// Use consistent logging
console.log('Debug info:', data);
console.error('Error occurred:', error);

// Use proper error boundaries
<ErrorBoundary>
  <Component />
</ErrorBoundary>
```

## Deployment

### Development Deployment

```bash
# Build for development
npm run build:dev

# Deploy to staging
npm run deploy:staging
```

### Production Deployment

```bash
# Build for production
npm run build

# Deploy to production
npm run deploy:prod
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Update documentation
6. Submit a pull request

### Pull Request Guidelines

- Clear description of changes
- Include tests for new features
- Update documentation
- Follow code standards
- Ensure CI passes

## Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Docker Documentation](https://docs.docker.com)