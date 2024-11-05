import { client } from '~/sanity/client';
import { IAds } from '~/types';

interface Banner {
  alt: string;
  link: string;
  src: string;
}

const getAds = async () => {
  return (await client.fetch(`*[_type == "ads"][0] {
  banner1{
    alt,link,"src": asset->url
  },
  banner2{
    alt,link,"src": asset->url
  },
  banner3{
    alt,link,"src": asset->url
  },
  ads1,
  ads2
}`)) as IAds;
};

export { getAds };
