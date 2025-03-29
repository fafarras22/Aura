
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-6 max-w-md mx-auto p-6">
        <AlertTriangle className="h-20 w-20 mx-auto text-yellow-500" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">Oops! Page not found</p>
        <p className="text-gray-500 dark:text-gray-400">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="pt-4">
          <Button onClick={() => navigate("/")} size="lg">
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
