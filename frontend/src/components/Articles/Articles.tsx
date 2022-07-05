import { ReactElement, useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Article } from "../../model/Article";
import { getRequestHeaders } from "../../utils/getRequestHeaders";
import "./Articles.css";
import { ArticleCard } from "./ArticleCard";

export const Articles = (): ReactElement => {
  const [loadedArticles, setLoadedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://fullstack.exercise.applifting.cz/articles",
          {
            method: "GET",
            headers: getRequestHeaders(),
          }
        );
        const responseData = await response.json();
        setLoadedArticles(responseData.items);
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
      <>
        {loadedArticles.map((article) => (
          <ArticleCard article={article} />
        ))}
      </>
    );
  }
  return articlesContent;
};
