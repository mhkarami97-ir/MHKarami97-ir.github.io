import React from 'react';
import ReactDOM from 'react-dom/client';
import GitProfile from './components/gitprofile.tsx';
import PrivacyPolicy from './components/privacy-policy';

const pathname =
  typeof window !== 'undefined'
    ? window.location.pathname.toLowerCase().replace(/\/+$/, '')
    : '';
const isPrivacy = pathname === '/privacy' || pathname === '/privacy.html';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isPrivacy ? <PrivacyPolicy /> : <GitProfile config={CONFIG} />}
  </React.StrictMode>,
);
