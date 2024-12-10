import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Details from "./pages/Details";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Searchbar from "./components/searchbar/Searchbar";

function App() {
  return (
    <>
    <div className="max-w-[63rem] m-auto p-2">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/test" element={<Searchbar />} />
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
