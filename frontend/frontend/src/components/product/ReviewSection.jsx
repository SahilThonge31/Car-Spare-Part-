// File: ReviewSection.js

import React from "react";

const ReviewSection = ({ reviews }) => {
  return (
    <div className="mt-6">
      <h3 className="text-2xl font-bold">Customer Reviews</h3>
      {reviews.map((review, index) => (
        <div key={index} className="mt-4 p-4 border-b">
          <h4 className="text-lg font-semibold">{review.name}</h4>
          <p className="text-gray-600">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
