import { useLocation, useParams } from "react-router-dom";
import { getImageForMeal } from "../components/MealsCard";
import { useState, useEffect } from "react";
import { fetchData } from "../util/persistence";
import ErrorPage from "./ErrorPage";
import LoadingScreen from "../components/LoadingScreen";

function Details() {
  const { id } = useParams();
  const location = useLocation();
  const [meal, setMeal] = useState(location.state?.meal);
  const [loading, setLoading] = useState(!meal);

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

  return (
    <>
      <h1 className="text-center text-4xl my-8">{meal.mealName}</h1>

      <main className="flex justify-around text-center flex-col-reverse md:flex-row md:text-left bg-Secondary w-[100%] min-h-[80vh] p-4">
        <div className="text-2xl mb-8 md:max-w-[50vw]">
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
          <p className="text-base">{meal.mealInstructions}</p>
        </div>
        <div className="flex justify-center">
          <img className="w-60 h-60 object-cover rounded-md my-4"
            src={getImageForMeal(meal.mealName)}
            alt="Image of the food"
          />
        </div>
      </main>
    </>
  );
}

export default Details;
