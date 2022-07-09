import { ReactElement } from "react";
import "./ErrorMessage.css";

type Props = {
  message: string;
};

export const ErrorMessage = (props: Props): ReactElement => {
  return <p className="error">{props.message}</p>;
};
