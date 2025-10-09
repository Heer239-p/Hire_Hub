// src/jobseekers/pages/Home.jsx
import React from "react";
import Hero from "../../components/Hero";
import ExploreCategories from "../pages/ExploreCategories";
import FeaturedJobs from "../../components/FeaturedJobs";
import Review from "../pages/Review";
import Team from "../pages/Teams";

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
