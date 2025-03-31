
import { supabase } from '@/lib/supabase';
import { ToastProps } from '@/hooks/use-toast';

// Function to handle sign up
export const handleSignUp = async (
  email: string, 
  password: string, 
  name: string,
  showToast: (props: ToastProps) => void
) => {
  try {
    const { error, data } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          name: name
        }
      }
    });
    
    if (error) {
      showToast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive"
      });
      return { error, success: false };
    }

    // If signUp is successful
    showToast({
      title: "Account created!",
      description: "Check your email for a confirmation link."
    });
    
    return { error: null, success: true };
  } catch (error: any) {
    showToast({
      title: "Sign up failed",
      description: error.message,
      variant: "destructive"
    });
    return { error, success: false };
  }
};

// Function to handle sign in
export const handleSignIn = async (
  email: string, 
  password: string,
  showToast: (props: ToastProps) => void
) => {
  try {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      showToast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
      return { error, success: false };
    }

    showToast({
      title: "Login successful",
      description: `Welcome back, ${data.user.user_metadata.name || 'User'}!`
    });
    
    return { error: null, success: true };
  } catch (error: any) {
    showToast({
      title: "Login failed",
      description: error.message,
      variant: "destructive"
    });
    return { error, success: false };
  }
};

// Function to handle social sign in (Google)
export const handleGoogleSignIn = async (showToast: (props: ToastProps) => void) => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) {
      showToast({
        title: "Google login failed",
        description: error.message,
        variant: "destructive"
      });
      return { error, success: false };
    }
    
    return { error: null, success: true };
  } catch (error: any) {
    showToast({
      title: "Google login failed",
      description: error.message,
      variant: "destructive"
    });
    return { error, success: false };
  }
};

// Function to handle social sign in (Apple)
export const handleAppleSignIn = async (showToast: (props: ToastProps) => void) => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) {
      showToast({
        title: "Apple login failed",
        description: error.message,
        variant: "destructive"
      });
      return { error, success: false };
    }
    
    return { error: null, success: true };
  } catch (error: any) {
    showToast({
      title: "Apple login failed",
      description: error.message,
      variant: "destructive"
    });
    return { error, success: false };
  }
};

// Function to handle sign out
export const handleSignOut = async (showToast: (props: ToastProps) => void) => {
  await supabase.auth.signOut();
  showToast({
    title: "Logged out",
    description: "You have been successfully logged out."
  });
};
