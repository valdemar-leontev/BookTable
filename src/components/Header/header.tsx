import { useTheme } from "@/components/theme-provider"
import { Moon, Lightbulb, Crown, User as UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import logo from '../../assets/image.png'
import { useUserStore } from "@/stores/UserStore"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { user } = useUserStore()

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light")

  const getShortName = () => {
    if (!user) return "Гость"
    return user.firstName || user.username || "Пользователь"
  }

  const getRoleIcon = () => {
    if (!user?.role) return <UserIcon className="h-3.5 w-3.5" />
    return user.role === 'ADMIN' ? <Crown className="h-3.5 w-3.5" /> : <UserIcon className="h-3.5 w-3.5" />
  }

  return (
    <header className="px-4 py-3 border-b border-border/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-5">
          <img src={logo} className="w-10 h-8" />
          <div>
            <h1 className="text-xl font-light !text-foreground">Книжный стол</h1>
            <p className="text-xs !text-muted-foreground">
              {theme === "light" ? "Вы свет миру" : "Свет во тьме светит"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Просто иконка слева от имени */}
          <div className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 flex items-center gap-2 ${theme === "light"
            ? "bg-amber-50 text-amber-700 border border-amber-100"
            : "bg-blue-900/20 text-blue-300 border border-blue-800/30"
            }`}>
            {getRoleIcon()}
            {getShortName()}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={`h-9 w-9 rounded-full transition-all duration-300 hover:scale-105 ${theme === "light"
              ? "!bg-amber-100 text-amber-600 hover:bg-amber-200"
              : "!bg-blue-900/30 text-blue-300 hover:bg-blue-900/50"
              }`}
          >
            {theme === "light" ? <Lightbulb className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  )
}