
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDBSetup } from "@/lib/db-setup";

const Index = () => {
  const navigate = useNavigate();
  const { initializeDB } = useDBSetup();

  useEffect(() => {
    // Initialize the database
    const setupDB = async () => {
      await initializeDB();
    };
    
    setupDB();
    
    // Redirect to projects page after initialization
    navigate('/projects');
  }, [navigate, initializeDB]);

  return null;
};

export default Index;
