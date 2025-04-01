
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { CalendarIcon, Plus, Save, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ContainerData } from "@/context/developer-mode/types";
import { cn } from "@/lib/utils";

export const ContainerDataForm = () => {
  const { toast } = useToast();
  const [containers, setContainers] = useState<Partial<ContainerData>[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchContainers = async () => {
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('containers')
          .select('*');
          
        if (error) throw error;
        
        if (data) {
          // Transform data to match the ContainerData interface
          const transformedData = data.map(item => ({
            id: item.id,
            name: item.name,
            owner: item.owner,
            status: item.status,
            location: item.location,
            nextPaymentDue: item.next_payment_due,
            currentYield: item.current_yield,
            projectedYield: item.projected_yield,
            createdAt: item.created_at
          }));
          
          setContainers(transformedData);
        }
      } catch (error) {
        console.error("Error fetching containers:", error);
        toast({
          title: "Error fetching containers",
          description: "Please try again or check your connection.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchContainers();
  }, [toast]);
  
  const handleAddContainer = () => {
    const newContainer: Partial<ContainerData> = {
      id: Math.random().toString(36).substr(2, 9),
      name: "New Container",
      owner: "",
      status: "inactive",
      location: "Jakarta, Indonesia",
      nextPaymentDue: new Date().toISOString(),
      currentYield: 0,
      projectedYield: 0,
      createdAt: new Date().toISOString()
    };
    
    setContainers([...containers, newContainer]);
  };
  
  const handleRemoveContainer = (id: string) => {
    setContainers(containers.filter(container => container.id !== id));
  };
  
  const handleUpdateContainer = (id: string, field: keyof ContainerData, value: any) => {
    setContainers(containers.map(container => {
      if (container.id === id) {
        return { ...container, [field]: value };
      }
      return container;
    }));
  };
  
  const handleSaveAllContainers = async () => {
    setLoading(true);
    
    try {
      // Transform data back to database format
      const transformedData = containers.map(item => ({
        id: item.id,
        name: item.name,
        owner: item.owner,
        status: item.status,
        location: item.location,
        next_payment_due: item.nextPaymentDue,
        current_yield: item.currentYield,
        projected_yield: item.projectedYield,
        created_at: item.createdAt
      }));
      
      // Use upsert to handle both insert and update
      const { error } = await supabase
        .from('containers')
        .upsert(transformedData);
        
      if (error) throw error;
      
      toast({
        title: "Containers saved",
        description: "All container data has been successfully saved to the database.",
      });
    } catch (error) {
      console.error("Error saving containers:", error);
      toast({
        title: "Error saving data",
        description: "Please try again or check your connection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Container Management</CardTitle>
        <CardDescription>
          Manage all container farms and their details. This data will be displayed throughout the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {containers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No containers available. Add a new container to get started.
              </div>
            ) : (
              containers.map((container, index) => (
                <Card key={container.id} className="border-dashed">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Container {index + 1}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveContainer(container.id!)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`container-name-${container.id}`}>Container Name</Label>
                        <Input 
                          id={`container-name-${container.id}`}
                          value={container.name}
                          onChange={(e) => handleUpdateContainer(container.id!, 'name', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`owner-${container.id}`}>Owner</Label>
                        <Input 
                          id={`owner-${container.id}`}
                          value={container.owner}
                          onChange={(e) => handleUpdateContainer(container.id!, 'owner', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`status-${container.id}`}>Status</Label>
                        <Select 
                          value={container.status} 
                          onValueChange={(value) => handleUpdateContainer(container.id!, 'status', value)}
                        >
                          <SelectTrigger id={`status-${container.id}`}>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor={`location-${container.id}`}>Location</Label>
                        <Input 
                          id={`location-${container.id}`}
                          value={container.location}
                          onChange={(e) => handleUpdateContainer(container.id!, 'location', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`next-payment-${container.id}`}>Next Payment Due</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !container.nextPaymentDue && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {container.nextPaymentDue ? (
                                format(new Date(container.nextPaymentDue), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={container.nextPaymentDue ? new Date(container.nextPaymentDue) : undefined}
                              onSelect={(date) => handleUpdateContainer(container.id!, 'nextPaymentDue', date?.toISOString())}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div>
                        <Label htmlFor={`current-yield-${container.id}`}>Current Yield (kg)</Label>
                        <Input 
                          id={`current-yield-${container.id}`}
                          type="number"
                          value={container.currentYield || 0}
                          onChange={(e) => handleUpdateContainer(container.id!, 'currentYield', parseFloat(e.target.value))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`projected-yield-${container.id}`}>Projected Yield (kg)</Label>
                        <Input 
                          id={`projected-yield-${container.id}`}
                          type="number"
                          value={container.projectedYield || 0}
                          onChange={(e) => handleUpdateContainer(container.id!, 'projectedYield', parseFloat(e.target.value))}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`active-switch-${container.id}`}
                        checked={container.status === 'active'}
                        onCheckedChange={(checked) => 
                          handleUpdateContainer(container.id!, 'status', checked ? 'active' : 'inactive')
                        }
                      />
                      <Label htmlFor={`active-switch-${container.id}`}>
                        Container is {container.status === 'active' ? 'active' : 'inactive'}
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
            
            <div className="flex justify-center">
              <Button onClick={handleAddContainer} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add New Container
              </Button>
            </div>
          </div>
        )}
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
