import { useState, useEffect, useRef } from 'react'
import { Search, Grid, List, Filter, ShoppingCart, ImageIcon, X, ArrowUp } from 'lucide-react'

import { Slider } from "@/components/ui/slider"
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { BookDetail } from './BookDetail/bookDetail'
import { Button } from '@/components/ui/button'

// Mock данные для христианских книг с полной информацией
const mockBooks = [
  {
    id: 1,
    title: "Любовь основа служения",
    author: "Александр Строк",
    series: "СЛУЖЕНИЕ",
    image: "https://legere.ru/wp-content/uploads/2021/01/lyubov-osnova-sluzheniya-oblozhka.png",
    category: "Служение",
    year: 2023,
    price: 450,
    quantity: "1 шт",
    tags: ["служение", "любовь", "церковь"],
    description: "Эта книга раскрывает библейские принципы служения, основанные на любви и смирении. Автор подробно рассматривает как строить здоровые отношения в церковном служении и сохранять радость в служении другим.",
    pages: 240,
    rating: 4.5,
    additionalImages: [
      "https://legere.ru/wp-content/uploads/2021/01/lyubov-osnova-sluzheniya-oblozhka.png"
    ]
  },
  {
    id: 2,
    title: "Неописуемый",
    author: "Луи Гиглио",
    series: "БОГОСЛОВИЕ",
    image: "https://legere.ru/wp-content/uploads/2021/04/oblozhka-1-6.jpg",
    category: "Богословие",
    year: 2022,
    price: 1600,
    quantity: "1 шт",
    tags: ["богословие", "созерцание", "величие Бога"],
    description: "Глубокое исследование величия и славы Божьей. Книга помогает по-новому увидеть трансцендентность Бога и Его близость к человеку.",
    pages: 320,
    rating: 4.8,
    additionalImages: [
      "https://legere.ru/wp-content/uploads/2021/04/oblozhka-1-6.jpg"
    ]
  },
  {
    id: 7,
    title: "Большая картина",
    author: "Дэвид Хелм",
    series: "ПРОПОВЕДЬ",
    image: "https://legere.ru/wp-content/uploads/2023/11/BK-obl-1.jpg",
    category: "Проповедь",
    year: 2023,
    price: 1350,
    quantity: "1 шт",
    tags: ["проповедь", "библия", "экзегетика"],
    description: "Практическое руководство по библейской проповеди. Автор делится методами работы с текстом и построения проповедей, которые меняют жизни.",
    pages: 280,
    rating: 4.6,
    additionalImages: [
      "https://legere.ru/wp-content/uploads/2023/11/BK-obl-1.jpg"
    ]
  },
  {
    id: 8,
    title: "Все женщины Библии",
    author: "Юлия Газизуллина",
    series: "ИССЛЕДОВАНИЯ",
    image: "https://legere.ru/wp-content/uploads/2025/03/vse-zhen-obl-1.jpg",
    category: "Исследования",
    year: 2023,
    price: 1600,
    quantity: "1 шт",
    tags: ["женщины", "библия", "исследование"],
    description: "Уникальное исследование всех женских образов в Священном Писании. Книга раскрывает роль женщин в библейской истории и их значение для современности.",
    pages: 380,
    rating: 4.7,
    additionalImages: [
      "https://legere.ru/wp-content/uploads/2025/03/vse-zhen-obl-1.jpg"
    ]
  },
  {
    id: 16,
    title: "В единстве с пастырем",
    author: "Мэри Сомервиль",
    series: "ЦЕРКОВЬ",
    image: "https://legere.ru/wp-content/uploads/2021/11/oblozhka-1-10.jpg",
    category: "Церковь",
    year: 2022,
    price: 370,
    quantity: "1 шт",
    tags: ["церковь", "пастырь", "единство"],
    description: "Книга о важности единства в церковной общине и поддержке пастырского служения. Практические советы для здоровых отношений в церкви.",
    pages: 190,
    rating: 4.3,
    additionalImages: [
      "https://legere.ru/wp-content/uploads/2021/11/oblozhka-1-10.jpg"
    ]
  },
  {
    id: 17,
    title: "Дарите им благодать",
    author: "Элис М.",
    series: "ВОСПИТАНИЕ",
    image: "https://legere.ru/wp-content/uploads/2022/09/oblozhka-1.jpg",
    category: "Воспитание",
    year: 2023,
    price: 800,
    quantity: "1 шт",
    tags: ["дети", "благодать", "воспитание"],
    description: "Библейский подход к воспитанию детей через призму Божьей благодати. Книга помогает родителям воспитывать детей в любви и истине.",
    pages: 260,
    rating: 4.5,
    additionalImages: [
      "https://legere.ru/wp-content/uploads/2022/09/oblozhka-1.jpg"
    ]
  },
  {
    id: 1,
    title: "Любовь основа служения",
    author: "Александр Строк",
    series: "СЛУЖЕНИЕ",
    image: "https://legere.ru/wp-content/uploads/2021/01/lyubov-osnova-sluzheniya-oblozhka.png",
    category: "Служение",
    year: 2023,
    price: 450,
    quantity: "1 шт",
    tags: ["служение", "любовь", "церковь"],
    description: "Эта книга раскрывает библейские принципы служения, основанные на любви и смирении. Автор подробно рассматривает как строить здоровые отношения в церковном служении и сохранять радость в служении другим.",
    pages: 240,
    rating: 4.5,
    additionalImages: [
      "https://legere.ru/wp-content/uploads/2021/01/lyubov-osnova-sluzheniya-oblozhka.png"
    ]
  },
  {
    id: 2,
    title: "Неописуемый",
    author: "Луи Гиглио",
    series: "БОГОСЛОВИЕ",
    image: "https://legere.ru/wp-content/uploads/2021/04/oblozhka-1-6.jpg",
    category: "Богословие",
    year: 2022,
    price: 1600,
    quantity: "1 шт",
    tags: ["богословие", "созерцание", "величие Бога"],
    description: "Глубокое исследование величия и славы Божьей. Книга помогает по-новому увидеть трансцендентность Бога и Его близость к человеку.",
    pages: 320,
    rating: 4.8,
    additionalImages: [
      "https://legere.ru/wp-content/uploads/2021/04/oblozhka-1-6.jpg"
    ]
  },
  {
    id: 7,
    title: "Большая картина",
    author: "Дэвид Хелм",
    series: "ПРОПОВЕДЬ",
    image: "https://legere.ru/wp-content/uploads/2023/11/BK-obl-1.jpg",
    category: "Проповедь",
    year: 2023,
    price: 1350,
    quantity: "1 шт",
    tags: ["проповедь", "библия", "экзегетика"],
    description: "Практическое руководство по библейской проповеди. Автор делится методами работы с текстом и построения проповедей, которые меняют жизни.",
    pages: 280,
    rating: 4.6,
    additionalImages: [
      "https://legere.ru/wp-content/uploads/2023/11/BK-obl-1.jpg"
    ]
  },
  {
    id: 8,
    title: "Все женщины Библии",
    author: "Юлия Газизуллина",
    series: "ИССЛЕДОВАНИЯ",
    image: "https://legere.ru/wp-content/uploads/2025/03/vse-zhen-obl-1.jpg",
    category: "Исследования",
    year: 2023,
    price: 1600,
    quantity: "1 шт",
    tags: ["женщины", "библия", "исследование"],
    description: "Уникальное исследование всех женских образов в Священном Писании. Книга раскрывает роль женщин в библейской истории и их значение для современности.",
    pages: 380,
    rating: 4.7,
    additionalImages: [
      "https://legere.ru/wp-content/uploads/2025/03/vse-zhen-obl-1.jpg"
    ]
  },
  {
    id: 16,
    title: "В единстве с пастырем",
    author: "Мэри Сомервиль",
    series: "ЦЕРКОВЬ",
    image: "https://legere.ru/wp-content/uploads/2021/11/oblozhka-1-10.jpg",
    category: "Церковь",
    year: 2022,
    price: 370,
    quantity: "1 шт",
    tags: ["церковь", "пастырь", "единство"],
    description: "Книга о важности единства в церковной общине и поддержке пастырского служения. Практические советы для здоровых отношений в церкви.",
    pages: 190,
    rating: 4.3,
    additionalImages: [
      "https://legere.ru/wp-content/uploads/2021/11/oblozhka-1-10.jpg"
    ]
  },
  {
    id: 17,
    title: "Дарите им благодать",
    author: "Элис М.",
    series: "ВОСПИТАНИЕ",
    image: "https://legere.ru/wp-content/uploads/2022/09/oblozhka-1.jpg",
    category: "Воспитание",
    year: 2023,
    price: 800,
    quantity: "1 шт",
    tags: ["дети", "благодать", "воспитание"],
    description: "Библейский подход к воспитанию детей через призму Божьей благодати. Книга помогает родителям воспитывать детей в любви и истине.",
    pages: 260,
    rating: 4.5,
    additionalImages: [
      "https://legere.ru/wp-content/uploads/2022/09/oblozhka-1.jpg"
    ]
  },
  {
    id: 1,
    title: "Любовь основа служения",
    author: "Александр Строк",
    series: "СЛУЖЕНИЕ",
    image: "https://legere.ru/wp-content/uploads/2021/01/lyubov-osnova-sluzheniya-oblozhka.png",
    category: "Служение",
    year: 2023,
    price: 450,
    quantity: "1 шт",
    tags: ["служение", "любовь", "церковь"],
    description: "Эта книга раскрывает библейские принципы служения, основанные на любви и смирении. Автор подробно рассматривает как строить здоровые отношения в церковном служении и сохранять радость в служении другим.",
    pages: 240,
    rating: 4.5,
    additionalImages: [
      "https://legere.ru/wp-content/uploads/2021/01/lyubov-osnova-sluzheniya-oblozhka.png"
    ]
  },
  {
    id: 2,
    title: "Неописуемый",
    author: "Луи Гиглио",
    series: "БОГОСЛОВИЕ",
    image: "https://legere.ru/wp-content/uploads/2021/04/oblozhka-1-6.jpg",
    category: "Богословие",
    year: 2022,
    price: 1600,
    quantity: "1 шт",
    tags: ["богословие", "созерцание", "величие Бога"],
    description: "Глубокое исследование величия и славы Божьей. Книга помогает по-новому увидеть трансцендентность Бога и Его близость к человеку.",
    pages: 320,
    rating: 4.8,
    additionalImages: [
      "https://legere.ru/wp-content/uploads/2021/04/oblozhka-1-6.jpg"
    ]
  },
  {
    id: 7,
    title: "Большая картина",
    author: "Дэвид Хелм",
    series: "ПРОПОВЕДЬ",
    image: "https://legere.ru/wp-content/uploads/2023/11/BK-obl-1.jpg",
    category: "Проповедь",
    year: 2023,
    price: 1350,
    quantity: "1 шт",
    tags: ["проповедь", "библия", "экзегетика"],
    description: "Практическое руководство по библейской проповеди. Автор делится методами работы с текстом и построения проповедей, которые меняют жизни.",
    pages: 280,
    rating: 4.6,
    additionalImages: [
      "https://legere.ru/wp-content/uploads/2023/11/BK-obl-1.jpg"
    ]
  },
  {
    id: 8,
    title: "Все женщины Библии",
    author: "Юлия Газизуллина",
    series: "ИССЛЕДОВАНИЯ",
    image: "https://legere.ru/wp-content/uploads/2025/03/vse-zhen-obl-1.jpg",
    category: "Исследования",
    year: 2023,
    price: 1600,
    quantity: "1 шт",
    tags: ["женщины", "библия", "исследование"],
    description: "Уникальное исследование всех женских образов в Священном Писании. Книга раскрывает роль женщин в библейской истории и их значение для современности.",
    pages: 380,
    rating: 4.7,
    additionalImages: [
      "https://legere.ru/wp-content/uploads/2025/03/vse-zhen-obl-1.jpg"
    ]
  },
  {
    id: 16,
    title: "В единстве с пастырем",
    author: "Мэри Сомервиль",
    series: "ЦЕРКОВЬ",
    image: "https://legere.ru/wp-content/uploads/2021/11/oblozhka-1-10.jpg",
    category: "Церковь",
    year: 2022,
    price: 370,
    quantity: "1 шт",
    tags: ["церковь", "пастырь", "единство"],
    description: "Книга о важности единства в церковной общине и поддержке пастырского служения. Практические советы для здоровых отношений в церкви.",
    pages: 190,
    rating: 4.3,
    additionalImages: [
      "https://legere.ru/wp-content/uploads/2021/11/oblozhka-1-10.jpg"
    ]
  },
  {
    id: 17,
    title: "Дарите им благодать",
    author: "Элис М.",
    series: "ВОСПИТАНИЕ",
    image: "https://legere.ru/wp-content/uploads/2022/09/oblozhka-1.jpg",
    category: "Воспитание",
    year: 2023,
    price: 800,
    quantity: "1 шт",
    tags: ["дети", "благодать", "воспитание"],
    description: "Библейский подход к воспитанию детей через призму Божьей благодати. Книга помогает родителям воспитывать детей в любви и истине.",
    pages: 260,
    rating: 4.5,
    additionalImages: [
      "https://legere.ru/wp-content/uploads/2022/09/oblozhka-1.jpg"
    ]
  }
]

