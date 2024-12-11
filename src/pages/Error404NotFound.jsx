import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import QuestionMark from "../assets/QuestionMark";

function Error404NotFound() {
  const location = useLocation();
  const [msg, setMsg] = useState();

  const handleClick = () => {
    setMsg(
      <>
        <div className="flex flex-row">
          <p className="mt-5 text-xl">
            Dude, why did you click the gay button?
          </p>
          <button className="bg-Theme p-2 rounded-md mt-4">
            Click this button instead
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col place-items-center m-10">
        <div className="flex flex-row items-end">
          <h1 className="text-5xl mr-2">404 Not Found</h1>
          <QuestionMark className="w-10 h-10" />
        </div>
        <p className="mt-5 text-xl">
          Sorry, the page: {location.pathname} you are looking for does not
          exist{" "}
        </p>
        {/* <Link to={"/"}> */}
        <button onClick={handleClick} className="bg-Theme p-2 rounded-md mt-4">
          Gay button
        </button>

        <Link to={"/"}>
          <span>{msg}</span>
        </Link>

        {/* </Link> */}
      </div>
    </>
  );
}

export default Error404NotFound;
