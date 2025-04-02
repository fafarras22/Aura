
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { ContainerData } from "./types";

export const useContainerData = () => {
  const { toast } = useToast();
  const [containers, setContainers] = useState<Partial<ContainerData>[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchContainers();
  }, []);
  
  const fetchContainers = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('containers')
        .select('*');
        
      if (error) throw error;
      
      if (data) {
        // Transform data to match the ContainerData interface
        const transformedData = data.map(item => ({
          id: item.id,
          name: item.name,
          owner: item.owner,
          status: item.status,
          location: item.location,
          nextPaymentDue: item.next_payment_due,
          currentYield: item.current_yield,
          projectedYield: item.projected_yield,
          createdAt: item.created_at
        }));
        
        setContainers(transformedData);
      }
    } catch (error) {
      console.error("Error fetching containers:", error);
      toast({
        title: "Error fetching containers",
        description: "Please try again or check your connection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddContainer = () => {
    const newContainer: Partial<ContainerData> = {
      id: Math.random().toString(36).substr(2, 9),
      name: "New Container",
      owner: "",
      status: "inactive",
      location: "Jakarta, Indonesia",
      nextPaymentDue: new Date().toISOString(),
      currentYield: 0,
      projectedYield: 0,
      createdAt: new Date().toISOString()
    };
    
    setContainers([...containers, newContainer]);
  };
  
  const handleRemoveContainer = (id: string) => {
    setContainers(containers.filter(container => container.id !== id));
  };
  
  const handleUpdateContainer = (id: string, field: keyof ContainerData, value: any) => {
    setContainers(containers.map(container => {
      if (container.id === id) {
        return { ...container, [field]: value };
      }
      return container;
    }));
  };
  
  const handleSaveAllContainers = async () => {
    setLoading(true);
    
    try {
      // Transform data back to database format
      const transformedData = containers.map(item => ({
        id: item.id,
        name: item.name,
        owner: item.owner,
        status: item.status,
        location: item.location,
        next_payment_due: item.nextPaymentDue,
        current_yield: item.currentYield,
        projected_yield: item.projectedYield,
        created_at: item.createdAt
      }));
      
      // Use upsert to handle both insert and update
      const { error } = await supabase
        .from('containers')
        .upsert(transformedData);
        
      if (error) throw error;
      
      toast({
        title: "Containers saved",
        description: "All container data has been successfully saved to the database.",
      });
    } catch (error) {
      console.error("Error saving containers:", error);
      toast({
        title: "Error saving data",
        description: "Please try again or check your connection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return {
    containers,
    loading,
    handleAddContainer,
    handleRemoveContainer,
    handleUpdateContainer,
    handleSaveAllContainers
  };
};
