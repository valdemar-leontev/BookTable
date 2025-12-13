import { useTheme } from "@/components/theme-provider"
import { Moon, Lightbulb, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import logo from '../../assets/image.png'
import { useUserStore } from "@/stores/UserStore"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { user, clearUser } = useUserStore()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const handleLogout = () => {
    clearUser()
    // Дополнительная логика выхода если нужно
    console.log('User logged out')
  }

  // Получаем инициалы для аватара
  const getUserInitials = () => {
    if (!user) return "?"
    const first = user.firstName?.[0] || ""
    const last = user.lastName?.[0] || ""
    return (first + last).toUpperCase() || user.userName?.[0]?.toUpperCase() || "U"
  }

  // Получаем полное имя
  const getUserFullName = () => {
    if (!user) return "Гость"
    return `${user.firstName} ${user.lastName || ""}`.trim()
  }

  return (
    <header className="px-4 py-3 border-b border-border/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Логотип и название */}
        <div className="flex items-center gap-5">
          <img src={logo} className="w-10 h-8" />
          <div>
            <h1 className="text-xl font-light !text-foreground">
              Книжный стол
            </h1>
            <p className="text-xs !text-muted-foreground">
              {theme === "light" ? "Вы свет миру" : "Свет во тьме светит"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Индикатор пользователя */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 h-9 px-3 rounded-full hover:bg-accent transition-all duration-200 group"
              >
                <div className="relative">
                  <Avatar className="h-7 w-7 border border-border/50">
                    {user?.photoUrl ? (
                      <AvatarImage src={user.photoUrl} alt={user.userName} />
                    ) : null}
                    <AvatarFallback className={theme === "light" ? "bg-amber-100 text-amber-700" : "bg-blue-900/30 text-blue-300"}>
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-background ${user ? "bg-green-500" : "bg-yellow-500"}`} />
                </div>

                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium !text-foreground leading-tight">
                    {getUserFullName()}
                  </p>
                  <p className="text-xs !text-muted-foreground leading-tight">
                    {user ? `@${user.userName}` : "Не авторизован"}
                  </p>
                </div>

                <User className="h-3.5 w-3.5 ml-1 !text-muted-foreground group-hover:!text-foreground transition-colors" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{getUserFullName()}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user ? `ID: ${user.telegramId}` : "Гость"}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <div className="px-2 py-1.5 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Статус:</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${user ? "bg-green-500/20 text-green-600" : "bg-yellow-500/20 text-yellow-600"}`}>
                    {user ? "Активен" : "Гость"}
                  </span>
                </div>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Выйти</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Переключатель темы */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={`h-9 w-9 rounded-full transition-all duration-300 hover:scale-105 ${theme === "light"
              ? "!bg-amber-100 text-amber-600 hover:bg-amber-200"
              : "!bg-blue-900/30 text-blue-300 hover:bg-blue-900/50"
              }`}
            aria-label={theme === "light" ? "Переключить на темную тему" : "Переключить на светлую тему"}
          >
            {theme === "light" ? (
              <Lightbulb className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}