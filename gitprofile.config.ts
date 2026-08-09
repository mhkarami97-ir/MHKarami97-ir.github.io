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
          link: 'https://tarfand.mhkarami97.ir',
        },
        {
          title: 'وبلاگ',
          description: 'وبلاگ روزمرگی‌های برنامه‌نویسی',
          imageUrl: '/icons/12.png',
          link: 'https://blog.mhkarami97.ir',
        },
        {
          title: 'کتابخانه',
          description: 'کتاب‌های خوانده شده',
          imageUrl: '/icons/03.png',
          link: 'https://book.mhkarami97.ir',
        },
        {
          title: 'فیلم‌خانه',
          description: 'فیلم‌های دیده شده',
          imageUrl: '/icons/05.png',
          link: 'https://video.mhkarami97.ir',
        },
        {
          title: 'سفرنامه',
          description: 'سفرهای رفته',
          imageUrl: '/icons/06.png',
          link: 'https://travel.mhkarami97.ir',
        },
        {
          title: 'کلیپ',
          description: 'کلیپ سفرهای رفته شده',
          imageUrl: '/icons/31.png',
          link: 'https://trip.mhkarami97.ir',
        },
        {
          title: 'شعر‌خانه',
          description: 'شعرهای خوانده شده',
          imageUrl: '/icons/11.png',
          link: 'https://poem.mhkarami97.ir',
        },
        {
          title: 'فوت‌و‌فن',
          description: 'نکات کاربردی',
          imageUrl: '/icons/16.png',
          link: 'https://trick.mhkarami97.ir',
        },
        {
          title: 'جملات انگیزشی',
          description: 'جملات انگیزشی بزرگان',
          imageUrl: '/icons/13.png',
          link: 'https://sentence.mhkarami97.ir',
        },
        {
          title: 'لینکدونی',
          description: 'لینک سایت‌های کاربردی',
          imageUrl: '/icons/02.png',
          link: 'https://link.mhkarami97.ir',
        },
        {
          title: 'ایونت',
          description: 'ایونت‌های طبیعت‌گردی',
          imageUrl: '/icons/14.png',
          link: 'https://event.mhkarami97.ir',
        },
        {
          title: 'فیلم آموزشی',
          description: 'فیلم آموزش',
          imageUrl: '/icons/04.png',
          link: 'https://film.mhkarami97.ir',
        },
        {
          title: 'تجربه',
          description: 'تجربه',
          imageUrl: '/icons/17.png',
          link: 'https://experience.mhkarami97.ir',
        },
        {
          title: 'کلاس',
          description: 'کلاس درس',
          imageUrl: '/icons/07.png',
          link: 'https://learn.mhkarami97.ir',
        },
        {
          title: 'دیکشنری',
          description: 'لغات کاربردی',
          imageUrl: '/icons/18.png',
          link: 'https://dictionary.mhkarami97.ir',
        },
        {
          title: 'الگوریتم',
          description: 'سوالات الگوریتمی',
          imageUrl: '/icons/20.png',
          link: 'https://algorithm.mhkarami97.ir',
        },
        {
          title: 'لایف لیست',
          description: 'لایف لیست',
          imageUrl: '/icons/22.png',
          link: 'https://list.mhkarami97.ir',
        },
        {
          title: 'پرامپ',
          description: 'لیست پرامپت',
          imageUrl: '/icons/23.png',
          link: 'https://prompt.mhkarami97.ir',
        },
        {
          title: 'تاریخ',
          description: 'اتفاقات تاریخی',
          imageUrl: '/icons/24.png',
          link: 'https://date.mhkarami97.ir',
        },
        {
          title: 'آموزش',
          description: 'محتوای آموزشی',
          imageUrl: '/icons/26.png',
          link: 'https://teach.mhkarami97.ir',
        },
        {
          title: 'اقتصاد',
          description: 'اقتصاد به زبان ساده',
          imageUrl: '/icons/29.png',
          link: 'https://economy.mhkarami97.ir',
        },
        {
          title: 'سیاست',
          description: 'سیاست به زبان ساده',
          imageUrl: '/icons/27.png',
          link: 'https://politic.mhkarami97.ir',
        },
        {
          title: 'علمی',
          description: 'علم به زبان ساده',
          imageUrl: '/icons/30.png',
          link: 'https://science.mhkarami97.ir',
        },
        {
          title: 'روانشناسی',
          description: 'مطالب حوزه انسانی',
          imageUrl: '/icons/28.png',
          link: 'https://person.mhkarami97.ir',
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
        link: 'https://cafebazaar.ir/app/mhk.webtools',
      },
      {
        name: 'بدن ساز',
        imageUrl: '/icons/app/02.png',
        link: 'https://cafebazaar.ir/app/mhk.sport',
      },
      {
        name: 'تقویم شمسی',
        imageUrl: '/icons/app/04.png',
        link: 'https://cafebazaar.ir/app/mhk.calender',
      },
      {
        name: 'تجربه‌نامه',
        imageUrl: '/icons/app/05.png',
        link: 'https://cafebazaar.ir/app/mhk.zoorvan',
      },
      {
        name: 'مدیریت مالی',
        imageUrl: '/icons/app/06.png',
        link: 'https://cafebazaar.ir/app/mhk.finance',
      },
      {
        name: 'مدیریت کارها',
        imageUrl: '/icons/app/07.png',
        link: 'https://cafebazaar.ir/app/mhk.task',
      },
      {
        name: 'چاوشان',
        imageUrl: '/icons/app/08.png',
        link: 'https://cafebazaar.ir/app/mhk.chavooshan',
      },
      {
        name: 'زلف دوتا',
        imageUrl: '/icons/app/09.png',
        link: 'https://cafebazaar.ir/app/mhk.zolfdota',
      },
      {
        name: 'دور گردون',
        imageUrl: '/icons/app/10.png',
        link: 'https://cafebazaar.ir/app/mhk.dorgardoon',
      },
      {
        name: 'چک لیست',
        imageUrl: '/icons/app/11.png',
        link: 'https://cafebazaar.ir/app/mhk.checklist',
      },
      {
        name: 'ملک ری',
        imageUrl: '/icons/app/12.png',
        link: 'https://cafebazaar.ir/app/mhk.molkrey',
      },
      {
        name: 'زروان',
        imageUrl: '/icons/app/13.png',
        link: 'https://cafebazaar.ir/app/mhk.zoorvan',
      },
    ],
  },
  games: {
    header: 'Games',
    items: [
      {
        name: 'جعبه بازی',
        imageUrl: '/icons/game/01.png',
        link: 'https://cafebazaar.ir/app/mhk.gamebox',
      },
      {
        name: 'چیستا',
        imageUrl: '/icons/game/02.png',
        link: 'https://cafebazaar.ir/app/mhk.chista',
      },
    ],
  },
  nuget: {
    header: 'Nuget',
    items: [
      {
        name: 'EasyMultiCacheManager',
        imageUrl: '/icons/nuget/04.png',
        link: 'https://www.nuget.org/packages/EasyMultiCacheManager',
      },
      {
        name: 'EasyPersianNormalizer',
        imageUrl: '/icons/nuget/01.png',
        link: 'https://www.nuget.org/packages/EasyPersianNormalizer',
      },
      {
        name: 'EasyPool',
        imageUrl: '/icons/nuget/02.png',
        link: 'https://www.nuget.org/packages/EasyPool',
      },
      {
        name: 'SkipList',
        imageUrl: '/icons/nuget/03.png',
        link: 'https://www.nuget.org/packages/SkipList',
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
      { name: 'سفرنامه', id: 'KaramTravel' },
    ],
  },
  browserExtensions: {
    header: 'Browser Extensions',
    items: [
      {
        name: 'New Tab',
        imageUrl: '/icons/extension/01.png',
        link: 'https://microsoftedge.microsoft.com/addons/detail/%D8%AF%D8%A7%D8%B4%D8%A8%D9%88%D8%B1%D8%AF-%D9%81%D8%A7%D8%B1%D8%B3%DB%8C/mdnmgigpikijbhjenbjknhcnldebobpa',
      },
      {
        name: 'Font Changer',
        imageUrl: '/icons/extension/02.png',
        link: 'https://microsoftedge.microsoft.com/addons/detail/font-changer-for-google-f/hhalocjgpdnjfoimnaaphihomijagcmo',
      },
    ],
  },
  seo: {
    title: 'محمد حسین کرمی',
    description: 'MHKarami, mhkarami97, mohammad hossein karami, cv, resume',
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
    travel: 'KaramTravel.ir',
    tour: 'Tour.mhkarami97.ir',
    experience: 'Zoorvan.ir',
    shop: 'ShirdalMarket.ir',
    house: 'YarKhoone.ir',
    chavooshan: 'Chavooshan.ir',
    zolfdota: 'ZolfDota.ir',
    dorgardoon: 'DorGardoon.ir',
    molkrey: 'MolkRey.ir',
  },
  tool: {
    magicBox: 'magic.mhkarami97.ir',
    gameBox: 'game.mhkarami97.ir',
    toolBox: 'ai.mhkarami97.ir',
    calender: 'calender.mhkarami97.ir',
    finance: 'finance.mhkarami97.ir',
    sport: 'sport.mhkarami97.ir',
    task: 'task.mhkarami97.ir',
    checkList: 'checklist.mhkarami97.ir',
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
  certifications: [
    {
      name: 'C#',
      body: 'LinkedIn Skill Assessment badge',
      year: '2022',
      link: 'https://www.linkedin.com/in/mhkarami97/details/skills/',
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
    id: 'G-2KGKGYQR60',
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
