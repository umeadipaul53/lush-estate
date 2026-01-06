import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/select-estate");
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          src="/videos/entrance_video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark luxury overlays */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 pt-32 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            {/* Eyebrow */}
            <span className="inline-block mb-4 px-4 py-1 border border-yellow-500/40 text-yellow-400 text-sm tracking-widest uppercase rounded-full">
              Private Land Investment
            </span>

            <h1 className="text-4xl md:text-6xl xl:text-7xl font-serif font-bold leading-tight">
              Lush Estate
            </h1>

            <p className="mt-6 text-lg md:text-xl text-white max-w-xl">
              The safest & fastest-appreciating land inside
              <span className="text-white font-semibold">
                {" "}
                Admiralty Drive, Asaba
              </span>
            </p>

            <div className="mt-8 space-y-3 text-white max-w-xl">
              <p>
                The last time this happened in Delta State, investors who
                entered at{" "}
                <span className="text-white font-medium">₦1M–₦10M</span> now own
                plots valued at{" "}
                <span className="text-white font-medium">₦60M–₦100M</span>.
              </p>

              <p className="text-white">
                The same pattern is unfolding inside Admiralty Drive — with Lush
                Estate projected to reach
                <span className="text-white font-medium"> ₦30M by 2030</span>.
              </p>
            </div>

            {/* CTA Group */}
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <button
                onClick={handleClick}
                className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 transition"
              >
                Start Your Discovery Journey
              </button>

              <button
                onClick={handleClick}
                className="text-white/80 underline underline-offset-4 hover:text-white transition"
              >
                Watch Virtual Inspection →
              </button>
            </div>
          </div>

          {/* Right Column – Stat Card */}
          <div className="hidden md:block">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md ml-auto">
              <h4 className="text-sm uppercase tracking-widest text-white mb-6">
                Investment Snapshot
              </h4>

              <div className="space-y-5">
                <div className="flex justify-between">
                  <span className="text-white">Entry Window</span>
                  <span className="font-semibold">Lowest Ever</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white">Growth Zone</span>
                  <span className="font-semibold">10–12X Area</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white">Projected Value</span>
                  <span className="font-semibold">₦30M (2030)</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white">Risk Profile</span>
                  <span className="text-white font-semibold">Very Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 w-full flex justify-center">
          <div className="flex flex-col items-center text-gray-400 text-xs">
            <span className="mb-2">Scroll to explore</span>
            <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
