import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, TrendingUp, TrendingDown, RefreshCw, Calculator } from 'lucide-react';

const exchangeRates = [
  { pair: 'EUR/USD', rate: 1.0892, change: +0.0023, changePercent: +0.21, flag1: '🇪🇺', flag2: '🇺🇸' },
  { pair: 'GBP/USD', rate: 1.2634, change: -0.0018, changePercent: -0.14, flag1: '🇬🇧', flag2: '🇺🇸' },
  { pair: 'USD/JPY', rate: 149.82, change: +0.45, changePercent: +0.30, flag1: '🇺🇸', flag2: '🇯🇵' },
  { pair: 'EUR/GBP', rate: 0.8621, change: +0.0008, changePercent: +0.09, flag1: '🇪🇺', flag2: '🇬🇧' },
  { pair: 'USD/CAD', rate: 1.3456, change: -0.0012, changePercent: -0.09, flag1: '🇺🇸', flag2: '🇨🇦' },
  { pair: 'AUD/USD', rate: 0.6789, change: +0.0034, changePercent: +0.50, flag1: '🇦🇺', flag2: '🇺🇸' },
];

export const ExchangeSection: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromAmount, setFromAmount] = useState('1000');
  const [toAmount, setToAmount] = useState('892.30');

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

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
          <h1 className="text-3xl font-bold text-light-text dark:text-dark-text font-editorial">Currency Exchange</h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">Real-time rates with instant conversion</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-light-glass dark:bg-dark-glass rounded-full hover:bg-lime-accent/10 transition-colors duration-300"
        >
          <RefreshCw className="w-5 h-5 text-light-text dark:text-dark-text" />
        </motion.button>
      </motion.div>

      {/* Exchange Calculator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-to-br from-light-surface to-light-glass dark:from-dark-surface dark:to-dark-glass border border-light-border dark:border-dark-border rounded-2xl p-8 shadow-glass"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Calculator className="w-6 h-6 text-lime-accent" />
          <h2 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial">Exchange Calculator</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-end">
          {/* From Currency */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">From</label>
            <div className="flex">
              <select 
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-l-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors"
              >
                {currencies.map(curr => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="bg-light-glass dark:bg-dark-glass border border-l-0 border-light-border dark:border-dark-border rounded-r-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 flex-1 transition-colors"
                placeholder="Enter amount"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-lime-accent/10 border border-lime-accent/20 rounded-full hover:bg-lime-accent/20 transition-all"
            >
              <ArrowUpDown className="w-5 h-5 text-lime-accent" />
            </motion.button>
          </div>

          {/* To Currency */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">To</label>
            <div className="flex">
              <select 
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-l-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors"
              >
                {currencies.map(curr => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
              <input
                type="number"
                value={toAmount}
                readOnly
                className="bg-light-glass dark:bg-dark-glass border border-l-0 border-light-border dark:border-dark-border rounded-r-xl px-4 py-3 text-light-text dark:text-dark-text flex-1 transition-colors"
                placeholder="Converted amount"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-6 border-t border-light-border dark:border-dark-border">
          <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Rate: 1 {fromCurrency} = 0.8923 {toCurrency}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-lime-accent text-light-base dark:text-dark-base px-8 py-3 rounded-xl font-medium hover:shadow-glow transition-all"
          >
            Exchange Now
          </motion.button>
        </div>
      </motion.div>

      {/* Live Rates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exchangeRates.map((rate, index) => (
          <motion.div
            key={rate.pair}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6 hover:border-lime-accent/30 transition-all hover:shadow-glow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{rate.flag1}</span>
                <ArrowUpDown className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                <span className="text-xl">{rate.flag2}</span>
                <span className="font-bold text-light-text dark:text-dark-text font-editorial">{rate.pair}</span>
              </div>
              <div className={`flex items-center space-x-1 ${rate.change >= 0 ? 'text-lime-accent' : 'text-red-400'}`}>
                {rate.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm">{rate.changePercent > 0 ? '+' : ''}{rate.changePercent}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-lime-accent font-editorial">
                  {rate.rate.toFixed(4)}
                </span>
                <span className={`text-sm ${rate.change >= 0 ? 'text-lime-accent' : 'text-red-400'}`}>
                  {rate.change > 0 ? '+' : ''}{rate.change.toFixed(4)}
                </span>
              </div>
              <button className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border px-4 py-2 rounded-lg text-sm hover:border-lime-accent/30 transition-colors">
                Use This Rate
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};