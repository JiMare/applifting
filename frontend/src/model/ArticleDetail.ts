import { Comment } from "./Comment";

export type ArticleDetail = {
  articleId: string;
  title: string;
  perex: string;
  content: string;
  imageId: string;
  createdAt: string;
  lastUpdatedAt: string;
  comments: Comment[];
};
