import {
  Car,
  CircleDollarSign,
  Fuel,
  Gauge,
  Images,
  Settings,
  Wrench,
} from "lucide-react";

export const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Gauge,
  },
  {
    title: "Fuel",
    href: "/fuel",
    icon: Fuel,
  },
  {
    title: "Expenses",
    href: "/expenses",
    icon: CircleDollarSign,
  },
  {
    title: "Service",
    href: "/service",
    icon: Wrench,
  },
  {
    title: "Gallery",
    href: "/gallery",
    icon: Images,
  },
  {
    title: "Car",
    href: "/car",
    icon: Car,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
