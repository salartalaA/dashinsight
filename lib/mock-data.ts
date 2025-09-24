export const mockData = {
  // Dashboard data
  revenueData: [
    { month: 'Jan', revenue: 85000 },
    { month: 'Feb', revenue: 92000 },
    { month: 'Mar', revenue: 78000 },
    { month: 'Apr', revenue: 105000 },
    { month: 'May', revenue: 120000 },
    { month: 'Jun', revenue: 135000 },
  ],

  categoryData: [
    { name: 'Electronics', value: 45 },
    { name: 'Clothing', value: 25 },
    { name: 'Books', value: 15 },
    { name: 'Home & Garden', value: 10 },
    { name: 'Sports', value: 5 },
  ],

  topProducts: [
    { name: 'Laptop Pro 16"', sales: 1240, percentage: 85 },
    { name: 'Wireless Headphones', sales: 890, percentage: 65 },
    { name: 'Smartphone X', sales: 756, percentage: 55 },
    { name: 'Gaming Mouse', sales: 620, percentage: 45 },
    { name: 'USB-C Hub', sales: 445, percentage: 35 },
  ],

  customerGrowth: [
    { month: 'Jan', customers: 245 },
    { month: 'Feb', customers: 289 },
    { month: 'Mar', customers: 356 },
    { month: 'Apr', customers: 398 },
    { month: 'May', customers: 445 },
    { month: 'Jun', customers: 520 },
  ],

  recentInsights: [
    {
      type: 'positive',
      message: 'Sales increased by 15% compared to last month',
      time: '2 hours ago'
    },
    {
      type: 'warning',
      message: 'Low inventory alert for 3 popular products',
      time: '4 hours ago'
    },
    {
      type: 'positive',
      message: 'Customer retention rate improved to 92%',
      time: '1 day ago'
    },
  ],

  // Sales Analytics data
  salesTrend: [
    { date: '2024-01-01', sales: 12500 },
    { date: '2024-01-05', sales: 14200 },
    { date: '2024-01-10', sales: 13800 },
    { date: '2024-01-15', sales: 16500 },
    { date: '2024-01-20', sales: 15200 },
    { date: '2024-01-25', sales: 18900 },
    { date: '2024-01-30', sales: 17600 },
  ],

  salesByRegion: [
    { region: 'North America', sales: 45000 },
    { region: 'Europe', sales: 38000 },
    { region: 'Asia Pacific', sales: 32000 },
    { region: 'Latin America', sales: 18000 },
    { region: 'Middle East', sales: 12000 },
  ],

  dailySales: [
    { day: 'Mon', sales: 8500, target: 9000 },
    { day: 'Tue', sales: 9200, target: 9000 },
    { day: 'Wed', sales: 8800, target: 9000 },
    { day: 'Thu', sales: 9500, target: 9000 },
    { day: 'Fri', sales: 10200, target: 9000 },
    { day: 'Sat', sales: 7800, target: 8000 },
    { day: 'Sun', sales: 7200, target: 8000 },
  ],

  // Customer Analytics data
  customerAcquisition: [
    { month: 'Jan', newCustomers: 245, churnedCustomers: 32 },
    { month: 'Feb', newCustomers: 289, churnedCustomers: 28 },
    { month: 'Mar', newCustomers: 356, churnedCustomers: 45 },
    { month: 'Apr', newCustomers: 398, churnedCustomers: 38 },
    { month: 'May', newCustomers: 445, churnedCustomers: 42 },
    { month: 'Jun', newCustomers: 520, churnedCustomers: 35 },
  ],

  customerSegments: [
    { name: 'VIP Customers', value: 15 },
    { name: 'Regular Customers', value: 45 },
    { name: 'Occasional Buyers', value: 25 },
    { name: 'New Customers', value: 15 },
  ],

  satisfactionTrends: [
    { month: 'Jan', rating: 4.2 },
    { month: 'Feb', rating: 4.3 },
    { month: 'Mar', rating: 4.1 },
    { month: 'Apr', rating: 4.4 },
    { month: 'May', rating: 4.5 },
    { month: 'Jun', rating: 4.3 },
  ],

  // Outlier Detection data
  salesOutliers: [
    { day: 1, sales: 8500 },
    { day: 2, sales: 9200 },
    { day: 3, sales: 8800 },
    { day: 4, sales: 25000 }, // Outlier
    { day: 5, sales: 9100 },
    { day: 6, sales: 8900 },
    { day: 7, sales: 9500 },
    { day: 8, sales: 8700 },
    { day: 9, sales: 2100 }, // Outlier
    { day: 10, sales: 9300 },
  ],

  customerBehaviorOutliers: [
    { day: 1, activity: 145 },
    { day: 2, activity: 156 },
    { day: 3, activity: 134 },
    { day: 4, activity: 298 }, // Spike in activity
    { day: 5, activity: 167 },
    { day: 6, activity: 142 },
    { day: 7, activity: 189 },
  ],

  detectedAnomalies: {
    sales: [
      {
        title: 'Unusual Sales Spike',
        description: 'Sales volume on January 4th was 180% higher than average',
        severity: 'high',
        date: '2024-01-04'
      },
      {
        title: 'Weekend Sales Drop',
        description: 'Sales on January 9th dropped 77% below normal range',
        severity: 'medium',
        date: '2024-01-09'
      },
    ],
    customers: [
      {
        title: 'Unusual Login Activity',
        description: 'Customer engagement spiked 120% above normal levels',
        severity: 'medium'
      },
      {
        title: 'Cart Abandonment Increase',
        description: 'Shopping cart abandonment rate increased by 45%',
        severity: 'medium'
      },
    ],
    inventory: [
      {
        title: 'Stock Level Anomaly',
        description: 'Product XYZ inventory depleted faster than forecasted',
        severity: 'low'
      },
      {
        title: 'Supplier Delay Impact',
        description: 'Category A products showing unusual stock patterns',
        severity: 'low'
      },
    ]
  }
}