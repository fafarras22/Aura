
import { useLocation } from "react-router-dom";
import {
  BarChart3,
  Cloud,
  Database,
  GanttChartSquare,
  LayoutDashboard,
  Leaf,
  Settings,
  Sprout,
  Droplet,
  Gauge,
  VideoIcon,
  PackageOpen,
  AlertCircle,
  Warehouse
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { useDeveloperMode } from "@/context/DeveloperModeContext";

export function SidebarLinks() {
  const location = useLocation();
  const { isDeveloperMode } = useDeveloperMode();
  
  return (
    <div className="flex w-full flex-col gap-2">
      <NavLink to="/dashboard" icon={LayoutDashboard} isActive={location.pathname === '/dashboard'}>
        Dashboard
      </NavLink>

      <NavSection title="Monitoring">
        <NavLink to="/climate" icon={Cloud} isActive={location.pathname === '/climate'}>
          Climate
        </NavLink>
        <NavLink to="/water" icon={Droplet} isActive={location.pathname === '/water'}>
          Water
        </NavLink>
        <NavLink to="/sensors" icon={Gauge} isActive={location.pathname === '/sensors'}>
          Sensors
        </NavLink>
        <NavLink to="/cctv" icon={VideoIcon} isActive={location.pathname === '/cctv'}>
          CCTV
        </NavLink>
      </NavSection>

      <NavSection title="Farm Management">
        <NavLink to="/containers" icon={PackageOpen} isActive={location.pathname === '/containers'}>
          Containers
        </NavLink>
        <NavLink to="/harvest" icon={Leaf} isActive={location.pathname === '/harvest'}>
          Harvest
        </NavLink>
        <NavLink to="/alerts" icon={AlertCircle} isActive={location.pathname === '/alerts'}>
          Alerts
        </NavLink>
      </NavSection>
      
      <NavSection title="Farm Operations">
        <NavLink 
          to="/production/vegetables" 
          icon={Sprout} 
          isActive={location.pathname === '/production/vegetables'}
        >
          Vegetables
        </NavLink>
        <NavLink 
          to="/sales/daily" 
          icon={BarChart3} 
          isActive={location.pathname === '/sales/daily'}
        >
          Daily Sales
        </NavLink>
      </NavSection>
      
      <NavSection title="Real Estate Projects">
        <NavLink 
          to="/projects" 
          icon={Warehouse} 
          isActive={location.pathname === '/projects'}
        >
          Real Estate
        </NavLink>
      </NavSection>
      
      {isDeveloperMode && (
        <NavLink to="/farm-os" icon={Database} isActive={location.pathname === '/farm-os'}>
          Farm OS (Admin)
        </NavLink>
      )}
      
      <NavLink to="/analytics" icon={GanttChartSquare} isActive={location.pathname === '/analytics'}>
        Analytics
      </NavLink>
      
      <NavLink to="/settings" icon={Settings} isActive={location.pathname === '/settings'}>
        Settings
      </NavLink>
    </div>
  );
}
