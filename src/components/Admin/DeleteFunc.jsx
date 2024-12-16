import { useState } from "react";
import styled from "styled-components";
import TrashCan from "../../assets/icons/TrashCan";


// STYLES
const Dialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Box = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #00C010;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  margin: 5px;
  cursor: pointer;
  width: 100px;
  
  &:hover {
    background-color: #d87b2d;
  }
`;

const NoButton = styled(Button)`
  background-color: #f44336;
  
  &:hover {
    background-color: #d32f2f;
  }
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const DeleteFunc = ({ meals, setMeals, mealId }) => {
    const [showDialog, setShowDialog] = useState(false); // State to track whether to show the dialog
    const [mealToDelete, setMealToDelete] = useState(null); // State to store the meal object
    const URL = "https://meals.nerdshub.dk/api/meals";
    
    // Function to handle deletion after confirmation
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
                setShowDialog(false); // Hide the dialog after successful deletion
            })
            .catch((err) => {
                console.error("Error deleting meal:", err);
                setShowDialog(false); // Hide the dialog if there was an error
            });
    };

    // Handle click to show dialog and set the meal to be deleted
    const showDeleteDialog = (meal) => {
        setMealToDelete(meal);
        setShowDialog(true);
    };

    return (
        <div>
            {/* If showDialog is true, show the dialog */}
            {showDialog ? (
                <Dialog>
                    <Box>
                        <Title>Are you sure you want to delete {mealToDelete?.mealName}?</Title>
                        <div>
                            {/* "No" button with red background */}
                            <NoButton onClick={() => setShowDialog(false)}>No</NoButton>
                            {/* "Yes" button */}
                            <Button onClick={() => handleDelete(mealToDelete.mealId)}>Yes</Button>
                        </div>
                    </Box>
                </Dialog>
            ) : (
                <DeleteButton onClick={() => showDeleteDialog(meals.find(meal => meal.mealId === mealId))}>
                    <TrashCan />
                </DeleteButton>
            )}
        </div>
    );
};

export default DeleteFunc;
