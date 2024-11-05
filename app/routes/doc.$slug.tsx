import { lazy, Suspense, useEffect, useState } from 'react';
import {
  ActionFunction,
  defer,
  json,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { Await, Link, useFetcher, useLoaderData } from '@remix-run/react';

import EventSlicker from '~/components/EventSlicker';
import { getHashtags } from '~/services/hashtag.service';
import Categories from '~/components/Categories';
import HandsomeError from '~/components/HandsomeError';
import {
  getArticleDetail,
  getArticles,
  getArticlesByCategory,
  getArticlesByHashtag,
} from '~/services/article.service';
import { getAds } from '~/services/ads.service';
import { RiHome4Fill } from '@remixicon/react';
import ShareBox from '~/components/ShareBox';
import Hashtags from '~/components/Hashtags';
import FeaturedNews from '~/components/FeaturedNews';
import ArticleList from '~/components/ArticleList';
import SmallArticleBox from '~/components/SmallArticleBox';
import ArticleDetail from '~/components/ArticleDetail';
import RelatedArticle from '~/components/RelatedArticle';
import SameCategoryArticles from '~/components/SameCategoryArticles';
import { getCategory } from '~/services/category.service';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const articleSlug = url.pathname.split('/').pop() || '';

  const article = await getArticleDetail(articleSlug);

  if (!article) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const category = getCategory(
    article.category.parent?.slug || article.category.slug
  );
  const ads = getAds();
  const relatedArticles = getArticlesByHashtag({
    hashtagId: article.hashtags[0].id,
    page: 1,
    period: Date.now() / 1000,
    sort: 'views desc',
  });
  const sameCategoryArticles = getArticlesByCategory({
    categoryId: article.category.id,
    page: 1,
    period: Date.now() / 1000,
    sort: 'views desc',
  });
  const featuredArticles = getArticles({
    page: 1,
    sort: 'views desc',
    period: Date.now() / 1000,
  });

  return defer({
    hashtags: getHashtags(),
    article,
    category,
    ads,
    relatedArticles,
    featuredArticles,
    sameCategoryArticles,
  });
};

export function ErrorBoundary() {
  return <HandsomeError />;
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { article } = data || {};
  return [{ title: article?.title, description: article?.excerpt }];
};

export default function Article() {
  const {
    ads,
    article,
    hashtags,
    category,
    relatedArticles,
    featuredArticles,
    sameCategoryArticles,
  } = useLoaderData<typeof loader>();

  const fetcher = useFetcher();
  const [timerReached, setTimerReached] = useState(false);
  const articleId = article.id;

  useEffect(() => {
    const storageKey = `viewed_${articleId}`;
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    const thirtySeconds = 30 * 1000;

    // Check if 5 minutes have passed since the last view increment
    const lastViewed = parseInt(localStorage.getItem(storageKey) || '0', 10);

    // Only proceed if 5 minutes have passed
    if (!lastViewed || now - lastViewed > fiveMinutes) {
      // Set a 30-second timer to check if the user stays on the article
      const timer = setTimeout(() => {
        setTimerReached(true); // Set flag to allow view increment after 30 seconds
      }, thirtySeconds);

      return () => clearTimeout(timer); // Clear timer if the component unmounts
    }
  }, [articleId]);

  useEffect(() => {
    const storageKey = `viewed_${articleId}`;
    const now = Date.now();

    // Only increment views if the 30-second timer has reached
    if (timerReached) {
      // Trigger the view increment API
      fetcher.load(`/api/increment-view?articleId=${articleId}`);

      // Store the current timestamp in localStorage to prevent further increments for 5 minutes
      localStorage.setItem(storageKey, now.toString());
    }
  }, [timerReached, articleId]);

  return (
    <div className='container items-center justify-center overflow-hidden py-4'>
      <div>
        <div className='block md:hidden w-full aspect-video flex items-center justify-center overflow-hidden'>
          <img src={article.thumbnailUrl} alt={article.title} />
        </div>

        <div className='hidden md:block'>
          <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={hashtags}>
              {(hashtags) => <EventSlicker hashtags={hashtags} />}
            </Await>
          </Suspense>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={category}>
            {(cat) => (
              <div>
                <div className='hidden md:block'>
                  <Categories category={cat} />
                </div>

                <div className='md:hidden max-md:bg-[--main-color] border-l-[6px] leading-8 border-[color:--main-color] flex md:gap-x-6 items-center md:mt-4'>
                  <Link
                    to='/'
                    className='block md:hidden rounded-full bg-zinc-100/30 p-1'
                  >
                    <RiHome4Fill color='white' size={16} />
                  </Link>

                  <h2 className='font-semibold max-md:text-white max-md:py-2 text-sm md:text-xl uppercase ml-3 md:hover:text-[color:--main-color]'>
                    <Link to={`/danh-muc/${cat.slug}`}>{cat.title}</Link>
                  </h2>
                </div>
              </div>
            )}
          </Await>
        </Suspense>
      </div>

      <div className='flex flex-col lg:pr-80 gap-y-6 col-span-6 max-md:px-2'>
        <ArticleDetail article={article} />

        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={relatedArticles}>
            {(articles) => <RelatedArticle articles={articles} />}
          </Await>
        </Suspense>

        <Hashtags hashtags={article.hashtags} />

        <ShareBox />

        {/* <CommentBox />  */}

        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={sameCategoryArticles}>
            {(a) => <SameCategoryArticles articles={a} />}
          </Await>
        </Suspense>

        <SmallArticleBox
          category='Tin tiêu điểm'
          articlesGetter={() =>
            getArticles({
              page: 1,
              sort: 'views desc',
              period: Date.now() / 1000,
            })
          }
          detailed
          cols={12}
          ratio='7/5'
          height={550}
        />

        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={featuredArticles}>
            {(a) => !!a.length && <FeaturedNews articles={a} />}
          </Await>
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={sameCategoryArticles}>
            {(a) => (
              <ArticleList
                articles={a}
                articlesGetter={(page) =>
                  getArticles({
                    page,
                    sort: 'views desc',
                    period: Date.now() / 1000,
                  })
                }
              />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
