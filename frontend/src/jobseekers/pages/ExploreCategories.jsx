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
  { name: "IT & Software", icon: <Monitor size={32} className="text-blue-600" />, bg: "bg-gradient-to-br from-blue-50 to-indigo-50" },
  { name: "Marketing", icon: <Megaphone size={32} className="text-pink-600" />, bg: "bg-gradient-to-br from-pink-50 to-rose-50" },
  { name: "Design", icon: <Palette size={32} className="text-purple-600" />, bg: "bg-gradient-to-br from-purple-50 to-fuchsia-50" },
  { name: "Finance", icon: <BarChart size={32} className="text-green-600" />, bg: "bg-gradient-to-br from-green-50 to-emerald-50" },
  { name: "Engineering", icon: <Wrench size={32} className="text-yellow-600" />, bg: "bg-gradient-to-br from-yellow-50 to-amber-50" },
  { name: "Business", icon: <Briefcase size={32} className="text-teal-600" />, bg: "bg-gradient-to-br from-teal-50 to-cyan-50" },
];

const ExploreCategories = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">
          Explore Categories
        </h2>
        <p className="text-gray-600 mb-16 text-lg">
          Discover job opportunities across top industries
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <Link
              to="/categories"
              key={index}
              className={`rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-8 flex flex-col items-center text-center ${cat.bg} border border-gray-100`}
            >
              <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full mb-6 shadow-md border border-gray-100">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {cat.name}
              </h3>
              <p className="text-gray-600 text-sm">
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