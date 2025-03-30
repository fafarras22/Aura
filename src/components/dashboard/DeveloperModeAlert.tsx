
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface DeveloperModeAlertProps {
  isDeveloperMode: boolean;
}

export const DeveloperModeAlert: React.FC<DeveloperModeAlertProps> = ({ isDeveloperMode }) => {
  if (!isDeveloperMode) return null;

  return (
    <Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-900 dark:text-blue-300">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="text-xs">
        Developer mode: You have full access to all container data and management capabilities
      </AlertDescription>
    </Alert>
  );
};
