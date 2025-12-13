// types/book.ts

// Пользователь церкви
export interface ChurchUser {
  id: number
  telegramId: number
  username: string
  firstName: string
  lastName: string
  phoneNumber: string
}

// Церковь
export interface Church {
  id: number
  name: string
  address: string
  user: ChurchUser
}

// Жанр
export interface Genre {
  id: number
  name: string
  description: string
}

// Сток (наличие в церкви)
export interface Stock {
  id: number
  quantity: number
  bookId: number
  church: Church
}

// Основная модель книги
export interface Book {
  id: number
  title: string
  author: string
  genre: Genre
  publishYear: number
  description: string
  price: number
  stocks: Stock[]
  photos: { id: number; url: string; }[]
  liked: boolean;
}

// Пропсы для компонента BookItem
export interface BookItemProps {
  book: Book
  showDetails?: boolean
  onAddToCart?: (book: Book) => void
  onToggleFavorite?: (book: Book) => void
  isFavorite?: boolean
  currentUserId?: number
  className?: string
}