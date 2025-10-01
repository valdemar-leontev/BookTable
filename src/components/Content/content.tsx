import { Cart } from '@/pages/Cart/cart'
import { Catalog } from '@/pages/Catalog/catalog'
import { Home } from '@/pages/Home/home'
import { Search } from '@/pages/Search/search'
import { useNavigationStore } from '@/stores/navigation-store'
import { motion, AnimatePresence } from 'framer-motion'

export const Content = () => {
  const { activeTab } = useNavigationStore()

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />
      case 'search':
        return <Search />
      case 'catalog':
        return <Catalog />
      case 'cart':
        return <Cart />
      default:
        return <Home />
    }
  }

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
        <motion.div
          key={activeTab}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="h-full w-full"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}