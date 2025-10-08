// src/App.jsx
import React from "react";
import Layout from "./components/Layout";
import Home from "./jobseekers/pages/Home";
import "./index";
const App = () => {
  // Default landing page content
  return (
    <Layout>
      <Home />
    
    </Layout>
  );
};

export default App;
