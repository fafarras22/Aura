
import React from 'react';
import { 
  SidebarMenu, 
} from "@/components/ui/sidebar";
import { NavItem, SubItem } from './NavItem';
import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  title: string;
  path: string;
  icon: LucideIcon;
  adminOnly?: boolean;
  subItems?: SubItem[];
}

interface NavigationMenuProps {
  menuItems: MenuItem[];
  openCategories: string[];
  toggleCategory: (category: string) => void;
  isDeveloperMode: boolean;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ 
  menuItems, 
  openCategories, 
  toggleCategory,
  isDeveloperMode
}) => {
  // Filter items based on developer mode
  const filteredItems = isDeveloperMode 
    ? menuItems 
    : menuItems.filter(item => !item.adminOnly);

  return (
    <SidebarMenu>
      {filteredItems.map((item) => (
        <NavItem
          key={item.title}
          title={item.title}
          path={item.path}
          icon={item.icon}
          subItems={item.subItems}
          adminOnly={item.adminOnly}
          isOpen={openCategories.includes(item.title.toLowerCase())}
          onToggle={() => toggleCategory(item.title.toLowerCase())}
        />
      ))}
    </SidebarMenu>
  );
};
