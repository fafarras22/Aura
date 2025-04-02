
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to projects page immediately
    navigate('/projects');
  }, [navigate]);

  return null;
};

export default Index;
