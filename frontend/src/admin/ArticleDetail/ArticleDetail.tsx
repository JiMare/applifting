import { ReactElement } from "react";
import { userStore } from "../../store/userStore";
import shallow from "zustand/shallow";
import { Screen404 } from "../../components/Screen404/Screen404";
import { Box, Button, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

export const ArticleDetail = (): ReactElement => {
  const { token } = userStore.useStore(
    (store) => ({ token: store.token }),
    shallow
  );
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
          Create new article
        </Typography>
        <Link to="/recent-articles" className="link">
          <Button variant="contained">Publish Article</Button>
        </Link>
      </Box>
    </Container>
  );
  return token ? content : <Screen404 />;
};
