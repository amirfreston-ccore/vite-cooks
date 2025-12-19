import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Plus, RefreshCw } from 'lucide-react';

// Import modular components
import { KPICards, EcommerceKPIs, AnalyticsKPIs } from './KPICards';
import { OrdersTable, UsersTable, ProductsTable } from './DataTables';
import { RecentActivity, NotificationsFeed, SystemLogs } from './ActivityFeeds';
import { SystemStatus, ResourceUsage, ProjectStatus, HealthChecks } from './StatusCards';

const DashboardHeader = ({ title, subtitle, actions }) => null

const AnalyticsChart = ({ title, period, onPeriodChange }) => (
  <Card className="lg:col-span-2">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Select value={period} onValueChange={onPeriodChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardHeader>
    <CardContent>
      <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
        <p className="text-muted-foreground">Chart placeholder - {period}</p>
      </div>
    </CardContent>
  </Card>
);

const DashboardCompositions = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  return (
    <div className='bg-soft min-h-screen'>
      <div className="p-8 max-w-7xl mx-auto">
        
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          {/* Overview Dashboard */}
          <TabsContent value="overview" className="space-y-8">
            <DashboardHeader 
              title="Dashboard Overview" 
              subtitle="Welcome back! Here's what's happening with your business."
              actions={[
                <Button key="export" variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />Export
                </Button>,
                <Button key="refresh" variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />Refresh
                </Button>,
                <Button key="add" size="sm">
                  <Plus className="h-4 w-4 mr-2" />Add New
                </Button>
              ]}
            />
            
            <KPICards />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AnalyticsChart 
                title="Revenue Analytics" 
                period={selectedPeriod} 
                onPeriodChange={setSelectedPeriod} 
              />
              <RecentActivity />
            </div>
            
            <OrdersTable />
          </TabsContent>

          {/* E-commerce Dashboard */}
          <TabsContent value="ecommerce" className="space-y-8">
            <DashboardHeader 
              title="E-commerce Dashboard" 
              subtitle="Monitor your online store performance and sales metrics."
              actions={[
                <Button key="export" variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />Export Sales
                </Button>,
                <Button key="add" size="sm">
                  <Plus className="h-4 w-4 mr-2" />Add Product
                </Button>
              ]}
            />
            
            <EcommerceKPIs />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsChart 
                title="Sales Overview" 
                period={selectedPeriod} 
                onPeriodChange={setSelectedPeriod} 
              />
              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Top products chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OrdersTable />
              <ProductsTable />
            </div>
          </TabsContent>

          {/* Analytics Dashboard */}
          <TabsContent value="analytics" className="space-y-8">
            <DashboardHeader 
              title="Analytics Dashboard" 
              subtitle="Deep dive into your website and user analytics."
              actions={[
                <Button key="export" variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />Export Report
                </Button>
              ]}
            />
            
            <AnalyticsKPIs />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AnalyticsChart 
                title="Traffic Analytics" 
                period={selectedPeriod} 
                onPeriodChange={setSelectedPeriod} 
              />
              <NotificationsFeed />
            </div>
            
            <UsersTable />
          </TabsContent>

          {/* System Dashboard */}
          <TabsContent value="system" className="space-y-8">
            <DashboardHeader 
              title="System Monitoring" 
              subtitle="Monitor system health, performance, and infrastructure status."
              actions={[
                <Button key="refresh" variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />Refresh
                </Button>
              ]}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SystemStatus />
              <ResourceUsage />
              <HealthChecks />
              <SystemLogs />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Performance chart</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Error Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Error rates chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Dashboard */}
          <TabsContent value="projects" className="space-y-8">
            <DashboardHeader 
              title="Project Management" 
              subtitle="Track project progress, team performance, and deliverables."
              actions={[
                <Button key="add" size="sm">
                  <Plus className="h-4 w-4 mr-2" />New Project
                </Button>
              ]}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectStatus />
              <RecentActivity />
              <Card>
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Team performance chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Timeline chart</p>
                  </div>
                </CardContent>
              </Card>
              <UsersTable />
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default DashboardCompositions;