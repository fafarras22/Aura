
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDBSetup } from "@/lib/db-setup";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { initializeDB } = useDBSetup();
  const { toast } = useToast();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Initialize the database
    const setupDB = async () => {
      setIsInitializing(true);
      try {
        const success = await initializeDB();
        
        if (success) {
          toast({
            title: "Database Connected",
            description: "Successfully connected to the database",
          });
        } else {
          toast({
            title: "Database Connection Issue",
            description: "Could not connect to database. Using fallback data.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error during initialization:", error);
        toast({
          title: "Error",
          description: "There was a problem initializing the application",
          variant: "destructive"
        });
      } finally {
        setIsInitializing(false);
        // Redirect to projects page after initialization
        navigate('/projects');
      }
    };
    
    setupDB();
  }, [navigate, initializeDB, toast]);

  // Show a loading spinner while initializing
  if (isInitializing) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Initializing AKAR Platform...</h2>
          <p className="text-muted-foreground">Setting up your database connection</p>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;
