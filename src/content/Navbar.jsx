import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/select-estate");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="Lush Estate Logo"
            className="w-12 h-12 md:w-14 md:h-14 object-contain"
          />
        </Link>

        <button
          onClick={handleClick}
          className="bg-white text-black px-5 py-2 rounded-md font-semibold hover:scale-105 transition"
        >
          Start Discovery
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
