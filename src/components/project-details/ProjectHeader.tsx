
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProjectHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/projects')}
        className="gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Projects
      </Button>
    </div>
  );
};

export default ProjectHeader;
