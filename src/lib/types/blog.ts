export type BlogCardPost = {
  slug: string;
  title: string;
  excerpt?: string | null;
  coverImage?: string | null;
  publishedAt?: Date | string | null;
  updatedAt?: Date | string | null;
  featured?: boolean;
};

export type BlogPost = BlogCardPost & {
  content: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  keywords: string[];
};
