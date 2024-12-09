import { useState, useEffect } from "react";
import { fetchData } from "../util/persistence";

import MealsCard from "../components/MealsCard";


function Homepage() {
  const [meals, setMeals] = useState([]);
  
  useEffect(() => {
    fetchData('https://meals.nerdshub.dk/api/meals', setMeals, 'GET');
  },[]);

  console.log(meals);
  

  

  return (
    <div>
      <h1>Homepage</h1>

      <MealsCard />
    </div>
  );
}

export default Homepage;
