import TrashCan from "../../assets/icons/TrashCan";

const DeleteFunc = ({meals, setMeals, mealId}) => {
    const URL = "https://meals.nerdshub.dk/api/meals";
    
    const handleDelete = (id) => {
        fetch(`${URL}/${id}`, { method: 'DELETE' })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.status === 204 ? null : res.json();
        })
        .then(() => {
            setMeals((prevMeals) =>
                prevMeals.filter((meal) => meal.mealId !== id)
            );
        })
        .catch((err) => {
            console.error("Error deleting meal:", err);
        });
  };
 
    return ( 
        <button onClick={() => handleDelete(mealId)}>
            <TrashCan />
        </button>
     );
}
 
export default DeleteFunc;