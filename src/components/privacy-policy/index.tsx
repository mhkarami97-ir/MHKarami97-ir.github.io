import { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const PrivacyPolicy = () => {
  useEffect(() => {
    // Set theme attribute to procyon by default or preserve existing
    if (!document.documentElement.getAttribute('data-theme')) {
      document.documentElement.setAttribute('data-theme', 'procyon');
    }
  }, []);

  return (
    <HelmetProvider>
      <div className="fade-in min-h-screen bg-base-200/40 py-8 px-4 sm:px-6 lg:px-8">
        <Helmet>
          <title>Privacy Policy | Mohammad Hossein Karami</title>
          <meta
            name="description"
            content="Privacy Policy for Progressive Web Apps published by Mohammad Hossein Karami."
          />
          <link rel="canonical" href="https://mhkarami97.ir/privacy" />
          <meta
            property="og:title"
            content="Privacy Policy | Mohammad Hossein Karami"
          />
          <meta
            property="og:description"
            content="Privacy Policy for Progressive Web Apps published by Mohammad Hossein Karami."
          />
          <meta property="og:url" content="https://mhkarami97.ir/privacy" />
          <meta property="og:type" content="website" />
          <meta name="robots" content="index, follow" />
        </Helmet>

        <div className="max-w-4xl mx-auto">
          {/* Navigation Bar */}
          <div className="flex items-center justify-between mb-6">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-base-100 hover:bg-base-200 text-base-content border border-base-300 shadow-sm transition-all duration-200 hover:scale-[1.02]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to Home</span>
            </a>
            <span className="text-xs text-base-content/60 font-mono">
              mhkarami97.ir/privacy
            </span>
          </div>

          {/* Main Card */}
          <article className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden rounded-3xl">
            {/* Header Banner */}
            <div className="bg-primary/10 border-b border-base-300 px-6 sm:px-10 py-8">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-content mb-3">
                Legal Document
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content tracking-tight">
                Privacy Policy
              </h1>
              <p className="mt-2 text-sm text-base-content/70">
                Last updated:{' '}
                <span className="font-medium text-base-content">
                  November 2, 2026
                </span>
              </p>
            </div>

            {/* Content Body */}
            <div className="px-6 sm:px-10 py-8 text-base-content/90 space-y-8 leading-relaxed">
              {/* Introduction */}
              <div className="p-4 sm:p-5 rounded-2xl bg-base-200/60 border border-base-300/60 text-base">
                <p>
                  This Privacy Policy describes how [App Name] (&ldquo;the
                  App&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), published by
                  Mohammad Hossein Karami at{' '}
                  <a
                    href="https://mhkarami97.ir"
                    className="text-primary hover:underline font-medium"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://mhkarami97.ir
                  </a>
                  , handles information when you use it.
                </p>
              </div>

              {/* Section 1 */}
              <section className="space-y-2">
                <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 text-primary text-sm font-bold">
                    1
                  </span>
                  Who we are
                </h2>
                <div className="pl-9 text-base">
                  <p>
                    The App is operated by Mohammad Hossein Karami. Contact:{' '}
                    <a
                      href="mailto:mhkarami97@gmail.com"
                      className="text-primary hover:underline font-medium"
                    >
                      mhkarami97@gmail.com
                    </a>
                    .
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section className="space-y-2">
                <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 text-primary text-sm font-bold">
                    2
                  </span>
                  What the App does
                </h2>
                <div className="pl-9 text-base">
                  <p>
                    [App Name] is a Progressive Web App (PWA) that works
                    offline. All of your data is stored locally on your device,
                    in your browser&apos;s storage (for example IndexedDB or
                    localStorage). We do not run servers that store your
                    application data.
                  </p>
                </div>
              </section>

              {/* Section 3 */}
              <section className="space-y-2">
                <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 text-primary text-sm font-bold">
                    3
                  </span>
                  Information we collect
                </h2>
                <div className="pl-9 text-base space-y-2">
                  <ul className="list-disc list-outside space-y-2 ml-4">
                    <li>
                      <strong>Data you create in the App:</strong> [for example
                      tasks, checklists, notes, financial entries]. This data
                      stays on your device.
                    </li>
                    <li>
                      <strong>Optional Google Drive backup:</strong> If you
                      choose to enable backup, you sign in with your Google
                      Account. The App requests only the following scope:{' '}
                      <code className="text-xs sm:text-sm px-2 py-0.5 rounded bg-base-300 font-mono text-base-content break-all">
                        https://www.googleapis.com/auth/drive.appdata
                      </code>
                    </li>
                    <li>
                      We do not collect your name, email address, contacts, or
                      any other profile information from your Google Account. We
                      do not collect advertising identifiers.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 4 */}
              <section className="space-y-2">
                <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 text-primary text-sm font-bold">
                    4
                  </span>
                  How the Google Drive backup works
                </h2>
                <div className="pl-9 text-base space-y-2">
                  <ul className="list-disc list-outside space-y-2 ml-4">
                    <li>
                      The App stores a backup file of your App data in the
                      hidden &ldquo;Application Data&rdquo; folder
                      (appDataFolder) of your own Google Drive.
                    </li>
                    <li>
                      This folder is private to the App. We do not have access
                      to your other Drive files, and other apps cannot see this
                      folder.
                    </li>
                    <li>
                      The backup file is created, updated, and read only by the
                      App running in your browser, using an access token issued
                      by Google to your device. The data goes directly between
                      your browser and Google. It does not pass through any
                      server operated by us.
                    </li>
                    <li>
                      You can disconnect at any time. You can also delete the
                      backup by removing the App&apos;s data in your Google
                      Account settings (Security &gt; Third-party apps with
                      account access, or Google Drive &gt; Settings &gt; Manage
                      apps).
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section className="space-y-2">
                <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 text-primary text-sm font-bold">
                    5
                  </span>
                  How we use information
                </h2>
                <div className="pl-9 text-base">
                  <p>
                    We use your data only to provide the App&apos;s features
                    (storing your content locally, and creating and restoring
                    your backup). We do not sell your data. We do not use it for
                    advertising, profiling, or analytics.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section className="space-y-2">
                <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 text-primary text-sm font-bold">
                    6
                  </span>
                  Google API Services User Data Policy
                </h2>
                <div className="pl-9 text-base">
                  <p>
                    [App Name]&apos;s use and transfer to any other app of
                    information received from Google APIs will adhere to the{' '}
                    <a
                      href="https://developers.google.com/terms/api-services-user-data-policy"
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                    >
                      Google API Services User Data Policy
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 inline"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                    , including the Limited Use requirements.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section className="space-y-2">
                <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 text-primary text-sm font-bold">
                    7
                  </span>
                  Sharing and disclosure
                </h2>
                <div className="pl-9 text-base">
                  <p>
                    We do not share, sell, rent, or transfer your data to third
                    parties. Your backup is stored only in your own Google Drive
                    and is subject to Google&apos;s own privacy policy.
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section className="space-y-2">
                <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 text-primary text-sm font-bold">
                    8
                  </span>
                  Data retention and deletion
                </h2>
                <div className="pl-9 text-base space-y-2">
                  <ul className="list-disc list-outside space-y-2 ml-4">
                    <li>
                      Local data remains on your device until you clear your
                      browser data or uninstall the App.
                    </li>
                    <li>
                      Your Google Drive backup remains until you delete it or
                      revoke the App&apos;s access.
                    </li>
                    <li>
                      To request help with deletion, contact{' '}
                      <a
                        href="mailto:mhkarami97@gmail.com"
                        className="text-primary hover:underline font-medium"
                      >
                        mhkarami97@gmail.com
                      </a>
                      .
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 9 */}
              <section className="space-y-2">
                <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 text-primary text-sm font-bold">
                    9
                  </span>
                  Security
                </h2>
                <div className="pl-9 text-base">
                  <p>
                    Data is transferred over HTTPS. [Optional: Backups are
                    encrypted on your device before upload.] No method of
                    storage is completely secure, and you are responsible for
                    protecting your device and Google Account.
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section className="space-y-2">
                <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 text-primary text-sm font-bold">
                    10
                  </span>
                  Children
                </h2>
                <div className="pl-9 text-base">
                  <p>
                    The App is not directed to children under 13, and we do not
                    knowingly collect data from them.
                  </p>
                </div>
              </section>

              {/* Section 11 */}
              <section className="space-y-2">
                <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 text-primary text-sm font-bold">
                    11
                  </span>
                  Changes
                </h2>
                <div className="pl-9 text-base">
                  <p>
                    We may update this policy. The &ldquo;Last updated&rdquo;
                    date shows the latest version.
                  </p>
                </div>
              </section>

              {/* Section 12 */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 text-primary text-sm font-bold">
                    12
                  </span>
                  Contact
                </h2>
                <div className="pl-9 text-base space-y-1">
                  <p className="font-semibold text-base-content">
                    Mohammad Hossein Karami
                  </p>
                  <p>
                    Email:{' '}
                    <a
                      href="mailto:mhkarami97@gmail.com"
                      className="text-primary hover:underline font-medium"
                    >
                      mhkarami97@gmail.com
                    </a>
                  </p>
                  <p>
                    Website:{' '}
                    <a
                      href="https://mhkarami97.ir"
                      className="text-primary hover:underline font-medium"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://mhkarami97.ir
                    </a>
                  </p>
                </div>
              </section>
            </div>

            {/* Footer inside card */}
            <div className="bg-base-200/50 border-t border-base-300 px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between text-xs text-base-content/60 gap-3">
              <span>
                &copy; 2026 Mohammad Hossein Karami. All rights reserved.
              </span>
              <a
                href="/"
                className="text-primary hover:underline font-medium inline-flex items-center gap-1"
              >
                Back to mhkarami97.ir &rarr;
              </a>
            </div>
          </article>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default PrivacyPolicy;
