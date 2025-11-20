import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

// Jobseeker Pages
import JSLogin from "./pages/jobseeker/JSLogin";
import JSRegister from "./pages/jobseeker/JSRegister";
import JSDashboard from "./pages/jobseeker/JSDashboard";
import JSJobs from "./pages/jobseeker/JSJobs";

// Employer Pages
import EmpLogin from "./pages/company/EmpLogin";
import EmpRegister from "./pages/company/EmpRegister";
import EmpDashboard from "./pages/company/EmpDashboard";
import PostJob from "./pages/company/PostJob";
import ManageJobs from "./pages/company/ManageJobs";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Jobseeker */}
          <Route path="/jobseeker/login" element={<JSLogin />} />
          <Route path="/jobseeker/register" element={<JSRegister />} />

          <Route
            path="/jobseeker/dashboard"
            element={
              <ProtectedRoute role="jobseeker">
                <JSDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobseeker/jobs"
            element={
              <ProtectedRoute role="jobseeker">
                <JSJobs />
              </ProtectedRoute>
            }
          />

          {/* Employer */}
          <Route path="/company/login" element={<EmpLogin />} />
          <Route path="/company/register" element={<EmpRegister />} />

          <Route
            path="/company/dashboard"
            element={
              <ProtectedRoute role="company">
                <EmpDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/company/post-job"
            element={
              <ProtectedRoute role="company">
                <PostJob />
              </ProtectedRoute>
            }
          />

          <Route
            path="/company/manage-jobs"
            element={
              <ProtectedRoute role="company">
                <ManageJobs />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
