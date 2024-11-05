import { Checkbox } from '@mui/material';
import {
  RiSunFill,
  RiMoonFill,
  RiMailFill,
  RiPhoneFill,
  RiSearch2Line,
  RiListCheck,
} from '@remixicon/react';
import { ReactNode, useEffect, useState } from 'react';
import {
  Form,
  Link,
  useFetcher,
  useLoaderData,
  useLocation,
} from '@remix-run/react';

import style from './index.module.css';
import { loader } from '~/root';
import NavBar from './NavBar';

export default function Header({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: (theme: 'light' | 'dark') => void;
}) {
  const { siteSettings } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const setThemeCookie = (theme: 'light' | 'dark') => {
    setTheme(theme);
    fetcher.submit(
      { theme },
      {
        method: 'POST',
        action: '/toggle-theme',
      }
    );
  };

  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowSearch(false);
    setShowMenu(false);
  }, [location]);

  return (
    <>
      <header>
        <Contact contact={siteSettings.contact}>
          {/* <Checkbox
            className='p-1'
            icon={<RiSunFill className='fill-[--sub4-text-color]' size={20} />}
            checked={theme === 'dark'}
            checkedIcon={<RiMoonFill color='white' size={20} />}
            onClick={async () =>
              setThemeCookie(theme === 'dark' ? 'light' : 'dark')
            }
            title='Chuyển đổi chế độ sáng/tối'
          /> */}
        </Contact>

        <section className='container flex justify-between py-4 items-end relative max-md:px-3'>
          <button
            className='md:hidden'
            title='Tìm kiếm'
            onClick={() => setShowMenu(!showMenu)}
          >
            <RiListCheck className={`text-[--main-color]`} size={28} />
          </button>

          <div className='lg:mx-10'>
            <Link
              className='block w-48 md:w-40'
              to='/'
              title={siteSettings.title}
            >
              <img src={siteSettings.logoUrl} alt='Logo' />
            </Link>
          </div>

          <Form
            className='relative hidden md:block'
            method='GET'
            action='/tim-kiem'
          >
            <input
              className={`border border-[--sub7-text-color]/50 focus:outline-none focus:border-[--main-color] focus:bg-[--main-bg-color] rounded-full bg-[--sub1-bg-color] py-1 px-4`}
              disabled={false}
              name='q'
              placeholder='Tìm kiếm...'
            />

            <button
              className='absolute right-4 top-1'
              title='Tìm kiếm'
              type='submit'
            >
              <RiSearch2Line className={`text-[--main-color]`} />
            </button>
          </Form>

          <button
            className='md:hidden'
            title='Tìm kiếm'
            onClick={() => setShowSearch(!showSearch)}
          >
            <RiSearch2Line className={`text-[--main-color]`} size={28} />
          </button>
        </section>

        <section className='md:hidden px-3'>
          <Form
            className={`relative overflow-hidden transition-all duration-500`}
            style={{ height: showSearch ? 42 : 0 }}
            method='GET'
            action='/tim-kiem'
          >
            <input
              className={`w-full border border-[--sub7-text-color]/50 focus:outline-none focus:border-[--main-color] focus:bg-[--main-bg-color] rounded-full bg-[--sub1-bg-color] py-2 px-4`}
              disabled={false}
              name='q'
              placeholder='Tìm kiếm...'
              autoFocus
            />

            <button
              className='absolute right-4 top-2'
              title='Tìm kiếm'
              type='submit'
            >
              <RiSearch2Line className={`text-[--main-color]`} />
            </button>
          </Form>
        </section>
      </header>

      <NavBar
        className={`${
          showMenu ? 'max-md:h-[908px]' : 'max-md:h-0'
        } md:block transition-all duration-1000 max-md:overflow-hidden`}
      />
    </>
  );
}

const Contact = ({
  contact,
  children,
}: {
  contact: { email: string; phone: string };
  children?: ReactNode;
}) => {
  return (
    <section className='bg-[--sub1-bg-color] dark:bg-[--sub6-text-color] text-[--sub4-text-color] text-xs dark:text-white'>
      <div className='container flex justify-between items-center py-1 max-md:ml-3'>
        <div className={`${style.contact} flex`}>
          <div className='time hidden md:flex'>
            {new Date().toLocaleDateString('vi', {
              weekday: 'long',
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
          </div>

          <div className='hotline' title='Hotline'>
            <RiPhoneFill />
            <span>Đường dây nóng:</span>
            <a
              className='text-sm font-semibold text-[--main-color]'
              href={`tel:${contact.phone}`}
            >
              {contact.phone}
            </a>
          </div>

          <div className='email hidden md:flex' title='Email'>
            <RiMailFill />
            <span>Email:</span>
            <a className='text-blue-600' href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>
        </div>

        <div className='theme-toggle'>{children}</div>
      </div>
    </section>
  );
};
