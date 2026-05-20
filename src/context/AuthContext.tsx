import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  updateAdminPassword: (newPassword: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('admin_auth') === 'true';
  });
  const [adminPassword, setAdminPassword] = useState<string>('admin123');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for password changes in Firestore
    const unsub = onSnapshot(doc(db, "portfolio", "settings"), (docSnap) => {
      if (docSnap.exists()) {
        setAdminPassword(docSnap.data().adminPassword || 'admin123');
      } else {
        // Initialize settings if they don't exist
        setDoc(doc(db, "portfolio", "settings"), { adminPassword: 'admin123' });
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching auth settings:", error);
      setIsLoading(false);
    });

    return () => unsub();
  }, []);

  const login = async (password: string) => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  const updateAdminPassword = async (newPassword: string) => {
    await setDoc(doc(db, "portfolio", "settings"), { adminPassword: newPassword }, { merge: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, updateAdminPassword, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
