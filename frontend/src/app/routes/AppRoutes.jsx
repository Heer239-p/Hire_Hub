import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/shared/components/Layout";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import Home from "@/modules/jobseeker/pages/Home";
import Jobs from "@/modules/jobseeker/pages/Jobs";
import Candidates from "@/modules/jobseeker/pages/Candidates";
import Employers from "@/modules/jobseeker/pages/Employers";
import Contact from "@/modules/jobseeker/pages/Contact";
import Login from "@/modules/jobseeker/pages/Login";
import Register from "@/modules/jobseeker/pages/Register";
import Categories from "@/modules/jobseeker/pages/ExploreCategories";
import BrowseJobs from "@/modules/jobseeker/pages/BrowseJobs";
import UserApplications from "@/modules/jobseeker/pages/UserApplications";
import CompanyLayout from "@/modules/company/layouts/CompanyLayout";
import Dashboard from "@/modules/company/pages/Dashboard";
import ManageJobs from "@/modules/company/pages/ManageJobs";
import PostJob from "@/modules/company/pages/PostJob";
import Applicants from "@/modules/company/pages/Applicants";
import ApplicantDetails from "@/modules/company/pages/ApplicantDetails";
import Profile from "@/modules/company/pages/Profile";
import Subscription from "@/modules/company/pages/Subscription";

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
