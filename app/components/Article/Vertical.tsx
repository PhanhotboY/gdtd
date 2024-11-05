import { Link } from '@remix-run/react';
import { getPublicPeriod } from '~/lib';
import { IArticle } from '~/types';

export default function VerticalArtical({
  article,
  detailed = false,
  important = false,
  className = '',
}: {
  article: IArticle;
  detailed?: boolean;
  important?: boolean;
  className?: string;
}) {
  return (
    <article className={`${className} col-span-3 flex-col`}>
      <figure className='hover:text-[--main-color]'>
        <Link to={`/doc/${article.slug}`} className='thumb-wrapper'>
          <img
            src={article.thumbnailUrl}
            alt={article.title}
            title={article.title}
          />
        </Link>

        <div className='content flex flex-col col-span-4'>
          <h2
            className={`${
              important ? 'text-2xl' : 'text-base'
            } text-inherit mt-2 max-md:px-2`}
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
        </div>
      </figure>

      {detailed && (
        <div className='max-md:px-2'>
          <time className='text-xs' dateTime={article.publishedAt}>
            {getPublicPeriod(article.publishedAt)}
          </time>

          <p>{article.excerpt}</p>
        </div>
      )}
    </article>
  );
}
