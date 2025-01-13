// --------------------------------------------------- Question 1 -----------------------------------------------------------------------
/* 
-------JS-----------
What are higher-order functions in JavaScript and what are the benefits? Show some examples in your own code.

  HOF = Pitstop 
Car = Function that needs change or full
change = create or returns something new 
full = update data 

(show app.jsx = useEffect and fetchData)

*/

// The Higher-Order Function: Pit Stop
function pitStop(service) {
  console.log("Car is entering the pit stop...");
  service(); // The HOF "uses" the function you pass in
  console.log("Car is leaving the pit stop...");
}

// A service to "refuel" the car
function refuel() {
  console.log("Refueling the car...");
}

// A service to "change the tires"
function changeTires() {
  console.log("Changing the tires...");
}

// Call the HOF (Pit Stop) with different "services"
pitStop(refuel); // Send the car to refuel
pitStop(changeTires); // Send the car to get new tires


// ---------------------------------------------------
/* 
REACT
What is the main concept of a React component? Show and explain in your own code.
  Explain the benefits of using components compared to how you would build a web application in vanilla JavaScript.

  React components are like classes in Java, breaking down code into smaller, self-contained pieces that manage their own state and logic.
  Benefits:
  - Reusable UI elements/components
  - Helps manage different parts of UI like Header, AdminPage, and SearchBar
  - Keeps the main App.jsx clean, readable, and avoids it from getting too long (over 200 lines)

*/

// ---------------------------------------------------
/* 
Security/Routing/Styling
Explain what React-Router is and which problems it solves?
Show and explain the essential building blocks like BrowserRouter, Routes, Route, Outlet, path, element, errorElement, useNavigate, etc.

  In traditional multi-page applications, every link click triggers a new server request.
  React-Router solves this by loading everything once and routing in the browser, reducing server load and speeding up navigation.
*/

<Router> {/* BrowserRouter = Router*/}
{/* BrowserRouter is the GPS for the app, keeping track of the current location*/}
  <Routes>
    {/* Route is the destination; this will show the Homepage component when the path is '/' */}
    <Route
      path="/" 
      element={<Homepage meals={meals} />}  // The content shown at this route
      errorElement={<ErrorPage />}  // The fallback page if an error occurs while loading the route
    />
    {/* Example of another route */}
    <Route 
      path="/about" 
      element={<About />} 
    />
    {/* You can add more routes as needed */}
  </Routes>
</Router>



//BrowserRouter: The GPS that tracks your location.
//Routes: The paths users can take.
//Route: The destination shown when a path is visited.
//element: The content that appears at a route.
// useNavigate: Helps you programmatically change the route.

// --------------------------------------------------- Question 2 -----------------------------------------------------------------------
/*
JS
Show some examples where you used a higher-order function (that takes a callback function as an argument). Explain the benefits of doing that.
  - See Question 1, Answer 1
*/

// ---------------------------------------------------
/* 
REACT
What is JSX? Provide an example.
How would you write the same functionality using only JavaScript, HTML, and DOM manipulation?

JSX:

<Input
placeholder="User Name"
type="text"
id="username"
onChange={onChange}
value={loginCredentials.username}
/>

Using React.createElement:

React.createElement('input', {
placeholder: 'User Name',
type: 'text',
id: 'username',
onChange: onChange, // Attach the onChange function
value: loginCredentials.username, // Bind the value to state
});

Vanilla JavaScript + HTML:

<div id="root"></div>

<script>
const form = document.createElement('form');
form.onsubmit = (e) => {
  e.preventDefault();
  console.log('Form submitted!');
};

const usernameInput = document.createElement('input');
usernameInput.type = 'text';
usernameInput.id = 'username';
usernameInput.placeholder = 'User Name';
form.appendChild(usernameInput);
</script>
*/

