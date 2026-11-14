import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  FaAndroid,
  FaApple,
  FaExternalLinkAlt,
  FaShareAlt,
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
  FaExpand,
  FaSearchPlus,
  FaTimes,
  FaSpinner,
  FaImages,
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
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const screenshots = product?.screenshots || [];
  const hasScreenshots = screenshots.length > 0;

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
    setLoadedImages({});
    setIsFullscreen(false);
    if (!document.documentElement.getAttribute('data-theme')) {
      document.documentElement.setAttribute('data-theme', 'procyon');
    }
  }, [slug]);

  // Keyboard navigation for fullscreen lightbox modal
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setActiveImageIndex((prev) =>
          prev === 0 ? screenshots.length - 1 : prev - 1,
        );
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setActiveImageIndex((prev) =>
          prev === screenshots.length - 1 ? 0 : prev + 1,
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, screenshots.length]);

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

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.shortDescription,
          url,
        });
        return;
      } catch (err) {
        // user cancelled or share failed, fallback to copy
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNavProduct = (id: string, e: React.MouseEvent) => {
    if (onNavigateProduct) {
      e.preventDefault();
      onNavigateProduct(id);
    }
  };

  const handleNextImage = () => {
    if (screenshots.length <= 1) return;
    setActiveImageIndex((prev) =>
      prev === screenshots.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePrevImage = () => {
    if (screenshots.length <= 1) return;
    setActiveImageIndex((prev) =>
      prev === 0 ? screenshots.length - 1 : prev - 1,
    );
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

                    {/* Share Button */}
                    <button
                      type="button"
                      onClick={handleShare}
                      className="btn btn-outline rounded-2xl gap-2 border-base-300 hover:bg-base-200 hover:border-base-content/20 text-base-content px-4 py-2.5 h-auto"
                      title="اشتراک‌گذاری این صفحه"
                    >
                      <FaShareAlt className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">
                        {copied ? 'لینک کپی شد!' : 'اشتراک‌گذاری'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Showcase / Screenshot Box with Premium Window Mockup */}
            <div className="border-t border-base-300 bg-base-200/40 p-4 sm:p-6 lg:p-8 space-y-4">
              {/* Window Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* macOS Window Control Dots */}
                  <div className="flex items-center gap-1.5 px-1">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm inline-block" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-base-content flex items-center gap-2">
                    <FaImages className="w-4 h-4 text-primary" />
                    <span>تصاویر و پیش‌نمایش محیط برنامه</span>
                    {hasScreenshots && (
                      <span className="badge badge-sm badge-neutral font-mono">
                        {screenshots.length} تصویر
                      </span>
                    )}
                  </h2>
                </div>

                {hasScreenshots && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsFullscreen(true)}
                      className="btn btn-ghost btn-sm rounded-xl gap-1.5 border border-base-300 hover:bg-base-200 text-xs text-base-content/80 shadow-sm"
                      title="مشاهده تمام‌صفحه و بزرگ‌نمایی"
                    >
                      <FaExpand className="w-3 h-3 text-primary" />
                      <span className="hidden sm:inline">بزرگ‌نمایی</span>
                    </button>

                    {screenshots.length > 1 && (
                      <div className="flex items-center gap-1 bg-base-100 rounded-xl border border-base-300 p-0.5 shadow-sm">
                        <button
                          type="button"
                          onClick={handlePrevImage}
                          className="btn btn-circle btn-xs btn-ghost"
                          title="تصویر قبلی"
                        >
                          <FaChevronRight className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono text-base-content/70 px-1.5">
                          {activeImageIndex + 1} / {screenshots.length}
                        </span>
                        <button
                          type="button"
                          onClick={handleNextImage}
                          className="btn btn-circle btn-xs btn-ghost"
                          title="تصویر بعدی"
                        >
                          <FaChevronLeft className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {hasScreenshots ? (
                <>
                  {/* Large Interactive Preview Box */}
                  <div
                    className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-base-300/40 via-base-200/50 to-base-300/30 border border-base-300 shadow-inner flex items-center justify-center p-3 sm:p-6 min-h-[340px] sm:min-h-[480px] text-center cursor-pointer select-none transition-all duration-300 hover:shadow-lg"
                    onClick={() => setIsFullscreen(true)}
                    title="برای مشاهده در اندازه واقعی کلیک کنید"
                  >
                    {/* Placeholder / Skeleton Loader while image is loading */}
                    {!loadedImages[activeImageIndex] && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-base-200/80 backdrop-blur-sm animate-pulse p-6">
                        <div className="w-20 h-20 rounded-3xl bg-base-300/80 shadow-inner flex items-center justify-center mb-3">
                          <img
                            src={product.icon}
                            alt=""
                            className="w-12 h-12 rounded-2xl object-contain opacity-70"
                          />
                        </div>
                        <div className="h-3 w-40 bg-base-300 rounded-full mb-2" />
                        <div className="h-2.5 w-24 bg-base-300/60 rounded-full" />
                        <span className="text-xs text-base-content/60 font-medium mt-3 flex items-center gap-1.5">
                          <FaSpinner className="animate-spin text-primary w-3.5 h-3.5" />
                          در حال بارگذاری تصویر پیش‌نمایش...
                        </span>
                      </div>
                    )}

                    {/* The Active Screenshot Image */}
                    <img
                      key={screenshots[activeImageIndex]}
                      src={screenshots[activeImageIndex]}
                      alt={`${product.name} - تصویر ${activeImageIndex + 1}`}
                      onLoad={() =>
                        setLoadedImages((prev) => ({
                          ...prev,
                          [activeImageIndex]: true,
                        }))
                      }
                      className={`max-h-[520px] max-w-full rounded-xl object-contain shadow-2xl mx-auto transition-all duration-500 group-hover:scale-[1.02] ${
                        loadedImages[activeImageIndex]
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-95'
                      }`}
                      loading="eager"
                    />

                    {/* Hover Floating Action Badge */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral/85 text-white text-xs font-semibold shadow-xl backdrop-blur-md border border-white/10">
                        <FaSearchPlus className="w-3.5 h-3.5 text-primary" />
                        <span>مشاهده در اندازه واقعی</span>
                      </span>
                    </div>

                    {/* Hover Floating Next/Prev Arrows */}
                    {screenshots.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevImage();
                          }}
                          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-base-100/90 hover:bg-primary hover:text-white text-base-content shadow-xl border border-base-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 hover:scale-110"
                          title="تصویر قبلی"
                        >
                          <FaChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextImage();
                          }}
                          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-base-100/90 hover:bg-primary hover:text-white text-base-content shadow-xl border border-base-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 hover:scale-110"
                          title="تصویر بعدی"
                        >
                          <FaChevronLeft className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails Row */}
                  {screenshots.length > 1 && (
                    <div className="flex items-center justify-center flex-wrap sm:flex-nowrap gap-3 overflow-x-auto pb-2 pt-2 scrollbar-thin">
                      {screenshots.map((shot, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative flex-shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-base-200 ${
                            idx === activeImageIndex
                              ? 'border-primary ring-4 ring-primary/30 scale-105 shadow-xl'
                              : 'border-base-300 opacity-60 hover:opacity-100 hover:border-base-content/40 hover:scale-105'
                          }`}
                          title={`مشاهده تصویر ${idx + 1}`}
                        >
                          <img
                            src={shot}
                            alt={`تصویر بندانگشتی ${idx + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {idx === activeImageIndex && (
                            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary ring-2 ring-white" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                /* Branded Visual Showcase for products without screenshots */
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-base-200/80 via-base-100 to-base-200/80 border border-base-300 p-8 sm:p-12 text-center shadow-inner">
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="relative inline-block">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-base-100 shadow-2xl ring-4 ring-primary/20 ring-offset-4 ring-offset-base-100 overflow-hidden mx-auto flex items-center justify-center">
                        <img
                          src={product.icon}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-md">
                        {product.category}
                      </div>
                    </div>

                    <div className="space-y-1 pt-2">
                      <h3 className="text-xl font-bold text-base-content">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-base-content/70">
                        {product.shortDescription || product.title}
                      </p>
                    </div>

                    {product.type === 'package' && (
                      <div className="p-3 bg-neutral text-neutral-content rounded-xl font-mono text-xs sm:text-sm flex items-center justify-between border border-neutral-focus text-left dir-ltr shadow-md">
                        <span>
                          {product.category?.includes('NPM')
                            ? `npm install ${product.name}`
                            : `dotnet add package ${product.name}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
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

        {/* Fullscreen Lightbox Modal */}
        {isFullscreen && hasScreenshots && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6"
            onClick={() => setIsFullscreen(false)}
          >
            {/* Modal Top Bar */}
            <div
              className="w-full max-w-5xl flex items-center justify-between text-white z-10 pb-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <span className="badge badge-primary font-mono text-xs">
                  {activeImageIndex + 1} / {screenshots.length}
                </span>
                <span className="text-xs sm:text-sm font-semibold opacity-90 truncate max-w-xs sm:max-w-md">
                  {product.title}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="btn btn-circle btn-sm btn-ghost text-white hover:bg-white/20 border border-white/20"
                title="بستن (Esc)"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Center Image */}
            <div
              className="relative flex-grow flex items-center justify-center max-w-5xl w-full my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={screenshots[activeImageIndex]}
                alt={`${product.name} - تمام‌صفحه ${activeImageIndex + 1}`}
                className="max-h-[80vh] max-w-[92vw] object-contain rounded-2xl shadow-2xl select-none"
              />

              {/* Prev / Next buttons in modal */}
              {screenshots.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute right-2 sm:-right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-2xl z-20"
                    title="تصویر قبلی"
                  >
                    <FaChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute left-2 sm:-left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-2xl z-20"
                    title="تصویر بعدی"
                  >
                    <FaChevronLeft className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Bottom Thumbnails */}
            {screenshots.length > 1 && (
              <div
                className="flex items-center justify-center gap-2 overflow-x-auto py-2 px-4 max-w-full z-10"
                onClick={(e) => e.stopPropagation()}
              >
                {screenshots.map((shot, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-16 sm:w-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      idx === activeImageIndex
                        ? 'border-primary ring-2 ring-primary scale-105 shadow-lg'
                        : 'border-white/20 opacity-50 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <img
                      src={shot}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </HelmetProvider>
  );
};

export default ProductDetail;
