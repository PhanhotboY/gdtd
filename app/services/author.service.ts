import { getPageOffset } from '~/lib';
import { client } from '~/sanity/client';

const getAllAuthors = async (page = 1) => {
  return await client.fetch(
    `*[_type == "author"] | order(name asc) [$start...$end] {
  name,
  "slug": slug.current,
  "avatarUrl": avatar.asset->url
}`,
    { ...getPageOffset({ page, limit: 10 }) }
  );
};

const getAuthor = async (slug: string) => {
  return await client.fetch(
    `*[_type == "author" && slug.current == $slug][0]{
  name,
  bio,
  "avatarUrl": avatar.asset->url,
  socialMedia {
    twitter,
    linkedin,
    email
  },
  "articleCount": count(*[_type == "article" && references(^._id)])
}`,
    { slug }
  );
};

const getAuthorAricles = async (slug: string) => {
  return await client.fetch(
    `*[_type == "author" && slug.current == $slug][0]{
  name,
  bio,
  "avatarUrl": avatar.asset->url,
  socialMedia {
    email,
    twitter,
    linkedin
  },
  "articles": *[_type == "article" && references(^._id)]{
    title,
    "slug": slug.current,
    publishedAt
  }
}`,
    { slug }
  );
};

export { getAllAuthors, getAuthor, getAuthorAricles };
