import { Link, useLoaderData } from '@remix-run/react';
import { PortableText } from '@portabletext/react';

import { loader } from '~/root';
import style from './index.module.css';
import { useEffect } from 'react';

export default function Footer() {
  const { siteSettings } = useLoaderData<typeof loader>();
  const { footerSettings: fs } = siteSettings;

  useEffect(() => {
    const anchors = document.querySelectorAll(`footer.${style.footer} a`);

    if (anchors) {
      anchors.forEach((anchor) => {
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute('rel', 'noopener noreferrer');
      });
    }
  }, []);

  return (
    <footer
      className={`${style.footer} bg-[--main-color] pb-12 text-white/90 `}
    >
      <div className='container flex flex-col md:grid grid-cols-12 gap-x-8 text-sm divide-y'>
        <div className='col-span-8 max-md:px-2 py-6 md:pt-12 flex flex-col md:grid grid-cols-8 gap-x-8'>
          <div className='col-span-3 flex flex-col items-center mb-4'>
            <Link to='/'>
              <img src={fs.logoUrl} alt={fs.title} />
            </Link>

            <h3 className='mt-4 font-semibold hidden md:block'>{fs.title}</h3>
          </div>

          <div className='col-span-5'>
            <PortableText value={fs.footer1} />
          </div>
        </div>

        <div className='col-span-4 pt-12 h-full max-sm:text-center'>
          <PortableText value={fs.footer2} />
        </div>
      </div>
    </footer>
  );
}
