import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Globe, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

export const TopBar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-glass border-b border-light-border dark:border-dark-border px-8 py-4 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300"
    >
      {/* Left section */}
      <div className="flex items-center space-x-6">
        {/* Search input removed */}
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-6">
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Trust indicators */}
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-light-glass dark:bg-dark-glass px-3 py-2 rounded-full transition-colors duration-300"
          >
            <Globe className="w-4 h-4 text-lime-accent" />
            <span className="text-xs text-light-text dark:text-dark-text">Encrypted</span>
          </motion.div>
        </div>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 bg-light-glass dark:bg-dark-glass rounded-full hover:bg-lime-accent/10 transition-colors duration-300"
        >
          <Bell className="w-5 h-5 text-light-text dark:text-dark-text" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-lime-accent rounded-full"
          />
        </motion.button>

        {/* User avatar */}
        <div className="relative group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 bg-lime-accent rounded-full flex items-center justify-center cursor-pointer shadow-glow"
          >
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-light-base dark:text-dark-base font-bold text-sm">
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </span>
            )}
          </motion.div>
          
          {/* Dropdown Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            whileHover={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute right-0 top-full mt-2 w-48 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl shadow-glass p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-50"
          >
            <div className="px-3 py-2 border-b border-light-border dark:border-dark-border mb-2">
              <p className="font-medium text-light-text dark:text-dark-text text-sm">{user?.name}</p>
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-xs">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center space-x-2 px-3 py-2 text-left text-light-text dark:text-dark-text hover:bg-light-glass dark:hover:bg-dark-glass rounded-lg transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};