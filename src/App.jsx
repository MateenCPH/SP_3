import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchData } from "./util/persistence";


import "./App.css";

import Admin from "./pages/Admin";
import Details from "./pages/Details";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Header from "./components/Header";
import Signup from "./pages/Signup";

import ErrorPage from "./pages/ErrorPage";

function App() {
  const [meals, setMeals] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  
  const [errorMessage, setErrorMessage] = useState(null);
  
  useEffect(() => {
    fetchData("https://meals.nerdshub.dk/api/meals", setMeals, "GET");
  }, [setMeals]);

  return (
    <>
      <Router>
        <div className="max-w-[63rem] m-auto p-2">
          <Header
            meals={meals}
            loggedIn={loggedIn}
            username={username}
          />
          <Routes>
            <Route path="/" element={<Homepage meals={meals} />} errorElement={<ErrorPage />}/>
            <Route path="/details/:id" element={<Details setErrorMessage={setErrorMessage} />} />
            <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUsername={setUsername} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />} />
            <Route path="/admin" element={<Admin meals={meals} setMeals={setMeals} loggedIn={loggedIn}/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;