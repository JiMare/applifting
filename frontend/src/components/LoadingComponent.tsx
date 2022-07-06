import { ReactElement, ReactNode } from "react";
import { styled } from "@mui/styles";
import { CircularProgress } from "@mui/material";

const Styled = {
  LoadingContainer: styled("div")({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  }),
  CircularProgressContainer: styled(CircularProgress)({
    position: "absolute",
    top: "50%",
    right: "50%",
    transform: "translate(50%,-50%)",
  }),
  BlurringContainer: styled("div")({
    filter: "blur(0.3rem)",
    pointerEvents: "none",
  }),
};

type Props = {
  children: ReactNode;
  loading: boolean;
};

export const LoadingComponent = (props: Props): ReactElement => {
  return (
    <Styled.LoadingContainer>
      {props.loading ? (
        <>
          <Styled.BlurringContainer>{props.children}</Styled.BlurringContainer>
          <Styled.CircularProgressContainer />
        </>
      ) : (
        <div>{props.children}</div>
      )}
    </Styled.LoadingContainer>
  );
};
