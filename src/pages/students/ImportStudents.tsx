import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Download, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

export const ImportStudents: React.FC = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadStats, setUploadStats] = useState({
    total: 0,
    successful: 0,
    failed: 0,
    errors: [] as string[]
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid File Format",
        description: "Please upload an Excel (.xlsx) or CSV file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);

    // Simulate file processing
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          setUploadStats({
            total: 125,
            successful: 120,
            failed: 5,
            errors: [
              'Row 15: Missing required field "Student ID"',
              'Row 32: Invalid date format in "Date of Birth"',
              'Row 67: Duplicate Student ID "ST2024001"',
              'Row 89: Invalid class "Class 13"',
              'Row 103: Missing parent contact information'
            ]
          });
          toast({
            title: "Upload Complete",
            description: "Student data has been processed successfully.",
          });
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const downloadTemplate = () => {
    toast({
      title: "Template Downloaded",
      description: "Excel template has been downloaded to your device.",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <Link to="/students">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Import Students</h1>
            <p className="text-muted-foreground">Bulk import student data using Excel or CSV files</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Instructions */}
          <Card className="border-0 shadow-custom-md">
            <CardHeader>
              <CardTitle>Import Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">1</div>
                  <div>
                    <p className="font-medium">Download Template</p>
                    <p className="text-sm text-muted-foreground">Download our Excel template with pre-defined columns and sample data.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">2</div>
                  <div>
                    <p className="font-medium">Fill Student Data</p>
                    <p className="text-sm text-muted-foreground">Add student information following the template format. Required fields are marked with asterisks.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">3</div>
                  <div>
                    <p className="font-medium">Upload File</p>
                    <p className="text-sm text-muted-foreground">Upload your completed Excel (.xlsx) or CSV file using the upload button below.</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <Button onClick={downloadTemplate} variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Excel Template
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upload Area */}
          <Card className="border-0 shadow-custom-md">
            <CardHeader>
              <CardTitle>Upload Student Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <FileSpreadsheet className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium">Upload your student data file</p>
                  <p className="text-sm text-muted-foreground">Supports Excel (.xlsx) and CSV files up to 10MB</p>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  variant="dashboard"
                  size="lg"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing file...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              {/* Upload Results */}
              {uploadComplete && (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-accent rounded-lg">
                      <div className="text-2xl font-bold text-foreground">{uploadStats.total}</div>
                      <div className="text-sm text-muted-foreground">Total Records</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{uploadStats.successful}</div>
                      <div className="text-sm text-green-600">Successful</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{uploadStats.failed}</div>
                      <div className="text-sm text-red-600">Failed</div>
                    </div>
                  </div>

                  {uploadStats.errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <h4 className="font-medium text-red-800">Errors Found</h4>
                      </div>
                      <div className="space-y-1">
                        {uploadStats.errors.map((error, index) => (
                          <p key={index} className="text-sm text-red-700">{error}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-3">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Error Report
                    </Button>
                    <Button variant="dashboard" asChild>
                      <Link to="/students">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        View Students
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Guidelines Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="space-y-6"
        >
          <Card className="border-0 shadow-custom-md">
            <CardHeader>
              <CardTitle className="text-lg">Required Fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {[
                  'Student ID',
                  'First Name',
                  'Last Name',
                  'Class',
                  'Section',
                  'Date of Birth',
                  'Parent Name',
                  'Parent Phone'
                ].map((field) => (
                  <div key={field} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm">{field}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-custom-md">
            <CardHeader>
              <CardTitle className="text-lg">Data Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Date Format</p>
                  <p className="text-muted-foreground">Use YYYY-MM-DD format (e.g., 2024-01-15)</p>
                </div>
                <div>
                  <p className="font-medium">Student ID</p>
                  <p className="text-muted-foreground">Must be unique across all students</p>
                </div>
                <div>
                  <p className="font-medium">Class Format</p>
                  <p className="text-muted-foreground">Use numbers 1-12 for classes</p>
                </div>
                <div>
                  <p className="font-medium">Phone Numbers</p>
                  <p className="text-muted-foreground">Include country code (+91 for India)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};