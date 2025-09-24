'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Users,
  UserPlus,
  UserMinus,
  Heart,
  Star,
  TrendingUp
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'
import { mockData } from '@/lib/mock-data'

export function CustomerAnalytics() {
  const customerMetrics = [
    { 
      title: 'Total Customers', 
      value: '12,847', 
      change: '+284', 
      trend: 'up',
      icon: Users 
    },
    { 
      title: 'New Customers', 
      value: '1,247', 
      change: '+12%', 
      trend: 'up',
      icon: UserPlus 
    },
    { 
      title: 'Churn Rate', 
      value: '2.4%', 
      change: '-0.8%', 
      trend: 'up',
      icon: UserMinus 
    },
    { 
      title: 'Customer Lifetime Value', 
      value: '$1,240', 
      change: '+8.2%', 
      trend: 'up',
      icon: Heart 
    }
  ]

  const segmentColors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#ea580c']

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customer Analytics</h1>
          <p className="text-muted-foreground">Understand your customers better</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            Cohort Analysis
          </Button>
          <Button>Export Report</Button>
        </div>
      </div>

      {/* Customer Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {customerMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Icon className="h-4 w-4 mr-2" />
                  {metric.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{metric.value}</div>
                <Badge variant={metric.trend === 'up' ? 'secondary' : 'destructive'}>
                  {metric.change}
                </Badge>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Acquisition</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData.customerAcquisition}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="newCustomers" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  name="New Customers"
                />
                <Line 
                  type="monotone" 
                  dataKey="churnedCustomers" 
                  stroke="#dc2626" 
                  strokeWidth={2}
                  name="Churned"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockData.customerSegments}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockData.customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={segmentColors[index % segmentColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Customer Satisfaction Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mockData.satisfactionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="rating" fill="#7c3aed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Top Customer Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">High-Value Customers</span>
                <Badge variant="secondary">+15%</Badge>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">Customers spending over $500/month increased</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Customer Retention</span>
                <Badge variant="secondary">92%</Badge>
              </div>
              <Progress value={92} className="h-2" />
              <p className="text-xs text-muted-foreground">12-month customer retention rate</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average Order Frequency</span>
                <Badge variant="outline">2.4x/month</Badge>
              </div>
              <Progress value={68} className="h-2" />
              <p className="text-xs text-muted-foreground">How often customers place orders</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Behavior Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Behavior Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Peak Shopping Hours</h4>
              <div className="text-2xl font-bold text-primary mb-1">2-4 PM</div>
              <p className="text-sm text-muted-foreground">Highest customer activity</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Avg. Session Duration</h4>
              <div className="text-2xl font-bold text-primary mb-1">8.5 min</div>
              <p className="text-sm text-muted-foreground">Time spent per visit</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Mobile vs Desktop</h4>
              <div className="text-2xl font-bold text-primary mb-1">65% | 35%</div>
              <p className="text-sm text-muted-foreground">Traffic distribution</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}