// ---------------------------------------------------
/* 
Security/Routing/Styling
Describe the purpose of flexbox and grid in CSS, and show some examples of what can be achieved by applying them.



Flexbox: Align items in a row/column (e.g., navbar, buttons, cards).
Flexbox is great for aligning items in rows/ column and for distributing space within a container.


Grid: For complex layouts, like dashboards.
CSS Grid is more powerful for creating complex grid structures, allowing you to control both rows and columns.
*/

//Flexbox is ideal for simpler, linear arrangements = 1-dimensional layouts 
  const Flex = styled.div`
  flex: 1;  // Responsively grows to fill available space
  display: flex;  // Turns div into a flex container
  // could also say "display: grid" 

  justify-content: center;  // Horizontal axis
  align-items: center;  // Vertical axis
  `;
  

  // or with grid 
 // Grid is more powerful for complex, multi-axis layouts =  2-dimensional layouts
  const Gird = styled.div`
  display: grid;  // Turns div into a grid container
  place-items: center;  // This is shorthand for both justify-items and align-items, centering content both horizontally and vertically
`;



// --------------------------------------------------- Question 3 -----------------------------------------------------------------------
/*
JS
What is the purpose of the package.json file and what can you do with it?

  - Contains dependencies, configurations, and scripts/tasks for the project.
  - Similar to Maven’s pom.xml, but focused mainly on JavaScript-related tasks.

*/

// ---------------------------------------------------
/* 
REACT
Show and describe the purpose of props including children.
Show and explain the role of state in a React component.

  Props: Transfer data from parent to child components.
  State: Manage,safe and update data inside a components lifecycle. 

  Pupose: 
  - Data Sharing:
  - Avoiding Redundancy: Only maintaini one plas with "lifting" like in java 
  - avoid duplicating

  // Parent component
  function App() {
    return (
      <div>
        <Greeting name="John" age={30} />
      </div>
  );

  // Child component
  function Greeting(props) {
    return (
      <div>
        <h1>Hello, {props.name}!</h1>
        <p>You are {props.age} years old.</p>
      </div>
    );
  }

State example:
const [meals, setMeals] = useState([]);
*/

// ---------------------------------------------------
/* 
Security/Routing/Styling
Describe conceptually how we deploy a React frontend application to the Caddy server through the CI/CD pipeline.

  - Push code to GitHub: Trigger an automatic pipeline in GitHub Actions.
  - The pipeline runs a command like `npm run dev` to create ready-to-use files (HTML, CSS, JavaScript).
  - Docker packages the app, uploads it to Docker Hub.
  - WatchTower pulls the latest image from Docker Hub and runs it.
  - Caddy serves the app, handling HTTPS and static files.

  GitHub Actions: Automates build, test, and deployment.
  Docker: Packages the app consistently across environments.
  WatchTower: Keeps the app up-to-date without downtime.
  Caddy: Serves the app files and manages secure communication.
*/

// --------------------------------------------------- Question 4 -----------------------------------------------------------------------
/*
JS
Show and explain the concept of promises in JavaScript.
  Promise states:
  - Pending: The task is still running.
  - Fulfilled (Resolved): The task completed successfully and returns a result.
  - Rejected: The task failed.

Example of a promise-based login:
const login = (user, pass) => {
facade
  .login(user, pass) // This is the Promise
  .then(() => {
    setLoggedIn(true); // Success: Logged in
    setUsername(user); // Set username for session
    setErrorMessage(""); // Clear previous errors
    navigate("/"); // Redirect to home page
  })
  .catch((err) => {
    // If login fails, show error
    const errorMsg = err.message || "Invalid credentials.";
    setErrorMessage(errorMsg); // Set error message
  });
};
*/

// ---------------------------------------------------
/* 
REACT
How do you handle errors (HTTP or JS errors) in React? Show examples in your own code.

  Handle errors using try-catch for HTTP requests and form submissions. Style error messages as needed (e.g., login and signup).
*/

