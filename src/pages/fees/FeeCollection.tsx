import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Calculator, 
  CreditCard, 
  Receipt, 
  DollarSign,
  User,
  Phone,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface FeeStructure {
  category: string;
  amount: number;
  status: 'paid' | 'pending' | 'partial';
  dueDate: string;
  paidAmount?: number;
}

const mockStudent = {
  id: 'ST001',
  name: 'Rahul Sharma',
  class: '10',
  section: 'A',
  phone: '+91 98765 43210',
  avatar: '',
  feeStructure: [
    { category: 'Tuition Fee', amount: 15000, status: 'pending' as const, dueDate: '2024-01-31' },
    { category: 'Transport Fee', amount: 3000, status: 'paid' as const, dueDate: '2024-01-31', paidAmount: 3000 },
    { category: 'Laboratory Fee', amount: 2000, status: 'partial' as const, dueDate: '2024-01-31', paidAmount: 1000 },
    { category: 'Library Fee', amount: 1500, status: 'pending' as const, dueDate: '2024-01-31' },
    { category: 'Sports Fee', amount: 2500, status: 'pending' as const, dueDate: '2024-01-31' },
  ]
};

export const FeeCollection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(mockStudent);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedFees, setSelectedFees] = useState<string[]>([]);

  const totalDue = selectedStudent.feeStructure
    .filter(fee => fee.status !== 'paid')
    .reduce((sum, fee) => sum + fee.amount - (fee.paidAmount || 0), 0);

  const totalSelected = selectedStudent.feeStructure
    .filter(fee => selectedFees.includes(fee.category))
    .reduce((sum, fee) => sum + fee.amount - (fee.paidAmount || 0), 0);

  const handleFeeSelection = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedFees([...selectedFees, category]);
    } else {
      setSelectedFees(selectedFees.filter(fee => fee !== category));
    }
  };

  const getFeeStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-success text-success-foreground';
      case 'partial': return 'bg-warning text-warning-foreground';
      case 'pending': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fee Collection</h1>
          <p className="text-muted-foreground mt-1">
            Collect student fees and generate receipts
          </p>
        </div>
        <Button variant="outline">
          <Receipt className="w-4 h-4 mr-2" />
          View Receipt History
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Search */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-0 shadow-custom-md">
            <CardHeader>
              <CardTitle className="text-lg">Find Student</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name, ID, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Student Info */}
              <div className="p-4 bg-accent rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{selectedStudent.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedStudent.id} • Class {selectedStudent.class}-{selectedStudent.section}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {selectedStudent.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-destructive-light rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Total Due</p>
                  <p className="text-lg font-bold text-destructive">₹{totalDue.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-primary-light rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Selected</p>
                  <p className="text-lg font-bold text-primary">₹{totalSelected.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Fee Structure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-0 shadow-custom-md">
            <CardHeader>
              <CardTitle className="text-lg">Fee Structure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedStudent.feeStructure.map((fee, index) => (
                <motion.div
                  key={fee.category}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedFees.includes(fee.category)}
                      onChange={(e) => handleFeeSelection(fee.category, e.target.checked)}
                      disabled={fee.status === 'paid'}
                      className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
                    />
                    <div>
                      <p className="font-medium text-foreground">{fee.category}</p>
                      <div className="flex items-center space-x-2">
                        <Badge className={getFeeStatusColor(fee.status)}>
                          {fee.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Due: {new Date(fee.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">₹{fee.amount.toLocaleString()}</p>
                    {fee.paidAmount && (
                      <p className="text-xs text-success">Paid: ₹{fee.paidAmount.toLocaleString()}</p>
                    )}
                    {fee.status !== 'paid' && (
                      <p className="text-xs text-destructive">
                        Due: ₹{(fee.amount - (fee.paidAmount || 0)).toLocaleString()}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="border-0 shadow-custom-md">
            <CardHeader>
              <CardTitle className="text-lg">Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Payment Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPaymentAmount(totalSelected.toString())}
                    disabled={totalSelected === 0}
                  >
                    Pay Selected
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPaymentAmount(totalDue.toString())}
                  >
                    Pay All Due
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="method">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reference">Transaction Reference</Label>
                <Input
                  id="reference"
                  placeholder="Optional reference number"
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-semibold">₹{paymentAmount || '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Method:</span>
                  <span className="font-medium">{paymentMethod || 'Not selected'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculator
                </Button>
                <Button variant="success" className="w-full">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Collect Fee
                </Button>
              </div>

              <Button variant="ghost" className="w-full">
                <Receipt className="w-4 h-4 mr-2" />
                Preview Receipt
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};