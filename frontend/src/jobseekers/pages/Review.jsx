import React from "react";

// Sample reviews
const reviews = [
  { name: "Alice", role: "Frontend Developer", rating: 5, comment: "Amazing platform, found my dream job here!" },
  { name: "Bob", role: "Backend Developer", rating: 4, comment: "Very professional and easy to navigate." },
  { name: "Charlie", role: "UI/UX Designer", rating: 4, comment: "Loved the variety of job opportunities available." },
  { name: "David", role: "Data Analyst", rating: 5, comment: "Highly recommend this site for job seekers." },
  { name: "Eva", role: "Product Manager", rating: 3, comment: "Good but could use more filtering options." },
];

// Component to display a single review
const ReviewCard = ({ name, role, rating, comment }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-left">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-600">
          {name[0]}
        </div>
        <div className="ml-4">
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
      <div className="mb-3 text-yellow-500">
        {"★".repeat(rating) + "☆".repeat(5 - rating)}
      </div>
      <p className="text-gray-600">{comment}</p>
    </div>
  );
};

// Homepage Review Section
const ReviewsSection = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">User Reviews</h2>
        <p className="text-gray-500 mb-12">See what our users say about their experience</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              name={review.name}
              role={review.role}
              rating={review.rating}
              comment={review.comment}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
