import React from "react";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  testimonial: string;
  name: string;
  role: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, name, role, image }) => {
  return (
    <motion.div
      className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-gray-700 mb-4">"{testimonial}"</p>
      <div className="flex items-center">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full mr-4"
          loading="lazy"
        />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
