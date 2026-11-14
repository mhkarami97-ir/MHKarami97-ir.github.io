import { useEffect, useState, useCallback } from 'react';
import GitProfile from './components/gitprofile';
import PrivacyPolicy from './components/privacy-policy';
import ProductDetail from './components/product-detail';

function parseRoute(): { view: 'home' | 'privacy' | 'product'; slug?: string } {
  if (typeof window === 'undefined') return { view: 'home' };

  const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  const searchParams = new URLSearchParams(window.location.search);

  // Check query param e.g. ?p=mhk.webtools
  const queryP = searchParams.get('p');
  if (queryP) {
    return { view: 'product', slug: queryP };
  }

  // Check privacy
  if (pathname === '/privacy' || pathname === '/privacy.html') {
    return { view: 'privacy' };
  }

  // Check product paths e.g. /p/mhk.webtools or /p/mhk.webtools.html or /product/...
  const pMatch = pathname.match(/^\/(?:p|product|app|project)\/([^/]+)/);
  if (pMatch) {
    const slug = pMatch[1].replace(/\.html$/, '');
    return { view: 'product', slug };
  }

  return { view: 'home' };
}

export function App({ config }: { config: Config }) {
  const [route, setRoute] = useState(parseRoute());

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRoute());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setRoute(parseRoute());
      window.scrollTo(0, 0);
    }
  }, []);

  // Intercept click on any internal <a> tags pointing to /p/ or / or /privacy
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Ignore if modified click (Ctrl, Meta, Shift)
      if (
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.defaultPrevented
      )
        return;

      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Handle internal product links or home link
      if (href === '/' || href === '/privacy' || href.startsWith('/p/')) {
        e.preventDefault();
        navigate(href);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [navigate]);

  if (route.view === 'privacy') {
    return <PrivacyPolicy />;
  }

  if (route.view === 'product' && route.slug) {
    return (
      <ProductDetail
        slug={route.slug}
        onNavigateHome={() => navigate('/')}
        onNavigateProduct={(id) => navigate(`/p/${id}`)}
      />
    );
  }

  return <GitProfile config={config} />;
}

export default App;
