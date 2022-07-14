import { ReactElement, useState, useEffect } from "react";
import { Typography, Container, Box } from "@mui/material";
import { Article } from "../../model/Article";
import { getRequestHeaders } from "../../utils/getRequestHeaders";
import "./Articles.css";
import { ArticleCard } from "./ArticleCard";
import { Loading } from "../Loading/Loading";

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

  let articlesTitle = "Recent articles";
  if(loadedArticles.length === 0 && !processing){
    articlesTitle = "No articles available";
  }

  return (
    <Loading loading={processing}>
      <Container maxWidth="xl">
        <Typography
          variant="h1"
          sx={{ fontSize: "2.5rem", fontWeight: 500, marginTop: "3rem" }}
        >
          {articlesTitle}
        </Typography>
        <Box sx={{ marginTop: "3rem" }}>
          {loadedArticles.map((article) => (
            <ArticleCard key={article.articleId} article={article} />
          ))}
        </Box>
      </Container>
    </Loading>
  );
};
