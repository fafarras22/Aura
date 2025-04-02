
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp } from "lucide-react";

export interface ContainerProject {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  totalTokens: number;
  filledTokens: number;
  apy: number;
  runtimeDays: number;
  status: 'live' | 'upcoming' | 'completed' | 'ico';
}

interface ContainerCardProps {
  container: ContainerProject;
  onAction: (containerId: string) => void;
}

export const ContainerCard = ({ container, onAction }: ContainerCardProps) => {
  const { 
    id, 
    name, 
    imageUrl, 
    totalTokens, 
    filledTokens, 
    apy, 
    runtimeDays,
    status
  } = container;
  
  // Calculate progress percentage
  const progressPercentage = (filledTokens / totalTokens) * 100;
  
  // Format remaining tokens
  const remainingTokens = totalTokens - filledTokens;
  
  // Determine button text based on status
  const buttonText = status === 'ico' ? 'Participate' : 'Stake Now';
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all border-2 border-gray-200 hover:border-primary/40">
      <div className="h-40 overflow-hidden">
        <img 
          src={imageUrl || 'https://via.placeholder.com/400x200?text=AKAR+Farm'} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <CardContent className="py-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{name}</h3>
          <Badge 
            variant={
              status === 'live' ? "default" : 
              status === 'upcoming' ? "outline" : 
              status === 'ico' ? "secondary" : 
              "destructive"
            }
            className="uppercase text-xs"
          >
            {status}
          </Badge>
        </div>
        
        <div className="mt-4 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Allocation Progress</span>
            <span className="font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          
          <Progress value={progressPercentage} className="h-2" />
          
          <div className="flex justify-between text-sm">
            <span className="font-medium">{remainingTokens} / {totalTokens} AKR</span>
            <span className="text-muted-foreground">Remaining</span>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-muted rounded-md p-2 text-center">
            <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="font-semibold">{apy}%</span>
            </div>
            <p className="text-xs text-muted-foreground">Current APY</p>
          </div>
          
          <div className="bg-muted rounded-md p-2 text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
              <Clock className="h-4 w-4" />
              <span className="font-semibold">{runtimeDays}</span>
            </div>
            <p className="text-xs text-muted-foreground">Duration (days)</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pb-4 pt-0">
        <Button 
          className="w-full"
          onClick={() => onAction(id)}
          variant={status === 'ico' ? "secondary" : "default"}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};
