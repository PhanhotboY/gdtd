import { Suspense, useEffect, useState } from 'react';
import { Await, Form, useLoaderData, useLocation } from '@remix-run/react';
import SideBar from '~/components/SideBar';
import { getArticles, searchArticles } from '~/services/article.service';
import { getAds } from '~/services/ads.service';
import { defer, json, LoaderFunctionArgs } from '@remix-run/node';
import { RiSearch2Line } from '@remixicon/react';
import ArticleList from '~/components/ArticleList';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';

  const searchRes = await searchArticles({ query, page: 1 });

  return defer({
    ads: getAds(),
    searchRes,
    latestArticles: getArticles({ page: 1, period: Date.now() / 1000 }),
  });
};

export default function SearchPage() {
  const { searchRes, ads, latestArticles } = useLoaderData<typeof loader>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  const [input, setInput] = useState(query);

  return (
    <div className='container grid grid-cols-12 gap-x-6 overflow-hidden max-md:px-2 py-4'>
      <div className='col-span-full md:col-span-9'>
        <Form className='relative' method='GET' action='/tim-kiem'>
          <input
            className={`text-xl leading-8 w-full border border-[--sub7-text-color] focus:outline-none focus:border-[--main-color] bg-[--main-bg-color] rounded-full py-1 md:py-2 px-5`}
            disabled={false}
            value={input}
            name='q'
            placeholder='Tìm kiếm...'
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            className='absolute right-4 top-3'
            title='Tìm kiếm'
            type='submit'
          >
            <RiSearch2Line className={`text-[--main-color]`} />
          </button>
        </Form>

        <p className='text-xl text-[--sub6-text-color] my-5'>
          <span className='font-medium text-[--sub2-text-color]'>
            {searchRes.count || 1234}
          </span>{' '}
          kết quả phù hợp
        </p>
      </div>

      <div className='col-span-full md:col-span-9'>
        <ArticleList
          articles={searchRes.articles}
          articlesGetter={async (page) => {
            const res = await searchArticles({ page, query });
            return res.articles;
          }}
        />
      </div>

      <div className='hidden md:block col-span-3'>
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
