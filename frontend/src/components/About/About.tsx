import { ReactElement } from "react";
import { Typography, Container, Box } from "@mui/material";

export const About = (): ReactElement => {
  return (
    <Container maxWidth="xl">
      <Typography
        variant="h1"
        sx={{ fontSize: "2.5rem", fontWeight: 500, marginTop: "3rem" }}
      >
        About blog app
      </Typography>
      <Box
        sx={{
          marginTop: "3rem",
        }}
      >
        <Typography variant="h4" sx={{ color: "#6C757D" }}>
          Created by:
        </Typography>
        <Typography variant="h5" sx={{ color: "#6C757D", marginTop: "1rem" }}>
          junior React developer Jitka Marešová
        </Typography>
        <Typography variant="h4" sx={{ color: "#6C757D", marginTop: "1rem" }}>
          Used technologies:
        </Typography>
        <Typography variant="h5" sx={{ color: "#6C757D", marginTop: "1rem" }}>
          React, typescript, REST API, Material UI, zustand, useForm, react router dom, date fns, uuid library
        </Typography>
      </Box>
    </Container>
  );
};
