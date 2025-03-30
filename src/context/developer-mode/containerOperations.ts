
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

// Function to toggle container operation status (renamed to toggleContainerStatus for clearer naming)
export const toggleContainerStatus = (
  containers: ContainerData[],
  containerId: string, 
  active: boolean
): ContainerData[] => {
  // Update container status
  const updatedContainers = containers.map(container => {
    if (container.id === containerId) {
      return {
        ...container,
        status: active ? 'active' : 'inactive'
      };
    }
    return container;
  });
  
  toast({
    title: `Container ${active ? 'Activated' : 'Deactivated'}`,
    description: `Container ${containerId} has been ${active ? 'activated' : 'deactivated'}.`,
    variant: active ? "default" : "destructive"
  });

  return updatedContainers;
};

// Function to send payment reminder to client (renamed to sendPaymentReminderNotification)
export const sendPaymentReminderNotification = (
  containerId: string
): void => {
  // Find container (would normally look up in database)
  toast({
    title: "Payment Reminder Sent",
    description: `Payment reminder sent to owner of container ${containerId}.`,
    variant: "default"
  });
};

// Original function names maintained for compatibility
export const toggleContainer = toggleContainerStatus;
export const sendPaymentReminder = sendPaymentReminderNotification;
