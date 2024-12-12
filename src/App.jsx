import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchData } from "./util/persistence";
import facade from "./util/apiFacade";

import "./App.css";

import Admin from "./pages/Admin";
import Details from "./pages/Details";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Header from "./components/Header";
import Signup from "./pages/Signup";

import ErrorPage from "./pages/ErrorPage";
import ErrorBanner from "./components/ErrorBanner";

function App() {
  const [meals, setMeals] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  
  const [errorMessage, setErrorMessage] = useState(null);

  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then(() => {
        setLoggedIn(true);
        setUsername(user);
      })
      .catch((err) => {
        console.error("Login failed:", err);
        alert("Invalid credentials. Please try again.");
      });
  };
  
  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setUsername("");
  };
  
  useEffect(() => {
    fetchData("https://meals.nerdshub.dk/api/meals", setMeals, "GET");
  }, []);

  return (
    <>
      <Router>
        <div className="max-w-[63rem] m-auto p-2">
          <Header
            meals={meals}
            loggedIn={loggedIn}
            username={username}
            logout={logout}
          />
          <div>
           {errorMessage && <ErrorBanner errorMessage={errorMessage} />}
           </div>
          <Routes>
            <Route path="/" element={<Homepage meals={meals} />} errorElement={<ErrorPage />}/>
            <Route path="/details/:id" element={<Details setErrorMessage={setErrorMessage} />} />
            <Route path="/login" element={<Login login={login} loggedIn={loggedIn} />} />
            <Route path="/admin" element={<Admin meals={meals} loggedIn={loggedIn}/>} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
