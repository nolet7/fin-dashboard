import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface Currency {
  code: string;
  symbol: string;
  balance: number;
  change: number;
  flag: string;
  color: string;
}

interface WalletContextType {
  currencies: Currency[];
  addCurrency: (currency: Currency) => void;
  updateCurrencyBalance: (code: string, balance: number) => void;
  removeCurrency: (code: string) => void;
  getTotalValue: () => number;
  getCurrencyByCode: (code: string) => Currency | undefined;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

const initialCurrencies: Currency[] = [
  { code: 'USD', symbol: '$', balance: 12847.32, change: +2.34, flag: '🇺🇸', color: 'bg-blue-500' },
  { code: 'EUR', symbol: '€', balance: 8923.41, change: -1.12, flag: '🇪🇺', color: 'bg-purple-500' },
  { code: 'GBP', symbol: '£', balance: 6432.18, change: +0.89, flag: '🇬🇧', color: 'bg-green-500' },
  { code: 'JPY', symbol: '¥', balance: 1234567, change: -0.45, flag: '🇯🇵', color: 'bg-red-500' },
  { code: 'CAD', symbol: 'C$', balance: 3456.78, change: +1.23, flag: '🇨🇦', color: 'bg-orange-500' },
  { code: 'AUD', symbol: 'A$', balance: 2789.45, change: +0.67, flag: '🇦🇺', color: 'bg-yellow-500' },
];

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currencies, setCurrencies] = useState<Currency[]>(initialCurrencies);

  // Load user's currencies from localStorage or API
  useEffect(() => {
    if (user) {
      const savedCurrencies = localStorage.getItem(`wallet_currencies_${user.id}`);
      if (savedCurrencies) {
        try {
          setCurrencies(JSON.parse(savedCurrencies));
        } catch (error) {
          console.error('Error loading saved currencies:', error);
        }
      }
    }
  }, [user]);

  // Save currencies to localStorage whenever they change
  useEffect(() => {
    if (user && currencies.length > 0) {
      localStorage.setItem(`wallet_currencies_${user.id}`, JSON.stringify(currencies));
    }
  }, [currencies, user]);

  const addCurrency = (currency: Currency) => {
    setCurrencies(prev => {
      const exists = prev.find(c => c.code === currency.code);
      if (exists) {
        return prev; // Don't add if already exists
      }
      return [...prev, currency];
    });
  };

  const updateCurrencyBalance = (code: string, balance: number) => {
    setCurrencies(prev => 
      prev.map(currency => 
        currency.code === code 
          ? { ...currency, balance }
          : currency
      )
    );
  };

  const removeCurrency = (code: string) => {
    setCurrencies(prev => prev.filter(currency => currency.code !== code));
  };

  const getTotalValue = () => {
    return currencies.reduce((sum, currency) => sum + currency.balance, 0);
  };

  const getCurrencyByCode = (code: string) => {
    return currencies.find(currency => currency.code === code);
  };

  const value = {
    currencies,
    addCurrency,
    updateCurrencyBalance,
    removeCurrency,
    getTotalValue,
    getCurrencyByCode,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};