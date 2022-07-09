import { ReactElement } from "react";
import { Typography } from "@mui/material";
import "./Screen404.css"

export const Screen404 = (): ReactElement => {
  return (
    <div className="center">
      <Typography variant="h1">404 Stránka nenalezena</Typography>
    </div>
  );
};
