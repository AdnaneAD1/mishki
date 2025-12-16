export interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: 'b2c' | 'b2b';
  validated?: boolean;
  remise?: number;
  societe?: string;
  siret?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface LoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
  isLoading?: boolean;
  error?: string;
  redirectUrl?: string;
  logoSrc?: string;
  title?: string;
  subtitle?: string;
  showB2BInfo?: boolean;
  primaryColor?: string;
  backgroundColor?: string;
}
