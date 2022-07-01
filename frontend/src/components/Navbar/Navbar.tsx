import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

export const Navbar = (): ReactElement => {
  return (
    <div>
      <Link to="/recent-articles">Recent Articles</Link>
      <Link to="/login">Log in</Link>
    </div>
  );
};
