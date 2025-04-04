
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, TrendingUp, Clock } from "lucide-react";

interface ProjectStatCardsProps {
  progressPercentage: number;
  apy: number;
  runtimeDays: number;
}

const ProjectStatCards = ({ progressPercentage, apy, runtimeDays }: ProjectStatCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center rounded-full border-4 border-green-100 p-2 mb-2">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">{progressPercentage.toFixed(1) + '%'}</h3>
            <p className="text-sm text-muted-foreground">Funded</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center rounded-full border-4 border-blue-100 p-2 mb-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold">{apy}%</h3>
            <p className="text-sm text-muted-foreground">Target APY</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center rounded-full border-4 border-purple-100 p-2 mb-2">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold">{runtimeDays}</h3>
            <p className="text-sm text-muted-foreground">Duration (days)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectStatCards;
