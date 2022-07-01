import { ReactElement } from "react";
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

type FormValues = {
  username: string;
  password: string;
};

export const Login = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <Card sx={{ maxWidth: 368, boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.175)" }} className="card">
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
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" type="submit">
              Log In
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};
