import React, { useState } from "react";
import Puls from "../../assets/icons/Puls";

import facade from "../../util/apiFacade";

const CreateFunc = ({ setMeals }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    mealName: "",
    mealDescription: "",
    mealInstructions: "",
    mealPrepTime: "",
    mealRating: "",
    ingredients: [{ name: "", quantity: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const openCreateModal = () => {
    setIsModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsModalOpen(false);
    setFormData({
      mealName: "",
      mealDescription: "",
      mealInstructions: "",
      mealPrepTime: "",
      mealRating: "",
      ingredients: [{ name: "", quantity: "" }],
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const newIngredients = [...formData.ingredients];
    newIngredients[index][name] = value;
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "" }],
    }));
  };

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const createMeal = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    facade
      .createMeal(formData)
      .then((newMeal) => {
        setMeals((prevMeals) => [...prevMeals, newMeal]); // Add new meal
        closeCreateModal();
      })
      .catch((err) => {
        setError("Failed to create meal. Please try again.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {/* Create Button */}
      <button
        onClick={openCreateModal}
         className="bg-Theme text-white p-2 rounded-md hover:bg-red-700"
      >
        <Puls/>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <>
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeCreateModal}
          ></div>

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
              <h2 className="text-2xl mb-4">Create New Meal</h2>

              {loading && <p className="text-blue-500">Creating meal...</p>}
              {error && <p className="text-red-500">{error}</p>}

              <form onSubmit={createMeal}>
                {/* Meal Name */}
                <div className="mb-4">
                  <label htmlFor="mealName" className="block mb-2">
                    Meal Name:
                  </label>
                  <input
                    type="text"
                    id="mealName"
                    value={formData.mealName}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-md bg-gray-100"
                    required
                  />
                </div>

                {/* Meal Description */}
                <div className="mb-4">
                  <label htmlFor="mealDescription" className="block mb-2">
                    Meal Description:
                  </label>
                  <textarea
                    id="mealDescription"
                    value={formData.mealDescription}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-md bg-gray-100"
                    required
                  />
                </div>

                {/* Instructions */}
                <div className="mb-4">
                  <label htmlFor="mealInstructions" className="block mb-2">
                    Instructions:
                  </label>
                  <textarea
                    id="mealInstructions"
                    value={formData.mealInstructions}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-md bg-gray-100"
                    required
                  />
                </div>

                {/* Prep Time */}
                <div className="mb-4">
                  <label htmlFor="mealPrepTime" className="block mb-2">
                    Prep Time (minutes):
                  </label>
                  <input
                    type="number"
                    id="mealPrepTime"
                    value={formData.mealPrepTime}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-md bg-gray-100"
                    required
                  />
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <label htmlFor="mealRating" className="block mb-2">
                    Rating:
                  </label>
                  <input
                    type="number"
                    id="mealRating"
                    step="0.1"
                    max="5"
                    value={formData.mealRating}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-md bg-gray-100"
                    required
                  />
                </div>

                {/* Ingredients */}
                <div className="mb-4">
                  <label className="block mb-2">Ingredients:</label>
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={ingredient.name}
                        onChange={(e) => handleIngredientChange(index, e)}
                        className="p-2 rounded-md bg-gray-100 flex-1"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Quantity"
                        name="quantity"
                        value={ingredient.quantity}
                        onChange={(e) => handleIngredientChange(index, e)}
                        className="p-2 rounded-md bg-gray-100 flex-1"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="bg-red-500 text-white p-2 rounded-md"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addIngredient}
                    className="bg-blue-500 text-white p-2 rounded-md mt-2"
                  >
                    Add Ingredient
                  </button>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={closeCreateModal}
                    className="bg-red-500 text-white p-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#00C010] text-white p-2 rounded-md"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateFunc;
