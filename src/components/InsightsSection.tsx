import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, PieChart, Calendar, Target, Award, Zap } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', income: 4200, expenses: 3100, savings: 1100 },
  { month: 'Feb', income: 3800, expenses: 2900, savings: 900 },
  { month: 'Mar', income: 5100, expenses: 3400, savings: 1700 },
  { month: 'Apr', income: 4600, expenses: 3200, savings: 1400 },
  { month: 'May', income: 5300, expenses: 3600, savings: 1700 },
  { month: 'Jun', income: 4900, expenses: 3300, savings: 1600 },
];

const insights = [
  {
    title: 'Spending Pattern',
    description: 'Your spending has decreased by 12% compared to last month',
    trend: 'positive',
    value: '-12%',
    icon: TrendingDown,
    color: 'text-lime-accent'
  },
  {
    title: 'Savings Goal',
    description: 'You\'re 78% towards your monthly savings target',
    trend: 'positive',
    value: '78%',
    icon: Target,
    color: 'text-blue-400'
  },
  {
    title: 'Best Category',
    description: 'You saved most in the "Dining" category this month',
    trend: 'neutral',
    value: '$340',
    icon: Award,
    color: 'text-purple-400'
  },
  {
    title: 'Exchange Savings',
    description: 'Saved on exchange rates compared to traditional banks',
    trend: 'positive',
    value: '$127',
    icon: Zap,
    color: 'text-yellow-400'
  },
];

const categorySpending = [
  { category: 'Food & Dining', amount: 1240, percentage: 28, color: 'bg-red-500' },
  { category: 'Transportation', amount: 890, percentage: 20, color: 'bg-blue-500' },
  { category: 'Shopping', amount: 670, percentage: 15, color: 'bg-purple-500' },
  { category: 'Entertainment', amount: 560, percentage: 13, color: 'bg-green-500' },
  { category: 'Utilities', amount: 450, percentage: 10, color: 'bg-yellow-500' },
  { category: 'Others', amount: 620, percentage: 14, color: 'bg-gray-500' },
];

export const InsightsSection: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

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
          <h1 className="text-3xl font-bold text-light-text dark:text-dark-text font-editorial">Financial Insights</h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">Understand your spending patterns and trends</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-2 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
      </motion.div>

      {/* Key Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6 hover:border-lime-accent/30 transition-all hover:shadow-glow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${insight.color.replace('text-', 'bg-')}/20`}>
                <insight.icon className={`w-5 h-5 ${insight.color}`} />
              </div>
              <span className={`text-xl font-bold font-editorial ${insight.color}`}>
                {insight.value}
              </span>
            </div>
            <h3 className="font-bold text-light-text dark:text-dark-text font-editorial mb-2">{insight.title}</h3>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{insight.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6 shadow-glass"
        >
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 className="w-6 h-6 text-lime-accent" />
            <h2 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial">Monthly Trends</h2>
          </div>
          
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-light-text dark:text-dark-text font-medium">{data.month}</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    ${data.income.toLocaleString()}
                  </span>
                </div>
                <div className="flex space-x-1 h-8">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.income / 6000) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="bg-lime-accent/70 rounded-l"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.expenses / 6000) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="bg-red-400/70"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.savings / 6000) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="bg-blue-400/70 rounded-r"
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-lime-accent rounded-full"></div>
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Income</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Expenses</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Savings</span>
            </div>
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6 shadow-glass"
        >
          <div className="flex items-center space-x-3 mb-6">
            <PieChart className="w-6 h-6 text-lime-accent" />
            <h2 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial">Spending by Category</h2>
          </div>
          
          <div className="space-y-4">
            {categorySpending.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className={`w-4 h-4 ${category.color} rounded-full`}></div>
                  <span className="text-sm text-light-text dark:text-dark-text font-medium">{category.category}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-light-glass dark:bg-dark-glass rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.percentage}%` }}
                      transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                      className={`h-2 ${category.color} rounded-full`}
                    />
                  </div>
                  <span className="text-sm text-light-text dark:text-dark-text font-bold w-16 text-right">
                    ${category.amount}
                  </span>
                  <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary w-8 text-right">
                    {category.percentage}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gradient-to-br from-light-surface to-light-glass dark:from-dark-surface dark:to-dark-glass border border-light-border dark:border-dark-border rounded-2xl p-8 shadow-glass"
      >
        <h2 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-6">Personalized Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Reduce Dining Expenses',
              description: 'You spent 28% more on dining this month. Consider meal planning to save $200+',
              action: 'Set Budget Alert',
              color: 'border-red-400/30'
            },
            {
              title: 'Optimize Exchange Timing',
              description: 'EUR rates are favorable. Consider exchanging now to save on upcoming transfers',
              action: 'View Rates',
              color: 'border-lime-accent/30'
            },
            {
              title: 'Savings Opportunity',
              description: 'You can increase savings by 15% by switching to our premium account',
              action: 'Learn More',
              color: 'border-blue-400/30'
            },
          ].map((rec, index) => (
            <motion.div
              key={rec.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className={`border-2 ${rec.color} rounded-xl p-4 hover:shadow-glow transition-all`}
            >
              <h3 className="font-bold text-light-text dark:text-dark-text mb-2">{rec.title}</h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">{rec.description}</p>
              <button className="text-sm text-lime-accent hover:text-lime-accent/80 font-medium transition-colors">
                {rec.action} →
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};