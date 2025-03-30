
import { Leaf, Droplet, Thermometer, Activity, AlertTriangle, Camera, Calendar, Settings, Home, BarChart2, CircleDollarSign } from "lucide-react";
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
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

interface SidebarItem {
  title: string;
  path: string;
  icon: React.ElementType;
  adminOnly?: boolean;
}

export function AppSidebar({ isDeveloperMode = false }: { isDeveloperMode?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [akarLogo, setAkarLogo] = useState("/lovable-uploads/e60ccc9b-594d-461b-9ef9-2b157e19b0a1.png");

  const menuItems: SidebarItem[] = [
    { title: "Dashboard", path: "/", icon: Home },
    { title: "Sensors", path: "/sensors", icon: Activity },
    { title: "Water System", path: "/water", icon: Droplet },
    { title: "Climate", path: "/climate", icon: Thermometer },
    { title: "Tokenization", path: "/tokenization", icon: CircleDollarSign },
    { title: "Alerts", path: "/alerts", icon: AlertTriangle },
    { title: "CCTV", path: "/cctv", icon: Camera },
    { title: "Harvest", path: "/harvest", icon: Leaf },
    { title: "Calendar", path: "/calendar", icon: Calendar },
    { title: "Analytics", path: "/analytics", icon: BarChart2, adminOnly: true },
    { title: "Settings", path: "/settings", icon: Settings, adminOnly: true },
  ];

  const filteredItems = isDeveloperMode 
    ? menuItems 
    : menuItems.filter(item => !item.adminOnly);

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center py-4 border-b">
        <div className="flex flex-col items-center space-y-2">
          <img
            src={akarLogo}
            alt="AKAR Logo"
            className="h-10"
            onError={() => setAkarLogo("/placeholder.svg")}
          />
          <div className="text-lg font-semibold text-white">AKAR FarmWatch</div>
          {isDeveloperMode && (
            <div className="px-2 py-1 text-xs bg-yellow-500 rounded-full text-black">
              Developer Mode
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.path)}
                    className={isActive(item.path) ? "bg-sidebar-accent" : ""}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t py-4">
        <div className="flex justify-between items-center px-4">
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
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
