import { useLocation } from "react-router-dom";
import { getImageForMeal } from "../components/MealsCard";

function Details() {
  const location = useLocation();
  const { meal } = location.state || {};

  return (
    <>
      {meal && meal.ingredients ? (
        <>
          <h1 className="text-center text-4xl my-8">{meal.mealName}</h1>

          <main className="flex justify-around text-center flex-col md:flex-row md:text-left bg-Secondary w-[100%] h-[80vh] p-4">
            <div className="text-2xl mb-8">
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
              <img
                className="md:w-[60vw] h-[30vh] object-cover rounded-sm"
                src={getImageForMeal(meal.mealName)}
                alt="Image of the food"
              />
            </div>
          </main>
        </>
      ) : (
        <>
          <h1 className="text-center text-4xl my-8 bg-Primary h-[2.25rem]"></h1>
          <main className=" bg-Secondary w-[100%] h-[80vh] p-4"></main>
        </>
      )}
    </>
  );
}

export default Details;
