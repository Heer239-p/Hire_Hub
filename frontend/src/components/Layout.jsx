import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <Hero />  {/* Hero now visible on all pages */}
      
      {/* Main content between Hero and Footer */}
      <main className="flex-1 mt-10 mb-15 px-6 md:px-20 max-w-8xl mx-auto w-full">
        <Outlet />  {/* Renders the current route page */}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
