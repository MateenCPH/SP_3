import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import facade from "../util/apiFacade"; // Make sure to import facade

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
  font-size: 2.5rem ;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
  color: #000000;
`;

const Ptag = styled.p`
  font-size: 15px;
  margin-bottom: 1.5rem;
  margin-top: 0.5rem;
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


function Signup() {
  const [registerCredentials, setRegisterCredentials] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navi = useNavigate(); 

  const performRegister = (evt) => {
    evt.preventDefault();

    if (registerCredentials.username.length < 2 || registerCredentials.password.length < 2) {
        setErrorMessage("Username and password must be at least 2 characters long.");
        return; // Prevent form submission
      }
      
    facade.register(registerCredentials.username, registerCredentials.password)
      .then(() => {
        return navi(`/login`, {replace: true})
      })
      .catch((err) => {
        setErrorMessage("Registration failed. Maybe you already have an account? Please try again.");
      });
  };

  const onChange = (evt) => {
    setRegisterCredentials({
      ...registerCredentials,
      [evt.target.id]: evt.target.value,
    });
  };  

  return (
    <Container>
      <LeftSide>
        <img src="src/assets/Logo.png" alt="Logo" />
      </LeftSide>
      <RightSide>
        <Title>Create a New Account</Title>
        <Ptag>Fill in the details to create a new user account.</Ptag>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Form onSubmit={performRegister}>
          <Input
            placeholder="Username"
            id="username"
            onChange={onChange}
            value={registerCredentials.username}
          />
          <Input
            placeholder="Password"
            id="password"
            type="password"
            onChange={onChange}
            value={registerCredentials.password}
          />
          <Button type="submit">Create Account</Button>
        </Form>
      </RightSide>
    </Container>
  );
}

export default Signup;
