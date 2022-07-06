import { ReactElement } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./Navbar.css";
import { userStore } from "../../store/userStore";
import shallow from "zustand/shallow";

export const Navbar = (): ReactElement => {
  const { isUser } = userStore.useStore(
    (store) => ({ isUser: store.isUser }),
    shallow
  );

  const rightSide = isUser ? (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        gap: "2.5rem",
        justifyContent: "flex-end",
      }}
    >
      <Link to="/admin-my-articles" className="link">
        <Button sx={{ my: 2, color: "inherit", display: "block" }}>
          My Articles
        </Button>
      </Link>
      <Link to="/admin-article-form" className="link link--blue">
        <Button sx={{ my: 2, color: "inherit", display: "block" }}>
          Create Article
        </Button>
      </Link>
    </Box>
  ) : (
    <Link to="/login" className="link link--blue">
      <Button>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          Log in <ArrowForwardIcon fontSize="small" />
        </Box>
      </Button>
    </Link>
  );
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#F8F9FA", color: "#212529" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src="logo.svg" alt="cat-logo" />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: "flex", gap: "2.5rem" }}>
            <Link to="/recent-articles" className="link">
              <Button sx={{ my: 2, color: "inherit", display: "block" }}>
                Recent Articles
              </Button>
            </Link>
            <Button sx={{ my: 2, color: "inherit", display: "block" }}>
              About
            </Button>
          </Box>
          {rightSide}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
