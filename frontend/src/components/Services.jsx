// Services.jsx
import React from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "AI-Powered Breeding Recommendations",
      description: "Receive optimal breeding pair recommendations considering genetic diversity and conservation objectives directly on your user dashboard.",
      image: "https://images.cdn-files-a.com/uploads/2031/400_57d14a338d3b0.jpg"
    },
    {
      id: 2,
      title: "AI-Based Breed Identification & Monitoring",
      description: "Upload cow images to identify breeds accurately. Get insights on breed composition, health status, and population trends with real-time feedback.",
      image: "https://images.cdn-files-a.com/uploads/2031/400_57d14ac381923.jpg"
    },
    {
      id: 3,
      title: "User Onboarding & Registration",
      description: "Easily access our platform, create accounts, and manage your farm details. Supports multiple languages and voice assistance for diverse literacy levels.",
      image: "https://images.cdn-files-a.com/uploads/2031/400_57d14bd1c7c33.jpg"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-100" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#662929] mb-4">Services</h2>
          <div className="w-24 h-1 bg-[#662929] mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;