import headerLogo from "../../public/header-logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="mb-2 mt-2 flex flex-row">
        <Link to="/">
          <img className="h-8 bg-Theme" src={headerLogo} alt="headerLogo" />
        </Link>
        <input
          className="p-2 w-[20%] rounded bg-Secondary"
          type="text"
          name="search"
          placeholder="Search..."
        />
        
      </header>
    </>
  );
}

export default Header;
