
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Map, Calendar, DollarSign, Percent } from "lucide-react";
import { ContainerProject } from "./ContainerCard";

export const ContainerDetailsCard = ({ container }: { container: ContainerProject }) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={container.imageUrl || "/placeholder.svg"} 
          alt={container.name}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-4 right-4">
          {container.status === 'live' ? 'Active' : 
           container.status === 'upcoming' ? 'Upcoming' : 
           container.status === 'ico' ? 'ICO' : 'Completed'}
        </Badge>
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{container.name}</CardTitle>
            <CardDescription>{container.type}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
            {container.apy}% APY
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">{container.description}</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Location</p>
            <div className="flex items-center gap-1">
              <Map className="h-4 w-4 text-primary" />
              <span className="font-medium">{container.location}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Duration</p>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-medium">{container.runtimeDays} days</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Min. Investment</p>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="font-medium">10 UMBI</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Expected Yield</p>
            <div className="flex items-center gap-1">
              <Percent className="h-4 w-4 text-primary" />
              <span className="font-medium">{container.apy}%</span>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <Button className="w-full gap-2">
            Invest Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
