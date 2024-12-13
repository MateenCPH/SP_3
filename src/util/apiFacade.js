const BASE_URL = "https://meals.nerdshub.dk/api/"
const LOGIN_ENDPOINT = "auth/login"
const REGISTER_ENDPOINT = "auth/register/"

function handleHttpErrors(res) {
if (!res.ok) {
  return Promise.reject({ status: res.status, fullError: res.json() })
}
return res.json()
}

function apiFacade() {

const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }
const getToken = () => {
  return localStorage.getItem('jwtToken')
}
const loggedIn = () => {
  const loggedIn = getToken() != null;
  return loggedIn;
}
const logout = () => {
  localStorage.removeItem("jwtToken");
}

const getUserRoles = () => {
    const token = getToken()
    if (token != null) {
        const payloadBase64 = getToken().split('.')[1]
        const decodedClaims = JSON.parse(window.atob(payloadBase64))
        const roles = decodedClaims.roles
        return roles
    } else return ""
}

// ------ Method to check user-roles --------    
const hasUserAccess = (neededRole, loggedIn) => {
    const roles = getUserRoles().split(',')
    return loggedIn && roles.includes(neededRole)
}

// ------ Login method --------     
const login = (user, password) => {

    const options = makeOptions("POST", false, {username: user, password: password });
    console.log('login: ', user, password)
    console.log('Options', JSON.stringify(options))
    return fetch(BASE_URL + LOGIN_ENDPOINT, options)
        .then(handleHttpErrors)
        .then(res => {setToken(res.token) })
 }

 // ------ Register method  for login --------  
 const register = (username, password) => {
  const options = makeOptions("POST", false, { username: username, password: password });
  return fetch(BASE_URL + REGISTER_ENDPOINT, options)
    .then(handleHttpErrors)
    .then(res => { 
      console.log('User registered successfully'); 
      return res;
    })
    .catch(err => {
      console.error("Registration failed:", err);
      throw err;
    });
}

// ------ Update meals in adminpage 
const updateMeal = (mealId, updatedMeal) => {
  const options = makeOptions("PUT", true, updatedMeal); 
  return fetch(`${BASE_URL}meals/${mealId}`, options)
    .then(handleHttpErrors)
    .then(res => res)
    .catch(err => {
      console.error("Error updating meal:", err);
      throw err;
    });
}


const makeOptions= (method,addToken,body) =>{
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      'Accept': 'application/json',
    }
  }
  if (addToken && loggedIn()) {
    opts.headers["Authorization"] = `Bearer ${getToken()}`;
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}
return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    hasUserAccess,
    register,
    updateMeal
}
}
const facade = apiFacade();
export default facade;
