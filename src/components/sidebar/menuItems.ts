
import { 
  BarChart2, 
  Box, 
  Calendar, 
  Camera, 
  CircleDollarSign, 
  Droplets, 
  Home, 
  LineChart,
  Bell, 
  Settings as SettingsIcon, 
  Thermometer, 
  Server,
  Leaf,
  TrendingUp,
  ChartBar,
  LucideIcon
} from "lucide-react";

// Define the interface for submenu items
export interface SubMenuItem {
  name: string;
  path: string;
}

// Define the interface for main menu items
export interface MenuItem {
  category: string;
  label: string;
  icon: LucideIcon;
  items: SubMenuItem[];
  adminOnly?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    category: "dashboard",
    label: "Dashboard",
    icon: Home,
    items: [
      { name: "Overview", path: "/dashboard" },
      { name: "Analytics", path: "/analytics" },
      { name: "Calendar", path: "/calendar" },
    ],
  },
  {
    category: "monitoring",
    label: "Monitoring",
    icon: LineChart,
    items: [
      { name: "Climate", path: "/climate" },
      { name: "Water", path: "/water" },
      { name: "Sensors", path: "/sensors" },
      { name: "CCTV", path: "/cctv" },
    ],
    adminOnly: false,
  },
  {
    category: "farming",
    label: "Farm Management",
    icon: Box,
    items: [
      { name: "Containers", path: "/containers" },
      { name: "Harvest", path: "/harvest" },
      { name: "Alerts", path: "/alerts" },
    ],
    adminOnly: false,
  },
  {
    category: "production",
    label: "Production Data",
    icon: Leaf,
    items: [
      { name: "Vegetables", path: "/production/vegetables" },
      { name: "Fruits", path: "/production/fruits" },
      { name: "Herbs", path: "/production/herbs" },
      { name: "Sales Analysis", path: "/production/sales" },
    ],
    adminOnly: false,
  },
  {
    category: "sales",
    label: "Sales Performance",
    icon: TrendingUp,
    items: [
      { name: "Daily Sales", path: "/sales/daily" },
      { name: "Monthly Trends", path: "/sales/monthly" },
      { name: "Container Comparison", path: "/sales/comparison" },
    ],
    adminOnly: false,
  },
  {
    category: "tokenization",
    label: "Tokenization",
    icon: CircleDollarSign,
    items: [
      { name: "Tokenization", path: "/tokenization" },
      { name: "Farm Projects", path: "/farm-projects" },
    ],
    adminOnly: false,
  },
  {
    category: "settings",
    label: "Settings",
    icon: SettingsIcon,
    items: [
      { name: "Settings", path: "/settings" },
    ],
    adminOnly: false,
  },
  {
    category: "admin",
    label: "Administration",
    icon: Server,
    items: [
      { name: "Backend Dashboard", path: "/backend" },
    ],
    adminOnly: true,
  },
];