// Основной компонент каталога
export const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'title' | 'year' | 'price'>('title')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const lastScrollTop = useRef(0)

  // ФИКС: Упрощенный скролл без резких прыжков
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = contentRef.current?.scrollTop || 0

      // Плавное определение состояния хедера
      if (scrollTop > 100 && scrollTop > lastScrollTop.current) {
        setIsHeaderCollapsed(true)
      } else if (scrollTop < 50 || scrollTop < lastScrollTop.current) {
        setIsHeaderCollapsed(false)
      }

      // Стрелка "наверх"
      setShowScrollTop(scrollTop > 300)
      lastScrollTop.current = scrollTop
    }

    const contentElement = contentRef.current
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll, { passive: true })
      return () => contentElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    contentRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Фильтрация и сортировка
  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory
    const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1]
    return matchesSearch && matchesCategory && matchesPrice
  })

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    if (sortBy === 'year') return b.year - a.year
    if (sortBy === 'price') return a.price - b.price
    return 0
  })

  const categories = ['all', ...new Set(mockBooks.map(book => book.category))]
  const maxPrice = Math.max(...mockBooks.map(book => book.price))

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price)
  }

  const handleAddToCart = (book: any) => {
    console.log('Добавлено в корзину:', book.title)
  }

  return (
    <div className="h-full flex flex-col">
      {/* ФИКС: Упрощенный хедер без сложных анимаций */}
      <div className={cn(
        "sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50",
        isHeaderCollapsed && "shadow-sm"
      )}>
        <div className="px-4">
          {/* Первая строка */}
          <div className="flex items-center justify-between py-3">
            <h1 className={cn(
              "font-serif font-light",
              isHeaderCollapsed ? "text-xl" : "text-3xl"
            )}>
              Каталог
            </h1>

            <div className="flex items-center gap-2">
              {/* Кнопка фильтров */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm",
                  showFilters
                    ? "!bg-primary !text-primary-foreground !border-primary"
                    : "!bg-background border-border"
                )}
              >
                <Filter className="h-4 w-4" />
                {!isHeaderCollapsed && <span>Фильтры</span>}
              </motion.button>

              {/* Переключение вида */}
              <div className="flex !bg-background border border-border rounded-lg p-1 !text-background">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "h-8 w-8 flex items-center justify-center rounded",
                    viewMode === 'grid'
                      ? "!bg-primary !text-primary-foreground"
                      : "hover:bg-accent/50 !text-primary"
                  )}
                >
                  <Grid className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "h-8 w-8 flex items-center justify-center rounded",
                    viewMode === 'list'
                      ? "!bg-primary !text-primary-foreground"
                      : "hover:bg-accent/50 !text-primary"
                  )}
                >
                  <List className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Поиск и категории */}
          {!isHeaderCollapsed && (
            <div>
              {/* Поисковая строка */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Поиск книг, авторов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Категории для десктопа */}
              <div className="hidden lg:flex gap-2 flex-wrap mb-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm border",
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border"
                    )}
                  >
                    {category === 'all' ? 'Все' : category}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ФИКС: Стрелка "наверх" с правильным z-index для iOS */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed right-4 bottom-30 z-50"
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              className="w-12 h-12 rounded-full shadow-lg !bg-primary hover:bg-primary/90"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ВЫДВИЖНЫЕ ФИЛЬТРЫ (рабочие) */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-background border-l border-border z-40 overflow-y-auto lg:hidden"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Фильтры</h2>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFilters(false)}
                    className="h-8 w-8 flex items-center justify-center hover:bg-muted rounded"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="font-medium">Сортировка</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="title">По названию</option>
                    <option value="year">По году</option>
                    <option value="price">По цене</option>
                  </select>
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="font-medium">Категории</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg",
                          selectedCategory === category
                            ? "!bg-primary text-primary-foreground"
                            : "!bg-muted/50 hover:bg-muted"
                        )}
                      >
                        {category === 'all' ? 'Все категории' : category}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Цена</h3>
                  <div className="space-y-4">
                    <Slider
                      value={[priceRange[0], priceRange[1]]}
                      min={0}
                      max={maxPrice}
                      step={50}
                      onValueChange={(value) => setPriceRange([value[0], value[1]])}
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>{formatPrice(priceRange[0])}₽</span>
                      <span>{formatPrice(priceRange[1])}₽</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Основной контент */}
      <div
        ref={contentRef}
        className="flex-1 overflow-auto"
        style={{
          // ФИКС: Предотвращаем дергание на iOS
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="max-w-6xl mx-auto p-4">
          {/* Десктопные фильтры для компактного состояния */}
          {isHeaderCollapsed && (
            <div className="hidden lg:block mb-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm border",
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border"
                      )}
                    >
                      {category === 'all' ? 'Все' : category}
                    </motion.button>
                  ))}
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="title">По названию</option>
                  <option value="year">По году</option>
                  <option value="price">По цене</option>
                </select>
              </div>
            </div>
          )}

          {/* Результаты - ФИКС: Упрощенные анимации без scale */}
          <div className={cn(
            "grid gap-4",
            viewMode === 'grid' ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" : "grid-cols-1"
          )}>
            <AnimatePresence mode="popLayout">
              {sortedBooks.map((book) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedBook(book)}
                  className={cn(
                    "cursor-pointer bg-background border border-border rounded-lg p-3 flex flex-col",
                    viewMode === 'list' && "flex-row gap-4 items-start"
                  )}
                >
                  {/* ФИКС: Обложка книги без анимаций */}
                  <div className={cn(
                    "bg-gradient-to-br from-primary/5 to-muted/20 rounded-lg overflow-hidden flex-shrink-0 mb-3 border border-border/30",
                    viewMode === 'grid' ? "aspect-[3/4] w-full" : "w-20 aspect-[3/4]"
                  )}>
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        // ФИКС: Предотвращаем дергание на iOS
                        style={{
                          transform: 'translateZ(0)',
                          backfaceVisibility: 'hidden'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted/30">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Информация о книге */}
                  <div className={cn(
                    "flex-1 min-w-0 flex flex-col",
                    viewMode === 'grid' ? "gap-1" : "gap-2"
                  )}>
                    <h3 className={cn(
                      "font-medium leading-tight line-clamp-2",
                      viewMode === 'grid' ? "text-sm" : "text-base"
                    )}>
                      {book.title}
                    </h3>

                    <p className={cn(
                      "text-muted-foreground",
                      viewMode === 'grid' ? "text-xs" : "text-sm"
                    )}>
                      {book.author}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="text-lg font-bold text-primary">
                        {formatPrice(book.price)}₽
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddToCart(book)
                        }}
                        className="h-7 w-7 flex items-center justify-center bg-primary text-primary-foreground rounded"
                      >
                        <ShoppingCart className="h-3 w-3" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Сообщение если ничего не найдено */}
          {sortedBooks.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">Книги не найдены</p>
              <p className="text-sm text-muted-foreground/70 mt-2">
                Попробуйте изменить параметры поиска
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Компонент детального просмотра */}
      <BookDetail
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}