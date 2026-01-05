import { Home, Heart, BookOpen, CircleQuestionMarkIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

type NavItem = 'home' | 'favorite' | 'catalog' | 'cart'

export const NavBar = () => {
  const location = useLocation()
  const [_, setActiveIndex] = useState(0)
  const [indicatorStyle, setIndicatorStyle] = useState({})
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([])

  const navItems = [
    { id: 'home' as NavItem, icon: Home, label: 'Главная', path: '/' },
    { id: 'catalog' as NavItem, icon: BookOpen, label: 'Каталог', path: '/catalog' },
    { id: 'favorite' as NavItem, icon: Heart, label: 'Избранное', path: '/favorites' },
    { id: 'faq' as NavItem, icon: CircleQuestionMarkIcon, label: 'Вопросы', path: '/faq' },
  ]

  const isActive = (path: string) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path))

  // Обновляем позицию индикатора при изменении активного таба
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => isActive(item.path))
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex)
      updateIndicatorPosition(currentIndex)
    }
  }, [location.pathname])

  const updateIndicatorPosition = (index: number) => {
    const element = itemsRef.current[index]
    if (element) {
      const { offsetLeft, offsetWidth } = element
      setIndicatorStyle({
        transform: `translateX(${offsetLeft}px)`,
        width: `${offsetWidth - 7}px`,
      })
    }
  }

  const handleItemClick = (index: number) => {
    setActiveIndex(index)
    updateIndicatorPosition(index)
  }

  return (
    <nav className="px-5 py-3 safe-area-bottom">
      <div className="flex justify-between items-center max-w-md mx-auto bg-background rounded-2xl shadow-sm border p-1 relative">
        {/* Анимированный индикатор */}
        <div
          className={cn(
            "absolute h-full bg-accent/20 rounded-xl transition-all duration-700 ease-out-back",
            "border border-accent/30 shadow-xs"
          )}
          style={indicatorStyle}
        />

        {navItems.map((item, index) => {
          const Icon = item.icon
          const active = isActive(item.path)

          return (
            <Link
              key={item.id}
              to={item.path}
              ref={el => itemsRef.current[index] = el as any}
              onClick={() => handleItemClick(index)}
              className={cn(
                "flex flex-col items-center p-3 rounded-xl transition-all duration-300 relative z-10 flex-1",
                "hover:scale-105 active:scale-95",
                active
                  ? "!text-accent"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <Icon className="h-4 w-4 mb-1 transition-transform duration-300" />
              <span className="text-[12px] font-medium transition-all duration-300">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}