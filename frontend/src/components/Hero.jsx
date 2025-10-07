import React from "react";

const Hero = () => {
  return (
    <section
      className="h-[50vh] flex flex-col justify-center items-center text-white bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      <div className=" bg-opacity-60 p-10 rounded-lg text-center mt-20"style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Find Your Dream Job with HireHub
        </h2>
        <p className="text-lg mb-6">
          Your job search starts and ends with us.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md transition">
          BROWSE JOBS
        </button>
      </div>
    </section>
  );
};

export default Hero;
