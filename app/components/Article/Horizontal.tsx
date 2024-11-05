import { Link } from '@remix-run/react';
import clsx from 'classnames';
import { getPublicPeriod } from '~/lib';

export default function HorizontalArticle({
  article,
  detailed = false,
  important = false,
  ratio = '6/4',
  colSpan = 10,
  className,
  showCategory = false,
}: {
  article: any;
  detailed?: boolean;
  important?: boolean;
  ratio?: string;
  colSpan?: number;
  className?: string;
  showCategory?: boolean;
}) {
  const wrapperClass = clsx(
    'rank-1',
    'block',
    'md:grid',
    `grid-cols-${colSpan}`,
    `col-span-${colSpan}`,
    important ? 'gap-1 md:gap-4' : 'gap-3 pb-2.5',
    className
  );
  const imgClass = clsx('thumb-wrapper', `col-span-${ratio.split('/')[0]}`);
  const contentClass = clsx(
    'content',
    'flex',
    'flex-col',
    `col-span-${ratio.split('/')[1]}`
  );

  const category = article.category?.parent?.title || article.category?.title;

  return (
    <article className={wrapperClass}>
      <figure className={`${imgClass} max-md:mb-2`}>
        <Link to={`/doc/${article.slug}`}>
          <img
            src={article.thumbnailUrl}
            alt={article.title}
            title={article.title}
          />
        </Link>
      </figure>

      <div className={`${contentClass} px-2`}>
        <h2
          className={`${
            important ? 'text-base md:text-xl' : 'text-sm'
          } hover:text-[--main-color]`}
          title={article.title}
          style={{
            display: '-webkit-box',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflowWrap: 'break-word',
            overflow: 'hidden',
          }}
        >
          <Link to={`/doc/${article.slug}`}>{article.title}</Link>
        </h2>

        <div className='flex items-center'>
          {showCategory && (
            <p className='md:hidden text-[--main-color] text-sm font-semibold mr-2'>
              <Link to={`/danh-muc/${category}`}>{category}</Link>
            </p>
          )}

          <time
            className={`${important ? 'text-sm italic' : 'text-xs my-1'}`}
            dateTime={article.publishedAt}
          >
            {getPublicPeriod(article.publishedAt)}
          </time>
        </div>

        {detailed && (
          <p
            className='max-h-12 text-base'
            style={{
              display: '-webkit-box',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflowWrap: 'break-word',
              overflow: 'hidden',
            }}
          >
            {article.excerpt}
          </p>
        )}
      </div>
    </article>
  );
}
