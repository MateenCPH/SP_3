import { Link } from "react-router-dom";
import Timer from "../assets/Timer.jsx";
import Rating from "../assets/Rating.jsx";

//Small in-app database for images
export const mealImages = {
  "Chocolate Cake":
    "https://thumbs.dreamstime.com/b/delicious-chocolate-cake-dark-background-d-rendering-d-illustration-ai-generated-ai-generated-design-instagram-facebook-290091425.jpg",
  "Beef Stroganoff":
    "https://img.freepik.com/premium-photo/steak-with-herbs-it-words-steak-bottom_771335-55771.jpg",
  "Chicken Caesar Salad":
    "https://img.freepik.com/premium-photo/chicken-caesar-salad-with-croutons-generative-ai_431161-15907.jpg",
  "Vegetable Stir-fry":
    "https://img.freepik.com/premium-photo/wok-cooking-fresh-stir-fry-vegetables-generative-ai_601748-45537.jpg",
  "Margherita Pizza":
    "https://cdn.pixabay.com/photo/2024/04/21/18/44/ai-generated-8711272_1280.jpg",
  "Spaghetti Bolognese":
    "https://img.freepik.com/premium-photo/plate-spaghetti-with-berries-spoon-table_1169327-189589.jpg",
  "Grilled Salmon":
    "https://img.freepik.com/premium-photo/grilled-salmon-fish-piece-with-salt-spices-vegetables-ai-generated_1020331-18951.jpg",
};

//Function to get image for meal name
export const getImageForMeal = (name) =>
  mealImages[name] ||
  "https://img.freepik.com/premium-photo/healthy-food-dish-photography-delicious-nutritious-meals-created-with-generative-ai_115122-5751.jpg";

const MealsCard = ({ meal }) => {
  return meal ? (
    <>
      <Link to={`/details/${meal.mealId}`} state={{ meal: meal }}>
        <div className="flex flex-col justify-between rounded-md bg-Secondary text-black w-80 h-40 p-3">
          <div className="flex flex-row justify-between">
            <div>
              <div className="text-3xl overflow-ellipsis">{meal.mealName}</div>
              <div className="overflow-ellipsis">A very delicious burger</div>
            </div>
            <img
              className="w-20 h-20 object-cover object-center rounded-md"
              src={getImageForMeal(meal.mealName)}
              alt={meal.mealName}
            />
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <Timer />
              {meal.mealPrepTime} min
            </div>

            <div className="flex flex-row gap-2">
              <Rating />
              {meal.mealRating}
            </div>
          </div>
        </div>
      </Link>
    </>
  ) : (
    <div className="flex flex-col justify-between rounded-md bg-Secondary text-black w-80 h-40 p-3"></div>
  );
};

export default MealsCard;
