import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import facade from "../util/apiFacade";
import DeleteFunc from "../components/Admin/DeleteFunc";
import EditFunc from "../components/Admin/EditFunc";
import CreateFunc from "../components/Admin/CreateFunc";

const Admin = ({ meals, setMeals, loggedIn }) => {
  const [selectCategory, setSelectCategory] = useState("meals");
  const [users, setUsers] = useState([]);
  const navi = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const options = facade.makeOptions("GET", true);
      const response = await fetch(
        "https://meals.nerdshub.dk/api/users",
        options
      );
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    function checkAccess() {
      if (!facade.hasUserAccess("admin", loggedIn)) {
        navi(`/`, { replace: true });
      }
    }
    checkAccess();
  }, [loggedIn]);

  const handleCategory = (e) => setSelectCategory(e.target.value);

  return (
    <>
      <h1 className="text-center text-4xl my-8">Admin Panel</h1>
      <div className="flex justify-between items-center my-4">
        {/* Dropdown */}
        <select
          onChange={handleCategory}
          name="display"
          id="selectCategory"
          className="bg-Theme p-2 text-Primary text-center rounded-md w-52"
        >
          <option className="bg-gray-800" value="meals">Meals</option>
          <option className="bg-gray-800" value="users">Users</option>
        </select>

        {/* Create Button (Aligned to the right) */}
        <CreateFunc setMeals={setMeals} />
      </div>

      <main>
        <div className="my-3 rounded-md w-full bg-Theme p-2">
          <table className="w-full bg-Theme">
            {selectCategory === "meals" ? (
              <>
                <thead>
                  <tr className="bg-Primary rounded-md gap-3">
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Meal</th>
                    <th className="p-2">Edit</th>
                    <th className="p-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {meals.map((meal) => (
                    <tr
                      key={meal.mealId}
                      className="gap-4 bg-Secondary p-4 m-4 even:bg-Primary"
                    >
                      <td className="p-2">{meal.mealId}</td>
                        <td className="p-2 hover:text-Theme underline">
                          <Link to={`/details/${meal.mealId}`}>
                            {meal.mealName}
                          </Link>
                        </td>
                      <td className="text-center p-2">
                        <EditFunc meal={meal} setMeals={setMeals} />
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
                <thead>
                  <tr className="bg-Primary rounded-md gap-3">
                    <th className="text-left p-2">Username</th>
                    <th className="text-left p-2">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={index}
                      className="gap-4 bg-Secondary p-4 m-4 even:bg-Primary"
                    >
                      <td className="p-2">{user.userName}</td>
                      <td className="p-2">
                        {user.roles && user.roles.length > 0
                          ? user.roles.map((role) => role.name).join(", ")
                          : "No roles"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </main>
    </>
  );
};

export default Admin;
