import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    avatar: "/api/placeholder/32/32",
    initials: "JD",
    lastSeen: "2 hours ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
    avatar: "/api/placeholder/32/32",
    initials: "JS",
    lastSeen: "1 day ago",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Manager",
    status: "Inactive",
    avatar: "/api/placeholder/32/32",
    initials: "MJ",
    lastSeen: "1 week ago",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "User",
    status: "Active",
    avatar: "/api/placeholder/32/32",
    initials: "SW",
    lastSeen: "3 hours ago",
  },
  {
    id: 5,
    name: "Tom Brown",
    email: "tom@example.com",
    role: "User",
    status: "Pending",
    avatar: "/api/placeholder/32/32",
    initials: "TB",
    lastSeen: "Never",
  },
  {
    id: 5,
    name: "Hibo beiber",
    email: "hibo@example.com",
    role: "User",
    status: "Active",
    avatar: "/api/placeholder/32/32",
    initials: "HB",
    lastSeen: "Never",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge variant="default" className="bg-green-600">Active</Badge>;
    case "Inactive":
      return <Badge variant="secondary">Inactive</Badge>;
    case "Pending":
      return <Badge variant="outline">Pending</Badge>;
    default:
      return null;
  }
};

const getRoleBadge = (role: string) => {
  switch (role) {
    case "Admin":
      return <Badge variant="destructive">Admin</Badge>;
    case "Manager":
      return <Badge variant="default">Manager</Badge>;
    case "User":
      return <Badge variant="secondary">User</Badge>;
    default:
      return null;
  }
};

export function UserTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last seen: {user.lastSeen}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getRoleBadge(user.role)}
                {getStatusBadge(user.status)}
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
