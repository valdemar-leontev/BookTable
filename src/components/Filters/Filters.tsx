// components/Filters/Filters.tsx
import { useState } from 'react'
import {
  Filter,
  X,
  Search,
  ChevronUp,
  ChevronDown,
  Calendar,
  DollarSign,
  Tag,
  Check,
  SortAsc,
  SortDesc,
  ChevronRight
} from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface FiltersProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: any) => void
  initialFilters?: any
  genres: any[]
  churches: any[]
  filterValues: {
    minPrice: number
    maxPrice: number
    minYear: number
    maxYear: number
  }
}

export const Filters = ({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters = {},
  genres = [],
  filterValues
}: FiltersProps) => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>(initialFilters.genreIds || [])
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters.priceRange || [filterValues.minPrice, filterValues.maxPrice]
  )
  const [yearRange, setYearRange] = useState<[number, number]>(
    initialFilters.yearRange || [filterValues.minYear, filterValues.maxYear]
  )
  const [selectedChurches, setSelectedChurches] = useState<number[]>(initialFilters.churchIds || [])
  const [inStockOnly, setInStockOnly] = useState(initialFilters.inStockOnly || false)
  const [searchQuery, setSearchQuery] = useState(initialFilters.search || '')
  const [sortBy, setSortBy] = useState<'title' | 'price' | 'publishYear'>(initialFilters.sortBy || 'title')
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>(initialFilters.sortDirection || 'ASC')

  const [expandedSections, setExpandedSections] = useState({
    genres: true,
    price: true,
    year: true,
    churches: true,
    sort: true
  })

  const [showAllGenres, setShowAllGenres] = useState(false)

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const toggleGenre = (genreId: number) => {
    setSelectedGenres(prev =>
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    )
  }

  const handleApplyFilters = () => {
    const filters = {
      genreIds: selectedGenres.length > 0 ? selectedGenres : undefined,
      minPrice: priceRange[0] > filterValues.minPrice ? priceRange[0] : undefined,
      maxPrice: priceRange[1] < filterValues.maxPrice ? priceRange[1] : undefined,
      minYear: yearRange[0] > filterValues.minYear ? yearRange[0] : undefined,
      maxYear: yearRange[1] < filterValues.maxYear ? yearRange[1] : undefined,
      churchIds: selectedChurches.length > 0 ? selectedChurches : undefined,
      inStockOnly: inStockOnly || undefined,
      search: searchQuery.trim() || undefined,
      sortBy,
      sortDirection
    }
    onApplyFilters(filters)
    onClose()
  }

  const handleResetFilters = () => {
    setSelectedGenres([])
    setPriceRange([filterValues.minPrice, filterValues.maxPrice])
    setYearRange([filterValues.minYear, filterValues.maxYear])
    setSelectedChurches([])
    setInStockOnly(false)
    setSearchQuery('')
    setSortBy('title')
    setSortDirection('ASC')
    setShowAllGenres(false)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
  }

  // Определяем, какие жанры показывать
  const visibleGenres = showAllGenres ? genres : genres.slice(0, 10)
  const hasMoreGenres = genres.length > 10
  const showMoreGenresText = showAllGenres ? 'Показать меньше' : `Показать еще ${genres.length - 10}`

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
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />

          {/* Filters Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background z-50 flex flex-col shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Filter className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Фильтры</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Поиск по названию или автору..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Genres */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('genres')}
                  className="flex items-center justify-between w-full p-3 bg-muted/50 rounded-lg mb-2"
                >
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <span className="font-medium">Жанры</span>
                    {selectedGenres.length > 0 && (
                      <span className="text-xs text-primary">
                        ({selectedGenres.length} выбрано)
                      </span>
                    )}
                  </div>
                  {expandedSections.genres ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedSections.genres && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2 p-2">
                          {visibleGenres.map((genre) => (
                            <button
                              key={genre.id}
                              onClick={() => toggleGenre(genre.id)}
                              className={cn(
                                "flex items-center gap-2 p-2 rounded-lg border text-sm transition-all",
                                selectedGenres.includes(genre.id)
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-background border-border hover:bg-muted"
                              )}
                            >
                              {selectedGenres.includes(genre.id) && (
                                <Check className="h-3 w-3 shrink-0" />
                              )}
                              <span className="truncate">{genre.name}</span>
                            </button>
                          ))}
                        </div>

                        {/* Кнопка "Показать еще" */}
                        {hasMoreGenres && (
                          <button
                            onClick={() => setShowAllGenres(!showAllGenres)}
                            className="w-full flex items-center justify-center gap-1 p-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <span>{showMoreGenresText}</span>
                            <ChevronRight className={cn(
                              "h-4 w-4 transition-transform",
                              showAllGenres ? "rotate-90" : ""
                            )} />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('price')}
                  className="flex items-center justify-between w-full p-3 bg-muted/50 rounded-lg mb-2"
                >
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-medium">Цена</span>
                    {(priceRange[0] > filterValues.minPrice || priceRange[1] < filterValues.maxPrice) && (
                      <span className="text-xs text-primary">
                        {priceRange[0]}₽ - {priceRange[1]}₽
                      </span>
                    )}
                  </div>
                  {expandedSections.price ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedSections.price && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 space-y-4">
                        <Slider
                          value={priceRange}
                          min={filterValues.minPrice}
                          max={filterValues.maxPrice}
                          step={50}
                          onValueChange={(value) => setPriceRange([value[0], value[1]])}
                        />
                        <div className="flex items-center justify-between text-sm">
                          <span>{priceRange[0]}₽</span>
                          <span>{priceRange[1]}₽</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Year Range */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('year')}
                  className="flex items-center justify-between w-full p-3 bg-muted/50 rounded-lg mb-2"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Год издания</span>
                    {(yearRange[0] > filterValues.minYear || yearRange[1] < filterValues.maxYear) && (
                      <span className="text-xs text-primary">
                        {yearRange[0]} - {yearRange[1]}
                      </span>
                    )}
                  </div>
                  {expandedSections.year ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedSections.year && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 space-y-4">
                        <Slider
                          value={yearRange}
                          min={filterValues.minYear}
                          max={filterValues.maxYear}
                          step={1}
                          onValueChange={(value) => setYearRange([value[0], value[1]])}
                        />
                        <div className="flex items-center justify-between text-sm">
                          <span>{yearRange[0]}</span>
                          <span>{yearRange[1]}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* In Stock Only */}
              <div className="mb-6">
                <button
                  onClick={() => setInStockOnly(!inStockOnly)}
                  className="flex items-center justify-between w-full p-3 bg-muted/50 rounded-lg"
                >
                  <span className="font-medium">Только в наличии</span>
                  <div className={cn(
                    "w-10 h-6 rounded-full transition-all",
                    inStockOnly ? "bg-primary" : "bg-muted"
                  )}>
                    <div className={cn(
                      "w-4 h-4 rounded-full bg-white transform transition-transform mt-1",
                      inStockOnly ? "translate-x-5" : "translate-x-1"
                    )} />
                  </div>
                </button>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('sort')}
                  className="flex items-center justify-between w-full p-3 bg-muted/50 rounded-lg mb-2"
                >
                  <div className="flex items-center gap-2">
                    {sortDirection === 'ASC' ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    )}
                    <span className="font-medium">Сортировка</span>
                    <span className="text-xs text-muted-foreground">
                      {sortBy === 'title' && 'По названию'}
                      {sortBy === 'price' && 'По цене'}
                      {sortBy === 'publishYear' && 'По году'}
                    </span>
                  </div>
                  {expandedSections.sort ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedSections.sort && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 p-2">
                        <button
                          onClick={() => setSortBy('title')}
                          className={cn(
                            "w-full text-left p-2 rounded-lg transition-all",
                            sortBy === 'title'
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          )}
                        >
                          По названию
                        </button>
                        <button
                          onClick={() => setSortBy('price')}
                          className={cn(
                            "w-full text-left p-2 rounded-lg transition-all",
                            sortBy === 'price'
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          )}
                        >
                          По цене
                        </button>
                        <button
                          onClick={() => setSortBy('publishYear')}
                          className={cn(
                            "w-full text-left p-2 rounded-lg transition-all",
                            sortBy === 'publishYear'
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          )}
                        >
                          По году издания
                        </button>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => setSortDirection('ASC')}
                            className={cn(
                              "flex-1 p-2 rounded-lg border text-center",
                              sortDirection === 'ASC'
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border hover:bg-muted"
                            )}
                          >
                            По возрастанию
                          </button>
                          <button
                            onClick={() => setSortDirection('DESC')}
                            className={cn(
                              "flex-1 p-2 rounded-lg border text-center",
                              sortDirection === 'DESC'
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border hover:bg-muted"
                            )}
                          >
                            По убыванию
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border flex gap-3">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Сбросить
              </button>
              <button
                onClick={handleApplyFilters}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Применить
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}