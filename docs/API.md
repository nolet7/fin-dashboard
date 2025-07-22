# FinanceHub API Documentation

## Overview

FinanceHub uses a RESTful API architecture for communication between the frontend and backend services.

## Base URL

```
Development: http://localhost:3001/api
Production: https://your-domain.com/api
```

## Authentication

All API requests require authentication using JWT tokens.

### Headers

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## Endpoints

### Authentication

#### POST /auth/login
Login with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST /auth/register
Register a new user account.

#### POST /auth/logout
Logout and invalidate token.

### Users

#### GET /users/profile
Get current user profile.

#### PUT /users/profile
Update user profile.

#### PUT /users/password
Change user password.

### Wallets

#### GET /wallets
Get user's wallets.

#### POST /wallets
Create a new wallet.

#### PUT /wallets/:id
Update wallet balance.

### Transactions

#### GET /transactions
Get user's transactions with pagination.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `status`: Filter by status (pending, completed, failed)
- `type`: Filter by type (sent, received, exchange)

#### POST /transactions
Create a new transaction.

#### GET /transactions/:id
Get specific transaction details.

#### PUT /transactions/:id/status
Update transaction status.

### Exchange Rates

#### GET /exchange-rates
Get current exchange rates.

#### GET /exchange-rates/:from/:to
Get specific exchange rate.

#### POST /exchange/convert
Convert currency amount.

### Settings

#### GET /settings
Get user settings.

#### PUT /settings
Update user settings.

## Error Handling

All API responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  }
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Rate Limiting

API requests are limited to 100 requests per minute per user.