import { Home, Users, Settings, Activity, CreditCard, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
}

const navigation = [
  { name: "Dashboard", href: "#", icon: Home, current: true },
  { name: "Users", href: "#", icon: Users, current: false },
  { name: "Analytics", href: "#", icon: BarChart3, current: false },
  { name: "Activity", href: "#", icon: Activity, current: false },
  { name: "Billing", href: "#", icon: CreditCard, current: false },
  { name: "Settings", href: "#", icon: Settings, current: false },
]

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("flex h-full w-64 flex-col bg-card border-r", className)}>
      <div className="flex flex-1 flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
        </div>
        <nav className="mt-8 flex-1 space-y-1 bg-card px-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                item.current
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              )}
            >
              <item.icon
                className={cn(
                  item.current
                    ? "text-accent-foreground"
                    : "text-muted-foreground group-hover:text-accent-foreground",
                  "mr-3 flex-shrink-0 h-5 w-5"
                )}
                aria-hidden="true"
              />
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
