import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="w-full flex gap-2">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/signup">Register</Link>
    </header>
  );
};

export default Header;
