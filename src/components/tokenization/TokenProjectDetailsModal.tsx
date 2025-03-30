
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Info, BarChart3 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export interface ProjectDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: {
    id: number;
    name: string;
    containerNumber: string;
    minAmount: number;
    returnRate: number;
    duration: number;
    location: string;
    description: string;
    status: string;
    riskLevel: "low" | "medium" | "high";
    fundingProgress: number;
    fundingGoal: number;
    cropType: string;
    farmType: string;
    historicalReturns: { year: string; return: number }[];
  };
  onInvest: () => void;
  isDeveloperMode?: boolean; // Make this prop optional
}

export function TokenProjectDetailsModal({ 
  open, 
  onOpenChange, 
  project, 
  onInvest,
  isDeveloperMode = false // Default value if not provided
}: ProjectDetailsModalProps) {
  const fundingPercentage = Math.round((project.fundingProgress / project.fundingGoal) * 100);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold flex items-center gap-2">
            {project.name}
            <Badge variant={project.status === "active" ? "success" : "default"}>
              {project.status}
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-base md:text-lg">
            Container {project.containerNumber} • {project.cropType} • {project.location}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Investment Details</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Minimum Investment</span>
                  <span className="font-medium">{formatCurrency(project.minAmount)}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Expected Return</span>
                  <span className="font-medium text-green-600">{project.returnRate}%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{project.duration} months</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Risk Level</span>
                  <Badge variant={
                    project.riskLevel === "low" ? "outline" : 
                    project.riskLevel === "medium" ? "secondary" : "destructive"
                  } className="ml-auto">
                    {project.riskLevel}
                  </Badge>
                </li>
              </ul>
            </div>

            <Card className="p-4">
              <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Funding Progress
              </h3>
              <div className="space-y-2">
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${fundingPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{fundingPercentage}% Funded</span>
                  <span>{formatCurrency(project.fundingProgress)} / {formatCurrency(project.fundingGoal)}</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg mb-2">Project Description</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Historical Performance</h3>
              <div className="bg-muted/50 p-4 rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Year</th>
                      <th className="text-right">Return</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.historicalReturns.map((item, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="py-2">{item.year}</td>
                        <td className="py-2 text-right font-medium text-green-600">+{item.return}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <Button variant="outline" className="flex items-center gap-2" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Info className="w-4 h-4" />
              <span>View Contract</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </a>
          </Button>
          
          {!isDeveloperMode && (
            <Button onClick={onInvest} className="flex-1 font-medium">
              Invest Now
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
