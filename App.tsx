
import React from 'react';
// FIX: Switched back to react-router-dom v6+ components: Routes, Route, Navigate.
import { Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';

// Auth Pages
import Login from './pages/Login';
import Signup from './pages/Signup';

// Dashboard Pages
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import RechargeHistory from './pages/RechargeHistory';
import Reports from './pages/Reports';
import AddCustomer from './pages/AddCustomer';
import Settings from './pages/Settings';

// A component to handle the routing logic, allowing it to access the auth context.
const AppRoutes: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
         // FIX: Replaced Switch with Routes for v6+ compatibility.
         <Routes>
            {/* Auth Routes: Redirect if logged in */}
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />} />
            
            {/* Protected Dashboard Routes: Use a layout route that checks for authentication */}
            <Route element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" replace />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/history" element={<RechargeHistory />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/add-customer" element={<AddCustomer />} />
                <Route path="/settings" element={<Settings />} />
            </Route>
            
            {/* Fallback route redirects to the correct starting page */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        </Routes>
    )
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <AppRoutes />
          </DataProvider>
        </AuthProvider>
    </ThemeProvider>
  );
};

export default App;