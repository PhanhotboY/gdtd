import { createCookie } from '@remix-run/node';

export const themePreferenceCookie = createCookie(`themePreference`, {
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 30,
});
