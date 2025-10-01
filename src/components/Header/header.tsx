import { useTheme } from "@/components/theme-provider"
import { Moon, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import logo from '../../assets/image.png'

export function Header() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header className="p-4 border-b border-border/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Логотип и название */}
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg transition-all duration-500 ${theme === "light"
            ? "text-amber-600"
            : " text-blue-300"
            }`}>
            <img src={logo} className='w-14 h-12' />
          </div>
          <div>
            <h1 className="text-3xl font-light text-foreground tracking-tight">
              Книжный стол
            </h1>
            <p className="text-[14px] text-muted-foreground">
              {theme === "light" ? "Вы свет миру" : "Свет во тьме светит"}
            </p>
          </div>
        </div>

        {/* Переключатель темы */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className={`h-10 w-10 rounded-full transition-all duration-500 hover:scale-110 ${theme === "light"
            ? "bg-amber-100 hover:bg-amber-200 text-amber-600"
            : "bg-blue-900/30 hover:bg-blue-800/50 text-blue-300"
            }`}
        >
          {theme === "light" ? (
            <Lightbulb className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  )
}