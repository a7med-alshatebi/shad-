import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    user: "Alice Johnson",
    action: "Created new project",
    time: "2 minutes ago",
    avatar: "/api/placeholder/32/32",
    initials: "AJ",
    type: "create",
  },
  {
    id: 2,
    user: "Bob Smith",
    action: "Updated user profile",
    time: "5 minutes ago",
    avatar: "/api/placeholder/32/32",
    initials: "BS",
    type: "update",
  },
  {
    id: 3,
    user: "Carol Wilson",
    action: "Deleted old files",
    time: "10 minutes ago",
    avatar: "/api/placeholder/32/32",
    initials: "CW",
    type: "delete",
  },
  {
    id: 4,
    user: "David Brown",
    action: "Logged in",
    time: "15 minutes ago",
    avatar: "/api/placeholder/32/32",
    initials: "DB",
    type: "login",
  },
  {
    id: 5,
    user: "Eva Davis",
    action: "Completed task",
    time: "20 minutes ago",
    avatar: "/api/placeholder/32/32",
    initials: "ED",
    type: "complete",
  },
];

const getActionBadge = (type: string) => {
  switch (type) {
    case "create":
      return <Badge variant="default" className="text-xs">New</Badge>;
    case "update":
      return <Badge variant="secondary" className="text-xs">Updated</Badge>;
    case "delete":
      return <Badge variant="destructive" className="text-xs">Deleted</Badge>;
    case "login":
      return <Badge variant="outline" className="text-xs">Login</Badge>;
    case "complete":
      return <Badge variant="default" className="text-xs bg-green-600">Complete</Badge>;
    default:
      return null;
  }
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar} alt={activity.user} />
                <AvatarFallback className="text-xs">{activity.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">
                    {activity.user}
                  </p>
                  {getActionBadge(activity.type)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.action}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
