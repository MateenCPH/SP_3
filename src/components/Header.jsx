import { Link } from "react-router-dom";
import facade from "../util/apiFacade";

import Searchbar from "./Searchbar";

import HomeLogo from "../assets/icons/HomeLogo";
import UserLogo from "../assets/icons/UserLogo";
import TerminalIcon from "../assets/icons/TerminalIcon";
import LogoutLogo from "../assets/icons/LogoutLogo";

function Header({ loggedIn, username, meals }) {
  
  const logout = () => {
    facade.logout();
  };

  return (
    <>
      <header className="my-2 flex flex-row justify-between items-center">
        <Link to="/">
          <HomeLogo />
        </Link>
        <Searchbar meals={meals} />

        {/* User section */}
        <div className="flex items-center">
          {loggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-row justify-center items-center">
                <span className="text-sm font-bold mr-2">{username}</span>
                <UserLogo />
              </div>
              {facade.hasUserAccess("admin", loggedIn) && (
                <Link to="/admin">
                  <TerminalIcon />
                </Link>
              )}
              <button
                onClick={logout}
                className="px-2 py-1 bg-Theme text-Primary rounded hover:bg-red-700"
              >
                <LogoutLogo />
              </button>
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