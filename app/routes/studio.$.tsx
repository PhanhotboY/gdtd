import { Studio } from 'sanity';
import { MetaFunction } from '@remix-run/react';
import { ClientOnly } from 'remix-utils/client-only';

import config from '~/sanity/sanity.config';
import { Skeleton } from '@mui/material';

export const meta: MetaFunction = () => [
  { title: 'Sanity Studio' },
  { name: 'robots', content: 'noindex' },
];

export default function StudioRoute() {
  return (
    <ClientOnly
      fallback={
        <Skeleton variant='rectangular' className='w-screen h-screen' />
      }
    >
      {() => (
        <div className='h-screen'>
          <Studio config={config} />
        </div>
      )}
    </ClientOnly>
  );
}
