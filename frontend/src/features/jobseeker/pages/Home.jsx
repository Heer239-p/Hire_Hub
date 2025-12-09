// src/jobseekers/pages/Home.jsx
import React from "react";
import ExploreCategories from "./ExploreCategories";
import FeaturedJobs from "../../../components/FeaturedJobs";
import Review from "./Review";
import Team from "./Teams";

const Home = () => {
  return (
    <>
    
      <ExploreCategories />
      <FeaturedJobs />
      <Review />
      <Team />
    </>
  );
};

export default Home;
