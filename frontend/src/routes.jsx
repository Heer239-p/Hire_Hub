import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./jobseekers/pages/Home";
import Jobs from "./jobseekers/pages/Jobs";
import Candidates from "./jobseekers/pages/Candidates";
import Employers from "./jobseekers/pages/Employers";
import Contact from "./jobseekers/pages/Contact";
import Login from "./jobseekers/pages/Login";
import Register from "./jobseekers/pages/Register";
import Categories from "./jobseekers/pages/ExploreCategories";
import ProtectedRoute from "./components/ProtectedRoute";
import BrowseJobs from "./jobseekers/pages/BrowseJobs";
import application from "./jobseekers/pages/UserApplications";
import UserApplications from "./jobseekers/pages/UserApplications";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="candidates"
          element={
            <ProtectedRoute>
              <Candidates />
            </ProtectedRoute>
          }
        />
        <Route
          path="userapplications"
          element={
            <ProtectedRoute>
              <UserApplications />
            </ProtectedRoute>
          }
        />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="categories" element={<Categories />} />
        <Route path="browse-jobs" element={<BrowseJobs />} />

      </Route>
    </Routes>
  );
};

export default AppRoutes;
