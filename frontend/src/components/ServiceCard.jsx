// ServiceCard.jsx
import React from 'react';

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div 
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${service.image})` }}
      ></div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#662929] mb-4">{service.title}</h3>
        <p className="text-gray-700 mb-6">{service.description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;