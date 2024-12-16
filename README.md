# This is our version of McDonalds
  useEffect(() => {
    fetchData(
      "https://meals.nerdshub.dk/api/meals",
      (data) => {
        const selectedMeal = data.find((m) => String(m.mealId) === id);
        setMeal(selectedMeal || null);
      },
      "GET"
    );
  }, [id]);