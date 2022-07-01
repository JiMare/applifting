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

export const Navbar = (): ReactElement => {
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
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Button sx={{ my: 2, color: "inherit", display: "block" }}>
              <Link to="/recent-articles" className="link">
                Recent Articles
              </Link>
            </Button>
            <Button sx={{ my: 2, color: "inherit", display: "block" }}>
              About
            </Button>
          </Box>
          <Button>
            <Link to="/login" className="link link--login">
              <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center"}}>
                Login <ArrowForwardIcon fontSize="small" />
              </Box>
            </Link>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
