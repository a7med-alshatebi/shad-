import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "2,543",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+8%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "1,234",
    change: "-3%",
    changeType: "negative" as const,
    icon: ShoppingCart,
  },
  {
    title: "Growth Rate",
    value: "23.5%",
    change: "+15%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
