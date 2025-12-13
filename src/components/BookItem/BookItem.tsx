// components/BookItem/BookItem.tsx
import { useState, useEffect } from 'react'
import {
  MapPin,
  Calendar,
  User,
  Tag,
  BookOpen,
  ZoomIn,
  X,
  ArrowLeft,
  ArrowRight,
  Heart
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

// Swiper для галереи изображений
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Thumbs, FreeMode } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import type { Book } from '@/types/book'

interface BookItemProps {
  book: Book
  className?: string
  onFavoriteToggle?: (bookId: number, isCurrentlyFavorite: boolean) => Promise<void>
  isInitiallyFavorite?: boolean
  showFavoriteButton?: boolean
  userId?: number
}

export const BookItem = ({
  book,
  className,
  onFavoriteToggle,
  isInitiallyFavorite = false,
  showFavoriteButton = true,
  userId = 1 // Заглушка, заменить на реальный ID из контекста
}: BookItemProps) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(isInitiallyFavorite)
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)

  // Синхронизируем состояние избранного с пропсом
  useEffect(() => {
    setIsFavorite(isInitiallyFavorite)
  }, [isInitiallyFavorite])

  // Форматирование цены
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price)
  }

  // Общее количество в наличии
  const getTotalStock = () => {
    return book.stocks.reduce((total, stock) => total + stock.quantity, 0)
  }

  // Церкви, где книга есть в наличии
  const getAvailableChurches = () => {
    return book.stocks.filter(stock => stock.quantity > 0)
  }

  // Открытие детального просмотра
  const openDetails = () => {
    setSelectedBook(book)
  }

  // Закрытие детального просмотра
  const closeDetails = () => {
    setSelectedBook(null)
  }

  // Открытие полноэкранного просмотра изображения
  const openFullscreen = (index: number) => {
    setFullscreenImageIndex(index)
    setIsFullscreen(true)
  }

  // Закрытие полноэкранного просмотра
  const closeFullscreen = () => {
    setIsFullscreen(false)
  }

  // Обработчик добавления/удаления из избранного
  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFavoriteLoading) return

    try {
      setIsFavoriteLoading(true)

      if (onFavoriteToggle) {
        // Используем кастомный обработчик, если передан
        await onFavoriteToggle(book.id, isFavorite)
        setIsFavorite(!isFavorite)
      } else {
        // Иначе используем стандартный API
        if (isFavorite) {
          // Удаляем из избранного
          await removeFromFavorites()
        } else {
          // Добавляем в избранное
          await addToFavorites()
        }
      }

    } catch (error) {
      console.error('Ошибка при изменении избранного:', error)
    } finally {
      setIsFavoriteLoading(false)
    }
  }

  // Добавить в избранное
  const addToFavorites = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/favorites/users/${userId}/books/${book.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      setIsFavorite(true)
      return await response.json()
    } catch (error) {
      console.error('Ошибка добавления в избранное:', error)
      throw error
    }
  }

  // Удалить из избранного
  const removeFromFavorites = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/favorites/users/${userId}/books/${book.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      setIsFavorite(false)
      return await response.json()
    } catch (error) {
      console.error('Ошибка удаления из избранного:', error)
      throw error
    }
  }

  // Компактный вид карточки
  const renderCompactCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onClick={openDetails}
      className={cn(
        "cursor-pointer bg-background border border-border rounded-xl p-4 flex flex-col group relative overflow-hidden",
        className
      )}
    >
      {/* Кнопка избранного */}
      {showFavoriteButton && (
        <button
          onClick={handleFavoriteClick}
          disabled={isFavoriteLoading}
          className={cn(
            "absolute top-2 right-2 z-10 p-1.5 rounded-full bg-background/80 backdrop-blur-sm transition-all",
            "hover:scale-110 active:scale-95 shadow-sm",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isFavorite
              ? "text-red-500 hover:bg-red-50 hover:text-red-600"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-all",
              isFavorite && "fill-current"
            )}
          />
        </button>
      )}

      {/* Обложка книги */}
      <div className="aspect-[3/4] w-full bg-gradient-to-br from-primary/5 to-muted/20 rounded-lg overflow-hidden mb-4 border border-border/30 relative">
        {book.photos && book.photos.length > 0 ? (
          <>
            <img
              src={book.photos[0].url}
              alt={book.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/30">
            <BookOpen className="h-10 w-10 text-muted-foreground/50" />
          </div>
        )}
      </div>

      {/* Информация о книге */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-semibold leading-tight line-clamp-2 mb-1 group-hover:text-primary transition-colors">
          {book.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
          {book.author}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-muted-foreground">
            {book.publishYear}
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/30">
          <div>
            <div className="text-lg font-bold text-primary">
              {formatPrice(book.price)}₽
            </div>
            <div className="text-xs text-muted-foreground">
              {getTotalStock()} в наличии
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  // Детальный просмотр (модалка)
  const renderDetailsModal = () => (
    <AnimatePresence>
      {selectedBook && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDetails}
            className="fixed inset-0 bg-background/80 backdrop-blur-xl z-[1000]"
          />

          {/* Main Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[1001] overflow-hidden"
          >
            <div className="w-full h-full bg-background/95 backdrop-blur-2xl border border-border/50 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/30 bg-background/50 flex-shrink-0">
                <button
                  onClick={closeDetails}
                  className="h-10 w-10 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-300 group flex items-center justify-center"
                >
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1 text-primary" />
                </button>

                {/* Кнопка избранного в модалке */}
                {showFavoriteButton && (
                  <button
                    onClick={handleFavoriteClick}
                    disabled={isFavoriteLoading}
                    className={cn(
                      "h-10 px-4 rounded-xl flex items-center gap-2 transition-all duration-300",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      isFavorite
                        ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    )}
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4 transition-all",
                        isFavorite && "fill-current"
                      )}
                    />
                    <span className="text-sm font-medium">
                      {isFavorite ? 'В избранном' : 'В избранное'}
                    </span>
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-4 md:p-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Images Gallery */}
                  <div className="space-y-4">
                    {/* Main Swiper */}
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-muted/30 border border-border/30 relative">
                      {book.photos && book.photos.length > 0 ? (
                        <Swiper
                          pagination={{ type: 'progressbar' }}
                          navigation={true}
                          thumbs={{ swiper: thumbsSwiper }}
                          modules={[Pagination, Navigation, Thumbs]}
                          className="h-full"
                        >
                          {book.photos.map((image, index) => (
                            <SwiperSlide key={index}>
                              <div
                                className="w-full h-full flex items-center justify-center cursor-zoom-in"
                                onClick={() => openFullscreen(index)}
                              >
                                <img
                                  src={image.url}
                                  alt={`${book.title} ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted/30">
                          <BookOpen className="h-16 w-16 text-muted-foreground/50" />
                        </div>
                      )}

                      {/* Zoom Button */}
                      {book.photos && book.photos.length > 0 && (
                        <button
                          onClick={() => openFullscreen(0)}
                          className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 text-foreground flex items-center justify-center hover:bg-background hover:scale-105 transition-all duration-200 shadow-lg"
                        >
                          <ZoomIn className="h-5 w-5" />
                        </button>
                      )}
                    </div>

                    {/* Thumbnails */}
                    {book.photos && book.photos.length > 1 && (
                      <div className="px-2">
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          watchSlidesProgress
                          freeMode={true}
                          slidesPerView={4}
                          spaceBetween={12}
                          modules={[FreeMode, Thumbs]}
                          className="thumbnails-swiper"
                        >
                          {book.photos.map((image, index) => (
                            <SwiperSlide key={index}>
                              <div
                                className={cn(
                                  "aspect-[3/4] rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200",
                                  thumbsSwiper?.activeIndex === index
                                    ? "border-primary shadow-lg shadow-primary/25 scale-105"
                                    : "border-border/30 hover:border-primary/50"
                                )}
                                onClick={() => openFullscreen(index)}
                              >
                                <img
                                  src={image.url}
                                  alt={`${book.title} ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Details */}
                  <div className="space-y-6">
                    {/* Genre Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20">
                      <Tag className="h-3 w-3" />
                      <span className="text-sm font-medium uppercase tracking-wide">
                        {book.genre.name}
                      </span>
                    </div>

                    {/* Title and Author */}
                    <div className="space-y-3">
                      <h1 className="text-3xl lg:text-4xl font-serif font-light leading-tight">
                        {book.title}
                      </h1>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span className="text-lg">{book.author}</span>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-muted-foreground">Год издания</p>
                          <p className="font-medium">{book.publishYear}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-sm">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-muted-foreground">В наличии</p>
                          <p className="font-medium">{getTotalStock()} шт</p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Описание</h3>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {book.description}
                      </p>
                    </div>

                    {/* Available in Churches */}
                    {getAvailableChurches().length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Доступно в церквях</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {getAvailableChurches().map((stock) => (
                            <div
                              key={stock.id}
                              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50"
                            >
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">
                                  {stock.church.name}
                                </p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                  <MapPin className="h-3 w-3" />
                                  <span className="truncate">{stock.church.address}</span>
                                </p>
                              </div>
                              <div className="text-sm font-semibold text-primary ml-2">
                                {stock.quantity} шт
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center justify-between pt-6 border-t border-border/30">
                      <div className="space-y-1">
                        <div className="text-3xl font-bold text-primary">
                          {formatPrice(book.price)}₽
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Всего в наличии: {getTotalStock()} шт
                        </div>
                      </div>
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

  // Fullscreen Image Modal
  const renderFullscreenModal = () => (
    <AnimatePresence>
      {isFullscreen && book.photos && book.photos.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullscreen}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[2000]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[2001] flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/20 backdrop-blur-sm rounded-full border border-border/50 text-foreground flex items-center justify-center hover:bg-background/40 hover:scale-105 transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Navigation Buttons */}
            {book.photos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setFullscreenImageIndex(prev =>
                      prev > 0 ? prev - 1 : book.photos.length - 1
                    )
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-background/20 backdrop-blur-sm rounded-full border border-border/50 text-foreground flex items-center justify-center hover:bg-background/40 hover:scale-105 transition-all duration-200"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setFullscreenImageIndex(prev =>
                      prev < book.photos.length - 1 ? prev + 1 : 0
                    )
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-background/20 backdrop-blur-sm rounded-full border border-border/50 text-foreground flex items-center justify-center hover:bg-background/40 hover:scale-105 transition-all duration-200"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-background/20 backdrop-blur-sm rounded-full px-3 py-1 border border-border/50 text-sm text-foreground">
              {fullscreenImageIndex + 1} / {book.photos.length}
            </div>

            {/* Fullscreen Image */}
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={book.photos[fullscreenImageIndex].url}
                alt={`${book.title} ${fullscreenImageIndex + 1}`}
                className="max-w-full max-h-full object-contain cursor-zoom-out"
                onClick={closeFullscreen}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {renderCompactCard()}
      {renderDetailsModal()}
      {renderFullscreenModal()}
    </>
  )
}