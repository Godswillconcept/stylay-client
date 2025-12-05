import {
  LayoutDashboard,
  Users,
  Store,
  Package,
  Layers,
  ShoppingCart,
  CreditCard,
  MessageSquare,
  BookOpen,
  BellRing,
  Shield,
} from "lucide-react";

export const Menu = [
  { to: "/admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin-application", label: "Application", icon: Users },
  { to: "/admin-vendors", label: "Vendors", icon: Store },
  { to: "/vendor-products", label: "Products", icon: Package },
  { to: "/admin-collection", label: "Collections", icon: Layers },
  { to: "/orders", label: "Orders", icon: ShoppingCart },
  { to: "/earnings", label: "Earnings & Payments", icon: CreditCard },
  { to: "/feedback", label: "Feedback & Support", icon: MessageSquare },
  { to: "/admin-journal", label: "Journals", icon: BookOpen },
  { to: "/notification", label: "Notification Panel", icon: BellRing },
  { to: "/sub-admin", label: "Admin Management", icon: Shield },
];
