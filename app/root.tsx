import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from '@remix-run/react';
import { Skeleton } from '@mui/material';
import { lazy, Suspense, useEffect, useState } from 'react';

import { themePreferenceCookie } from '~/cookies';
import styles from '~/styles/index.css?url';
import { getSiteSetting } from './services/siteSetting.service';
import { getCategories } from './services/category.service';
import BackToTop from './components/BackToTop';
import HandsomeError from './components/HandsomeError';
import { useRootLoaderData } from './lib/useRootLoaderData';

const Header = lazy(() => import('~/components/Header'));
const Footer = lazy(() => import('~/components/Footer'));

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'preconnect', href: 'https://cdn.sanity.io' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
      crossOrigin: 'anonymous',
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;700&family=Inter:wght@500;700;800&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap',
      rel: 'stylesheet',
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css',
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    // Dark/light mode
    const cookieHeader = request.headers.get('Cookie');
    const theme =
      ((await themePreferenceCookie.parse(cookieHeader)) as string) || 'light';
    const siteSettings = await getSiteSetting();
    const categories = await getCategories();

    return json({
      theme,
      categories,
      siteSettings,
      ENV: {
        VITE_SANITY_PROJECT_ID: import.meta.env.VITE_SANITY_PROJECT_ID!,
        VITE_SANITY_DATASET: import.meta.env.VITE_SANITY_DATASET!,
        VITE_SANITY_API_VERSION: import.meta.env.VITE_SANITY_API_VERSION!,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load data');
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { siteSettings } = data || {};

  return [
    { title: siteSettings?.title, description: siteSettings?.description },
  ];
};

export default function App() {
  const { theme: t, siteSettings, ENV } = useLoaderData<typeof loader>();
  const [theme, setTheme] = useState(t);
  const location = useLocation();
  const isInStudio = !!location.pathname.match(/^\/studio/);

  useEffect(() => {
    if (window !== undefined) {
      // @ts-ignore
      window.fbAsyncInit = function () {
        // @ts-ignore
        FB.init({
          appId: '950974113535167',
          xfbml: true,
          version: 'v2.3',
        });
      };
    }
  }, []);

  return (
    <html lang='en'>
      <head>
        <Meta />
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />

        <link rel='icon' href={siteSettings.faviconUrl} />

        <Links />
        <script
          async
          defer
          crossOrigin='anonymous'
          src='https://connect.facebook.net/en_US/sdk.js'
        ></script>
      </head>

      <body
        className={`${theme} scroll relative transition-colors ease-in-out duration-1000`}
      >
        {isInStudio || (
          <Suspense
            fallback={
              <Skeleton variant='rectangular' width={210} height={60} />
            }
          >
            <Header theme={theme} setTheme={setTheme} />
          </Suspense>
        )}

        {isInStudio ? (
          <Outlet />
        ) : (
          <main className=''>
            <Outlet />
          </main>
        )}

        {isInStudio || (
          <Suspense
            fallback={
              <Skeleton variant='rectangular' width={210} height={60} />
            }
          >
            <Footer />
          </Suspense>
        )}

        <BackToTop />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Links />
      </head>
      <body>
        <HandsomeError />
      </body>
    </html>
  );
}
