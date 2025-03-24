import React from 'react';
import { FaHome, FaInfoCircle, FaCogs, FaCommentAlt, FaEnvelope } from 'react-icons/fa';

const BottomNavbar = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="flex justify-around py-3">
        <a href="#home" className="flex flex-col items-center text-[#662929]">
          <FaHome className="text-xl" />
          <span className="text-xs mt-1 text-[#662929]">Home</span>
        </a>
        <a href="#about" className="flex flex-col items-center text-gray-600 hover:text-purple-900">
          <FaInfoCircle className="text-xl" />
          <span className="text-xs mt-1">About</span>
        </a>
        <a href="#services" className="flex flex-col items-center text-gray-600 hover:text-purple-900">
          <FaCogs className="text-xl" />
          <span className="text-xs mt-1">Services</span>
        </a>
        <a href="#testimonials" className="flex flex-col items-center text-gray-600 hover:text-purple-900">
          <FaCommentAlt className="text-xl" />
          <span className="text-xs mt-1">Testimonials</span>
        </a>
        <a href="#contact" className="flex flex-col items-center text-gray-600 hover:text-purple-900">
          <FaEnvelope className="text-xl" />
          <span className="text-xs mt-1">Contact</span>
        </a>
      </div>
    </div>
  );
};

export default BottomNavbar;