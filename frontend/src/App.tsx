import { createContext, useState, useEffect } from 'react';
import Conv from './components/conv/Conv';
import OptionPage from './components/options/OptionPage';
import { HashRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navbar/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import SignIn from './components/users/SignIn';
import SignUp from './components/users/SignUp';
import { Account } from './components/users/Account';

export const UserContext = createContext({user: ""});
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className="flex h-screen flex-col bg-background">
        <Account>
          <HashRouter>
            <NavBar />
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/options" element={<OptionPage/>}/>
                <Route path="/:conversee" element={<Conv/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
              </Routes>
            </main>
          </HashRouter>
        </Account>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
