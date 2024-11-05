import { getPageOffset } from '~/lib';
import { client } from '~/sanity/client';
import { IArticle, IArticleDetail } from '~/types';

const ONE_WEEK = 7 * 24 * 60 * 60;
const PAGE_LIMIT = 10;

const articlesProjection = `
  "id": _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  "thumbnailUrl": thumbnail.asset->url,
  category->{
    "id": _id,
    title,
    "slug": slug.current,
    parent->{
      "id": _id,
      title,
      "slug": slug.current
    }
  }`;

const getArticleDetail = async (slug: string) => {
  return client.fetch(
    `*[_type == "article" && slug.current == "${slug}"][0]{
  "id": _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  body,
  "thumbnailUrl": thumbnail.asset->url,
  author->{
    name,
    slug,
    "avatarUrl": avatar.asset->url
  },
  category->{
    "id": _id,
    title,
    "slug": slug.current,
    parent->{
      "id": _id,
      title,
      "slug": slug.current
    }
  },
  hashtags[]->{
    "id": _id,
    title,
    "slug": slug.current
  }
}`
  ) as Promise<IArticleDetail>;
};

const searchArticles = async ({
  query,
  page = 1,
  limit = PAGE_LIMIT,
}: {
  query: string;
  page: number;
  limit?: number;
}) => {
  return client.fetch(
    `{
      "articles": *[_type == "article" && title match "*${query}*"] 
      | order(publishedAt desc, views desc) [$start...$end] {
        ${articlesProjection}
        },
      "count": count(*[_type == "article" && title match "*${query}*"])
  }`,
    { q: query, ...getPageOffset({ page, limit }) }
  ) as Promise<{ articles: Array<IArticle>; count: number }>;
};

const getArticlesByCategory = async ({
  categoryId,
  page = 1,
  limit = PAGE_LIMIT,
  period = ONE_WEEK,
  sort = 'views desc, publishedDate desc',
}: {
  categoryId: string;
  page: number;
  limit?: number;
  period?: number;
  sort?: string;
}) => {
  return client.fetch(
    `*[_type == "article" && category._ref == "${categoryId}" && dateTime(publishedAt) >= dateTime(now()) - ${period}] 
    | order(${sort}) [$start...$end] {${articlesProjection}}`,
    { ...getPageOffset({ page, limit }) }
  ) as Promise<IArticle[]>;
};

const getArticlesByHashtag = async ({
  hashtagId,
  period = ONE_WEEK,
  page = 1,
  limit = PAGE_LIMIT,
  sort = 'views desc, publishedDate desc',
}: {
  hashtagId: string;
  page: number;
  limit?: number;
  period?: number;
  sort?: string;
}) => {
  return client.fetch(
    `*[_type == "article" && "${hashtagId}" in hashtags[]._ref && dateTime(publishedAt) >= dateTime(now()) - ${period}] 
    | order(${sort}) [$start...$end] {${articlesProjection}}`,
    { hashtagId, ...getPageOffset({ page, limit }) }
  ) as Promise<IArticle[]>;
};

const getArticles = async ({
  page = 1,
  limit = PAGE_LIMIT,
  period = ONE_WEEK,
  sort = 'views desc, publishedDate desc',
}: {
  page: number;
  limit?: number;
  period?: number;
  sort?: string;
}) => {
  return client.fetch(
    `*[_type == "article" && dateTime(publishedAt) >= dateTime(now()) - ${period}] 
    | order(${sort}) [$start...$end] {${articlesProjection}}`,
    { ...getPageOffset({ page, limit }) }
  ) as Promise<IArticle[]>;
};

const incViewCount = async (articleId: string) => {
  return client
    .withConfig({ token: process.env.SANITY_WRITE_TOKEN })
    .patch(articleId)
    .setIfMissing({ views: 0 })
    .inc({ views: 1 })
    .commit();
};

export {
  getArticles,
  getArticleDetail,
  getArticlesByCategory,
  getArticlesByHashtag,
  searchArticles,
  incViewCount,
};
