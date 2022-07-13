import { ReactElement, useState, useEffect } from "react";
import { userStore } from "../../store/userStore";
import shallow from "zustand/shallow";
import { Screen404 } from "../../components/Screen404/Screen404";
import {
  Box,
  Button,
  Typography,
  Container,
  TextField,
  FormLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import "./ArticleForm.css";
import MDEditor from "@uiw/react-md-editor";
import { getRequestHeaders } from "../../utils/getRequestHeaders";
import { v4 as uuidv4 } from "uuid";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Navigate } from "react-router-dom";
import { articleStore } from "../../store/articleStore";

type FormValues = {
  title: string;
  image: any;
  content: string;
};

export const ArticleForm = (): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null | Blob>(null);
  const [preview, setPreview] = useState<string>("");

  const { token, isUser } = userStore.useStore(
    (store) => ({ token: store.token, isUser: store.isUser }),
    shallow
  );

  const { articleToUpdate } = articleStore.useStore(
    (store) => ({ articleToUpdate: store.articleToUpdate }),
    shallow
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const getEditableImage = async (id: string): Promise<void> => {
    try {
      const imageResponse = await fetch(
        "https://fullstack.exercise.applifting.cz/images/" + id,
        {
          method: "GET",
          headers: getRequestHeaders(),
        }
      );
      const imageBlob = await imageResponse.blob();
      setSelectedFile(imageBlob);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (articleToUpdate) {
      getEditableImage(articleToUpdate.imageId);
      setValue("title", articleToUpdate.title);
      setValue("content", articleToUpdate.content);
      return;
    }
    setValue("title", "");
    setValue("content", "");
    setSelectedFile(null);
  }, [articleToUpdate, setValue]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
    } else {
      setSelectedFile(e.target.files[0]);
    }
  };

  const createNewArticle = async (data: FormValues): Promise<void> => {
    setErrorMessage("");
    const requestHeaders = getRequestHeaders();
    requestHeaders.set("Authorization", token);

    const formData = new FormData();
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

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
      try {
        const newArticle = {
          articleId: uuidv4(),
          title: data.title,
          perex: data.content.slice(0, 500) + "...",
          imageId: responseData[0].imageId,
          content: data.content,
        };
        const articleResponse = await fetch(
          "https://fullstack.exercise.applifting.cz/articles",
          {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(newArticle),
            headers: requestHeaders,
          }
        );
        if (articleResponse.ok) {
          setIsPublished(true);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("Something went wrong, your article wasn't created!");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong, your image wasn't uploaded!");
    }
  };

  const updateArticle = async (data: FormValues): Promise<void> => {
    setErrorMessage("");
    const requestHeaders = getRequestHeaders();
    requestHeaders.set("Authorization", token);

    const formData = new FormData();
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
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
      try {
        const updatedArticle = {
          articleId: articleToUpdate?.articleId,
          title: data.title,
          perex: data.content.slice(0, 500) + "...",
          imageId: responseData[0].imageId,
          content: data.content,
        };
        const articleResponse = await fetch(
          "https://fullstack.exercise.applifting.cz/articles/" +
            articleToUpdate?.articleId,
          {
            method: "PATCH",
            mode: "cors",
            body: JSON.stringify(updatedArticle),
            headers: requestHeaders,
          }
        );
        if (articleResponse.ok) {
          setIsPublished(true);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("Something went wrong, your article wasn't updated!");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong, your image wasn't uploaded!");
    }
  };

  const onSubmit = async (data: FormValues): Promise<void> => {
    if (articleToUpdate) {
      await updateArticle(data);
    } else {
      await createNewArticle(data);
    }
  };

  if (isPublished) {
    return <Navigate to="/admin-my-articles" replace />;
  }

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
            {articleToUpdate ? "Edit article" : "Create new article"}
          </Typography>
          <Button variant="contained" type="submit">
            Publish Article
          </Button>
        </Box>

        <TextField
          sx={{ marginBottom: "1.5rem" }}
          label="Article Title"
          fullWidth
          autoFocus
          {...register("title", {
            required: "Title is required",
          })}
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
        />

        <input
          {...register("image", {
            required: "Image is required",
          })}
          accept="*.jpeg, *.png, *.jpg"
          id="contained-button-file"
          type="file"
          className="input"
          onChange={onSelectFile}
        />
        <FormLabel htmlFor="contained-button-file" className="label">
          Featured Image
          {preview && <img src={preview} alt="uploaded" />}
          <Button
            component="span"
            sx={{
              backgroundColor: "#6C757D",
              color: "#ffff",
              borderRadius: "0.2rem",
              height: "2.3rem",
            }}
          >
            Upload an Image
          </Button>
        </FormLabel>
        {errors.image?.message && (
          <ErrorMessage message={String(errors.image.message)} />
        )}

        <Controller
          render={({ field }) => (
            <div className="editor">
              <FormLabel htmlFor="editor">Content</FormLabel>
              <MDEditor {...field} id="editor" />
              {errors.content?.message && (
                <ErrorMessage message={errors.content.message} />
              )}
            </div>
          )}
          name="content"
          control={control}
          rules={{ required: "Content is required" }}
        />
      </form>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </Container>
  );
  return isUser ? content : <Screen404 />;
};
