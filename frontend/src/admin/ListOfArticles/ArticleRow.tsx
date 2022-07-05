import { ReactElement } from "react";
import { Article } from "../../model/Article";
import { TableRow, TableCell, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  article: Article;
};

export const ArticleRow = (props: Props): ReactElement => {
  return (
    <TableRow>
      <TableCell>{props.article.title}</TableCell>
      <TableCell>{props.article.perex}</TableCell>
      <TableCell>Jitka M</TableCell>
      <TableCell>5</TableCell>
      <TableCell>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
