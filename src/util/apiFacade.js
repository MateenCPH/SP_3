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

const hasUserAccess = (neededRole, loggedIn) => {
    const roles = getUserRoles().split(',')
    return loggedIn && roles.includes(neededRole)
}

   
const login = (user, password) => {

    const options = makeOptions("POST", false, {username: user, password: password });
    console.log('login: ', user, password)
    console.log('Options', JSON.stringify(options))
    return fetch(BASE_URL + LOGIN_ENDPOINT, options)
        .then(handleHttpErrors)
        .then(res => {setToken(res.token) })
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
    hasUserAccess
}
}
const facade = apiFacade();
export default facade;
