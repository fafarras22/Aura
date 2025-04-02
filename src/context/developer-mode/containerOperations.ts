import { ContainerData, User } from './types';
import { toast } from "@/components/ui/use-toast";

// Function to toggle container status (active/inactive)
export const toggleContainerStatus = (
  containers: ContainerData[],
  containerId: string,
  active: boolean
): ContainerData[] => {
  return containers.map(container => {
    if (container.id === containerId) {
      return {
        ...container,
        status: active ? 'active' : 'maintenance'
      };
    }
    return container;
  });
};

// Function to send payment reminder notification
export const sendPaymentReminderNotification = (containerId: string): void => {
  // In a real app, this would send an actual notification or email
  console.log(`Payment reminder sent for container ${containerId}`);
  
  toast({
    title: "Reminder Sent",
    description: `Payment reminder has been sent for container ${containerId}`,
    variant: "default"
  });
};

// Function to get filtered container data
export const getFilteredContainerData = (
  containers: ContainerData[],
  isDeveloperMode: boolean,
  currentUser: User | null,
  containerId?: string
): ContainerData[] => {
  // If in developer mode, show all containers
  if (isDeveloperMode) {
    // If a specific containerId is provided, filter by it
    if (containerId) {
      return containers.filter(container => container.id === containerId);
    }
    // Otherwise return all containers
    return containers;
  }
  
  // For regular users, only show containers they have access to
  if (currentUser?.role === 'client' && currentUser?.containerId) {
    return containers.filter(container => container.id === currentUser.containerId);
  }
  
  // Fallback: empty array if no user or no matches
  return [];
};
