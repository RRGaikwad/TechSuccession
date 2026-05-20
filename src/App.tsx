import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react" // Corrected to /react for Vite/React project
import { useEffect } from 'react';
import { trackEvent } from './firebase';
import Home from './pages/Home';
import { PortfolioProvider } from './context/PortfolioContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';

// Page tracking component
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackEvent('page_view', { page_path: location.pathname });
  }, [location]);

  return null;
};

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
          <PageTracker />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Analytics />
        </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
}
