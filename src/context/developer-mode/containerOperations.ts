
import { ContainerData, User } from './types';
import { toast } from "@/components/ui/use-toast";

// Function to get container data based on role and containerId
export const getFilteredContainerData = (
  containers: ContainerData[],
  isDeveloperMode: boolean,
  currentUser: User | null,
  containerId?: string
): ContainerData[] => {
  // Admin or developer mode can see all containers
  if (isDeveloperMode || (currentUser && currentUser.role === 'admin')) {
    return containers;
  }
  
  // Client can only see their own container
  if (currentUser && currentUser.role === 'client') {
    return containers.filter(container => 
      container.id === (containerId || currentUser.containerId)
    );
  }
  
  // If no user is logged in, return empty array
  return [];
};

// Function to toggle container operation status
export const toggleContainer = (
  containerId: string, 
  active: boolean, 
  isDeveloperMode: boolean,
  containers: ContainerData[],
  setContainers: React.Dispatch<React.SetStateAction<ContainerData[]>>
): void => {
  // Only allow in developer mode
  if (!isDeveloperMode) {
    toast({
      title: "Access Denied",
      description: "Only administrators can control container operations.",
      variant: "destructive"
    });
    return;
  }
  
  // Update container status
  setContainers(prev => prev.map(container => {
    if (container.id === containerId) {
      return {
        ...container,
        status: active ? 'active' : 'inactive'
      };
    }
    return container;
  }));
  
  toast({
    title: `Container ${active ? 'Activated' : 'Deactivated'}`,
    description: `Container ${containerId} has been ${active ? 'activated' : 'deactivated'}.`,
    variant: active ? "default" : "destructive"
  });
};

// Function to send payment reminder to client
export const sendPaymentReminder = (
  containerId: string, 
  isDeveloperMode: boolean,
  containers: ContainerData[]
): void => {
  // Only allow in developer mode
  if (!isDeveloperMode) {
    toast({
      title: "Access Denied",
      description: "Only administrators can send payment reminders.",
      variant: "destructive"
    });
    return;
  }
  
  // Find container
  const container = containers.find(c => c.id === containerId);
  if (!container) {
    toast({
      title: "Container Not Found",
      description: `Container ${containerId} was not found.`,
      variant: "destructive"
    });
    return;
  }
  
  // In a real app, this would send an email or notification
  toast({
    title: "Payment Reminder Sent",
    description: `Payment reminder sent to owner of container ${container.name}.`,
    variant: "default"
  });
};
