import create from "zustand";
import { ArticleDetail } from "../model/ArticleDetail";

type ArticleStoreType = {
  articleToUpdate: ArticleDetail | null;
};

const useStore = create<ArticleStoreType>(() => ({
  articleToUpdate: null,
}));

export const articleStore = {
  keepArticleToUpdate: (articleToUpdate: ArticleDetail): void => {
    useStore.setState({ articleToUpdate });
  },
  clearArticleToUpdate: (): void => {
    useStore.setState({ articleToUpdate: null });
  },
  useStore,
};
