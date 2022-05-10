import React from "react";
import { Route, Routes } from "react-router";
import './App.css';
import ResponsiveAppBar from "./components/nav/Navbar";
import Home from "./pages/home/Home"

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={ <Home />} />
      </Routes>
   
    </div>
  );
}

export default App;
