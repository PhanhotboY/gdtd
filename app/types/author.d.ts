export interface IAuthor {
  name: string;
  avatarUrl: string;
}

export interface IAuthorDetail extends IAuthor {
  bio: string;
  socialMedia: {
    twitter: string;
    linkedin: string;
    email: string;
  };
  articleCount: number;
}
