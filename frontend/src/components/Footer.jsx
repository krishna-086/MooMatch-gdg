import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-black py-12 mb-12 md:mb-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-[#662929] mb-2">MooMatch</h2>
            <p className="text-sm text-[#662929]">Copyright © 2025 All rights reserved</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <a href="#home" className="text-[#662929] hover:text-[#662929] hover:underline transition-colors">Home</a>
            <a href="#about" className="text-[#662929] hover:text-[#662929] hover:underline transition-colors">About</a>
            <a href="#breed" className="text-[#662929] hover:text-[#662929] hover:underline transition-colors">Breed AI</a>
            <a href="#contact" className="text-[#662929] hover:text-[#662929] hover:underline transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;