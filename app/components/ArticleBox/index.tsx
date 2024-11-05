import { IArticle, ICategory, ICategoryDetail } from '~/types';
import VerticalArtical from '../Article/Vertical';
import BoxHeader from '../BoxHeading';
import { useEffect, useState } from 'react';

export default function ArticleBox({
  articlesGetter,
  category,
}: {
  category: ICategoryDetail | ICategory;
  articlesGetter: () => Promise<Array<IArticle>>;
}) {
  const [articles, setArticles] = useState<Array<IArticle>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    articlesGetter().then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, []);

  return (
    <section className='grid col-span-full grid-cols-12 gap-x-6'>
      <BoxHeader category={category} />

      <div className='grid grid-cols-12 col-span-full gap-x-6'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          !!articles.length && (
            <>
              <div className='col-span-full md:col-span-6 row-span-4'>
                <VerticalArtical article={articles[0]} detailed important />
              </div>

              <div className='scroll grid grid-cols-2 md:grid-cols-6 col-span-full md:col-span-6 gap-4 max-md:mt-4 max-md:px-2'>
                {articles.slice(1, 5).map((article, index) => (
                  <div
                    className='md:[&:not(:first-child)]:pt-2.5 col-span-1 md:col-span-3'
                    key={index}
                  >
                    <VerticalArtical article={article} />
                  </div>
                ))}
              </div>
            </>
          )
        )}
      </div>
    </section>
  );
}
