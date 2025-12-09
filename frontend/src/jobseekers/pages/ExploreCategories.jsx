import React from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Monitor,
  Palette,
  Megaphone,
  BarChart,
  Wrench,
} from "lucide-react";

const categories = [
  {
    name: "IT & Software",
    icon: <Monitor size={32} className="text-blue-500" />,
    bg: "bg-blue-100",
    queryCategory: "IT",
  },
  {
    name: "Marketing",
    icon: <Megaphone size={32} className="text-pink-500" />,
    bg: "bg-pink-100",
    queryCategory: "Marketing",
  },
  {
    name: "Design",
    icon: <Palette size={32} className="text-purple-500" />,
    bg: "bg-purple-100",
    queryCategory: "Design",
  },
  {
    name: "Finance",
    icon: <BarChart size={32} className="text-green-500" />,
    bg: "bg-green-100",
    queryCategory: "Finance",
  },
  {
    name: "Engineering",
    icon: <Wrench size={32} className="text-yellow-500" />,
    bg: "bg-yellow-100",
    queryCategory: "Engineering",
  },
  {
    name: "Business",
    icon: <Briefcase size={32} className="text-teal-500" />,
    bg: "bg-teal-100",
    queryCategory: "Business",
  },
];

const ExploreCategories = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          Explore Categories
        </h2>
        <p className="text-gray-500 mb-12">
          Discover job opportunities across top industries
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <Link
              to={`/jobs${cat.queryCategory ? `?category=${encodeURIComponent(cat.queryCategory)}` : ""}`}
              key={index}
              className={`rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-8 flex flex-col items-center text-center ${cat.bg}`}
            >
              <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full mb-4 shadow-sm">
                {cat.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {cat.name}
              </h3>
              <p className="text-gray-500 text-sm">
                Explore top {cat.name} jobs near you.
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreCategories;
