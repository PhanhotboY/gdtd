import { Link } from '@remix-run/react';
import { RiArrowRightSLine, RiMovie2Line } from '@remixicon/react';
import VerticalArtical from '../Article/Vertical';
import { IArticle } from '~/types';
import { useEffect, useState } from 'react';

export default function HighlightArticleBox({
  category = { title: '', slug: '' },
  // articles = [],
  articlesGetter,
}: {
  category: { title: string; slug: string };
  articles?: Array<IArticle>;
  articlesGetter: () => Promise<Array<IArticle>>;
}) {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Array<IArticle>>([]);

  useEffect(() => {
    articlesGetter().then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, []);

  return (
    <section className='bg-[--main-color] col-span-full'>
      <div className='container p-4 text-white'>
        <div className='flex justify-between w-full overflow-hidden'>
          <h2 className='font-bold text-xl'>
            <Link
              to={`/danh-muc/${category.slug}`}
              className='flex items-center hover:text-white/80'
            >
              <RiMovie2Line size={20} className='mr-2' />
              {category.title}
            </Link>
          </h2>

          <Link
            className='text-sm hover:text-white/80'
            to={`/danh-muc/${category.slug}`}
          >
            Xem thêm
            <RiArrowRightSLine className='inline-block' />
          </Link>
        </div>

        <div className='grid grid-cols-12 gap-x-4 md:gap-x-6 mt-4'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            articles.slice(0, 4).map((article, index) => (
              <article
                className='col-span-6 max-md:mb-2 md:col-span-3 flex-col text-white'
                key={index}
              >
                <figure className='hover:text-white/80'>
                  <Link to={`/doc/${article.slug}`} className='thumb-wrapper'>
                    <img
                      src={article.thumbnailUrl}
                      alt={article.title}
                      title={article.title}
                    />
                  </Link>

                  <div className='content flex flex-col col-span-4'>
                    <h2
                      className={`text-base text-inherit mt-2 font-semibold`}
                      title={article.title}
                    >
                      <Link to={`/doc/${article.slug}`}>{article.title}</Link>
                    </h2>
                  </div>
                </figure>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
