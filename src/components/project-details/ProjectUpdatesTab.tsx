
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ContainerProject } from "@/components/containers/ContainerCard";

interface ProjectUpdatesTabProps {
  container: ContainerProject;
}

const ProjectUpdatesTab = ({ container }: ProjectUpdatesTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Updates</CardTitle>
        <CardDescription>Latest news from the farm</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {container.status === 'upcoming' ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No updates yet</AlertTitle>
            <AlertDescription>
              This project is coming soon. Updates will be posted here once the project goes live.
            </AlertDescription>
          </Alert>
        ) : container.status === 'live' ? (
          <>
            <div className="border-l-2 border-green-500 pl-4 py-2">
              <p className="text-xs text-muted-foreground">Yesterday</p>
              <h3 className="font-medium">First harvest completed</h3>
              <p className="text-sm text-muted-foreground">
                The first harvest has been completed with yields exceeding initial projections by 15%.
              </p>
            </div>
            <div className="border-l-2 border-blue-500 pl-4 py-2">
              <p className="text-xs text-muted-foreground">Last week</p>
              <h3 className="font-medium">Distribution partnerships secured</h3>
              <p className="text-sm text-muted-foreground">
                We've secured three new distribution partnerships with local supermarkets.
              </p>
            </div>
          </>
        ) : container.status === 'ico' ? (
          <div className="border-l-2 border-purple-500 pl-4 py-2">
            <p className="text-xs text-muted-foreground">Today</p>
            <h3 className="font-medium">ICO now live</h3>
            <p className="text-sm text-muted-foreground">
              The Initial Container Offering is now live. Be among the first to participate in this exciting project.
            </p>
          </div>
        ) : (
          <div className="border-l-2 border-green-500 pl-4 py-2">
            <p className="text-xs text-muted-foreground">Last month</p>
            <h3 className="font-medium">Project completed successfully</h3>
            <p className="text-sm text-muted-foreground">
              This container farm project has completed its full cycle with an average return of {container.apy}% APY for investors.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectUpdatesTab;
