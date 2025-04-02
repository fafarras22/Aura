
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aahbohhijheheqkvpiux.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhaGJvaGhpamhlaGVxa3ZwaXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MTY2NzcsImV4cCI6MjA1ODk5MjY3N30.GYyQua5WKTgEOJRFB99G13WfiQucQ5Q3ufxghTVRy2E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
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

// Check if a table exists
export const tableExists = async (tableName: string) => {
  try {
    const { error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
      
    // If no error, table exists
    if (!error) return true;
    
    // If error is not "table does not exist", something else is wrong
    if (error.code !== '42P01') {
      console.error(`Error checking if table ${tableName} exists:`, error);
    }
    
    return false;
  } catch (err) {
    console.error(`Exception checking if table ${tableName} exists:`, err);
    return false;
  }
};

// Add functions to invoke Supabase functions
supabase.functions.invoke = async (functionName: string, options = {}) => {
  console.log(`Invoking function: ${functionName}`);
  return { data: null, error: null };
};
