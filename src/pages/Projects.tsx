
import React, { useState, useEffect } from "react";
import { ContainerGrid } from "@/components/containers/ContainerGrid";
import { ContainerStakeModal } from "@/components/containers/ContainerStakeModal";
import { useDBSetup } from "@/lib/db-setup";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Projects = () => {
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { initializeDB } = useDBSetup();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [databaseState, setDatabaseState] = useState<'checking' | 'connected' | 'fallback'>('checking');

  // Initialize database on component mount
  useEffect(() => {
    const setupDatabase = async () => {
      setIsLoading(true);
      try {
        // Initialize database tables
        const success = await initializeDB();
        
        if (success) {
          // Verify we can actually query the containers table
          const { data, error } = await supabase
            .from('containers')
            .select('id, name')
            .limit(1);
            
          if (error) {
            console.log("Using fallback data due to query error:", error.message);
            setDatabaseState('fallback');
          } else {
            console.log("Database connection verified with containers:", data);
            setDatabaseState('connected');
          }
        } else {
          setDatabaseState('fallback');
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Farm Projects</h1>
        <p className="text-muted-foreground">
          Invest in container farming projects with $AKR tokens
        </p>
      </div>

      {databaseState === 'fallback' ? (
        <Alert variant="default" className="border-blue-300 bg-blue-50 dark:bg-blue-900/20">
          <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle>Demonstration Mode</AlertTitle>
          <AlertDescription>
            Currently showing demonstration data. In a production environment, this would connect to your Supabase database.
          </AlertDescription>
        </Alert>
      ) : databaseState === 'connected' && (
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
  );
};

export default Projects;
