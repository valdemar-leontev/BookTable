import { useState } from 'react'
import { Search, Grid, List, Filter, ChevronDown, ShoppingCart, ImageIcon, ArrowLeft, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from "@/components/ui/slider"
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

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
  }
]

// Компонент детального просмотра книги
const BookDetail = ({ book, isOpen, onClose, onAddToCart }: any) => {
  const [selectedImage, _] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  if (!book) return null

  const images = book.additionalImages && book.additionalImages.length > 0 
    ? [book.image, ...book.additionalImages] 
    : [book.image]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price)
  }

  const handleAddToCart = () => {
    onAddToCart(book)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-xl z-50"
          />
          
          {/* Main Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 xl:inset-20 z-50 overflow-hidden"
          >
            <div className="w-full h-full bg-background/95 backdrop-blur-2xl border border-border/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/30 bg-background/50">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
                >
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                </Button>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                    className={cn(
                      "h-10 w-10 rounded-xl transition-all duration-300",
                      isLiked 
                        ? "text-red-500 bg-red-500/10 hover:bg-red-500/20" 
                        : "hover:bg-primary/10 hover:text-primary"
                    )}
                  >
                    <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
                  
                  {/* Left Column - Images */}
                  <div className="space-y-6">
                    {/* Main Image */}
                    <motion.div
                      key={selectedImage}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-muted/30 border border-border/30 relative group"
                    >
                      <img
                        src={images[selectedImage]}
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </motion.div>
                  </div>

                  {/* Right Column - Details */}
                  <div className="space-y-6">
                    {/* Series Badge */}
                    {book.series && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20">
                        <span className="text-sm font-medium uppercase tracking-wide">
                          {book.series}
                        </span>
                      </div>
                    )}

                    {/* Title and Author */}
                    <div className="space-y-3">
                      <h1 className="text-3xl lg:text-4xl font-serif font-light leading-tight">
                        {book.title}
                      </h1>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-lg">{book.author}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    {book.rating && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={cn(
                                "text-lg",
                                i < Math.floor(book.rating!) 
                                  ? "text-amber-400" 
                                  : "text-muted-foreground/30"
                              )}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {book.rating}/5
                        </span>
                      </div>
                    )}

                    {/* Meta Information */}
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <span className="text-primary">📖</span>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Страниц</p>
                          <p className="font-medium">{book.pages || "Не указано"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <span className="text-primary">📅</span>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Год издания</p>
                          <p className="font-medium">{book.year}</p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Описание</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {book.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Теги</h3>
                      <div className="flex flex-wrap gap-2">
                        {book.tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-background border border-border rounded-full text-sm text-muted-foreground hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all duration-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between pt-6 border-t border-border/30">
                      <div className="space-y-1">
                        <div className="text-3xl font-bold text-primary">
                          {formatPrice(book.price)}₽
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {book.quantity}
                        </div>
                      </div>
                      
                      <Button
                        onClick={handleAddToCart}
                        size="lg"
                        className="rounded-xl px-8 py-3 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Основной компонент каталога
export const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'title' | 'year' | 'price'>('title')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [selectedBook, setSelectedBook] = useState<any>(null)

  // Фильтрация книг
  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory
    const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesPrice
  })

  // Сортировка
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    if (sortBy === 'year') return b.year - a.year
    if (sortBy === 'price') return a.price - b.price
    return 0
  })

  // Уникальные категории
  const categories = ['all', ...new Set(mockBooks.map(book => book.category))]

  // Максимальная цена для диапазона
  const maxPrice = Math.max(...mockBooks.map(book => book.price))

  // Форматирование цены
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price)
  }

  // Обработчик добавления в корзину
  const handleAddToCart = (book: any) => {
    console.log('Добавлено в корзину:', book.title)
    // Здесь можно добавить логику добавления в корзину
  }

  return (
    <div className="h-full flex flex-col">
      {/* Заголовок и поиск */}
      <div className="p-6 pb-4 flex-shrink-0">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif font-light mb-6"
        >
          Каталог
        </motion.h1>

        {/* Поисковая строка */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Поиск книг, авторов, серий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 bg-background/80 backdrop-blur-sm border-border/50 rounded-xl transition-all duration-300 focus:border-primary/50"
          />
        </div>

        {/* Фильтры и сортировка */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2 transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
              >
                <Filter className="h-4 w-4" />
                Фильтры
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  showFilters && "rotate-180"
                )} />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2 transition-all duration-300 hover:border-primary/30 focus:border-primary/50"
              >
                <option value="title">По названию</option>
                <option value="year">По году</option>
                <option value="price">По цене</option>
              </select>

              <div className="flex bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg p-1 transition-all duration-300">
                <Button
                  variant={viewMode === 'grid' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0 transition-all duration-300"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0 transition-all duration-300"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Расширенные фильтры */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-background/50 backdrop-blur-sm border border-border/30 rounded-xl p-4 space-y-6 overflow-hidden"
              >
                {/* Категории */}
                <div>
                  <h3 className="text-sm font-medium mb-3 text-foreground">Категории</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                          "transition-all duration-200 whitespace-nowrap",
                          selectedCategory === category
                            ? "bg-primary shadow-lg shadow-primary/25"
                            : "bg-background/80 backdrop-blur-sm hover:bg-background/90 border-border/50"
                        )}
                      >
                        {category === 'all' ? 'Все категории' : category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Диапазон цен */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-foreground">Цена</h3>
                    <span className="text-sm text-muted-foreground bg-background/80 px-3 py-1 rounded-full border border-border/30">
                      {formatPrice(priceRange[0])}₽ - {formatPrice(priceRange[1])}₽
                    </span>
                  </div>

                  <div className="space-y-3">
                    <Slider
                      value={[priceRange[0], priceRange[1]]}
                      min={0}
                      max={maxPrice}
                      step={50}
                      onValueChange={(value) => setPriceRange([value[0], value[1]])}
                      className="py-2"
                    />

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>0₽</span>
                      <span>{formatPrice(maxPrice)}₽</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Результаты с прокруткой */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <motion.div 
          layout
          className={cn(
            "grid gap-6",
            viewMode === 'grid' ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" : "grid-cols-1"
          )}
        >
          {sortedBooks.map((book) => (
            <motion.div
              key={book.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setSelectedBook(book)}
              className={cn(
                "group cursor-pointer transition-all duration-300 hover:scale-105 bg-background/50 backdrop-blur-sm border border-border/30 rounded-xl p-4 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 flex flex-col",
                viewMode === 'list' && "flex-row gap-4 items-start"
              )}
            >
              {/* Обложка книги */}
              <div className={cn(
                "bg-gradient-to-br from-primary/10 to-muted/30 rounded-lg overflow-hidden flex-shrink-0 border border-border/20 mb-3 relative",
                viewMode === 'grid' ? "aspect-[3/4] w-full" : "w-24 aspect-[3/4]"
              )}>
                {book.image ? (
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-2 bg-muted/50">
                    <ImageIcon className="h-6 w-6 text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground text-center font-medium leading-tight">
                      {book.series || book.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Информация о книге */}
              <div className={cn(
                "flex-1 min-w-0 flex flex-col",
                viewMode === 'grid' ? "gap-2" : "gap-3"
              )}>
                {book.series && (
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {book.series}
                  </p>
                )}

                <h3 className={cn(
                  "font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2",
                  viewMode === 'grid' ? "text-sm" : "text-lg"
                )}>
                  {book.title}
                </h3>

                <p className={cn(
                  "text-muted-foreground",
                  viewMode === 'grid' ? "text-xs" : "text-sm"
                )}>
                  {book.author}
                </p>

                {/* Цена и количество */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(book.price)}₽
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {book.quantity}
                    </span>
                  </div>

                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(book)
                    }}
                    className="h-8 w-8 p-0 bg-primary hover:bg-primary/90 transition-transform hover:scale-110"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {book.category}
                  </span>
                  <span className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground rounded-full">
                    {book.year}
                  </span>
                </div>

                {viewMode === 'list' && (
                  <div className="flex flex-wrap gap-1">
                    {book.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-background/80 text-muted-foreground rounded-full border border-border/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

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
              Попробуйте изменить параметры поиска или фильтры
            </p>
          </motion.div>
        )}
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