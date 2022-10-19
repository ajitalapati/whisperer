import React, { Component, createContext, useState } from 'react';
import Conv from './components/conv/Conv';
import OptionPage from './components/options/OptionPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';

export const UserContext = createContext({user: ""})

function App() {
  const [user, setUser] = useState("a modern day person");
  return (
    <>
    <UserContext.Provider value={{user:user}}>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/" element={<LandingPage setUserCallback={setUser}/>}/>
          <Route path="/options" element={<OptionPage/>}/>
          <Route path="/:conversee" element={<Conv user={user}/>}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
    </>
  );
}

export default App;
