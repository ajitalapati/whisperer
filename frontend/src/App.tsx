import React, { createContext, useState } from 'react';
import Conv from './components/conv/Conv';
import OptionPage from './components/options/OptionPage'
import { HashRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navbar/NavBar';
import LandingPage from './components/LandingPage';
import SignIn from './components/users/SignIn';
import SignUp from './components/users/SignUp';
import { Account } from './components/users/Account';

export const UserContext = createContext({user: ""})

function App() {
  const [user, setUser] = useState("a modern day person");
  return (
    <Account>
      <UserContext.Provider value={{user:user}}>
        <HashRouter>
        <NavBar/>
          <Routes>
            <Route path="/" element={<LandingPage setUserCallback={setUser}/>}/>
            <Route path="/options" element={<OptionPage/>}/>
            <Route path="/:conversee" element={<Conv user={user}/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp user={user}/>}/>
          </Routes>
        </HashRouter>
      </UserContext.Provider>
    </Account>
  );
}

export default App;
