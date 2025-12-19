import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, BarChart3, TrendingUp, Activity, CreditCard, Package, ShoppingCart } from 'lucide-react';

export const KPICards = () => {
  const kpis = [
    { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: DollarSign, positive: true },
    { title: 'Active Users', value: '2,350', change: '+180.1%', icon: Users, positive: true },
    { title: 'Sales', value: '12,234', change: '-19%', icon: BarChart3, positive: false },
    { title: 'Conversion Rate', value: '3.2%', change: '+5.4%', icon: TrendingUp, positive: true }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={kpi.positive ? 'text-green-600' : 'text-red-600'}>{kpi.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const EcommerceKPIs = () => {
  const kpis = [
    { title: 'Total Orders', value: '1,234', change: '+12%', icon: ShoppingCart, positive: true },
    { title: 'Revenue', value: '$54,239', change: '+8.2%', icon: DollarSign, positive: true },
    { title: 'Products Sold', value: '3,456', change: '+23%', icon: Package, positive: true },
    { title: 'Avg Order Value', value: '$43.21', change: '-2.1%', icon: CreditCard, positive: false }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={kpi.positive ? 'text-green-600' : 'text-red-600'}>{kpi.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const AnalyticsKPIs = () => {
  const kpis = [
    { title: 'Page Views', value: '45.2K', change: '+15.3%', icon: Activity, positive: true },
    { title: 'Bounce Rate', value: '32.4%', change: '-5.2%', icon: TrendingUp, positive: true },
    { title: 'Session Duration', value: '4m 32s', change: '+12.1%', icon: BarChart3, positive: true },
    { title: 'New Visitors', value: '1,234', change: '+8.7%', icon: Users, positive: true }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={kpi.positive ? 'text-green-600' : 'text-red-600'}>{kpi.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};