import { IArticle, ICategoryDetail } from '~/types';
import HorizontalArticle from '../Article/Horizontal';
import VerticalArtical from '../Article/Vertical';
import BoxHeader from '../BoxHeading';
import SideBar from '../SideBar';
import { useEffect, useState } from 'react';

export default function SmallArticleBox({
  articlesGetter,
  category,
  showSidebar = false,
  detailed = false,
  ratio = '6/3',
  cols = 9,
  height,
  ads,
}: {
  category: ICategoryDetail | string;
  articlesGetter: () => Promise<IArticle[]>;
  showSidebar?: boolean;
  detailed?: boolean;
  ratio?: string;
  cols?: number;
  height?: number;
  ads?: Array<any>;
}) {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    articlesGetter().then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, []);

  return (
    <section className='flex flex-col md:grid col-span-full grid-cols-12 gap-x-6'>
      <div className={`grid col-span-${cols} mt-4`}>
        <BoxHeader category={category} />

        <div className={`grid grid-cols-${cols} col-span-full gap-x-4`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            !!articles.length && (
              <>
                <div
                  className={`max-md:col-span-full col-span-${
                    ratio.split('/')[0]
                  } row-span-4 h-fit`}
                >
                  <VerticalArtical article={articles[0]} detailed important />
                </div>

                <div
                  className={`max-md:col-span-full col-span-${
                    ratio.split('/')[1]
                  }`}
                  style={{
                    maxHeight: height ? `${height}px` : '500px',
                  }}
                >
                  <ul
                    className={`scroll max-md:grid grid-cols-2 px-2 gap-x-4 md:gap-x-2 max-md:gap-y-4 max-md:mt-4 md:scroll md:divide-y h-full md:overflow-auto`}
                  >
                    {articles.slice(1).map((article, index) => (
                      <li
                        className={`col-span-1 md:[&:not(:first-child)]:pt-2.5 ${
                          index > 3 ? 'hidden md:block' : ''
                        }`}
                        key={index}
                      >
                        <HorizontalArticle
                          article={article}
                          ratio='1/2'
                          colSpan={3}
                          detailed={detailed}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )
          )}
        </div>
      </div>

      {showSidebar && <SideBar articles={articles} ads={ads} />}
    </section>
  );
}
