import { ReactElement } from "react";
import { Article } from "../../model/Article";
import { ArticleRow } from "./ArticleRow";
import { Table, TableBody } from "@mui/material";
import { ArticlesTableHead } from "./ArticlesTableHead";

type Props = {
  articles: Article[];
  onDeleteArticleFromScreen: (id: string) => void;
};

const columns = [
  "Article title",
  "Perex",
  "Author",
  "# of comments",
  "Actions",
];

export const ArticlesTable = (props: Props): ReactElement => {
  return (
    <Table>
      <ArticlesTableHead columns={columns} />
      <TableBody>
        {props.articles.map((article) => (
          <ArticleRow
            key={article.articleId}
            article={article}
            onDeleteArticleFromScreen={props.onDeleteArticleFromScreen}
          />
        ))}
      </TableBody>
    </Table>
  );
};
