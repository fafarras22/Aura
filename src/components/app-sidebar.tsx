
import { 
  Leaf, 
  Droplet, 
  Thermometer, 
  Activity, 
  AlertTriangle, 
  Camera, 
  Calendar, 
  Settings, 
  Home, 
  BarChart2, 
  CircleDollarSign, 
  ChevronRight,
  MonitorSmartphone,
  Globe,
  ChevronDown,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarItem {
  title: string;
  path: string;
  icon: React.ElementType;
  adminOnly?: boolean;
  subItems?: SidebarSubItem[];
}

interface SidebarSubItem {
  title: string;
  path: string;
  icon: React.ElementType;
  adminOnly?: boolean;
}

export function AppSidebar({ isDeveloperMode = false }: { isDeveloperMode?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [akarLogo, setAkarLogo] = useState("/lovable-uploads/e60ccc9b-594d-461b-9ef9-2b157e19b0a1.png");
  const [openCategories, setOpenCategories] = useState<string[]>(['dashboard']);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSignOut = () => {
    // In a real app, this would include authentication logic
    navigate('/login');
  };

  const menuItems: SidebarItem[] = [
    { title: "Dashboard", path: "/dashboard", icon: Home },
    { 
      title: "Internal Environment", 
      path: "/internal-environment", 
      icon: MonitorSmartphone,
      subItems: [
        { title: "Sensors", path: "/sensors", icon: Activity },
        { title: "Water System", path: "/water", icon: Droplet },
        { title: "Climate", path: "/climate", icon: Thermometer },
      ]
    },
    { 
      title: "External Environment", 
      path: "/external-environment", 
      icon: Globe,
      subItems: [
        { title: "Alerts", path: "/alerts", icon: AlertTriangle },
        { title: "CCTV", path: "/cctv", icon: Camera },
        { title: "Calendar", path: "/calendar", icon: Calendar },
      ]
    },
    { title: "Tokenization", path: "/tokenization", icon: CircleDollarSign },
    { title: "Harvest", path: "/harvest", icon: Leaf },
    { title: "Analytics", path: "/analytics", icon: BarChart2, adminOnly: true },
    { title: "Settings", path: "/settings", icon: Settings, adminOnly: true },
  ];

  const filteredItems = isDeveloperMode 
    ? menuItems 
    : menuItems.filter(item => !item.adminOnly);

  const isActive = (path: string) => location.pathname === path;

  const isActiveGroup = (item: SidebarItem) => {
    if (isActive(item.path)) return true;
    if (item.subItems) {
      return item.subItems.some(subItem => isActive(subItem.path));
    }
    return false;
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center py-6 border-b">
        <div className="flex flex-col items-center space-y-2">
          <img
            src={akarLogo}
            alt="AKAR Logo"
            className="h-12"
            onError={() => setAkarLogo("/placeholder.svg")}
          />
          {isDeveloperMode && (
            <div className="px-2 py-1 text-xs bg-yellow-500 rounded-full text-black">
              Developer Mode
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible 
                      open={openCategories.includes(item.title.toLowerCase())} 
                      onOpenChange={() => toggleCategory(item.title.toLowerCase())}
                      className="w-full"
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                          className={`justify-between ${isActiveGroup(item) ? "bg-sidebar-accent" : ""}`}
                        >
                          <div className="flex items-center">
                            <item.icon className="w-5 h-5 mr-3" />
                            <span>{item.title}</span>
                          </div>
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform ${openCategories.includes(item.title.toLowerCase()) ? 'rotate-180' : ''}`} 
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                onClick={() => navigate(subItem.path)}
                                isActive={isActive(subItem.path)}
                                className="pl-9"
                              >
                                <subItem.icon className="w-4 h-4 mr-2" />
                                <span>{subItem.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton 
                      onClick={() => navigate(item.path)}
                      className={isActive(item.path) ? "bg-sidebar-accent" : ""}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t py-4">
        <div className="flex flex-col px-4 space-y-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback className="bg-sidebar-accent text-white">
                {isDeveloperMode ? "AD" : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-white">
                {isDeveloperMode ? "AKAR Admin" : "Client User"}
              </p>
              <p className="text-xs text-sidebar-accent-foreground">
                {isDeveloperMode ? "Admin Access" : "Client Access"}
              </p>
            </div>
          </div>
          
          {/* Sign Out Button */}
          <Button 
            variant="outline" 
            className="w-full justify-start text-sidebar-accent-foreground hover:bg-sidebar-accent"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span>Sign Out</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
