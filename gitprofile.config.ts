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
      header: 'سایت',
      // To hide the `External Projects` section, keep it empty.
      projects: [
        {
          title: 'آی ترفند',
          description:
              'ترفندهای کاربردی حوضه تکنولوژی',
          imageUrl: '/icons/09.png',
          link: 'https://tarfand.mhkarami97.ir',
        },
        {
          title: 'وبلاگ',
          description:
              'وبلاگ روزمرگی‌های برنامه‌نویسی',
          imageUrl: '/icons/12.png',
          link: 'https://blog.mhkarami97.ir',
        },
        {
          title: 'کتابخانه',
          description:
              'کتاب‌های خوانده شده',
          imageUrl: '/icons/03.png',
          link: 'https://book.mhkarami97.ir',
        },
        {
          title: 'فیلم‌خانه',
          description:
              'فیلم‌های دیده شده',
          imageUrl: '/icons/05.png',
          link: 'https://video.mhkarami97.ir',
        },
        {
          title: 'سفرنامه',
          description:
              'سفرهای رفته',
          imageUrl: '/icons/06.png',
          link: 'https://travel.mhkarami97.ir',
        },
        {
          title: 'کلیپ',
          description:
              'کلیپ سفرهای رفته شده',
          imageUrl: '/icons/06.png',
          link: 'https://trip.mhkarami97.ir',
        },
        {
          title: 'شعر‌خانه',
          description:
              'شعرهای خوانده شده',
          imageUrl: '/icons/11.png',
          link: 'https://poem.mhkarami97.ir',
        },
        {
          title: 'فوت‌و‌فن',
          description:
              'نکات کاربردی',
          imageUrl: '/icons/16.png',
          link: 'https://trick.mhkarami97.ir',
        },
        {
          title: 'جملات انگیزشی',
          description:
              'جملات انگیزشی بزرگان',
          imageUrl: '/icons/13.png',
          link: 'https://sentence.mhkarami97.ir',
        },
        {
          title: 'لینکدونی',
          description:
              'لینک سایت‌های کاربردی',
          imageUrl: '/icons/02.png',
          link: 'https://link.mhkarami97.ir',
        },
        {
          title: 'ایونت',
          description:
              'ایونت‌های طبیعت‌گردی',
          imageUrl: '/icons/14.png',
          link: 'https://event.mhkarami97.ir',
        },
        {
          title: 'طبیعت‌گردی',
          description:
              'رزومه طبیعت‌گردی',
          imageUrl: '/icons/01.png',
          link: 'https://tour.mhkarami97.ir',
        },
        {
          title: 'تجربه',
          description:
              'تجربه',
          imageUrl: '/icons/17.png',
          link: 'https://experience.mhkarami97.ir',
        },
        {
          title: 'آهنگ‌خانه',
          description:
              'گلچین آهنگ‌ها',
          imageUrl: '/icons/15.png',
          link: 'https://music.mhkarami97.ir',
        },
      ],
    },
  },
  seo: {
    title: 'محمد حسین کرمی',
    description: 'MHKarami, mhkarami97, mohammad hossein karami, cv, resume',
    imageURL: 'https://mhkarami97.ir/favicon.png',
  },
  social: {
    linkedin: 'mhkarami97',
    instagram: 'mhkarami97',
    youtube: 'mhkarami97',
    aparat: 'mhkarami97',
    telegram: 'mhkarami_97',
    email: 'mhkarami97@gmail.com',
  },
  resume: {
    fileUrl:
      '',
  },
  skills: [
    'C#',
    'SQL',
    'Angular',
    'VueJs'
  ],
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
      to: 'Present',
      companyLink: 'https://asax.ir',
    },
  ],
  certifications: [
    {
      name: 'C#',
      body: 'LinkedIn Skill Assessment badge',
      year: '2022',
      link: 'https://www.linkedin.com/in/mhkarami97/details/skills/'
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
    id: 'G-DZM25ZLKRP',
  },
  themeConfig: {
    defaultTheme: 'procyon',
    disableSwitch: true,
    respectPrefersColorScheme: true,
    displayAvatarRing: true,
    themes: [
      'procyon',
    ],
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
