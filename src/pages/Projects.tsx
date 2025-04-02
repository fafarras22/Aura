
import React, { useState, useEffect } from "react";
import { ContainerGrid } from "@/components/containers/ContainerGrid";
import { ContainerStakeModal } from "@/components/containers/ContainerStakeModal";
import { useDBSetup } from "@/lib/db-setup";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Projects = () => {
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { initializeDB } = useDBSetup();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [dbConnectionError, setDbConnectionError] = useState(false);

  // Initialize database on component mount
  useEffect(() => {
    const setupDatabase = async () => {
      setIsLoading(true);
      try {
        const success = await initializeDB();
        
        if (success) {
          // Check if we can access the containers table
          const { data, error } = await supabase
            .from('containers')
            .select('id, name')
            .limit(1);
            
          if (error) {
            console.error("Database access error:", error);
            setDbConnectionError(true);
            throw error;
          }
          
          console.log("Database connection successful, found containers:", data);
          setDbConnectionError(false);
        } else {
          setDbConnectionError(true);
        }
      } catch (error) {
        console.error("Error during initial database setup:", error);
        setDbConnectionError(true);
        toast({
          title: "Database Connection Issue",
          description: "There was a problem connecting to the database. Using fallback data.",
          variant: "destructive"
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

      {dbConnectionError && (
        <Alert variant="warning" className="border-amber-300 bg-amber-50 dark:bg-amber-900/20">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertTitle>Database Connection Issue</AlertTitle>
          <AlertDescription>
            We're currently experiencing database connectivity issues. Showing fallback data instead.
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
