import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (location) params.append("location", location);
    if (category) params.append("category", category);

    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <section
      className="relative h-[70vh] flex justify-center items-center text-white bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.bbvapivot.com/wp-content/uploads/2021/05/portada-reporting.jpg')",
      }}
    >
      <div className="absolute inset-0 "></div>

      <div className="relative z-10 text-center p-10 rounded-lg">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Find Your Dream Job with HireHub
        </h2>
        <p className="text-lg mb-6">Your job search starts and ends with us.</p>

        <button
          onClick={() => navigate("/jobs")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md transition"
        >
          BROWSE JOBS
        </button>

        {/* Search Box */}
        <div className="bg-white text-black rounded-lg p-4 mt-6 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-center">
          <input
            type="text"
            placeholder="Job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[250px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled hidden>
              Location
            </option>
            <option value="Mumbai" className="text-black">Mumbai</option>
            <option value="Pune" className="text-black">Pune</option>
            <option value="Bangalore" className="text-black">Bangalore</option>
            <option value="Hyderabad" className="text-black">Hyderabad</option>
            <option value="Delhi" className="text-black">Delhi</option>
            <option value="Chennai" className="text-black">Chennai</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled hidden>
              Category
            </option>
            <option value="IT" className="text-black">IT & Software</option>
            <option value="Marketing" className="text-black">Marketing</option>
            <option value="Design" className="text-black">Design</option>
            <option value="Project" className="text-black">Project Management</option>
          </select>

          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
