
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
      
      // Try to create the containers table, but handle failure gracefully
      try {
        await createContainersTable();
      } catch (tableError) {
        console.log("Error creating containers table (expected in demo mode):", tableError);
        // Continue execution - we'll use mock data
      }
      
      // In a real connected environment, we would create more tables and seed data here
      // But for demo purposes, we'll consider the setup "initialized" regardless
      
      setInitialized(true);
      return true;
    } catch (error) {
      console.error("Database initialization error:", error);
      setInitialized(false);
      return false;
    }
  };

  return {
    initializeDB,
    isInitialized: initialized
  };
};
