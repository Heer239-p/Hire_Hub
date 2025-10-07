import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout";
import Home from "./jobseekers/pages/Home";
import Jobs from "./jobseekers/pages/Jobs";
import Candidates from "./jobseekers/pages/Candidates";
import Employers from "./jobseekers/pages/Employers";
import Contact from "./jobseekers/pages/Contact";
import Login from "./jobseekers/pages/login";
import Register from "./jobseekers/pages/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Layout is the parent route */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* / */}
          <Route path="jobs" element={<Jobs />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="employers" element={<Employers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
