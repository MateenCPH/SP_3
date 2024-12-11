import SearchLogo from "../assets/SearchLogo";
import UserLogo from "../assets/UserLogo";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import HomeLogo from "../assets/HomeLogo";
import TerminalIcon from "../assets/TerminalIcon";
import facade from "../util/apiFacade";

function Header({ loggedIn, username, meals, logout }) {
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
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">{username}</span>
              <UserLogo />
              <button
                onClick={logout}
                className="ml-4 px-2 py-1 bg-Theme text-Primary rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <UserLogo />
            </Link>
          )}
          {facade.hasUserAccess("admin", loggedIn) && (
              <Link to="/admin">
                <TerminalIcon />
              </Link>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
