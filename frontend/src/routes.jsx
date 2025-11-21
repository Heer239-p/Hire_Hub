import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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
import UserApplications from "./jobseekers/pages/UserApplications";
import CompanyLayout from "./company/layouts/CompanyLayout";
import Dashboard from "./company/pages/Dashboard";
import ManageJobs from "./company/pages/ManageJobs";
import PostJob from "./company/pages/PostJob";
import Applicants from "./company/pages/Applicants";
import ApplicantDetails from "./company/pages/ApplicantDetails";
import Profile from "./company/pages/Profile";
import Subscription from "./company/pages/Subscription";

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
         <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="categories" element={<Categories />} />
        <Route path="browse-jobs" element={<BrowseJobs />} />
      </Route>
      <Route
        path="/company"
        element={
          <ProtectedRoute allowedRoles={["employer"]}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="manage-jobs" element={<ManageJobs />} />
        <Route path="applicants" element={<Applicants />} />
        <Route path="applicant-details" element={<ApplicantDetails />} />
        <Route path="profile" element={<Profile />} />
        <Route path="subscription" element={<Subscription />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
