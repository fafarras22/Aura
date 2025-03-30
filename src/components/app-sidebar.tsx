
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { SidebarLogo } from "./sidebar/SidebarLogo";
import { UserProfileSection } from "./sidebar/UserProfileSection";
import { NavigationMenu } from "./sidebar/NavigationMenu";
import { menuItems } from "./sidebar/menuItems";

export function AppSidebar() {
  const navigate = useNavigate();
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

  return (
    <Sidebar className="bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800">
      <SidebarHeader className="flex items-center justify-center py-6 border-b">
        <SidebarLogo isDeveloperMode={isDeveloperMode} />
      </SidebarHeader>
      
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <NavigationMenu 
              menuItems={menuItems}
              openCategories={openCategories}
              toggleCategory={toggleCategory}
              isDeveloperMode={isDeveloperMode}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t py-4">
        {currentUser && (
          <UserProfileSection 
            user={currentUser}
            onLogout={handleSignOut}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
