
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

  const handleLogin = () => {
    const success = onLogin(loginType, username, password);
    
    if (success) {
      // Reset the form
      setUsername("");
      setPassword("");
    }
  };

  const handleLoginTypeChange = (type: 'admin' | 'user') => {
    setLoginType(type);
    // Reset form when switching login types
    setUsername("");
    setPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login to Dashboard</DialogTitle>
          <DialogDescription>
            Please sign in to access your AKAR dashboard.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center space-x-4 mb-4">
          <Button 
            variant={loginType === 'user' ? "default" : "outline"} 
            onClick={() => handleLoginTypeChange('user')}
          >
            Client Login
          </Button>
          <Button 
            variant={loginType === 'admin' ? "default" : "outline"} 
            onClick={() => handleLoginTypeChange('admin')}
          >
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
        </div>
        
        <DialogFooter>
          <Button type="submit" onClick={handleLogin}>Sign In</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
