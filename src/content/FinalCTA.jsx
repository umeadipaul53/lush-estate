import { useNavigate } from "react-router-dom";

const FinalCTA = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/select-estate");
  };

  return (
    <section className="relative py-36 bg-gradient-to-tr from-gray-50 via-white to-gray-100 overflow-hidden text-center">
      {/* Subtle floating abstract shapes */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>

      <div className="relative max-w-3xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gray-900">
          If You Missed Okpanam in 2010…
        </h2>

        <p className="text-2xl md:text-3xl font-semibold mb-6 text-gray-700">
          Don’t Miss Admiralty Drive in 2026
        </p>

        <p className="text-gray-500 mb-12 text-lg">
          Prices inside Admiralty Drive never go backward — and never stay flat.
        </p>

        <button
          onClick={handleClick}
          className="relative px-12 py-5 bg-black text-white font-bold rounded-2xl text-lg shadow-xl hover:scale-105 transition-transform hover:shadow-2xl"
        >
          Start Your Lush Estate Discovery Journey Now
          <span className="absolute top-0 left-0 w-full h-full rounded-2xl border-2 border-yellow-500 opacity-0 hover:opacity-50 transition-all" />
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;
