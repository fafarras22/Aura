
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { toast } from "@/components/ui/use-toast";

// Get current session data
export const getCurrentSession = async (): Promise<{ user: User | null; session: Session | null }> => {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Error getting session:', error.message);
    return { user: null, session: null };
  }
  
  return { 
    user: session?.user || null,
    session: session
  };
};

// Sign up with email and password
export const signUpWithEmail = async (
  email: string, 
  password: string,
  name: string
): Promise<{ error: any | null; success: boolean }> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    });

    if (error) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive"
      });
      return { error, success: false };
    }

    toast({
      title: "Sign up successful",
      description: "Please check your email to verify your account.",
    });
    
    return { error: null, success: true };
  } catch (error) {
    toast({
      title: "Sign up failed",
      description: "An unexpected error occurred.",
      variant: "destructive"
    });
    return { error, success: false };
  }
};

// Sign in with email and password
export const signInWithEmail = async (
  email: string, 
  password: string
): Promise<{ error: any | null; success: boolean }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive"
      });
      return { error, success: false };
    }

    toast({
      title: "Sign in successful",
      description: "Welcome back!",
    });
    
    return { error: null, success: true };
  } catch (error) {
    toast({
      title: "Sign in failed",
      description: "An unexpected error occurred.",
      variant: "destructive"
    });
    return { error, success: false };
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<{ error: any | null; success: boolean }> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard'
      }
    });

    if (error) {
      return { error, success: false };
    }
    
    return { error: null, success: true };
  } catch (error) {
    return { error, success: false };
  }
};

// Sign in with Apple
export const signInWithApple = async (): Promise<{ error: any | null; success: boolean }> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: window.location.origin + '/dashboard'
      }
    });

    if (error) {
      return { error, success: false };
    }
    
    return { error: null, success: true };
  } catch (error) {
    return { error, success: false };
  }
};

// Sign out
export const signOutUser = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error signing out:', error.message);
    toast({
      title: "Sign out failed",
      description: error.message,
      variant: "destructive"
    });
  }
};
