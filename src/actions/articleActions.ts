import { ArticleDetail } from "../model/ArticleDetail";
import { articleStore } from "../store/articleStore";

export const keepArticleToUpdate = (article: ArticleDetail) => {
  articleStore.keepArticleToUpdate(article);
};

export const clearArticleToUpdate = () => {
  articleStore.clearArticleToUpdate();
};
