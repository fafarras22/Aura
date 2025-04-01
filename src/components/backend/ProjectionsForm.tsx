
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { BarChart2, CandlestickChart, Check, LineChart, RefreshCw, Save, Sliders } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ProjectionsForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [projectionType, setProjectionType] = useState("yield");
  const [timeframe, setTimeframe] = useState("6months");
  
  // Yield projection data
  const [yieldData, setYieldData] = useState({
    currentYield: 520,
    growthRate: 5,
    seasonalAdjustment: 10,
    marketDemandImpact: 15,
    weatherRiskFactor: 5,
    projectedYields: {
      "3months": 0,
      "6months": 0,
      "1year": 0
    }
  });
  
  // Revenue projection data
  const [revenueData, setRevenueData] = useState({
    currentMonthlyRevenue: 15000000,
    growthRate: 8,
    marketExpansion: 10,
    priceAdjustment: 3,
    operationalEfficiency: 5,
    projectedRevenues: {
      "3months": 0,
      "6months": 0,
      "1year": 0
    }
  });
  
  // Cost projection data
  const [costData, setCostData] = useState({
    currentMonthlyCost: 9000000,
    inflationRate: 3,
    laborCostAdjustment: 5,
    resourceOptimization: -8,
    energyEfficiency: -5,
    projectedCosts: {
      "3months": 0,
      "6months": 0,
      "1year": 0
    }
  });
  
  // Calculate projections when values change
  useEffect(() => {
    // Calculate yield projections
    const calculateYieldProjections = () => {
      const baseYield = yieldData.currentYield;
      const monthlyGrowth = yieldData.growthRate / 100;
      const seasonalFactor = 1 + (yieldData.seasonalAdjustment / 100);
      const marketFactor = 1 + (yieldData.marketDemandImpact / 100);
      const riskFactor = 1 - (yieldData.weatherRiskFactor / 100);
      
      const threeMonthProjection = baseYield * Math.pow(1 + monthlyGrowth, 3) * seasonalFactor * marketFactor * riskFactor;
      const sixMonthProjection = baseYield * Math.pow(1 + monthlyGrowth, 6) * seasonalFactor * marketFactor * riskFactor;
      const yearProjection = baseYield * Math.pow(1 + monthlyGrowth, 12) * seasonalFactor * marketFactor * riskFactor;
      
      setYieldData(prev => ({
        ...prev,
        projectedYields: {
          "3months": Math.round(threeMonthProjection),
          "6months": Math.round(sixMonthProjection),
          "1year": Math.round(yearProjection)
        }
      }));
    };
    
    // Calculate revenue projections
    const calculateRevenueProjections = () => {
      const baseRevenue = revenueData.currentMonthlyRevenue;
      const monthlyGrowth = revenueData.growthRate / 100;
      const expansionFactor = 1 + (revenueData.marketExpansion / 100);
      const priceFactor = 1 + (revenueData.priceAdjustment / 100);
      const efficiencyFactor = 1 + (revenueData.operationalEfficiency / 100);
      
      const threeMonthProjection = baseRevenue * Math.pow(1 + monthlyGrowth, 3) * expansionFactor * priceFactor * efficiencyFactor;
      const sixMonthProjection = baseRevenue * Math.pow(1 + monthlyGrowth, 6) * expansionFactor * priceFactor * efficiencyFactor;
      const yearProjection = baseRevenue * Math.pow(1 + monthlyGrowth, 12) * expansionFactor * priceFactor * efficiencyFactor;
      
      setRevenueData(prev => ({
        ...prev,
        projectedRevenues: {
          "3months": Math.round(threeMonthProjection),
          "6months": Math.round(sixMonthProjection),
          "1year": Math.round(yearProjection)
        }
      }));
    };
    
    // Calculate cost projections
    const calculateCostProjections = () => {
      const baseCost = costData.currentMonthlyCost;
      const inflationImpact = costData.inflationRate / 100;
      const laborFactor = 1 + (costData.laborCostAdjustment / 100);
      const optimizationFactor = 1 + (costData.resourceOptimization / 100);
      const energyFactor = 1 + (costData.energyEfficiency / 100);
      
      const threeMonthProjection = baseCost * Math.pow(1 + inflationImpact, 3) * laborFactor * optimizationFactor * energyFactor;
      const sixMonthProjection = baseCost * Math.pow(1 + inflationImpact, 6) * laborFactor * optimizationFactor * energyFactor;
      const yearProjection = baseCost * Math.pow(1 + inflationImpact, 12) * laborFactor * optimizationFactor * energyFactor;
      
      setCostData(prev => ({
        ...prev,
        projectedCosts: {
          "3months": Math.round(threeMonthProjection),
          "6months": Math.round(sixMonthProjection),
          "1year": Math.round(yearProjection)
        }
      }));
    };
    
    calculateYieldProjections();
    calculateRevenueProjections();
    calculateCostProjections();
  }, [yieldData.currentYield, yieldData.growthRate, yieldData.seasonalAdjustment, yieldData.marketDemandImpact, yieldData.weatherRiskFactor,
      revenueData.currentMonthlyRevenue, revenueData.growthRate, revenueData.marketExpansion, revenueData.priceAdjustment, revenueData.operationalEfficiency,
      costData.currentMonthlyCost, costData.inflationRate, costData.laborCostAdjustment, costData.resourceOptimization, costData.energyEfficiency]);
  
  const handleSaveProjections = async () => {
    setLoading(true);
    
    try {
      // Prepare data for saving
      const projectionData = {
        yield_projections: yieldData,
        revenue_projections: revenueData,
        cost_projections: costData,
        last_updated: new Date().toISOString()
      };
      
      // Save to Supabase
      const { error } = await supabase
        .from('projections')
        .upsert({ id: 1, ...projectionData });
        
      if (error) throw error;
      
      toast({
        title: "Projections saved",
        description: "All projection data has been successfully saved to the database.",
      });
    } catch (error) {
      console.error("Error saving projections:", error);
      toast({
        title: "Error saving data",
        description: "Please try again or check your connection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleRecalculate = () => {
    toast({
      title: "Projections recalculated",
      description: "Projections have been recalculated with the latest data.",
    });
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Projections Management</CardTitle>
        <CardDescription>
          Manage yield, revenue, and cost projections for the farm. These projections will be used throughout the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4 justify-between">
          <Tabs value={projectionType} onValueChange={setProjectionType} className="w-full">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="yield">
                <BarChart2 className="mr-2 h-4 w-4" />
                Yield Projections
              </TabsTrigger>
              <TabsTrigger value="revenue">
                <LineChart className="mr-2 h-4 w-4" />
                Revenue Projections
              </TabsTrigger>
              <TabsTrigger value="cost">
                <CandlestickChart className="mr-2 h-4 w-4" />
                Cost Projections
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex justify-end">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Separator />
        
        {/* Yield Projections Content */}
        {projectionType === "yield" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Current Monthly Yield (kg)</Label>
                <Input 
                  type="number" 
                  value={yieldData.currentYield}
                  onChange={(e) => setYieldData({...yieldData, currentYield: parseInt(e.target.value)})}
                />
              </div>
              
              <div>
                <Label>Monthly Growth Rate (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    value={[yieldData.growthRate]} 
                    min={0} 
                    max={20} 
                    step={0.5}
                    onValueChange={(value) => setYieldData({...yieldData, growthRate: value[0]})}
                    className="flex-1"
                  />
                  <span className="min-w-14 text-right">{yieldData.growthRate}%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Seasonal Adjustment Impact (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    value={[yieldData.seasonalAdjustment]} 
                    min={-20} 
                    max={20} 
                    step={1}
                    onValueChange={(value) => setYieldData({...yieldData, seasonalAdjustment: value[0]})}
                    className="flex-1"
                  />
                  <span className="min-w-14 text-right">{yieldData.seasonalAdjustment}%</span>
                </div>
              </div>
              
              <div>
                <Label>Market Demand Impact (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    value={[yieldData.marketDemandImpact]} 
                    min={-20} 
                    max={30} 
                    step={1}
                    onValueChange={(value) => setYieldData({...yieldData, marketDemandImpact: value[0]})}
                    className="flex-1"
                  />
                  <span className="min-w-14 text-right">{yieldData.marketDemandImpact}%</span>
                </div>
              </div>
              
              <div>
                <Label>Weather/Environmental Risk Factor (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    value={[yieldData.weatherRiskFactor]} 
                    min={0} 
                    max={25} 
                    step={1}
                    onValueChange={(value) => setYieldData({...yieldData, weatherRiskFactor: value[0]})}
                    className="flex-1"
                  />
                  <span className="min-w-14 text-right">{yieldData.weatherRiskFactor}%</span>
                </div>
              </div>
            </div>
            
            <Card className="bg-muted/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Projected Yields</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-background rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">3 Months</p>
                    <p className="text-2xl font-bold mt-1">{yieldData.projectedYields["3months"]} kg</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">6 Months</p>
                    <p className="text-2xl font-bold mt-1">{yieldData.projectedYields["6months"]} kg</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">1 Year</p>
                    <p className="text-2xl font-bold mt-1">{yieldData.projectedYields["1year"]} kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Revenue Projections Content */}
        {projectionType === "revenue" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Current Monthly Revenue (IDR)</Label>
                <Input 
                  type="number" 
                  value={revenueData.currentMonthlyRevenue}
                  onChange={(e) => setRevenueData({...revenueData, currentMonthlyRevenue: parseInt(e.target.value)})}
                />
              </div>
              
              <div>
                <Label>Monthly Growth Rate (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    value={[revenueData.growthRate]} 
                    min={0} 
                    max={20} 
                    step={0.5}
                    onValueChange={(value) => setRevenueData({...revenueData, growthRate: value[0]})}
                    className="flex-1"
                  />
                  <span className="min-w-14 text-right">{revenueData.growthRate}%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Market Expansion Impact (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    value={[revenueData.marketExpansion]} 
                    min={0} 
                    max={30} 
                    step={1}
                    onValueChange={(value) => setRevenueData({...revenueData, marketExpansion: value[0]})}
                    className="flex-1"
                  />
                  <span className="min-w-14 text-right">{revenueData.marketExpansion}%</span>
                </div>
              </div>
              
              <div>
                <Label>Price Adjustment (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    value={[revenueData.priceAdjustment]} 
                    min={-10} 
                    max={20} 
                    step={1}
                    onValueChange={(value) => setRevenueData({...revenueData, priceAdjustment: value[0]})}
                    className="flex-1"
                  />
                  <span className="min-w-14 text-right">{revenueData.priceAdjustment}%</span>
                </div>
              </div>
              
              <div>
                <Label>Operational Efficiency Gains (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    value={[revenueData.operationalEfficiency]} 
                    min={0} 
                    max={20} 
                    step={1}
                    onValueChange={(value) => setRevenueData({...revenueData, operationalEfficiency: value[0]})}
                    className="flex-1"
                  />
                  <span className="min-w-14 text-right">{revenueData.operationalEfficiency}%</span>
                </div>
              </div>
            </div>
            
            <Card className="bg-muted/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Projected Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-background rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">3 Months</p>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(revenueData.projectedRevenues["3months"])}</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">6 Months</p>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(revenueData.projectedRevenues["6months"])}</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">1 Year</p>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(revenueData.projectedRevenues["1year"])}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Cost Projections Content */}
        {projectionType === "cost" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Current Monthly Costs (IDR)</Label>
                <Input 
                  type="number" 
                  value={costData.currentMonthlyCost}
                  onChange={(e) => setCostData({...costData, currentMonthlyCost: parseInt(e.target.value)})}
                />
              </div>
              
              <div>
                <Label>Monthly Inflation Rate (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    value={[costData.inflationRate]} 
                    min={0} 
                    max={10} 
                    step={0.1}
                    onValueChange={(value) => setCostData({...costData, inflationRate: value[0]})}
                    className="flex-1"
                  />
                  <span className="min-w-14 text-right">{costData.inflationRate}%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Labor Cost Adjustment (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    value={[costData.laborCostAdjustment]} 
                    min={-10} 
                    max={20} 
                    step={1}
                    onValueChange={(value) => setCostData({...costData, laborCostAdjustment: value[0]})}
                    className="flex-1"
                  />
                  <span className="min-w-14 text-right">{costData.laborCostAdjustment}%</span>
                </div>
              </div>
              
              <div>
                <Label>Resource Optimization (-ve is savings) (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    value={[costData.resourceOptimization]} 
                    min={-20} 
                    max={10} 
                    step={1}
                    onValueChange={(value) => setCostData({...costData, resourceOptimization: value[0]})}
                    className="flex-1"
                  />
                  <span className="min-w-14 text-right">{costData.resourceOptimization}%</span>
                </div>
              </div>
              
              <div>
                <Label>Energy Efficiency Improvements (-ve is savings) (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    value={[costData.energyEfficiency]} 
                    min={-20} 
                    max={10} 
                    step={1}
                    onValueChange={(value) => setCostData({...costData, energyEfficiency: value[0]})}
                    className="flex-1"
                  />
                  <span className="min-w-14 text-right">{costData.energyEfficiency}%</span>
                </div>
              </div>
            </div>
            
            <Card className="bg-muted/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Projected Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-background rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">3 Months</p>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(costData.projectedCosts["3months"])}</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">6 Months</p>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(costData.projectedCosts["6months"])}</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">1 Year</p>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(costData.projectedCosts["1year"])}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleRecalculate}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Recalculate
        </Button>
        <Button onClick={handleSaveProjections} disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          Save Projections
        </Button>
      </CardFooter>
    </Card>
  );
};
