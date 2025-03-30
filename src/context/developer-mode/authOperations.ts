
import { User } from './types';
import { USERS, USER_PASSWORDS, ADMIN_PASSWORD, addNewUser } from './constants';
import { toast } from "@/components/ui/use-toast";
import { logSuspiciousActivity } from './securityUtils';

export const handleUserLogin = (
  username: string, 
  password: string, 
  loginAttempts: number,
  setLoginAttempts: React.Dispatch<React.SetStateAction<number>>,
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsAdminLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDeveloperMode: React.Dispatch<React.SetStateAction<boolean>>,
  setSuspiciousActivities: React.Dispatch<React.SetStateAction<any[]>>
): boolean => {
  // Track login attempts for security
  setLoginAttempts(prev => prev + 1);
  
  // Check if there have been too many failed attempts
  if (loginAttempts >= 5) {
    logSuspiciousActivity("Too many login attempts", username, setSuspiciousActivities);
    toast({
      title: "Too Many Attempts",
      description: "For security reasons, please try again later.",
      variant: "destructive"
    });
    return false;
  }
  
  const user = USERS.find(u => u.name === username);
  
  if (user && USER_PASSWORDS[username] === password) {
    setCurrentUser(user);
    setLoginAttempts(0);
    
    // If admin user, also set admin mode
    if (user.role === 'admin') {
      setIsAdminLoggedIn(true);
      setIsDeveloperMode(true);
    }
    
    toast({
      title: "Login Successful",
      description: `Welcome, ${username}!`,
      variant: "default"
    });
    
    return true;
  } else {
    // Log failed login attempt
    if (loginAttempts >= 2) {
      logSuspiciousActivity("Multiple failed login attempts", username, setSuspiciousActivities);
    }
    
    toast({
      title: "Login Failed",
      description: "Invalid username or password. Please try again.",
      variant: "destructive"
    });
    return false;
  }
};

export const handleUserSignup = (
  username: string,
  password: string,
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
): boolean => {
  // Check if user already exists
  const existingUser = USERS.find(u => u.name === username);
  
  if (existingUser) {
    toast({
      title: "Registration Failed",
      description: "This username is already taken. Please choose another.",
      variant: "destructive"
    });
    return false;
  }
  
  // Create new user
  const newUser = addNewUser(username, password);
  
  // Set as current user
  setCurrentUser(newUser);
  
  toast({
    title: "Registration Successful",
    description: `Welcome to AKAR FarmWatch, ${username}!`,
    variant: "default"
  });
  
  return true;
};

export const handleAdminLogin = (
  password: string, 
  loginAttempts: number,
  setLoginAttempts: React.Dispatch<React.SetStateAction<number>>,
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsAdminLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDeveloperMode: React.Dispatch<React.SetStateAction<boolean>>,
  setSuspiciousActivities: React.Dispatch<React.SetStateAction<any[]>>
): boolean => {
  // Track login attempts for security
  setLoginAttempts(prev => prev + 1);
  
  // Implement login timeout after multiple failed attempts
  if (loginAttempts >= 5) {
    logSuspiciousActivity("Too many admin login attempts", undefined, setSuspiciousActivities);
    toast({
      title: "Too Many Attempts",
      description: "For security reasons, please try again later.",
      variant: "destructive"
    });
    return false;
  }
  
  if (password === ADMIN_PASSWORD) {
    // Find the admin user
    const adminUser = USERS.find(u => u.role === 'admin');
    if (adminUser) {
      setCurrentUser(adminUser);
    }
    
    setIsAdminLoggedIn(true);
    setIsDeveloperMode(true);
    setLoginAttempts(0);
    
    toast({
      title: "Admin Login Successful",
      description: "Developer mode is now active.",
      variant: "default"
    });
    
    return true;
  } else {
    // Log suspicious admin login attempt
    logSuspiciousActivity("Failed admin login attempt", password, setSuspiciousActivities);
    
    toast({
      title: "Login Failed",
      description: "Invalid password. Please try again.",
      variant: "destructive"
    });
    return false;
  }
};

export const handleLogout = (
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>,
  currentUser: User | null,
  logoutAdmin: () => void
) => {
  setCurrentUser(null);
  
  // If user was admin, also log out of admin mode
  if (currentUser?.role === 'admin') {
    logoutAdmin();
  }
  
  toast({
    title: "Logged Out",
    description: "You have been logged out.",
    variant: "default"
  });
};

export const handleLogoutAdmin = (
  setIsAdminLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDeveloperMode: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsAdminLoggedIn(false);
  setIsDeveloperMode(false);
  
  toast({
    title: "Logged Out",
    description: "You have been logged out of admin mode.",
    variant: "default"
  });
};
