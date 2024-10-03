import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";

import Navbar from "./components/Navbar";
import ImageCoordinateTracker from "./utils/ImageCoordinateTracker";
import './App.css'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

      </Routes>
      <ImageCoordinateTracker />
    </div>
  );
};

export default App;