// ---------------------------------------------------
/*
Security/Routing/Styling
What is the purpose of Caddy? Explain how we use it in our deployment pipeline.

  Caddy acts as a reverse proxy between the user and the backend/frontend.
  It serves static files, handles HTTPS, and ensures secure communication.
  Caddy can also reverse proxy to backend services, like APIs, without exposing them directly.

  Example Caddy configuration:
  hotel.showcode.dk {
    reverse_proxy hotelAPI:7070
  }
*/

// --------------------------------------------------- Question 5 -----------------------------------------------------------------------
/*
JS
Show the difference between synchronous and asynchronous programming and how does async and await fit into this?

  Synchronous: Executes tasks one by one.
  Asynchronous: Tasks can run in the background, allowing the rest of the program to continue.

  ADMIN- pages: 

Example of Async/Await in React (fetching data):
useEffect(() => {
const fetchUsers = async () => {
  const options = facade.makeOptions("GET", true);
  const response = await fetch("https://meals.nerdshub.dk/api/users", options);
  const data = await response.json();
  setUsers(data);
};
fetchUsers();
}, []);
*/

// ---------------------------------------------------
/* 
REACT
Provide examples for different ways of doing conditional rendering.

  Example: Render only if the user is logged in as an admin:
  {facade.hasUserAccess("admin", loggedIn) && (
    // Render AdminPage if the user is an admin
  )}

  - Or: 

  {loggedIn ? (
  <div>Welcome back, {username}!</div>
) : (
  <div>Please log in to access the content.</div>
)}
  // if you have loged in or not 

  // or "conditional rendering" in admin-page when you "click" on something to open a new window 


*/

// ---------------------------------------------------
/* 
Security/Routing/Styling
Show and explain conceptually a typical flow of using JWTs for user authentication in a React application.

  1. User logs in.
  2. Token is received and stored.
  3. User accesses protected routes with token in request header.
  4. Backend verifies the token and returns data.
  5. User logs out, and token is removed.

  JWT Flow Diagram:
  +-------------------+    +--------------------+    +-------------------+
  | User Navigates to  | --> | User Enters        | -->| Form Submission   |
  | Login Page         |     | Credentials        |    | (performLogin)     |
  +-------------------+    +--------------------+    +-------------------+
             |                      |                       |
             v                      v                       v
  +-------------------+    +--------------------+    +-------------------+
  | API Call to /auth/login | | Backend Verifies  |    | Store JWT Token  |
  +-------------------+    | Credentials        |    | in localStorage  |
             |                      |                       |
             v                      v                       v
  +-------------------+    +--------------------+    +-------------------+
  | Successful Login   |    | Redirect to Homepage|    | Display Error if  |
  | (setLoggedIn=true) |    | or Display Error    |    | Login Failed      |
  +-------------------+    +--------------------+    +-------------------+
             |                      |                       |
             v                      v                       v
  +-------------------+    +--------------------+    +-------------------+
  | User Access Admin |    | Protected Routes   |    | Conditional Rendering |
  | Page (with JWT)   |    | (e.g., /admin)     |    | (admin link only for  |
  |                   |    | based on roles)    |    | admin role)          |
  +-------------------+    +--------------------+    +-------------------+
*/

// --------------------------------------------------- Question 6 -----------------------------------------------------------------------
/*
JS
What is the difference between localStorage and sessionStorage in JavaScript?
Show the use of different storage options in browsers developer tools.

  - LocalStorage: Persists even after the browser is closed and reopened. Ideal for long-term data storage.
  - SessionStorage: Data is cleared once the session ends (e.g., tab closed).
*/

// ---------------------------------------------------
/* 
REACT
Show and explain the useEffect hook (callback, dependency array, etc.)

  UseEffect allows you to run code after rendering. You can trigger actions when specific variables change.

  - Run once after render with [] (empty dependency array).
  - Run when dependencies change with [dep1, dep2].

Example:
useEffect(() => {
fetchData("https://meals.nerdshub.dk/api/meals", setMeals, "GET");
}, [setMeals]); // It could be [] because setMeals is guaranteed by React to not change
*/

