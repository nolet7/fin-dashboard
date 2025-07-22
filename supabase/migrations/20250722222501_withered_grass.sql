-- FinanceHub Database Initialization Script
-- This script creates the database and user for FinanceHub

-- Create database (run as superuser)
CREATE DATABASE financehub;

-- Create user with password (update with your actual password)
CREATE USER financehub_user WITH PASSWORD 'your_secure_password_here';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE financehub TO financehub_user;

-- Connect to the financehub database and grant schema privileges
\c financehub;
GRANT ALL ON SCHEMA public TO financehub_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO financehub_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO financehub_user;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO financehub_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO financehub_user;