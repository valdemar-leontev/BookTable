// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/pagination'
// @ts-ignore
import 'swiper/css/navigation'
// @ts-ignore
import 'swiper/css/thumbs'
// @ts-ignore
import 'swiper/css/free-mode'

import { ThemeProvider } from "@/components/theme-provider"
import { Header } from './components/Header/header'
import { Content } from './components/Content/content'
import { NavBar } from './components/NavBar/NavBar'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='h-screen flex flex-col'>
        <div className="grid grid-rows-[auto_1fr_auto] h-full">
          <Header />

          <Content />

          <NavBar />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App