import { client } from '~/sanity/client';
import { ISiteSetting } from '~/types';

const getSiteSetting = async () => {
  return (await client.fetch(`*[_type == "siteSettings"][0]{
  title,
  description,
  "logoUrl": logo.asset->url,
  "faviconUrl": favicon.asset->url,
  "contact": contact{
    email,
    phone
  },
  "footerSettings": *[_type == "footerSettings"][0] {
    title,
    "logoUrl": logo.asset->url,
    footer1,
    footer2
  },
  "hasMap": defined(map),
  "mapUrl": map.asset->url,
}`)) as ISiteSetting;
};

export { getSiteSetting };
