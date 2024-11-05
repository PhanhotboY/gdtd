import { Link } from '@remix-run/react';
import { RiHome4Fill, RiHome4Line } from '@remixicon/react';

export default function Categories({
  category,
  link,
}: {
  category: {
    title: string;
    slug: string;
    subCategories?: Array<{ title: string; slug: string }>;
  };
  link?: string;
}) {
  return (
    <nav className='border-l-[6px] max-md:ml-2 leading-8 border-[color:--main-color] flex gap-x-6 items-center mt-4'>
      <h2 className='font-semibold text-xl uppercase ml-3 hover:text-[color:--main-color]'>
        <Link to={link || `/danh-muc/${category.slug}`}>{category.title}</Link>
      </h2>

      {category.subCategories?.map((subCategory, i) => (
        <Link
          to={`/danh-muc/${subCategory.slug}`}
          className='font-semibold hidden md:block hover:text-[color:--main-color]'
          key={i}
        >
          {subCategory.title}
        </Link>
      ))}
    </nav>
  );
}
