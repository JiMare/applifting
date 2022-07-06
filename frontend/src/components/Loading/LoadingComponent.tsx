import { ReactElement, ReactNode } from "react";
import { CircularProgress } from "@mui/material";
import "./Loading.css";

type Props = {
  children: ReactNode;
  loading: boolean;
};

export const LoadingComponent = (props: Props): ReactElement => {
  return (
    <div className="loading">
      {props.loading ? (
        <>
          <div className="blurring">{props.children}</div>
          <CircularProgress className="progress" />
        </>
      ) : (
        <div>{props.children}</div>
      )}
    </div>
  );
};
