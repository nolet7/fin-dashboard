# FinanceHub - Global Banking Platform

A modern, responsive financial dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- 🌍 Multi-currency wallet management
- 📊 Real-time exchange rates
- 💸 Transaction timeline and history
- 🎨 Beautiful dark/light theme support
- 🔐 Secure authentication system
- 📱 Fully responsive design
- 🐳 Docker support
- 🗄️ PostgreSQL database integration

## Quick Start

### Environment Setup

1. **Copy environment file:**
```bash
cp .env.example .env
```

2. **Update database configuration in `.env`:**
```env
DB_HOST=192.168.0.103
DB_PORT=5432
DB_NAME=financehub
DB_USER=your_username
DB_PASSWORD=your_password
```

3. **Set up your PostgreSQL database:**
```sql
-- Connect to your PostgreSQL server
psql -h 192.168.0.103 -U your_username -d financehub

-- Run the migration script
\i supabase/migrations/20250722215635_stark_band.sql
```

### Using Docker (Recommended)

#### Production Build
```bash
# Make sure .env file is configured
# Build and run the production version
docker-compose up --build

# Access the app at http://localhost:3000
```

#### Development Mode
```bash
# Run in development mode with hot reload
docker-compose --profile dev up financehub-dev --build

# Access the app at http://localhost:5173
```

#### With Containerized Database
```bash
# Run with containerized PostgreSQL (optional)
docker-compose --profile db --profile dev up --build

# This will start:
# - PostgreSQL container
# - Development server
# - Auto-run database migrations
```

### Local Development

```bash
# Copy and configure environment
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Docker Commands

### Production
```bash
# Build and start production container
docker-compose up -d --build

# Stop containers
docker-compose down

# View logs
docker-compose logs -f
```

### Development
```bash
# Start development container with hot reload
docker-compose --profile dev up financehub-dev

# Rebuild development container
docker-compose --profile dev up financehub-dev --build

# Stop development container
docker-compose --profile dev down
```

### Database Management
```bash
# Start only the database container
docker-compose --profile db up postgres -d

# Connect to containerized database
docker-compose exec postgres psql -U financehub -d financehub

# View database logs
docker-compose logs postgres

# Backup database
docker-compose exec postgres pg_dump -U financehub financehub > backup.sql
```

## Demo Accounts

Try these demo accounts to explore the application:

- **Demo Account**: john.doe@example.com / demo123
- **Business Account**: sarah.wilson@company.com / demo123
- **Startup Account**: alex.chen@startup.io / demo123

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Database**: PostgreSQL
- **ORM**: Native SQL with pg driver
- **Container**: Docker & Docker Compose
- **Web Server**: Nginx (production)

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, Theme)
├── services/          # Database services
├── lib/               # Database connection and utilities
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles

database/
├── migrations/        # Database migration files
└── schema.sql         # Complete database schema

docker/
├── Dockerfile         # Production build
├── Dockerfile.dev     # Development build
├── docker-compose.yml # Container orchestration
└── nginx.conf         # Nginx configuration
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Application
NODE_ENV=development
APP_PORT=3000
DEV_PORT=5173

# Database (Required)
DB_HOST=192.168.0.103
DB_PORT=5432
DB_NAME=financehub
DB_USER=your_username
DB_PASSWORD=your_password

# Optional
VITE_API_URL=http://localhost:3001
JWT_SECRET=your_jwt_secret
```

## Database Setup

### Using Your Existing PostgreSQL (192.168.0.103)

1. **Configure environment:**
```env
DB_HOST=192.168.0.103
DB_PORT=5432
DB_NAME=financehub
DB_USER=your_username
DB_PASSWORD=your_password
```

2. **Run migrations:**
```bash
psql -h 192.168.0.103 -U your_username -d financehub -f supabase/migrations/20250722215635_stark_band.sql
```

### Using Containerized PostgreSQL

1. **Configure environment:**
```env
DB_HOST=postgres
DB_PORT=5432
DB_NAME=financehub
DB_USER=financehub
DB_PASSWORD=your_password
```

2. **Start with database:**
```bash
docker-compose --profile db up --build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Configure `.env` file
5. Test with Docker: `docker-compose --profile dev up financehub-dev --build`
6. Submit a pull request

## License

MIT License - see LICENSE file for details.