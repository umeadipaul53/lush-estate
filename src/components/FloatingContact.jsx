import React from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

const FloatingContact = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/** Each button is smaller and circular */}

      <a
        href="https://www.instagram.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-md transition transform hover:scale-110"
        title="Follow on Instagram"
      >
        <FaInstagram size={20} />
      </a>

      <a
        href="https://www.facebook.com/yourpage"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-md transition transform hover:scale-110"
        title="Follow on Facebook"
      >
        <FaFacebookF size={20} />
      </a>

      <a
        href="https://www.youtube.com/yourchannel"
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
