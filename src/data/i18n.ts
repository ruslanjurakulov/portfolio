export type Lang = 'en' | 'ru' | 'uz';
export const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'uz', label: 'UZ', name: 'O‘zbekcha' },
];

type Item = { title: string; text: string };

export interface Dict {
  skip: string;
  langLabel: string;
  themeLabel: string;
  motionLabel: string;
  nav: { work: string; services: string; process: string; faq: string; contact: string };
  hero: {
    title: string;
    sub: string;
    cta: string;
    note: string;
    ctaWork: string;
    emailSubject: string;
    emailBody: string;
  };
  work: {
    title: string;
    intro: string;
    live: string;
    concept: string;
    newTab: string;
    labels: { problem: string; built: string; tools: string; shows: string };
    preview: { group: string; phone: string; desktop: string };
    /** `shotPhone` / `shotDesktop` are the alt texts of the screenshots of that project. */
    cards: { title: string; problem: string; built: string; tools: string; shows: string; cta: string; shotPhone: string; shotDesktop: string }[];
  };
  services: { title: string; intro: string; items: Item[] };
  process: { title: string; steps: Item[] };
  why: { title: string; items: Item[] };
  about: { title: string; pitch: string; paragraphs: string[]; facts: { label: string; value: string }[] };
  faq: { title: string; items: { q: string; a: string }[] };
  contact: { title: string; text: string; telegramCta: string; emailCta: string; channels: string };
  footer: { rights: string; built: string };
}

