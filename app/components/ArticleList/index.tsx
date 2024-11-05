import { useEffect, useState } from 'react';
import HorizontalArticle from '../Article/Horizontal';
import SeemoreButton from '../SeemoreButton';
import { CircularProgress } from '@mui/material';
import { IArticle } from '~/types';
import VerticalArtical from '../Article/Vertical';

export default function ArticleList({
  articles,
  articlesGetter,
  emphasized = false,
}: {
  articles: Array<IArticle>;
  articlesGetter: (page: number) => Promise<Array<IArticle>> | Array<IArticle>;
  emphasized?: boolean;
}) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadedArticles, setLoadedArticles] = useState<Array<any>>(articles);

  const loadArticles = async () => {
    setLoading(true);
    const articles = await articlesGetter(page + 1);
    setPage(page + 1);
    if (!articles.length) {
      setHasMore(false);
      setLoading(false);
      return;
    }
    setLoadedArticles([...loadedArticles, ...articles]);
    setLoading(false);
  };

  const articleProps = {
    ratio: '4/6',
    detailed: true,
    important: true,
    showCategory: true,
    className: 'flex flex-col text-xl',
  };

  useEffect(() => {
    setLoadedArticles(articles);
    setPage(1);
    setHasMore(true);
  }, [articles]);

  return (
    !!loadedArticles.length && (
      <section>
        <ul id='article-list' className='grid gap-y-6 md:gap-y-4'>
          {emphasized && (
            <li>
              <VerticalArtical
                article={loadedArticles[0]}
                detailed
                important
                className='mb-4'
              />
            </li>
          )}

          {(emphasized ? loadedArticles.slice(1) : loadedArticles).map(
            (a: any, i: number) => (
              <li key={i}>
                <HorizontalArticle article={a} {...articleProps} />
              </li>
            )
          )}
        </ul>

        {loading && (
          <div className='w-fit m-auto mt-6'>
            <CircularProgress color='inherit' />
          </div>
        )}

        {hasMore && <SeemoreButton className='mt-6' loadData={loadArticles} />}
      </section>
    )
  );
}
