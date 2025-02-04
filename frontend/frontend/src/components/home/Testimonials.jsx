// File: sections/TestimonialsSection.js

import React from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      feedback: "This is the best shopping experience I've ever had!",
      image: "/path-to-customer1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      feedback: "Amazing products and top-notch customer service!",
      image: "/path-to-customer2.jpg",
    },
    {
      id: 3,
      name: "Emily Johnson",
      feedback: "I found everything I needed, and the support was fantastic!",
      image: "/path-to-customer3.jpg",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 bg-white rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-500"
              />
              <p className="italic text-gray-600 mb-4">"{testimonial.feedback}"</p>
              <h4 className="text-lg font-bold text-gray-800">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
