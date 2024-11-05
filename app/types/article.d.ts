import { PortableTextBlock } from '@portabletext/react';
import { ICategory } from './category';
import { IHashtag } from './hashtag';
import { IAuthor } from './author';

export interface IArticle {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  thumbnailUrl: string;
  category: ICategory & {
    parent: ICategory | null;
  };
}

export interface IArticleDetail extends IArticle {
  body: Array<PortableTextBlock>;
  hashtags: Array<IHashtag>;
  author: IAuthor;
  hashtags: IHashtag[];
}
