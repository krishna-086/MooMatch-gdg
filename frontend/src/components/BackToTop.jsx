import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`fixed bottom-6 right-6 ${isVisible ? 'block' : 'hidden'}`}>
      <button
        onClick={scrollToTop}
        className="bg-[#662929]  text-white p-3 rounded-full shadow-lg hover:bg-[#AF4646] transition-colors"
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default BackToTop;