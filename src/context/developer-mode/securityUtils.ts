
import { SuspiciousActivity } from './types';
import { toast } from "@/components/ui/use-toast";

// Function to log suspicious activities
export const logSuspiciousActivity = (
  action: string, 
  username?: string,
  setSuspiciousActivities?: React.Dispatch<React.SetStateAction<SuspiciousActivity[]>>
): SuspiciousActivity => {
  // In a real app, you would get the actual IP address from the request
  const mockIpAddress = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  
  const newActivity: SuspiciousActivity = {
    id: Date.now().toString(),
    timestamp: new Date(),
    ipAddress: mockIpAddress,
    action,
    username
  };
  
  if (setSuspiciousActivities) {
    setSuspiciousActivities(prev => [...prev, newActivity]);
  }
  
  // In a real app, you would also send this information to your backend for logging
  console.log("SECURITY ALERT:", newActivity);
  
  return newActivity;
};

// Function to check login attempts and handle security issues
export const handleLoginAttempts = (
  attempts: number, 
  username?: string
): boolean => {
  if (attempts >= 5) {
    toast({
      title: "Too Many Attempts",
      description: "For security reasons, please try again later.",
      variant: "destructive"
    });
    return false;
  }
  return true;
};
