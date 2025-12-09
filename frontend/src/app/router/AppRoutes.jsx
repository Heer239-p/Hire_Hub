import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../../components/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";

import Home from "../../features/jobseeker/pages/Home";
import Jobs from "../../features/jobseeker/pages/Jobs";
import Candidates from "../../features/jobseeker/pages/Candidates";
import Contact from "../../features/jobseeker/pages/Contact";
import Login from "../../features/jobseeker/pages/Login";
import Register from "../../features/jobseeker/pages/Register";
import Categories from "../../features/jobseeker/pages/ExploreCategories";
import BrowseJobs from "../../features/jobseeker/pages/BrowseJobs";
import UserApplications from "../../features/jobseeker/pages/UserApplications";
import JobseekerProfile from "../../features/jobseeker/pages/Profile";

import CompanyLayout from "../../features/company/layouts/CompanyLayout";
import Dashboard from "../../features/company/pages/Dashboard";
import ManageJobs from "../../features/company/pages/ManageJobs";
import PostJob from "../../features/company/pages/PostJob";
import Applicants from "../../features/company/pages/Applicants";
import ApplicantDetails from "../../features/company/pages/ApplicantDetails";
import CompanyProfile from "../../features/company/pages/Profile";
import Subscription from "../../features/company/pages/Subscription";

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
              <JobseekerProfile />
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
            <CompanyLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="manage-jobs" element={<ManageJobs />} />
        <Route path="applicants" element={<Applicants />} />
        <Route path="applicant-details" element={<ApplicantDetails />} />
        <Route path="profile" element={<CompanyProfile />} />
        <Route path="subscription" element={<Subscription />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
