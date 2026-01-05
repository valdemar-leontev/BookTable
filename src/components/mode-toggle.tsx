import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

// Стихи из Библии
const bibleVerses = [
  { verse: "Ибо так возлюбил Бог мир, что отдал Сына Своего Единородного, дабы всякий верующий в Него, не погиб, но имел жизнь вечную.", location: "Иоанна 3:16" },
  { verse: "Все могу в укрепляющем меня Иисусе Христе.", location: "Филиппийцам 4:13" },
  { verse: "Бог есть любовь, и пребывающий в любви пребывает в Боге, и Бог в нем.", location: "1 Иоанна 4:16" },
  { verse: "Не заботьтесь ни о чем, но всегда в молитве и прошении с благодарением открывайте свои желания пред Богом.", location: "Филиппийцам 4:6" },
  { verse: "Слово Твое - светильник ноге моей и свет стезе моей.", location: "Псалом 118:105" },
  { verse: "Надейся на Господа всем сердцем твоим, и не полагайся на разум твой.", location: "Притчи 3:5" },
  { verse: "Любовь долготерпит, милосердствует, любовь не завидует, любовь не превозносится, не гордится.", location: "1 Коринфянам 13:4" },
  { verse: "Итак идите, научите все народы, крестя их во имя Отца и Сына и Святого Духа.", location: "Матфея 28:19" },
  { verse: "Сие написал я вам, верующим во имя Сына Божия, дабы вы знали, что вы, веруя в Сына Божия, имеете жизнь вечную.", location: "1 Иоанна 5:13" },
  { verse: "Не бойся, ибо Я с тобою; не смущайся, ибо Я Бог твой; Я укреплю тебя, и помогу тебе, и поддержу тебя десницею правды Моей.", location: "Исаия 41:10" }
]

// Дополнительные цитаты о Библии
const bibleQuotes = [
  { quote: "Библия - это Бог, говорящий к человеку; это Слово Божие, переданное на языке людей.", author: "Августин Гиппонский" },
  { quote: "Библия стоит всех других книг, которые были когда-либо напечатаны.", author: "Патрик Генри" },
  { quote: "Чем больше ты читаешь Библию, и чем больше ты её постигаешь, тем больше ты будешь восхищаться ею.", author: "Георг Вильгельм Фридрих Гегель" },
  { quote: "Библия - это письмо Бога к человечеству, доставленное специальным курьером - Святым Духом.", author: "А. У. Тозер" },
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
    <div className="h-full flex items-center justify-center p-4 bg-gradient-to-br from-amber-50/20 to-transparent">
      <motion.div
        className="max-w-2xl mx-auto px-6 text-center flex flex-col h-full justify-between py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Верхняя часть */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="relative inline-block">
              <BookOpen className="h-12 w-12 text-amber-600 mx-auto" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-amber-500" />
            </div>

            <h1 className="text-3xl font-serif font-light text-foreground">
              Добро пожаловать
            </h1>

            {/* Случайная цитата */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <div className="w-6 h-px bg-amber-200" />
                <p className="text-foreground/80 text-base font-light max-w-md leading-relaxed">
                  {randomQuote ? `«${randomQuote.text}»` : '«Посещайте много хороших книг, но живите Библией»'}
                </p>
                <div className="w-6 h-px bg-amber-200" />
              </div>

              <p className="text-amber-600/80 text-sm font-medium">
                {randomQuote ? randomQuote.author : 'Чарльз Сперджен'}
              </p>
            </div>
          </div>

          {/* Кнопка */}
          <div>
            <Button
              size="lg"
              onClick={handleOpenCatalog}
              className="rounded-lg px-8 py-4 bg-amber-600 hover:bg-amber-700 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                Открыть каталог
                <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="space-y-2 pt-8 mt-auto">
          <p className="text-amber-600/70 text-sm tracking-widest uppercase font-medium">
            Христианская литература
          </p>
          <div className="w-16 h-px !bg-amber-200 mx-auto" />
          <p className="!text-amber-600/50 text-xs">
            Духовное наследие
          </p>
        </div>
      </motion.div>
    </div>
  )
}