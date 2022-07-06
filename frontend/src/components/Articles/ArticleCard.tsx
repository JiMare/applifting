import { ReactElement } from "react";
import { Article } from "../../model/Article";
import { Box, Button, Typography, Container } from "@mui/material";
import "./Articles.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";

type Props = {
  article: Article;
};

export const ArticleCard = (props: Props): ReactElement => {
  return (
    <Box sx={{ display: "flex", marginBottom: "2rem" }}>
      image
      <Container maxWidth="sm">
        <Typography variant="h4"> {props.article.title}</Typography>
        <p className="greyText">
          Jitka M - {format(new Date(props.article.createdAt), "MM/dd/yy")}
        </p>
        <p>{props.article.perex}</p>
        <Link to={`/recent-articles/${props.article.articleId}`} className="link">
          <Button>Read whole article</Button>
        </Link>
      </Container>
    </Box>
  );
};
