import { Suspense } from 'react';
import { defer, json } from '@remix-run/node';

import Ads from '~/components/Ads';
import Banner from '~/components/Banner';
import Hydrated from '~/components/Hydrated';
import BannerNav from '~/components/BannerNav';
import { getAds } from '~/services/ads.service';
import ArticleBox from '~/components/ArticleBox';
import EventSlicker from '~/components/EventSlicker';
import { IArticle } from '~/types';
import HandsomeError from '~/components/HandsomeError';
import SeemoreButton from '~/components/SeemoreButton';
import { getHashtags } from '~/services/hashtag.service';
import SmallArticleBox from '~/components/SmallArticleBox';
import VerticalArtical from '~/components/Article/Vertical';
import HorizontalArticle from '~/components/Article/Horizontal';
import HighlightArticleBox from '~/components/HighlightArticleBox';
import { useRootLoaderData } from '~/lib/useRootLoaderData';
import { Await, useLoaderData } from '@remix-run/react';
import { getArticles, getArticlesByCategory } from '~/services/article.service';

export const loader = async () => {
  try {
    const hashtags = await getHashtags(15);
    const ads = await getAds();

    return defer({
      hashtags,
      ads,
      latestArticles: getArticles({
        page: 1,
        period: Date.now() / 1000,
        limit: 5,
      }),
    });
  } catch (error) {
    throw new Error('Failed to load data', (error as any).message);
  }
};

export function ErrorBoundary() {
  return <HandsomeError />;
}

export default function Index() {
  const { ads, hashtags, latestArticles } = useLoaderData<typeof loader>();
  const { categories } = useRootLoaderData();

  return (
    <div className='container gap-y-20 py-4'>
      <Hydrated>
        <EventSlicker hashtags={hashtags} />
      </Hydrated>

      <div className='grid grid-cols-12 gap-y-12'>
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={latestArticles}>
            {(a) => !!a.length && <Overview articles={a} />}
          </Await>
        </Suspense>

        <SmallArticleBox
          articlesGetter={() =>
            getArticlesByCategory({
              categoryId: categories[0].id,
              period: Date.now() / 1000,
              page: 1,
              limit: 5,
            })
          }
          category={categories[0]}
          height={450}
          ads={ads.ads1}
          showSidebar
        />

        <Banner className='col-span-full' bannerData={ads.banner1} />

        <ArticleBox
          category={categories[1]}
          articlesGetter={() =>
            getArticlesByCategory({
              categoryId: categories[1].id,
              period: Date.now() / 1000,
              page: 1,
              limit: 5,
            })
          }
        />

        <SmallArticleBox
          articlesGetter={() =>
            getArticlesByCategory({
              categoryId: categories[2].id,
              period: Date.now() / 1000,
              page: 1,
            })
          }
          category={categories[2]}
          height={450}
          ads={ads.ads1}
          showSidebar
        />

        <Banner className='col-span-full' bannerData={ads.banner2} />

        <ArticleBox
          category={categories[3]}
          articlesGetter={() =>
            getArticlesByCategory({
              categoryId: categories[3].id,
              period: Date.now() / 1000,
              page: 1,
              limit: 5,
            })
          }
        />

        <Banner className='col-span-full' bannerData={ads.banner3} />

        <ArticleBox
          category={categories[4]}
          articlesGetter={() =>
            getArticlesByCategory({
              categoryId: categories[4].id,
              period: Date.now() / 1000,
              page: 1,
              limit: 5,
            })
          }
        />

        <HighlightArticleBox
          category={categories[5]}
          articlesGetter={() =>
            getArticlesByCategory({
              categoryId: categories[5].id,
              period: Date.now() / 1000,
              page: 1,
              limit: 4,
            })
          }
        />

        <ArticleBox
          category={categories[6]}
          articlesGetter={() =>
            getArticlesByCategory({
              categoryId: categories[6].id,
              period: Date.now() / 1000,
              page: 1,
              limit: 5,
            })
          }
        />

        <div className='col-span-12'>
          <SeemoreButton href='/tin-moi' />
        </div>

        <BannerNav categories={categories.filter((_, i) => i < 5)} />

        <Ads col={12} ads={ads.ads1} />
      </div>
    </div>
  );
}

const Overview = ({ articles }: { articles: IArticle[] }) => {
  return (
    <div className='col-span-full grid grid-cols-12 gap-4 md:gap-x-6 md:gap-y-8 mt-5'>
      <HorizontalArticle
        article={articles[0]}
        detailed
        important
        className='max-lg:col-span-full'
      />

      <div className='col-span-2 hidden lg:flex flex-col justify-between'>
        <img
          src='https://cdn.giaoducthoidai.vn/images/933b8210c8725bcb014523ebb505ed6a1e32d79aa3e271a0d9caf357bf7309da8d4b5c953e767c4cda9f3d9121710cb9baa5997e317471d505df4c4320653ccb/300x80-1369.png.webp'
          alt=''
        />

        <img
          src='https://cdn.giaoducthoidai.vn/images/933b8210c8725bcb014523ebb505ed6a0eaa996d784d29403dc60aaf517ac700c194e837b52ff25fa766e7499b99fcdebaa5997e317471d505df4c4320653ccb/210x250-286.png.webp'
          alt=''
        />
      </div>

      <div className='col-span-full border-b md:hidden'></div>

      {articles.slice(1).map((a, i) => (
        <VerticalArtical
          article={a}
          key={i}
          className='max-md:col-span-6 max-md:px-2'
        />
      ))}
    </div>
  );
};
