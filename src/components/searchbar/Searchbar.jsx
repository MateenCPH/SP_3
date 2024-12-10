import { useState, useEffect, useRef } from "react";
import "./Searchbar.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  position: relative;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const Input = styled.input`
  border: none;
  height: 20px;
  padding: 5px;

  &:focus {
    outline: none;
  }
`;

const SuggestionsList = styled.ul`
  max-height: 300px;
  overflow-y: scroll;
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  background-color: #fff;
`;
const ListItem = styled.li`
  display: flex;
  align-items: start;
  gap: 10px;
  padding: 8px 10px;
  cursor: pointer;
  border-bottom: 2px solid #ccc;

  &:hover {
    background-color: #ccc;
  }

  img {
  margin-top: 8px;
  height: 20px;
    }
  }
`;

const MealName = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;

function Searchbar({ meals }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [allMeals, setAllMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const searchBoxRef = useRef(null);

  //Fetch meals from prop
  useEffect(() => {
    setAllMeals(meals);
  }, [meals]);

  //Function to close search bar when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setSearchTerm("");
        setFilteredMeals([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //Functtion for search
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

  //Function to close search bar when meal is clicked
  const handleMealClick = () => {
    setSearchTerm("");
    setFilteredMeals([]);
  };

  return (
    <Container ref={searchBoxRef}>
      <InputContainer>
        {/* input field with search suggestions */}
        <div>
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for meals..."
          />
          {/* Search suggestions  */}
          <SuggestionsList>
            {filteredMeals && filteredMeals.map((meal) => (
              <Link key={meal.mealId} to={`/details/${meal.mealId}`} state={{ meal: meal }}>
                <ListItem  onClick={handleMealClick}>
                  <img
                    src="https://img.freepik.com/free-photo/exploding-burger-with-vegetables-melted-cheese-black-background-generative-ai_157027-1751.jpg"
                    alt={`${meal.mealName} ${meal.mealDescription}`}
                  />
                  <span>
                    <MealName>{meal.mealName}</MealName>
                    <p>{meal.mealDescription}</p>
                  </span>
                </ListItem>
              </Link>
            ))}
          </SuggestionsList>
        </div>
      </InputContainer>
    </Container>
  );
}

export default Searchbar;
