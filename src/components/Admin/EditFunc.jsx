import React, { useState } from "react";
import AdminSafe from "../../assets/icons/AdminSafe";
import Pensil from "../../assets/icons/Pensil";
import facade from "../../util/apiFacade";

const EditFunc = ({ meal, setMeals }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    mealName: meal.mealName,
    mealDescription: meal.mealDescription,  
  });

  const openEditModal = () => {
    setIsModalOpen(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  const saveItem = (e) => {
    e.preventDefault();
    const updatedItem = { ...formData };

    facade
      .updateMeal(meal.mealId, updatedItem)
      .then((updatedMeal) => {
        setMeals((prevMeals) =>
          prevMeals.map((m) =>
            m.mealId === updatedMeal.mealId ? updatedMeal : m
          )
        );
        closeEditModal();
      })
      .catch((err) => {
        console.error("Failed to save item:", err);
      });
  };

  return (
    <>
      {/* Edit Button */}
      <button onClick={openEditModal}>
        <Pensil />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <>
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeEditModal} // Close modal if overlay is clicked
          ></div>

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
            <h2 className="text-2xl mb-4">Edit Meal</h2>

            <form onSubmit={saveItem}>
              <div className="mb-4">
                <label htmlFor="mealName" className="block mb-2">
                  Meal Name:
                </label>
                <input
                  type="text"
                  id="mealName"
                  value={formData.mealName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      mealName: e.target.value,
                    }))
                  }
                  className="w-full p-2 rounded-md bg-Secondary"
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      mealDescription: e.target.value,
                    }))
                  }
                  className="w-full p-2 rounded-md bg-Secondary"
                  required
                />
              </div>


              {/* Save and Cancel Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  Cancel
                </button>
                <button className="bg-[#00C010] rounded-md p-2" type="submit">
                  <AdminSafe />
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

export default EditFunc;