// ---------------------------------------------------
/*
Security/Routing/Styling
Show and explain the different parts of a JWT token.

  Tokens are used to verify the identity of a user and grant access to resources.

  Example Token:
  eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTYW5kZXIiLCJzdWIiOiJTYW5kZXIiLCJleHAiOjE3MzYyNjc1MzQsInJvbGVzIjoiYWRtaW4iLCJ1c2VybmFtZSI6IlNhbmRlciJ9.musEJg8X2OhCd2AfPI7tF_qIDNkxg6espDsaDZU8LuQ

  3 parts: Header, Payload, Signature
  Header: Describes the algorithm used to sign the token.
  Payload: Contains claims (information) such as the user ID or expiration time.
  Signature: Used to verify that the token was not tampered with.


--Header-info: 
  "alg": "HS256"

  
--Payload info: 
  "iss": "Sander",
  "sub": "Sander",
  "exp": 1736267534,
  "roles": "admin",
  "username": "Sander"


--Signature info: 
  HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload)

*/

// --------------------------------------------------- Question 7 -----------------------------------------------------------------------

/*
JS
Show an example of DOM manipulation in JavaScript.

  Analogy, whats a DOM: 

  HTML: (Blueprint/Layout): Like an architect's blueprint, HTML defines the structure of the house — the rooms, walls, windows, and doors.
  CSS: (Styling): CSS is like the paint, wallpaper, and furniture that make the house look beautiful and customized.
  DOM: (Setup/Interactive Framework): The DOM is like the wiring and plumbing that allow you to interact with the house dynamically — 
  turning lights on and off (changing styles), adding or removing furniture (elements), and responding to actions like pressing buttons (events).

  DOM : when we load a webpage, HTML is loaded in a tree-like structure we call "DOM"
  Document
└── html
    └── body
        ├── h1
        │   └── "Hello, World!"
        └── p
            └── "This is a paragraph."



  Traditional DOM methods : getElementById, document.createElement
     


<body>
  <h1 id="title">Hello, World!</h1>
  <script>

    // Select the element by ID
    const title = document.getElementById("title");

    // Change its text content
    title.textContent = "Hello, DOM!";

  </script>
</body>

  The getElementById method selects the <h1> element with the ID title.
  The textContent property is used to update the text inside the <h1> element to "Hello, DOM!

  ADMINPAGE :  CREATE, ADD, DELETE - DOM manipulation



*/

// ---------------------------------------------------
/*
REACT
Show and describe event handling in React (eg. onClick, onChange, onSubmit etc.)
Show examples of how to handle form submit events

  onChange fomr login-page: updates when the user types into an input field.

  const onChange = (evt) => { Updates when something new is typed in the filed. 
  setLoginCredentials({ updates loginCredentials
    ...loginCredentials,
    [evt.target.id]: evt.target.value :  gives the ID and current value of the input
  });


  onSubmit from login-page: when the login form is submitted form the "login-button"

  const performLogin = (evt) => {
  evt.preventDefault();             Prevents the page from reloading aka "default behavior"
  login(loginCredentials.username, loginCredentials.password);    calls login with the current username and password.


  onClick on my button form login-page:   
  <Button type="submit">Login</Button>  When the button is clicked, the form's onSubmit handler (performLogin) is executed.

  look adminpage: delete if more "onClick"

*/

