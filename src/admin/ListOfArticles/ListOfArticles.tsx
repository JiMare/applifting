import { ReactElement, useEffect, useState } from "react";
import { userStore } from "../../store/userStore";
import shallow from "zustand/shallow";
import { Screen404 } from "../../components/Screen404/Screen404";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import "./ListOfArticles.css";
import { getRequestHeaders } from "../../utils/getRequestHeaders";
import { Article } from "../../model/Article";
import { ArticlesTable } from "./ArticlesTable";
import { clearArticleIdToUpdate } from "../../actions/articleActions";

export const ListOfArticles = (): ReactElement => {
  const { isUser } = userStore.useStore(
    (store) => ({ isUser: store.isUser }),
    shallow
  );

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

  const onDeleteArticleFromScreen = (id: string): void => {
    setLoadedArticles((prev) =>
      prev.filter((article) => article.articleId !== id)
    );
  };

  const content = (
    <Container maxWidth="xl">
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          gap: "2rem",
          marginTop: "3rem",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "2.5rem", fontWeight: 500 }}>
          My articles
        </Typography>
        <Link to="/admin-article-form" className="link">
          <Button variant="contained" onClick={clearArticleIdToUpdate}>Create new article</Button>
        </Link>
      </Box>
      <div className="table">
        <ArticlesTable
          articles={loadedArticles}
          onDeleteArticleFromScreen={onDeleteArticleFromScreen}
        />
      </div>
    </Container>
  );

  return isUser ? content : <Screen404 />;
};
