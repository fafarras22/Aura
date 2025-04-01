
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { useAuth } from "@/context/auth";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Lock, Database, BarChart2, Users, Settings, FileText, RefreshCw } from "lucide-react";
import { BackendHeader } from "@/components/backend/BackendHeader";
import { SalesDataForm } from "@/components/backend/SalesDataForm";
import { ContainerDataForm } from "@/components/backend/ContainerDataForm";
import { ProjectionsForm } from "@/components/backend/ProjectionsForm";
import { UserManagementPanel } from "@/components/backend/UserManagementPanel";
import { SystemSettingsForm } from "@/components/backend/SystemSettingsForm";
import { IntegrationsPanel } from "@/components/backend/IntegrationsPanel";

const BackendDashboard = () => {
  const { isDeveloperMode, currentUser } = useDeveloperMode();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("sales");
  
  // Check if user has admin privileges
  const isAdmin = isDeveloperMode || (currentUser?.role === 'admin');
  
  useEffect(() => {
    // Redirect non-admin users away from this page
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You need administrator privileges to access this page.",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [isAdmin, navigate, toast]);
  
  // If not logged in or not admin, show access denied
  if (!user || !isAdmin) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Lock className="mr-2 h-5 w-5 text-red-500" />
              Access Restricted
            </CardTitle>
            <CardDescription>
              Administrator privileges required
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>You need administrator privileges to access the backend dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container max-w-7xl mx-auto px-4 py-6">
      <BackendHeader />
      
      <div className="mt-6">
        <Badge variant="secondary" className="mb-6">
          Admin Backend
        </Badge>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
            <TabsTrigger value="sales" className="flex items-center">
              <BarChart2 className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Sales Data</span>
              <span className="md:hidden">Sales</span>
            </TabsTrigger>
            <TabsTrigger value="containers">
              <Database className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Containers</span>
              <span className="md:hidden">Cont.</span>
            </TabsTrigger>
            <TabsTrigger value="projections">
              <RefreshCw className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Projections</span>
              <span className="md:hidden">Proj.</span>
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">User Management</span>
              <span className="md:hidden">Users</span>
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">System Settings</span>
              <span className="md:hidden">Settings</span>
            </TabsTrigger>
            <TabsTrigger value="integrations">
              <FileText className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Integrations</span>
              <span className="md:hidden">API</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="space-y-4">
            <SalesDataForm />
          </TabsContent>
          
          <TabsContent value="containers" className="space-y-4">
            <ContainerDataForm />
          </TabsContent>
          
          <TabsContent value="projections" className="space-y-4">
            <ProjectionsForm />
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <UserManagementPanel />
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <SystemSettingsForm />
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-4">
            <IntegrationsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BackendDashboard;
