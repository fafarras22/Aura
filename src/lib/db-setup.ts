
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

// Function to check if a table exists
export const tableExists = async (tableName: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public')
    .eq('table_name', tableName);

  if (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }

  return data && data.length > 0;
};

// Function to create the necessary tables if they don't exist
export const setupTables = async (): Promise<boolean> => {
  try {
    // Create containers table
    const containerTableExists = await tableExists('containers');
    if (!containerTableExists) {
      const { error: containerError } = await supabase.rpc('create_containers_table');
      if (containerError) throw containerError;
    }

    // Create sales_data table
    const salesDataTableExists = await tableExists('sales_data');
    if (!salesDataTableExists) {
      const { error: salesDataError } = await supabase.rpc('create_sales_data_table');
      if (salesDataError) throw salesDataError;
    }

    return true;
  } catch (error) {
    console.error('Error setting up tables:', error);
    return false;
  }
};

// Hook to use in components
export const useDBSetup = () => {
  const { toast } = useToast();

  const initializeDB = async () => {
    try {
      // Check if we need to create the necessary SQL functions
      const { data: functionExists, error: functionCheckError } = await supabase
        .from('pg_proc')
        .select('proname')
        .eq('proname', 'create_containers_table');

      if (functionCheckError) {
        console.error('Error checking if functions exist:', functionCheckError);
      }

      // If the functions don't exist, create them
      if (!functionExists || functionExists.length === 0) {
        // Create container table function
        const { error: createContainerFnError } = await supabase.rpc('exec_sql', {
          sql_command: `
            CREATE OR REPLACE FUNCTION create_containers_table()
            RETURNS void AS $$
            BEGIN
              CREATE TABLE IF NOT EXISTS containers (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
                location TEXT,
                capacity INTEGER,
                status TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
              );
            END;
            $$ LANGUAGE plpgsql;
          `
        });

        if (createContainerFnError) {
          console.error('Error creating container table function:', createContainerFnError);
          // If we can't create the function, try directly creating the table
          const { error: directCreateError } = await supabase.rpc('exec_sql', {
            sql_command: `
              CREATE TABLE IF NOT EXISTS containers (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
                location TEXT,
                capacity INTEGER,
                status TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
              );
            `
          });
          if (directCreateError) throw directCreateError;
        }

        // Create sales_data table function
        const { error: createSalesDataFnError } = await supabase.rpc('exec_sql', {
          sql_command: `
            CREATE OR REPLACE FUNCTION create_sales_data_table()
            RETURNS void AS $$
            BEGIN
              CREATE TABLE IF NOT EXISTS sales_data (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                container_id UUID REFERENCES containers(id),
                container_name TEXT NOT NULL,
                total_sales INTEGER DEFAULT 0,
                total_revenue NUMERIC DEFAULT 0,
                monthly_sales JSONB DEFAULT '[]'::jsonb,
                supermarket_client JSONB DEFAULT '{}'::jsonb,
                recurring_customers INTEGER DEFAULT 0,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
              );
            END;
            $$ LANGUAGE plpgsql;
          `
        });

        if (createSalesDataFnError) {
          console.error('Error creating sales_data table function:', createSalesDataFnError);
          // If we can't create the function, try directly creating the table
          const { error: directCreateError } = await supabase.rpc('exec_sql', {
            sql_command: `
              CREATE TABLE IF NOT EXISTS sales_data (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                container_id TEXT,
                container_name TEXT NOT NULL,
                total_sales INTEGER DEFAULT 0,
                total_revenue NUMERIC DEFAULT 0,
                monthly_sales JSONB DEFAULT '[]'::jsonb,
                supermarket_client JSONB DEFAULT '{}'::jsonb,
                recurring_customers INTEGER DEFAULT 0,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
              );
            `
          });
          if (directCreateError) throw directCreateError;
        }

        // Create exec_sql function if it doesn't exist
        const { error: createExecSqlFnError } = await supabase.rpc('exec_sql', {
          sql_command: `
            CREATE OR REPLACE FUNCTION exec_sql(sql_command text)
            RETURNS void AS $$
            BEGIN
              EXECUTE sql_command;
            END;
            $$ LANGUAGE plpgsql;
          `
        });

        if (createExecSqlFnError && createExecSqlFnError.message !== 'function already exists') {
          console.error('Error creating exec_sql function:', createExecSqlFnError);
          throw createExecSqlFnError;
        }
      }

      // Now try to setup the tables
      const success = await setupTables();
      if (!success) {
        toast({
          title: "Database Initialization Warning",
          description: "Some database tables couldn't be created. Some features may be limited.",
          variant: "destructive",
        });
        return false;
      }

      console.log("Database tables initialized successfully");
      return true;
    } catch (error) {
      console.error('Error initializing database:', error);
      toast({
        title: "Database Initialization Failed",
        description: "Could not set up database tables. Using local storage mode.",
        variant: "destructive",
      });
      return false;
    }
  };

  return { initializeDB };
};
