
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
  LogOut,
  Shield,
  ToggleLeft,
  ToggleRight
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
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { Badge } from "@/components/ui/badge";

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

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [akarLogo, setAkarLogo] = useState("/lovable-uploads/e60ccc9b-594d-461b-9ef9-2b157e19b0a1.png");
  const [openCategories, setOpenCategories] = useState<string[]>(['dashboard']);
  
  const { 
    isDeveloperMode, 
    toggleDeveloperMode, 
    currentUser, 
    logout, 
    canAccessDeveloperMode 
  } = useDeveloperMode();

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
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

  // Updated color style for active items - using a lighter green for better contrast
  const activeItemClass = "bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-300";
  
  // Determine user role text and badge style
  const userRoleText = currentUser?.role === 'admin' ? 'Admin' : 'Client';
  const userRoleBadgeVariant = currentUser?.role === 'admin' ? 'default' : 'outline';

  return (
    <Sidebar className="bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800">
      <SidebarHeader className="flex items-center justify-center py-6 border-b">
        <div className="flex flex-col items-center space-y-2">
          <img
            src={akarLogo}
            alt="AKAR Logo"
            className="h-12"
            onError={() => setAkarLogo("/placeholder.svg")}
          />
          {isDeveloperMode && (
            <Badge variant="warning" className="px-2 py-1 text-xs rounded-full">
              Developer Mode
            </Badge>
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
                          className={`justify-between ${isActiveGroup(item) ? activeItemClass : ""}`}
                        >
                          <div className="flex items-center">
                            <item.icon className={`w-5 h-5 mr-3 ${isActiveGroup(item) ? "text-green-500 dark:text-green-400" : ""}`} />
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
                                className={`pl-9 ${isActive(subItem.path) ? activeItemClass : ""}`}
                              >
                                <subItem.icon className={`w-4 h-4 mr-2 ${isActive(subItem.path) ? "text-green-500 dark:text-green-400" : ""}`} />
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
                      className={isActive(item.path) ? activeItemClass : ""}
                    >
                      <item.icon className={`w-5 h-5 mr-3 ${isActive(item.path) ? "text-green-500 dark:text-green-400" : ""}`} />
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
              <AvatarFallback className={`${
                currentUser?.role === 'admin' 
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" 
                  : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              }`}>
                {currentUser?.name.charAt(0) ?? (currentUser?.role === 'admin' ? "A" : "U")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{currentUser?.name ?? 'Unknown User'}</p>
                <Badge variant={userRoleBadgeVariant} className="text-[10px] px-1.5 py-0">
                  {userRoleText}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {currentUser?.containerId ? `Container: ${currentUser.containerId}` : ''}
              </p>
            </div>
          </div>
          
          {/* Developer Mode Toggle - Only visible for admin users */}
          {canAccessDeveloperMode && (
            <Button 
              variant="outline" 
              size="sm"
              className="w-full justify-between hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 dark:hover:text-green-300"
              onClick={toggleDeveloperMode}
            >
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                <span>Developer Mode</span>
              </div>
              {isDeveloperMode ? (
                <ToggleRight className="w-4 h-4 text-green-500" />
              ) : (
                <ToggleLeft className="w-4 h-4" />
              )}
            </Button>
          )}
          
          {/* Security Status */}
          <div className="px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center space-x-2 text-green-700 dark:text-green-300 text-sm">
            <Shield className="w-4 h-4" />
            <span>Secure Connection</span>
          </div>
          
          {/* Sign Out Button */}
          <Button 
            variant="outline" 
            className="w-full justify-start hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 dark:hover:text-green-300"
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
