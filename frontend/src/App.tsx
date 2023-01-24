import React, { createContext } from 'react';
import Conv from './components/conv/Conv';
import OptionPage from './components/options/OptionPage'
import { HashRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navbar/NavBar';
import LandingPage from './components/LandingPage/LandingPage'
import SignIn from './components/users/SignIn';
import SignUp from './components/users/SignUp';
import { Account } from './components/users/Account';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export const UserContext = createContext({user: ""})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
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
    </ThemeProvider>

  );
}

export default App;
