'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Play,
  Save,
  Download,
  Search,
  Database,
  Code,
  Filter
} from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function QueryBuilder() {
  const [sqlQuery, setSqlQuery] = useState(`SELECT 
  customer_id,
  product_name,
  order_date,
  quantity,
  total_amount
FROM orders 
WHERE order_date >= '2024-01-01' 
  AND total_amount > 100
ORDER BY order_date DESC
LIMIT 100;`)

  const [queryResults, setQueryResults] = useState([
    { customer_id: 'C001', product_name: 'Laptop Pro', order_date: '2024-01-15', quantity: 1, total_amount: 1299.99 },
    { customer_id: 'C002', product_name: 'Wireless Headphones', order_date: '2024-01-14', quantity: 2, total_amount: 199.98 },
    { customer_id: 'C003', product_name: 'Smartphone', order_date: '2024-01-13', quantity: 1, total_amount: 799.99 },
    { customer_id: 'C004', product_name: 'Tablet', order_date: '2024-01-12', quantity: 1, total_amount: 549.99 },
    { customer_id: 'C005', product_name: 'Gaming Mouse', order_date: '2024-01-11', quantity: 3, total_amount: 149.97 }
  ])

  const [queryExecuting, setQueryExecuting] = useState(false)

  const handleExecuteQuery = () => {
    setQueryExecuting(true)
    // Simulate query execution
    setTimeout(() => {
      setQueryExecuting(false)
    }, 1500)
  }

  const tableSchemas = [
    { table: 'orders', columns: ['order_id', 'customer_id', 'product_name', 'quantity', 'total_amount', 'order_date'] },
    { table: 'customers', columns: ['customer_id', 'name', 'email', 'registration_date', 'city'] },
    { table: 'products', columns: ['product_id', 'product_name', 'category', 'price', 'stock_quantity'] },
    { table: 'transactions', columns: ['transaction_id', 'order_id', 'payment_method', 'amount', 'status'] }
  ]

  const quickQueries = [
    {
      name: 'Top Selling Products',
      description: 'Products with highest sales volume',
      query: `SELECT product_name, SUM(quantity) as total_sold 
FROM orders 
GROUP BY product_name 
ORDER BY total_sold DESC 
LIMIT 10;`
    },
    {
      name: 'Customer Lifetime Value',
      description: 'Total spending per customer',
      query: `SELECT customer_id, SUM(total_amount) as lifetime_value 
FROM orders 
GROUP BY customer_id 
ORDER BY lifetime_value DESC;`
    },
    {
      name: 'Monthly Revenue Trend',
      description: 'Revenue by month for trend analysis',
      query: `SELECT DATE_TRUNC('month', order_date) as month, 
       SUM(total_amount) as revenue 
FROM orders 
GROUP BY month 
ORDER BY month;`
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Query Builder</h1>
          <p className="text-muted-foreground">Build and execute custom queries on your data</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save Query
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Database Schema */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Database className="h-4 w-4 mr-2" />
              Database Schema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tableSchemas.map((schema, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="font-medium text-sm mb-2 flex items-center">
                  <Badge variant="outline" className="mr-2">{schema.table}</Badge>
                </div>
                <div className="space-y-1">
                  {schema.columns.map((column, colIndex) => (
                    <div 
                      key={colIndex} 
                      className="text-xs text-muted-foreground cursor-pointer hover:text-foreground"
                      onClick={() => setSqlQuery(prev => prev + ` ${column}`)}
                    >
                      • {column}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Query Editor and Results */}
        <div className="lg:col-span-3 space-y-6">
          {/* Quick Queries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Search className="h-4 w-4 mr-2" />
                Quick Queries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {quickQueries.map((query, index) => (
                  <div 
                    key={index}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => setSqlQuery(query.query)}
                  >
                    <h4 className="font-medium text-sm mb-1">{query.name}</h4>
                    <p className="text-xs text-muted-foreground">{query.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Query Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center text-sm">
                  <Code className="h-4 w-4 mr-2" />
                  SQL Query Editor
                </span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">SQL</Badge>
                  <Button 
                    size="sm"
                    onClick={handleExecuteQuery}
                    disabled={queryExecuting}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {queryExecuting ? 'Executing...' : 'Run Query'}
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
                placeholder="Enter your SQL query here..."
              />
            </CardContent>
          </Card>

          {/* Query Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm">Query Results</span>
                <Badge variant="secondary">{queryResults.length} rows</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer ID</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Order Date</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {queryResults.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-sm">{row.customer_id}</TableCell>
                        <TableCell>{row.product_name}</TableCell>
                        <TableCell>{row.order_date}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell className="font-mono">${row.total_amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Query Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Query Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">0.24s</div>
                  <div className="text-xs text-muted-foreground">Execution Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{queryResults.length}</div>
                  <div className="text-xs text-muted-foreground">Rows Returned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">45KB</div>
                  <div className="text-xs text-muted-foreground">Data Processed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-xs text-muted-foreground">Tables Scanned</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}