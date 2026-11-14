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
        <a href="${escapeHtml(p.links.android)}" target="_blank" rel="noopener noreferrer" class="btn-primary-action">
          <span>دانلود برای اندروید (کافه بازار)</span>
        </a>`;
    }
    if (p.links && p.links.ios) {
      actionButtonsHtml += `
        <a href="${escapeHtml(p.links.ios)}" target="_blank" rel="noopener noreferrer" class="btn-secondary-action">
          <span>اجرا در وب و آیفون (iOS / PWA)</span>
        </a>`;
    }
  } else if (p.links && p.links.direct) {
    const label =
      p.type === 'extension'
        ? 'نصب افزونه در مرورگر'
        : p.type === 'bot'
          ? 'ورود به ربات تلگرام'
          : p.type === 'package'
            ? 'مشاهده پکیج'
            : 'ورود به وب‌سایت';
    actionButtonsHtml += `
      <a href="${escapeHtml(p.links.direct)}" target="_blank" rel="noopener noreferrer" class="btn-primary-action">
        <span>${label}</span>
      </a>`;
  }

  let featuresHtml = '';
  if (p.features && p.features.length > 0) {
    featuresHtml = `
      <section class="section-card">
        <h2 class="section-title">ویژگی‌ها و قابلیت‌های کلیدی</h2>
        <div class="features-grid">
          ${p.features.map((f) => `<div class="feature-item"><span class="check">✓</span><span>${escapeHtml(f)}</span></div>`).join('')}
        </div>
      </section>`;
  }

  let screenshotsHtml = '';
  if (p.screenshots && p.screenshots.length > 0) {
    screenshotsHtml = `
      <section class="section-card">
        <h2 class="section-title">تصاویر محیط برنامه</h2>
        <div class="screenshots-scroll">
          ${p.screenshots.map((s, i) => `<img src="${s}" alt="${escapedName} - تصویر ${i + 1}" class="screenshot-img" loading="lazy" />`).join('')}
        </div>
      </section>`;
  }

  let descHtml = '';
  if (p.fullDescription) {
    const paragraphs = p.fullDescription
      .split('\n\n')
      .map((para) => `<p>${escapeHtml(para).replace(/\n/g, '<br/>')}</p>`)
      .join('');
    descHtml = `
      <section class="section-card">
        <h2 class="section-title">درباره ${escapedName}</h2>
        <div class="description-body">${paragraphs}</div>
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
        --bg-page: #e3e3ed;
        --bg-card: #ffffff;
        --text: #2a2730;
        --border: #d5d5e2;
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
      .container { max-width: 960px; margin: 0 auto; padding: 24px 16px; }
      .nav-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
      .btn-back {
        display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px;
        background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px;
        color: var(--text); text-decoration: none; font-size: 14px; font-weight: 500;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }
      .breadcrumb { font-size: 13px; color: #666; }
      .hero-card {
        background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px;
        padding: 32px 24px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
        display: flex; flex-direction: column; gap: 24px; margin-bottom: 24px;
      }
      @media (min-width: 640px) {
        .hero-card { flex-direction: row; align-items: flex-start; }
      }
      .product-icon {
        width: 120px; height: 120px; border-radius: 28px; object-fit: cover;
        box-shadow: 0 8px 16px rgba(0,0,0,0.1); border: 3px solid rgba(111,72,255,0.2);
        flex-shrink: 0; margin: 0 auto;
      }
      .hero-content { flex-grow: 1; }
      .badge {
        display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px;
        font-weight: 600; color: var(--primary); border: 1px solid var(--primary); margin-bottom: 12px;
      }
      h1 { font-size: 26px; font-weight: 800; margin-bottom: 8px; color: var(--text); }
      .short-desc { font-size: 16px; color: #555; margin-bottom: 20px; line-height: 1.6; }
      .actions { display: flex; flex-wrap: wrap; gap: 12px; }
      .btn-primary-action {
        background: var(--primary); color: #fff; padding: 12px 24px; border-radius: 16px;
        text-decoration: none; font-weight: 600; font-size: 14px; display: inline-flex;
        align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(111,72,255,0.3);
      }
      .btn-secondary-action {
        background: #2a2730; color: #fff; padding: 12px 24px; border-radius: 16px;
        text-decoration: none; font-weight: 600; font-size: 14px; display: inline-flex;
        align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      .section-card {
        background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px;
        padding: 24px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); margin-bottom: 24px;
      }
      .section-title { font-size: 20px; font-weight: 700; margin-bottom: 16px; color: var(--text); }
      .features-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
      @media (min-width: 640px) { .features-grid { grid-template-columns: 1fr 1fr; } }
      .feature-item {
        display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px;
        background: #f7f7fa; border: 1px solid var(--border); border-radius: 14px;
        font-size: 14px; font-weight: 500;
      }
      .feature-item .check {
        color: var(--primary); font-weight: bold; background: rgba(111,72,255,0.1);
        width: 22px; height: 22px; display: flex; align-items: center; justify-content: center;
        border-radius: 50%; flex-shrink: 0;
      }
      .screenshots-scroll {
        display: flex; gap: 14px; overflow-x: auto; padding-bottom: 12px;
      }
      .screenshot-img {
        max-height: 380px; width: auto; border-radius: 16px; border: 1px solid var(--border);
        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
      }
      .description-body { font-size: 15px; color: #444; line-height: 1.8; }
      .description-body p { margin-bottom: 14px; }
      footer { text-align: center; font-size: 13px; color: #777; margin-top: 36px; padding: 16px; }
      footer a { color: var(--primary); text-decoration: none; font-weight: 600; }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="container">
        <nav class="nav-top">
          <a href="/" class="btn-back">&rarr; بازگشت به صفحه اصلی</a>
          <div class="breadcrumb">خانه / ${escapedCategory} / ${escapedName}</div>
        </nav>

        <article class="hero-card">
          <img src="${p.icon}" alt="${escapedName}" class="product-icon" />
          <div class="hero-content">
            <span class="badge">${escapedCategory}</span>
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
          <p>طراحی و توسعه توسط <a href="https://mhkarami97.ir">محمد حسین کرمی</a></p>
          <p style="margin-top: 4px; font-size: 11px; opacity: 0.7;">mhkarami97.ir/p/${escapeHtml(p.id)}</p>
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
