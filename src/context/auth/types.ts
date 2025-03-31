
import { Session, User } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
}

export interface AuthContextProps {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any | null, success: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: any | null, success: boolean }>;
  signInWithGoogle: () => Promise<{ error: any | null, success: boolean }>;
  signInWithApple: () => Promise<{ error: any | null, success: boolean }>;
  signOut: () => Promise<void>;
}
