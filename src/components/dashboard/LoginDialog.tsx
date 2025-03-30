
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, User } from "lucide-react";

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
    } else {
      setError(loginType === 'admin' 
        ? "Invalid admin password" 
        : "Invalid username or password");
    }
  };

  const handleLoginTypeChange = (type: 'admin' | 'user') => {
    setLoginType(type);
    setError("");
    // Reset form when switching login types
    setUsername("");
    setPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      // Prevent closing if opened (force login)
      if (open && newOpen === false) {
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
                Try "akar@admin2023" for admin access
              </div>
            </>
          )}
          
          {error && (
            <div className="text-sm text-red-500 font-medium">
              {error}
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
