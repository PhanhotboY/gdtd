import { Link } from '@remix-run/react';

export default function BannerNav({
  categories,
}: {
  categories: Array<{ title: string; slug: string }>;
}) {
  return (
    <section className='bg-[--main-color] rounded-xl col-span-12 max-md:mx-2'>
      <div className='container'>
        <div className='flex items-center text-white divide-x'>
          {categories.map((cat, i) => (
            <div className='grow' key={i}>
              <Link
                to={`/doc/${cat.slug}`}
                className={`block text-center px-2 py-4 font-semibold md:text-xl hover:text-[--sub1-text-color]`}
              >
                {cat.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
