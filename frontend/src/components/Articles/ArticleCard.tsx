import {ReactElement} from 'react'
import { Article } from '../../model/Article';
import { Box, Button, Typography, Container } from "@mui/material";
import "./Articles.css";
import { format } from "date-fns";

type Props = {
    article: Article;
}

export const ArticleCard = (props: Props): ReactElement => {
  return (
    <Box sx={{ display: "flex", marginBottom: "2rem" }}>
      image
      <Container maxWidth="sm">
        <Typography variant="h4"> {props.article.title}</Typography>
        <p className="greyText">Jitka M - {format(new Date(props.article.createdAt), "MM/dd/yy")}</p>
        <p>{props.article.perex}</p>
        <Button>Read whole article</Button>
      </Container>
    </Box>
  );
};

