
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDBSetup } from "@/lib/db-setup";
import { useToast } from "@/hooks/use-toast";
import { SEOMetadata } from "@/components/shared/SEOMetadata";

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
        navigate('/');
      }
    };
    
    setupDB();
  }, [navigate, initializeDB, toast]);

  // Show a loading spinner while initializing
  return (
    <>
      <SEOMetadata 
        title="AKAR Farm - Tokenized Agriculture Investment Platform"
        description="Invest in sustainable farming projects with blockchain technology. AKAR Farm connects investors with agricultural opportunities through tokenization."
        keywords="agriculture investment, farm tokens, blockchain agriculture, sustainable farming, AKR token, container farming, urban agriculture"
        canonicalUrl="https://akarfarm.com/"
        ogImage="/lovable-uploads/532be948-74b8-4d14-a726-8fa51d204cf7.png"
      />
      
      {isInitializing ? (
        <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-950" aria-live="polite">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4" aria-hidden="true"></div>
            <h2 className="text-xl font-semibold" id="loading-status">Initializing AKAR Platform...</h2>
            <p className="text-muted-foreground" id="loading-details">Setting up your database connection</p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Index;
