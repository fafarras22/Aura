
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";
import { Plus, Upload, Download, Trash2, Save } from "lucide-react";
import { ContainerSalesData } from "@/services/mockDataService";

export const SalesDataForm = () => {
  const { toast } = useToast();
  const [salesData, setSalesData] = useState<Partial<ContainerSalesData>[]>([]);
  const [selectedContainer, setSelectedContainer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [containers, setContainers] = useState<{id: string, name: string}[]>([]);
  
  // Load containers for the dropdown
  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const { data, error } = await supabase
          .from('containers')
          .select('id, name');
          
        if (error) throw error;
        
        if (data) {
          setContainers(data);
          if (data.length > 0) {
            setSelectedContainer(data[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching containers:", error);
        toast({
          title: "Error fetching containers",
          description: "Please try again or check your connection.",
          variant: "destructive",
        });
      }
    };
    
    fetchContainers();
  }, [toast]);
  
  // Load sales data for selected container
  useEffect(() => {
    if (!selectedContainer) return;
    
    const fetchSalesData = async () => {
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('sales_data')
          .select('*')
          .eq('container_id', selectedContainer);
          
        if (error) throw error;
        
        if (data) {
          // Transform data to match the ContainerSalesData interface
          const transformedData = data.map(item => ({
            id: item.id,
            containerName: item.container_name,
            totalSales: item.total_sales,
            totalRevenue: item.total_revenue,
            monthlySales: item.monthly_sales,
            supermarketClient: item.supermarket_client,
            recurringCustomers: item.recurring_customers
          }));
          
          setSalesData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
        toast({
          title: "Error fetching sales data",
          description: "Please try again or check your connection.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchSalesData();
  }, [selectedContainer, toast]);
  
  const handleAddSalesRecord = () => {
    const newSalesRecord: Partial<ContainerSalesData> = {
      id: Math.random().toString(36).substr(2, 9),
      containerName: containers.find(c => c.id === selectedContainer)?.name || "",
      totalSales: 0,
      totalRevenue: 0,
      monthlySales: [0, 0, 0, 0, 0, 0]
    };
    
    setSalesData([...salesData, newSalesRecord]);
  };
  
  const handleRemoveSalesRecord = (id: string) => {
    setSalesData(salesData.filter(record => record.id !== id));
  };
  
  const handleUpdateSalesRecord = (id: string, field: keyof ContainerSalesData, value: any) => {
    setSalesData(salesData.map(record => {
      if (record.id === id) {
        return { ...record, [field]: value };
      }
      return record;
    }));
  };
  
  const handleSaveAllData = async () => {
    setLoading(true);
    
    try {
      // Transform data back to database format
      const transformedData = salesData.map(item => ({
        id: item.id,
        container_id: selectedContainer,
        container_name: item.containerName,
        total_sales: item.totalSales,
        total_revenue: item.totalRevenue,
        monthly_sales: item.monthlySales,
        supermarket_client: item.supermarketClient,
        recurring_customers: item.recurringCustomers
      }));
      
      // Use upsert to handle both insert and update
      const { error } = await supabase
        .from('sales_data')
        .upsert(transformedData);
        
      if (error) throw error;
      
      toast({
        title: "Sales data saved",
        description: "All sales data has been successfully saved to the database.",
      });
    } catch (error) {
      console.error("Error saving sales data:", error);
      toast({
        title: "Error saving data",
        description: "Please try again or check your connection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleImportCSV = () => {
    // Placeholder for CSV import functionality
    toast({
      title: "Import functionality",
      description: "CSV import functionality would be implemented here.",
    });
  };
  
  const handleExportCSV = () => {
    // Placeholder for CSV export functionality
    toast({
      title: "Export functionality",
      description: "CSV export functionality would be implemented here.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Sales Data Management</CardTitle>
        <CardDescription>
          Manage sales data for all containers. This data will be displayed on the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="w-full md:w-1/3">
            <Label htmlFor="container-select">Select Container</Label>
            <Select 
              value={selectedContainer} 
              onValueChange={setSelectedContainer}
              disabled={loading}
            >
              <SelectTrigger id="container-select">
                <SelectValue placeholder="Select a container" />
              </SelectTrigger>
              <SelectContent>
                {containers.map(container => (
                  <SelectItem key={container.id} value={container.id}>
                    {container.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleImportCSV} disabled={loading}>
              <Upload className="mr-2 h-4 w-4" />
              Import CSV
            </Button>
            <Button variant="outline" onClick={handleExportCSV} disabled={loading}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
        
        <Separator />
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {salesData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No sales data available for this container. Add a new record to get started.
              </div>
            ) : (
              salesData.map((record, index) => (
                <Card key={record.id} className="border-dashed">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Sales Record {index + 1}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveSalesRecord(record.id!)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`container-name-${record.id}`}>Container Name</Label>
                        <Input 
                          id={`container-name-${record.id}`}
                          value={record.containerName}
                          onChange={(e) => handleUpdateSalesRecord(record.id!, 'containerName', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`client-name-${record.id}`}>Supermarket Client</Label>
                        <Input 
                          id={`client-name-${record.id}`}
                          value={record.supermarketClient?.name || ""}
                          onChange={(e) => {
                            const updatedClient = { 
                              ...(record.supermarketClient || {}),
                              name: e.target.value 
                            };
                            handleUpdateSalesRecord(record.id!, 'supermarketClient', updatedClient);
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`total-sales-${record.id}`}>Total Sales (units)</Label>
                        <Input 
                          id={`total-sales-${record.id}`}
                          type="number"
                          value={record.totalSales || 0}
                          onChange={(e) => handleUpdateSalesRecord(record.id!, 'totalSales', parseInt(e.target.value))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`total-revenue-${record.id}`}>Total Revenue (IDR)</Label>
                        <Input 
                          id={`total-revenue-${record.id}`}
                          type="number"
                          value={record.totalRevenue || 0}
                          onChange={(e) => handleUpdateSalesRecord(record.id!, 'totalRevenue', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Monthly Sales (last 6 months)</Label>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i}>
                            <Label htmlFor={`month-${i + 1}-${record.id}`} className="text-xs">Month {i + 1}</Label>
                            <Input 
                              id={`month-${i + 1}-${record.id}`}
                              type="number"
                              className="mt-1"
                              value={(record.monthlySales || [])[i] || 0}
                              onChange={(e) => {
                                const newMonthlySales = [...(record.monthlySales || Array(6).fill(0))];
                                newMonthlySales[i] = parseInt(e.target.value);
                                handleUpdateSalesRecord(record.id!, 'monthlySales', newMonthlySales);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
            
            <div className="flex justify-center">
              <Button onClick={handleAddSalesRecord} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add New Sales Record
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveAllData} disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          Save All Data
        </Button>
      </CardFooter>
    </Card>
  );
};
