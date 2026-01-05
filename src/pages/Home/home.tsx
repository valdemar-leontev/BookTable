import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react'

// Стихи из Библии
const bibleVerses = [
  { verse: "Ибо так возлюбил Бог мир, что отдал Сына Своего Единородного, дабы всякий верующий в Него, не погиб, но имел жизнь вечную.", location: "Иоанна 3:16" },
  { verse: "Все могу в укрепляющем меня Иисусе Христе.", location: "Филиппийцам 4:13" },
  { verse: "Бог есть любовь, и пребывающий в любви пребывает в Боге, и Бог в нем.", location: "1 Иоанна 4:16" },
  { verse: "Не заботьтесь ни о чем, но всегда в молитве и прошении с благодарением открывайте свои желания пред Богом.", location: "Филиппийцам 4:6" },
  { verse: "Слово Твое - светильник ноге моей и свет стезе моей.", location: "Псалом 118:105" },
  { verse: "Надейся на Господа всем сердцем твоим, и не полагайся на разум твой.", location: "Притчи 3:5" },
  { verse: "Любовь долготерпит, милосердствует, любовь не завидует, любовь не превозносится, не гордится.", location: "1 Коринфянам 13:4" },
]

// Дополнительные цитаты о Библии
const bibleQuotes = [
  { quote: "Библия - это Бог, говорящий к человеку.", author: "Августин Гиппонский" },
  { quote: "Библия стоит всех других книг.", author: "Патрик Генри" },
  { quote: "Величайший дар, который Бог дал человеку, - это Библия.", author: "Авраам Линкольн" }
]

// Объединяем все цитаты в один массив
const allQuotes = [...bibleVerses.map(v => ({
  text: v.verse,
  author: v.location,
  type: 'verse'
})), ...bibleQuotes.map(q => ({
  text: q.quote,
  author: q.author,
  type: 'quote'
}))]

export const Home = () => {
  const navigate = useNavigate()
  const [randomQuote, setRandomQuote] = useState<{ text: string, author: string, type: string } | null>(null)

  useEffect(() => {
    // Выбираем случайную цитату при загрузке компонента
    const randomIndex = Math.floor(Math.random() * allQuotes.length)
    setRandomQuote(allQuotes[randomIndex])
  }, [])

  const handleOpenCatalog = () => {
    navigate('/catalog')
  }

  return (
    <div className="h-full flex items-center justify-center p-6">
      <motion.div
        className="max-w-md mx-auto text-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Иконка и заголовок */}
        <div className="space-y-3">
          <BookOpen className="h-14 w-14 text-primary mx-auto" />
          <div>
            <h1 className="text-2xl font-serif font-semibold text-foreground">
              Книжный стол
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Христианская библиотека
            </p>
          </div>
        </div>

        {/* Цитата */}
        <div className="space-y-4">
          <div className="px-4 py-6 rounded-xl bg-card border shadow-sm">
            <p className="text-base font-light leading-relaxed text-foreground">
              {randomQuote ? `"${randomQuote.text}"` : '«Посещайте много хороших книг, но живите Библией»'}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-border" />
            <p className="text-sm text-muted-foreground">
              {randomQuote ? randomQuote.author : 'Чарльз Сперджен'}
            </p>
            <div className="h-px w-8 bg-border" />
          </div>
        </div>

        {/* Кнопка */}
        <div>
          <Button
            size="lg"
            variant="outline"
            onClick={handleOpenCatalog}
            className="rounded-full px-8 py-6 !text-primary font-medium shadow-md hover:shadow-lg transition-shadow !bg-background"
          >
            <span className="flex items-center gap-2">
              Открыть каталог
              <ArrowRight className="h-4 w-4" />
            </span>
          </Button>
        </div>

        {/* Подпись */}
        <div className="pt-4">
          <p className="text-xs text-muted-foreground/70">
            Духовное наследие в ваших руках
          </p>
        </div>
      </motion.div>
    </div>
  )
}