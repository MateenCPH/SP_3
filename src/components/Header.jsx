import HomeLogo from "../assets/homeLogo";
import SearchLogo from "../assets/SearchLogo";
import UserLogo from "../assets/UserLogo";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header({loggedIn, username}) {
  const [burger, setBurger] = useState("");

  const handleChange = (e) => {
    setBurger(e.target.value);
    console.log(burger);
  };

  return (
    <>
      <header className="my-2 flex flex-row justify-between items-center">
        <Link to="/">
          <HomeLogo className="h-8 bg-Theme" />
        </Link>
        <div className="p-2 max-w-80 flex flex-row justify-between rounded bg-Secondary p-">
          <input
            className="bg-transparent focus:outline-none outline-none"
            type="text"
            name="search"
            placeholder="Search..."
            onChange={handleChange}
          />
          <SearchLogo />
        </div>

         {/* User section */}
        <div className="flex items-center">
          {loggedIn ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">{username}</span>
              <UserLogo />
            </div>
          ) : (
            <Link to="/login">
              <UserLogo />
            </Link>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
