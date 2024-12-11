import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchLogo from "../assets/SearchLogo";
import Rating from "../assets/Rating";
import { getImageForMeal } from "./MealsCard";

const Container = styled.div`
  display: flex;
  position: relative;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const Input = styled.input`
  border: none;
  height: 20px;
  padding: 5px;
  width: 100%;

  @media (min-width: 400px) {
    width: 400px;
  }

  @media (max-width: 600px) {
    width: 100%;
  }

  &:focus {
    outline: none;
  }
`;

const SuggestionsList = styled.ul`
  max-height: 300px;
  overflow-y: scroll;
  list-style: none;
  padding: 0;
  margin-top: 7px;
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
`;

const MealName = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;

const MealDescription = styled.p``;

const MealRating = styled.p`
  display: flex;
  flex-direction: row;
  color: #f09136;
`;

const Span = styled.span`
  display: flex;
  flex-direction: column;
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
        <SearchLogo />
        <div>
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for meals..."
          />
          {/* Search suggestions  */}
          <SuggestionsList>
            {filteredMeals &&
              filteredMeals.map((meal) => (
                <Link
                  key={meal.mealId}
                  to={`/details/${meal.mealId}`}
                  state={{ meal: meal }}
                >
                  <ListItem onClick={handleMealClick}>
                    <img className=""
                      src={getImageForMeal(meal.mealName)}
                      alt={`${meal.mealName} ${meal.mealDescription}`}
                    />
                    <Span>
                      <MealName>{meal.mealName}</MealName>
                      <MealDescription>{meal.mealDescription}</MealDescription>
                      <MealRating>
                        {meal.mealRating} <Rating />
                      </MealRating>
                    </Span>
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
