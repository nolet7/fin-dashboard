import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Send, ArrowUpDown, Eye, EyeOff, TrendingUp, TrendingDown, CreditCard, X } from 'lucide-react';

const currencies = [
  { code: 'USD', symbol: '$', balance: 12847.32, change: +2.34, flag: '🇺🇸', color: 'bg-blue-500' },
  { code: 'EUR', symbol: '€', balance: 8923.41, change: -1.12, flag: '🇪🇺', color: 'bg-purple-500' },
  { code: 'GBP', symbol: '£', balance: 6432.18, change: +0.89, flag: '🇬🇧', color: 'bg-green-500' },
  { code: 'JPY', symbol: '¥', balance: 1234567, change: -0.45, flag: '🇯🇵', color: 'bg-red-500' },
  { code: 'CAD', symbol: 'C$', balance: 3456.78, change: +1.23, flag: '🇨🇦', color: 'bg-orange-500' },
  { code: 'AUD', symbol: 'A$', balance: 2789.45, change: +0.67, flag: '🇦🇺', color: 'bg-yellow-500' },
];

export const WalletSection: React.FC = () => {
  const [showBalances, setShowBalances] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [showAddCurrency, setShowAddCurrency] = useState(false);
  const [newCurrencyCode, setNewCurrencyCode] = useState('');
  const [initialBalance, setInitialBalance] = useState('');

  const totalValue = currencies.reduce((sum, curr) => sum + curr.balance, 0);

  const availableCurrencies = [
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
    { code: 'EGP', name: 'Egyptian Pound', symbol: '£', flag: '🇪🇬' },
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪' },
    { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭' },
    { code: 'MAD', name: 'Moroccan Dirham', symbol: 'DH', flag: '🇲🇦' },
    { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت', flag: '🇹🇳' },
    { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', flag: '🇺🇬' },
    { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', flag: '🇪🇹' },
    { code: 'XOF', name: 'West African CFA Franc', symbol: 'CFA', flag: '🇸🇳' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
    { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  ].filter(curr => !currencies.some(existing => existing.code === curr.code));

  const handleAddCurrency = () => {
    if (newCurrencyCode && initialBalance) {
      const selectedCurr = availableCurrencies.find(c => c.code === newCurrencyCode);
      if (selectedCurr) {
        // In a real app, this would make an API call to add the currency
        console.log('Adding currency:', {
          code: newCurrencyCode,
          balance: parseFloat(initialBalance),
          currency: selectedCurr
        });
        
        // Reset form and close modal
        setNewCurrencyCode('');
        setInitialBalance('');
        setShowAddCurrency(false);
        
        // Show success message (you could add a toast notification here)
        alert(`${selectedCurr.name} wallet added successfully!`);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-light-text dark:text-dark-text font-editorial">My Wallet</h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">Manage your multi-currency portfolio</p>
        </div>
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBalances(!showBalances)}
            className="p-3 bg-light-glass dark:bg-dark-glass rounded-full hover:bg-lime-accent/10 transition-colors duration-300"
          >
            {showBalances ? (
              <Eye className="w-5 h-5 text-light-text dark:text-dark-text" />
            ) : (
              <EyeOff className="w-5 h-5 text-light-text dark:text-dark-text" />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddCurrency(true)}
            className="flex items-center space-x-2 bg-lime-accent text-light-base dark:text-dark-base px-4 py-3 rounded-xl font-medium hover:shadow-glow transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Add Currency</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Total Portfolio Value */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-to-br from-light-surface to-light-glass dark:from-dark-surface dark:to-dark-glass border border-light-border dark:border-dark-border rounded-2xl p-8 shadow-glass relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-lime-accent/5 rounded-full blur-3xl" />
        <div className="relative">
          <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm uppercase tracking-wider">Total Portfolio Value</p>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-bold text-lime-accent font-editorial">
              {showBalances ? `$${totalValue.toLocaleString()}` : '••••••••'}
            </span>
            <span className="text-lg text-light-text-secondary dark:text-dark-text-secondary">USD</span>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <TrendingUp className="w-4 h-4 text-lime-accent" />
            <span className="text-lime-accent text-sm">+4.2% this month</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Send, label: 'Send Money', color: 'bg-blue-500' },
          { icon: ArrowUpDown, label: 'Exchange', color: 'bg-purple-500' },
          { icon: CreditCard, label: 'Top Up', color: 'bg-green-500' },
        ].map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-3 p-4 bg-light-surface/50 dark:bg-dark-surface/50 border border-light-border dark:border-dark-border rounded-xl hover:border-lime-accent/30 transition-all"
          >
            <div className={`p-3 ${action.color}/20 rounded-full`}>
              <action.icon className={`w-5 h-5 ${action.color.replace('bg-', 'text-')}`} />
            </div>
            <span className="font-medium text-light-text dark:text-dark-text">{action.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Currency Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currencies.map((currency, index) => (
          <motion.div
            key={currency.code}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6 hover:border-lime-accent/30 transition-all hover:shadow-glow group cursor-pointer"
            onClick={() => setSelectedCurrency(currency.code)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{currency.flag}</span>
                <div>
                  <h3 className="font-bold text-light-text dark:text-dark-text font-editorial">{currency.code}</h3>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Available Balance</p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 ${currency.change >= 0 ? 'text-lime-accent' : 'text-red-400'}`}>
                {currency.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm">{currency.change > 0 ? '+' : ''}{currency.change}%</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-2xl font-bold text-light-text dark:text-dark-text font-editorial">
                {showBalances ? `${currency.symbol}${currency.balance.toLocaleString()}` : '••••••'}
              </p>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border px-3 py-2 rounded-lg text-sm hover:border-lime-accent/30 transition-colors">
                  Send
                </button>
                <button className="flex-1 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border px-3 py-2 rounded-lg text-sm hover:border-lime-accent/30 transition-colors">
                  Exchange
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Currency Modal */}
      {showAddCurrency && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowAddCurrency(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-8 max-w-md w-full mx-4 shadow-glass"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial">Add New Currency</h3>
              <button
                onClick={() => setShowAddCurrency(false)}
                className="p-2 hover:bg-light-glass dark:hover:bg-dark-glass rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
              </button>
            </div>

            {/* Currency Selection */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                  Select Currency
                </label>
                <select
                  value={newCurrencyCode}
                  onChange={(e) => setNewCurrencyCode(e.target.value)}
                  className="w-full px-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors"
                >
                  <option value="">Choose a currency...</option>
                  {availableCurrencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Initial Balance */}
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                  Initial Balance
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={initialBalance}
                    onChange={(e) => setInitialBalance(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:border-lime-accent/50 transition-colors"
                  />
                  {newCurrencyCode && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary">
                      {availableCurrencies.find(c => c.code === newCurrencyCode)?.symbol}
                    </span>
                  )}
                </div>
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                  Enter the amount you want to add to this currency wallet
                </p>
              </div>

              {/* Selected Currency Preview */}
              {newCurrencyCode && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-light-glass dark:bg-dark-glass rounded-xl border border-light-border dark:border-dark-border"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {availableCurrencies.find(c => c.code === newCurrencyCode)?.flag}
                    </span>
                    <div>
                      <p className="font-medium text-light-text dark:text-dark-text">
                        {availableCurrencies.find(c => c.code === newCurrencyCode)?.name}
                      </p>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {newCurrencyCode} • {availableCurrencies.find(c => c.code === newCurrencyCode)?.symbol}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => setShowAddCurrency(false)}
                className="flex-1 px-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text hover:border-lime-accent/30 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddCurrency}
                disabled={!newCurrencyCode || !initialBalance}
                className="flex-1 bg-lime-accent text-light-base dark:text-dark-base px-4 py-3 rounded-xl font-medium hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Currency
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};