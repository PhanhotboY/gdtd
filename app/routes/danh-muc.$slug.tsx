import { lazy, Suspense } from 'react';
import { defer, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';

import EventSlicker from '~/components/EventSlicker';
import { getHashtags } from '~/services/hashtag.service';
import Categories from '~/components/Categories';
import HandsomeError from '~/components/HandsomeError';
import {
  getArticleDetail,
  getArticles,
  getArticlesByCategory,
} from '~/services/article.service';
import { getCategory } from '~/services/category.service';
import FeaturedNews from '~/components/FeaturedNews';
import HorizontalArticle from '~/components/Article/Horizontal';
import SideBar from '~/components/SideBar';
import VerticalArtical from '~/components/Article/Vertical';
import { getAds } from '~/services/ads.service';
import SeemoreButton from '~/components/SeemoreButton';
import ArticleList from '~/components/ArticleList';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const categorySlug = params.slug;

  const category = await getCategory(categorySlug!);

  if (!category) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const ads = getAds();
  const relatedArticles = getArticlesByCategory({
    categoryId: category.id,
    page: 1,
    period: Date.now() / 1000,
  });
  const latestArticles = getArticles({
    page: 1,
    period: Date.now() / 1000,
  });
  const hashtags = getHashtags();

  return defer({
    ads,
    category,
    hashtags,
    relatedArticles,
    latestArticles,
  });
};

export function ErrorBoundary() {
  return <HandsomeError />;
}

export const meta: MetaFunction<typeof loader> = ({ data, ...res }) => {
  const { category } = data || {};
  return [{ title: category?.title }];
};

export default function Article() {
  const { hashtags, category, latestArticles, ads, relatedArticles } =
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
          <Await resolve={category}>
            {(category) => <Categories category={category} />}
          </Await>
        </Suspense>
      </div>

      <div className='flex flex-col-reverse md:grid grid-cols-12 gap-x-6 col-span-6 mt-5 max-md:px-2'>
        <section className='col-span-7'>
          <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={relatedArticles}>
              {(articles) => (
                <ArticleList
                  articles={articles}
                  articlesGetter={(page) =>
                    getArticlesByCategory({
                      page,
                      categoryId: category.id,
                      period: Date.now() / 1000,
                    })
                  }
                  emphasized
                />
              )}
            </Await>
          </Suspense>
        </section>

        <div className='col-span-2 hidden md:block'>
          <section>
            <h3 className='text-2xl text-[--sub4-text-color] font-bold border-l-8 border-[color:--main-color] pl-2 py-2 bg-zinc-100'>
              Tin tiêu điểm
            </h3>

            <ul className='grid gap-y-4 col-span-7 mt-6'>
              <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={relatedArticles}>
                  {(articles) =>
                    articles.map((a: any, i: number) => (
                      <li key={i}>
                        <VerticalArtical article={a} />
                      </li>
                    ))
                  }
                </Await>
              </Suspense>
            </ul>
          </section>
        </div>

        <div className='col-span-3 hidden md:block'>
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
    </div>
  );
}
