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
import Error404NotFound from "./pages/Error404NotFound";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

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

  const [meals, setMeals] = useState([]);

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
          <Routes>
            <Route path="/" element={<Homepage meals={meals} />} />
            <Route path="/details/:id" element={<Details />} />
            <Route
              path="/login"
              element={<Login login={login} loggedIn={loggedIn} />}
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Error404NotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
