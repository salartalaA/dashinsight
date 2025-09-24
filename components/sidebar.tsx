'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Search,
  Menu,
  Sun,
  Moon,
  Home
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ currentPage, onPageChange, isOpen, onToggle }: SidebarProps) {
  const { theme, setTheme } = useTheme()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
    { id: 'sales', label: 'Sales Analytics', icon: TrendingUp, badge: 'Hot' },
    { id: 'customers', label: 'Customer Insights', icon: Users, badge: null },
    { id: 'outliers', label: 'Outlier Detection', icon: AlertTriangle, badge: '3' },
    { id: 'query', label: 'Query Builder', icon: Search, badge: 'Pro' },
  ]

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-40",
      isOpen ? "w-64" : "w-16"
    )}>
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

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={currentPage === item.id ? 'secondary' : 'ghost'}
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
                      variant={item.badge === 'Hot' ? 'destructive' : 'secondary'} 
                      className="ml-auto text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          )
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className={cn(
            "transition-all duration-200",
            isOpen ? "w-full justify-start" : "w-8 h-8 p-0 justify-center"
          )}
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          {isOpen && <span className="ml-2">Toggle Theme</span>}
        </Button>
      </div>
    </div>
  )
}