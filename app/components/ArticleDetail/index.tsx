import { PortableText } from '@portabletext/react';
import { getImageDimensions } from '@sanity/asset-utils';
import urlBuilder from '@sanity/image-url';

import './index.css';
import { client } from '~/sanity/client';
import { getPublicPeriod } from '~/lib';
import { useRootLoaderData } from '~/lib/useRootLoaderData';
import HighlightDecorator from '~/components/HighlightDecorator';

export default function ArticleDetail({ article }: { article: any }) {
  const { siteSettings } = useRootLoaderData();

  return (
    <section id='article_detail' className='col-span-6'>
      <article className={`block print:m-0`}>
        <img
          className='w-32 m-auto hidden print:block'
          src={siteSettings.logoUrl}
          alt={siteSettings.title}
        />
        <h1 className='!text-3xl font-semibold my-4'>{article.title}</h1>

        <div className='flex md:block items-center border-y'>
          <p className='text-base text-[color:--sub3-text-color] font-medium mr-4'>
            {article.author.name}
          </p>

          <time
            className='text-sm'
            dateTime={getPublicPeriod(article.publishedAt)}
          >
            {getPublicPeriod(article.publishedAt)}
          </time>
        </div>

        <PortableText
          value={article.body}
          components={{
            types: {
              image: PortableImage,
            },
            marks: {
              highlight: HighlightDecorator,
            },
          }}
        />
      </article>
    </section>
  );
}

const PortableImage = ({ value }: { value: any }) => {
  const { width, height } = getImageDimensions(value);
  return (
    <figure className='flex flex-col w-fit items-center m-auto'>
      <img
        src={urlBuilder(client)
          .image(value.asset)
          .width(800)
          .fit('max')
          .auto('format')
          .url()}
        alt={value.alt || ' '}
        title={value.alt || ' '}
        loading='lazy'
        style={{
          // Avoid jumping around with aspect-ratio CSS property
          aspectRatio: width / height,
        }}
      />

      <p className='w-full text-center text-sm bg-zinc-200 py-2'>
        {value.alt || ' '}
      </p>
    </figure>
  );
};
