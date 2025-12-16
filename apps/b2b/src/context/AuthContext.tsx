'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  societe: string;
  siret: string;
  validated: boolean;
  remise: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: any, kbisFile?: File | null, pieceIdentiteFile?: File | null) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error('Error parsing stored user:', e);
          localStorage.removeItem('user');
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    console.log('AuthContext: Début du login pour', email);
    // Mock login - in production, use real API
    const mockUser: User = {
      id: '1',
      email,
      nom: 'Dupont',
      prenom: 'Marie',
      societe: 'Spa Beauté Paris',
      siret: '12345678900012',
      validated: true,
      remise: 15,
    };
    
    console.log('AuthContext: Setting user', mockUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(mockUser));
      console.log('AuthContext: User saved to localStorage');
    }
    setUser(mockUser);
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  const register = async (data: any, kbisFile?: File | null, pieceIdentiteFile?: File | null) => {
    // Mock registration - in production, use real API with file upload
    // In production: upload files to server/cloud storage
    console.log('KBIS file:', kbisFile?.name);
    console.log('Piece d\'identite file:', pieceIdentiteFile?.name);
    
    const newUser: User = {
      id: Math.random().toString(),
      email: data.email,
      nom: data.nom,
      prenom: data.prenom,
      societe: data.societe,
      siret: data.siret,
      validated: false,
      remise: 0,
    };
    
    setUser(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}