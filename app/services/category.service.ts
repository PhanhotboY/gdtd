import { client } from '~/sanity/client';
import { ICategory, ICategoryDetail } from '~/types';

const getCategories = async () => {
  return (await client.fetch(
    `*[_type == "category" && parent == null]{
  "id": _id,
  title,
  "slug": slug.current,
  "subCategories": *[_type == "category" && references(^._id)]{
    "id": _id,
    title,
    "slug": slug.current
  }
}`
  )) as ICategoryDetail[];
};

const getCategory = async (slug: string) => {
  return (await client.fetch(
    `*[_type == "category" && slug.current == "${slug}"][0] {
  "id": _id,
  title,
  "slug": slug.current,
  "subCategories": *[_type == "category" && references(^._id)]{
    "id": _id,
    title,
    "slug": slug.current
  }
}`
  )) as ICategoryDetail;
};

export { getCategories, getCategory };
