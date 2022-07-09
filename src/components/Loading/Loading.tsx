import { ReactElement, ReactNode } from "react";
import { CircularProgress } from "@mui/material";
import "./Loading.css";

type Props = {
  children: ReactNode;
  loading: boolean;
};

export const Loading = (props: Props): ReactElement => {
  return props.loading ? (
    <>
      <div className="blurring">{props.children}</div>
      <CircularProgress className="progress" />
    </>
  ) : (
    <div>{props.children}</div>
  );
};