// ---------------------------------------------------
/*
Security/Routing/Styling
Describe and show the login process using JWT

+------------------------+      +-------------------------+      +--------------------------+
| 1. User Enters Username |      | 2. User Submits Form    |      | 3. performLogin() Function|
|    and Password        |      |    (Calls performLogin) |      |    Calls login() from     |
+------------------------+      +-------------------------+      |    Facade                |
        |                               |                          +--------------------------+
        v                               v                                       |
+------------------------+      +-------------------------+                     v
| 4. login() Calls API   |      | 5. API Call to Backend  |        +----------------------------+
|    (POST /auth/login)  |      |    (Sends username &    |        | 6. Backend Verifies        |
+------------------------+      |    password for auth)   |        |    Credentials             |
        |                               |                          +----------------------------+
        v                               v                                       |
+------------------------+      +-------------------------+                     v
| 7. JWT Returned if     |      | 8. Save JWT in Local    |        +----------------------------+
|    Credentials are     |      |    Storage              |        | 9. Redirect to Homepage    |
|    Valid               |      +-------------------------+        |    (Navigate)              |
+------------------------+                      |                     +----------------------------+
        |                                      |
        v                                      v
+------------------------+               +--------------------------+
| 10. If Error: Display  |               | 11. Display Error        |
|     Error Message      |               |     Message (e.g.,       |
|     (Invalid           |               |     Invalid Credentials) |
|     Credentials)       |               +--------------------------+
+------------------------+



*/

// --------------------------------------------------- Question 8 -----------------------------------------------------------------------
/*
JS
Show and explain the concept of event bubbling in JavaScript.

The event starts at the "7" button (child element).
It bubbles up to the #buttons container (parent).
The number "7" is added to the display element's innerHTML.

*/

<div id="container">

        <div id="display" class="t4"></div>

        <div id="buttons">

          <div class="t1">7</div>

          <div id="calculate" class="t1">=</div>

      </div>

    </div>

    
// ---------------------------------------------------

/*
REACT
Show and explain how the map function is used for rendering lists in React and explain the purpose of the key attribute in React lists?

Map funtion is a build-in method in JavaScript that can be used to run through a arrays to transfrom the data to
JSX elemets. Each element in the array is processed, and you can return a React component for each item.
*/

// Homepage:  
// Meals is passed down with a list of diff meals 

{meals && Object.values(meals).map((meal) => (  // Object.values(meals) is used to convert a meal into an array of values 
                                                // Map funtion loops over every meal in the array and makes a "mealcard" for eatch meal 
                                                // the key-attribute helps react keep track of individual elements in that array                                           
  <MealsCard key={meal.mealId} meal={meal} />   // Key makes sure react can identify the uniquely mealId

// without key it would just be return as one big list and not as unique meals and we wound.t be abel to make unique mealcards

))}

// ---------------------------------------------------
/*
Security/Routing/Styling
Describe conceptually what HTTPS is and how we got it working on our deployed websites.

In summary, HTTPS is the secure version of HTTP that encrypts data and authenticates the identity of the server. 
To get HTTPS working on a deployed website, you need to obtain an SSL/TLS certificate, install it on your server, configure the server to use HTTPS, and ensure that all HTTP traffic is redirected to HTTPS. 
This ensures a secure and trusted connection for users visiting your website

*/

// --------------------------------------------------- Question 9 -----------------------------------------------------------------------

/*
JS
What is the scope of a variable in JavaScript? Explain the difference between global and local scope.

  Global Scope: In JavaScript, a variable declared outside any function is global and accessible from anywhere.
  Local Scope: A variable declared inside a function or block is local to that function/block and can't be accessed outside.  
*/

// ---------------------------------------------------
/*
REACT
Show and explain how controlled components are different from uncontrolled components in React forms?

  Controlled components: This are elements/ components where there value is stored in a react state and can only be updated- 
  through a React event handler. 
  Login-page has controlled components bec od the <input> tag and can only be updated bec of the event handler

*/
  <Input
  placeholder="User Name"
  type="text"
  id="username"
  onChange={onChange}
  value={loginCredentials.username}
  />
  //The input fields (username and password) are controlled by React state (loginCredentials).

  //If we had made it an uncontrolled component it would like this: 

