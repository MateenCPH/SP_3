
import MealsCard from "../components/MealsCard";
import Header from "../components/Header";
import facade from "../util/apiFacade";

function Homepage({meals, loggedIn, username}) {

  return (
    <div>

      <Header loggedIn={loggedIn} username={username}/>
      <h1 className="text-center text-4xl my-8">Find inspiration do some of our best recipes</h1>

      <h2 className="text-2xl my-4 mx-1">Recommended For You</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {meals && Object.values(meals).map((meals) => (
          <MealsCard key={meals.mealId} meal={meals} />
        ))}
      </div>
    </div>
  );
}

export default Homepage;
