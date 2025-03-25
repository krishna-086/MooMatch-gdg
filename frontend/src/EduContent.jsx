import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EduContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();

  const cowBreeds = [
    { name: "Holstein", image: "holstein.png", description: "Known for high milk production." },
    { name: "Jersey", image: "cow.jpg", description: "Smaller cows with rich, creamy milk." },
    { name: "Guernsey", image: "cow.jpg", description: "Produces golden-colored milk." },
    { name: "Brown Swiss", image: "cow.jpg", description: "Strong and adaptable breed." },
    { name: "Ayrshire", image: "cow.jpg", description: "Hardy and efficient milk producers." },
    { name: "Shorthorn", image: "cow.jpg", description: "Dual-purpose breed for milk and meat." },
  ];

  const scrollToHomeSection = (sectionId) => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
      }
    }, 500);
  };

  const nextCards = () => {
    setStartIndex((prev) => (prev + 1) % cowBreeds.length);
  };

  const prevCards = () => {
    setStartIndex((prev) => (prev - 1 + cowBreeds.length) % cowBreeds.length);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="fixed w-full z-50 bg-white shadow-md">
        <nav className="hidden md:flex container mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={() => navigate("/")} className="text-2xl font-bold text-[#662929]">
            MooMatch
          </button>
          <div className="flex space-x-8">
            {["Home", "About", "Services", "Testimonials", "Contact"].map((item, index) => (
              <button
                key={index}
                onClick={() => (item === "Home" ? navigate("/") : scrollToHomeSection(item.toLowerCase()))}
                className="text-[#662929] font-medium hover:underline hover:scale-110 transition-transform duration-200"
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Navbar */}
        <nav className="md:hidden bg-white shadow-md py-4 px-4 flex justify-between items-center">
          <button onClick={() => navigate("/")} className="text-xl font-bold text-[#662929]">
            MooMatch
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#662929] focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg py-4 px-4">
            {["Home", "About", "Services", "Testimonials", "Contact"].map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsMenuOpen(false);
                  item === "Home" ? navigate("/") : scrollToHomeSection(item.toLowerCase());
                }}
                className="block text-[#662929] font-medium py-2 hover:underline hover:scale-110 transition-transform duration-200"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Cow Breeds Section */}
<section className="bg-white shadow-lg rounded-xl p-8 mb-10 mt-24">
  <h2 className="text-3xl font-semibold text-[#662929] mb-6 text-center">Types of Cows</h2>
  <div className="relative flex items-center justify-center w-full">
    {/* Previous Button */}
    <button
      onClick={prevCards}
      className="absolute left-2 md:left-0 px-3 py-2 bg-[#662929] text-white rounded-md hover:bg-opacity-80 transition z-10"
    >❮</button>

    {/* Carousel Cards */}
    <motion.div
      key={startIndex}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex space-x-4 w-full overflow-hidden justify-center"
    >
      {cowBreeds.slice(startIndex, startIndex + (window.innerWidth < 640 ? 2 : 3)).map((breed, index) => (
        <div 
          key={index} 
          className="w-full sm:w-1/2 md:w-1/3 bg-gray-100 p-4 md:p-6 rounded-xl shadow-md text-center flex flex-col items-center"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 flex items-center justify-center overflow-hidden rounded-full border-4 border-[#662929]">
            <img
              src={breed.image}
              alt={breed.name}
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-[#662929]">{breed.name}</h3>
          <p className="text-gray-700 mt-2 text-sm md:text-base">{breed.description}</p>
        </div>
      ))}
    </motion.div>

    {/* Next Button */}
    <button
      onClick={nextCards}
      className="absolute right-2 md:right-0 px-3 py-2 bg-[#662929] text-white rounded-md hover:bg-opacity-80 transition z-10"
    >❯</button>
  </div>
</section>

{/* Manure as Organic Fertilizer Section */}
<motion.section 
  className="bg-white shadow-lg rounded-xl p-6 md:p-8 mt-8 text-center"
  initial={{ opacity: 0, y: 50 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 0.7 }}
>
  <h2 className="text-2xl md:text-3xl font-semibold text-[#662929] mb-4 md:mb-6">Manure as Organic Fertilizer</h2>
  <p className="text-gray-700 text-base md:text-lg mb-4 md:mb-6">
    Cow manure is an excellent organic fertilizer, improving soil health and crop yields. It enhances soil fertility by providing essential nutrients.
  </p>
  <ul className="list-disc list-inside text-gray-800 text-base md:text-lg space-y-2 md:space-y-3 mx-auto w-full md:w-3/4 text-left md:text-center">
    <li>Enriches soil with nitrogen, phosphorus, and potassium.</li>
    <li>Improves soil structure and moisture retention.</li>
    <li>Reduces the need for chemical fertilizers.</li>
  </ul>
</motion.section>


      {/* Footer */}
      <footer className="bg-white text-black py-12 mt-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-[#662929] mb-2">MooMatch</h2>
            <p className="text-sm text-[#662929]">Copyright © 2025 All rights reserved</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {["Home", "About", "Services", "Testimonials", "Contact"].map((item, index) => (
              <button
                key={index}
                onClick={() => (item === "Home" ? navigate("/") : scrollToHomeSection(item.toLowerCase()))}
                className="text-[#662929] hover:underline transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EduContent;
