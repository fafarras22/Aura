
import React, { useState, useEffect } from "react";
import { ContainerGrid } from "@/components/containers/ContainerGrid";
import { ContainerStakeModal } from "@/components/containers/ContainerStakeModal";
import { useDBSetup } from "@/lib/db-setup";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const Projects = () => {
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { initializeDB } = useDBSetup();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

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
            throw error;
          }
          
          console.log("Database connection successful, found containers:", data);
        }
      } catch (error) {
        console.error("Error during initial database setup:", error);
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
