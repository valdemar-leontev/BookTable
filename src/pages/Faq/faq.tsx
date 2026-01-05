// pages/Faq/Faq.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useNavigate } from 'react-router-dom'
import { Mail, ShoppingCart, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Faq = () => {
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col p-4">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Частые вопросы</h1>
          <p className="text-muted-foreground">
            Ответы на популярные вопросы о сервисе
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-3">
          <AccordionItem value="find-book" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Как найти книгу в каталоге?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <p className="text-foreground/80">
                Используйте поиск вверху каталога. Можно искать по названию, автору или жанру.
                Также доступны фильтры по цене и году издания.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="make-order" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <span>Как оформить заказ?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <ol className="list-decimal pl-5 space-y-2 text-foreground/80">
                <li>Добавьте книги в корзину</li>
                <li>Перейдите в раздел "Корзина"</li>
                <li>Выберите способ доставки</li>
                <li>Оплатите заказ</li>
              </ol>
              <div className="mt-3 p-2 bg-primary/10 rounded text-sm">
                Уведомления приходят в Telegram
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="support" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>Как связаться с поддержкой?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <p className="text-foreground/80 mb-3">
                Пишите в Telegram: @booktable_support
                или на email: support@booktable.ru
              </p>
              <div className="text-sm text-muted-foreground">
                Время ответа: 30 минут (10:00-20:00 МСК)
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-10">
          <Button
            onClick={() => navigate('/catalog')}
            className="flex-1"
          >
            Перейти в каталог
          </Button>

          <Button
            variant="outline"
            onClick={() => window.open('https://t.me/booktable_support', '_blank')}
            className="flex-1 gap-2"
          >
            <Mail className="h-4 w-4" />
            Написать в поддержку
          </Button>
        </div>

        {/* Info */}
        <div className="text-center text-sm text-muted-foreground pt-6">
          <p>Не нашли ответ? Мы всегда готовы помочь!</p>
        </div>
      </div>
    </div>
  )
}