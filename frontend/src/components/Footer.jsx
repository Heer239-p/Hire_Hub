import React from "react";
import useAuthUser from "../hooks/useAuthUser";

const Footer = () => {
  const user = useAuthUser();
  const isEmployer = user?.role === "employer";

  // Define quick links based on user role
  const quickLinks = isEmployer
    ? [
        { name: "Dashboard", path: "/company/dashboard" },
        { name: "Post Job", path: "/company/post-job" },
        { name: "Manage Jobs", path: "/company/manage-jobs" },
        { name: "Subscription", path: "/company/subscription" },
        { name: "Contact", path: "/contact" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Jobs", path: "/jobs" },
        { name: "Candidates", path: "/candidates" },
        { name: "My Applications", path: "/userapplications" },
        { name: "Contact", path: "/contact" },
      ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-4">HireHub</h2>
            <p className="text-sm mb-4">
              Empowering careers and helping companies find the best talent.
            </p>
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} hirehub.com
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.path} className="text-sm hover:text-blue-300 transition">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay In Touch */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Stay In Touch</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-blue-300 transition">Facebook</a></li>
              <li><a href="#" className="text-sm hover:text-blue-300 transition">Instagram</a></li>
              <li><a href="#" className="text-sm hover:text-blue-300 transition">LinkedIn</a></li>
              <li><a href="#" className="text-sm hover:text-blue-300 transition">Email</a></li>
            </ul>
          </div>

          {/* Locations */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Location</h3>
            <ul className="space-y-2">
              <li className="text-sm">Ahmedabad</li>
             
            </ul>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="/privacy" className="text-sm hover:text-blue-300 transition">Privacy</a>
            <a href="/terms" className="text-sm hover:text-blue-300 transition">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;