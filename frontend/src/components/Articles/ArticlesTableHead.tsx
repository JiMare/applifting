import { ReactElement } from "react";
import { TableHead, TableRow, TableCell } from "@mui/material";

type Props = {
  columns: string[];
};

export const ArticlesTableHead = (props: Props): ReactElement => {
  return (
    <TableHead>
      <TableRow>
        {props.columns.map((column) => (
          <TableCell key={column}>{column}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