/*

  Uncontrolled: we use useRef and we only "read" the data when we need it. There the "controlled components" keeps watchs to check 
  if somthing changes. The uncontrolled dont and only reads them when we need the data.

   <form onSubmit={performLogin}>
      <input
        ref={usernameRef}             // Use ref to access this input element
        placeholder="User Name"
        type="text"
      />
      <input
        ref={passwordRef}           // Use ref to access this input element
        placeholder="Password"
        type="password"
      />
      <button type="submit">Login</button>
    </form>

*/

// ---------------------------------------------------
/*
Security/Routing/Styling
Show and explain an example of sub-routing.

A sub-route is a route that's defined via parent route like this: 

From - routeDemo: 

<Route index element={<Home/>} />
<Route path='/about' element={<About/>} />
<Route path='/serivces' element={<Serivces/>} />
<Route path='/contact' element={<Contact/>} />

All of my "sub-routes/ child routes " rendered  with the "homelayout" component 

if we made "tabs" or differents pages under/in admin-page we would also make new "sub-routes"
  - may need "OUTLET" if that's the case. 

*/


// --------------------------------------------------- Question 10 -----------------------------------------------------------------------

/*
JS
Show and explain the spread operator in JavaScript and how it differs from the rest operator?

  Spread operator (...) is used to spread or "unpack" values from arrays or objects.

  Rest operator (...) is used to gather multiple values into an array or object.



  function showSpreadAndRest(a, b, ...rest) {
    console.log('a:', a);       
    console.log('b:', b);       
    console.log('rest:', rest);  
}

const nums = [1, 2, 3, 4, 5];

the spread-operator takes the array nums and spreads them into individual arguments 
nums = [1, 2, 3, 4, 5] = 1, 2, 3, 4, 5.


// Spread operator in function call
showSpreadAndRest(...nums); // output = a: 1, b: 2, rest: [3, 4, 5]

// Rest operator in function parameter
showSpreadAndRest(10, 20, 30, 40, 50); // output= a: 10, b: 20, rest: [30, 40, 50]


- Spreads [1, 2, 3, 4, 5] into 1, 2, 3, 4, 5.

- Gathers 30, 40, 50 into [30, 40, 50].

*/

// ---------------------------------------------------
/*
What are React Hooks? Provide examples of at least two built-in hooks.

What are React Hooks: 

   - A React Hook is a special funtion / funtions that let's you "Hook into" React's features in a functional components

    - (functional components are simple JavaScript functions that return React elements:
    function Greeting(props) {
    return <h1>Hello, {props.name}!</h1>;

Build in Hooks: useState, useEffect and useRef 

  useState: useState is a hook that allows you to add a "state/ manage  state" to a functional components:
  from log-in:  
*/

//function Login({ errorMessage, setErrorMessage, loggedIn, setLoggedIn, setUsername }) 
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
// useing the "useState-hook", we can easily manage and update the loginCredentials state.
// we use this hook to update the users loginCredentials via setLoginCredentials 

//useEffect is used to perfrom side-effect in functional components like fetching data from a api. 
  // form app.jsx 

useEffect(() => {
  fetchData("https://meals.nerdshub.dk/api/meals", setMeals, "GET");
}, [setMeals]);
// This hook is used to fatch data form the api when the "component" renders and then updates the state "setMeals"

/*
you say that useState is "kinda" used to create variables in a functional component that you can update. 
UseEffect is used to handle "side effects" and ensures they run when needed or stay in sync with your component 

Corrected Statement:
useRef is a hook that allows you to persist values across renders without causing the component to re-render.

You can use it to store values that don't need to update the UI (i.e., values that don't need to trigger a re-render when they change).
*/

// ---------------------------------------------------
/*
Show example of how you handle errors in React.

  In our code, we use try-catch to most of our error-handling and small components to error-msg with styleing 

  this is taking form our login-page :
*/ 

