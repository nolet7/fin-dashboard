#!/bin/bash

# FinanceHub Database Setup Script
# This script sets up the PostgreSQL database for FinanceHub

set -e

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# Default values
DB_HOST=${DB_HOST:-192.168.0.103}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-financehub}
DB_USER=${DB_USER:-financehub_user}

echo "🚀 Setting up FinanceHub database..."
echo "Host: $DB_HOST:$DB_PORT"
echo "Database: $DB_NAME"
echo "User: $DB_USER"

# Check if PostgreSQL is accessible
echo "📡 Testing database connection..."
if ! pg_isready -h $DB_HOST -p $DB_PORT -U postgres; then
    echo "❌ Cannot connect to PostgreSQL at $DB_HOST:$DB_PORT"
    echo "Please ensure PostgreSQL is running and accessible."
    exit 1
fi

echo "✅ Database server is accessible"

# Create database and user (requires superuser privileges)
echo "🔧 Creating database and user..."
psql -h $DB_HOST -p $DB_PORT -U postgres -c "CREATE DATABASE $DB_NAME;" 2>/dev/null || echo "Database already exists"
psql -h $DB_HOST -p $DB_PORT -U postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';" 2>/dev/null || echo "User already exists"
psql -h $DB_HOST -p $DB_PORT -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"

# Run schema migration
echo "📋 Running database schema..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f supabase/migrations/20250722215635_stark_band.sql

# Run seed data (optional)
if [ -f database/seed.sql ]; then
    echo "🌱 Seeding database with sample data..."
    psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f database/seed.sql
fi

echo "🎉 Database setup completed successfully!"
echo ""
echo "You can now start the application with:"
echo "  npm run dev"
echo "  or"
echo "  docker-compose --profile dev up --build"