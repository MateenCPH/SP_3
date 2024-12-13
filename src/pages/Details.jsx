import { useLocation, useParams } from "react-router-dom";
import { getImageForMeal } from "../components/MealsCard";
import { useState, useEffect } from "react";
import { fetchData } from "../util/persistence";
import ErrorPage from "./ErrorPage";
import LoadingScreen from "../components/LoadingScreen";

import TimerIcon from "../assets/icons/Timer";
import RatingIcon from "../assets/icons/Rating";
import MealInstructions from "../components/MealInstructions";


function Details() {
  const { id } = useParams();
  const location = useLocation();
  const [meal, setMeal] = useState(location.state?.meal);

  useEffect(() => {
    if (meal === undefined) {
      fetchData(
        "https://meals.nerdshub.dk/api/meals",
        (data) => {
          const selectedMeal = data.find((m) => String(m.mealId) === id);
          setMeal(selectedMeal || null);
        },
        "GET"
      );
    }
  }, [meal, id]);

  if (meal === undefined) {
    // Data is loading
    return <div>Loading...</div>;
  }

  if (meal === null) {
    // Meal not found
    return <ErrorPage />;
  }

  console.log(meal);
  

  return (
    <>
      <h1 className="text-center text-4xl my-8">{meal.mealName}</h1>

      <main className="flex justify-around text-center flex-col-reverse md:flex-row md:text-left bg-Secondary w-[100%] min-h-[80vh] p-4 pt-8">
        <div className="text-2xl my-8 md:max-w-96">
          <h2>Description</h2>
          <p className="text-base">{meal.mealDescription}</p>
          <br />

          <h2>Ingredients</h2>

          {meal &&
            meal.ingredients.map((ingredients) => (
              <p className=" text-base" key={ingredients.id}>
                {ingredients.name} - {ingredients.quantity}
              </p>
            ))}

          <br />

          <h2>Instructions</h2>
          <MealInstructions instructions={meal.mealInstructions}/>
        </div>

        <div className="flex flex-col w-60 min-h-60  my-6 self-center md:self-start">
          <img className="object-cover rounded-md h-60 mb-4"
            src={getImageForMeal(meal.mealName)}
            alt="Image of the food"
          />
          <div className="flex flex-row justify-between">
            <span className="flex flex-row ">
              <TimerIcon /> <p className="ml-2">{meal.mealPrepTime} min</p>
            </span>
            <span className="flex flex-row ">
              <RatingIcon/> <p className="ml-2">{meal.mealRating} / 5</p>
            </span>
          </div>
        </div>
      </main>
    </>
  );
}

export default Details;
