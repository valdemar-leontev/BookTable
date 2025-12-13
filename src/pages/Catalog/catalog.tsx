import { useState, useEffect, useCallback, useRef } from 'react'
import { Loader2, Filter, Search, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { BookItem } from '@/components/BookItem/BookItem'
import { Filters } from '@/components/Filters/Filters'
import type { Book, Genre } from '@/types/book'

interface BooksResponse {
  content: Book[]
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

interface FilterValues {
  minPrice: number
  maxPrice: number
  minYear: number
  maxYear: number
}

const Catalog = () => {
  // Состояние для книг и загрузки
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Пагинация
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  // Фильтры
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<any>({})
  const [genres, setGenres] = useState<Genre[]>([])
  const [filterValues, setFilterValues] = useState<FilterValues>({
    minPrice: 0,
    maxPrice: 5000,
    minYear: 1900,
    maxYear: new Date().getFullYear()
  })

  // Поиск
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInputValue, setSearchInputValue] = useState('')

  // ID пользователя (временно используем 1)
  const [userId] = useState<number>(1)

  // Состояние для избранных книг
  const [favoriteBooks, setFavoriteBooks] = useState<Set<number>>(new Set())

  // Реф для debounce таймера
  const searchDebounceRef = useRef<any | null>(null)

  // Загрузка начальных данных
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true)

        // Загружаем жанры
        const genresResponse = await fetch('http://localhost:8080/books/genres')
        if (genresResponse.ok) {
          const genresData = await genresResponse.json()
          setGenres(genresData)
        }

        // Загружаем значения фильтров
        const valuesResponse = await fetch('http://localhost:8080/books/filter-values')
        if (valuesResponse.ok) {
          const valuesData = await valuesResponse.json()
          setFilterValues(valuesData)
        }

        // Загружаем первые книги
        await fetchBooks(0, false, {})

      } catch (err) {
        console.error('Ошибка загрузки данных:', err)
        setError('Не удалось загрузить данные')
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  // Функция загрузки избранных книг пользователя
  const loadUserFavorites = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/favorites/users/${userId}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const favorites: Book[] = await response.json()

      // Создаем Set из ID избранных книг для быстрого поиска
      const favoriteIds = new Set(favorites.map(book => book.id))
      setFavoriteBooks(favoriteIds)

    } catch (err) {
      console.error('Ошибка загрузки избранных книг:', err)
      // Не показываем ошибку пользователю, так как это не критично
    }
  }, [userId])

  // Функция загрузки книг с фильтрами
  const fetchBooks = useCallback(async (pageNum: number, isLoadMore: boolean = false, filters: any = {}) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      // Добавляем поиск к фильтрам если есть
      const finalFilters = { ...filters }
      if (searchQuery.trim()) {
        finalFilters.search = searchQuery.trim()
      }

      // Добавляем userId к запросу, чтобы бэкенд мог вернуть поле liked
      const response = await fetch(`http://localhost:8080/books/filter?page=${pageNum}&size=5&userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalFilters)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: BooksResponse = await response.json()
      console.log('Получены книги:', data)

      // Обновляем книги
      if (isLoadMore) {
        setBooks(prev => [...prev, ...data.content])
      } else {
        setBooks(data.content)
      }

      setHasMore(data.hasNext)
      setPage(data.currentPage)
      setError(null)

    } catch (err) {
      console.error('Ошибка загрузки книг:', err)
      if (!isLoadMore) {
        setError('Не удалось загрузить каталог книг')
      }
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [searchQuery, userId])

  // Загружаем избранные книги при первом рендере
  useEffect(() => {
    loadUserFavorites()
  }, [loadUserFavorites])

  // Обработчик изменения поля поиска с debounce
  const handleSearchInputChange = useCallback((value: string) => {
    setSearchInputValue(value)

    // Очищаем предыдущий таймер
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current)
    }

    // Устанавливаем новый таймер на 3 секунды
    searchDebounceRef.current = setTimeout(() => {
      setSearchQuery(value)
    }, 3000)
  }, [])

  // Применение поиска (вручную через Enter или кнопку)
  const handleSearch = useCallback(async () => {
    // Очищаем таймер, если он есть
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current)
    }

    // Применяем поиск немедленно
    setSearchQuery(searchInputValue)
  }, [searchInputValue])

  // Очистка поиска
  const handleClearSearch = async () => {
    // Очищаем таймер
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current)
    }

    setSearchInputValue('')
    setSearchQuery('')
  }

  // Применение фильтров
  const handleApplyFilters = async (filters: any) => {
    setActiveFilters(filters)
    await fetchBooks(0, false, filters)
  }

  // Загрузка больше книг
  const handleLoadMore = async () => {
    if (!loadingMore && hasMore) {
      await fetchBooks(page + 1, true, activeFilters)
    }
  }

  // Обработчик добавления/удаления из избранного
  const handleFavoriteToggle = async (bookId: number, isCurrentlyFavorite: boolean) => {
    try {
      if (isCurrentlyFavorite) {
        // Удаляем из избранного
        const response = await fetch(
          `http://localhost:8080/api/favorites/users/${userId}/books/${bookId}`,
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

        // Обновляем локальное состояние
        setFavoriteBooks(prev => {
          const newSet = new Set(prev)
          newSet.delete(bookId)
          return newSet
        })
      } else {
        // Добавляем в избранное
        const response = await fetch(
          `http://localhost:8080/api/favorites/users/${userId}/books/${bookId}`,
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

        // Обновляем локальное состояние
        setFavoriteBooks(prev => {
          const newSet = new Set(prev)
          newSet.add(bookId)
          return newSet
        })
      }
    } catch (err) {
      console.error('Ошибка при изменении избранного:', err)
      throw err
    }
  }

  // Очищаем таймер при размонтировании
  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current)
      }
    }
  }, [])

  // Автоматически выполняем поиск при изменении searchQuery
  useEffect(() => {
    const applySearch = async () => {
      await fetchBooks(0, false, activeFilters)
    }

    if (searchQuery !== undefined) {
      applySearch()
    }
  }, [searchQuery, fetchBooks, activeFilters])

  if (loading && books.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Загрузка каталога...</p>
        </div>
      </div>
    )
  }

  if (error && books.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive text-lg mb-2">Ошибка</p>
          <p className="text-muted-foreground">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Обновить
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-background border-b border-border shrink-0">
        <div className="container mx-auto px-4">
          {/* Compact Header Row */}
          <div className="flex flex-col justify-between py-4 gap-2">
            {/* Заголовок и счетчик */}
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Каталог книг</h1>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {books.length} {books.length === 1 ? 'книга' : books.length < 5 ? 'книги' : 'книг'}
                </span>
              </div>
            </div>

            {/* Управляющие элементы */}
            <div className="flex items-center gap-2">
              {/* Поиск */}
              <motion.div
                animate={{ width: 250 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Поиск книг..."
                    value={searchInputValue}
                    onChange={(e) => handleSearchInputChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-10 pr-10 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-sm"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  {searchInputValue && (
                    <>
                      <button
                        onClick={handleClearSearch}
                        className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      {/* Индикатор debounce */}
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-border overflow-hidden">
                        <div className="h-full bg-primary animate-pulse"></div>
                      </div>
                    </>
                  )}
                  <button
                    onClick={handleSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>

              {/* Фильтры */}
              <button
                onClick={() => setShowFilters(true)}
                className={cn(
                  "h-10 px-3.5 rounded-lg border flex items-center gap-2 transition-all",
                  Object.keys(activeFilters).length > 0
                    ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-border bg-background hover:bg-muted"
                )}
              >
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium hidden sm:inline">Фильтры</span>
              </button>
            </div>
          </div>

          {/* Активные фильтры */}
          {Object.keys(activeFilters).length > 0 && (
            <div className="flex items-center justify-between pb-3">
              <div className="flex flex-wrap gap-2">
                {activeFilters.genreIds && (
                  <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full flex items-center gap-1.5">
                    <span>Жанры</span>
                    <span className="bg-primary/20 px-1.5 py-0.5 rounded-full text-xs">
                      {activeFilters.genreIds.length}
                    </span>
                  </span>
                )}
                {(activeFilters.minPrice || activeFilters.maxPrice) && (
                  <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    Цена: {activeFilters.minPrice || filterValues.minPrice}₽ – {activeFilters.maxPrice || filterValues.maxPrice}₽
                  </span>
                )}
                {(activeFilters.minYear || activeFilters.maxYear) && (
                  <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    Год: {activeFilters.minYear || filterValues.minYear}–{activeFilters.maxYear || filterValues.maxYear}
                  </span>
                )}
                {activeFilters.inStockOnly && (
                  <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    В наличии
                  </span>
                )}
                {searchQuery && (
                  <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full flex items-center gap-1.5">
                    <Search className="h-3 w-3" />
                    {searchQuery}
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  handleApplyFilters({})
                  handleClearSearch()
                }}
                className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 hover:bg-muted rounded transition-colors whitespace-nowrap"
              >
                Очистить все
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6">
          {books.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-sm mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-lg mb-3">Книги не найдены</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Попробуйте изменить параметры поиска или фильтры
                </p>
                <button
                  onClick={() => setShowFilters(true)}
                  className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm font-medium"
                >
                  Открыть фильтры
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {books.map((book, index) => (
                  <motion.div
                    key={`${book.id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <BookItem
                      book={book}
                      onFavoriteToggle={handleFavoriteToggle}
                      isInitiallyFavorite={favoriteBooks.has(book.id)}
                      userId={userId}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Загрузка...
                      </>
                    ) : (
                      'Загрузить еще'
                    )}
                  </button>
                </div>
              )}

              {/* End of List */}
              {!hasMore && books.length > 0 && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                    Вы просмотрели все книги
                    <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Filters Modal */}
      <Filters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={handleApplyFilters}
        initialFilters={activeFilters}
        genres={genres}
        churches={[]}
        filterValues={filterValues}
      />
    </div>
  )
}

// Вспомогательная функция cn
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default Catalog;