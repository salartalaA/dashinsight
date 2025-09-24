"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Dashboard } from "@/components/dashboard";
import { SalesAnalytics } from "@/components/sales-analytics";
import { CustomerAnalytics } from "@/components/customer-analytics";
import { OutlierDetection } from "@/components/outlier-detection";
import { QueryBuilder } from "@/components/query-builder";
import type { Page } from "@/types";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderPage = (): JSX.Element => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "sales":
        return <SalesAnalytics />;
      case "customers":
        return <CustomerAnalytics />;
      case "outliers":
        return <OutlierDetection />;
      case "query":
        return <QueryBuilder />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main
        className={`flex-1 overflow-auto transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {renderPage()}
      </main>
    </div>
  );
}
