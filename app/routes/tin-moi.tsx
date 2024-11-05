import { defer } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import ArticleList from '~/components/ArticleList';

import { getArticles } from '~/services/article.service';
import { getHashtags } from '~/services/hashtag.service';

export const loader = async () => {
  return defer({ hashtags: getHashtags() });
};

export default function LatestNews() {
  const { hashtags } = useLoaderData<typeof loader>();

  return (
    <section className='max-md:px-2 container my-8 grid grid-cols-12'>
      <div className='col-span-full'>
        <h3 className='text-2xl text-[--sub4-text-color] font-bold max-md:py-1 border-l-8 md:border-l-8 border-[color:--main-color] px-3 w-fit'>
          Tin mới nhất
        </h3>
      </div>

      <div className='mt-6 col-span-full md:col-span-9'>
        <ArticleList
          articles={getArticles({
            page: 1,
            period: Date.now() / 1000,
            sort: 'publishedAt desc',
          })}
          articleLoader={() =>
            getArticles({
              page: 2,
              period: Date.now() / 1000,
              sort: 'publishedAt desc',
            })
          }
        />
      </div>
    </section>
  );
}
