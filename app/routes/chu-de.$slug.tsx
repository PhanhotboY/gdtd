import { lazy, Suspense } from 'react';
import { defer, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';

import EventSlicker from '~/components/EventSlicker';
import { getHashtag, getHashtags } from '~/services/hashtag.service';
import Categories from '~/components/Categories';
import HandsomeError from '~/components/HandsomeError';
import {
  getArticles,
  getArticlesByCategory,
  getArticlesByHashtag,
} from '~/services/article.service';
import HorizontalArticle from '~/components/Article/Horizontal';
import SideBar from '~/components/SideBar';
import VerticalArtical from '~/components/Article/Vertical';
import { getAds } from '~/services/ads.service';
import ArticleList from '~/components/ArticleList';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const path = url.pathname.split('/').pop() || '';
  const hashtagSlug = path.split('?')[0];

  const hashtag = await getHashtag(hashtagSlug);

  return defer({
    ads: getAds(),
    hashtag,
    hashtags: getHashtags(),
    relatedArticles: getArticlesByHashtag({
      page: 1,
      period: Date.now() / 1000,
      hashtagId: hashtag.id,
      sort: 'views desc',
    }),
    latestArticles: getArticlesByHashtag({
      page: 1,
      period: Date.now() / 1000,
      hashtagId: hashtag.id,
      sort: 'publishedAt desc',
    }),
  });
};

export function ErrorBoundary() {
  return <HandsomeError />;
}

// export const meta: MetaFunction<typeof loader> = ({ data }) => {
//   const { article } = data || {};
//   return [{ title: article.title, description: article.excerpt }];
// };

export default function Article() {
  const { hashtags, hashtag, latestArticles, ads, relatedArticles } =
    useLoaderData<typeof loader>();

  return (
    <div className='container items-center justify-center overflow-hidden py-4'>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={hashtags}>
            {(hashtags) => <EventSlicker hashtags={hashtags} />}
          </Await>
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={hashtag}>
            {(hashtag) => (
              <Categories category={hashtag} link={`/chu-de/${hashtag.slug}`} />
            )}
          </Await>
        </Suspense>
      </div>

      <div className='grid grid-cols-12 gap-x-6 mt-5'>
        <section className='col-span-full md:col-span-7'>
          <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={relatedArticles}>
              {(articles) => (
                <div className='max-md:px-2'>
                  <ArticleList
                    articles={articles}
                    articlesGetter={(page) =>
                      getArticlesByHashtag({
                        page,
                        period: Date.now() / 1000,
                        hashtagId: hashtag.id,
                        sort: 'views desc',
                      })
                    }
                    emphasized
                  />
                </div>
              )}
            </Await>
          </Suspense>
        </section>

        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={latestArticles}>
            {(arts) => (
              <Await resolve={ads}>
                {(ads) => <SideBar articles={arts} ads={ads.ads1} />}
              </Await>
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
