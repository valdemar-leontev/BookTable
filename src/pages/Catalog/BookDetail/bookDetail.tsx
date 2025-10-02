import { useState } from 'react'
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, BookOpen, User, Calendar, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface Book {
  id: number
  title: string
  author: string
  series: string
  image: string
  category: string
  year: number
  price: number
  quantity: string
  tags: string[]
  description?: string
  pages?: number
  rating?: number
  additionalImages?: string[]
}

interface BookDetailProps {
  book: Book | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (book: Book) => void
}

export const BookDetail = ({ book, isOpen, onClose, onAddToCart }: BookDetailProps) => {
  const [selectedImage, setSelectedImage] = useState(0)
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
          {/* Backdrop с высоким z-index */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className=" !absolute !inset-0 bg-background/80 backdrop-blur-xl !z-[1000]"
            style={{
              // iOS фикс для z-index
              transform: 'translateZ(0)',
              WebkitTransform: 'translateZ(0)'
            }}
          />

          {/* Main Modal с еще более высоким z-index */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 !z-[1001] overflow-hidden"
            style={{
              // iOS фикс
              transform: 'translateZ(0)',
              WebkitTransform: 'translateZ(0)'
            }}
          >
            <div className="w-full h-full bg-background/95 backdrop-blur-2xl border border-border/50 flex flex-col">

              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/30 bg-background/50 flex-shrink-0">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8 max-h-full">

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

                      {/* Image Navigation */}
                      {images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedImage(index)}
                              className={cn(
                                "w-3 h-3 rounded-full transition-all duration-300 border-2 border-background/80",
                                selectedImage === index
                                  ? "bg-primary scale-125"
                                  : "bg-primary/30 hover:bg-primary/50"
                              )}
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>

                    {/* Thumbnails */}
                    {images.length > 1 && (
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={cn(
                              "flex-shrink-0 w-20 h-28 rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105",
                              selectedImage === index
                                ? "border-primary shadow-lg shadow-primary/25"
                                : "border-border/30 hover:border-primary/50"
                            )}
                          >
                            <img
                              src={image}
                              alt={`${book.title} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column - Details */}
                  <div className="space-y-6">
                    {/* Series Badge */}
                    {book.series && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20">
                        <Tag className="h-3 w-3" />
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
                        <User className="h-4 w-4" />
                        <span className="text-lg">{book.author}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    {book.rating && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-5 w-5",
                                i < Math.floor(book.rating!)
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-muted text-muted-foreground/30"
                              )}
                            />
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
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-muted-foreground">Страниц</p>
                          <p className="font-medium">{book.pages || "Не указано"}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-sm">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Calendar className="h-4 w-4 text-primary" />
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
                        {book.description || "Описание книги скоро будет добавлено..."}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Теги</h3>
                      <div className="flex flex-wrap gap-2">
                        {book.tags.map((tag, index) => (
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