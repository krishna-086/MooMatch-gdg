import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white text-[#662929]" data-aos="fade-up">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Image */}
        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <div 
            className="h-64 md:h-96 w-full bg-cover bg-center rounded-lg shadow-xl"
            style={{ backgroundImage: "url('https://images.cdn-files-a.com/ready_uploads/media/72814/800_5ce53a424f3a3.jpg')" }}
          ></div>
        </div>
        
        {/* Content */}
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Us</h2>
          <div className="w-24 h-1 bg-white mb-8"></div>
          <p className="text-lg mb-8">
          We are dedicated to helping farmers protect and improve Indian cow breeds through easy-to-use tools. Our platform allows farmers to identify cow breeds by uploading pictures, providing valuable insights into herd health and breed composition. We offer personalized breeding recommendations to help farmers improve their herd's health and milk production. Our goal is to support farmers in improving their farms while promoting cow breed conservation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;