const login = (user, pass) => {
  facade
    .login(user, pass)  // Give the username and password to the loging methoed 
    .then(() => {   // if everything is good, we login 
      setLoggedIn(true);
      setUsername(user);
      setErrorMessage("")
      navigate("/")
    })
    .catch((err) => { // if something is wrong, we give an error-msg 
      /* console.error("Login failed:", err); */
      const errorMsg = err.message || "Invalid credentials. Please try again."
      setErrorMessage(errorMsg);
    });
};

/*
 return (
    <>
      <Container>
        <LeftSide>
          <img className="rounded-md" src={Logo} />
        </LeftSide>
        <RightSide>
          <Title>Welcome to SMM-Cooking</Title>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}   // the catch the error and show it of the top of the page 

*/

// ---------------------------------------------------
/*
Security/Routing/Styling
Describe conceptually what Same Origin Policy (SOP) and Cross Origin Ressource Sharing (CORS) are
and how we avoid getting CORS errors when fetching data from your API.

  Same-Origin Policy (SOP) : SOP is a security rule/rules that keeps websites from interacting with each other unless they are from the same origin.
  Cross Origin Ressource Sharing: CORS is the mechanism that lets servers define who can access their resources from different origins, ensuring safe cross-origin communication.

  origin: 
    - protocol 
    - domain 
    - port


How we avoid getting CORS errors when fetching data from your API: 

  In the backend on our api we have this code: (intellij)

   private static void corsHeadersOptions(Context ctx) {
        ctx.header("Access-Control-Allow-Origin", "*");
        ctx.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        ctx.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        ctx.header("Access-Control-Allow-Credentials", "true");
        ctx.status(204);
    }

  This method is responsible for setting the necessary CORS headers in the HTTP response to allow cross-origin requests from any domain (this is done by setting
  This is what allows react to access the backend without CORS errors  
  

*/

// --------------------------------------------------- Question 11 -----------------------------------------------------------------------

/*
JS
Show and explain the difference between synchronous and asynchronous programming and how async and await fit into this?

 - SEE QUESTION 5 NR.1 

*/

// ---------------------------------------------------
/*
REACT
Show and explain the purpose of lifting state up in React.

If you have a state in one child component and want to share it with another child, you "lift" that state up to the Parent component.
The Parent then holds the state and can pass it down to both children via props.

  - Look at app.jsx, there we take states like (loggedIn, setLoggedIn, and setUsername) and pass it down to 
  multiple child components like Header, Login

  (DONT WANNA COPY EVERYTHING FORM app.jsx)


*/ 

// ---------------------------------------------------

// Show how you can use flexbox in Styled-Components.

 const RightSide = styled.div`  // changed name bec of question 2

  flex: 1;  // Responsively grows to fill available space
  display: flex;  // Turns div into a flex container
  justify-content: center;  // Horizontal axis
  align-items: center;  // Vertical axis
  `;

  // --------------------------------------------------- Question 12 -----------------------------------------------------------------------

/*
  JS
Show and explain the concept of promises in JavaScript.

  -LOOK AT QUESTION 4 JS nr.1 

*/

// ---------------------------------------------------
/*
REACT
Provide examples for different ways of doing conditional rendering.

  -LOOK AT QUESTION 5 REACT nr.2 

*/

// ---------------------------------------------------
/*
Describe the purpose of flexbox and grid in css, and show some examples of what can be achieved by applying them.

   LOOK AT QUESTION 2 nr. 3 Security/Routing/Styling

*/

// --------------------------------------------------- Question 13 -----------------------------------------------------------------------

/*
JS
What are higher-order functions in JavaScript and what are the benefits? Show some examples in your own code

  - LOOK AT QUESTION 1 nr.1 JS 
*/

// ---------------------------------------------------

/*
REACT
Show and describe the purpose of props including children.
Show and explain the role of state in a React component.

 - LOOK AT QUESTION 3 nr.2 

*/

