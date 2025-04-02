
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { ContainerList } from "./containers/ContainerList";
import { useContainerData } from "./containers/useContainerData";

export const ContainerDataForm = () => {
  const {
    containers,
    loading,
    handleAddContainer,
    handleRemoveContainer,
    handleUpdateContainer,
    handleSaveAllContainers
  } = useContainerData();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Container Management</CardTitle>
        <CardDescription>
          Manage all container farms and their details. This data will be displayed throughout the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ContainerList 
          containers={containers}
          onUpdateContainer={handleUpdateContainer}
          onRemoveContainer={handleRemoveContainer}
          onAddContainer={handleAddContainer}
          loading={loading}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Total Containers: {containers.length}
        </div>
        <Button onClick={handleSaveAllContainers} disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          Save All Containers
        </Button>
      </CardFooter>
    </Card>
  );
};
