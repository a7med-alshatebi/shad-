import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreVertical, Mail, Phone } from "lucide-react"

const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1 (555) 123-4567",
    role: "Admin",
    status: "Active",
    avatar: "/avatars/01.png",
    joinDate: "Jan 2024"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "+1 (555) 234-5678",
    role: "User",
    status: "Active",
    avatar: "/avatars/02.png",
    joinDate: "Feb 2024"
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@example.com",
    phone: "+1 (555) 345-6789",
    role: "User",
    status: "Inactive",
    avatar: "/avatars/03.png",
    joinDate: "Mar 2024"
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 (555) 456-7890",
    role: "Moderator",
    status: "Active",
    avatar: "/avatars/04.png",
    joinDate: "Apr 2024"
  },
  {
    id: 5,
    name: "Eve Brown",
    email: "eve.brown@example.com",
    phone: "+1 (555) 567-8901",
    role: "User",
    status: "Pending",
    avatar: "/avatars/05.png",
    joinDate: "May 2024"
  }
]

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Active":
      return "default"
    case "Inactive":
      return "destructive"
    case "Pending":
      return "secondary"
    default:
      return "outline"
  }
}

const getRoleVariant = (role: string) => {
  switch (role) {
    case "Admin":
      return "destructive"
    case "Moderator":
      return "default"
    case "User":
      return "secondary"
    default:
      return "outline"
  }
}

export function UserTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          Manage your team members and their account permissions here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between space-x-4 border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-semibold">{user.name}</h4>
                    <Badge variant={getRoleVariant(user.role)} className="text-xs">
                      {user.role}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={getStatusVariant(user.status)}>
                  {user.status}
                </Badge>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Joined {user.joinDate}
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
