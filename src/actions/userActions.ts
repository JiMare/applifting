import { userStore } from "../store/userStore";

export const keepToken = (token: string) => {
  userStore.keepToken(token);
};

export const logIn = () => {
  userStore.logIn();
};
