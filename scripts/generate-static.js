import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const productsTsPath = path.join(rootDir, 'src', 'data', 'products.ts');
const productsTs = fs.readFileSync(productsTsPath, 'utf-8');

const match = productsTs.match(
  /export const PRODUCTS: ProductConfig\[\] = (\[[\s\S]*?\]);/,
);
if (!match) {
  console.error('Failed to parse PRODUCTS from products.ts');
  process.exit(1);
}

// Evaluate JS object literal safely
const products = vm.runInNewContext(match[1]);
console.log(`[generate-static] Loaded ${products.length} products`);

const publicDir = path.join(rootDir, 'public');
const pDir = path.join(publicDir, 'p');
fs.mkdirSync(pDir, { recursive: true });

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const today = new Date().toISOString().split('T')[0];

const sitemapUrls = [
  `  <url>
    <loc>https://mhkarami97.ir/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`,
  `  <url>
    <loc>https://mhkarami97.ir/privacy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>`,
];

for (const p of products) {
  const itemDir = path.join(pDir, p.id);
  fs.mkdirSync(itemDir, { recursive: true });

  const canonicalUrl = `https://mhkarami97.ir/p/${p.id}`;
  const ogImage =
    p.screenshots && p.screenshots.length > 0
      ? `https://mhkarami97.ir${p.screenshots[0]}`
      : `https://mhkarami97.ir${p.icon}`;

  const metaDesc = escapeHtml(p.shortDescription || p.title);
  const escapedTitle = escapeHtml(`${p.title} | محمد حسین کرمی`);
  const escapedName = escapeHtml(p.name);
  const escapedCategory = escapeHtml(p.category);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': p.type === 'app' ? 'SoftwareApplication' : 'WebApplication',
    name: p.name,
    headline: p.title,
    description: p.shortDescription || p.fullDescription,
    image: ogImage,
    url: canonicalUrl,
    applicationCategory: p.category,
    operatingSystem:
      p.type === 'app'
        ? 'Android, iOS, Web (PWA)'
        : p.type === 'extension'
          ? 'Browser (Edge, Chrome)'
          : 'Cross-platform',
    author: {
      '@type': 'Person',
      name: 'Mohammad Hossein Karami',
      url: 'https://mhkarami97.ir',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'IRR',
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'خانه',
        item: 'https://mhkarami97.ir/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: p.category,
        item: 'https://mhkarami97.ir/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: p.name,
        item: canonicalUrl,
      },
    ],
  };

  let actionButtonsHtml = '';
  if (p.type === 'app') {
    if (p.links && p.links.android) {
      actionButtonsHtml += `
        <a href="${escapeHtml(p.links.android)}" target="_blank" rel="noopener noreferrer" class="btn-action btn-primary-action">
          <span class="btn-sub">دریافت نسخه اندروید</span>
          <span class="btn-main">دانلود از کافه بازار</span>
        </a>`;
    }
    if (p.links && p.links.ios) {
      actionButtonsHtml += `
        <a href="${escapeHtml(p.links.ios)}" target="_blank" rel="noopener noreferrer" class="btn-action btn-secondary-action">
          <span class="btn-sub">اجرا در وب، آیفون و دسکتاپ</span>
          <span class="btn-main">نسخه تحت وب (PWA)</span>
        </a>`;
    }
  } else if (p.links && p.links.direct) {
    const direct = p.links.direct;
    const cat = p.category || '';
    let mainLabel = 'مشاهده و استفاده از محصول';
    let subLabel = 'لینک مستقیم به صفحه محصول';
    let btnStyleClass = 'btn-primary-action';

    if (cat.includes('JetBrains') || direct.includes('jetbrains.com')) {
      mainLabel = 'دریافت از JetBrains Marketplace';
      subLabel = 'افزونه رسمی محیط توسعه Rider و IntelliJ';
      btnStyleClass = 'btn-neutral-action';
    } else if (
      cat.includes('ویندوز') ||
      (direct.includes('github.com') && direct.includes('/releases'))
    ) {
      mainLabel = 'دانلود مستقیم برای ویندوز';
      subLabel = 'نسخه رسمی ویندوز (GitHub Releases)';
      btnStyleClass = 'btn-primary-action';
    } else if (cat.includes('NuGet') || direct.includes('nuget.org')) {
      mainLabel = 'مشاهده در مخزن NuGet Gallery';
      subLabel = 'نصب با دستور dotnet add package';
      btnStyleClass = 'btn-primary-action';
    } else if (cat.includes('NPM') || direct.includes('npmjs.com')) {
      mainLabel = 'مشاهده در مخزن npm Registry';
      subLabel = 'نصب با دستور npm i';
      btnStyleClass = 'btn-primary-action';
    } else if (
      cat.includes('مرورگر') ||
      direct.includes('microsoftedge.com') ||
      direct.includes('chrome.google.com')
    ) {
      mainLabel = 'نصب افزونه در مرورگر (اج / کروم)';
      subLabel = 'نصب رایگان از فروشگاه افزونه‌ها';
      btnStyleClass = 'btn-primary-action';
    } else if (
      p.type === 'bot' ||
      direct.includes('t.me') ||
      direct.includes('telegram.me')
    ) {
      mainLabel = 'ورود به ربات در تلگرام';
      subLabel = 'اجرا و استفاده رایگان در تلگرام';
      btnStyleClass = 'btn-info-action';
    } else if (
      p.type === 'website' ||
      cat.includes('سایت') ||
      cat.includes('وب')
    ) {
      mainLabel = 'ورود به وب‌سایت رسمی';
      subLabel = 'مشاهده آنلاین در مرورگر';
      btnStyleClass = 'btn-primary-action';
    }

    actionButtonsHtml += `
      <a href="${escapeHtml(direct)}" target="_blank" rel="noopener noreferrer" class="btn-action ${btnStyleClass}">
        <span class="btn-sub">${subLabel}</span>
        <span class="btn-main">${mainLabel}</span>
      </a>`;
  }

  let featuresHtml = '';
  if (p.features && p.features.length > 0) {
    featuresHtml = `
      <section class="section-card">
        <div class="section-header">
          <h2 class="section-title">ویژگی‌ها و قابلیت‌های کلیدی</h2>
          <span class="badge-count">${p.features.length} ویژگی</span>
        </div>
        <div class="features-grid">
          ${p.features.map((f) => `<div class="feature-item"><span class="check">✓</span><span>${escapeHtml(f)}</span></div>`).join('')}
        </div>
      </section>`;
  }

  let screenshotsHtml = '';
  if (p.screenshots && p.screenshots.length > 0) {
    screenshotsHtml = `
      <section class="section-card">
        <div class="section-header">
          <h2 class="section-title">تصاویر محیط برنامه</h2>
          <span class="badge-count">${p.screenshots.length} تصویر</span>
        </div>
        <div class="screenshots-scroll">
          ${p.screenshots.map((s, i) => `<img src="${s}" alt="${escapedName} - تصویر ${i + 1}" class="screenshot-img" loading="lazy" />`).join('')}
        </div>
      </section>`;
  }

  let descHtml = '';
  if (p.fullDescription) {
    const paragraphs = p.fullDescription
      .split('\n\n')
      .map((para) => {
        const trimmed = para.trim();
        if (!trimmed) return '';
        const lines = trimmed.split('\n');
        const isList =
          lines.length > 1 &&
          lines.every(
            (l) =>
              l.trim().startsWith('-') ||
              l.trim().startsWith('•') ||
              l.trim().startsWith('*') ||
              /^\d+\./.test(l.trim()),
          );
        if (isList) {
          return `<ul class="desc-list">${lines.map((l) => `<li><span class="bullet">◆</span><span>${escapeHtml(l.replace(/^[-•*]|\d+\./, '').trim())}</span></li>`).join('')}</ul>`;
        }
        return `<p>${escapeHtml(trimmed).replace(/\n/g, '<br/>')}</p>`;
      })
      .filter(Boolean)
      .join('');

    descHtml = `
      <section class="section-card">
        <div class="section-header">
          <h2 class="section-title">درباره و معرفی کامل ${escapedName}</h2>
          <div class="header-badges">
            <span>🛡️ تضمین امنیت</span>
            <span>•</span>
            <span>👤 محمد حسین کرمی</span>
          </div>
        </div>
        <div class="description-body">${paragraphs}</div>
        <div class="desc-footer">
          <div><strong>دسته‌بندی:</strong> ${escapedCategory}</div>
          <div><strong>مجوز:</strong> کاملاً رایگان برای عموم کاربران</div>
          <div><strong>توسعه‌دهنده:</strong> <a href="https://mhkarami97.ir">محمد حسین کرمی</a></div>
        </div>
      </section>`;
  }

  const html = `<!doctype html>
<html lang="fa" dir="rtl" data-theme="procyon">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapedTitle}</title>

    <meta name="title" content="${escapedTitle}" />
    <meta name="description" content="${metaDesc}" />
    <meta name="keywords" content="${escapeHtml(p.tags?.join(', ') || p.name)}" />
    <meta name="author" content="محمد حسین کرمی | Mohammad Hossein Karami" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${escapedTitle}" />
    <meta property="og:description" content="${metaDesc}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:site_name" content="محمد حسین کرمی" />
    <meta property="og:locale" content="fa_IR" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${escapedTitle}" />
    <meta name="twitter:description" content="${metaDesc}" />
    <meta name="twitter:image" content="${ogImage}" />

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/logo.png" />
    <link rel="stylesheet" href="/fonts/Vazirmatn-font-face.css" />

    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
      ${JSON.stringify(jsonLd)}
    </script>
    <script type="application/ld+json">
      ${JSON.stringify(breadcrumbLd)}
    </script>

    <style>
      :root {
        --primary: #6f48ff;
        --secondary: #8d3bff;
        --bg-page: #f2f3f8;
        --bg-card: #ffffff;
        --text: #2a2730;
        --border: #e2e4ed;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background-color: var(--bg-page);
        color: var(--text);
        line-height: 1.6;
        direction: rtl;
        text-align: right;
      }
      .container { max-width: 980px; margin: 0 auto; padding: 24px 16px; }
      .nav-top {
        display: flex; align-items: center; justify-content: space-between;
        background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px);
        border: 1px solid var(--border); border-radius: 18px; padding: 12px 18px;
        margin-bottom: 24px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);
      }
      .btn-back {
        display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px;
        background: rgba(111,72,255,0.08); border: 1px solid rgba(111,72,255,0.2); border-radius: 12px;
        color: var(--primary); text-decoration: none; font-size: 13px; font-weight: 700;
        transition: all 0.2s;
      }
      .btn-back:hover { background: var(--primary); color: #fff; }
      .breadcrumb { font-size: 13px; color: #666; display: flex; align-items: center; gap: 8px; }
      .breadcrumb-badge {
        background: rgba(111,72,255,0.1); color: var(--primary); padding: 2px 8px;
        border-radius: 9999px; font-weight: 600; font-size: 12px;
      }
      .hero-card {
        background: var(--bg-card); border: 1px solid var(--border); border-radius: 28px;
        padding: 36px 28px; box-shadow: 0 10px 30px -8px rgba(0,0,0,0.05);
        display: flex; flex-direction: column; gap: 28px; margin-bottom: 24px;
      }
      @media (min-width: 640px) {
        .hero-card { flex-direction: row; align-items: flex-start; }
      }
      .product-icon {
        width: 124px; height: 124px; border-radius: 28px; object-fit: cover;
        box-shadow: 0 10px 20px rgba(0,0,0,0.08); border: 3px solid rgba(111,72,255,0.2);
        flex-shrink: 0; margin: 0 auto;
      }
      .hero-content { flex-grow: 1; }
      .badges-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; align-items: center; }
      .badge {
        display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px;
        font-weight: 600; color: var(--primary); border: 1px solid var(--primary);
      }
      .badge-free { background: #f0f1f5; color: #555; border: 1px solid #ddd; }
      h1 { font-size: 26px; font-weight: 800; margin-bottom: 10px; color: var(--text); line-height: 1.4; }
      .short-desc { font-size: 16px; color: #555; margin-bottom: 22px; line-height: 1.7; }
      .actions { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
      .btn-action {
        display: inline-flex; flex-direction: column; text-align: right;
        padding: 10px 20px; border-radius: 16px; text-decoration: none;
        transition: all 0.2s; box-shadow: 0 4px 14px rgba(0,0,0,0.08);
      }
      .btn-action:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.12); }
      .btn-sub { font-size: 11px; opacity: 0.85; font-weight: normal; margin-bottom: 2px; }
      .btn-main { font-size: 14px; font-weight: 700; }
      .btn-primary-action { background: var(--primary); color: #fff; }
      .btn-secondary-action { background: #2a2730; color: #fff; }
      .btn-neutral-action { background: #1a1a24; color: #fff; }
      .btn-info-action { background: #0284c7; color: #fff; }
      .section-card {
        background: var(--bg-card); border: 1px solid var(--border); border-radius: 28px;
        padding: 28px; box-shadow: 0 10px 30px -8px rgba(0,0,0,0.05); margin-bottom: 24px;
      }
      .section-header {
        display: flex; align-items: center; justify-content: space-between;
        border-bottom: 1px solid var(--border); padding-bottom: 16px; margin-bottom: 20px;
      }
      .section-title { font-size: 20px; font-weight: 800; color: var(--text); }
      .badge-count {
        background: #f0f1f5; color: #555; padding: 4px 10px; border-radius: 9999px;
        font-size: 12px; font-weight: 600;
      }
      .header-badges { font-size: 12px; color: #777; display: flex; align-items: center; gap: 6px; }
      .features-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
      @media (min-width: 640px) { .features-grid { grid-template-columns: 1fr 1fr; } }
      .feature-item {
        display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px;
        background: #f8f9fc; border: 1px solid var(--border); border-radius: 16px;
        font-size: 14px; font-weight: 500; line-height: 1.6;
      }
      .feature-item .check {
        color: var(--primary); font-weight: bold; background: rgba(111,72,255,0.12);
        width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
        border-radius: 50%; flex-shrink: 0; margin-top: 2px;
      }
      .screenshots-scroll {
        display: flex; gap: 16px; overflow-x: auto; padding: 12px 0;
        justify-content: center; align-items: center; flex-wrap: wrap;
      }
      .screenshot-img {
        max-height: 440px; width: auto; border-radius: 18px; border: 1px solid var(--border);
        box-shadow: 0 6px 16px rgba(0,0,0,0.06); object-contain;
      }
      .description-body { font-size: 15px; color: #444; line-height: 1.9; }
      .description-body p { margin-bottom: 16px; text-align: justify; }
      .desc-list {
        background: #f8f9fc; border: 1px solid var(--border); border-radius: 16px;
        padding: 16px 20px; list-style: none; margin: 16px 0;
      }
      .desc-list li { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; font-size: 14px; }
      .desc-list li:last-child { margin-bottom: 0; }
      .bullet { color: var(--primary); font-size: 11px; margin-top: 4px; flex-shrink: 0; }
      .desc-footer {
        margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border);
        display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px;
        font-size: 13px; color: #666;
      }
      .desc-footer a { color: var(--primary); text-decoration: none; font-weight: 700; }
      footer { text-align: center; font-size: 13px; color: #777; margin-top: 36px; padding: 24px; }
      footer a { color: var(--primary); text-decoration: none; font-weight: 700; }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="container">
        <nav class="nav-top">
          <a href="/" class="btn-back">&rarr; بازگشت به صفحه اصلی</a>
          <div class="breadcrumb">
            <span>خانه</span>
            <span>/</span>
            <span class="breadcrumb-badge">${escapedCategory}</span>
            <span>/</span>
            <strong>${escapedName}</strong>
          </div>
        </nav>

        <article class="hero-card">
          <img src="${p.icon}" alt="${escapedName}" class="product-icon" />
          <div class="hero-content">
            <div class="badges-row">
              <span class="badge">${escapedCategory}</span>
              ${p.type === 'app' ? '<span class="badge">PWA / وب‌اپلیکیشن</span>' : ''}
            </div>
            <h1>${escapedTitle}</h1>
            <p class="short-desc">${metaDesc}</p>
            <div class="actions">
              ${actionButtonsHtml}
            </div>
          </div>
        </article>

        ${screenshotsHtml}
        ${featuresHtml}
        ${descHtml}

        <footer>
          <p>طراحی و توسعه با ❤️ توسط <a href="https://mhkarami97.ir">محمد حسین کرمی</a></p>
        </footer>
      </div>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

  fs.writeFileSync(path.join(itemDir, 'index.html'), html, 'utf-8');

  sitemapUrls.push(`  <url>
    <loc>${canonicalUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');

const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://mhkarami97.ir/sitemap.xml
`;
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf-8');

console.log(
  '[generate-static] Successfully generated static pages, sitemap.xml, and robots.txt',
);
