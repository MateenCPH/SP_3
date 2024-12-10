import HomeLogo from "../assets/homeLogo";
import SearchLogo from "../assets/SearchLogo";
import UserLogo from "../assets/UserLogo";
import { Link } from "react-router-dom";
import { useState } from "react";
import Searchbar from "./searchbar/Searchbar";

function Header({meals}) {
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
        <Searchbar meals={meals}/>
        <UserLogo />
      </header>
    </>
  );
}

export default Header;
