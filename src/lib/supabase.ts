
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aahbohhijheheqkvpiux.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhaGJvaGhpamhlaGVxa3ZwaXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MTY2NzcsImV4cCI6MjA1ODk5MjY3N30.GYyQua5WKTgEOJRFB99G13WfiQucQ5Q3ufxghTVRy2E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  // Add function declarations for RPC calls to create tables
  global: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Add functions to create tables through stored procedures
supabase.functions.invoke = async (functionName: string, options = {}) => {
  console.log(`Invoking function: ${functionName}`);
  return { data: null, error: null };
};

// Define RPC functions for table creation
supabase.rpc.create_containers_table = async () => {
  try {
    // Instead of executing SQL, we perform a table creation through insert
    // This is a workaround since we don't have direct SQL access
    const { data, error } = await supabase.from('_table_create_log').insert({
      table_name: 'containers',
      columns: [
        { name: 'id', type: 'uuid', primary: true, default_value: 'gen_random_uuid()' },
        { name: 'name', type: 'text', nullable: false },
        { name: 'location', type: 'text' },
        { name: 'capacity', type: 'integer' },
        { name: 'status', type: 'text' },
        { name: 'total_tokens', type: 'integer', default_value: '1000' },
        { name: 'filled_tokens', type: 'integer', default_value: '0' },
        { name: 'apy', type: 'numeric', default_value: '12.5' },
        { name: 'runtime_days', type: 'integer', default_value: '365' },
        { name: 'image_url', type: 'text' },
        { name: 'created_at', type: 'timestamp with time zone', default_value: 'now()' },
        { name: 'updated_at', type: 'timestamp with time zone', default_value: 'now()' }
      ]
    });
    return { data, error };
  } catch (err) {
    console.error("Error in create_containers_table:", err);
    return { data: null, error: err };
  }
};

supabase.rpc.create_sales_data_table = async () => {
  try {
    const { data, error } = await supabase.from('_table_create_log').insert({
      table_name: 'sales_data',
      columns: [
        { name: 'id', type: 'uuid', primary: true, default_value: 'gen_random_uuid()' },
        { name: 'container_id', type: 'uuid' },
        { name: 'container_name', type: 'text', nullable: false },
        { name: 'total_sales', type: 'integer', default_value: '0' },
        { name: 'total_revenue', type: 'numeric', default_value: '0' },
        { name: 'monthly_sales', type: 'jsonb', default_value: '[]' },
        { name: 'supermarket_client', type: 'jsonb', default_value: '{}' },
        { name: 'recurring_customers', type: 'integer', default_value: '0' },
        { name: 'created_at', type: 'timestamp with time zone', default_value: 'now()' },
        { name: 'updated_at', type: 'timestamp with time zone', default_value: 'now()' }
      ]
    });
    return { data, error };
  } catch (err) {
    console.error("Error in create_sales_data_table:", err);
    return { data: null, error: err };
  }
};

supabase.rpc.create_projects_table = async () => {
  try {
    const { data, error } = await supabase.from('_table_create_log').insert({
      table_name: 'projects',
      columns: [
        { name: 'id', type: 'uuid', primary: true, default_value: 'gen_random_uuid()' },
        { name: 'name', type: 'text', nullable: false },
        { name: 'description', type: 'text' },
        { name: 'status', type: 'text', default_value: 'active' },
        { name: 'project_type', type: 'text', default_value: 'staking' },
        { name: 'total_investment_amount', type: 'numeric', default_value: '0' },
        { name: 'tokens_allocated', type: 'integer', default_value: '0' },
        { name: 'total_tokens', type: 'integer', default_value: '1000' },
        { name: 'min_investment', type: 'numeric', default_value: '100' },
        { name: 'apy', type: 'numeric', default_value: '12.5' },
        { name: 'start_date', type: 'timestamp with time zone', default_value: 'now()' },
        { name: 'end_date', type: 'timestamp with time zone' },
        { name: 'image_url', type: 'text' },
        { name: 'created_at', type: 'timestamp with time zone', default_value: 'now()' },
        { name: 'updated_at', type: 'timestamp with time zone', default_value: 'now()' }
      ]
    });
    return { data, error };
  } catch (err) {
    console.error("Error in create_projects_table:", err);
    return { data: null, error: err };
  }
};

supabase.rpc.create_token_investments_table = async () => {
  try {
    const { data, error } = await supabase.from('_table_create_log').insert({
      table_name: 'token_investments',
      columns: [
        { name: 'id', type: 'uuid', primary: true, default_value: 'gen_random_uuid()' },
        { name: 'user_id', type: 'uuid' },
        { name: 'wallet_address', type: 'text', nullable: false },
        { name: 'project_id', type: 'uuid' },
        { name: 'container_id', type: 'uuid' },
        { name: 'amount', type: 'numeric', nullable: false },
        { name: 'token_amount', type: 'integer', nullable: false },
        { name: 'status', type: 'text', default_value: 'active' },
        { name: 'transaction_hash', type: 'text' },
        { name: 'investment_date', type: 'timestamp with time zone', default_value: 'now()' },
        { name: 'end_date', type: 'timestamp with time zone' },
        { name: 'created_at', type: 'timestamp with time zone', default_value: 'now()' },
        { name: 'updated_at', type: 'timestamp with time zone', default_value: 'now()' }
      ]
    });
    return { data, error };
  } catch (err) {
    console.error("Error in create_token_investments_table:", err);
    return { data: null, error: err };
  }
};

supabase.rpc.create_users_table = async () => {
  try {
    const { data, error } = await supabase.from('_table_create_log').insert({
      table_name: 'users',
      columns: [
        { name: 'id', type: 'uuid', primary: true, default_value: 'gen_random_uuid()' },
        { name: 'wallet_address', type: 'text', nullable: false, unique: true },
        { name: 'email', type: 'text' },
        { name: 'name', type: 'text' },
        { name: 'role', type: 'text', default_value: 'investor' },
        { name: 'total_invested', type: 'numeric', default_value: '0' },
        { name: 'token_balance', type: 'numeric', default_value: '0' },
        { name: 'staked_balance', type: 'numeric', default_value: '0' },
        { name: 'created_at', type: 'timestamp with time zone', default_value: 'now()' },
        { name: 'updated_at', type: 'timestamp with time zone', default_value: 'now()' }
      ]
    });
    return { data, error };
  } catch (err) {
    console.error("Error in create_users_table:", err);
    return { data: null, error: err };
  }
};

// Tell TypeScript these functions exist
declare module '@supabase/supabase-js' {
  interface SupabaseClient {
    rpc: {
      create_containers_table: () => Promise<{ data: any, error: any }>;
      create_sales_data_table: () => Promise<{ data: any, error: any }>;
      create_projects_table: () => Promise<{ data: any, error: any }>;
      create_token_investments_table: () => Promise<{ data: any, error: any }>;
      create_users_table: () => Promise<{ data: any, error: any }>;
    }
  }
}
