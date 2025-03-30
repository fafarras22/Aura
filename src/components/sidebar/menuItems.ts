
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
  MonitorSmartphone,
  Globe
} from "lucide-react";
import { MenuItem } from './NavigationMenu';

export const menuItems: MenuItem[] = [
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
