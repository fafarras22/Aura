
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RiskAssessmentCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm">Market risk</span>
          <div className="flex">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-2 h-8 bg-green-500 mx-0.5 rounded-sm" />
            ))}
            {[4, 5].map((i) => (
              <div key={i} className="w-2 h-8 bg-gray-200 mx-0.5 rounded-sm" />
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm">Technical risk</span>
          <div className="flex">
            {[1, 2].map((i) => (
              <div key={i} className="w-2 h-8 bg-green-500 mx-0.5 rounded-sm" />
            ))}
            {[3, 4, 5].map((i) => (
              <div key={i} className="w-2 h-8 bg-gray-200 mx-0.5 rounded-sm" />
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm">Operational risk</span>
          <div className="flex">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-2 h-8 bg-green-500 mx-0.5 rounded-sm" />
            ))}
            {[5].map((i) => (
              <div key={i} className="w-2 h-8 bg-gray-200 mx-0.5 rounded-sm" />
            ))}
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-4">
          This project has been vetted by the AKAR team and is considered to have a low to moderate risk profile.
        </p>
      </CardContent>
    </Card>
  );
};

export default RiskAssessmentCard;
