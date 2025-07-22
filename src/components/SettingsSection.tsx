import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Globe, CreditCard, Smartphone, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export const SettingsSection: React.FC = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-light-text dark:text-dark-text font-editorial">Settings</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">Manage your account and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-light-surface/50 dark:bg-dark-surface/50 border border-light-border dark:border-dark-border rounded-xl p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-lime-accent/10 text-lime-accent border border-lime-accent/20'
                    : 'text-light-text dark:text-dark-text hover:bg-light-glass dark:hover:bg-dark-glass'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="bg-light-surface/50 dark:bg-dark-surface/50 border border-light-border dark:border-dark-border rounded-xl p-6 shadow-glass">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial">Profile Information</h2>
                
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-lime-accent rounded-full flex items-center justify-center">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-light-base dark:text-dark-base font-bold text-xl">
                        {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>
                  <div>
                    <button className="bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border px-4 py-2 rounded-lg hover:border-lime-accent/30 transition-colors">
                      Change Photo
                    </button>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                      JPG, PNG or GIF. Max size 2MB
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="w-full px-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Email Address</label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full px-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Country</label>
                    <select className="w-full px-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors">
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Germany</option>
                      <option>France</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="bg-lime-accent text-light-base dark:text-dark-base px-6 py-3 rounded-xl font-medium hover:shadow-glow transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial">Security Settings</h2>
                
                {/* Password Change */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-light-text dark:text-dark-text">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          className="w-full px-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary"
                        >
                          {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          className="w-full px-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="border-t border-light-border dark:border-dark-border pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-light-text dark:text-dark-text">Two-Factor Authentication</h3>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Add an extra layer of security to your account</p>
                    </div>
                    <button className="bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border px-4 py-2 rounded-lg hover:border-lime-accent/30 transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                </div>

                {/* Login Sessions */}
                <div className="border-t border-light-border dark:border-dark-border pt-6">
                  <h3 className="text-lg font-medium text-light-text dark:text-dark-text mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    {[
                      { device: 'MacBook Pro', location: 'New York, US', current: true },
                      { device: 'iPhone 14', location: 'New York, US', current: false },
                      { device: 'Chrome Browser', location: 'London, UK', current: false },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-light-glass dark:bg-dark-glass rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                          <div>
                            <p className="text-sm font-medium text-light-text dark:text-dark-text">
                              {session.device} {session.current && '(Current)'}
                            </p>
                            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{session.location}</p>
                          </div>
                        </div>
                        {!session.current && (
                          <button className="text-sm text-red-400 hover:text-red-300 transition-colors">
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial">Notification Preferences</h2>
                
                {[
                  { title: 'Email Notifications', description: 'Receive updates via email', enabled: true },
                  { title: 'Push Notifications', description: 'Get notified on your devices', enabled: true },
                  { title: 'Transaction Alerts', description: 'Instant alerts for all transactions', enabled: true },
                  { title: 'Exchange Rate Updates', description: 'Daily rate updates for your currencies', enabled: false },
                  { title: 'Security Alerts', description: 'Important security notifications', enabled: true },
                  { title: 'Marketing Updates', description: 'Product updates and promotions', enabled: false },
                ].map((notification, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-light-glass dark:bg-dark-glass rounded-lg">
                    <div>
                      <h3 className="font-medium text-light-text dark:text-dark-text">{notification.title}</h3>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{notification.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={notification.enabled} className="sr-only peer" />
                      <div className="w-11 h-6 bg-light-border dark:bg-dark-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-accent"></div>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial">Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Theme</label>
                    <div className="flex space-x-3">
                      {[
                        { value: 'light', label: 'Light' },
                        { value: 'dark', label: 'Dark' },
                        { value: 'system', label: 'System' },
                      ].map((themeOption) => (
                        <button
                          key={themeOption.value}
                          onClick={() => setTheme(themeOption.value as any)}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            theme === themeOption.value
                              ? 'border-lime-accent bg-lime-accent/10 text-lime-accent'
                              : 'border-light-border dark:border-dark-border bg-light-glass dark:bg-dark-glass text-light-text dark:text-dark-text hover:border-lime-accent/30'
                          }`}
                        >
                          {themeOption.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Default Currency</label>
                    <select className="w-full px-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors">
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                      <option>GBP - British Pound</option>
                      <option>JPY - Japanese Yen</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Language</label>
                    <select className="w-full px-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Japanese</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Time Zone</label>
                    <select className="w-full px-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors">
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC-8 (Pacific Time)</option>
                      <option>UTC+0 (GMT)</option>
                      <option>UTC+1 (Central European Time)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial">Payment Methods</h2>
                  <button className="bg-lime-accent text-light-base dark:text-dark-base px-4 py-2 rounded-lg font-medium hover:shadow-glow transition-all">
                    Add New Card
                  </button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { type: 'Visa', last4: '4242', expiry: '12/25', default: true },
                    { type: 'Mastercard', last4: '8888', expiry: '09/26', default: false },
                  ].map((card, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <CreditCard className="w-8 h-8 text-light-text-secondary dark:text-dark-text-secondary" />
                        <div>
                          <p className="font-medium text-light-text dark:text-dark-text">
                            {card.type} •••• {card.last4}
                          </p>
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            Expires {card.expiry} {card.default && '• Default'}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text transition-colors">
                          Edit
                        </button>
                        <button className="text-sm text-red-400 hover:text-red-300 transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};