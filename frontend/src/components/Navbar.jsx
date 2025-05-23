import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const hasAnimated = element.classList.contains('aos-animate');
      const yOffset = hasAnimated ? 0 : -100; // Adjust this value based on your header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed w-full z-50">
      {/* Desktop Nav */}
      <nav className="hidden md:flex bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <button 
            onClick={() => scrollToSection('home')} 
            className="text-2xl font-bold text-[#662929]"
          >
            MooMatch
          </button>
          
          <div className="flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-[#662929] font-medium hover:underline hover:scale-110 transition-transform duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-[#662929] font-medium hover:underline hover:scale-110 transition-transform duration-200"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('breed')} 
              className="text-[#662929] font-medium hover:underline hover:scale-110 transition-transform duration-200"
            >
              Breed AI
            </button>
            <button 
              onClick={() => navigate('/eduContent')} 
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200"
            >
              EduContent
            </button>
            <button 
              onClick={() => navigate('/Dashboard')} 
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200"
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate('/marketplace')} 
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200"
            >
              MooMarket
            </button>
            <button 
              onClick={() => navigate('/diseasepredictor')} 
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200"
            >
              MooHealth
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="md:hidden bg-white shadow-md py-4 px-4 flex justify-between items-center">
        <button 
          onClick={() => scrollToSection('home')} 
          className="text-xl font-bold text-[#662929]"
        >
          MooMatch
        </button>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#662929] focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-4">
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-[#662929] font-medium hover:underline hover:scale-110 transition-transform duration-200 text-left"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-[#662929] font-medium hover:underline hover:scale-110 transition-transform duration-200 text-left"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('breed')} 
              className="text-[#662929] font-medium hover:underline hover:scale-110 transition-transform duration-200 text-left"
            >
              Breed AI
            </button>
            <button 
              onClick={() => navigate('/EduContent')} 
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200"
            >
              EduContent
            </button>
            <button 
              onClick={() => navigate('/Dashboard')} 
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200"
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate('/marketplace')} 
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200"
            >
              MooMarket
            </button>
            <button 
              onClick={() => navigate('/diseasepredictor')} 
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200"
            >
              MooHealth
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
