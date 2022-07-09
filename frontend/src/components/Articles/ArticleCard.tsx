import { ReactElement, useEffect, useState } from "react";
import { Article } from "../../model/Article";
import { Box, Button, Typography, Container } from "@mui/material";
import "./Articles.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getRequestHeaders } from "../../utils/getRequestHeaders";

type Props = {
  article: Article;
};

export const ArticleCard = (props: Props): ReactElement => {
  const [loadedImageUrl, setLoadedImageUrl] = useState<string>("");
  useEffect(() => {
    const fetchImage = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://fullstack.exercise.applifting.cz/images/" +
            props.article.imageId,
          {
            method: "GET",
            headers: getRequestHeaders(),
          }
        );
        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setLoadedImageUrl(imageObjectURL);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImage();
  }, [props.article.imageId]);

  return (
    <Box className="article">
      <img src={loadedImageUrl} alt="some-cat" className="article__image" />
      <Box className="article__content">
        <Typography variant="h4" sx={{fontSize: "1.5rem"}}> {props.article.title}</Typography>
        <p className="article__grey-text">
          Jitka M - {format(new Date(props.article.createdAt), "MM/dd/yy")}
        </p>
        <p className="article__perex">{props.article.perex}</p>
        <Link
          to={`/recent-articles/${props.article.articleId}`}
          className="link"
        >
          <Button>Read whole article</Button>
        </Link>
      </Box>
    </Box>
  );
};
