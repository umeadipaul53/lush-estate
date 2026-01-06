import { useNavigate } from "react-router-dom";

const WhyInvest = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/select-estate");
  };

  const reasons = [
    {
      title: "Zero Land Risk",
      description:
        "Fully fenced estate with verifiable ownership and zero exposure to land grabbing or Omo-Onile disputes.",
      badge: "Security First",
    },
    {
      title: "GRA-Grade Location",
      description:
        "Situated inside Admiralty Drive — Asaba’s fastest-rising residential district and Ibusa’s GRA equivalent.",
      badge: "Prime Location",
    },
    {
      title: "Proven Growth Zone",
      description:
        "Surrounding estates have recorded 10–12X appreciation within 36 months — and the cycle is repeating.",
      badge: "10X Corridor",
    },
  ];

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Intro */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-block mb-4 text-white text-sm tracking-widest uppercase">
            Investment Intelligence
          </span>

          <h2 className="text-3xl md:text-4xl xl:text-5xl font-serif mb-6">
            Why Admiralty Drive Is Pulling Smart Money
          </h2>

          <p className="text-gray-400 text-lg">
            Investors don’t chase hype — they follow infrastructure, security,
            and historical growth patterns. Admiralty Drive checks every box.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-white/40 transition"
            >
              {/* Badge */}
              <span className="inline-block mb-6 px-3 py-1 text-xs tracking-widest uppercase rounded-full border border-white/40 text-white">
                {reason.badge}
              </span>

              <h3 className="text-2xl font-serif mb-4">{reason.title}</h3>

              <p className="text-gray-400 leading-relaxed">
                {reason.description}
              </p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-white group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <button
            onClick={handleClick}
            className="px-10 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 transition"
          >
            See Why Lush Estate Is Different
          </button>

          <p className="mt-4 text-sm text-gray-500">
            Limited plots available within Admiralty Drive
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyInvest;
