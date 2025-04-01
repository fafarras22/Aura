
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  CircleDashed, 
  FileText, 
  Globe, 
  Link, 
  RefreshCw, 
  Save, 
  Settings, 
  Unlink, 
  ZapOff 
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Integration types for typesafety
type IntegrationType = 'api' | 'webhook' | 'zapier' | 'weather' | 'erp' | 'payment' | 'shipping';

interface Integration {
  id: string;
  name: string;
  type: IntegrationType;
  endpoint: string;
  apiKey?: string;
  active: boolean;
  lastSynced?: string;
  description: string;
  settings?: Record<string, any>;
}

export const IntegrationsPanel = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  
  // Example integrations data
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "1",
      name: "Weather API",
      type: "weather",
      endpoint: "https://api.weatherapi.com/v1",
      apiKey: "••••••••••••••••",
      active: true,
      lastSynced: new Date().toISOString(),
      description: "Integration with Weather API for climate predictions and planning."
    },
    {
      id: "2",
      name: "ERP System",
      type: "erp",
      endpoint: "https://erp.akarsystem.com/api",
      apiKey: "••••••••••••••••",
      active: true,
      lastSynced: new Date().toISOString(),
      description: "Integration with company ERP system for inventory and resource management."
    },
    {
      id: "3",
      name: "Payment Gateway",
      type: "payment",
      endpoint: "https://payment.example.com/api/v2",
      apiKey: "••••••••••••••••",
      active: true,
      lastSynced: new Date().toISOString(),
      description: "Payment processing integration for customer billing."
    },
    {
      id: "4",
      name: "Shipping Partner API",
      type: "shipping",
      endpoint: "https://shipping.partner.com/api",
      apiKey: "••••••••••••••••",
      active: false,
      lastSynced: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
      description: "Integration with shipping partner for delivery management."
    },
    {
      id: "5",
      name: "Sales Data Webhook",
      type: "webhook",
      endpoint: "https://hooks.example.com/sales",
      active: true,
      lastSynced: new Date().toISOString(),
      description: "Webhook for sending sales data to external systems."
    }
  ]);
  
  // Handle toggling integration active status
  const handleToggleActive = (id: string) => {
    const updatedIntegrations = integrations.map(integration => {
      if (integration.id === id) {
        return { ...integration, active: !integration.active };
      }
      return integration;
    });
    
    setIntegrations(updatedIntegrations);
    
    toast({
      title: "Integration updated",
      description: `Integration ${updatedIntegrations.find(i => i.id === id)?.active ? 'activated' : 'deactivated'}.`,
    });
  };
  
  // Handle deleting an integration
  const handleDeleteIntegration = (id: string) => {
    if (!confirm("Are you sure you want to delete this integration? This action cannot be undone.")) {
      return;
    }
    
    const updatedIntegrations = integrations.filter(integration => integration.id !== id);
    setIntegrations(updatedIntegrations);
    
    toast({
      title: "Integration deleted",
      description: "The integration has been removed.",
    });
  };
  
  // Handle editing an integration
  const handleEditIntegration = (integration: Integration) => {
    setSelectedIntegration(integration);
  };
  
  // Handle saving integration changes
  const handleSaveIntegration = () => {
    if (!selectedIntegration) return;
    
    const updatedIntegrations = integrations.map(integration => {
      if (integration.id === selectedIntegration.id) {
        return selectedIntegration;
      }
      return integration;
    });
    
    setIntegrations(updatedIntegrations);
    setSelectedIntegration(null);
    
    toast({
      title: "Integration updated",
      description: "Your changes have been saved.",
    });
  };
  
  // Handle creating a new integration
  const handleAddNewIntegration = () => {
    const newIntegration: Integration = {
      id: Math.random().toString(36).substring(2, 9),
      name: "New Integration",
      type: "api",
      endpoint: "",
      active: false,
      description: "Description of the new integration."
    };
    
    setSelectedIntegration(newIntegration);
  };
  
  // Handle testing an integration
  const handleTestIntegration = (id: string) => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Integration test successful",
        description: "The connection was established successfully.",
      });
    }, 1500);
  };
  
  // Get icon based on integration type
  const getIntegrationIcon = (type: IntegrationType) => {
    switch (type) {
      case 'api': return <Globe className="h-5 w-5" />;
      case 'webhook': return <Link className="h-5 w-5" />;
      case 'zapier': return <ArrowRight className="h-5 w-5" />;
      case 'weather': return <Cloud className="h-5 w-5" />;
      case 'erp': return <Settings className="h-5 w-5" />;
      case 'payment': return <CreditCard className="h-5 w-5" />;
      case 'shipping': return <Truck className="h-5 w-5" />;
      default: return <Globe className="h-5 w-5" />;
    }
  };
  
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    return format(new Date(dateString), "PPP 'at' p");
  };
  
  // Placeholder components for missing icons
  const Cloud = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
  
  const CreditCard = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
  
  const Truck = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 17h4V5H2v12h3" />
      <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1" />
      <circle cx="7.5" cy="17.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
  
  return (
    <>
      {selectedIntegration ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setSelectedIntegration(null)}
                  className="mr-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-xl">
                  {integrations.some(i => i.id === selectedIntegration.id) 
                    ? `Edit Integration: ${selectedIntegration.name}` 
                    : "Add New Integration"}
                </CardTitle>
              </div>
            </div>
            <CardDescription>
              Configure the connection details for this integration.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="integration-name">Integration Name</Label>
                <Input 
                  id="integration-name" 
                  value={selectedIntegration.name}
                  onChange={(e) => setSelectedIntegration({...selectedIntegration, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="integration-type">Integration Type</Label>
                <select 
                  id="integration-type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedIntegration.type}
                  onChange={(e) => setSelectedIntegration({...selectedIntegration, type: e.target.value as IntegrationType})}
                >
                  <option value="api">REST API</option>
                  <option value="webhook">Webhook</option>
                  <option value="zapier">Zapier</option>
                  <option value="weather">Weather Service</option>
                  <option value="erp">ERP System</option>
                  <option value="payment">Payment Gateway</option>
                  <option value="shipping">Shipping Service</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="integration-endpoint">Endpoint URL</Label>
              <Input 
                id="integration-endpoint" 
                value={selectedIntegration.endpoint}
                onChange={(e) => setSelectedIntegration({...selectedIntegration, endpoint: e.target.value})}
                placeholder="https://api.example.com/v1"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="integration-api-key">API Key / Secret</Label>
              <Input 
                id="integration-api-key" 
                type="password"
                value={selectedIntegration.apiKey || ""}
                onChange={(e) => setSelectedIntegration({...selectedIntegration, apiKey: e.target.value})}
                placeholder="Enter API key or leave blank if not required"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="integration-description">Description</Label>
              <Textarea 
                id="integration-description" 
                value={selectedIntegration.description}
                onChange={(e) => setSelectedIntegration({...selectedIntegration, description: e.target.value})}
                placeholder="Describe what this integration does"
                rows={3}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="integration-active">Active Status</Label>
                <div className="text-sm text-muted-foreground">
                  Enable or disable this integration
                </div>
              </div>
              <Switch 
                id="integration-active" 
                checked={selectedIntegration.active}
                onCheckedChange={(checked) => setSelectedIntegration({...selectedIntegration, active: checked})}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setSelectedIntegration(null)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveIntegration}>
              <Save className="mr-2 h-4 w-4" />
              Save Integration
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Third-Party Integrations</CardTitle>
              <Button onClick={handleAddNewIntegration}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Integration
              </Button>
            </div>
            <CardDescription>
              Manage connections to external services and APIs for data exchange.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {integrations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No integrations configured. Click "Add New Integration" to get started.
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {integrations.map((integration) => (
                  <AccordionItem key={integration.id} value={integration.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${integration.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {getIntegrationIcon(integration.type)}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{integration.name}</div>
                          <div className="text-sm text-muted-foreground">{integration.endpoint}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mr-4">
                        {integration.active ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                            Inactive
                          </Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2 pb-2 px-4">
                        <div className="text-sm">{integration.description}</div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Type:</span>{" "}
                            <span className="font-medium capitalize">{integration.type}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Last Synced:</span>{" "}
                            <span className="font-medium">{formatDate(integration.lastSynced)}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Switch 
                            id={`toggle-${integration.id}`}
                            checked={integration.active}
                            onCheckedChange={() => handleToggleActive(integration.id)}
                          />
                          <Label 
                            htmlFor={`toggle-${integration.id}`}
                            className="mr-4"
                          >
                            {integration.active ? "Active" : "Inactive"}
                          </Label>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleTestIntegration(integration.id)}
                            disabled={loading}
                          >
                            {loading ? <CircleDashed className="mr-2 h-3 w-3 animate-spin" /> : <CheckCircle className="mr-2 h-3 w-3" />}
                            Test Connection
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditIntegration(integration)}
                          >
                            <FileText className="mr-2 h-3 w-3" />
                            Edit Configuration
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteIntegration(integration.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Unlink className="mr-2 h-3 w-3" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              {integrations.filter(i => i.active).length} of {integrations.length} integrations active
            </div>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync All
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};
