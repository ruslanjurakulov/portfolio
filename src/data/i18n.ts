export type Lang = 'en' | 'ru' | 'uz';
export const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'uz', label: 'UZ', name: 'Oʻzbekcha' },
];

type Item = { title: string; text: string };

export interface Dict {
  skip: string;
  langLabel: string;
  themeLabel: string;
  nav: { work: string; services: string; process: string; faq: string; contact: string };
  hero: {
    eyebrow: string;
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
    cards: { title: string; problem: string; built: string; tools: string; shows: string; cta: string }[];
  };
  services: { title: string; intro: string; items: Item[] };
  process: { title: string; steps: Item[] };
  why: { title: string; items: Item[] };
  about: { title: string; pitch: string; paragraphs: string[]; facts: { label: string; value: string }[] };
  faq: { title: string; items: { q: string; a: string }[] };
  contact: { title: string; text: string; emailCta: string; channels: string };
  footer: { rights: string; built: string };
}

export const dict: Record<Lang, Dict> = {
  en: {
    skip: 'Skip to content',
    langLabel: 'Language',
    themeLabel: 'Dark theme',
    nav: { work: 'Work', services: 'Services', process: 'How it works', faq: 'FAQ', contact: 'Contact' },
    hero: {
      eyebrow: 'Ruslan Jurakulov, web developer building fast sites for small businesses',
      title: 'A fast, good-looking website for your business, built in days',
      sub: 'Landing pages and small business sites that load quickly and feel right on a phone. In Uzbek, Russian or English.',
      cta: 'Get a free sample',
      note: 'A short free sample for new clients.',
      ctaWork: 'See my work',
      emailSubject: 'Free sample request',
      emailBody: 'Hi Ruslan,\n\nMy business:\nWhat I need:\n',
    },
    work: {
      title: 'Work',
      intro: 'One live product and two sample sites you can open and tap through.',
      live: 'Live product',
      concept: 'Concept demo',
      newTab: '(opens in a new tab)',
      labels: { problem: 'Problem', built: 'What I built', tools: 'Tools', shows: 'What it shows' },
      cards: [
        {
          title: 'NightShift AI Studio',
          problem: 'Making short videos normally means filming, recording a voice and editing by hand.',
          built: 'A platform that creates faceless videos end to end: script, voice, visuals and captions.',
          tools: 'AI-assisted development, reviewed by hand.',
          shows: 'I can ship a real, live product, not only mockups.',
          cta: 'Visit the live site',
        },
        {
          title: 'Cafe landing page',
          problem: 'A small cafe needs a page with its menu, hours and location that opens fast on a phone.',
          built: 'A one-page cafe site: hero, menu highlights, opening hours, location and a contact form.',
          tools: 'Next.js, Tailwind CSS, inline SVG. No external images or fonts.',
          shows: 'A fictional sample: how I would structure and style a real cafe’s site. Fast, static, mobile-first.',
          cta: 'View live demo',
        },
        {
          title: 'Freelancer portfolio',
          problem: 'A freelancer needs a personal site where skills and projects make sense at a glance.',
          built: 'A bold one-page portfolio: skills, three sample projects and contact links.',
          tools: 'Next.js, Tailwind CSS, inline SVG. No external images or fonts.',
          shows: 'A fictional sample: a different look from the same toolkit, to show range.',
          cta: 'View live demo',
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
        { q: 'What is the free sample?', a: 'New clients can ask for a short free sample first, so you can see how I work before you decide.' },
        { q: 'What do you need from me?', a: 'A few lines about your business and how people can contact you. A logo, photos or texts help if you already have them.' },
        { q: 'How long does it take?', a: 'It depends on the scope. A simple site usually takes days.' },
        { q: 'Can you change things later?', a: 'Yes. I also fix and update existing sites.' },
        { q: 'Which languages do you work in?', a: 'Uzbek, Russian and English, both for talking to me and for your site.' },
      ],
    },
    contact: {
      title: 'Let’s talk',
      text: 'One step: send me a short message about your business.',
      emailCta: 'Get a free sample',
      channels: 'Or find NightShift AI Studio and my GitHub here',
    },
    footer: { rights: 'All rights reserved.', built: 'Built with Next.js' },
  },

  ru: {
    skip: 'Перейти к содержимому',
    langLabel: 'Язык',
    themeLabel: 'Тёмная тема',
    nav: { work: 'Работы', services: 'Услуги', process: 'Как это работает', faq: 'Вопросы', contact: 'Контакты' },
    hero: {
      eyebrow: 'Ruslan Jurakulov, веб-разработчик: делаю быстрые сайты для малого бизнеса',
      title: 'Быстрый и красивый сайт для вашего бизнеса за считаные дни',
      sub: 'Лендинги и сайты для малого бизнеса, которые быстро грузятся и удобны на телефоне. На узбекском, русском или английском.',
      cta: 'Получить бесплатный пример',
      note: 'Короткий бесплатный пример для новых клиентов.',
      ctaWork: 'Мои работы',
      emailSubject: 'Бесплатный пример сайта',
      emailBody: 'Здравствуйте, Руслан!\n\nМой бизнес:\nЧто мне нужно:\n',
    },
    work: {
      title: 'Работы',
      intro: 'Один действующий продукт и два примера сайтов, которые можно открыть и пощупать.',
      live: 'Действующий продукт',
      concept: 'Концепт-демо',
      newTab: '(откроется в новой вкладке)',
      labels: { problem: 'Задача', built: 'Что сделано', tools: 'Инструменты', shows: 'Что это показывает' },
      cards: [
        {
          title: 'NightShift AI Studio',
          problem: 'Чтобы сделать короткое видео, обычно нужно снимать, записывать голос и монтировать вручную.',
          built: 'Платформа, которая создаёт видео без человека в кадре от начала до конца: сценарий, озвучка, визуал и субтитры.',
          tools: 'Разработка с помощью ИИ и ручная проверка.',
          shows: 'Я довожу до запуска настоящий продукт, а не только макеты.',
          cta: 'Открыть сайт',
        },
        {
          title: 'Лендинг кафе',
          problem: 'Небольшому кафе нужна страница с меню, часами работы и адресом, которая быстро открывается на телефоне.',
          built: 'Одностраничный сайт кафе: главный экран, меню, часы работы, расположение и форма связи.',
          tools: 'Next.js, Tailwind CSS, встроенная SVG-графика. Без внешних картинок и шрифтов.',
          shows: 'Вымышленный образец: как я построил бы и оформил сайт настоящего кафе. Быстро, статично, сначала для телефона.',
          cta: 'Смотреть демо',
        },
        {
          title: 'Портфолио фрилансера',
          problem: 'Фрилансеру нужен личный сайт, где навыки и проекты понятны с первого взгляда.',
          built: 'Яркое одностраничное портфолио: навыки, три примера проектов и ссылки для связи.',
          tools: 'Next.js, Tailwind CSS, встроенная SVG-графика. Без внешних картинок и шрифтов.',
          shows: 'Вымышленный образец: другой стиль на тех же инструментах, чтобы показать диапазон.',
          cta: 'Смотреть демо',
        },
      ],
    },
    services: {
      title: 'Что я умею',
      intro: 'Практическая помощь малому бизнесу и частным специалистам.',
      items: [
        { title: 'Лендинги', text: 'Одна понятная страница о том, что вы предлагаете, с простым способом связаться.' },
        { title: 'Сайты для малого бизнеса', text: 'О компании, примеры работ и контакты, в первую очередь удобно на телефоне.' },
        { title: 'Многоязычные сайты', text: 'Сайты на узбекском, русском и английском с простым переключателем языка.' },
        { title: 'Базовое SEO и быстрая загрузка', text: 'Чистая разметка, нормальные заголовки и описания, быстро грузящиеся страницы.' },
        { title: 'Правки и доработки', text: 'Ошибки, проблемы с версткой и обновления на уже существующем сайте.' },
        { title: 'ИИ-видео и контент-инструменты', text: 'Видео без лица в кадре и контент-процессы, через NightShift AI Studio.' },
      ],
    },
    process: {
      title: 'Как это работает',
      steps: [
        { title: 'Пришлите данные о бизнесе', text: 'Расскажите, чем занимаетесь и как с вами связаться. Логотип, фото и тексты — если они есть.' },
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
        'Я Руслан, веб-разработчик из Узбекистана. Основатель NightShift AI Studio, платформы на основе ИИ, которая создаёт видео без человека в кадре: сценарий, озвучка, визуал и субтитры.',
        'Делаю современные быстрые сайты с помощью ИИ-разработки и проверяю результат вручную. Говорю на узбекском, русском и английском, так что можем общаться на удобном вам языке.',
      ],
      facts: [
        { label: 'Где живу', value: 'Узбекистан' },
        { label: 'Языки', value: 'узбекский, русский, английский' },
        { label: 'Основатель', value: 'NightShift AI Studio' },
      ],
    },
    faq: {
      title: 'Вопросы',
      items: [
        { q: 'Что за бесплатный пример?', a: 'Новые клиенты могут сначала попросить короткий бесплатный пример, чтобы увидеть, как я работаю, и потом решить.' },
        { q: 'Что нужно от меня?', a: 'Несколько строк о бизнесе и как с вами связаться. Логотип, фото и тексты помогут, если они уже есть.' },
        { q: 'Сколько это занимает?', a: 'Зависит от объёма. Простой сайт обычно занимает несколько дней.' },
        { q: 'Можно ли вносить изменения позже?', a: 'Да. Я также исправляю и обновляю существующие сайты.' },
        { q: 'На каких языках вы работаете?', a: 'Узбекский, русский и английский: и для общения со мной, и для вашего сайта.' },
      ],
    },
    contact: {
      title: 'Давайте обсудим',
      text: 'Один шаг: напишите мне пару строк о вашем бизнесе.',
      emailCta: 'Получить бесплатный пример',
      channels: 'Или найдите NightShift AI Studio и мой GitHub здесь',
    },
    footer: { rights: 'Все права защищены.', built: 'Сделано на Next.js' },
  },

  uz: {
    skip: 'Asosiy qismga o‘tish',
    langLabel: 'Til',
    themeLabel: 'Qorong‘i mavzu',
    nav: { work: 'Ishlar', services: 'Xizmatlar', process: 'Qanday ishlaydi', faq: 'Savollar', contact: 'Aloqa' },
    hero: {
      eyebrow: 'Ruslan Jurakulov, kichik biznes uchun tezkor saytlar yaratadigan veb-dasturchi',
      title: 'Biznesingiz uchun tez va chiroyli sayt, bir necha kunda',
      sub: 'Tez ochiladigan va telefonda qulay lending hamda kichik biznes saytlari. O‘zbek, rus yoki ingliz tilida.',
      cta: 'Bepul namuna olish',
      note: 'Yangi mijozlar uchun qisqa bepul namuna.',
      ctaWork: 'Ishlarimni ko‘rish',
      emailSubject: 'Bepul sayt namunasi',
      emailBody: 'Assalomu alaykum, Ruslan!\n\nBiznesim:\nNima kerak:\n',
    },
    work: {
      title: 'Ishlar',
      intro: 'Bitta ishlayotgan mahsulot va ochib ko‘rish mumkin bo‘lgan ikkita namunaviy sayt.',
      live: 'Ishlayotgan mahsulot',
      concept: 'Konsept-demo',
      newTab: '(yangi oynada ochiladi)',
      labels: { problem: 'Muammo', built: 'Nima yaratildi', tools: 'Vositalar', shows: 'Bu nimani ko‘rsatadi' },
      cards: [
        {
          title: 'NightShift AI Studio',
          problem: 'Qisqa video yaratish odatda suratga olish, ovoz yozish va qo‘lda montaj qilishni talab qiladi.',
          built: 'Kadrda odamsiz videoni boshidan oxirigacha yaratadigan platforma: ssenariy, ovoz, tasvir va subtitrlar.',
          tools: 'Sun’iy intellekt yordamidagi dasturlash va qo‘lda tekshiruv.',
          shows: 'Men maketlarni emas, haqiqiy mahsulotni ishga tushira olaman.',
          cta: 'Saytni ochish',
        },
        {
          title: 'Kafe lending sahifasi',
          problem: 'Kichik kafega menyu, ish vaqti va manzilni ko‘rsatadigan, telefonda tez ochiladigan sahifa kerak.',
          built: 'Bir sahifali kafe sayti: bosh qism, menyu, ish vaqti, joylashuv va aloqa formasi.',
          tools: 'Next.js, Tailwind CSS, ichki SVG grafika. Tashqi rasm va shriftlarsiz.',
          shows: 'Xayoliy namuna: haqiqiy kafe saytini qanday tuzishim va bezashim. Tez, statik, avvalo telefon uchun.',
          cta: 'Demoni ko‘rish',
        },
        {
          title: 'Frilanser portfoliosi',
          problem: 'Frilanserga ko‘nikma va loyihalari bir qarashda tushunarli bo‘ladigan shaxsiy sayt kerak.',
          built: 'Yorqin bir sahifali portfolio: ko‘nikmalar, uchta namunaviy loyiha va aloqa havolalari.',
          tools: 'Next.js, Tailwind CSS, ichki SVG grafika. Tashqi rasm va shriftlarsiz.',
          shows: 'Xayoliy namuna: bir xil vositalarda boshqacha ko‘rinish, imkoniyatlarni ko‘rsatish uchun.',
          cta: 'Demoni ko‘rish',
        },
      ],
    },
    services: {
      title: 'Nima qila olaman',
      intro: 'Kichik biznes va yakka mutaxassislar uchun amaliy yordam.',
      items: [
        { title: 'Lending sahifalar', text: 'Nima taklif qilishingizni tushuntiradigan va bog‘lanishni osonlashtiradigan bitta sahifa.' },
        { title: 'Kichik biznes saytlari', text: 'Biz haqimizda, ish namunalari va aloqa bo‘limi. Avvalo telefonda qulay.' },
        { title: 'Ko‘p tilli saytlar', text: 'O‘zbek, rus va ingliz tillaridagi saytlar, oddiy til almashtirgich bilan.' },
        { title: 'Oddiy SEO va tez yuklanish', text: 'Toza kod, to‘g‘ri sarlavha va tavsiflar, tez ochiladigan sahifalar.' },
        { title: 'Tuzatish va o‘zgartirish', text: 'Sizda mavjud saytdagi xatolar, ko‘rinish muammolari va yangilanishlar.' },
        { title: 'AI video va kontent vositalari', text: 'Kadrda odamsiz video va kontent jarayonlari, NightShift AI Studio orqali.' },
      ],
    },
    process: {
      title: 'Qanday ishlaydi',
      steps: [
        { title: 'Biznesingiz haqida yuboring', text: 'Nima bilan shug‘ullanishingiz va siz bilan qanday bog‘lanish mumkinligini yozing. Logotip, rasm va matnlar bo‘lsa, yuboring.' },
        { title: 'Birinchi versiyani oling', text: 'Telefonda ochib ko‘rish mumkin bo‘lgan birinchi versiyani tayyorlayman.' },
        { title: 'Tuzatishlar va topshirish', text: 'Sizga ma’qul bo‘lguncha birga tuzatamiz, so‘ng tayyor saytni olasiz.' },
      ],
    },
    why: {
      title: 'Nega men bilan',
      items: [
        { title: 'Tez ishlayman', text: 'Tez ishlash uchun sun’iy intellekt yordamidagi dasturlashdan foydalanaman va hammasini qo‘lda tekshiraman.' },
        { title: 'Sizning tilingizda', text: 'O‘zbek, rus va ingliz tillarida ishlayman.' },
        { title: 'Avvalo telefon uchun', text: 'Saytni avvalo telefon uchun qilaman, chunki ko‘pchilik uni shu yerda ochadi.' },
        { title: 'Oddiy va aniq gaplashaman', text: 'Murakkab so‘zlarsiz. Nima bo‘layotgani va keyingi qadam doim sizga ayon.' },
      ],
    },
    about: {
      title: 'Men haqimda',
      pitch: 'Kichik biznes va yakka mutaxassislarga tez va tushunarli sayt olishda yordam beraman. Siz asosiy ma’lumotni yuborasiz, men birinchi versiyani tayyorlayman va birga yaxshilaymiz.',
      paragraphs: [
        'Men Ruslan, O‘zbekistonda yashaydigan veb-dasturchiman. NightShift AI Studio asoschisiman. Bu kadrda odamsiz videolar yaratadigan sun’iy intellektli video platforma: ssenariy, ovoz, tasvir va subtitrlar.',
        'Zamonaviy va tezkor saytlarni sun’iy intellekt yordamida yarataman va natijani qo‘lda tekshiraman. O‘zbek, rus va ingliz tillarida gaplashaman, shuning uchun sizga qulay tilda ishlay olamiz.',
      ],
      facts: [
        { label: 'Qayerda', value: 'O‘zbekiston' },
        { label: 'Tillar', value: 'o‘zbek, rus, ingliz' },
        { label: 'Asoschisi', value: 'NightShift AI Studio' },
      ],
    },
    faq: {
      title: 'Savollar',
      items: [
        { q: 'Bepul namuna nima?', a: 'Yangi mijozlar avval qisqa bepul namuna so‘rashi mumkin, shunda qaror qilishdan oldin mening ishimni ko‘rasiz.' },
        { q: 'Mendan nima kerak?', a: 'Biznesingiz haqida bir necha qator va siz bilan qanday bog‘lanish mumkinligi. Logotip, rasm va matnlar bo‘lsa, foydali.' },
        { q: 'Qancha vaqt oladi?', a: 'Hajmiga bog‘liq. Oddiy sayt odatda bir necha kun oladi.' },
        { q: 'Keyin o‘zgartirish mumkinmi?', a: 'Ha. Mavjud saytlarni ham tuzataman va yangilayman.' },
        { q: 'Qaysi tillarda ishlaysiz?', a: 'O‘zbek, rus va ingliz tillarida: men bilan muloqot ham, saytingiz ham.' },
      ],
    },
    contact: {
      title: 'Gaplashamiz',
      text: 'Bitta qadam: biznesingiz haqida qisqa xabar yuboring.',
      emailCta: 'Bepul namuna olish',
      channels: 'Yoki NightShift AI Studio va mening GitHub’imni shu yerdan toping',
    },
    footer: { rights: 'Barcha huquqlar himoyalangan.', built: 'Next.js bilan yaratilgan' },
  },
};
