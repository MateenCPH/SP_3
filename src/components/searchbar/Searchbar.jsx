import { useState, useEffect } from "react";
import "./Searchbar.css";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allMeals, setAllMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const navigate = useNavigate();

  //https://meals.nerdshub.dk/api/meals

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("https://meals.nerdshub.dk/api/meals");
        const data = await response.json();
        setAllMeals(data);
      } catch (err) {
        console.err("Error fetching meals: ", err);
      }
    };

    fetchMeals();
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

  const handleMealClick = (mealId) => {
    navigate(`/details/${mealId}`)
  }

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
              <li key={meal.mealId} onClick={() => handleMealClick(meal.mealId)}>
                <img
                  src="https://img.freepik.com/free-photo/exploding-burger-with-vegetables-melted-cheese-black-background-generative-ai_157027-1751.jpg"
                  alt={`${meal.mealName} ${meal.mealDescription}`}
                />
                <span>
                  {meal.mealName} {meal.mealDescription}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
