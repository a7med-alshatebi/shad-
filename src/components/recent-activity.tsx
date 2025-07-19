import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: 1,
    user: "Alice Johnson",
    email: "alice@example.com",
    action: "Completed purchase",
    time: "2 minutes ago",
    avatar: "/avatars/01.png",
    status: "success"
  },
  {
    id: 2,
    user: "Bob Smith",
    email: "bob@example.com", 
    action: "Updated profile",
    time: "5 minutes ago",
    avatar: "/avatars/02.png",
    status: "info"
  },
  {
    id: 3,
    user: "Carol Davis",
    email: "carol@example.com",
    action: "Failed login attempt",
    time: "10 minutes ago",
    avatar: "/avatars/03.png",
    status: "warning"
  },
  {
    id: 4,
    user: "David Wilson",
    email: "david@example.com",
    action: "Subscribed to newsletter",
    time: "15 minutes ago",
    avatar: "/avatars/04.png",
    status: "success"
  },
  {
    id: 5,
    user: "Eve Brown",
    email: "eve@example.com",
    action: "Downloaded report",
    time: "1 hour ago",
    avatar: "/avatars/05.png",
    status: "info"
  }
]

const getStatusVariant = (status: string) => {
  switch (status) {
    case "success":
      return "default"
    case "warning":
      return "destructive"
    case "info":
      return "secondary"
    default:
      return "outline"
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest user activities and system events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.avatar} alt={activity.user} />
                <AvatarFallback>
                  {activity.user.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">
                    {activity.user}
                  </p>
                  <Badge variant={getStatusVariant(activity.status)} className="text-xs">
                    {activity.status}
                  </Badge>
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
  )
}
