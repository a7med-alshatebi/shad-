import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Eye } from "lucide-react"

const stats = [
  {
    title: "Total Users",
    value: "12,234",
    change: "+12%",
    changeType: "increase",
    icon: Users,
    description: "Active users this month"
  },
  {
    title: "Revenue",
    value: "$45,231",
    change: "+8.2%",
    changeType: "increase",
    icon: DollarSign,
    description: "Total revenue this month"
  },
  {
    title: "Page Views",
    value: "234,567",
    change: "-2.1%",
    changeType: "decrease",
    icon: Eye,
    description: "Total page views this month"
  },
  {
    title: "Active Sessions",
    value: "1,234",
    change: "+5.4%",
    changeType: "increase",
    icon: Activity,
    description: "Currently active sessions"
  }
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center space-x-2 text-xs">
              <Badge 
                variant={stat.changeType === "increase" ? "default" : "destructive"}
                className="flex items-center space-x-1"
              >
                {stat.changeType === "increase" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{stat.change}</span>
              </Badge>
              <span className="text-muted-foreground">from last month</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
