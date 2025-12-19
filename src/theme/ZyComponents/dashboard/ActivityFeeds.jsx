import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, MessageSquare, UserPlus, ShoppingCart, AlertTriangle, CheckCircle } from 'lucide-react';

export const RecentActivity = () => {
  const activities = [
    { user: 'John Doe', action: 'Created new project', time: '2 min ago', type: 'create' },
    { user: 'Jane Smith', action: 'Updated profile', time: '5 min ago', type: 'update' },
    { user: 'Mike Johnson', action: 'Completed task', time: '10 min ago', type: 'complete' },
    { user: 'Sarah Wilson', action: 'Left a comment', time: '15 min ago', type: 'comment' },
    { user: 'Alex Brown', action: 'Joined the team', time: '1 hour ago', type: 'join' },
    { user: 'Emma Davis', action: 'Made a purchase', time: '2 hours ago', type: 'purchase' }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'create': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'update': return <Bell className="h-4 w-4 text-blue-500" />;
      case 'complete': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'comment': return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case 'join': return <UserPlus className="h-4 w-4 text-blue-500" />;
      case 'purchase': return <ShoppingCart className="h-4 w-4 text-orange-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {activities.map((activity, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {getIcon(activity.type)}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.user}</p>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export const NotificationsFeed = () => {
  const notifications = [
    { title: 'New order received', message: 'Order #1234 from John Doe', time: '5 min ago', type: 'order', unread: true },
    { title: 'Server maintenance', message: 'Scheduled maintenance tonight', time: '1 hour ago', type: 'system', unread: true },
    { title: 'Payment processed', message: 'Payment of $99.99 completed', time: '2 hours ago', type: 'payment', unread: false },
    { title: 'New user registered', message: 'Jane Smith joined your platform', time: '3 hours ago', type: 'user', unread: false },
    { title: 'Low inventory alert', message: 'Product XYZ is running low', time: '4 hours ago', type: 'alert', unread: false }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'order': return <ShoppingCart className="h-4 w-4 text-green-500" />;
      case 'system': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'payment': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'user': return <UserPlus className="h-4 w-4 text-purple-500" />;
      case 'alert': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Notifications</CardTitle>
          <Badge variant="secondary">3 new</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {notifications.map((notification, i) => (
              <div key={i} className={`flex items-start space-x-3 p-2 rounded-lg ${notification.unread ? 'bg-muted/50' : ''}`}>
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{notification.title}</p>
                    {notification.unread && <div className="h-2 w-2 bg-blue-500 rounded-full" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export const SystemLogs = () => {
  const logs = [
    { level: 'INFO', message: 'User authentication successful', timestamp: '2024-01-15 14:30:25', source: 'auth-service' },
    { level: 'WARN', message: 'High memory usage detected', timestamp: '2024-01-15 14:28:15', source: 'monitoring' },
    { level: 'ERROR', message: 'Database connection timeout', timestamp: '2024-01-15 14:25:10', source: 'database' },
    { level: 'INFO', message: 'Backup completed successfully', timestamp: '2024-01-15 14:20:00', source: 'backup-service' },
    { level: 'DEBUG', message: 'Cache invalidation triggered', timestamp: '2024-01-15 14:15:45', source: 'cache-service' }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'ERROR': return 'text-red-500 bg-red-50';
      case 'WARN': return 'text-yellow-500 bg-yellow-50';
      case 'INFO': return 'text-blue-500 bg-blue-50';
      case 'DEBUG': return 'text-gray-500 bg-gray-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-2">
            {logs.map((log, i) => (
              <div key={i} className="flex items-start space-x-3 p-2 rounded-lg border">
                <Badge className={`text-xs ${getLevelColor(log.level)}`}>
                  {log.level}
                </Badge>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-mono">{log.message}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{log.source}</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};