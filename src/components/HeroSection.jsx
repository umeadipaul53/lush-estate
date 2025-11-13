import React from "react";

const HeroSection = ({
  title,
  sub_title,
  highlight,
  quote,
  backgroundImage,
}) => {
  return (
    <section className="relative h-[50vh] md:h-[60vh] w-full flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={`${title} background`}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-black/70 to-amber-800/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-300 mb-3">
          <a href="/" className="hover:text-amber-400 transition">
            Home
          </a>
          <span className="mx-2">/</span>
          <span className="font-semibold text-white">{title}</span>
        </nav>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
          {sub_title}{" "}
          {highlight && <span className="text-amber-400">{highlight}</span>}
        </h1>

        {/* Quote / Subtitle */}
        {quote && (
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
            {quote}
          </p>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
