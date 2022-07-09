import { articleStore } from "../store/articleStore";

export const keepArticleIdToUpdate = (id: string) => {
  articleStore.keepArticleIdToUpdate(id);
};

export const clearArticleIdToUpdate = () => {
  articleStore.clearArticleIdToUpdate();
};
