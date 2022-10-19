import React from 'react';
import Conv from './components/conv/Conv';
import OptionPage from './components/options/OptionPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/options" element={<OptionPage/>}/>
          <Route path="/:conversee" element={<Conv user="Ajit Alapati"/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
