'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Zap,
  Eye,
  RefreshCw
} from 'lucide-react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { mockData } from '@/lib/mock-data'

export function OutlierDetection() {
  const [activeDetection, setActiveDetection] = useState('sales')

  const outlierTypes = [
    {
      id: 'sales',
      label: 'Sales Outliers',
      count: 3,
      severity: 'high',
      description: 'Unusual sales patterns detected'
    },
    {
      id: 'customers',
      label: 'Customer Behavior',
      count: 5,
      severity: 'medium',
      description: 'Anomalous customer activities'
    },
    {
      id: 'inventory',
      label: 'Inventory Issues',
      count: 2,
      severity: 'low',
      description: 'Stock level irregularities'
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'outline'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Outlier Detection</h1>
          <p className="text-muted-foreground">AI-powered anomaly detection for your business data</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Configure Thresholds
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Run Detection
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {outlierTypes.map((type) => (
          <Card 
            key={type.id} 
            className={`cursor-pointer transition-all duration-200 ${
              activeDetection === type.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setActiveDetection(type.id)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                {type.label}
                <Badge variant={getSeverityColor(type.severity)}>
                  {type.count} issues
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detection Results */}
      <Tabs value={activeDetection} onValueChange={setActiveDetection}>
        <TabsList>
          <TabsTrigger value="sales">Sales Outliers</TabsTrigger>
          <TabsTrigger value="customers">Customer Behavior</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          {/* Sales Outliers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                  Sales Anomalies Detected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={mockData.salesOutliers}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis dataKey="sales" />
                    <Tooltip />
                    <Scatter dataKey="sales" fill="#2563eb" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Anomaly Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockData.detectedAnomalies.sales.map((anomaly, index) => (
                  <Alert key={index}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex items-center justify-between mb-2">
                        <strong>{anomaly.title}</strong>
                        <Badge variant={getSeverityColor(anomaly.severity)}>
                          {anomaly.severity}
                        </Badge>
                      </div>
                      <p className="text-sm">{anomaly.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Detected on {anomaly.date}
                      </p>
                    </AlertDescription>
                  </Alert>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          {/* Customer Behavior Outliers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-purple-500" />
                  Customer Behavior Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockData.customerBehaviorOutliers}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="activity" stroke="#7c3aed" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockData.detectedAnomalies.customers.map((anomaly, index) => (
                  <Alert key={index}>
                    <TrendingUp className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex items-center justify-between mb-2">
                        <strong>{anomaly.title}</strong>
                        <Badge variant={getSeverityColor(anomaly.severity)}>
                          {anomaly.severity}
                        </Badge>
                      </div>
                      <p className="text-sm">{anomaly.description}</p>
                    </AlertDescription>
                  </Alert>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          {/* Inventory Outliers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingDown className="h-5 w-5 mr-2 text-red-500" />
                Inventory Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.detectedAnomalies.inventory.map((anomaly, index) => (
                  <Alert key={index}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex items-center justify-between mb-2">
                        <strong>{anomaly.title}</strong>
                        <Badge variant={getSeverityColor(anomaly.severity)}>
                          {anomaly.severity}
                        </Badge>
                      </div>
                      <p className="text-sm">{anomaly.description}</p>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Immediate Action</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Review unusual sales spike on Product A - possible data entry error or exceptional demand.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Opportunity</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Customer segment showing increased engagement - consider targeted marketing campaigns.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Monitor</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Inventory levels for Category C require attention - set up automated alerts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}