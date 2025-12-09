// src/modules/jobseeker/pages/Home.jsx
import React from "react";
import Hero from "@/shared/components/Hero";
import FeaturedJobs from "@/shared/components/FeaturedJobs";
import ExploreCategories from "@/modules/jobseeker/pages/ExploreCategories";
import Review from "@/modules/jobseeker/pages/Review";
import Team from "@/modules/jobseeker/pages/Teams";

const Home = () => {
  return (
    <>
    
      <ExploreCategories />
      <FeaturedJobs />
      <Review/>
      <Team/>
    </>
  );
};

export default Home;
