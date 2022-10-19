import React from 'react';
import Conv from './components/conv/Conv';
import OptionPage from './components/options/OptionPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OptionPage/>}/>
          <Route path="/:conversee" element={<Conv user="Ajit Alapati"/>}/>
        </Routes>
      </BrowserRouter>    
    </>
  );
}

export default App;
