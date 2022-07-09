import { ReactElement } from "react";
import { userStore } from "../../store/userStore";
import shallow from "zustand/shallow";
import { Screen404 } from "../../components/Screen404/Screen404";
import {
  Box,
  Button,
  Typography,
  Container,
  TextField,
  Fab,
  FormLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import "./ArticleForm.css";
import MDEditor from "@uiw/react-md-editor";
import { getRequestHeaders } from "../../utils/getRequestHeaders";
import { v4 as uuidv4 } from "uuid";

type FormValues = {
  title: string;
  image: any;
  content: string;
};

export const ArticleForm = (): ReactElement => {
  const { token, isUser } = userStore.useStore(
    (store) => ({ token: store.token, isUser: store.isUser }),
    shallow
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues): Promise<void> => {
    const requestHeaders = getRequestHeaders();
    requestHeaders.set("Authorization", token);

    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      const response = await fetch(
        "https://fullstack.exercise.applifting.cz/images",
        {
          method: "POST",
          mode: "cors",
          body: formData,
          headers: {
            Authorization: token,
            "X-API-KEY": process.env.REACT_APP_API_KEY!,
          },
        }
      );
      const responseData = await response.json();
      const newArticle = {
        articleId: uuidv4(),
        title: data.title,
        perex: data.content.slice(0, 500) + "...",
        imageId: responseData[0].imageId,
        content: data.content,
      };
      try {
        await fetch("https://fullstack.exercise.applifting.cz/articles", {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(newArticle),
          headers: requestHeaders,
        });
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const content = (
    <Container maxWidth="xl">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <Typography variant="h1" sx={{ fontSize: "2.5rem", fontWeight: 500 }}>
            Create new article
          </Typography>
          <Button variant="contained" type="submit">
            Publish Article
          </Button>
        </Box>

        <TextField
          sx={{ marginBottom: "1.5rem" }}
          label="Article Title"
          fullWidth
          {...register("title", {
            required: "Title is required",
          })}
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
        />

        <input
          {...register("image")}
          accept="*.jpeg, *.png, *.jpg"
          id="contained-button-file"
          type="file"
          className="input"
        />
        <FormLabel htmlFor="contained-button-file" className="label">
          Featured Image
          <Fab
            component="span"
            variant="extended"
            sx={{
              backgroundColor: "#6C757D",
              color: "#ffff",
              borderRadius: "0.2rem",
              height: "2.3rem",
            }}
          >
            Upload an Image
          </Fab>
        </FormLabel>

        <Controller
          render={({ field }) => (
            <div className="editor">
              <FormLabel htmlFor="editor">Content</FormLabel>
              <MDEditor {...field} id="editor" />
            </div>
          )}
          name="content"
          control={control}
        />
      </form>
    </Container>
  );
  return isUser ? content : <Screen404 />;
};