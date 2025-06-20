import React from 'react';
import Spectro from './components/spectro';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import QualityMaster from './components/quality';
import CreateNew from './components/createnew';
import Dashboard from './components/dashboard';
// import Dashboard from "./pages/Dashboard";

// import QualityPlan from "./pages/QualityPlan";

function App() {
  return (
    <>
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/spectro" element={<Spectro />} />
            <Route path="/quality" element={<QualityMaster />} />
            <Route path="/createnew" element={<CreateNew />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
      
    </>
  );
}

export default App;



