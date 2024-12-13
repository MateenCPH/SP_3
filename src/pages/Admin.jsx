import Pensil from "../assets/icons/Pensil";
import { useNavigate } from "react-router-dom";
import facade from "../util/apiFacade";

import React, { useState, useEffect } from "react";
import DeleteFunc from "../components/Admin/DeleteFunc";
import AdminSafe from "../assets/AdminSafe";

const Admin = ({ meals, setMeals, loggedIn }) => {
  const [selectCategory, setSelectCategory] = useState("meals");
  const navi = useNavigate();

  const [users, setUsers] = useState([]);

  // ---------- EDIT ---------
  const [formData, setFormData] = useState({
    mealName: "",
    mealDescription: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const options = facade.makeOptions("GET", true);
      const response = await fetch(
        "https://meals.nerdshub.dk/api/users",
        options
      );
      console.log(response);
      const data = await response.json();
      setUsers(data);
      console.log(users);
    };
    fetchUsers();
  }, []);

  //-------- DROP DOWN MEALS / USERS -------
  const handleCategory = (e) => {
    setSelectCategory(e.target.value);
  };

  // ------------ EDIT ------------------
  const openEditModal = (meal) => {
    setSelectedItem(meal);
    setFormData({
      mealName: meal.mealName,
      mealDescription: meal.mealDescription,
    });
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const saveItem = (e) => {
    e.preventDefault();
    const updatedItem = { ...formData };

    facade
      .updateMeal(selectedItem.mealId, updatedItem)
      .then((updatedMeal) => {
        setMeals((prevMeals) =>
          prevMeals.map((meal) =>
            meal.mealId === updatedMeal.mealId ? updatedMeal : meal
          )
        );
        closeEditModal();
      })
      .catch((err) => {
        console.error("Failed to save item:", err);
      });
  };

  /*
     useEffect(() => {
    function checkAccess(){
      if(facade.hasUserAccess("admin", loggedIn)){
        return true;
      } else{
        return navi(`/`, {replace: true})
      }
    }
    checkAccess();
  }, [loggedIn]); */

  return (
    <>
      <h1 className="text-center text-4xl my-8">Admin Panel</h1>

      {/* --------- Dropdown for selecting between Users and Meals----------------- */}

      <select
        onChange={handleCategory}
        name="display"
        id="selectCategory"
        className="bg-Theme p-2 text-Primary text-center rounded-md w-52"
      >
        <option value="meals">Meals</option>
        <option value="users">Users</option>
      </select>

      <main className="">
        <div className=" my-3 rounded-md w-full bg-Theme p-2">
          <table className="w-full bg-Theme">
            {selectCategory === "meals" ? (
              <>
                <thead className="rounded-md">
                  <tr className="bg-Primary rounded-md gap-3">
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Meal</th>
                    <th className=" p-2">Page</th>
                    <th className=" p-2">Edit</th>
                    <th className=" p-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {meals &&
                    meals.map((meal) => (
                      <tr
                        key={meal.mealId}
                        className="gap-4 bg-Secondary p-4 m-4 even:bg-Primary"
                      >
                        <td className=" p-2">{meal.mealId}</td>
                        <td className=" p-2">{meal.mealName}</td>
                        <td className="text-center p-2">link</td>
                        <td className="text-center p-2">
                          <button onClick={() => openEditModal(meal)} >
                            <Pensil />
                          </button>
                        </td>
                        <td className="text-center p-2">
                          <DeleteFunc
                            mealId={meal.mealId}
                            meals={meals}
                            setMeals={setMeals}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </>
            ) : (
              <>
                <thead className="rounded-md">
                  <tr className="bg-Primary rounded-md gap-3">
                    <th className="text-left p-2">Username</th>
                    <th className="text-left p-2">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user, index) => (
                      <tr
                        key={index}
                        className="gap-4 bg-Secondary p-4 m-4 even:bg-Primary"
                      >
                        <td className="p-2">{user.userName}</td>

                        {/* Check if roles exists before mapping */}
                        {user.roles && user.roles.length > 0 ? (
                          <td className="p-2">
                            {user.roles
                              .map((role, index) => role.name)
                              .join(", ")}
                          </td>
                        ) : (
                          <td className="p-2">No roles</td>
                        )}                      
                      </tr>
                    ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </main>

      {/* --------------------------------- EDIT ----------------------- */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content bg-[#FFFFFF] p-4 rounded-md border-Theme border-[0.5rem] mt-7">
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
      )}
    </>
  );
};

export default Admin;
