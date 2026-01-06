import React from "react";

const FeaturedJobs = () => {
  const jobs = [
    {
      company: "Google",
      title: "Frontend Developer",
      location: "New York",
      type: "FULL-TIME",
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      logo: "/images/firstimage.jpg",
    },
    {
      company: "Airbnb",
      title: "Senior UX Designer",
      location: "San Francisco",
      type: "REMOTE",
      color: "bg-gradient-to-r from-blue-500 to-indigo-600",
      logo: "/images/second.jpg",
    },
    {
      company: "Shopify",
      title: "Art Director",
      location: "Toronto",
      type: "PART-TIME",
      color: "bg-gradient-to-r from-purple-500 to-fuchsia-600",
      logo: "/images/third.jpg",
    },
    {
      company: "Microsoft",
      title: "Backend Developer",
      location: "Seattle",
      type: "FULL-TIME",
      color: "bg-gradient-to-r from-red-500 to-rose-600",
      logo: "/images/four.jpg",
    },
    
    {
      company: "Meta",
      title: "Product Manager",
      location: "Menlo Park",
      type: "FULL-TIME",
      color: "bg-gradient-to-r from-blue-600 to-indigo-700",
      logo: "/images/five.jpg",
    },
    {
      company: "Amazon",
      title: "DevOps Engineer",
      location: "Seattle",
      type: "FULL-TIME",
      color: "bg-gradient-to-r from-orange-500 to-amber-600",
      logo: "/images/six.jpg",
    },
    {
      company: "Netflix",
      title: "UI/UX Designer",
      location: "Los Gatos",
      type: "PART-TIME",
      color: "bg-gradient-to-r from-pink-500 to-rose-600",
      logo: "/images/seaven.jpg",
    },
    {
      company: "Spotify",
      title: "Mobile App Developer",
      location: "Stockholm",
      type: "REMOTE",
      color: "bg-gradient-to-r from-green-600 to-emerald-700",
      logo: "/images/eight.jpg",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-6 text-center">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Featured Jobs
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto">
            Browse the latest and top job opportunities across multiple industries and locations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden flex flex-col h-full"
            >
              <div className="h-40 w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <div className="p-6 text-left flex-grow flex flex-col">
                <h4 className="text-lg font-bold text-gray-900">
                  {job.title}
                </h4>
                <p className="text-gray-700 font-medium text-sm mt-1">{job.company}</p>
                <p className="text-gray-500 text-sm mt-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </p>
                <div className="mt-auto pt-4">
                  <span
                    className={`inline-block mt-2 text-sm font-medium text-white px-3 py-1 rounded-full ${job.color} shadow-md`}
                  >
                    {job.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;