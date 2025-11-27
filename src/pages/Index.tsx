import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

interface Section {
  id: string;
  title: string;
  icon: string;
  description: string;
  content: {
    intro: string;
    points: string[];
    examples?: string[];
    tips?: string[];
  };
}

const sections: Section[] = [
  {
    id: 'intro',
    title: 'Введение в кибербезопасность',
    icon: 'Shield',
    description: 'Основы защиты информации в цифровом мире',
    content: {
      intro: 'Кибербезопасность — это практика защиты систем, сетей и программ от цифровых атак. Эти атаки обычно направлены на доступ, изменение или уничтожение конфиденциальной информации.',
      points: [
        'Конфиденциальность — защита данных от несанкционированного доступа',
        'Целостность — обеспечение точности и полноты данных',
        'Доступность — обеспечение доступа к информации для авторизованных пользователей',
        'Аутентификация — подтверждение подлинности пользователя или системы',
        'Авторизация — предоставление прав доступа к ресурсам'
      ],
      tips: [
        'Регулярно обновляйте программное обеспечение',
        'Используйте многофакторную аутентификацию',
        'Создавайте резервные копии важных данных',
        'Будьте осторожны с подозрительными ссылками и вложениями'
      ]
    }
  },
  {
    id: 'threats',
    title: 'Виды киберугроз',
    icon: 'AlertTriangle',
    description: 'Основные типы угроз информационной безопасности',
    content: {
      intro: 'Киберугрозы постоянно эволюционируют, становясь всё более изощрёнными. Понимание основных типов угроз — первый шаг к эффективной защите.',
      points: [
        'Вредоносное ПО (Malware) — программы, созданные для нанесения вреда',
        'Фишинг — мошеннические попытки получить конфиденциальные данные',
        'Ransomware — шифрование данных с требованием выкупа',
        'DDoS-атаки — перегрузка сервера запросами',
        'SQL-инъекции — атаки на базы данных через уязвимости',
        'Zero-day эксплойты — использование неизвестных уязвимостей'
      ],
      examples: [
        'Фишинговое письмо якобы от банка с просьбой обновить данные',
        'Поддельный сайт, копирующий дизайн популярного сервиса',
        'Вредоносное вложение в электронном письме',
        'Всплывающее окно с предупреждением о вирусе'
      ]
    }
  },
  {
    id: 'passwords',
    title: 'Безопасность паролей',
    icon: 'Key',
    description: 'Создание и управление надёжными паролями',
    content: {
      intro: 'Пароль — это первая линия защиты ваших данных. Слабый пароль делает вас уязвимым даже при наличии других мер безопасности.',
      points: [
        'Используйте минимум 12 символов разных типов',
        'Не используйте личную информацию (имена, даты рождения)',
        'Создавайте уникальные пароли для каждого сервиса',
        'Применяйте парольные фразы вместо одного слова',
        'Используйте менеджеры паролей для хранения',
        'Регулярно меняйте пароли для важных аккаунтов'
      ],
      examples: [
        '❌ Плохо: password123, ivan1990, qwerty',
        '✅ Хорошо: Tr!3K@92mP#vL, Kot_Gu1yaet&V_P@rke_45',
        '✅ Фраза: Moya!S0baka#Lyubit$Gulyat%V%Parke'
      ],
      tips: [
        'Включите двухфакторную аутентификацию везде, где возможно',
        'Не сохраняйте пароли в браузере на общедоступных компьютерах',
        'Используйте разные email для разных категорий аккаунтов',
        'Проверяйте, не был ли ваш пароль скомпрометирован на haveibeenpwned.com'
      ]
    }
  },
  {
    id: 'networks',
    title: 'Безопасность в сетях',
    icon: 'Wifi',
    description: 'Защита данных при работе в интернете',
    content: {
      intro: 'Сетевая безопасность охватывает защиту данных при передаче по сетям. Особенно важно соблюдать меры предосторожности при использовании публичных сетей.',
      points: [
        'HTTPS — защищённый протокол передачи данных',
        'VPN — виртуальная частная сеть для шифрования трафика',
        'Firewall — межсетевой экран для фильтрации трафика',
        'Публичные Wi-Fi сети — повышенный риск перехвата данных',
        'DNS — система доменных имён может быть скомпрометирована',
        'Сертификаты SSL/TLS — подтверждение подлинности сайта'
      ],
      examples: [
        'Использование VPN в кафе или аэропорту',
        'Проверка наличия замка в адресной строке браузера (HTTPS)',
        'Отключение автоматического подключения к Wi-Fi',
        'Использование мобильного интернета для банковских операций'
      ],
      tips: [
        'Не вводите пароли и банковские данные в публичных сетях без VPN',
        'Отключайте общий доступ к файлам в публичных сетях',
        'Используйте DNS от надёжных провайдеров (Google, Cloudflare)',
        'Регулярно проверяйте подключённые к Wi-Fi устройства'
      ]
    }
  },
  {
    id: 'viruses',
    title: 'Вирусы и антивирусы',
    icon: 'Bug',
    description: 'Типы вредоносного ПО и методы защиты',
    content: {
      intro: 'Вредоносное программное обеспечение может нанести серьёзный ущерб вашей системе и данным. Антивирусы — важный элемент защиты, но не единственный.',
      points: [
        'Вирус — самовоспроизводящаяся программа, заражающая файлы',
        'Троян — маскируется под легитимное ПО',
        'Червь — распространяется по сети без участия пользователя',
        'Шпионское ПО — собирает информацию о пользователе',
        'Рекламное ПО — показывает нежелательную рекламу',
        'Руткит — скрывает присутствие вредоносного ПО в системе'
      ],
      examples: [
        'Троян, замаскированный под установщик игры',
        'Макровирус в документе Word',
        'Шпионское ПО, отслеживающее нажатия клавиш',
        'Криптомайнер, использующий ресурсы компьютера'
      ],
      tips: [
        'Устанавливайте программы только из официальных источников',
        'Регулярно обновляйте антивирусные базы',
        'Проводите полное сканирование системы минимум раз в неделю',
        'Не отключайте защиту в реальном времени',
        'Используйте песочницу для проверки подозрительных файлов'
      ]
    }
  },
  {
    id: 'encryption',
    title: 'Методы шифрования данных',
    icon: 'Lock',
    description: 'Криптография и защита информации',
    content: {
      intro: 'Шифрование — это процесс преобразования информации в форму, которую могут прочитать только авторизованные пользователи. Это основа современной защиты данных.',
      points: [
        'Симметричное шифрование — один ключ для шифрования и расшифровки (AES)',
        'Асимметричное шифрование — пара ключей: публичный и приватный (RSA)',
        'Хеширование — одностороннее преобразование данных (SHA-256)',
        'Цифровая подпись — подтверждение подлинности и целостности',
        'End-to-End шифрование — защита данных от отправителя до получателя',
        'SSL/TLS — протоколы защиты данных при передаче'
      ],
      examples: [
        'WhatsApp использует E2E шифрование для сообщений',
        'HTTPS использует TLS для защиты веб-трафика',
        'BitLocker шифрует диски в Windows',
        'PGP используется для шифрования электронной почты'
      ],
      tips: [
        'Шифруйте важные файлы перед загрузкой в облако',
        'Используйте мессенджеры с E2E шифрованием',
        'Включите шифрование диска на ноутбуке',
        'Храните ключи шифрования отдельно от зашифрованных данных'
      ]
    }
  },
  {
    id: 'social',
    title: 'Социальная инженерия',
    icon: 'Users',
    description: 'Психологические методы получения конфиденциальной информации',
    content: {
      intro: 'Социальная инженерия — это манипулирование людьми с целью получения конфиденциальной информации. Часто это самое слабое звено в системе безопасности.',
      points: [
        'Претекстинг — создание выдуманного сценария для получения информации',
        'Фишинг — массовые мошеннические рассылки',
        'Спир-фишинг — целевые атаки на конкретных людей',
        'Вишинг — голосовой фишинг по телефону',
        'Бейтинг — приманка в виде бесплатного контента',
        'Тейлгейтинг — физическое проникновение следом за сотрудником'
      ],
      examples: [
        'Звонок якобы от IT-отдела с просьбой назвать пароль',
        'Email от "руководителя" с требованием срочно перевести деньги',
        'USB-флешка с надписью "Зарплаты 2024", оставленная на парковке',
        'Сообщение в соцсети от "друга" с просьбой одолжить денег'
      ],
      tips: [
        'Проверяйте личность звонящего, перезванивая по официальному номеру',
        'Не раскрывайте рабочую информацию в социальных сетях',
        'Будьте скептичны к срочным запросам',
        'Обучайте сотрудников распознавать атаки социальной инженерии',
        'Установите процедуры верификации для важных операций'
      ]
    }
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<string>('intro');

  const currentSection = sections.find(s => s.id === activeSection) || sections[0];

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <Icon name="ShieldCheck" size={48} className="text-primary animate-glow" />
            <h1 className="text-5xl font-bold neon-text">Основы кибербезопасности</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Образовательный проект по информатике: изучите ключевые аспекты защиты информации в цифровом мире
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <Card className="sticky top-4 neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Menu" size={20} />
                  Разделы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section, index) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? 'default' : 'ghost'}
                    className="w-full justify-start gap-2 transition-all hover:translate-x-1"
                    onClick={() => setActiveSection(section.id)}
                  >
                    <Icon name={section.icon as any} size={18} />
                    <span className="text-left flex-1">{index + 1}. {section.title}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </aside>

          <main className="lg:col-span-3 space-y-6">
            <Card className="neon-border animate-fade-in">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Icon name={currentSection.icon as any} size={32} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-2">{currentSection.title}</CardTitle>
                    <CardDescription className="text-lg">{currentSection.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-primary/50 bg-primary/10">
                  <Icon name="Info" className="h-4 w-4" />
                  <AlertDescription className="text-base">
                    {currentSection.content.intro}
                  </AlertDescription>
                </Alert>

                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content">
                      <Icon name="BookOpen" size={16} className="mr-2" />
                      Основное
                    </TabsTrigger>
                    {currentSection.content.examples && (
                      <TabsTrigger value="examples">
                        <Icon name="Lightbulb" size={16} className="mr-2" />
                        Примеры
                      </TabsTrigger>
                    )}
                    {currentSection.content.tips && (
                      <TabsTrigger value="tips">
                        <Icon name="Target" size={16} className="mr-2" />
                        Советы
                      </TabsTrigger>
                    )}
                  </TabsList>

                  <TabsContent value="content" className="space-y-4 mt-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Icon name="List" size={20} />
                      Ключевые понятия
                    </h3>
                    <div className="space-y-3">
                      {currentSection.content.points.map((point, index) => (
                        <div
                          key={index}
                          className="flex gap-3 p-4 bg-card/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
                        >
                          <Badge className="shrink-0 h-6 w-6 rounded-full flex items-center justify-center p-0">
                            {index + 1}
                          </Badge>
                          <p className="text-base leading-relaxed">{point}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {currentSection.content.examples && (
                    <TabsContent value="examples" className="space-y-4 mt-6">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Icon name="Lightbulb" size={20} />
                        Практические примеры
                      </h3>
                      <div className="space-y-3">
                        {currentSection.content.examples.map((example, index) => (
                          <div
                            key={index}
                            className="flex gap-3 p-4 bg-accent/20 rounded-lg border border-accent/30"
                          >
                            <Icon name="ArrowRight" size={20} className="text-accent shrink-0 mt-0.5" />
                            <p className="text-base leading-relaxed">{example}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  )}

                  {currentSection.content.tips && (
                    <TabsContent value="tips" className="space-y-4 mt-6">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Icon name="Target" size={20} />
                        Рекомендации по безопасности
                      </h3>
                      <div className="space-y-3">
                        {currentSection.content.tips.map((tip, index) => (
                          <div
                            key={index}
                            className="flex gap-3 p-4 bg-primary/10 rounded-lg border border-primary/30 hover:bg-primary/20 transition-colors"
                          >
                            <Icon name="CheckCircle" size={20} className="text-primary shrink-0 mt-0.5" />
                            <p className="text-base leading-relaxed">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  )}
                </Tabs>

                <div className="flex justify-between pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    disabled={sections.findIndex(s => s.id === activeSection) === 0}
                    onClick={() => {
                      const currentIndex = sections.findIndex(s => s.id === activeSection);
                      if (currentIndex > 0) {
                        setActiveSection(sections[currentIndex - 1].id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                  >
                    <Icon name="ChevronLeft" size={18} className="mr-2" />
                    Предыдущий раздел
                  </Button>
                  <Button
                    disabled={sections.findIndex(s => s.id === activeSection) === sections.length - 1}
                    onClick={() => {
                      const currentIndex = sections.findIndex(s => s.id === activeSection);
                      if (currentIndex < sections.length - 1) {
                        setActiveSection(sections[currentIndex + 1].id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                  >
                    Следующий раздел
                    <Icon name="ChevronRight" size={18} className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="GraduationCap" size={24} />
                  Статистика изучения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">{sections.length}</div>
                    <div className="text-sm text-muted-foreground">Разделов</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">
                      {sections.reduce((acc, s) => acc + s.content.points.length, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Ключевых понятий</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">
                      {Math.round((sections.findIndex(s => s.id === activeSection) + 1) / sections.length * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Прогресс</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>

        <footer className="mt-12 text-center text-muted-foreground pb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon name="Shield" size={16} />
            <p>Образовательный проект по информатике</p>
          </div>
          <p className="text-sm">Основы кибербезопасности • 2024</p>
        </footer>
      </div>
    </div>
  );
}