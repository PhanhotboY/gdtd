import { client } from '~/sanity/client';
import { IHashtag } from '~/types';

const getHashtags = async (limit = 15) => {
  return (await client.fetch(
    `*[_type == "hashtag"] [0...$limit] {
      "id": _id,
      title,
      "slug": slug.current
    }`,
    { limit }
  )) as IHashtag[];
};

const getHashtag = async (slug: string) => {
  return (await client.fetch(
    `*[_type == "hashtag" && slug.current == "${slug}"][0]{
  "id": _id,
  title,
  "slug": slug.current,
}`
  )) as IHashtag;
};

export { getHashtags, getHashtag };