export const dict: Record<Lang, Dict> = {
  en: {
    skip: 'Skip to content',
    langLabel: 'Language',
    themeLabel: 'Dark theme',
    motionLabel: 'Pause animations',
    nav: { work: 'Work', services: 'Services', process: 'How it works', faq: 'FAQ', contact: 'Contact' },
    hero: {
      title: 'Your website, built in days',
      sub: 'I’m Ruslan, a web developer from Uzbekistan. Landing pages and small business sites that load fast and feel right on a phone.',
      cta: 'Discuss your project',
      note: 'I reply on Telegram or by email.',
      ctaWork: 'See my work',
      emailSubject: 'Website project',
      emailBody: 'Hi Ruslan,\n\nMy business:\nWhat I need:\n',
    },
    work: {
      title: 'Work',
      intro: 'One live product and two sample sites you can open and tap through.',
      live: 'Live product',
      concept: 'Concept demo',
      newTab: '(opens in a new tab)',
      labels: { problem: 'Problem', built: 'What I built', tools: 'Tools', shows: 'What it shows' },
      preview: {
        group: 'Preview size',
        phone: 'Phone view',
        desktop: 'Desktop view',
      },
      cards: [
        {
          title: 'NightShift AI Studio',
          problem: 'Making short videos normally means filming, recording a voice and editing by hand.',
          built: 'A platform that creates faceless videos end to end: script, voice, visuals and captions.',
          tools: 'AI-assisted development, reviewed by hand.',
          shows: 'I can ship a real, live product, not only mockups.',
          cta: 'Visit the live site',
          shotPhone: 'Screenshot of the NightShift AI Studio home page on a phone',
          shotDesktop: 'Screenshot of the NightShift AI Studio home page on a desktop screen',
        },
        {
          title: 'Cafe landing page',
          problem: 'A small cafe needs a page with its menu, hours and location that opens fast on a phone.',
          built: 'A one-page cafe site: hero, menu highlights, opening hours, location and a contact form.',
          tools: 'Next.js, Tailwind CSS, inline SVG. No external images or fonts.',
          shows: 'A fictional sample: how I would structure and style a real cafe’s site. Fast, static, mobile-first.',
          cta: 'View live demo',
          shotPhone: 'Screenshot of the Nur Cafe concept demo on a phone',
          shotDesktop: 'Screenshot of the Nur Cafe concept demo on a desktop screen',
        },
        {
          title: 'Freelancer portfolio',
          problem: 'A freelancer needs a personal site where skills and projects make sense at a glance.',
          built: 'A bold one-page portfolio: skills, three sample projects and contact links.',
          tools: 'Next.js, Tailwind CSS, inline SVG. No external images or fonts.',
          shows: 'A fictional sample: a different look from the same toolkit, to show range.',
          cta: 'View live demo',
          shotPhone: 'Screenshot of the Aylin Demo freelancer concept demo on a phone',
          shotDesktop: 'Screenshot of the Aylin Demo freelancer concept demo on a desktop screen',
        },
      ],
    },
    services: {
      title: 'What I can do',
      intro: 'Practical help for small businesses and solo professionals.',
      items: [
        { title: 'Landing pages', text: 'One focused page that explains what you offer and makes it easy to get in touch.' },
        { title: 'Small business websites', text: 'About, work examples and a contact section, clear on phones first.' },
        { title: 'Multi-language sites', text: 'Sites in Uzbek, Russian and English with a simple language switcher.' },
        { title: 'Basic SEO and fast loading', text: 'Clean markup, sensible titles and descriptions, and pages that load quickly.' },
        { title: 'Fixes and changes', text: 'Bugs, layout problems and updates on a site you already have.' },
        { title: 'AI video and content tooling', text: 'Faceless video and content workflows, via NightShift AI Studio.' },
      ],
    },
    process: {
      title: 'How it works',
      steps: [
        { title: 'Send your business info', text: 'Tell me what you do and how people can reach you. Send a logo, photos or texts if you have them.' },
        { title: 'Get a first version', text: 'I build a first version you can open on your phone and review.' },
        { title: 'Revisions and delivery', text: 'We adjust it together until it feels right, then you get the finished site.' },
      ],
    },
    why: {
      title: 'Why work with me',
      items: [
        { title: 'Fast delivery', text: 'I use AI-assisted development to move quickly, and I review everything by hand.' },
        { title: 'Your language', text: 'I work in Uzbek, Russian and English.' },
        { title: 'Made for phones', text: 'I design mobile-first, because that is where many people will open your site.' },
        { title: 'Plain, clear talk', text: 'No jargon. You always know what is happening and what comes next.' },
      ],
    },
    about: {
      title: 'About',
      pitch: 'I help small businesses and solo professionals get a fast, clear website. You send the basics, I build a first version and refine it with you.',
      paragraphs: [
        'I’m Ruslan, a web developer based in Uzbekistan. I’m the founder of NightShift AI Studio, an AI video platform that creates faceless videos: script, voice, visuals and captions.',
        'I build modern, fast websites using AI-assisted development, and I review the result by hand. I speak Uzbek, Russian and English, so we can work in whichever language is easiest for you.',
      ],
      facts: [
        { label: 'Based in', value: 'Uzbekistan' },
        { label: 'Languages', value: 'Uzbek, Russian, English' },
        { label: 'Founder of', value: 'NightShift AI Studio' },
      ],
    },
    faq: {
      title: 'Questions',
      items: [
        { q: 'What do you need from me?', a: 'A few lines about your business and how people can contact you. A logo, photos or texts help if you already have them.' },
        { q: 'How long does it take?', a: 'It depends on the scope. A simple site usually takes days.' },
        { q: 'Can you change things later?', a: 'Yes. I also fix and update existing sites.' },
        { q: 'Which languages do you work in?', a: 'Uzbek, Russian and English, both for talking to me and for your site.' },
      ],
    },
    contact: {
      title: 'Let’s talk',
      text: 'One step: send me a short message about your business.',
      telegramCta: 'Message me on Telegram',
      emailCta: 'Email me',
      channels: 'Or find NightShift AI Studio and my GitHub here',
    },
    footer: { rights: 'All rights reserved.', built: 'Built with Next.js' },
  },

  ru: {
    skip: 'Перейти к содержимому',
    langLabel: 'Язык',
    themeLabel: 'Тёмная тема',
    motionLabel: 'Остановить анимацию',
    nav: { work: 'Работы', services: 'Услуги', process: 'Как это работает', faq: 'Вопросы', contact: 'Контакты' },
    hero: {
      title: 'Ваш сайт за считаные дни',
      sub: 'Я Руслан, веб-разработчик из Узбекистана. Лендинги и сайты для малого бизнеса, которые быстро грузятся и удобны на телефоне.',
      cta: 'Обсудить проект',
      note: 'Отвечаю в Telegram или по почте.',
      ctaWork: 'Мои работы',
      emailSubject: 'Проект сайта',
      emailBody: 'Здравствуйте, Руслан!\n\nМой бизнес:\nЧто мне нужно:\n',
    },
    work: {
      title: 'Работы',
      intro: 'Один действующий продукт и два примера сайтов, которые можно открыть и пощупать.',
      live: 'Действующий продукт',
      concept: 'Концепт-демо',
      newTab: '(откроется в новой вкладке)',
      labels: { problem: 'Задача', built: 'Что сделано', tools: 'Инструменты', shows: 'Что это показывает' },
      preview: {
        group: 'Размер превью',
        phone: 'Вид на телефоне',
        desktop: 'Вид на компьютере',
      },
      cards: [
        {
          title: 'NightShift AI Studio',
          problem: 'Чтобы сделать короткое видео, обычно нужно снимать, записывать голос и монтировать вручную.',
          built: 'Платформа, которая создаёт видео без людей в кадре от начала до конца: сценарий, озвучка, визуал и субтитры.',
          tools: 'Разработка с помощью ИИ, код проверен вручную.',
          shows: 'Я довожу до запуска настоящие продукты, а не только рисую макеты.',
          cta: 'Открыть сайт',
          shotPhone: 'Скриншот главной страницы NightShift AI Studio на экране телефона',
          shotDesktop: 'Скриншот главной страницы NightShift AI Studio на экране компьютера',
        },
        {
          title: 'Лендинг кафе',
          problem: 'Небольшому кафе нужна страница с меню, часами работы и адресом, которая быстро открывается на телефоне.',
          built: 'Одностраничный сайт кафе: главный экран, меню, часы работы, расположение и форма связи.',
          tools: 'Next.js, Tailwind CSS, SVG-графика. Без внешних картинок и шрифтов.',
          shows: 'Вымышленный пример: так я построил бы и оформил сайт настоящего кафе. Быстрый, статичный, в первую очередь для телефона.',
          cta: 'Смотреть демо',
          shotPhone: 'Скриншот концепт-демо Nur Cafe на экране телефона',
          shotDesktop: 'Скриншот концепт-демо Nur Cafe на экране компьютера',
        },
        {
          title: 'Портфолио фрилансера',
          problem: 'Фрилансеру нужен личный сайт, где навыки и проекты понятны с первого взгляда.',
          built: 'Яркое одностраничное портфолио: навыки, три примера проектов и ссылки для связи.',
          tools: 'Next.js, Tailwind CSS, SVG-графика. Без внешних картинок и шрифтов.',
          shows: 'Вымышленный пример: другой стиль на тех же инструментах, чтобы показать мой диапазон.',
          cta: 'Смотреть демо',
          shotPhone: 'Скриншот концепт-демо портфолио фрилансера Aylin Demo на экране телефона',
          shotDesktop: 'Скриншот концепт-демо портфолио фрилансера Aylin Demo на экране компьютера',
        },
      ],
    },
    services: {
      title: 'Что я умею',
      intro: 'Практическая помощь малому бизнесу и частным специалистам.',
      items: [
        { title: 'Лендинги', text: 'Одна понятная страница о том, что вы предлагаете, с простым способом связаться.' },
        { title: 'Сайты для малого бизнеса', text: 'О компании, примеры работ и контакты. В первую очередь удобно на телефоне.' },
        { title: 'Многоязычные сайты', text: 'Сайты на узбекском, русском и английском с простым переключателем языка.' },
        { title: 'Базовое SEO и быстрая загрузка', text: 'Чистая разметка, нормальные заголовки и описания, быстро грузящиеся страницы.' },
        { title: 'Правки и доработки', text: 'Ошибки, проблемы с вёрсткой и обновления на уже существующем сайте.' },
        { title: 'ИИ-видео и контент-инструменты', text: 'Видео без людей в кадре и контент-процессы, через NightShift AI Studio.' },
      ],
    },
    process: {
      title: 'Как это работает',
      steps: [
        { title: 'Пришлите данные о бизнесе', text: 'Расскажите, чем занимаетесь и как с вами связаться. Если есть логотип, фото и тексты, пришлите и их.' },
        { title: 'Получите первую версию', text: 'Я делаю первую версию, которую можно открыть на телефоне и посмотреть.' },
        { title: 'Правки и сдача', text: 'Мы вместе дорабатываем сайт, пока он вам не подойдёт, затем вы получаете готовый результат.' },
      ],
    },
    why: {
      title: 'Почему я',
      items: [
        { title: 'Быстро', text: 'Использую разработку с помощью ИИ, чтобы работать быстро, и проверяю всё вручную.' },
        { title: 'На вашем языке', text: 'Работаю на узбекском, русском и английском.' },
        { title: 'Сначала телефон', text: 'Делаю в первую очередь для телефона, ведь многие откроют сайт именно там.' },
        { title: 'Без жаргона', text: 'Говорю простыми словами. Вы всегда знаете, что происходит и что дальше.' },
      ],
    },
    about: {
      title: 'Обо мне',
      pitch: 'Помогаю малому бизнесу и частным специалистам получить быстрый и понятный сайт. Вы присылаете основу, я делаю первую версию и дорабатываю её вместе с вами.',
      paragraphs: [
        'Я Руслан, веб-разработчик из Узбекистана. Основатель NightShift AI Studio, ИИ-платформы, которая создаёт видео без людей в кадре: сценарий, озвучка, визуал и субтитры.',
        'Делаю современные быстрые сайты с помощью ИИ-разработки и проверяю результат вручную. Говорю на узбекском, русском и английском, так что можем общаться на удобном вам языке.',
      ],
      facts: [
        { label: 'Живу в', value: 'Узбекистан' },
        { label: 'Языки', value: 'узбекский, русский, английский' },
        { label: 'Основатель', value: 'NightShift AI Studio' },
      ],
    },
    faq: {
      title: 'Вопросы',
      items: [
        { q: 'Что нужно от меня?', a: 'Несколько строк о бизнесе и как с вами связаться. Логотип, фото и тексты помогут, если они уже есть.' },
        { q: 'Сколько это занимает?', a: 'Зависит от объёма. Простой сайт обычно занимает несколько дней.' },
        { q: 'Можно ли вносить изменения позже?', a: 'Да. Я также исправляю и обновляю существующие сайты.' },
        { q: 'На каких языках вы работаете?', a: 'Узбекский, русский и английский: и для общения со мной, и для вашего сайта.' },
      ],
    },
    contact: {
      title: 'Давайте поговорим',
      text: 'Один шаг: напишите мне пару строк о вашем бизнесе.',
      telegramCta: 'Написать в Telegram',
      emailCta: 'Написать на почту',
      channels: 'Или найдите NightShift AI Studio и мой GitHub здесь',
    },
    footer: { rights: 'Все права защищены.', built: 'Сделано на Next.js' },
  },

  uz: {
    skip: 'Asosiy mazmunga o‘tish',
    langLabel: 'Til',
    themeLabel: 'Qorong‘i rejim',
    motionLabel: 'Animatsiyani to‘xtatish',
    nav: { work: 'Ishlar', services: 'Xizmatlar', process: 'Ish tartibi', faq: 'Savollar', contact: 'Aloqa' },
    hero: {
      title: 'Sayt bir necha kunda tayyor',
      sub: 'Men Ruslan, O‘zbekistonlik veb-dasturchiman. Tez ochiladigan, telefonda qulay lending va kichik biznes saytlari.',
      cta: 'Loyihani muhokama qilaylik',
      note: 'Telegram yoki emailda javob beraman.',
      ctaWork: 'Ishlarimni ko‘rish',
      emailSubject: 'Sayt loyihasi',
      emailBody: 'Assalomu alaykum, Ruslan!\n\nBiznesim:\nNima kerak:\n',
    },
    work: {
      title: 'Ishlar',
      intro: 'Bitta haqiqiy mahsulot va ochib ko‘rishingiz mumkin bo‘lgan ikkita namuna sayt.',
      live: 'Ishlab turgan mahsulot',
      concept: 'Namuna loyiha',
      newTab: '(yangi oynada ochiladi)',
      labels: { problem: 'Muammo', built: 'Nima qildim', tools: 'Vositalar', shows: 'Bu nimani ko‘rsatadi' },
      preview: {
        group: 'Ko‘rinish o‘lchami',
        phone: 'Telefon ko‘rinishi',
        desktop: 'Kompyuter ko‘rinishi',
      },
      cards: [
        {
          title: 'NightShift AI Studio',
          problem: 'Qisqa video tayyorlash uchun odatda suratga olish, ovoz yozish va qo‘lda montaj qilish kerak.',
          built: 'Kadrda odam bo‘lmagan videolarni boshidan oxirigacha o‘zi yaratadigan platforma: ssenariy, ovoz, tasvir va subtitrlar.',
          tools: 'Sun’iy intellekt yordamida yozilgan, qo‘lda tekshirilgan kod.',
          shows: 'Men nafaqat maket chizaman, haqiqiy mahsulotni ishga tushira olaman.',
          cta: 'Saytga o‘tish',
          shotPhone: 'NightShift AI Studio bosh sahifasining telefon ekranidagi ko‘rinishi',
          shotDesktop: 'NightShift AI Studio bosh sahifasining kompyuter ekranidagi ko‘rinishi',
        },
        {
          title: 'Kafe uchun lending',
          problem: 'Kichik kafega menyu, ish vaqti va manzil ko‘rsatilgan, telefonda tez ochiladigan sahifa kerak.',
          built: 'Bir sahifali kafe sayti: bosh ekran, menyu, ish vaqti, manzil va aloqa formasi.',
          tools: 'Next.js, Tailwind CSS va SVG grafika. Tashqi rasm va shriftlar yo‘q.',
          shows: 'Xayoliy namuna: haqiqiy kafe saytini qanday qurishim va bezashimni ko‘rsatadi. Tez, statik, avvalo telefon uchun.',
          cta: 'Demoni ko‘rish',
          shotPhone: 'Nur Cafe namuna loyihasining telefon ekranidagi ko‘rinishi',
          shotDesktop: 'Nur Cafe namuna loyihasining kompyuter ekranidagi ko‘rinishi',
        },
        {
          title: 'Frilanser portfoliosi',
          problem: 'Frilanserga ko‘nikmalari va loyihalari bir qarashda tushunarli bo‘ladigan shaxsiy sayt kerak.',
          built: 'Yorqin bir sahifali portfolio: ko‘nikmalar, uchta namuna loyiha va aloqa havolalari.',
          tools: 'Next.js, Tailwind CSS va SVG grafika. Tashqi rasm va shriftlar yo‘q.',
          shows: 'Xayoliy namuna: o‘sha vositalar bilan butunlay boshqacha uslub, imkoniyatlarimni ko‘rsatish uchun.',
          cta: 'Demoni ko‘rish',
          shotPhone: 'Aylin Demo frilanser namuna loyihasining telefon ekranidagi ko‘rinishi',
          shotDesktop: 'Aylin Demo frilanser namuna loyihasining kompyuter ekranidagi ko‘rinishi',
        },
      ],
    },
    services: {
      title: 'Nimalar qila olaman',
      intro: 'Kichik biznes va yakka tartibda ishlaydigan mutaxassislar uchun amaliy yordam.',
      items: [
        { title: 'Lending sahifalar', text: 'Nima taklif qilishingizni tushuntiradigan va sizga bog‘lanishni oson qiladigan bitta sahifa.' },
        { title: 'Kichik biznes saytlari', text: 'Biz haqimizda, ish namunalari va aloqa bo‘limi. Eng avval telefonda qulay bo‘ladi.' },
        { title: 'Ko‘p tilli saytlar', text: 'O‘zbek, rus va ingliz tillarida, qulay til almashtirgichli saytlar.' },
        { title: 'Asosiy SEO va tez yuklanish', text: 'Toza kod, to‘g‘ri sarlavha va tavsiflar, tez ochiladigan sahifalar.' },
        { title: 'Tuzatish va o‘zgartirish', text: 'Tayyor saytingizdagi xatolar, ko‘rinishdagi nosozliklar va yangilanishlar.' },
        { title: 'AI video va kontent vositalari', text: 'Kadrda odamsiz videolar va kontent yaratish jarayonlari, NightShift AI Studio orqali.' },
      ],
    },
    process: {
      title: 'Ish qanday kechadi',
      steps: [
        { title: 'Biznesingiz haqida yozing', text: 'Nima bilan shug‘ullanishingizni va sizga qanday bog‘lanish mumkinligini yozing. Logotip, rasm va matnlaringiz bo‘lsa, ularni ham yuboring.' },
        { title: 'Birinchi variantni oling', text: 'Telefoningizda ochib ko‘ra oladigan birinchi variantni tayyorlab beraman.' },
        { title: 'Tuzatishlar va topshirish', text: 'Sizga ma’qul bo‘lguncha birga sayqallaymiz, keyin tayyor saytni topshiraman.' },
      ],
    },
    why: {
      title: 'Nega men bilan ishlash qulay',
      items: [
        { title: 'Tez ishlayman', text: 'Tezroq ishlash uchun sun’iy intellekt yordamidan foydalanaman, lekin hammasini o‘zim qo‘lda tekshiraman.' },
        { title: 'Sizning tilingizda', text: 'O‘zbek, rus va ingliz tillarida ishlayman.' },
        { title: 'Avvalo telefon uchun', text: 'Saytni birinchi navbatda telefon uchun qilaman, chunki ko‘pchilik uni telefonda ochadi.' },
        { title: 'Oddiy va aniq gaplashaman', text: 'Murakkab atamalarsiz. Ish qayerga yetgani va keyingi qadam nima ekani doim sizga ayon.' },
      ],
    },
    about: {
      title: 'Men haqimda',
      pitch: 'Kichik biznes va yakka tartibda ishlaydigan mutaxassislarga tez va tushunarli sayt qilib beraman. Siz asosiy ma’lumotni yuborasiz, men birinchi variantni tayyorlayman va birga sayqallaymiz.',
      paragraphs: [
        'Men Ruslan, O‘zbekistonda yashayman, veb-dasturchiman. NightShift AI Studio asoschisiman: bu kadrda odamsiz videolar yaratadigan sun’iy intellektli platforma, ssenariy, ovoz, tasvir va subtitrlarni o‘zi tayyorlaydi.',
        'Zamonaviy va tez ishlaydigan saytlarni sun’iy intellekt yordamida yarataman, natijani esa o‘zim qo‘lda tekshiraman. O‘zbek, rus va ingliz tillarida gaplashaman, shuning uchun o‘zingizga qulay tilda ishlashimiz mumkin.',
      ],
      facts: [
        { label: 'Yashash joyi', value: 'O‘zbekiston' },
        { label: 'Tillar', value: 'o‘zbek, rus, ingliz' },
        { label: 'Asoschisi', value: 'NightShift AI Studio' },
      ],
    },
    faq: {
      title: 'Savollar',
      items: [
        { q: 'Mendan nima kerak bo‘ladi?', a: 'Biznesingiz haqida bir necha jumla va siz bilan qanday bog‘lanish mumkinligi. Logotip, rasm va matnlar bo‘lsa, yaxshi bo‘ladi.' },
        { q: 'Qancha vaqt ketadi?', a: 'Hajmiga qarab. Oddiy sayt odatda bir necha kunda tayyor bo‘ladi.' },
        { q: 'Keyinroq o‘zgartirish kiritsa bo‘ladimi?', a: 'Ha, albatta. Tayyor saytlarni ham tuzatib, yangilab beraman.' },
        { q: 'Qaysi tillarda ishlaysiz?', a: 'O‘zbek, rus va ingliz tillarida: ham men bilan muloqotda, ham saytingiz uchun.' },
      ],
    },
    contact: {
      title: 'Gaplashamiz',
      text: 'Atigi bitta qadam: biznesingiz haqida qisqa xabar yozing.',
      telegramCta: 'Telegram’da yozish',
      emailCta: 'Email orqali yozish',
      channels: 'NightShift AI Studio va GitHub sahifam shu yerda',
    },
    footer: { rights: 'Barcha huquqlar himoyalangan.', built: 'Next.js bilan yaratilgan' },
  },
};
