import { Link } from '@remix-run/react';
import { Tag } from 'lucide-react';
import { IHashtag } from '~/types';

export default function Hashtags({ hashtags }: { hashtags: Array<IHashtag> }) {
  return (
    <section className='grid grid-cols-12 gap-4'>
      <div className='flex text-[color:var(--sub6-text-color)] col-span-full md:col-span-2'>
        <Tag className='scale-x-[-1] mx-4' />
        <h3 className='text-xl font-bold'>Chủ đề:</h3>
      </div>

      <ul className='col-span-full md:col-span-10 flex flex-wrap gap-4'>
        {hashtags.map((tag, i) => (
          <li
            className='border rounded-full py-1 w-fit text-[color:var(--sub4-text-color)]'
            key={i}
          >
            <Link
              to={`/chu-de/${tag.slug}`}
              className='px-4 py-2 hover:text-[--main-color]'
            >
              #{tag.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
