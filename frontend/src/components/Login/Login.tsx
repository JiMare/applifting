import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import "./Login.css";
import { Navigate } from "react-router-dom";
import { keepToken, logIn } from "../../actions/userActions";
import { userStore } from "../../store/userStore";
import shallow from "zustand/shallow";

type FormValues = {
  username: string;
  password: string;
};

export const Login = (): ReactElement => {
  const { isUser } = userStore.useStore(
    (store) => ({ isUser: store.isUser }),
    shallow
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  requestHeaders.set("X-API-KEY", process.env.REACT_APP_API_KEY!);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues): Promise<void> => {
    setErrorMessage("");
    try {
      setProcessing(true);
      const credentials = {
        username: data.username,
        password: data.password,
      };
      const response = await fetch(
        "https://fullstack.exercise.applifting.cz/login",
        {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: requestHeaders,
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        setErrorMessage(responseData.message);
      } else {
        keepToken(responseData.access_token);
        logIn();
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong!");
    }
    setProcessing(false);
  };

  return isUser ? (
    <Navigate to="/admin-my-articles" replace />
  ) : (
    <Card
      sx={{ maxWidth: 368, boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.175)" }}
      className="card"
    >
      <CardContent sx={{ padding: "2rem" }}>
        <Typography
          variant="h3"
          sx={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}
        >
          Log In
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            sx={{ marginBottom: "1.5rem" }}
            label="Email"
            fullWidth
            {...register("username", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Not correct e-mail format!",
              },
            })}
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
          />
          <TextField
            sx={{ marginBottom: "1.5rem" }}
            label="Password"
            fullWidth
            {...register("password", {
              required: "Password is required",
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          {errorMessage && (
            <Typography variant="h6" sx={{ color: "red" }}>
              {errorMessage}
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" type="submit" disabled={processing}>
              Log In
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};
