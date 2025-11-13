import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md">
      <Navbar />
    </header>
  );
};

export default Header;
