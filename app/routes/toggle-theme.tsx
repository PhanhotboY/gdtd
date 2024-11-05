import { ActionFunctionArgs } from '@remix-run/node';
import { themePreferenceCookie } from '~/cookies';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const theme = formData.get('theme');

  return new Response(null, {
    status: 200,
    headers: {
      'Set-Cookie': await themePreferenceCookie.serialize(theme),
    },
  });
}
