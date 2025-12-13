import { motion } from 'framer-motion'
import { ShoppingCart, Construction, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export const Cart = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center space-y-8"
      >
        {/* Анимированная иконка */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          <div className="w-32 h-32 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <Construction className="h-16 w-16 text-primary" />
          </div>
          
          {/* Декоративные элементы */}
          <motion.div
            className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <span className="text-xs font-bold">🚧</span>
          </motion.div>
        </motion.div>

        {/* Заголовок и описание */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-serif font-light text-foreground"
          >
            Корзина
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <p className="text-xl text-muted-foreground font-light">
              Раздел в разработке
            </p>
            <p className="text-sm text-muted-foreground/70 max-w-sm mx-auto leading-relaxed">
              Мы активно работаем над созданием удобной корзины для ваших книг. 
              Скоро вы сможете легко добавлять товары и оформлять заказы.
            </p>
          </motion.div>
        </div>

        {/* Прогресс бар */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-2"
        >
          <div className="w-full bg-muted/30 rounded-full h-2">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "65%" }}
              transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-muted-foreground">65% завершено</p>
        </motion.div>

        {/* Кнопки действий */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          <Button
            onClick={() => navigate('/catalog')}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Продолжить покупки
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Обновить страницу
          </Button>
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="pt-8 border-t border-border/30"
        >
          <p className="text-xs text-muted-foreground/60">
            Ожидайте обновления в ближайшее время
          </p>
        </motion.div>
      </motion.div>

      {/* Фоновые декоративные элементы */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </div>
  )
}