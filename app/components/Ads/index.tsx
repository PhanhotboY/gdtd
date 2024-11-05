import { PortableText } from '@portabletext/react';

import style from './index.module.css';

export default function Ads({ ads, col }: { ads: any; col?: number }) {
  return (
    <aside
      className={`${style.ads} scroll border flex flex-wrap w-full overflow-auto p-4 col-span-${col} shadow-inner md:max-h-28`}
    >
      <PortableText value={ads} />
    </aside>
  );
}
