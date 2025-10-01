import { useNavigationStore } from '@/stores/navigation-store'
import { Button } from '@/components/ui/button'

export const Home = () => {
  const { setActiveTab } = useNavigationStore()

  return (
    <>
      {/* Инлайновое подключение шрифтов */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <div
        className="h-full grid grid-rows-[auto_1fr_auto] items-center px-6 py-8 relative overflow-hidden"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Фоновое свечение */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Верхняя часть */}
        <div className="text-center relative z-10">
          <h1
            className="text-5xl text-foreground mb-6 tracking-wide relative"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Добро пожаловать
            <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-xl opacity-50 -z-10 animate-pulse" />
          </h1>

          <div className="w-20 h-px bg-foreground/30 mx-auto mb-2 relative">
            <div className="absolute inset-0 bg-primary/20 blur-sm" />
          </div>

          <p className="text-foreground/60 text-sm tracking-wider">
            ЧТЕНИЕ • ЗНАНИЕ • МУДРОСТЬ
          </p>
        </div>

        {/* Центральная часть */}
        <div className="flex items-center justify-center relative z-10 mt-8">
          <Button
            variant="outline"
            size="lg"
            className="group relative border-foreground/20 bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/20 hover:via-primary/40 hover:to-primary/20 transition-all duration-500 text-2xl font-[Playfair Display] font-semibold tracking-wider rounded-3xl px-14 py-6 shadow-lg hover:shadow-xl transform hover:scale-105"
            onClick={() => setActiveTab('catalog')}
          >
            <span className="relative z-10">Открыть каталог</span>
            {/* Мягкое подсвечивание */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
          </Button>
        </div>

        {/* Нижняя часть */}
        <div className="text-center relative z-10">
          <p className="text-muted-foreground text-xs tracking-widest uppercase">
            Христианская литература
          </p>
          <p className="text-muted-foreground/70 text-xs mt-2">
            Духовное наследие
          </p>
        </div>
      </div>
    </>
  )
}
