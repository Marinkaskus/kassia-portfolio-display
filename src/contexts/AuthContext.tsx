
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange, getCurrentUser } from '@/services/authService';

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAdmin: false,
  isLoading: true
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("AuthContext initializing...");
    
    // Check if there's already a logged-in user
    const initialUser = getCurrentUser();
    if (initialUser) {
      setCurrentUser(initialUser);
      const isAdminUser = initialUser.email === 'kassiamarin486@gmail.com';
      setIsAdmin(isAdminUser);
      console.log("Initial user found:", initialUser.email, "Admin:", isAdminUser);
    }
    
    const unsubscribe = onAuthStateChange((user) => {
      console.log("Auth state changed:", user?.email);
      setCurrentUser(user);
      
      // Admin check - only this email is considered an admin
      const isAdminUser = !!user && user.email === 'kassiamarin486@gmail.com';
      setIsAdmin(isAdminUser);
      
      if (user) {
        console.log("User authenticated:", user.email);
        console.log("Admin status:", isAdminUser);
      }
      
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAdmin,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
