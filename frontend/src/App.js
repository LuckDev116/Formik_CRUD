
import React from "react";
import { Routes, Route } from "react-router-dom";

import { Nav } from "./components/Nav";
import { Home } from "./pages/Home/";
import { Users } from "./pages/Users/";

export default function App() {

  return (   
    <div className="app-container bg-light">
      <Nav />
      <div className="container pt-4 pb-4">
          <Routes>  
            <Route path="/Home" element={ <Home /> } />
            <Route path="/*" element={ <Users /> } />
          </Routes>
      </div>
    </div>
  );
}

