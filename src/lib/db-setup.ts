
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
    
    // Create projects table
    const projectsTableExists = await tableExists('projects');
    if (!projectsTableExists) {
      const { error: projectsError } = await supabase.rpc('create_projects_table');
      if (projectsError) throw projectsError;
    }
    
    // Create token_investments table
    const tokenInvestmentsTableExists = await tableExists('token_investments');
    if (!tokenInvestmentsTableExists) {
      const { error: tokenInvestmentsError } = await supabase.rpc('create_token_investments_table');
      if (tokenInvestmentsError) throw tokenInvestmentsError;
    }
    
    // Create users table
    const usersTableExists = await tableExists('users');
    if (!usersTableExists) {
      const { error: usersError } = await supabase.rpc('create_users_table');
      if (usersError) throw usersError;
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
                total_tokens INTEGER DEFAULT 1000,
                filled_tokens INTEGER DEFAULT 0,
                apy NUMERIC DEFAULT 12.5,
                runtime_days INTEGER DEFAULT 365,
                image_url TEXT,
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
                total_tokens INTEGER DEFAULT 1000,
                filled_tokens INTEGER DEFAULT 0,
                apy NUMERIC DEFAULT 12.5,
                runtime_days INTEGER DEFAULT 365,
                image_url TEXT,
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
        
        // Create projects table function
        const { error: createProjectsFnError } = await supabase.rpc('exec_sql', {
          sql_command: `
            CREATE OR REPLACE FUNCTION create_projects_table()
            RETURNS void AS $$
            BEGIN
              CREATE TABLE IF NOT EXISTS projects (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
                description TEXT,
                status TEXT DEFAULT 'active',
                project_type TEXT DEFAULT 'staking',
                total_investment_amount NUMERIC DEFAULT 0,
                tokens_allocated INTEGER DEFAULT 0,
                total_tokens INTEGER DEFAULT 1000,
                min_investment NUMERIC DEFAULT 100,
                apy NUMERIC DEFAULT 12.5,
                start_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
                end_date TIMESTAMP WITH TIME ZONE,
                image_url TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
              );
            END;
            $$ LANGUAGE plpgsql;
          `
        });
        
        if (createProjectsFnError) {
          console.error('Error creating projects table function:', createProjectsFnError);
          // Try direct creation
          const { error: directCreateError } = await supabase.rpc('exec_sql', {
            sql_command: `
              CREATE TABLE IF NOT EXISTS projects (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
                description TEXT,
                status TEXT DEFAULT 'active',
                project_type TEXT DEFAULT 'staking',
                total_investment_amount NUMERIC DEFAULT 0,
                tokens_allocated INTEGER DEFAULT 0,
                total_tokens INTEGER DEFAULT 1000,
                min_investment NUMERIC DEFAULT 100,
                apy NUMERIC DEFAULT 12.5,
                start_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
                end_date TIMESTAMP WITH TIME ZONE,
                image_url TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
              );
            `
          });
          if (directCreateError) throw directCreateError;
        }
        
        // Create token_investments table function
        const { error: createTokenInvestmentsFnError } = await supabase.rpc('exec_sql', {
          sql_command: `
            CREATE OR REPLACE FUNCTION create_token_investments_table()
            RETURNS void AS $$
            BEGIN
              CREATE TABLE IF NOT EXISTS token_investments (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID,
                wallet_address TEXT NOT NULL,
                project_id UUID REFERENCES projects(id),
                container_id UUID REFERENCES containers(id),
                amount NUMERIC NOT NULL,
                token_amount INTEGER NOT NULL,
                status TEXT DEFAULT 'active',
                transaction_hash TEXT,
                investment_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
                end_date TIMESTAMP WITH TIME ZONE,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
              );
            END;
            $$ LANGUAGE plpgsql;
          `
        });
        
        if (createTokenInvestmentsFnError) {
          console.error('Error creating token_investments table function:', createTokenInvestmentsFnError);
          // Try direct creation
          const { error: directCreateError } = await supabase.rpc('exec_sql', {
            sql_command: `
              CREATE TABLE IF NOT EXISTS token_investments (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID,
                wallet_address TEXT NOT NULL,
                project_id UUID REFERENCES projects(id),
                container_id UUID REFERENCES containers(id),
                amount NUMERIC NOT NULL,
                token_amount INTEGER NOT NULL,
                status TEXT DEFAULT 'active',
                transaction_hash TEXT,
                investment_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
                end_date TIMESTAMP WITH TIME ZONE,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
              );
            `
          });
          if (directCreateError) throw directCreateError;
        }
        
        // Create users table function
        const { error: createUsersFnError } = await supabase.rpc('exec_sql', {
          sql_command: `
            CREATE OR REPLACE FUNCTION create_users_table()
            RETURNS void AS $$
            BEGIN
              CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                wallet_address TEXT UNIQUE NOT NULL,
                email TEXT,
                name TEXT,
                role TEXT DEFAULT 'investor',
                total_invested NUMERIC DEFAULT 0,
                token_balance NUMERIC DEFAULT 0,
                staked_balance NUMERIC DEFAULT 0,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
              );
            END;
            $$ LANGUAGE plpgsql;
          `
        });
        
        if (createUsersFnError) {
          console.error('Error creating users table function:', createUsersFnError);
          // Try direct creation
          const { error: directCreateError } = await supabase.rpc('exec_sql', {
            sql_command: `
              CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                wallet_address TEXT UNIQUE NOT NULL,
                email TEXT,
                name TEXT,
                role TEXT DEFAULT 'investor',
                total_invested NUMERIC DEFAULT 0,
                token_balance NUMERIC DEFAULT 0,
                staked_balance NUMERIC DEFAULT 0,
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
