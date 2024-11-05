export interface ICategory {
  id: string;
  title: string;
  slug: string;
}

export interface ICategoryDetail extends ICategory {
  subCategories: Array<ICategory>;
}
