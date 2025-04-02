
import { useState } from 'react';
import { supabase, tableExists, createContainersTable } from './supabase';

export const useDBSetup = () => {
  const [initialized, setInitialized] = useState(false);

  const initializeDB = async () => {
    console.log("Starting database initialization...");
    
    try {
      // Check if we can connect to the database
      const { error: connectionError } = await supabase.from('dummy_check').select('*').limit(1);
      
      if (connectionError && connectionError.code !== '42P01') {
        // If the error is not just "table doesn't exist", we have connection issues
        console.error("Database connection error:", connectionError);
        return false;
      }
      
      // Check if containers table exists
      const containersExists = await tableExists('containers');
      
      if (!containersExists) {
        console.log("Creating containers table...");
        await createContainersTable();
        
        // Insert default containers
        console.log("Inserting default containers...");
        
        try {
          // In production or with an actual connected database, we'd insert real data
          const defaultContainers = [
            { name: 'Jakarta Farm Container', location: 'Jakarta, Indonesia', status: 'active' },
            { name: 'Bandung Farm Container', location: 'Bandung, Indonesia', status: 'maintenance' },
            { name: 'Surabaya Farm Container', location: 'Surabaya, Indonesia', status: 'active' }
          ];
          
          for (const container of defaultContainers) {
            await supabase.from('containers').insert(container);
          }
        } catch (insertError) {
          console.log("Note: Insert simulation - in demo mode");
          // This is fine in demo mode, as we're using mock data anyway
        }
      }
      
      // Check each of our dependent tables and create them if needed
      // This is just a stub for now but would create other tables as needed

      setInitialized(true);
      return true;
    } catch (error) {
      console.error("Database initialization error:", error);
      return false;
    }
  };

  return {
    initializeDB,
    isInitialized: initialized
  };
};
