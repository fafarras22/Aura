
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProjectDescriptionProps {
  description: string | undefined;
  progressPercentage: number;
  filledTokens: number;
  totalTokens: number;
}

const ProjectDescription = ({
  description,
  progressPercentage,
  filledTokens,
  totalTokens
}: ProjectDescriptionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Description</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {description || `This container farm project uses advanced hydroponic systems to grow premium produce with minimal water usage and no pesticides. Located strategically for optimal distribution, this project aims to deliver fresh produce to local markets while generating stable returns for token holders.
          
          The container is equipped with IoT sensors for real-time monitoring and uses AI to optimize growing conditions. Each AKR token represents fractional ownership in this farm, entitling holders to proportional returns from produce sales.`}
        </p>
        
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span>{progressPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filledTokens} AKR</span>
              <span>{totalTokens} AKR</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectDescription;
