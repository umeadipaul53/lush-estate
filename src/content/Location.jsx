import { useNavigate } from "react-router-dom";

const Location = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/select-estate");
  };

  return (
    <section className="relative py-32 bg-zinc-900 overflow-hidden">
      {/* Ambient gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),transparent_55%)]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="uppercase tracking-widest text-sm text-gray-400 mb-3">
            Prime Location
          </p>

          <h2 className="text-3xl md:text-4xl font-serif text-white leading-tight">
            Inside Admiralty Drive —
            <span className="block text-gray-300">
              Asaba’s Fastest-Rising High-Value District
            </span>
          </h2>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Map Image */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
            <img
              src="https://res.cloudinary.com/dow1r4ph8/image/upload/v1764512098/mapImage_tiuadw.jpg"
              alt="Admiralty Drive Location Map"
              className="relative rounded-2xl border border-white/10"
            />
          </div>

          {/* Location Advantages */}
          <div className="space-y-6">
            {[
              {
                title: "Asaba International Airport",
                time: "24 minutes drive",
              },
              {
                title: "Okpanam – Ibusa Bypass",
                time: "15 minutes access",
              },
              {
                title: "2nd Niger Bridge Superhighway",
                time: "10 minutes proximity",
              },
              {
                title: "Admiralty Drive Community",
                time: "Fully secure & gated",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-5 backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition"
              >
                <div className="w-2 h-2 mt-2 rounded-full bg-white" />

                <div>
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-gray-400 text-sm">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <button
            onClick={handleClick}
            className="px-10 py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition"
          >
            Explore Location Advantages
          </button>
        </div>
      </div>
    </section>
  );
};

export default Location;
