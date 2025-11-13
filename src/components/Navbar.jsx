import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional icons (install: npm i lucide-react)
import { logoutUser } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const links = [];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <nav className="fixed w-full z-50 bg-black/40 backdrop-blur-md text-white shadow-md">
      <div className="flex justify-between items-center px-6 md:px-12 py-4">
        {/* Logo */}
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="Lush Estate Logo"
            className="w-12 h-12 md:w-14 md:h-14 object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-10 font-medium">
          {links.map((link) => (
            <li
              key={link}
              className="cursor-pointer hover:text-emerald-400 transition-colors duration-200"
            >
              {link}
            </li>
          ))}
        </ul>

        {/* CTA Button (Desktop) */}
        {isAuthenticated && (
          <button
            className="hidden md:block px-6 py-2 rounded-full font-semibold shadow-lg bg-emerald-700 text-white hover:bg-emerald-900 transition-colors"
            onClick={handleLogout}
          >
            Exit
          </button>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden fixed bg-black/90 backdrop-blur-md w-full left-0 transition-all duration-300 ease-in-out ${
          isOpen ? "top-16 opacity-100" : "-top-full opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 py-8 text-lg font-medium">
          {links.map((link) => (
            <li
              key={link}
              className="cursor-pointer hover:text-emerald-400 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </li>
          ))}

          {isAuthenticated && (
            <button
              className="bg-emerald-700 hover:bg-emerald-900 transition-all text-white px-6 py-2 rounded-full font-semibold shadow-lg"
              onClick={handleLogout}
            >
              Exit
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
