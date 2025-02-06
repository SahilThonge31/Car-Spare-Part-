import React from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      feedback: "This is the best shopping experience I've ever had!",
      image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    },
    {
      id: 2,
      name: "Jane Smith",
      feedback: "Amazing products and top-notch customer service!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-WDVXiZSuSUUeURxbBZl4SvMnwmDNdO65LA&s",
    },
    {
      id: 3,
      name: "Emily Johnson",
      feedback: "I found everything I needed, and the support was fantastic!",
      image: "https://img.freepik.com/free-photo/portrait-professional-handsome-car-mechanic-holding-wrenches-front-automobile-with-opened-hood_342744-261.jpg",
    },
  ];

  const serviceHighlights = [
    "Genuine & high-quality spare parts",
    "Fast & reliable delivery",
    "Expert customer support",
    "Competitive pricing",
    "Easy returns & hassle-free refunds",
    "Secure online payment options",
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-12">Why Choose Our Service?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-12">
          {serviceHighlights.map((highlight, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl">
              <p className="text-gray-800 font-medium">✅ {highlight}</p>
            </div>
          ))}
        </div>
        
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
