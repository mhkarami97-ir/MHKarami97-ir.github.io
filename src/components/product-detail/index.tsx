import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  FaAndroid,
  FaApple,
  FaExternalLinkAlt,
  FaArrowRight,
  FaCheckCircle,
  FaChevronRight,
  FaChevronLeft,
  FaGlobe,
  FaTelegram,
  FaPuzzlePiece,
  FaWindows,
  FaNpm,
  FaInfoCircle,
  FaCheck,
} from 'react-icons/fa';
import { SiJetbrains, SiNuget } from 'react-icons/si';
import { ProductConfig, PRODUCTS, getProductById } from '../../data/products';
import LazyImage from '../lazy-image';
import { skeleton } from '../../utils';

interface Props {
  slug: string;
  onNavigateHome?: () => void;
  onNavigateProduct?: (id: string) => void;
}

const ProductDetail = ({ slug, onNavigateHome, onNavigateProduct }: Props) => {
  const product: ProductConfig | undefined = getProductById(slug);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
    if (!document.documentElement.getAttribute('data-theme')) {
      document.documentElement.setAttribute('data-theme', 'procyon');
    }
  }, [slug]);

  if (!product) {
    return (
      <HelmetProvider>
        <div
          className="min-h-screen bg-base-200/50 flex flex-col items-center justify-center p-6 text-center rtl"
          dir="rtl"
        >
          <Helmet>
            <title>محصول یافت نشد | محمد حسین کرمی</title>
          </Helmet>
          <div className="card bg-base-100 shadow-xl border border-base-300 p-8 max-w-md w-full rounded-3xl">
            <h1 className="text-2xl font-bold text-base-content mb-3">
              محصول یا صفحه مورد نظر پیدا نشد
            </h1>
            <p className="text-sm text-base-content/70 mb-6">
              متأسفانه صفحه‌ای برای شناسه «{slug}» یافت نشد. ممکن است آدرس
              اشتباه باشد یا محصول تغییر یافته باشد.
            </p>
            <a
              href="/"
              onClick={(e) => {
                if (onNavigateHome) {
                  e.preventDefault();
                  onNavigateHome();
                }
              }}
              className="btn btn-primary rounded-2xl w-full"
            >
              بازگشت به صفحه اصلی
            </a>
          </div>
        </div>
      </HelmetProvider>
    );
  }

  const screenshots = product.screenshots || [];
  const hasScreenshots = screenshots.length > 0;

  const handleNavProduct = (id: string, e: React.MouseEvent) => {
    if (onNavigateProduct) {
      e.preventDefault();
      onNavigateProduct(id);
    }
  };

  // Helper to determine accurate action button title, subtitle and icon
  const getActionInfo = (p: ProductConfig) => {
    const direct = p.links?.direct || '';
    const cat = p.category || '';
    const type = p.type;

    if (cat.includes('JetBrains') || direct.includes('jetbrains.com')) {
      return {
        label: 'دریافت از JetBrains Marketplace',
        sublabel: 'افزونه رسمی محیط توسعه Rider و IntelliJ',
        icon: <SiJetbrains className="w-5 h-5 text-amber-400" />,
        btnClass: 'btn-neutral text-white',
      };
    }

    if (
      cat.includes('ویندوز') ||
      (direct.includes('github.com') && direct.includes('/releases'))
    ) {
      return {
        label: 'دانلود مستقیم برای ویندوز',
        sublabel: 'نسخه رسمی ویندوز (GitHub Releases)',
        icon: <FaWindows className="w-5 h-5 text-sky-400" />,
        btnClass: 'btn-primary text-white',
      };
    }

    if (cat.includes('NuGet') || direct.includes('nuget.org')) {
      return {
        label: 'مشاهده در مخزن NuGet Gallery',
        sublabel: 'نصب با دستور dotnet add package',
        icon: <SiNuget className="w-5 h-5 text-blue-400" />,
        btnClass: 'btn-primary text-white',
      };
    }

    if (cat.includes('NPM') || direct.includes('npmjs.com')) {
      return {
        label: 'مشاهده در مخزن npm Registry',
        sublabel: 'نصب با دستور npm i',
        icon: <FaNpm className="w-5 h-5 text-red-500" />,
        btnClass: 'btn-primary text-white',
      };
    }

    if (
      cat.includes('مرورگر') ||
      direct.includes('microsoftedge.com') ||
      direct.includes('chrome.google.com')
    ) {
      return {
        label: 'نصب افزونه در مرورگر (اج / کروم)',
        sublabel: 'نصب رایگان از فروشگاه افزونه‌ها',
        icon: <FaPuzzlePiece className="w-5 h-5 text-teal-400" />,
        btnClass: 'btn-primary text-white',
      };
    }

    if (
      type === 'bot' ||
      direct.includes('t.me') ||
      direct.includes('telegram.me')
    ) {
      return {
        label: 'ورود به ربات در تلگرام',
        sublabel: 'اجرا و استفاده رایگان در تلگرام',
        icon: <FaTelegram className="w-5 h-5 text-sky-400" />,
        btnClass: 'btn-info text-white',
      };
    }

    if (type === 'website' || cat.includes('سایت') || cat.includes('وب')) {
      return {
        label: 'ورود به وب‌سایت رسمی',
        sublabel: 'مشاهده آنلاین در مرورگر',
        icon: <FaGlobe className="w-5 h-5 text-emerald-400" />,
        btnClass: 'btn-primary text-white',
      };
    }

    return {
      label: 'مشاهده و استفاده از محصول',
      sublabel: 'لینک مستقیم به صفحه محصول',
      icon: <FaExternalLinkAlt className="w-4 h-4 text-white" />,
      btnClass: 'btn-primary text-white',
    };
  };

  // Other related products
  const relatedProducts = PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.type === product.type || p.category === product.category),
  ).slice(0, 4);

  const canonicalUrl = `https://mhkarami97.ir/p/${product.id}`;
  const ogImage = hasScreenshots
    ? `https://mhkarami97.ir${screenshots[0]}`
    : `https://mhkarami97.ir${product.icon}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': product.type === 'app' ? 'SoftwareApplication' : 'WebApplication',
    name: product.name,
    headline: product.title,
    description: product.shortDescription || product.fullDescription,
    image: ogImage,
    url: canonicalUrl,
    applicationCategory: product.category,
    operatingSystem:
      product.type === 'app'
        ? 'Android, iOS, Web (PWA)'
        : product.type === 'extension'
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

  return (
    <HelmetProvider>
      <div
        className="fade-in min-h-screen bg-base-200/40 py-6 px-4 sm:px-6 lg:px-8 text-base-content rtl"
        dir="rtl"
      >
        <Helmet>
          <title>{`${product.title} | محمد حسین کرمی`}</title>
          <meta
            name="description"
            content={product.shortDescription || product.fullDescription}
          />
          <meta
            name="keywords"
            content={product.tags?.join(', ') || product.name}
          />
          <link rel="canonical" href={canonicalUrl} />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={canonicalUrl} />
          <meta
            property="og:title"
            content={`${product.title} | محمد حسین کرمی`}
          />
          <meta
            property="og:description"
            content={product.shortDescription || product.fullDescription}
          />
          <meta property="og:image" content={ogImage} />
          <meta property="og:site_name" content="محمد حسین کرمی" />
          <meta property="og:locale" content="fa_IR" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={`${product.title} | محمد حسین کرمی`}
          />
          <meta
            name="twitter:description"
            content={product.shortDescription || product.fullDescription}
          />
          <meta name="twitter:image" content={ogImage} />

          {/* Structured Data */}
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>

        <div className="max-w-5xl mx-auto space-y-6">
          {/* Top Bar / Navigation Redesigned */}
          <nav
            aria-label="Breadcrumb"
            className="card bg-base-100/90 backdrop-blur-md shadow-sm border border-base-300 rounded-2xl px-4 py-3 flex flex-row items-center justify-between gap-3"
          >
            <a
              href="/"
              onClick={(e) => {
                if (onNavigateHome) {
                  e.preventDefault();
                  onNavigateHome();
                }
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 transition-all duration-200"
            >
              <FaArrowRight className="w-3.5 h-3.5" />
              <span>بازگشت به صفحه اصلی</span>
            </a>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-base-content/70">
              <span className="badge badge-sm badge-outline font-semibold border-primary/40 text-primary">
                {product.category}
              </span>
              <span className="opacity-40">/</span>
              <span className="text-base-content font-bold truncate max-w-[150px] sm:max-w-xs">
                {product.name}
              </span>
            </div>
          </nav>

          {/* Hero Card */}
          <article className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden rounded-3xl">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8">
                {/* Product Icon */}
                <div className="avatar flex-shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl shadow-xl ring-4 ring-primary/20 ring-offset-4 ring-offset-base-100 overflow-hidden bg-base-200 flex items-center justify-center">
                    <LazyImage
                      src={product.icon}
                      alt={product.name}
                      placeholder={skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-full',
                        shape: '',
                      })}
                    />
                  </div>
                </div>

                {/* Info & Details */}
                <div className="flex-grow text-center md:text-right space-y-3 w-full">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <span className="badge badge-primary badge-outline font-semibold px-3 py-1">
                      {product.category}
                    </span>
                    {product.type === 'app' && (
                      <span className="badge badge-secondary badge-outline px-3 py-1">
                        وب‌اپلیکیشن
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-base-content tracking-tight leading-snug">
                    {product.title}
                  </h1>

                  {product.shortDescription && (
                    <p className="text-base sm:text-lg text-base-content/80 leading-relaxed font-normal">
                      {product.shortDescription}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
                    {/* App Buttons (Android + iOS) */}
                    {product.type === 'app' && (
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 w-full sm:w-auto">
                        {product.links.android && (
                          <a
                            href={product.links.android}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary rounded-2xl gap-3 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 px-5 py-2.5 h-auto"
                          >
                            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                              <FaAndroid className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-right">
                              <div className="text-[11px] opacity-80 font-normal">
                                دریافت نسخه اندروید
                              </div>
                              <div className="text-sm font-bold">
                                دانلود از کافه بازار
                              </div>
                            </div>
                          </a>
                        )}
                        {product.links.ios && (
                          <a
                            href={product.links.ios}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary rounded-2xl gap-3 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 px-5 py-2.5 h-auto"
                          >
                            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                              <FaApple className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-right">
                              <div className="text-[11px] opacity-80 font-normal">
                                اجرا در وب، آیفون و دسکتاپ
                              </div>
                              <div className="text-sm font-bold">
                                نسخه تحت وب (PWA)
                              </div>
                            </div>
                          </a>
                        )}
                      </div>
                    )}

                    {/* Non-app Direct Buttons */}
                    {product.type !== 'app' &&
                      product.links.direct &&
                      (() => {
                        const action = getActionInfo(product);
                        return (
                          <a
                            href={product.links.direct}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`btn ${action.btnClass} rounded-2xl gap-3 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 px-5 py-2.5 h-auto`}
                          >
                            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                              {action.icon}
                            </div>
                            <div className="text-right">
                              <div className="text-[11px] opacity-80 font-normal">
                                {action.sublabel}
                              </div>
                              <div className="text-sm font-bold">
                                {action.label}
                              </div>
                            </div>
                            <FaExternalLinkAlt className="w-3.5 h-3.5 opacity-60 mr-1" />
                          </a>
                        );
                      })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Screenshots Gallery - CENTERED */}
            {hasScreenshots && (
              <div className="border-t border-base-300 bg-base-200/30 p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-bold text-base-content flex items-center gap-2">
                    <span>تصاویر محیط برنامه</span>
                    <span className="badge badge-sm badge-neutral">
                      {screenshots.length} تصویر
                    </span>
                  </h2>
                  {screenshots.length > 1 && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImageIndex((prev) =>
                            prev === 0 ? screenshots.length - 1 : prev - 1,
                          )
                        }
                        className="btn btn-circle btn-sm btn-ghost border border-base-300"
                        title="تصویر قبلی"
                      >
                        <FaChevronRight className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono text-base-content/60 px-1">
                        {activeImageIndex + 1} / {screenshots.length}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImageIndex((prev) =>
                            prev === screenshots.length - 1 ? 0 : prev + 1,
                          )
                        }
                        className="btn btn-circle btn-sm btn-ghost border border-base-300"
                        title="تصویر بعدی"
                      >
                        <FaChevronLeft className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Large Preview - Center Aligned */}
                <div className="relative rounded-2xl overflow-hidden bg-base-300/30 border border-base-300 flex items-center justify-center p-3 sm:p-6 min-h-[300px] sm:min-h-[460px] text-center">
                  <img
                    src={screenshots[activeImageIndex]}
                    alt={`${product.name} - تصویر ${activeImageIndex + 1}`}
                    className="max-h-[500px] max-w-full rounded-xl object-contain shadow-md mx-auto transition-all duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Thumbnails Row - Center Aligned */}
                {screenshots.length > 1 && (
                  <div className="flex items-center justify-center flex-wrap sm:flex-nowrap gap-3 overflow-x-auto pb-2 pt-2 scrollbar-thin">
                    {screenshots.map((shot, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative flex-shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-base-200 ${
                          idx === activeImageIndex
                            ? 'border-primary ring-2 ring-primary/40 scale-105 shadow-md'
                            : 'border-base-300 opacity-60 hover:opacity-100 hover:border-base-content/40'
                        }`}
                      >
                        <img
                          src={shot}
                          alt={`thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </article>

          {/* Features Section - Balanced 2x2 Grid */}
          {product.features && product.features.length > 0 && (
            <section className="card bg-base-100 shadow-xl border border-base-300 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-base-300/60 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-base-content flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <FaCheckCircle className="w-4 h-4" />
                  </span>
                  <span>ویژگی‌ها و قابلیت‌های کلیدی</span>
                </h2>
                <span className="badge badge-neutral badge-sm font-mono">
                  {product.features.length} ویژگی
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {product.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start gap-3.5 p-4 rounded-2xl bg-base-200/40 hover:bg-base-200/80 border border-base-300/60 hover:border-primary/40 transition-all duration-200"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold mt-0.5 flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <FaCheck className="w-2.5 h-2.5" />
                    </span>
                    <span className="text-sm sm:text-base font-medium text-base-content/90 leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Full Description Section - Redesigned UI/UX */}
          {product.fullDescription && (
            <section className="card bg-base-100 shadow-xl border border-base-300 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-base-300/60 pb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-base-content flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <FaInfoCircle className="w-4 h-4" />
                  </span>
                  <span>درباره {product.name}</span>
                </h2>
              </div>

              {/* Enhanced Typography & Spacing */}
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-base-content/85 font-normal">
                {product.fullDescription
                  .split('\n\n')
                  .map((paragraph, pIdx) => {
                    const trimmed = paragraph.trim();
                    if (!trimmed) return null;

                    // Check if this paragraph contains bullet lines
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
                      return (
                        <ul
                          key={pIdx}
                          className="space-y-2.5 my-4 p-4 rounded-2xl bg-base-200/50 border border-base-300/70"
                        >
                          {lines.map((line, lIdx) => (
                            <li
                              key={lIdx}
                              className="flex items-start gap-2.5 text-sm sm:text-base leading-relaxed"
                            >
                              <span className="text-primary font-bold mt-1 text-xs">
                                ◆
                              </span>
                              <span>
                                {line.replace(/^[-•*]|\d+\./, '').trim()}
                              </span>
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    return (
                      <p
                        key={pIdx}
                        className="text-base sm:text-base leading-loose text-justify"
                      >
                        {trimmed}
                      </p>
                    );
                  })}
              </div>
            </section>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="card bg-base-100 shadow-xl border border-base-300 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-base-300/60 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-base-content">
                  سایر پروژه‌ها
                </h2>
                <a
                  href="/"
                  onClick={(e) => {
                    if (onNavigateHome) {
                      e.preventDefault();
                      onNavigateHome();
                    }
                  }}
                  className="text-xs sm:text-sm text-primary hover:underline font-bold"
                >
                  مشاهده همه موارد &larr;
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedProducts.map((rel) => (
                  <a
                    key={rel.id}
                    href={`/p/${rel.id}`}
                    onClick={(e) => handleNavProduct(rel.id, e)}
                    className="group card bg-base-200/50 hover:bg-base-200 border border-base-300 p-4 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-base-100 shadow-sm ring-1 ring-base-300 group-hover:ring-primary flex-shrink-0">
                        <img
                          src={rel.icon}
                          alt={rel.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0 flex-grow">
                        <h3 className="font-bold text-sm text-base-content group-hover:text-primary transition-colors truncate">
                          {rel.name}
                        </h3>
                        <span className="text-[11px] text-base-content/60 truncate block">
                          {rel.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-base-content/70 line-clamp-2 leading-relaxed">
                      {rel.shortDescription || rel.title}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Footer Bar - Address URL Removed */}
          <footer className="text-center text-xs text-base-content/60 py-8">
            <p>
              طراحی و توسعه با ❤️ توسط{' '}
              <a
                href="https://mhkarami97.ir"
                className="text-primary hover:underline font-bold"
              >
                محمد حسین کرمی
              </a>
            </p>
          </footer>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default ProductDetail;
