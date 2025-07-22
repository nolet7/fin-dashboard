-- FinanceHub Database Seed Data
-- Run this after the main schema to populate with sample data

-- Insert sample users (passwords are hashed for 'demo123')
INSERT INTO users (email, name, password_hash) VALUES
('john.doe@example.com', 'John Doe', '$2a$10$rOzJqQZQQQZQQZQQZQQZQOzJqQZQQQZQQZQQZQQZQOzJqQZQQQZQQZQ'),
('sarah.wilson@company.com', 'Sarah Wilson', '$2a$10$rOzJqQZQQQZQQZQQZQQZQOzJqQZQQQZQQZQQZQQZQOzJqQZQQQZQQZQ'),
('alex.chen@startup.io', 'Alex Chen', '$2a$10$rOzJqQZQQQZQQZQQZQQZQOzJqQZQQQZQQZQQZQQZQOzJqQZQQQZQQZQ')
ON CONFLICT (email) DO NOTHING;

-- Insert sample wallets for John Doe (user_id = 1)
INSERT INTO wallets (user_id, currency_id, balance) VALUES
(1, (SELECT id FROM currencies WHERE code = 'USD'), 12847.32),
(1, (SELECT id FROM currencies WHERE code = 'EUR'), 8923.41),
(1, (SELECT id FROM currencies WHERE code = 'GBP'), 6432.18),
(1, (SELECT id FROM currencies WHERE code = 'JPY'), 1234567.00)
ON CONFLICT (user_id, currency_id) DO NOTHING;

-- Insert sample exchange rates
INSERT INTO exchange_rates (from_currency_id, to_currency_id, rate, change_24h, change_percent) VALUES
((SELECT id FROM currencies WHERE code = 'EUR'), (SELECT id FROM currencies WHERE code = 'USD'), 1.0892, 0.0023, 0.21),
((SELECT id FROM currencies WHERE code = 'GBP'), (SELECT id FROM currencies WHERE code = 'USD'), 1.2634, -0.0018, -0.14),
((SELECT id FROM currencies WHERE code = 'USD'), (SELECT id FROM currencies WHERE code = 'JPY'), 149.82, 0.45, 0.30),
((SELECT id FROM currencies WHERE code = 'EUR'), (SELECT id FROM currencies WHERE code = 'GBP'), 0.8621, 0.0008, 0.09)
ON CONFLICT (from_currency_id, to_currency_id) DO NOTHING;

-- Insert sample transactions for John Doe
INSERT INTO transactions (user_id, type, amount, currency_id, recipient_name, recipient_email, location, country_flag, category, reference, status, fee) VALUES
(1, 'sent', -2500.00, (SELECT id FROM currencies WHERE code = 'USD'), 'Sarah Johnson', 'sarah.j@company.com', 'New York, US', '🇺🇸', 'Business', 'Consulting payment', 'completed', 5.00),
(1, 'received', 1840.00, (SELECT id FROM currencies WHERE code = 'EUR'), 'Freelance Client', 'client@startup.de', 'Berlin, DE', '🇩🇪', 'Income', 'Web development project', 'completed', 0.00),
(1, 'sent', -850.00, (SELECT id FROM currencies WHERE code = 'GBP'), 'Alex Chen', 'alex@techcorp.uk', 'London, UK', '🇬🇧', 'Business', 'Equipment purchase', 'pending', 3.50),
(1, 'sent', -89.99, (SELECT id FROM currencies WHERE code = 'GBP'), 'British Airways', 'booking@ba.com', 'London, UK', '🇬🇧', 'Travel', 'Flight booking', 'completed', 2.00);

-- Insert sample user settings
INSERT INTO user_settings (user_id, theme, default_currency_id, language, timezone) VALUES
(1, 'system', (SELECT id FROM currencies WHERE code = 'USD'), 'en', 'America/New_York'),
(2, 'dark', (SELECT id FROM currencies WHERE code = 'EUR'), 'en', 'Europe/London'),
(3, 'light', (SELECT id FROM currencies WHERE code = 'USD'), 'en', 'America/Los_Angeles')
ON CONFLICT (user_id) DO NOTHING;

-- Insert sample payment methods
INSERT INTO payment_methods (user_id, type, card_type, last_four, expiry_month, expiry_year, is_default) VALUES
(1, 'card', 'Visa', '4242', 12, 2025, true),
(1, 'card', 'Mastercard', '8888', 9, 2026, false)
ON CONFLICT DO NOTHING;