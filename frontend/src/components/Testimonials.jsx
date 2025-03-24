// Testimonials.jsx
import React from 'react';
import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John D.",
      role: "Dairy Farmer",
      quote: "This platform has made managing my farm a breeze. The breed identification feature is spot on.",
      image: "https://images.cdn-files-a.com/ready_uploads/media/2692711/400_5e0be508afae5.jpg",
      rating: 5
    },
    {
      id: 2,
      name: "Emily R.",
      role: "Cattle Breeder",
      quote: "The breeding recommendations have significantly improved our milk production. Highly recommend!",
      image: "https://images.cdn-files-a.com/ready_uploads/media/2682648/400_5e062302ba563.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "Mike T.",
      role: "Agricultural Expert",
      quote: "Exceptional tool for any farmer. The dashboard is user-friendly and the insights are invaluable.",
      image: "https://images.cdn-files-a.com/ready_uploads/media/2692690/400_5e0be51c56b84.jpg",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-[#662929] text-white" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Testimonials</h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;