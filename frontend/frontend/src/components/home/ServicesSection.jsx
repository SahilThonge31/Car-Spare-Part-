import React from "react";
import { FaShippingFast, FaHeadset, FaLock } from "react-icons/fa";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      icon: <FaShippingFast className="text-green-500 text-4xl mb-4" />,
      title: "Free Shipping",
      description: "Get free shipping on orders over $50.",
    },
    {
      id: 2,
      icon: <FaHeadset className="text-blue-500 text-4xl mb-4" />,
      title: "24/7 Support",
      description: "We're here to help you anytime, anywhere.",
    },
    {
      id: 3,
      icon: <FaLock className="text-yellow-500 text-4xl mb-4" />,
      title: "Secure Payments",
      description: "Your transactions are safe with us.",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Why Shop With Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2"
            >
              <div className="flex flex-col items-center">
                {service.icon}
                <h3 className="text-2xl font-semibold mt-4 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center mt-2">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
