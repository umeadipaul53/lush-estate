import { useNavigate } from "react-router-dom";

const Security = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/select-estate");
  };

  const features = [
    {
      title: "Fully Fenced & Controlled Perimeter",
      desc: "Clearly demarcated boundaries with secured access points.",
    },
    {
      title: "Verified & Transferable Documentation",
      desc: "All titles authenticated and legally traceable.",
    },
    {
      title: "Zero Omo-Onile Risk",
      desc: "No communal land disputes or hidden claims.",
    },
    {
      title: "Professionally Structured Plot Layout",
      desc: "Surveyed, numbered plots with clear road networks.",
    },
  ];

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.05),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="uppercase tracking-widest text-sm text-gray-400 mb-3">
            Security & Legitimacy
          </p>

          <h2 className="text-3xl md:text-4xl font-serif text-white leading-tight">
            Safety You Can Verify,
            <span className="block text-gray-300">Not Just Promises</span>
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((item, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 transition hover:bg-white/10"
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 h-full w-1 bg-white/20 rounded-l-2xl opacity-0 group-hover:opacity-100 transition" />

              <h3 className="text-lg text-white font-medium mb-2">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <button
            onClick={handleClick}
            className="px-10 py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition"
          >
            View Estate Security Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default Security;
