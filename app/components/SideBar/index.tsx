import { Link } from '@remix-run/react';
import { RiStarFill } from '@remixicon/react';
import Ads from '../Ads';
import { IArticle } from '~/types';
import { PortableTextBlock } from '@portabletext/react';

export default function SideBar({
  articles,
  ads,
}: {
  articles: Array<IArticle>;
  ads?: Array<PortableTextBlock>;
}) {
  return (
    <aside className='col-span-3 max-md:hidden'>
      <div className=' mb-4'>
        <div className='flex justify-center items-center text-white h-fit p-2 bg-[--main-color] uppercase font-medium'>
          <RiStarFill />
          <h2 className='ml-2'>Mới cập nhật</h2>
        </div>

        <div className='shadow-xl flex flex-col divide-y px-4 border font-semibold'>
          {articles.slice(0, 4).map((a, i) => (
            <article key={i} className='w-full h-fit py-2'>
              <p
                className='hover:text-[--main-color]'
                style={{
                  display: '-webkit-box',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflowWrap: 'break-word',
                  overflow: 'hidden',
                }}
              >
                <Link to={`/doc/${a.slug}`}>{a.excerpt}</Link>
              </p>
            </article>
          ))}
        </div>
      </div>

      {ads && <Ads ads={ads} />}
    </aside>
  );
}
