
import React, { useState, useEffect } from "react";
import { ContainerGrid } from "@/components/containers/ContainerGrid";
import { ContainerStakeModal } from "@/components/containers/ContainerStakeModal";
import { useDBSetup } from "@/lib/db-setup";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { AlertTriangle, CheckCircle, Database } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { SEOMetadata } from "@/components/shared/SEOMetadata";
import { AppHeader } from "@/components/layout/AppHeader";

const Projects = () => {
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { initializeDB } = useDBSetup();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [databaseState, setDatabaseState] = useState<'checking' | 'connected' | 'fallback'>('checking');
  const { isDeveloperMode } = useDeveloperMode();
  const [language, setLanguage] = useState<'en' | 'id' | 'ko'>('en');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // Initialize database on component mount
  useEffect(() => {
    const setupDatabase = async () => {
      setIsLoading(true);
      try {
        // Try to connect to the database and check if tables exist
        const { data, error } = await supabase.from('dummy_check').select('*').limit(1);
        
        if (error) {
          console.log("Database connection error, using fallback data:", error.message);
          setDatabaseState('fallback');
          toast({
            title: "Using Demonstration Data",
            description: "Could not connect to database. Showing sample container data instead.",
            variant: "default"
          });
          setIsLoading(false);
          return;
        }
        
        // If we got here, try to initialize the database
        const success = await initializeDB();
        
        if (success) {
          setDatabaseState('connected');
          toast({
            title: "Connected to Database",
            description: "Successfully connected to the database.",
          });
        } else {
          setDatabaseState('fallback');
          toast({
            title: "Using Demonstration Data",
            description: "Database initialization failed. Showing sample container data.",
            variant: "default"
          });
        }
      } catch (error) {
        console.log("Error during database setup, using fallback data:", error);
        setDatabaseState('fallback');
        toast({
          title: "Using Demo Mode",
          description: "Displaying sample container data.",
          variant: "default"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    setupDatabase();
  }, [initializeDB, toast]);

  const handleContainerSelect = (containerId: string) => {
    setSelectedContainerId(containerId);
    setIsModalOpen(true);
  };

  return (
    <>
      <SEOMetadata 
        title="Farm Projects | AKAR Farm Investment Platform"
        description="Explore and invest in our curated collection of sustainable farming projects. Each container project offers unique investment opportunities."
        keywords="farm projects, agriculture investment, container farming, AKR token, sustainable agriculture"
      />
      
      {/* Fixed header */}
      <AppHeader 
        setShowWalletModal={setIsWalletModalOpen}
        language={language}
        setLanguage={setLanguage}
      />
      
      <div className="container mx-auto p-6 mt-16">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Farm Projects</h1>
            <p className="text-muted-foreground">
              Invest in container farming projects with $AKR tokens
            </p>
          </div>

          {databaseState === 'fallback' && (
            <Alert variant="default" className="border-blue-300 bg-blue-50 dark:bg-blue-900/20">
              <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertTitle>Demonstration Mode</AlertTitle>
              <AlertDescription>
                Currently showing demonstration data. {isDeveloperMode ? 
                  "You are in developer mode with access to all container data." : 
                  "Connect to Supabase to access live data."}
              </AlertDescription>
            </Alert>
          )}
          
          {databaseState === 'connected' && (
            <Alert variant="default" className="border-green-300 bg-green-50 dark:bg-green-900/20">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle>Database Connected</AlertTitle>
              <AlertDescription>
                Successfully connected to the Supabase database.
              </AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ContainerGrid onSelectContainer={handleContainerSelect} />
          )}

          <ContainerStakeModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            containerId={selectedContainerId}
          />
        </div>
      </div>
    </>
  );
};

export default Projects;
