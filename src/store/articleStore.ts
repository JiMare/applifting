import create from "zustand";

type ArticleStoreType = {
  articleIdToUpdate: string;
};

const useStore = create<ArticleStoreType>(() => ({
  articleIdToUpdate: "",
}));

export const articleStore = {
  keepArticleIdToUpdate: (articleIdToUpdate: string): void => {
    useStore.setState({ articleIdToUpdate });
  },
  clearArticleIdToUpdate: (): void => {
    useStore.setState({ articleIdToUpdate: "" });
  },
  useStore,
};
