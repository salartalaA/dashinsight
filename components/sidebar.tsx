"use client";

import type { Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import type { Page } from "@/types";

// ⬇️ آیکون‌ها رو dynamic و بدون SSR ایمپورت می‌کنیم
const BarChart3 = dynamic(
  () => import("lucide-react").then((m) => m.BarChart3),
  { ssr: false }
);
const Users = dynamic(() => import("lucide-react").then((m) => m.Users), {
  ssr: false,
});
const TrendingUp = dynamic(
  () => import("lucide-react").then((m) => m.TrendingUp),
  { ssr: false }
);
const AlertTriangle = dynamic(
  () => import("lucide-react").then((m) => m.AlertTriangle),
  { ssr: false }
);
const Search = dynamic(() => import("lucide-react").then((m) => m.Search), {
  ssr: false,
});
const Menu = dynamic(() => import("lucide-react").then((m) => m.Menu), {
  ssr: false,
});
const Sun = dynamic(() => import("lucide-react").then((m) => m.Sun), {
  ssr: false,
});
const Moon = dynamic(() => import("lucide-react").then((m) => m.Moon), {
  ssr: false,
});
const Home = dynamic(() => import("lucide-react").then((m) => m.Home), {
  ssr: false,
});

interface SidebarProps {
  currentPage: Page;
  onPageChange: Dispatch<SetStateAction<Page>>;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({
  currentPage,
  onPageChange,
  isOpen,
  onToggle,
}: SidebarProps) {
  const { theme, setTheme } = useTheme();
  const currentTheme = theme ?? "light";

  const menuItems: {
    id: Page;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge: string | null;
  }[] = [
    { id: "dashboard", label: "Dashboard", icon: Home, badge: null },
    { id: "sales", label: "Sales Analytics", icon: TrendingUp, badge: "Hot" },
    { id: "customers", label: "Customer Insights", icon: Users, badge: null },
    {
      id: "outliers",
      label: "Outlier Detection",
      icon: AlertTriangle,
      badge: "3",
    },
    { id: "query", label: "Query Builder", icon: Search, badge: "Pro" },
  ];

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-40",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8"
          >
            <Menu className="h-4 w-4" />
          </Button>

          {isOpen && (
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">DataInsight</span>
            </div>
          )}
        </div>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={currentPage === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start transition-all duration-200",
                isOpen ? "px-3" : "px-0 justify-center"
              )}
              onClick={() => onPageChange(item.id)}
            >
              <Icon className="h-4 w-4" />
              {isOpen && (
                <>
                  <span className="ml-2">{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant={
                        item.badge === "Hot" ? "destructive" : "secondary"
                      }
                      className="ml-auto text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
          className={cn(
            "transition-all duration-200",
            isOpen ? "w-full justify-start" : "w-8 h-8 p-0 justify-center"
          )}
        >
          {currentTheme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
          {isOpen && <span className="ml-2">Toggle Theme</span>}
        </Button>
      </div>
    </div>
  );
}
