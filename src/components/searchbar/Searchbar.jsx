import { useState, useEffect } from "react";
import "./Searchbar.css";
import { Link, useNavigate } from "react-router-dom";

function Searchbar({ meals }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [allMeals, setAllMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setAllMeals(meals);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMeals([]);
      return;
    } else {
      const filtered = allMeals.filter((meal) =>
        meal.mealName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMeals(filtered);
    }
  }, [searchTerm, allMeals]);

  const handleMealClick = () => {
    setSearchTerm("");
    setFilteredMeals([]);
  };

  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {/* input field with search suggestions */}
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for meals..."
          />
          {/* Search suggestions  */}
          <ul className="suggestions-list">
            {filteredMeals?.map((meal) => (
              <Link to={`/details/${meal.mealId}`} state={{ meal: meal }}>
                <li key={meal.mealId} onClick={handleMealClick}>
                  <img
                    src="https://img.freepik.com/free-photo/exploding-burger-with-vegetables-melted-cheese-black-background-generative-ai_157027-1751.jpg"
                    alt={`${meal.mealName} ${meal.mealDescription}`}
                  />
                  <span>
                    {meal.mealName} {meal.mealDescription}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
