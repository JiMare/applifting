import create from "zustand";

type TokenStoreType = {
  token: string;
  isUser: boolean;
};

const useStore = create<TokenStoreType>(() => ({
  token: "",
  isUser: false,
}));

export const userStore = {
  keepToken: (token: string): void => {
    useStore.setState({ token });
  },
  logIn: (): void => {
    useStore.setState({ isUser: true });
  },
  useStore,
};
