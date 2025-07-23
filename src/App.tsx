import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { StudentList } from "./pages/students/StudentList";
import { Login } from "./pages/auth/Login";
import { FeeCollection } from "./pages/fees/FeeCollection";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Main App Routes with Layout */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Index />} />
            <Route path="students" element={<StudentList />} />
            <Route path="staff" element={<div className="p-6">Staff Management - Coming Soon</div>} />
            <Route path="fees/*" element={<FeeCollection />} />
            <Route path="expenses" element={<div className="p-6">Expense Management - Coming Soon</div>} />
            <Route path="reports" element={<div className="p-6">Reports - Coming Soon</div>} />
            <Route path="academic-year" element={<div className="p-6">Academic Year Management - Coming Soon</div>} />
            <Route path="settings" element={<div className="p-6">Settings - Coming Soon</div>} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
