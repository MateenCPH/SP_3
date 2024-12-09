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
    <div className="max-w-[1000px] m-auto">
      <Header />
      <h1 className="text-center text-3xl my-5">Homepage</h1>

      <div className="flex flex-wrap gap-4">
        {meals && meals.map((meals) => (
             <MealsCard key={meals.id} meal={meals} />
             ))}
      </div>
    </div>
  );
}

export default Homepage;
