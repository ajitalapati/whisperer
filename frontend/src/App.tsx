import React, { createContext } from 'react';
import Conv from './components/conv/Conv';
import OptionPage from './components/options/OptionPage'
import { HashRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navbar/NavBar';
import LandingPage from './components/LandingPage/LandingPage'
import SignIn from './components/users/SignIn';
import SignUp from './components/users/SignUp';
import { Account } from './components/users/Account';

export const UserContext = createContext({user: ""})

function App() {
  return (
    <Account>
        <HashRouter>
        <NavBar/>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/options" element={<OptionPage/>}/>
            <Route path="/:conversee" element={<Conv/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
          </Routes>
        </HashRouter>
    </Account>
  );
}

export default App;
