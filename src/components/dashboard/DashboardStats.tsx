import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  CreditCard, 
  UserCheck, 
  TrendingUp, 
  TrendingDown,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<any>;
  trend?: string;
  color?: 'primary' | 'success' | 'warning' | 'destructive' | 'secondary';
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  trend,
  color = 'primary',
  description
}) => {
  const colorClasses = {
    primary: 'text-primary bg-primary-light',
    success: 'text-success bg-success-light',
    warning: 'text-warning bg-warning-light',
    destructive: 'text-destructive bg-destructive-light',
    secondary: 'text-secondary bg-secondary-light'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card className="border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", colorClasses[color])}>
            <Icon className="w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {changeType === 'increase' ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
              <span className={cn(
                "text-sm font-medium",
                changeType === 'increase' ? "text-success" : "text-destructive"
              )}>
                {Math.abs(change)}%
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {trend || 'from last month'}
            </span>
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '1,247',
      change: 12.5,
      changeType: 'increase' as const,
      icon: Users,
      color: 'primary' as const,
      trend: 'from last month',
      description: 'Across all branches'
    },
    {
      title: 'Monthly Revenue',
      value: '₹2,45,680',
      change: 8.2,
      changeType: 'increase' as const,
      icon: DollarSign,
      color: 'success' as const,
      trend: 'this month',
      description: 'Fee collection + other income'
    },
    {
      title: 'Outstanding Fees',
      value: '₹45,290',
      change: 5.1,
      changeType: 'decrease' as const,
      icon: CreditCard,
      color: 'warning' as const,
      trend: 'from last week',
      description: '23 students pending'
    },
    {
      title: 'Active Staff',
      value: '89',
      change: 2.4,
      changeType: 'increase' as const,
      icon: UserCheck,
      color: 'secondary' as const,
      trend: 'total staff',
      description: 'Teaching + non-teaching'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
};