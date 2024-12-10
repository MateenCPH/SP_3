import SearchLogo from "../assets/SearchLogo";
import UserLogo from "../assets/UserLogo";
import { Link } from "react-router-dom";
import Searchbar from "./searchbar/Searchbar";
import HomeLogo from "../assets/HomeLogo";

function Header({ loggedIn, username, meals }) {
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
