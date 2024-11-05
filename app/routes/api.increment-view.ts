import { json, LoaderFunctionArgs } from '@remix-run/node';
import { incViewCount } from '~/services/article.service';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const url = new URL(request.url);
    const articleId = url.searchParams.get('articleId');
    // const viewToken = url.searchParams.get('viewToken');

    if (!articleId) {
      return json({ error: 'Invalid request' }, { status: 400 });
    }

    // // Verify token (ensure it's unique and hasn't been reused within a certain time)
    // if (!isTokenValid(viewToken)) {
    //   return json({ error: 'Invalid or reused token' }, { status: 403 });
    // }

    // // Mark the token as used to prevent further increments
    // storeToken(viewToken);

    // Increment views in Sanity
    await incViewCount(articleId);

    new Response(null, { status: 200 });
    return json({ success: true });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
    // return json({ error: error.message }, { status: 500 });
  }
};
