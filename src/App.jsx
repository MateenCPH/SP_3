import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Details from "./pages/Details";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";

function App() {
  return (
    <>
    <div className="max-w-[62.5rem] m-auto">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
