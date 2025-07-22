import { query } from '../lib/database';
import bcrypt from 'bcryptjs';

export interface User {
  id: number;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: Date;
}

export interface CreateUserData {
  email: string;
  name: string;
  password: string;
  avatar_url?: string;
}

// Create a new user
export const createUser = async (userData: CreateUserData): Promise<User> => {
  const { email, name, password, avatar_url } = userData;
  const passwordHash = await bcrypt.hash(password, 10);
  
  const result = await query(
    `INSERT INTO users (email, name, password_hash, avatar_url) 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, email, name, avatar_url, created_at`,
    [email, name, passwordHash, avatar_url]
  );
  
  return result.rows[0];
};

// Authenticate user
export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  const result = await query(
    'SELECT id, email, name, password_hash, avatar_url, created_at FROM users WHERE email = $1',
    [email]
  );
  
  if (result.rows.length === 0) {
    return null;
  }
  
  const user = result.rows[0];
  const isValidPassword = await bcrypt.compare(password, user.password_hash);
  
  if (!isValidPassword) {
    return null;
  }
  
  // Return user without password hash
  const { password_hash, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Get user by ID
export const getUserById = async (id: number): Promise<User | null> => {
  const result = await query(
    'SELECT id, email, name, avatar_url, created_at FROM users WHERE id = $1',
    [id]
  );
  
  return result.rows[0] || null;
};

// Update user profile
export const updateUser = async (id: number, updates: Partial<CreateUserData>): Promise<User> => {
  const fields = [];
  const values = [];
  let paramCount = 1;
  
  if (updates.name) {
    fields.push(`name = $${paramCount++}`);
    values.push(updates.name);
  }
  
  if (updates.email) {
    fields.push(`email = $${paramCount++}`);
    values.push(updates.email);
  }
  
  if (updates.avatar_url) {
    fields.push(`avatar_url = $${paramCount++}`);
    values.push(updates.avatar_url);
  }
  
  if (updates.password) {
    const passwordHash = await bcrypt.hash(updates.password, 10);
    fields.push(`password_hash = $${paramCount++}`);
    values.push(passwordHash);
  }
  
  values.push(id);
  
  const result = await query(
    `UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
     WHERE id = $${paramCount} 
     RETURNING id, email, name, avatar_url, created_at`,
    values
  );
  
  return result.rows[0];
};