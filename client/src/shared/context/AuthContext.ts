import { createContext } from 'react';
import type { User } from '../types/User';

export const AuthContext = createContext<{
  currentUser?: User;
  isLoading: boolean;
} | null>(null);
