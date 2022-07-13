import create from "zustand";
import { ArticleDetail } from "../model/ArticleDetail";

type ArticleStoreType = {
  articleIdToUpdate: string;
  articleToUpdate: ArticleDetail | null;
};

const useStore = create<ArticleStoreType>(() => ({
  articleIdToUpdate: "",
  articleToUpdate: null,
}));

export const articleStore = {
  keepArticleIdToUpdate: (articleIdToUpdate: string): void => {
    useStore.setState({ articleIdToUpdate });
  },
  clearArticleIdToUpdate: (): void => {
    useStore.setState({ articleIdToUpdate: "" });
  },
  keepArticleToUpdate: (articleToUpdate: ArticleDetail): void => {
    useStore.setState({ articleToUpdate });
  },
  clearArticleToUpdate: (): void => {
    useStore.setState({ articleToUpdate: null });
  },
  useStore,
};
