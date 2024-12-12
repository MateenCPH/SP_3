import Pensil from "../assets/Pensil";
import { useNavigate } from "react-router-dom";
import facade from "../util/apiFacade";

import React, { useState, useEffect } from 'react';
import DeleteFunc from "../components/Admin/DeleteFunc";


const Admin = ({ meals, setMeals, loggedIn }) => {
  const [selectCategory, setSelectCategory] = useState("meals");
  const users = [{id:1, username:"chad", role:"admin"}, {id:2, username:"gary", role:"user"}];
  const navi = useNavigate(); 
  



  const handleCategory = (e) => {
    setSelectCategory(e.target.value);
  }

  /* useEffect(() => {
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
    
      <select onChange={handleCategory} name="display" id="selectCategory" className="bg-Theme p-2 text-Primary text-center rounded-md w-52">
        <option value="meals">Meals</option>
        <option value="users">Users</option>
      </select>

      <main className="">
        <div className=" my-3 rounded-md w-full bg-Theme p-2">
          <table className="w-full bg-Theme">

            { selectCategory === "meals" ?
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
                  {meals && meals.map((meal) => (
                    <tr key={meal.mealId} className="gap-4 bg-Secondary p-4 m-4 even:bg-Primary">
                      <td className=" p-2">{meal.mealId}</td>
                      <td className=" p-2">{meal.mealName}</td>
                      <td className="text-center p-2">link</td>
                      <td className="text-center p-2"><button><Pensil /></button></td>
                      <td className="text-center p-2"><DeleteFunc mealId={meal.mealId} meals={meals} setMeals={ setMeals }/></td>
                    </tr>
                  ))}
                </tbody>
              </>
              :
              <>
                <thead className="rounded-md">
                  <tr className="bg-Primary rounded-md gap-3">
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Username</th>
                    <th className="text-left p-2">Role</th>
                    <th className=" p-2">Edit</th>
                    <th className=" p-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.map((user) => (
                    <tr key={user.id} className="gap-4 bg-Secondary p-4 m-4 even:bg-Primary">
                      <td className=" p-2">{user.id}</td>
                      <td className=" p-2">{user.username}</td>
                      <td className=" p-2">{user.role}</td>
                      <td className="text-center p-2"><button><Pensil /></button></td>
                      <td className="text-center p-2"><DeleteFunc /></td>
                    </tr>
                  ))}
                </tbody>
              </>
            }
          </table>
        </div>
          
        <div>

        </div>
      </main>
    </>
   );
}
 
export default Admin;
