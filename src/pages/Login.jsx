import { useState } from "react";
import { Navigate } from "react-router-dom";

function Login({ login, loggedIn }) {
  const [loginCredentials, setLoginCredentials] = useState({ username: "", password: "" });

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };

  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value });
  };

  // Redirect to homepage if already logged in
  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={performLogin}>
        <input
          placeholder="User Name"
          id="username"
          onChange={onChange}
          value={loginCredentials.username}
        />
        <input
          placeholder="Password"
          id="password"
          onChange={onChange}
          value={loginCredentials.password}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
