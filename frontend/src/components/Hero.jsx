import React from 'react';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative h-[85vh] flex items-center justify-center bg-black text-white"
      data-aos="fade"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: "url('/cow.jpg')" }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Smart Solutions for Gaupalaks
        </h1>
        <div 
          className="w-24 h-1 bg-white mx-auto mb-8"
          data-aos="fade-up"
          data-aos-delay="200"
        ></div>
        <h2 
          className="text-xl md:text-2xl lg:text-3xl mb-8"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Empowering Farmers with AI for Sustainable Breed Improvement
        </h2>
      </div>
    </section>
  );
};

export default Hero;