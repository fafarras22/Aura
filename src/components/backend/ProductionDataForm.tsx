
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { format, subDays } from "date-fns";
import { CalendarIcon, Plus, Save, Trash2, ChartBar, Leaf, TrendingUp } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface ProductType {
  id: string;
  name: string;
  category: 'vegetable' | 'fruit' | 'herb';
  unit: 'kg' | 'g' | 'pieces';
  averagePrice: number;
}

interface ProductionData {
  id: string;
  containerId: string;
  containerName: string;
  productId: string;
  productName: string;
  productCategory: 'vegetable' | 'fruit' | 'herb';
  quantity: number;
  unit: 'kg' | 'g' | 'pieces';
  harvestDate: string;
  salesAmount: number;
  soldQuantity: number;
  remainingQuantity: number;
  wastage: number;
  notes: string;
}

export const ProductionDataForm = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'vegetable' | 'fruit' | 'herb'>('vegetable');
  const [containers, setContainers] = useState<{id: string, name: string}[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productionData, setProductionData] = useState<Partial<ProductionData>[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState<string>("");
  
  // Initialize with dates for the past week
  const [dateRange, setDateRange] = useState({
    start: subDays(new Date(), 7).toISOString(),
    end: new Date().toISOString()
  });

  // Load containers for the dropdown
  useEffect(() => {
    const fetchContainers = async () => {
      try {
        // This will fail until you create the table
        const { data, error } = await supabase
          .from('containers')
          .select('id, name');
          
        if (error) {
          console.error("Error fetching containers:", error);
          // For demo purposes, load mock data if table doesn't exist
          const mockContainers = [
            { id: "cont-001", name: "Container Jakarta 01" },
            { id: "cont-002", name: "Container Bandung 01" },
            { id: "cont-003", name: "Container Surabaya 01" }
          ];
          setContainers(mockContainers);
          setSelectedContainer(mockContainers[0].id);
          return;
        }
        
        if (data) {
          setContainers(data);
          if (data.length > 0) {
            setSelectedContainer(data[0].id);
          }
        }
      } catch (error) {
        console.error("Error in container fetch:", error);
        toast({
          title: "Error fetching containers",
          description: "Please try again or check your connection.",
          variant: "destructive",
        });
      }
    };
    
    fetchContainers();
  }, [toast]);

  // Load product types
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // This will fail until you create the table
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', activeTab);
          
        if (error) {
          console.error("Error fetching products:", error);
          // Load mock data for demo purposes
          const mockProducts: ProductType[] = [
            // Vegetables
            { id: "prod-001", name: "Spinach", category: "vegetable", unit: "kg", averagePrice: 25000 },
            { id: "prod-002", name: "Kale", category: "vegetable", unit: "kg", averagePrice: 30000 },
            { id: "prod-003", name: "Lettuce", category: "vegetable", unit: "kg", averagePrice: 20000 },
            // Fruits
            { id: "prod-004", name: "Strawberry", category: "fruit", unit: "kg", averagePrice: 100000 },
            { id: "prod-005", name: "Cherry Tomato", category: "fruit", unit: "kg", averagePrice: 45000 },
            // Herbs
            { id: "prod-006", name: "Basil", category: "herb", unit: "g", averagePrice: 15000 },
            { id: "prod-007", name: "Mint", category: "herb", unit: "g", averagePrice: 12000 },
          ].filter(p => p.category === activeTab);
          
          setProducts(mockProducts);
          return;
        }
        
        if (data) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error in products fetch:", error);
      }
    };
    
    fetchProducts();
  }, [activeTab]);

  // Load production data based on container and date range
  useEffect(() => {
    if (!selectedContainer) return;
    
    const fetchProductionData = async () => {
      setLoading(true);
      
      try {
        // This will fail until you create the table
        const { data, error } = await supabase
          .from('production_data')
          .select('*')
          .eq('container_id', selectedContainer)
          .gte('harvest_date', dateRange.start)
          .lte('harvest_date', dateRange.end)
          .eq('product_category', activeTab);
          
        if (error) {
          console.error("Error fetching production data:", error);
          // Generate mock data for demo purposes
          const mockProductionData: Partial<ProductionData>[] = Array(3).fill(0).map((_, index) => ({
            id: `harvest-${index}-${Date.now()}`,
            containerId: selectedContainer,
            containerName: containers.find(c => c.id === selectedContainer)?.name || "",
            productId: products[index % products.length]?.id || "",
            productName: products[index % products.length]?.name || "Unknown Product",
            productCategory: activeTab,
            quantity: 50 + Math.floor(Math.random() * 100),
            unit: products[index % products.length]?.unit || "kg",
            harvestDate: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
            salesAmount: 500000 + Math.floor(Math.random() * 1000000),
            soldQuantity: 40 + Math.floor(Math.random() * 50),
            remainingQuantity: 10 + Math.floor(Math.random() * 20),
            wastage: Math.floor(Math.random() * 10),
            notes: ""
          }));
          
          setProductionData(mockProductionData);
          setLoading(false);
          return;
        }
        
        if (data) {
          // Transform data to match the ProductionData interface
          const transformedData = data.map(item => ({
            id: item.id,
            containerId: item.container_id,
            containerName: item.container_name,
            productId: item.product_id,
            productName: item.product_name,
            productCategory: item.product_category,
            quantity: item.quantity,
            unit: item.unit,
            harvestDate: item.harvest_date,
            salesAmount: item.sales_amount,
            soldQuantity: item.sold_quantity,
            remainingQuantity: item.remaining_quantity,
            wastage: item.wastage,
            notes: item.notes
          }));
          
          setProductionData(transformedData);
        }
      } catch (error) {
        console.error("Error in production data fetch:", error);
        toast({
          title: "Error fetching production data",
          description: "Please try again or check your connection.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductionData();
  }, [selectedContainer, dateRange, activeTab, containers, products, toast]);
  
  const handleAddProductionRecord = () => {
    if (products.length === 0) {
      toast({
        title: "No products available",
        description: `Please add ${activeTab} products first.`,
        variant: "destructive",
      });
      return;
    }
    
    const newRecord: Partial<ProductionData> = {
      id: `harvest-${Date.now()}`,
      containerId: selectedContainer,
      containerName: containers.find(c => c.id === selectedContainer)?.name || "",
      productId: products[0].id,
      productName: products[0].name,
      productCategory: activeTab,
      quantity: 0,
      unit: products[0].unit,
      harvestDate: new Date().toISOString(),
      salesAmount: 0,
      soldQuantity: 0,
      remainingQuantity: 0,
      wastage: 0,
      notes: ""
    };
    
    setProductionData([...productionData, newRecord]);
  };
  
  const handleRemoveProductionRecord = (id: string) => {
    setProductionData(productionData.filter(record => record.id !== id));
  };
  
  const handleUpdateProductionRecord = (id: string, field: keyof ProductionData, value: any) => {
    setProductionData(productionData.map(record => {
      if (record.id === id) {
        const updatedRecord = { ...record, [field]: value };
        
        // If updating product, also update unit
        if (field === 'productId') {
          const selectedProduct = products.find(p => p.id === value);
          if (selectedProduct) {
            updatedRecord.productName = selectedProduct.name;
            updatedRecord.unit = selectedProduct.unit;
          }
        }
        
        // If updating quantity or product, recalculate remaining
        if (field === 'quantity' || field === 'soldQuantity' || field === 'wastage') {
          const quantity = typeof updatedRecord.quantity === 'number' ? updatedRecord.quantity : 0;
          const sold = typeof updatedRecord.soldQuantity === 'number' ? updatedRecord.soldQuantity : 0;
          const wastage = typeof updatedRecord.wastage === 'number' ? updatedRecord.wastage : 0;
          
          updatedRecord.remainingQuantity = Math.max(0, quantity - sold - wastage);
        }
        
        return updatedRecord;
      }
      return record;
    }));
  };
  
  const handleSaveAllData = async () => {
    setLoading(true);
    
    try {
      // Transform data back to database format
      const transformedData = productionData.map(item => ({
        id: item.id,
        container_id: item.containerId,
        container_name: item.containerName,
        product_id: item.productId,
        product_name: item.productName,
        product_category: item.productCategory,
        quantity: item.quantity,
        unit: item.unit,
        harvest_date: item.harvestDate,
        sales_amount: item.salesAmount,
        sold_quantity: item.soldQuantity,
        remaining_quantity: item.remainingQuantity,
        wastage: item.wastage,
        notes: item.notes
      }));
      
      // Use upsert to handle both insert and update
      const { error } = await supabase
        .from('production_data')
        .upsert(transformedData);
        
      if (error) throw error;
      
      toast({
        title: "Production data saved",
        description: "All production data has been successfully saved to the database.",
      });
    } catch (error) {
      console.error("Error saving production data:", error);
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
        <CardTitle className="text-xl">Production & Sales Data</CardTitle>
        <CardDescription>
          Track harvests and sales performance for all containers by product type.
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
          
          <div className="w-full md:w-2/3 flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-1/2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange.start && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.start ? format(new Date(dateRange.start), "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateRange.start ? new Date(dateRange.start) : undefined}
                    onSelect={(date) => setDateRange({ ...dateRange, start: date?.toISOString() || dateRange.start })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="w-full md:w-1/2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange.end && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.end ? format(new Date(dateRange.end), "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateRange.end ? new Date(dateRange.end) : undefined}
                    onSelect={(date) => setDateRange({ ...dateRange, end: date?.toISOString() || dateRange.end })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="vegetable" className="flex items-center gap-1">
              <Leaf className="h-4 w-4" />
              Vegetables
            </TabsTrigger>
            <TabsTrigger value="fruit" className="flex items-center gap-1">
              <ChartBar className="h-4 w-4" />
              Fruits
            </TabsTrigger>
            <TabsTrigger value="herb" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Herbs
            </TabsTrigger>
          </TabsList>
          
          {['vegetable', 'fruit', 'herb'].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  {productionData.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No production data available for this selection. Add a new record to get started.
                    </div>
                  ) : (
                    productionData.map((record, index) => (
                      <Card key={record.id} className="border-dashed">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">Harvest Record {index + 1}</CardTitle>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleRemoveProductionRecord(record.id!)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`product-${record.id}`}>Product</Label>
                              <Select 
                                value={record.productId} 
                                onValueChange={(value) => handleUpdateProductionRecord(record.id!, 'productId', value)}
                              >
                                <SelectTrigger id={`product-${record.id}`}>
                                  <SelectValue placeholder="Select product" />
                                </SelectTrigger>
                                <SelectContent>
                                  {products.map(product => (
                                    <SelectItem key={product.id} value={product.id}>
                                      {product.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label htmlFor={`harvest-date-${record.id}`}>Harvest Date</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    id={`harvest-date-${record.id}`}
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !record.harvestDate && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {record.harvestDate ? (
                                      format(new Date(record.harvestDate), "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={record.harvestDate ? new Date(record.harvestDate) : undefined}
                                    onSelect={(date) => handleUpdateProductionRecord(
                                      record.id!, 
                                      'harvestDate', 
                                      date?.toISOString()
                                    )}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <Label htmlFor={`quantity-${record.id}`}>Total Harvested</Label>
                              <div className="flex items-center mt-1">
                                <Input 
                                  id={`quantity-${record.id}`}
                                  type="number"
                                  value={record.quantity || 0}
                                  onChange={(e) => handleUpdateProductionRecord(
                                    record.id!, 
                                    'quantity', 
                                    parseInt(e.target.value)
                                  )}
                                  className="rounded-r-none"
                                />
                                <div className="bg-muted px-3 py-2 border border-l-0 border-input rounded-r-md">
                                  {record.unit}
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor={`sold-${record.id}`}>Sold</Label>
                              <div className="flex items-center mt-1">
                                <Input 
                                  id={`sold-${record.id}`}
                                  type="number"
                                  value={record.soldQuantity || 0}
                                  onChange={(e) => handleUpdateProductionRecord(
                                    record.id!, 
                                    'soldQuantity', 
                                    parseInt(e.target.value)
                                  )}
                                  className="rounded-r-none"
                                />
                                <div className="bg-muted px-3 py-2 border border-l-0 border-input rounded-r-md">
                                  {record.unit}
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor={`wastage-${record.id}`}>Wastage</Label>
                              <div className="flex items-center mt-1">
                                <Input 
                                  id={`wastage-${record.id}`}
                                  type="number"
                                  value={record.wastage || 0}
                                  onChange={(e) => handleUpdateProductionRecord(
                                    record.id!, 
                                    'wastage', 
                                    parseInt(e.target.value)
                                  )}
                                  className="rounded-r-none"
                                />
                                <div className="bg-muted px-3 py-2 border border-l-0 border-input rounded-r-md">
                                  {record.unit}
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor={`remaining-${record.id}`}>Remaining</Label>
                              <div className="flex items-center mt-1">
                                <Input 
                                  id={`remaining-${record.id}`}
                                  type="number"
                                  value={record.remainingQuantity || 0}
                                  readOnly
                                  className="bg-muted rounded-r-none"
                                />
                                <div className="bg-muted px-3 py-2 border border-l-0 border-input rounded-r-md">
                                  {record.unit}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`sales-${record.id}`}>Sales Amount (IDR)</Label>
                              <Input 
                                id={`sales-${record.id}`}
                                type="number"
                                value={record.salesAmount || 0}
                                onChange={(e) => handleUpdateProductionRecord(
                                  record.id!, 
                                  'salesAmount', 
                                  parseInt(e.target.value)
                                )}
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`notes-${record.id}`}>Notes</Label>
                              <Input 
                                id={`notes-${record.id}`}
                                value={record.notes || ''}
                                onChange={(e) => handleUpdateProductionRecord(
                                  record.id!, 
                                  'notes', 
                                  e.target.value
                                )}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                  
                  <div className="flex justify-center">
                    <Button onClick={handleAddProductionRecord} variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Record
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Total Records: {productionData.length}
        </div>
        <Button onClick={handleSaveAllData} disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          Save All Data
        </Button>
      </CardFooter>
    </Card>
  );
};
