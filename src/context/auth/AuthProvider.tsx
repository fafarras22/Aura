
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { AuthContextProps, AuthState } from './types';
import { 
  handleSignUp, 
  handleSignIn, 
  handleGoogleSignIn, 
  handleAppleSignIn, 
  handleSignOut 
} from './authService';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true
  });
  
  const { toast } = useToast();

  useEffect(() => {
    // Set up session listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthState({
          session,
          user: session?.user ?? null,
          isLoading: false
        });
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState({
        session,
        user: session?.user ?? null,
        isLoading: false
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    return handleSignUp(email, password, name, toast);
  };

  const signIn = async (email: string, password: string) => {
    return handleSignIn(email, password, toast);
  };

  const signInWithGoogle = async () => {
    return handleGoogleSignIn(toast);
  };

  const signInWithApple = async () => {
    return handleAppleSignIn(toast);
  };

  const signOut = async () => {
    return handleSignOut(toast);
  };

  const value = {
    ...authState,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithApple,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
