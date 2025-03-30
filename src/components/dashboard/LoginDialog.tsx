
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, User, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (type: 'admin' | 'user', username: string, password: string) => boolean;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({
  open,
  onOpenChange,
  onLogin
}) => {
  const [loginType, setLoginType] = useState<'admin' | 'user'>('user');
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [attemptedHack, setAttemptedHack] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");
    
    if (loginType === 'admin' && !password) {
      setError("Admin password is required");
      return;
    }
    
    if (loginType === 'user' && (!username || !password)) {
      setError("Both username and password are required");
      return;
    }
    
    const success = onLogin(loginType, username, password);
    
    if (success) {
      // Reset the form
      setUsername("");
      setPassword("");
      setError("");
      setAttemptedHack(false);
    } else {
      // Check for potential hack attempts (e.g., common admin passwords or SQL injection patterns)
      if (loginType === 'admin' && 
          (password.toLowerCase().includes("admin") || 
           password.includes("--") || 
           password.includes("="))) {
        setAttemptedHack(true);
      }
      
      setError(loginType === 'admin' 
        ? "Invalid admin password" 
        : "Invalid username or password");
    }
  };

  const handleLoginTypeChange = (type: 'admin' | 'user') => {
    setLoginType(type);
    setError("");
    setAttemptedHack(false);
    // Reset form when switching login types
    setUsername("");
    setPassword("");
  };

  const handleDialogClose = () => {
    // Navigate to home page when dialog is closed
    navigate('/');
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      // If closing, navigate to home
      if (open && newOpen === false) {
        handleDialogClose();
        return;
      }
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Login Required</DialogTitle>
          <DialogDescription className="text-center">
            Please sign in to access the AKAR FarmWatch dashboard.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center space-x-4 mb-4">
          <Button 
            variant={loginType === 'user' ? "default" : "outline"} 
            onClick={() => handleLoginTypeChange('user')}
            className="flex gap-2 items-center"
          >
            <User size={18} />
            Client Login
          </Button>
          <Button 
            variant={loginType === 'admin' ? "default" : "outline"} 
            onClick={() => handleLoginTypeChange('admin')}
            className="flex gap-2 items-center"
          >
            <Shield size={18} />
            Admin Login
          </Button>
        </div>
        
        <div className="space-y-4 py-2">
          {loginType === 'user' ? (
            <>
              <div className="space-y-2">
                <div className="text-sm mb-1">Username</div>
                <Input 
                  placeholder="Enter your username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="text-sm mb-1">Password</div>
                <Input 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                Try "Guest" with password "guest123" or "Muhammad Farras" with password "admin123"
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <div className="text-sm mb-1">Admin Password</div>
                <Input 
                  type="password" 
                  placeholder="Enter admin password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                Admin access is restricted to AKAR personnel only
              </div>
            </>
          )}
          
          {error && (
            <div className="text-sm text-red-500 font-medium">
              {error}
            </div>
          )}
          
          {attemptedHack && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start">
              <AlertTriangle className="text-red-500 mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
              <div className="text-xs text-red-700">
                <strong>Security Alert:</strong> Suspicious login attempt detected. 
                This activity has been logged. Continued attempts may result in IP blocking.
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button type="submit" onClick={handleLogin} className="w-full">
            Sign In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
