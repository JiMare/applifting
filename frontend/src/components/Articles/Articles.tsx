import { ReactElement, useState, useEffect } from "react";
import { Typography, Container, Box } from "@mui/material";
import { Article } from "../../model/Article";
import { getRequestHeaders } from "../../utils/getRequestHeaders";
import "./Articles.css";
import { ArticleCard } from "./ArticleCard";
import { LoadingComponent } from "../Loading/LoadingComponent";

export const Articles = (): ReactElement => {
  const [loadedArticles, setLoadedArticles] = useState<Article[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setProcessing(true);
        const response = await fetch(
          "https://fullstack.exercise.applifting.cz/articles",
          {
            method: "GET",
            headers: getRequestHeaders(),
          }
        );
        const responseData = await response.json();
        setLoadedArticles(responseData.items);
        setProcessing(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticles();
  }, []);

  let articlesContent = (
    <Typography variant="h1" className="center">
      No articles available.
    </Typography>
  );

  if (loadedArticles.length > 0) {
    articlesContent = (
      <Container maxWidth="xl">
        <Typography
          variant="h1"
          sx={{ fontSize: "2.5rem", fontWeight: 500, marginTop: "3rem" }}
        >
          Recent articles
        </Typography>
        <Box sx={{ marginTop: "3rem" }}>
          {loadedArticles.map((article) => (
            <ArticleCard key={article.articleId} article={article} />
          ))}
        </Box>
      </Container>
    );
  }
  return (
    <LoadingComponent loading={processing}>{articlesContent}</LoadingComponent>
  );
};
