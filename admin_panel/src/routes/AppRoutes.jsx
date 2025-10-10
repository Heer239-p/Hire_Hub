import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Companies from '../pages/Companies';
import Dashboard from '../pages/Dashboard';
import Jobs from '../pages/Jobs';
import Users from '../pages/Users';
import Applications from '../pages/Applications';
import Login from '../pages/Login';
import PrivateRoute from '../components/PrivateRoute';
import AdminLayout from '../layouts/AdminLayout';  // <-- import layout here
import { isAuthenticated } from '../utils/auth';
import Employers from '../pages/employers';
import Profile from "../pages/profile";
import Category from "../pages/categories"; 
import Categories from '../pages/categories';


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Private routes wrapped inside AdminLayout */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/jobs"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Jobs />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/users"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Users />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/applications"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Applications />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      <Route
  path="/companies"
  element={
    <PrivateRoute>
      <AdminLayout>
        <Companies />
      </AdminLayout>
    </PrivateRoute>
  }
/>


 <Route
        path="/employers"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Employers />
            </AdminLayout>
          </PrivateRoute>
        }
      />

        <Route
  path="/profile"
  element={
    <PrivateRoute>
      <AdminLayout>
        <Profile />
      </AdminLayout>
    </PrivateRoute>
  }
/>


   <Route
  path="/categories"
  element={
    <PrivateRoute>
      <AdminLayout>
        <Categories />
      </AdminLayout>
    </PrivateRoute>
  }
/>


     




      {/* Catch all unknown routes and redirect accordingly */}
      <Route
        path="*"
        element={
          isAuthenticated() ? <Navigate to="/" /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
