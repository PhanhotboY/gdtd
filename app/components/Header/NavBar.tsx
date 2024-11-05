import { useState } from 'react';
import { List } from '@mui/joy';
import { Link, useLoaderData } from '@remix-run/react';
import { ListItem } from '@mui/material';
import { loader } from '~/root';
import { RiHome4Line } from '@remixicon/react';

export default function NavBar({ className }: { className?: string }) {
  const [menuIndex, setMenuIndex] = useState<null | number>(null);
  const { categories } = useLoaderData<typeof loader>();

  return (
    <nav
      className={`${className} md:sticky top-0 z-40 md:bg-[--main-color] md:text-[--main-text-color]`}
    >
      <div className='hidden md:flex container'>
        <Link
          to={`/`}
          className='py-2 md:text-[--main-text-color] hover:bg-transparent hover:text-[--sub1-text-color]'
          title='Trang chủ'
        >
          <RiHome4Line />
        </Link>

        <List className='w-full font-bold text-sm p-0 flex flex-col md:flex-row justify-start'>
          {categories.map((item, i) => (
            <ListItem className={`p-0 w-fit ml-6`} key={i}>
              <Link
                to={`/danh-muc/${item.slug}`}
                className='relative border-none h-full py-2 md:text-[--main-text-color] hover:bg-transparent hover:text-[--sub1-text-color]'
                onMouseEnter={() => setMenuIndex(i)}
                onMouseLeave={() => setMenuIndex(null)}
                title={item.title}
              >
                {item.title}
              </Link>

              <List
                className={`absolute bg-[--main-bg-color] shadow-lg rounded top-full left-0 p-2 ${
                  menuIndex !== i ? 'hidden' : ''
                }`}
                onMouseEnter={() => setMenuIndex(i)}
                onMouseLeave={() => setMenuIndex(null)}
              >
                {item.subCategories.map((subItem, i) => (
                  <ListItem className={`p-0 text-[--sub2-text-color]`} key={i}>
                    <Link
                      className={`font-bold block w-max px-4 py-2 flex-grow hover:text-[--main-color]`}
                      to={`/danh-muc/${subItem.slug}`}
                      title={subItem.title}
                    >
                      {subItem.title}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </ListItem>
          ))}
        </List>
      </div>

      <div className='overflow-auto scroll md:hidden'>
        <ul>
          {categories.map((item, i) => (
            <li key={i}>
              <Link
                to={`/danh-muc/${item.slug}`}
                className='block font-bold text-lg px-4 py-2 bg-zinc-100'
                title={item.title}
              >
                {item.title}
              </Link>

              <ul className=''>
                {item.subCategories.map((subItem, i) => (
                  <li key={i} className=''>
                    <Link
                      to={`/danh-muc/${subItem.slug}`}
                      className='block px-8 py-2'
                      title={subItem.title}
                    >
                      {subItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
