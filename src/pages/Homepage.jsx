import { useState, useEffect } from "react";
import { fetchData } from "../util/persistence";

import MealsCard from "../components/MealsCard";
import Header from "../components/Header";

function Homepage() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchData("https://meals.nerdshub.dk/api/meals", setMeals, "GET");
  }, []);

  console.log(meals);

  return (
    <div>
      <Header />
      <h1 className="text-center text-3xl my-8">Find inspiration do some of our best recipes</h1>


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
