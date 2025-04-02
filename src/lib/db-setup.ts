
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

// Hook to use in components
export const useDBSetup = () => {
  const { toast } = useToast();

  const initializeDB = async () => {
    try {
      console.log("Starting database initialization...");
      
      // Create containers table
      const { error: containersError } = await supabase.from('containers')
        .select('id')
        .limit(1)
        .catch(async () => {
          // If the table doesn't exist, create it
          console.log("Creating containers table...");
          return await supabase.rpc('create_table', {
            table_name: 'containers',
            definition: `
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
            `
          });
        });

      if (containersError) {
        console.log("Creating containers table directly...");
        await supabase.sql(`
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
          )
        `);
      }
      
      // Create sales_data table
      const { error: salesError } = await supabase.from('sales_data')
        .select('id')
        .limit(1)
        .catch(async () => {
          console.log("Creating sales_data table...");
          return await supabase.rpc('create_table', {
            table_name: 'sales_data',
            definition: `
              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              container_id UUID,
              container_name TEXT NOT NULL,
              total_sales INTEGER DEFAULT 0,
              total_revenue NUMERIC DEFAULT 0,
              monthly_sales JSONB DEFAULT '[]'::jsonb,
              supermarket_client JSONB DEFAULT '{}'::jsonb,
              recurring_customers INTEGER DEFAULT 0,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
            `
          });
        });

      if (salesError) {
        console.log("Creating sales_data table directly...");
        await supabase.sql(`
          CREATE TABLE IF NOT EXISTS sales_data (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            container_id UUID,
            container_name TEXT NOT NULL,
            total_sales INTEGER DEFAULT 0,
            total_revenue NUMERIC DEFAULT 0,
            monthly_sales JSONB DEFAULT '[]'::jsonb,
            supermarket_client JSONB DEFAULT '{}'::jsonb,
            recurring_customers INTEGER DEFAULT 0,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
          )
        `);
      }
      
      // Create projects table
      const { error: projectsError } = await supabase.from('projects')
        .select('id')
        .limit(1)
        .catch(async () => {
          console.log("Creating projects table...");
          return await supabase.rpc('create_table', {
            table_name: 'projects',
            definition: `
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
            `
          });
        });

      if (projectsError) {
        console.log("Creating projects table directly...");
        await supabase.sql(`
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
          )
        `);
      }
      
      // Create token_investments table
      const { error: investmentsError } = await supabase.from('token_investments')
        .select('id')
        .limit(1)
        .catch(async () => {
          console.log("Creating token_investments table...");
          return await supabase.rpc('create_table', {
            table_name: 'token_investments',
            definition: `
              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              user_id UUID,
              wallet_address TEXT NOT NULL,
              project_id UUID,
              container_id UUID,
              amount NUMERIC NOT NULL,
              token_amount INTEGER NOT NULL,
              status TEXT DEFAULT 'active',
              transaction_hash TEXT,
              investment_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
              end_date TIMESTAMP WITH TIME ZONE,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
            `
          });
        });

      if (investmentsError) {
        console.log("Creating token_investments table directly...");
        await supabase.sql(`
          CREATE TABLE IF NOT EXISTS token_investments (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID,
            wallet_address TEXT NOT NULL,
            project_id UUID,
            container_id UUID,
            amount NUMERIC NOT NULL,
            token_amount INTEGER NOT NULL,
            status TEXT DEFAULT 'active',
            transaction_hash TEXT,
            investment_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
            end_date TIMESTAMP WITH TIME ZONE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
          )
        `);
      }
      
      // Create users table
      const { error: usersError } = await supabase.from('users')
        .select('id')
        .limit(1)
        .catch(async () => {
          console.log("Creating users table...");
          return await supabase.rpc('create_table', {
            table_name: 'users',
            definition: `
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
            `
          });
        });

      if (usersError) {
        console.log("Creating users table directly...");
        await supabase.sql(`
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
          )
        `);
      }

      // Insert default data if containers table is empty
      const { data: existingContainers } = await supabase
        .from('containers')
        .select('id')
        .limit(1);
        
      if (!existingContainers || existingContainers.length === 0) {
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
          await supabase.from('containers').insert(container);
        }
      }

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

  return { initializeDB };
};
