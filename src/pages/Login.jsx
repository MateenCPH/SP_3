import { useState } from "react";
import styled from "styled-components";
import facade from "../util/apiFacade";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Logo from "../assets/Logo.png"


// STYLES
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 80vh;
  align-items: center;
  justify-content: center;
`;

const LeftSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 2rem;
  color: #000000;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%; /* Make form wider */
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #f09136;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #d87b2d;
  }
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  input {
    margin-right: 5px;
  }
`;

const SignUpLink = styled.a`
  color: #007bff;
  text-decoration: none;
  margin-top: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: #f09136;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  width: 80%;
  margin-bottom: 1.5rem;
  font-size: 16px;
`;

function Login({ errorMessage, setErrorMessage, loggedIn, setLoggedIn, setUsername }) {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then(() => {
        setLoggedIn(true);
        setUsername(user);
        setErrorMessage("")
        navigate("/")
      })
      .catch((err) => {
        /* console.error("Login failed:", err); */
        const errorMsg = err.message || "Invalid credentials. Please try again."
        setErrorMessage(errorMsg);
      });
  };

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <>
      <Container>
        <LeftSide>
          <img className="rounded-md" src={Logo} />
        </LeftSide>
        <RightSide>
          <Title>Welcome to SMM-Cooking</Title>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Form onSubmit={performLogin}>
            <Input
              placeholder="User Name"
              type="text"
              id="username"
              onChange={onChange}
              value={loginCredentials.username}
            />
            <Input
              placeholder="Password"
              type="password"
              id="password"
              onChange={onChange}
              value={loginCredentials.password}
            />
            <RememberMe>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </RememberMe>
            <Button type="submit">Login</Button>
          </Form>
          <br />
          <p>Don't have an account?</p>
          <SignUpLink href="/signup"> Sign up</SignUpLink>
        </RightSide>
      </Container>
    </>
  );
}

export default Login;
