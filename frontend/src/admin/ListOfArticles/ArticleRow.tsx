import { ReactElement } from "react";
import { Article } from "../../model/Article";
import { TableRow, TableCell, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getRequestHeaders } from "../../utils/getRequestHeaders";
import { userStore } from "../../store/userStore";
import shallow from "zustand/shallow";

type Props = {
  article: Article;
  onDeleteArticleFromScreen: (id: string) => void;
};

export const ArticleRow = (props: Props): ReactElement => {
  const { token } = userStore.useStore(
    (store) => ({ token: store.token }),
    shallow
  );
  const onDeleteArticle = async (): Promise<void> => {
    const requestHeaders = getRequestHeaders();
    requestHeaders.set("Authorization", token);
    try {
      await fetch(
        "https://fullstack.exercise.applifting.cz/articles/" +
          props.article.articleId,
        {
          method: "DELETE",
          headers: requestHeaders,
        }
      );
      props.onDeleteArticleFromScreen(props.article.articleId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TableRow>
      <TableCell>{props.article.title.slice(0, 20) + "..."}</TableCell>
      <TableCell>{props.article.perex.slice(0, 100) + "..."}</TableCell>
      <TableCell>Jitka M</TableCell>
      <TableCell>5</TableCell>
      <TableCell>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDeleteArticle}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
