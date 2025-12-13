// components/Content/content.tsx
import { Routes, Route, useLocation } from 'react-router-dom'
import { Cart } from '@/pages/Cart/cart'
import { Home } from '@/pages/Home/home'
import { motion, AnimatePresence } from 'framer-motion'
import { Catalog } from '@/pages/Catalog/Catalog'
import { Favorites } from '@/pages/Favorite/Favorite'


export const Content = () => {
  const location = useLocation()

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 1.1,
      rotateY: 15,
      y: 30,
      filter: "blur(10px) brightness(1.5)",
    },
    in: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      y: 0,
      filter: "blur(0px) brightness(1)",
    },
    out: {
      opacity: 0,
      scale: 0.9,
      rotateY: -15,
      y: -30,
      filter: "blur(10px) brightness(0.5)",
    }
  }

  const pageTransition = {
    type: "spring" as const,
    stiffness: 350,
    damping: 32,
    mass: 1.5
  }

  return (
    <main className="flex-1 overflow-hidden h-full relative">
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="h-full w-full"
            >
              <Home />
            </motion.div>
          } />

          <Route path="/favorites" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="h-full w-full"
            >
              <Favorites />
            </motion.div>
          } />

          <Route path="/catalog" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="h-full w-full"
            >
              <Catalog />
            </motion.div>
          } />

          <Route path="/cart" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="h-full w-full"
            >
              <Cart />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
    </main>
  )
}