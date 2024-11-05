import { Link } from '@remix-run/react';

export default function Banner({
  className,
  bannerData: { link, src, alt },
}: {
  className?: string;
  bannerData: { link: string; src: string; alt: string };
}) {
  return (
    <section className={`${className} container `}>
      <Link to={link}>
        <img className='w-full' src={src} alt={alt} />
      </Link>
    </section>
  );
}
