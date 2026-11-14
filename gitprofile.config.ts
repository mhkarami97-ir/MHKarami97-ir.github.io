// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'mhkarami97',
  },
  base: '/',
  projects: {
    github: {
      display: false,
      header: 'Github Projects',
      mode: 'automatic', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 8, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: [], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: [], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      },
    },
    external: {
      header: '',
      // To hide the `External Projects` section, keep it empty.
      projects: [
        {
          title: 'آی ترفند',
          description: 'ترفندهای کاربردی حوضه تکنولوژی',
          imageUrl: '/icons/09.png',
          link: '/p/tarfand',
        },
        {
          title: 'وبلاگ',
          description: 'وبلاگ روزمرگی‌های برنامه‌نویسی',
          imageUrl: '/icons/12.png',
          link: '/p/blog',
        },
        {
          title: 'کتابخانه',
          description: 'کتاب‌های خوانده شده',
          imageUrl: '/icons/03.png',
          link: '/p/book',
        },
        {
          title: 'فیلم‌خانه',
          description: 'فیلم‌های دیده شده',
          imageUrl: '/icons/05.png',
          link: '/p/video',
        },
        {
          title: 'سفرنامه',
          description: 'سفرهای رفته',
          imageUrl: '/icons/06.png',
          link: '/p/travel',
        },
        {
          title: 'کلیپ',
          description: 'کلیپ سفرهای رفته شده',
          imageUrl: '/icons/31.png',
          link: '/p/trip',
        },
        {
          title: 'شعر‌خانه',
          description: 'شعرهای خوانده شده',
          imageUrl: '/icons/11.png',
          link: '/p/poem',
        },
        {
          title: 'فوت‌و‌فن',
          description: 'نکات کاربردی',
          imageUrl: '/icons/16.png',
          link: '/p/trick',
        },
        {
          title: 'جملات انگیزشی',
          description: 'جملات انگیزشی بزرگان',
          imageUrl: '/icons/13.png',
          link: '/p/sentence',
        },
        {
          title: 'لینکدونی',
          description: 'لینک سایت‌های کاربردی',
          imageUrl: '/icons/02.png',
          link: '/p/link',
        },
        {
          title: 'ایونت',
          description: 'ایونت‌های طبیعت‌گردی',
          imageUrl: '/icons/14.png',
          link: '/p/event',
        },
        {
          title: 'فیلم آموزشی',
          description: 'فیلم آموزش',
          imageUrl: '/icons/04.png',
          link: '/p/film',
        },
        {
          title: 'تجربه',
          description: 'تجربه',
          imageUrl: '/icons/17.png',
          link: '/p/experience',
        },
        {
          title: 'کلاس',
          description: 'کلاس درس',
          imageUrl: '/icons/07.png',
          link: '/p/learn',
        },
        {
          title: 'دیکشنری',
          description: 'لغات کاربردی',
          imageUrl: '/icons/18.png',
          link: '/p/dictionary',
        },
        {
          title: 'الگوریتم',
          description: 'سوالات الگوریتمی',
          imageUrl: '/icons/20.png',
          link: '/p/algorithm',
        },
        {
          title: 'لایف لیست',
          description: 'لایف لیست',
          imageUrl: '/icons/22.png',
          link: '/p/list',
        },
        {
          title: 'پرامپ',
          description: 'لیست پرامپت',
          imageUrl: '/icons/23.png',
          link: '/p/prompt',
        },
        {
          title: 'تاریخ',
          description: 'اتفاقات تاریخی',
          imageUrl: '/icons/24.png',
          link: '/p/date',
        },
        {
          title: 'آموزش',
          description: 'محتوای آموزشی',
          imageUrl: '/icons/26.png',
          link: '/p/teach',
        },
        {
          title: 'اقتصاد',
          description: 'اقتصاد به زبان ساده',
          imageUrl: '/icons/29.png',
          link: '/p/economy',
        },
        {
          title: 'سیاست',
          description: 'سیاست به زبان ساده',
          imageUrl: '/icons/27.png',
          link: '/p/politic',
        },
        {
          title: 'علمی',
          description: 'علم به زبان ساده',
          imageUrl: '/icons/30.png',
          link: '/p/science',
        },
        {
          title: 'روانشناسی',
          description: 'مطالب حوزه انسانی',
          imageUrl: '/icons/28.png',
          link: '/p/person',
        },
      ],
    },
  },
  apps: {
    header: 'Applications',
    items: [
      {
        name: 'جعبه ابزار',
        imageUrl: '/icons/app/01.png',
        link: '/p/mhk.webtools',
      },
      {
        name: 'بدن ساز',
        imageUrl: '/icons/app/02.png',
        link: '/p/mhk.sport',
      },
      {
        name: 'تقویم شمسی',
        imageUrl: '/icons/app/04.png',
        link: '/p/mhk.calender',
      },
      {
        name: 'شیردال مارکت',
        imageUrl: '/icons/app/05.png',
        link: '/p/mhk.shirdalmarket',
      },
      {
        name: 'مدیریت مالی',
        imageUrl: '/icons/app/06.png',
        link: '/p/mhk.finance',
      },
      {
        name: 'مدیریت کارها',
        imageUrl: '/icons/app/07.png',
        link: '/p/mhk.task',
      },
      {
        name: 'چاوشان',
        imageUrl: '/icons/app/08.png',
        link: '/p/mhk.chavooshan',
      },
      {
        name: 'زلف دوتا',
        imageUrl: '/icons/app/09.png',
        link: '/p/mhk.zolfdota',
      },
      {
        name: 'دور گردون',
        imageUrl: '/icons/app/10.png',
        link: '/p/mhk.dorgardoon',
      },
      {
        name: 'چک لیست',
        imageUrl: '/icons/app/11.png',
        link: '/p/mhk.checklist',
      },
      {
        name: 'ملک ری',
        imageUrl: '/icons/app/12.png',
        link: '/p/mhk.molkrey',
      },
      {
        name: 'زروان',
        imageUrl: '/icons/app/13.png',
        link: '/p/mhk.zoorvan',
      },
      {
        name: 'زمانک',
        imageUrl: '/icons/app/14.png',
        link: '/p/mhk.zamaanak',
      },
      {
        name: 'هنگام',
        imageUrl: '/icons/app/15.png',
        link: '/p/mhk.hengam',
      },
      {
        name: 'فرمول یک',
        imageUrl: '/icons/app/16.png',
        link: '/p/mhk.f1',
      },
      {
        name: 'موتو جی‌پی',
        imageUrl: '/icons/app/18.png',
        link: '/p/mhk.motogp',
      },
      {
        name: 'شکسته',
        imageUrl: '/icons/app/17.png',
        link: '/p/mhk.shekaste',
      },
      {
        name: 'خرید‌یار',
        imageUrl: '/icons/app/19.png',
        link: '/p/mhk.buy',
      },
      {
        name: 'سرویس‌یار',
        imageUrl: '/icons/app/20.png',
        link: '/p/mhk.service',
      },
      {
        name: 'ماهک',
        imageUrl: '/icons/app/03.png',
        link: '/p/mhk.period',
      },
      {
        name: 'سفربان',
        imageUrl: '/icons/app/21.png',
        link: '/p/mhk.safar',
      },
      {
        name: 'مدیر‌یار',
        imageUrl: '/icons/app/22.png',
        link: '/p/mhk.school',
      },
      {
        name: 'نرخ',
        imageUrl: '/icons/app/23.png',
        link: '/p/mhk.nerkh',
      },
      {
        name: 'سلامت',
        imageUrl: '/icons/app/24.png',
        link: '/p/mhk.health',
      },
      {
        name: 'آب و هوا',
        imageUrl: '/icons/app/25.png',
        link: '/p/mhk.weather',
      },
      {
        name: 'زبان انگلیسی',
        imageUrl: '/icons/app/26.png',
        link: '/p/mhk.english',
      },
      {
        name: 'خاطره‌نامه',
        imageUrl: '/icons/app/27.png',
        link: '/p/mhk.memory',
      },
      {
        name: 'هوش‌مصنوعی',
        imageUrl: '/icons/app/28.png',
        link: '/p/mhk.ai.tools',
      },
      {
        name: 'غزل',
        imageUrl: '/icons/app/29.png',
        link: '/p/mhk.ghazal',
      },
      {
        name: 'سینما',
        imageUrl: '/icons/app/30.png',
        link: '/p/mhk.movie',
      },
      {
        name: 'کاوش',
        imageUrl: '/icons/app/31.png',
        link: '/p/mhk.habit',
      },
      {
        name: 'پیوند',
        imageUrl: '/icons/app/32.png',
        link: '/p/crm.zamaanak',
      },
    ],
  },
  games: {
    header: 'Games',
    items: [
      {
        name: 'جعبه بازی',
        imageUrl: '/icons/game/01.png',
        link: '/p/mhk.gamebox',
      },
      {
        name: 'چیستا',
        imageUrl: '/icons/game/02.png',
        link: '/p/mhk.chista',
      },
    ],
  },
  nuget: {
    header: 'Nuget',
    items: [
      {
        name: 'EasyMultiCacheManager',
        imageUrl: '/icons/nuget/04.png',
        link: '/p/EasyMultiCacheManager',
      },
      {
        name: 'EasyPersianNormalizer',
        imageUrl: '/icons/nuget/01.png',
        link: '/p/EasyPersianNormalizer',
      },
      {
        name: 'EasyPool',
        imageUrl: '/icons/nuget/02.png',
        link: '/p/EasyPool',
      },
      {
        name: 'SkipList',
        imageUrl: '/icons/nuget/03.png',
        link: '/p/SkipList',
      },
    ],
  },
  telegramBots: {
    header: 'Telegram Bots',
    items: [
      { name: 'قیمت لحظه‌ای طلا', id: 'what_my_price_bot' },
      { name: 'طالع بینی', id: 'my_persian_fortune_telling_bot' },
      { name: 'یادگیری زبان', id: 'my_english_persian_learner_bot' },
      { name: 'شعر فارسی', id: 'my_persian_poem_bot' },
      { name: 'تقویم شمسی', id: 'my_persian_date_bot' },
      { name: 'آب و هوا', id: 'what_my_weather_bot' },
      { name: 'مبدل واحد', id: 'my_unit_convert_bot' },
      { name: 'تغییر فونت', id: 'my_font_changer_bot' },
      { name: 'پیام ناشناس', id: 'my_unknown_message_bot' },
    ],
  },
  telegramChannels: {
    header: 'Telegram Channels',
    items: [
      { name: 'میم خنده‌دار', id: 'griphin_meme' },
      { name: 'پرامپ هوش مصنوعی', id: 'griphin_prompt' },
      { name: 'پروکسی تلگرام', id: 'griphin_proxy' },
      { name: 'شعر فارسی', id: 'griphin_poem' },
      { name: 'اخبار تکنولوژی', id: 'karam97_dev' },
      { name: 'سفرنامه', id: 'karamtravel' },
    ],
  },
  browserExtensions: {
    header: 'Browser Extensions',
    items: [
      {
        name: 'New Tab',
        imageUrl: '/icons/extension/01.png',
        link: '/p/my-persian-dashboard',
      },
      {
        name: 'Font Changer',
        imageUrl: '/icons/extension/02.png',
        link: '/p/font-changer',
      },
      {
        name: 'Easy Translate',
        imageUrl: '/icons/extension/03.png',
        link: '/p/easy-translate',
      },
      {
        name: 'Ai Meet',
        imageUrl: '/icons/extension/04.png',
        link: '/p/ai-meet',
      },
    ],
  },
  npm: {
    header: 'NPM',
    items: [
      {
        name: 'Persian normalizer',
        imageUrl: '/icons/npm/01.png',
        link: '/p/easy-persian-text-normalizer',
      },
    ],
  },
  jetbrains: {
    header: 'Jetbrains',
    items: [
      {
        name: 'Exception View',
        imageUrl: '/icons/jetbrains/01.png',
        link: '/p/demystified-stack-trace-links',
      },
    ],
  },
  software: {
    header: 'Software',
    items: [
      {
        name: 'KeyFlip',
        imageUrl: '/icons/software/01.png',
        link: '/p/KeyFlip',
      },
      {
        name: 'Radpa',
        imageUrl: '/icons/software/02.png',
        link: '/p/Radpa',
      },
    ],
  },
  seo: {
    title: 'محمد حسین کرمی | Mohammad Hossein Karami',
    description:
      'محمد حسین کرمی (Mohammad Hossein Karami) | برنامه‌نویس ارشد و تورلیدر',
    imageURL: 'https://mhkarami97.ir/favicon.png',
  },
  social: {
    linkedin: 'mhkarami97',
    instagram: 'mhkarami97',
    threads: 'mhkarami97',
    x: 'mhkarami97',
    youtube: 'mhkarami97',
    aparat: 'mhkarami97',
    telegram: 'mhkarami_97',
    email: 'mhkarami97@gmail.com',
    leetCode: 'mhkarami97',
    cafebazaar: 'mhkarami97',
    medium: 'mhkarami97',
    dev: 'mhkarami97',
    stackoverflow: 'mhkarami97',
  },
  website: {
    travel: '/p/travel',
    tour: 'Tour.mhkarami97.ir',
    experience: '/p/mhk.zoorvan',
    shop: '/p/mhk.shirdalmarket',
    house: 'YarKhoone.ir',
    chavooshan: '/p/mhk.chavooshan',
    zolfdota: '/p/mhk.zolfdota',
    dorgardoon: '/p/mhk.dorgardoon',
    molkrey: '/p/mhk.molkrey',
    zamaanak: '/p/mhk.zamaanak',
    hengam: '/p/mhk.hengam',
    crm: '/p/crm.zamaanak',
  },
  tool: {
    magicBox: 'magic.mhkarami97.ir',
    gameBox: '/p/mhk.gamebox',
    toolBox: '/p/mhk.webtools',
    calender: '/p/mhk.calender',
    finance: '/p/mhk.finance',
    sport: '/p/mhk.sport',
    task: '/p/mhk.task',
    checkList: '/p/mhk.checklist',
    f1: '/p/mhk.f1',
    motogp: '/p/mhk.motogp',
    shekaste: '/p/mhk.shekaste',
    ghazal: '/p/mhk.ghazal',
    shortLink: 's.mhkarami97.ir',
    buy: '/p/mhk.buy',
    service: '/p/mhk.service',
    period: '/p/mhk.period',
    safar: '/p/mhk.safar',
    school: '/p/mhk.school',
    nerkh: '/p/mhk.nerkh',
    health: '/p/mhk.health',
    weather: '/p/mhk.weather',
    english: '/p/mhk.english',
    memory: '/p/mhk.memory',
    habit: '/p/mhk.habit',
    movie: '/p/mhk.movie',
    ai: '/p/mhk.ai.tools',
    proxy: 'tel-proxy.vercel.app',
  },
  resume: {
    fileUrl: '',
  },
  skills: ['.NET/C#', 'SQL', 'Angular', 'VueJs', 'Leadership'],
  experiences: [
    {
      company: 'FreeLancer',
      position: 'FullStack',
      from: '2018',
      to: '2020',
      companyLink: 'https://mhkarami97.ir',
    },
    {
      company: 'Asa Co',
      position: 'Backend Developer',
      from: '2020',
      to: '2025',
      companyLink: 'https://asax.ir',
    },
    {
      company: 'Asa Co',
      position: 'Team Lead',
      from: '2025',
      to: '2026',
      companyLink: 'https://asax.ir',
    },
    {
      company: 'Asa Co',
      position: 'Senior Software Engineer',
      from: '2026',
      to: 'Present',
      companyLink: 'https://asax.ir',
    },
  ],
  educations: [
    {
      institution: 'Computer Engineer',
      degree: 'Bachelor',
      from: '2016',
      to: '2020',
    },
    {
      institution: 'Software Engineer',
      degree: 'Master',
      from: '2020',
      to: '2022',
    },
  ],
  googleAnalytics: {
    id: '',
  },
  themeConfig: {
    defaultTheme: 'procyon',
    disableSwitch: true,
    respectPrefersColorScheme: true,
    displayAvatarRing: true,
    themes: ['procyon'],
    customTheme: {
      primary: '#6F48FF',
      secondary: '#6F48FF',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },
  footer: `طراحی شده توسط <a 
      class="text-secondary" style="color: #8d3bff" href="https://mhkarami97.ir"
      target="_blank"
      rel="noreferrer"
    >محمد حسین کرمی</a>`,
  enablePWA: true,
};

export default CONFIG;
