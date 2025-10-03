import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'

export const Home = () => {
  const navigate = useNavigate()

  const handleOpenCatalog = () => {
    navigate('/catalog')
  }

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
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
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-6 text-center space-y-12 relative z-10">

        {/* Верхняя часть с анимацией */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.div
            animate={{
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
          </motion.div>

          <motion.h1
            className="text-6xl font-serif font-light text-foreground tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Добро пожаловать
          </motion.h1>

          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-border" />
            <motion.p
              className="text-foreground/70 text-lg font-light text-center max-w-md leading-relaxed"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              «Посещайте много хороших книг, но живите Библией»
            </motion.p>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-border" />
          </motion.div>
          
          <motion.p
            className="text-foreground/50 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Чарльз Сперджен
          </motion.p>
        </motion.div>

        {/* Центральная кнопка */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              size="lg"
              onClick={handleOpenCatalog}
              className="text-lg rounded-xl px-12 py-6 !bg-primary !text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
            >
              <motion.span 
                className="flex items-center gap-2"
                whileHover={{ gap: "12px" }}
                transition={{ duration: 0.2 }}
              >
                Открыть каталог
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Нижняя часть */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="space-y-2"
        >
          <motion.p
            className="text-muted-foreground text-sm tracking-widest uppercase font-medium"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Христианская литература
          </motion.p>
          
          <motion.div
            className="w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          />
          
          <motion.p
            className="text-muted-foreground/70 text-xs"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.4
            }}
          >
            Духовное наследие
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}