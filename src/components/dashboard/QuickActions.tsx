import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  CreditCard, 
  Receipt, 
  FileText, 
  BarChart3, 
  Settings,
  Download,
  Upload,
  Calendar,
  Bell
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: 'primary' | 'secondary' | 'success' | 'warning';
  onClick: () => void;
  badge?: string;
}

const QuickAction: React.FC<QuickActionProps> = ({
  title,
  description,
  icon: Icon,
  color,
  onClick,
  badge
}) => {
  const variants = {
    primary: 'bg-gradient-primary hover:shadow-custom-lg',
    secondary: 'bg-gradient-secondary hover:shadow-custom-lg',
    success: 'bg-success hover:bg-success/90',
    warning: 'bg-warning hover:bg-warning/90'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        variant="ghost"
        className="h-auto w-full p-0 hover:bg-transparent"
        onClick={onClick}
      >
        <Card className="w-full border-0 shadow-custom-sm hover:shadow-custom-md transition-all duration-300 cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${variants[color]}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  {badge && (
                    <Badge variant="secondary" className="ml-2">
                      {badge}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Button>
    </motion.div>
  );
};

export const QuickActions: React.FC = () => {
  const quickActions = [
    {
      title: 'Add Student',
      description: 'Register new student admission',
      icon: UserPlus,
      color: 'primary' as const,
      onClick: () => console.log('Add student')
    },
    {
      title: 'Collect Fee',
      description: 'Process fee payment',
      icon: CreditCard,
      color: 'success' as const,
      onClick: () => console.log('Collect fee')
    },
    {
      title: 'Record Expense',
      description: 'Add new expense entry',
      icon: Receipt,
      color: 'warning' as const,
      onClick: () => console.log('Record expense')
    },
    {
      title: 'Generate Report',
      description: 'Create financial reports',
      icon: BarChart3,
      color: 'secondary' as const,
      onClick: () => console.log('Generate report')
    }
  ];

  const recentActivities = [
    {
      title: 'New Student Admission',
      description: 'Rahul Sharma - Class 9A',
      time: '2 minutes ago',
      type: 'student'
    },
    {
      title: 'Fee Payment Received',
      description: '₹15,000 - Priya Patel',
      time: '15 minutes ago',
      type: 'payment'
    },
    {
      title: 'Expense Approved',
      description: 'Library Books - ₹8,500',
      time: '1 hour ago',
      type: 'expense'
    },
    {
      title: 'Salary Processed',
      description: '25 Staff Members',
      time: '3 hours ago',
      type: 'salary'
    }
  ];

  const pendingTasks = [
    {
      title: 'Fee Reminders',
      description: '12 students have pending fees',
      priority: 'high',
      dueDate: 'Today'
    },
    {
      title: 'Salary Processing',
      description: 'Monthly salary for staff',
      priority: 'medium',
      dueDate: 'Tomorrow'
    },
    {
      title: 'Report Generation',
      description: 'Monthly financial report',
      priority: 'low',
      dueDate: 'This week'
    }
  ];

  return (
    <div className="space-y-6 mt-6">
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card className="border-0 shadow-custom-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 * index }}
                >
                  <QuickAction {...action} />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card className="border-0 shadow-custom-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 * index }}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pending Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Card className="border-0 shadow-custom-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Pending Tasks</CardTitle>
              <Badge variant="secondary">{pendingTasks.length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium text-foreground">{task.title}</h4>
                        <Badge 
                          variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">Due: {task.dueDate}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};