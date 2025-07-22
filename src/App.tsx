import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Send, BarChart3, Settings } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoadingScreen } from './components/LoadingScreen';
import { LoginForm } from './components/LoginForm';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { WalletSection } from './components/WalletSection';
import { ExchangeSection } from './components/ExchangeSection';
import { TransfersSection } from './components/TransfersSection';
import { InsightsSection } from './components/InsightsSection';
import { SettingsSection } from './components/SettingsSection';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [activeSection, setActiveSection] = useState('wallet');

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="flex h-screen bg-light-base dark:bg-dark-base transition-colors duration-300">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {activeSection === 'wallet' && <WalletSection />}
            
            {activeSection === 'exchange' && <ExchangeSection />}
            
            {activeSection === 'transfers' && <TransfersSection />}
            
            {activeSection === 'insights' && <InsightsSection />}
            
            {activeSection === 'settings' && <SettingsSection />}
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;