import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0b132b] text-gray-300 py-10 mt-auto">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-xl font-semibold text-blue-400 mb-2">HireHub</h2>
        <p className="text-sm mb-4">
          Empowering careers and helping companies find the best talent.
        </p>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-blue-400">About</a>
          <a href="#" className="hover:text-blue-400">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400">Contact</a>
        </div>
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} HireHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
