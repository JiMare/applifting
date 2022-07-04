import { ReactElement } from "react";
import { userStore } from "../../store/userStore";
import shallow from "zustand/shallow";
import { Screen404 } from "../../components/Screen404/Screen404";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import "./ListOfArticles.css"

export const ListOfArticles = (): ReactElement => {
  const { token } = userStore.useStore(
    (store) => ({ token: store.token }),
    shallow
  );

  const content = (
    <Container maxWidth="xl">
      <Box
        sx={{ flexGrow: 1, display: "flex", gap: "2rem", marginTop: "3rem", alignItems: "center" }}
      >
        <Typography variant="h1" sx={{ fontSize: "2.5rem", fontWeight: 500 }}>
          My articles
        </Typography>
        <Link to="/admin-article-detail" className="link">
          <Button variant="contained">Create new article</Button>
        </Link>
      </Box>
    </Container>
  );

  return token ? content : <Screen404 />;
};
