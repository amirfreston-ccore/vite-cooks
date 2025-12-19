import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Server, Database, Wifi, HardDrive, Cpu, MemoryStick, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export const SystemStatus = () => {
  const systems = [
    { name: 'API Server', status: 'online', uptime: '99.9%', icon: Server, color: 'green' },
    { name: 'Database', status: 'online', uptime: '99.8%', icon: Database, color: 'green' },
    { name: 'CDN', status: 'degraded', uptime: '98.5%', icon: Wifi, color: 'yellow' },
    { name: 'Storage', status: 'offline', uptime: '95.2%', icon: HardDrive, color: 'red' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'degraded': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'offline': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {systems.map((system, i) => (
          <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <system.icon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{system.name}</p>
                <p className="text-sm text-muted-foreground">Uptime: {system.uptime}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(system.status)}
              <Badge variant={
                system.status === 'online' ? 'default' :
                system.status === 'degraded' ? 'secondary' : 'destructive'
              }>
                {system.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export const ResourceUsage = () => {
  const resources = [
    { name: 'CPU Usage', value: 65, max: 100, unit: '%', icon: Cpu, color: 'blue' },
    { name: 'Memory', value: 8.2, max: 16, unit: 'GB', icon: MemoryStick, color: 'green' },
    { name: 'Storage', value: 450, max: 1000, unit: 'GB', icon: HardDrive, color: 'purple' },
    { name: 'Network', value: 125, max: 1000, unit: 'Mbps', icon: Wifi, color: 'orange' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Usage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {resources.map((resource, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <resource.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{resource.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {resource.value}{resource.unit} / {resource.max}{resource.unit}
              </span>
            </div>
            <Progress value={(resource.value / resource.max) * 100} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export const ProjectStatus = () => {
  const projects = [
    { name: 'Website Redesign', progress: 85, status: 'In Progress', dueDate: '2024-02-15', team: 5 },
    { name: 'Mobile App', progress: 60, status: 'In Progress', dueDate: '2024-03-01', team: 8 },
    { name: 'API Integration', progress: 100, status: 'Completed', dueDate: '2024-01-20', team: 3 },
    { name: 'Database Migration', progress: 25, status: 'Planning', dueDate: '2024-04-10', team: 4 }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Project Status</CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project, i) => (
          <div key={i} className="space-y-3 p-3 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{project.name}</h4>
              <Badge variant={
                project.status === 'Completed' ? 'default' :
                project.status === 'In Progress' ? 'secondary' : 'outline'
              }>
                {project.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Due: {project.dueDate}</span>
              <span>{project.team} team members</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export const HealthChecks = () => {
  const checks = [
    { name: 'Database Connection', status: 'healthy', lastCheck: '30s ago', responseTime: '45ms' },
    { name: 'External API', status: 'healthy', lastCheck: '1m ago', responseTime: '120ms' },
    { name: 'File Storage', status: 'warning', lastCheck: '2m ago', responseTime: '250ms' },
    { name: 'Email Service', status: 'error', lastCheck: '5m ago', responseTime: 'timeout' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Checks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {checks.map((check, i) => (
          <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`h-3 w-3 rounded-full ${
                check.status === 'healthy' ? 'bg-green-500' :
                check.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <div>
                <p className="font-medium">{check.name}</p>
                <p className="text-sm text-muted-foreground">Last check: {check.lastCheck}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="outline" className={getStatusColor(check.status)}>
                {check.status}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">{check.responseTime}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};