import { Home, Search, BookOpen, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useNavigationStore } from '@/stores/navigation-store'

type NavItem = 'home' | 'search' | 'catalog' | 'cart'

export const NavBar = () => {
  const { activeTab, setActiveTab } = useNavigationStore()

  const navItems = [
    { id: 'home' as NavItem, icon: Home, label: 'Home' },
    { id: 'search' as NavItem, icon: Search, label: 'Search' },
    { id: 'catalog' as NavItem, icon: BookOpen, label: 'Catalog' },
    { id: 'cart' as NavItem, icon: ShoppingCart, label: 'Cart' },
  ]

  const handleTabClick = (tabId: NavItem) => {
    setActiveTab(tabId)
  }

  return (
    <nav className="bg-background/80 backdrop-blur-md border-t border-border px-4 py-3">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "flex flex-col h-auto p-3 space-y-1 transition-all duration-150 relative !bg-transparent",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
              onClick={() => handleTabClick(item.id)}
            >
              {isActive && (
                <div className="absolute top-0 w-1 h-1 bg-accent rounded-full" />
              )}

              <Icon
                className={cn(
                  "!h-6 !w-6 !transition-all !duration-150",
                  isActive
                    ? "scale-110 stroke-accent"
                    : "scale-100 stroke-current"
                )}
              />
              <span className={cn(
                "text-xs transition-all duration-150",
                isActive ? "font-bold text-accent" : "font-medium"
              )}>
                {item.label}
              </span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}