import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CreditCard,
  Receipt,
  BarChart3,
  Settings,
  GraduationCap,
  Building2,
  Menu,
  ChevronDown,
  BookOpen,
  DollarSign,
  FileText,
  Calendar,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  title: string;
  icon: React.ComponentType<any>;
  path: string;
  badge?: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/',
  },
  {
    title: 'Students',
    icon: GraduationCap,
    path: '/students',
    children: [
      { title: 'All Students', icon: Users, path: '/students' },
      { title: 'Add Student', icon: Users, path: '/students/add' },
      { title: 'Bulk Import', icon: Users, path: '/students/import' },
    ]
  },
  {
    title: 'Staff',
    icon: UserCheck,
    path: '/staff',
    children: [
      { title: 'Staff Directory', icon: UserCheck, path: '/staff' },
      { title: 'Add Staff', icon: UserCheck, path: '/staff/add' },
      { title: 'Salary Management', icon: DollarSign, path: '/staff/salary' },
    ]
  },
  {
    title: 'Fees',
    icon: CreditCard,
    path: '/fees',
    badge: '12',
    children: [
      { title: 'Fee Structures', icon: CreditCard, path: '/fees/structures' },
      { title: 'Fee Collection', icon: DollarSign, path: '/fees/collection' },
      { title: 'Outstanding Fees', icon: Receipt, path: '/fees/outstanding' },
    ]
  },
  {
    title: 'Expenses',
    icon: Receipt,
    path: '/expenses',
    children: [
      { title: 'Add Expense', icon: Receipt, path: '/expenses/add' },
      { title: 'Categories', icon: BookOpen, path: '/expenses/categories' },
      { title: 'Approvals', icon: FileText, path: '/expenses/approvals' },
    ]
  },
  {
    title: 'Reports',
    icon: BarChart3,
    path: '/reports',
    children: [
      { title: 'Financial Reports', icon: BarChart3, path: '/reports/financial' },
      { title: 'Academic Reports', icon: FileText, path: '/reports/academic' },
      { title: 'Custom Reports', icon: Settings, path: '/reports/custom' },
    ]
  },
  {
    title: 'Academic Year',
    icon: Calendar,
    path: '/academic-year',
  },
  {
    title: 'Settings',
    icon: Settings,
    path: '/settings',
    children: [
      { title: 'Profile', icon: Settings, path: '/settings/profile' },
      { title: 'School Settings', icon: Building2, path: '/settings/school' },
      { title: 'User Management', icon: Users, path: '/settings/users' },
    ]
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpanded = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path) 
        ? prev.filter(item => item !== path)
        : [...prev, path]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isParentActive = (item: NavItem) => {
    return item.children?.some(child => isActive(child.path)) || isActive(item.path);
  };

  React.useEffect(() => {
    // Auto-expand parent of active item
    navigationItems.forEach(item => {
      if (item.children && item.children.some(child => isActive(child.path))) {
        setExpandedItems(prev => prev.includes(item.path) ? prev : [...prev, item.path]);
      }
    });
  }, [location.pathname]);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-50 h-screen bg-card border-r border-border shadow-custom-lg"
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-dashboard rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-foreground">EduManager</span>
              </motion.div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="ml-auto"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <div key={item.path}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => !collapsed && toggleExpanded(item.path)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-all duration-200",
                      isParentActive(item)
                        ? "bg-primary text-primary-foreground shadow-custom-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      collapsed && "justify-center"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                    {!collapsed && item.children && (
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          expandedItems.includes(item.path) && "rotate-180"
                        )}
                      />
                    )}
                  </button>
                  
                  {!collapsed && item.children && expandedItems.includes(item.path) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-6 mt-2 space-y-1 border-l border-border"
                    >
                      {item.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center space-x-3 p-2 pl-4 rounded-lg text-sm transition-all duration-200",
                              isActive
                                ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )
                          }
                        >
                          <child.icon className="w-4 h-4" />
                          <span>{child.title}</span>
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-custom-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      collapsed && "justify-center"
                    )
                  }
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border">
          <div className={cn(
            "flex items-center space-x-3 p-3 rounded-lg bg-accent",
            collapsed && "justify-center"
          )}>
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-white">A</span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  Admin User
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  Principal
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.aside>
  );
};