import { useLocation, Link } from "react-router-dom";
import QuestionMark from "../assets/QuestionMark";

function Error404NotFound() {
  const location = useLocation();

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
        <Link to={"/"}>
          <button className="bg-Theme p-2 rounded-md mt-4">
            Gay button
          </button>
        </Link>
      </div>
    </>
  );
}

export default Error404NotFound;
