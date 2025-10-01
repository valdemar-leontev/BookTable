import { Moon, Sun, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    // Используем requestAnimationFrame для плавного переключения
    requestAnimationFrame(() => {
      setTheme(theme === "light" ? "dark" : "light")
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "relative group h-10 w-10 rounded-full transition-all duration-500 hover:scale-110",
        theme === "light"
          ? "bg-amber-100 hover:bg-amber-200 text-amber-600"
          : "bg-blue-900/30 hover:bg-blue-800/50 text-blue-300"
      )}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

      <Lightbulb className="absolute h-5 w-5 scale-0 transition-all group-hover:scale-100" />

      <span className="sr-only">Переключить тему</span>
    </Button>
  )
}