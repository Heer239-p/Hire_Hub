import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative h-[70vh] flex justify-center items-center text-white bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.bbvapivot.com/wp-content/uploads/2021/05/portada-reporting.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0  bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center p-10 rounded-lg">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Find Your Dream Job with HireHub
        </h2>
        <p className="text-lg mb-6">Your job search starts and ends with us.</p>

        {/* Browse Jobs Button */}
     <button
  onClick={() => navigate("/browse-jobs")} // <-- Use the route path, NOT the file path
  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md transition"
>
  BROWSE JOBS
</button>


        {/* Search Box */}
        <div className="bg-white text-black rounded-lg p-4 mt-6 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-center">
          <input
            type="text"
            placeholder="Where are you looking for?"
            className="flex-1 min-w-[250px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />

          <select
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue=""
          >
            <option value="" disabled hidden>
              Location
            </option>
            <option value="ahmedabad" className="text-black">
              Ahmedabad
            </option>
            <option value="surat" className="text-black">
              Surat
            </option>
            <option value="vadodara" className="text-black">
              Vadodara
            </option>
            <option value="bangalore" className="text-black">
              Bangalore
            </option>
          </select>

          <select
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue=""
          >
            <option value="" disabled hidden>
              Choose Category
            </option>
            <option value="it" className="text-black">
              IT & Software
            </option>
            <option value="marketing" className="text-black">
              Marketing
            </option>
            <option value="finance" className="text-black">
              Finance
            </option>
            <option value="design" className="text-black">
              Design
            </option>
          </select>

          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md transition">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
