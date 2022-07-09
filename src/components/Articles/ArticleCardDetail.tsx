import { ReactElement, useEffect, useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { getRequestHeaders } from "../../utils/getRequestHeaders";
import { ArticleDetail } from "../../model/ArticleDetail";
import { format } from "date-fns";
import "./Articles.css";
import { Loading } from "../Loading/Loading";

export const ArticleCardDetail = (): ReactElement => {
  const [articleData, setArticleData] = useState<ArticleDetail | null>(null);
  const [loadedImageUrl, setLoadedImageUrl] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  let { articleId } = useParams();
  useEffect(() => {
    const fetchArticle = async (id?: string): Promise<void> => {
      try {
        if (id) {
          const response = await fetch(
            "https://fullstack.exercise.applifting.cz/articles/" + id,
            {
              method: "GET",
              headers: getRequestHeaders(),
            }
          );
          const responseData = await response.json();
          setArticleData(responseData);
          try {
            setProcessing(true);
            const responseImage = await fetch(
              "https://fullstack.exercise.applifting.cz/images/" +
                responseData.imageId,
              {
                method: "GET",
                headers: getRequestHeaders(),
              }
            );
            const imageBlob = await responseImage.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setLoadedImageUrl(imageObjectURL);
            setProcessing(false);
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticle(articleId);
  }, [articleId]);

  return (
    <Container maxWidth="xl">
      {articleData && (
        <Box sx={{ width: "47.5rem" }}>
          <Typography
            variant="h4"
            sx={{ fontSize: "2.5rem", fontWeight: 500, marginTop: "3rem" }}
          >
            {articleData.title}
          </Typography>
          <p className="article__grey-text">
            Jitka M - {format(new Date(articleData.createdAt), "d.M.yyyy")}
          </p>
          {loadedImageUrl && (
            <Box className="article-detail__image-box">
              <Loading loading={processing}>
                <img
                  src={loadedImageUrl}
                  alt="article"
                  className="article-detail__image"
                />
              </Loading>
            </Box>
          )}
          {articleData.content.split("\n").map((text, index) => (
            <p key={index} className="article-detail__content">
              {text}
            </p>
          ))}
        </Box>
      )}
    </Container>
  );
};