// ---------------------------------------------------

/*
Security/Routing/Styling
Describe and show the login process using JWT.

Login Process Flow for our program: 
  +-------------------+    +--------------------+    +-------------------+
  | User Enters       |    | User Submits Form  |    | performLogin()     |
  | Username and      |    | (calls performLogin)|    | Function Calls     |
  | Password          |    | Function            |    | login() from Facade|
  +-------------------+    +--------------------+    +-------------------+
             |                      |                       |
             v                      v                       v
  +-------------------+    +--------------------+    +-------------------+
  | login() Calls     |    | API Call to Backend|    | Backend Verifies   |
  | API (POST /auth/login)|  | (send username and  |    | Credentials        |
  +-------------------+    | password for auth)  |    +-------------------+
             |                      |                       |
             v                      v                       v
  +-------------------+    +--------------------+    +-------------------+
  | JWT Returned if   |    | Save JWT in Local  |    | Redirect to       |
  | Credentials are   |    | Storage            |    | Homepage (navigate)|
  | Valid             |    |                    |    +-------------------+
  +-------------------+    +--------------------+               |
             |                                                |
             v                                                v
  +-------------------+                                    +-------------------+
  | If Error: Display |                                    | Display Error     |
  | Error Message     |                                    | Message (e.g.,     |
  | (Invalid Credentials)|                                  | Invalid Credentials)|
  +-------------------+                                    +-------------------+



  JWT Flow Diagram: Generally
  +-------------------+    +--------------------+    +-------------------+
  | User Navigates to  |    | User Enters        |    | Form Submission   |
  | Login Page         |    | Credentials        |    | (performLogin)     |
  +-------------------+    +--------------------+    +-------------------+
             |                      |                       |
             v                      v                       v
  +-------------------+    +--------------------+    +-------------------+
  | API Call to /auth/login | | Backend Verifies  |    | Store JWT Token  |
  +-------------------+    | Credentials        |    | in localStorage  |
             |                      |                       |
             v                      v                       v
  +-------------------+    +--------------------+    +-------------------+
  | Successful Login   |    | Redirect to Homepage|    | Display Error if  |
  | (setLoggedIn=true) |    | or Display Error    |    | Login Failed      |
  +-------------------+    +--------------------+    +-------------------+
             |                      |                       |
             v                      v                       v
  +-------------------+    +--------------------+    +-------------------+
  | User Access Admin |    | Protected Routes   |    | Conditional Rendering |
  | Page (with JWT)   |    | (e.g., /admin)     |    | (admin link only for  |
  |                   |    | based on roles)    |    | admin role)          |
  +-------------------+    +--------------------+    +-------------------+

*/



/*

  +------------------------+     +---------------------------+     +-----------------------------+
  | Push Code to GitHub     |     | GitHub Actions Pipeline    |     | Run `npm run dev` to create  |
  | (Trigger Pipeline)      |---->| (Build, Test, Deploy)      |---->| ready-to-use files (HTML,    |
  +------------------------+     +---------------------------+     | CSS, JavaScript)             |
           |                             |                          +-----------------------------+
           v                             v                                      |
  +------------------------+     +---------------------------+     +-----------------------------+
  | Docker Packages the    |     | Docker Uploads the App    |     | WatchTower Pulls Latest Image |
  | App                    |---->| to Docker Hub             |---->| from Docker Hub              |
  +------------------------+     +---------------------------+     +-----------------------------+
           |                             |                          |
           v                             v                          v
  +------------------------+     +---------------------------+     +-----------------------------+
  | Caddy Serves the App   |     | Handles HTTPS & Static    |     | Application Ready to Serve  |
  | (Handles Static Files  |---->| Files                     |---->| Users with Latest Version   |
  | and HTTPS)             |     +---------------------------+     +-----------------------------+
  +------------------------+        
*/






















