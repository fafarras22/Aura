
import React from 'react';
import { 
  SidebarMenu, 
} from "@/components/ui/sidebar";
import { NavItem } from './NavItem';
import { MenuItem } from './menuItems';

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
          key={item.category}
          title={item.label}
          path={item.items[0]?.path || "#"}
          icon={item.icon}
          subItems={item.items.map(subItem => ({
            title: subItem.name,
            path: subItem.path,
            icon: item.icon
          }))}
          isOpen={openCategories.includes(item.category)}
          onToggle={() => toggleCategory(item.category)}
        />
      ))}
    </SidebarMenu>
  );
};
