import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    // 必要に応じてサーバーからユーザーIDを取得し、設定
    async function fetchUserId() {
      const response = await fetch('/api/auth/user');
      if (response.ok) {
        const data = await response.json();
        setUserId(data.userId);
      }
    }
    fetchUserId();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};