
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

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

  const createContainersTable = async () => {
    console.log("Checking containers table...");
    
    // Check if table exists by trying to fetch a record
    const { error } = await supabase
      .from('containers')
      .select('id')
      .limit(1);
      
    if (error && error.code === '42P01') { // Table doesn't exist
      console.log("Creating containers table...");
      
      // We need to use rpc for creating tables since sql() isn't available
      const { error: createError } = await supabase.rpc('create_containers_table');
      
      if (createError) {
        console.error("Error creating containers table:", createError);
        throw new Error(`Failed to create containers table: ${createError.message}`);
      }
    }
  };

  const createSalesDataTable = async () => {
    console.log("Checking sales_data table...");
    
    // Check if table exists by trying to fetch a record
    const { error } = await supabase
      .from('sales_data')
      .select('id')
      .limit(1);
      
    if (error && error.code === '42P01') { // Table doesn't exist
      console.log("Creating sales_data table...");
      
      const { error: createError } = await supabase.rpc('create_sales_data_table');
      
      if (createError) {
        console.error("Error creating sales_data table:", createError);
        throw new Error(`Failed to create sales_data table: ${createError.message}`);
      }
    }
  };

  const createProjectsTable = async () => {
    console.log("Checking projects table...");
    
    // Check if table exists by trying to fetch a record
    const { error } = await supabase
      .from('projects')
      .select('id')
      .limit(1);
      
    if (error && error.code === '42P01') { // Table doesn't exist
      console.log("Creating projects table...");
      
      const { error: createError } = await supabase.rpc('create_projects_table');
      
      if (createError) {
        console.error("Error creating projects table:", createError);
        throw new Error(`Failed to create projects table: ${createError.message}`);
      }
    }
  };

  const createTokenInvestmentsTable = async () => {
    console.log("Checking token_investments table...");
    
    // Check if table exists by trying to fetch a record
    const { error } = await supabase
      .from('token_investments')
      .select('id')
      .limit(1);
      
    if (error && error.code === '42P01') { // Table doesn't exist
      console.log("Creating token_investments table...");
      
      const { error: createError } = await supabase.rpc('create_token_investments_table');
      
      if (createError) {
        console.error("Error creating token_investments table:", createError);
        throw new Error(`Failed to create token_investments table: ${createError.message}`);
      }
    }
  };

  const createUsersTable = async () => {
    console.log("Checking users table...");
    
    // Check if table exists by trying to fetch a record
    const { error } = await supabase
      .from('users')
      .select('id')
      .limit(1);
      
    if (error && error.code === '42P01') { // Table doesn't exist
      console.log("Creating users table...");
      
      const { error: createError } = await supabase.rpc('create_users_table');
      
      if (createError) {
        console.error("Error creating users table:", createError);
        throw new Error(`Failed to create users table: ${createError.message}`);
      }
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
