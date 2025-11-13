import React from "react";
import Hero from "../components/Hero";
import EstateDescription from "../components/EstateDescription";
import CallToAction from "../components/CallToAction";
import FloatingContact from "../components/FloatingContact";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section data-scroll-section>
        <Hero />
      </section>

      {/* Estate Description */}
      <section data-scroll-section>
        <EstateDescription />
      </section>

      {/* Call To Action */}
      <section data-scroll-section>
        <CallToAction />
      </section>

      {/* Floating contact stays fixed */}
      <FloatingContact />
    </div>
  );
};

export default Home;
