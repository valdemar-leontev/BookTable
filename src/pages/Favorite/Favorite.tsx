import { useState, useEffect } from 'react'
import { Loader2, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { BookItem } from '@/components/BookItem/BookItem'
import type { Book } from '@/types/book'

export const Favorites = () => {
  // Состояние для книг и загрузки
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ID пользователя (в реальном приложении брать из контекста/состояния авторизации)
  const [userId] = useState<number>(1) // Заглушка, заменить на реальный ID

  // Загрузка избранных книг
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true)
        
        const response = await fetch(`http://localhost:8080/api/favorites/users/${userId}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Получены избранные книги:', data)
        
        setFavoriteBooks(data)
        setError(null)

      } catch (err) {
        console.error('Ошибка загрузки избранных книг:', err)
        setError('Не удалось загрузить избранные книги')
      } finally {
        setLoading(false)
      }
    }

    loadFavorites()
  }, [userId])

  // Функция для удаления книги из избранного
  const handleRemoveFromFavorites = async (bookId: number) => {
    try {
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

      // Удаляем книгу из локального состояния
      setFavoriteBooks(prev => prev.filter(book => book.id !== bookId))
      
    } catch (err) {
      console.error('Ошибка удаления из избранного:', err)
      alert('Не удалось удалить книгу из избранного')
    }
  }

  // Обновленный обработчик для BookItem
  const handleBookItemFavoriteToggle = async (bookId: number, isCurrentlyFavorite: boolean) => {
    if (isCurrentlyFavorite) {
      await handleRemoveFromFavorites(bookId)
    }
    // Если книга не в избранном, не делаем ничего на этой странице
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Загрузка избранного...</p>
        </div>
      </div>
    )
  }

  if (error && favoriteBooks.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive text-lg mb-2">Ошибка</p>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
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
          <div className="flex items-center justify-between py-4">
            {/* Заголовок и счетчик */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Heart className="h-7 w-7 text-primary" fill="currentColor" />
                <div>
                  <h1 className="text-2xl font-bold">Избранное</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    {favoriteBooks.length} {favoriteBooks.length === 1 ? 'книга' : favoriteBooks.length < 5 ? 'книги' : 'книг'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6">
          {favoriteBooks.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-sm mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Heart className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <p className="text-muted-foreground text-lg mb-3">Избранное пусто</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Добавляйте книги в избранное, нажимая на сердечко на карточке книги
                </p>
                <button
                  onClick={() => window.history.back()}
                  className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm font-medium"
                >
                  Вернуться в каталог
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {favoriteBooks.map((book, index) => (
                  <motion.div
                    key={`${book.id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <BookItem 
                      book={book} 
                      onFavoriteToggle={handleBookItemFavoriteToggle}
                      isInitiallyFavorite={true}
                    />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}