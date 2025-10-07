import React from "react";

const FeaturedJobs = () => {
const jobs = [
  {
    company: "Google",
    title: "Frontend Developer",
    location: "New York",
    type: "FULL-TIME",
    color: "bg-green-500",
    logo: "https://logo.clearbit.com/google.com",
  },
  {
    company: "Airbnb",
    title: "Senior UX Designer",
    location: "San Francisco",
    type: "REMOTE",
    color: "bg-blue-500",
    logo: "https://logo.clearbit.com/airbnb.com",
  },
  {
    company: "Shopify",
    title: "Art Director",
    location: "Toronto",
    type: "PART-TIME",
    color: "bg-purple-500",
    logo: "https://logo.clearbit.com/shopify.com",
  },
  {
    company: "Microsoft",
    title: "Backend Developer",
    location: "Seattle",
    type: "FULL-TIME",
    color: "bg-red-500",
    logo: "https://logo.clearbit.com/microsoft.com",
  },
  {
    company: "Tesla",
    title: "Data Analyst",
    location: "Los Angeles",
    type: "REMOTE",
    color: "bg-yellow-500",
    logo: "https://logo.clearbit.com/tesla.com",
  },
  {
    company: "Facebook",
    title: "Product Manager",
    location: "Menlo Park",
    type: "FULL-TIME",
    color: "bg-blue-700",
    logo: "https://logo.clearbit.com/facebook.com",
  },
  {
    company: "Amazon",
    title: "DevOps Engineer",
    location: "Seattle",
    type: "FULL-TIME",
    color: "bg-orange-500",
    logo: "https://logo.clearbit.com/amazon.com",
  },
  {
    company: "Netflix",
    title: "UI/UX Designer",
    location: "Los Gatos",
    type: "PART-TIME",
    color: "bg-pink-500",
    logo: "https://logo.clearbit.com/netflix.com",
  },
  {
    company: "Spotify",
    title: "Mobile App Developer",
    location: "Stockholm",
    type: "REMOTE",
    color: "bg-green-700",
    logo: "https://logo.clearbit.com/spotify.com",
  },
];


  return (
      <section className="py-16 bg-white flex justify-center">
      <div className="w-full max-w-10xl px-6 text-center">
    
        <h3 className="text-3xl font-bold mb-10 text-gray-800">Featured Jobs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={job.logo}
                alt={job.company}
                className="h-40 w-full object-contain bg-gray-100 p-4"
              />
              <div className="p-6 text-left">
                <h4 className="text-lg font-semibold">{job.title}</h4>
                <p className="text-gray-500 text-sm mt-1">{job.location}</p>
                <span
                  className={`inline-block mt-3 text-sm text-white px-3 py-1 rounded-full ${job.color}`}
                >
                  {job.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
