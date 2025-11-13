import React from "react";
import { FaInstagram, FaFacebookF, FaYoutube, FaTiktok } from "react-icons/fa";

const FloatingContact = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/** Each button is smaller and circular */}

      <a
        href="https://www.instagram.com/mrtehlex?igsh=b2pkYnh3Yjg4bnU2"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-md transition transform hover:scale-110"
        title="Follow on Instagram"
      >
        <FaInstagram size={20} />
      </a>

      <a
        href="https://www.tiktok.com/@mrtehlex?_r=1&_t=ZS-91IHxiPA2Om"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-md transition transform hover:scale-110"
        title="Follow on Facebook"
      >
        <FaTiktok size={20} />
      </a>

      <a
        href="https://youtube.com/@mrtehlex?si=uBCYrh31868yRbJT"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-md transition transform hover:scale-110"
        title="Subscribe on YouTube"
      >
        <FaYoutube size={20} />
      </a>
    </div>
  );
};

export default FloatingContact;
