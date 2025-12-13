// types/filters.ts
export interface FilterValues {
  minPrice: number
  maxPrice: number
  minYear: number
  maxYear: number
}

export interface FilterState {
  selectedGenres: number[]
  priceRange: [number, number]
  yearRange: [number, number]
  selectedChurches: number[]
  inStockOnly: boolean
  searchQuery: string
  sortBy: 'title' | 'price' | 'publishYear'
  sortDirection: 'ASC' | 'DESC'
}

export interface Genre {
  id: number
  name: string
  description: string
}

export interface Church {
  id: number
  name: string
  address: string
}