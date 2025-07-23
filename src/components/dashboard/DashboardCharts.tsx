import React from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  Filler
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  Filler
);

export const DashboardCharts: React.FC = () => {
  // Revenue Trend Data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [180000, 220000, 195000, 250000, 275000, 245000],
        borderColor: 'hsl(207, 90%, 44%)',
        backgroundColor: 'hsla(207, 90%, 44%, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Expenses',
        data: [120000, 140000, 135000, 160000, 155000, 170000],
        borderColor: 'hsl(340, 100%, 44%)',
        backgroundColor: 'hsla(340, 100%, 44%, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  };

  // Student Distribution Data
  const studentDistribution = {
    labels: ['Class 1-5', 'Class 6-8', 'Class 9-10', 'Class 11-12'],
    datasets: [
      {
        data: [320, 285, 195, 150],
        backgroundColor: [
          'hsl(207, 90%, 44%)',
          'hsl(340, 100%, 44%)',
          'hsl(122, 39%, 49%)',
          'hsl(24, 94%, 50%)'
        ],
        borderWidth: 0,
      }
    ]
  };

  // Fee Collection Status
  const feeCollectionData = {
    labels: ['Tuition Fee', 'Transport', 'Books', 'Uniform', 'Activities', 'Others'],
    datasets: [
      {
        label: 'Collected',
        data: [85, 78, 92, 65, 88, 75],
        backgroundColor: 'hsl(122, 39%, 49%)',
      },
      {
        label: 'Pending',
        data: [15, 22, 8, 35, 12, 25],
        backgroundColor: 'hsl(24, 94%, 50%)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'hsl(207, 90%, 44%)',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'hsl(0, 0%, 90%)',
        },
        ticks: {
          color: 'hsl(0, 0%, 46%)',
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'hsl(0, 0%, 46%)',
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Revenue Trend Chart */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-0 shadow-custom-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Revenue vs Expenses Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Line data={revenueData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Student Distribution */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="border-0 shadow-custom-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Student Distribution by Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Pie data={studentDistribution} options={pieOptions} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Fee Collection Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="lg:col-span-2"
      >
        <Card className="border-0 shadow-custom-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Fee Collection Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <div className="h-80">
                  <Bar data={feeCollectionData} options={chartOptions} />
                </div>
              </TabsContent>
              <TabsContent value="monthly" className="mt-6">
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                  Monthly collection analysis chart will be displayed here
                </div>
              </TabsContent>
              <TabsContent value="pending" className="mt-6">
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                  Pending fees breakdown chart will be displayed here
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};