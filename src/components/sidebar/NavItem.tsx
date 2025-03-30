
import React from 'react';
import { LucideIcon, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar";
import { useLocation, useNavigate } from 'react-router-dom';

export interface SubItem {
  title: string;
  path: string;
  icon: LucideIcon;
  adminOnly?: boolean;
}

export interface NavItemProps {
  title: string;
  path: string;
  icon: LucideIcon;
  subItems?: SubItem[];
  adminOnly?: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ 
  title, 
  path, 
  icon: Icon, 
  subItems, 
  isOpen, 
  onToggle 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Active state detection helpers
  const isActive = (itemPath: string) => location.pathname === itemPath;
  
  const isActiveGroup = () => {
    if (isActive(path)) return true;
    if (subItems) {
      return subItems.some(subItem => isActive(subItem.path));
    }
    return false;
  };
  
  // Style for active items
  const activeItemClass = "bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-300";

  if (subItems) {
    return (
      <SidebarMenuItem>
        <Collapsible 
          open={isOpen} 
          onOpenChange={onToggle}
          className="w-full"
        >
          <CollapsibleTrigger asChild>
            <SidebarMenuButton 
              className={`justify-between ${isActiveGroup() ? activeItemClass : ""}`}
            >
              <div className="flex items-center">
                <Icon className={`w-5 h-5 mr-3 ${isActiveGroup() ? "text-green-500 dark:text-green-400" : ""}`} />
                <span>{title}</span>
              </div>
              <ChevronDown 
                className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {subItems.map((subItem) => (
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
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton 
        onClick={() => navigate(path)}
        className={isActive(path) ? activeItemClass : ""}
      >
        <Icon className={`w-5 h-5 mr-3 ${isActive(path) ? "text-green-500 dark:text-green-400" : ""}`} />
        <span>{title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
