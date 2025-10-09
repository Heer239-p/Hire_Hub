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
    <section className="py-6 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
  <div className="text-center mb-12">
  <h2 className="text-4xl font-bold mb-4 text-gray-800">
    Featured Jobs
  </h2>
   <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
    Browse the latest and top job opportunities across multiple industries and locations.
  </p>
</div>



        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-50">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="h-40 w-full flex items-center justify-center bg-gray-100 p-4">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="h-full object-contain"
                />
              </div>
              <div className="p-6 text-left">
                <h4 className="text-lg font-semibold text-gray-800">
                  {job.title}
                </h4>
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
