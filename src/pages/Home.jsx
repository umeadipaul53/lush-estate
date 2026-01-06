import Navbar from "../content/Navbar";
import Hero from "../content/Hero";
import WhyInvest from "../content/WhyInvest";
import Location from "../content/Location";
import Security from "../content/Security";
import VirtualInspection from "../content/VirtualInspection";
import Testimonials from "../content/Testimonials";
import FinalCTA from "../content/FinalCTA";
import FloatingContact from "../components/FloatingContact";

const Home = () => {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <Hero />
      <WhyInvest />
      <Location />
      <Security />
      <VirtualInspection />
      <Testimonials />
      <FinalCTA />
      <FloatingContact />
    </div>
  );
};

export default Home;
