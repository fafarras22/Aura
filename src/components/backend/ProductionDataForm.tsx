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

// Define types for products and production data
type ProductCategory = 'vegetable' | 'fruit' | 'herb';

interface ProductType {
  id: string;
  name: string;
  category: ProductCategory;
  unit: string;
  averagePrice: number;
}

interface ProductionData {
  id: string;
  containerId: string;
  containerName: string;
  productId: string;
  productName: string;
  productCategory: ProductCategory;
  quantity: number;
  unit: string;
  dateProduced: string;
  salePrice: number;
  totalValue: number;
  status: string;
  notes?: string;
}

export const ProductionDataForm = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productionData, setProductionData] = useState<ProductionData[]>([]);
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
  
  // Load products and production data for selected container
  useEffect(() => {
    if (!selectedContainer) return;
    
    const fetchProductsAndProductionData = async () => {
      setLoading(true);
      
      try {
        // Fetch products
        // In a real application, you might fetch products from a dedicated table
        // Here, we use mock data for simplicity
        
        // Fetch production data
        const { data: productionDataData, error: productionDataError } = await supabase
          .from('production_data')
          .select('*')
          .eq('container_id', selectedContainer);
          
        if (productionDataError) throw productionDataError;
        
        // Set the fetched data
        setProductionData(productionDataData || []);
        setProducts(mockProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error fetching data",
          description: "Please try again or check your connection.",
          variant: "destructive",
        });
        
        // Use mock data as fallback
        setProducts(mockProducts);
        setProductionData(mockProductionData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductsAndProductionData();
  }, [selectedContainer, toast]);
  
  // Add new production record
  const handleAddProductionRecord = () => {
    const newProductionRecord: ProductionData = {
      id: Math.random().toString(36).substr(2, 9),
      containerId: selectedContainer,
      containerName: containers.find(c => c.id === selectedContainer)?.name || "",
      productId: products[0]?.id || "",
      productName: products[0]?.name || "",
      productCategory: products[0]?.category || "vegetable",
      quantity: 0,
      unit: products[0]?.unit || "kg",
      dateProduced: new Date().toISOString().slice(0, 10),
      salePrice: 0,
      totalValue: 0,
      status: "produced",
      notes: ""
    };
    
    setProductionData([...productionData, newProductionRecord]);
  };
  
  // Remove production record
  const handleRemoveProductionRecord = (id: string) => {
    setProductionData(productionData.filter(record => record.id !== id));
  };
  
  // Update production record
  const handleUpdateProductionRecord = (id: string, field: keyof ProductionData, value: any) => {
    setProductionData(productionData.map(record => {
      if (record.id === id) {
        return { ...record, [field]: value };
      }
      return record;
    }));
  };
  
  // Save all data
  const handleSaveAllData = async () => {
    setLoading(true);
    
    try {
      // Transform data back to database format
      const transformedData = productionData.map(item => ({
        id: item.id,
        container_id: selectedContainer,
        container_name: item.containerName,
        product_id: item.productId,
        product_name: item.productName,
        product_category: item.productCategory,
        quantity: item.quantity,
        unit: item.unit,
        date_produced: item.dateProduced,
        sale_price: item.salePrice,
        total_value: item.totalValue,
        status: item.status,
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
  
  // Import CSV
  const handleImportCSV = () => {
    // Placeholder for CSV import functionality
    toast({
      title: "Import functionality",
      description: "CSV import functionality would be implemented here.",
    });
  };
  
  // Export CSV
  const handleExportCSV = () => {
    // Placeholder for CSV export functionality
    toast({
      title: "Export functionality",
      description: "CSV export functionality would be implemented here.",
    });
  };

  // Fix the product mock data to use the correct category literals
  const mockProducts: ProductType[] = [
    { id: '1', name: 'Spinach', category: 'vegetable', unit: 'kg', averagePrice: 20000 },
    { id: '2', name: 'Kale', category: 'vegetable', unit: 'kg', averagePrice: 25000 },
    { id: '3', name: 'Tomato', category: 'vegetable', unit: 'kg', averagePrice: 15000 },
    { id: '4', name: 'Strawberry', category: 'fruit', unit: 'kg', averagePrice: 60000 },
    { id: '5', name: 'Blueberry', category: 'fruit', unit: 'kg', averagePrice: 120000 },
    { id: '6', name: 'Basil', category: 'herb', unit: 'kg', averagePrice: 40000 },
    { id: '7', name: 'Mint', category: 'herb', unit: 'kg', averagePrice: 35000 },
  ];

  // Fix the production data mock to use the correct productCategory literals
  const mockProductionData: ProductionData[] = [
    {
      id: '1',
      containerId: 'container-1',
      containerName: 'Pluit Village Mall',
      productId: '1',
      productName: 'Spinach',
      productCategory: 'vegetable',
      quantity: 120,
      unit: 'kg',
      dateProduced: '2023-11-15',
      salePrice: 22000,
      totalValue: 2640000,
      status: 'sold',
      notes: 'High quality produce, all sold to local supermarkets.'
    },
    {
      id: '2',
      containerId: 'container-1', 
      containerName: 'Pluit Village Mall',
      productId: '4',
      productName: 'Strawberry',
      productCategory: 'fruit',
      quantity: 85,
      unit: 'kg',
      dateProduced: '2023-11-16',
      salePrice: 65000,
      totalValue: 5525000,
      status: 'sold',
      notes: 'Premium quality, sold at 8% above market price.'
    },
    {
      id: '3',
      containerId: 'container-2',
      containerName: 'Green Garden Residence',
      productId: '6',
      productName: 'Basil',
      productCategory: 'herb',
      quantity: 45,
      unit: 'kg',
      dateProduced: '2023-11-14',
      salePrice: 42000,
      totalValue: 1890000,
      status: 'sold',
      notes: 'Organic certified, high demand.'
    }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Production Data Management</CardTitle>
        <CardDescription>
          Manage production data for all containers.
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
            {productionData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No production data available for this container. Add a new record to get started.
              </div>
            ) : (
              productionData.map((record) => (
                <Card key={record.id} className="border-dashed">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Production Record</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveProductionRecord(record.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`product-name-${record.id}`}>Product Name</Label>
                        <Select
                          value={record.productId}
                          onValueChange={(value) => {
                            const selectedProduct = products.find(p => p.id === value);
                            if (selectedProduct) {
                              handleUpdateProductionRecord(record.id, 'productId', value);
                              handleUpdateProductionRecord(record.id, 'productName', selectedProduct.name);
                              handleUpdateProductionRecord(record.id, 'productCategory', selectedProduct.category);
                              handleUpdateProductionRecord(record.id, 'unit', selectedProduct.unit);
                            }
                          }}
                        >
                          <SelectTrigger id={`product-name-${record.id}`}>
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map(product => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name} ({product.category})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor={`date-produced-${record.id}`}>Date Produced</Label>
                        <Input 
                          id={`date-produced-${record.id}`}
                          type="date"
                          value={record.dateProduced}
                          onChange={(e) => handleUpdateProductionRecord(record.id, 'dateProduced', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`quantity-${record.id}`}>Quantity</Label>
                        <Input 
                          id={`quantity-${record.id}`}
                          type="number"
                          value={record.quantity}
                          onChange={(e) => handleUpdateProductionRecord(record.id, 'quantity', parseInt(e.target.value))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`sale-price-${record.id}`}>Sale Price (IDR)</Label>
                        <Input 
                          id={`sale-price-${record.id}`}
                          type="number"
                          value={record.salePrice}
                          onChange={(e) => {
                            const newSalePrice = parseInt(e.target.value);
                            handleUpdateProductionRecord(record.id, 'salePrice', newSalePrice);
                            handleUpdateProductionRecord(record.id, 'totalValue', newSalePrice * record.quantity);
                          }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor={`notes-${record.id}`}>Notes</Label>
                      <Input 
                        id={`notes-${record.id}`}
                        type="text"
                        value={record.notes || ""}
                        onChange={(e) => handleUpdateProductionRecord(record.id, 'notes', e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
            
            <div className="flex justify-center">
              <Button onClick={handleAddProductionRecord} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add New Production Record
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
