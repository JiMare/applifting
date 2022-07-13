import { ArticleDetail } from "../model/ArticleDetail";
import { articleStore } from "../store/articleStore";

export const keepArticleIdToUpdate = (id: string) => {
  articleStore.keepArticleIdToUpdate(id);
};

export const clearArticleIdToUpdate = () => {
  articleStore.clearArticleIdToUpdate();
};

export const keepArticleToUpdate = (article: ArticleDetail) => {
  articleStore.keepArticleToUpdate(article);
};

export const clearArticleToUpdate = () => {
  articleStore.clearArticleToUpdate();
};
