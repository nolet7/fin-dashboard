import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle, Search, Filter } from 'lucide-react';

const transfers = [
  {
    id: 'TXN001',
    type: 'sent',
    amount: -2500,
    currency: 'USD',
    recipient: 'Sarah Johnson',
    recipientEmail: 'sarah.j@company.com',
    location: 'New York, US',
    flag: '🇺🇸',
    status: 'completed',
    date: '2024-01-15',
    time: '14:30',
    fee: 5.00,
    reference: 'Consulting payment'
  },
  {
    id: 'TXN002',
    type: 'received',
    amount: +1840,
    currency: 'EUR',
    recipient: 'Freelance Client',
    recipientEmail: 'client@startup.de',
    location: 'Berlin, DE',
    flag: '🇩🇪',
    status: 'completed',
    date: '2024-01-14',
    time: '09:15',
    fee: 0,
    reference: 'Web development project'
  },
  {
    id: 'TXN003',
    type: 'sent',
    amount: -850,
    currency: 'GBP',
    recipient: 'Alex Chen',
    recipientEmail: 'alex@techcorp.uk',
    location: 'London, UK',
    flag: '🇬🇧',
    status: 'pending',
    date: '2024-01-15',
    time: '16:45',
    fee: 3.50,
    reference: 'Equipment purchase'
  },
  {
    id: 'TXN004',
    type: 'sent',
    amount: -320,
    currency: 'CAD',
    recipient: 'Maria Rodriguez',
    recipientEmail: 'maria@design.ca',
    location: 'Toronto, CA',
    flag: '🇨🇦',
    status: 'failed',
    date: '2024-01-13',
    time: '11:20',
    fee: 2.00,
    reference: 'Design services'
  },
];

const statusConfig = {
  completed: { color: 'text-lime-accent', bg: 'bg-lime-accent/10', icon: CheckCircle },
  pending: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', icon: Clock },
  failed: { color: 'text-red-400', bg: 'bg-red-400/10', icon: XCircle },
};

export const TransfersSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewTransfer, setShowNewTransfer] = useState(false);

  const filteredTransfers = transfers.filter(transfer => {
    const matchesSearch = transfer.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transfer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <h1 className="text-3xl font-bold text-light-text dark:text-dark-text font-editorial">Transfers</h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">Send money globally with low fees</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewTransfer(true)}
          className="flex items-center space-x-2 bg-lime-accent text-light-base dark:text-dark-base px-6 py-3 rounded-xl font-medium hover:shadow-glow transition-all"
        >
          <Send className="w-5 h-5" />
          <span>New Transfer</span>
        </motion.button>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Sent', value: '$45,230', change: '+12%', color: 'text-blue-400' },
          { label: 'Total Received', value: '$32,180', change: '+8%', color: 'text-lime-accent' },
          { label: 'Pending', value: '3', change: '-2', color: 'text-yellow-400' },
          { label: 'This Month', value: '$8,420', change: '+15%', color: 'text-purple-400' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            className="bg-light-surface/50 dark:bg-dark-surface/50 border border-light-border dark:border-dark-border rounded-xl p-6"
          >
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">{stat.label}</p>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className={`text-2xl font-bold font-editorial ${stat.color}`}>{stat.value}</span>
              <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
          <input
            type="text"
            placeholder="Search transfers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:border-lime-accent/50 transition-colors"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </motion.div>

      {/* Transfers List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-glass"
      >
        <div className="space-y-4">
          {filteredTransfers.map((transfer, index) => {
            const StatusIcon = statusConfig[transfer.status as keyof typeof statusConfig].icon;
            const statusStyle = statusConfig[transfer.status as keyof typeof statusConfig];
            
            return (
              <motion.div
                key={transfer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.01, x: 5 }}
                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-light-glass dark:hover:bg-dark-glass transition-all group cursor-pointer"
              >
                {/* Transfer Icon */}
                <div className={`p-3 rounded-full ${transfer.type === 'sent' ? 'bg-red-500/20' : 'bg-lime-accent/20'}`}>
                  {transfer.type === 'sent' ? (
                    <ArrowUpRight className="w-5 h-5 text-red-400" />
                  ) : (
                    <ArrowDownLeft className="w-5 h-5 text-lime-accent" />
                  )}
                </div>

                {/* Transfer Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-medium text-light-text dark:text-dark-text font-editorial truncate">{transfer.recipient}</p>
                    <span className="text-lg">{transfer.flag}</span>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${statusStyle.bg} ${statusStyle.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      <span className="capitalize">{transfer.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    <span>{transfer.recipientEmail}</span>
                    <span>•</span>
                    <span>{transfer.location}</span>
                    <span>•</span>
                    <span>{transfer.reference}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                    <span>{transfer.date} at {transfer.time}</span>
                    <span>•</span>
                    <span>Fee: ${transfer.fee.toFixed(2)}</span>
                    <span>•</span>
                    <span>ID: {transfer.id}</span>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <p className={`font-bold font-editorial text-lg ${
                    transfer.amount > 0 ? 'text-lime-accent' : 'text-light-text dark:text-dark-text'
                  }`}>
                    {transfer.amount > 0 ? '+' : ''}{transfer.amount.toLocaleString()} {transfer.currency}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredTransfers.length === 0 && (
          <div className="text-center py-8">
            <Send className="w-12 h-12 mx-auto text-light-text-secondary dark:text-dark-text-secondary mb-4" />
            <p className="text-light-text-secondary dark:text-dark-text-secondary">No transfers found matching your criteria</p>
          </div>
        )}
      </motion.div>

      {/* New Transfer Modal Placeholder */}
      {showNewTransfer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowNewTransfer(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-4">New Transfer</h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">Transfer functionality coming soon!</p>
            <button
              onClick={() => setShowNewTransfer(false)}
              className="w-full bg-lime-accent text-light-base dark:text-dark-base py-3 rounded-xl font-medium hover:shadow-glow transition-all"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};