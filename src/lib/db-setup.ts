
import { useToast } from '@/hooks/use-toast';
import { 
  createContainersTable,
  createSalesDataTable, 
  createProjectsTable, 
  createTokenInvestmentsTable, 
  createUsersTable,
  supabase 
} from '@/lib/supabase';

// Hook to use in components
export const useDBSetup = () => {
  const { toast } = useToast();

  const initializeDB = async () => {
    try {
      console.log("Starting database initialization...");
      
      // Create containers table if it doesn't exist
      await createContainersTable();
      
      // Create sales_data table if it doesn't exist
      await createSalesDataTable();
      
      // Create projects table if it doesn't exist
      await createProjectsTable();
      
      // Create token_investments table if it doesn't exist
      await createTokenInvestmentsTable();
      
      // Create users table if it doesn't exist
      await createUsersTable();
      
      // Insert default data if containers table is empty
      await insertDefaultContainers();

      console.log("Database tables initialized successfully");
      toast({
        title: "Database Connected",
        description: "Successfully connected to Supabase database.",
      });
      
      return true;
    } catch (error) {
      console.error('Error initializing database:', error);
      toast({
        title: "Database Initialization Failed",
        description: "Using local storage mode. Please check your Supabase setup.",
        variant: "destructive",
      });
      return false;
    }
  };

  const insertDefaultContainers = async () => {
    // Check if there are any containers in the table
    const { data: existingContainers, error } = await supabase
      .from('containers')
      .select('id')
      .limit(1);
      
    // If there are no containers, insert default ones
    if ((!error && !existingContainers) || (existingContainers && existingContainers.length === 0)) {
      console.log("Inserting default containers...");
      const defaultContainers = [
        { 
          name: "Pluit Village Mall", 
          location: "Jakarta", 
          capacity: 500, 
          status: "active",
          total_tokens: 1000,
          filled_tokens: 350,
          apy: 12.5,
          image_url: "/lovable-uploads/e60ccc9b-594d-461b-9ef9-2b157e19b0a1.png"
        },
        { 
          name: "Green Garden Residence", 
          location: "Jakarta", 
          capacity: 300, 
          status: "active",
          total_tokens: 800,
          filled_tokens: 520,
          apy: 13.2,
          image_url: "/lovable-uploads/4a63c228-4631-46e8-98d2-a534c09c4b8b.png"
        },
        { 
          name: "BSD City Container", 
          location: "Tangerang", 
          capacity: 450, 
          status: "active",
          total_tokens: 1200,
          filled_tokens: 250,
          apy: 11.8,
          image_url: "/lovable-uploads/1fe7dc27-86fd-4951-be87-72e09e824c9b.png"
        },
      ];
      
      for (const container of defaultContainers) {
        const { error: insertError } = await supabase.from('containers').insert(container);
        if (insertError) {
          console.error("Error inserting default container:", insertError);
        }
      }
    }
  };

  return { initializeDB };
};
