import React, { useContext, useState } from "react";
import { Box, TextField, Button, Typography, styled } from "@mui/material";
import { loginUser, registerUser } from "../../service/usersApi";
import axios from "axios";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
  margin-top: 64px;
`;

const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginBtn = styled(Button)`
  text-transform: none;
  background-color: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignBtn = styled(Button)`
  text-transform: none;
  background-color: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
`;

const signupInitialValue = {
  name: "",
  username: "",
  password: "",
};

const loginInitialValue = {
  username: "",
  password: "",
};

const API_URL = "http://localhost:3000/api/v1/users";

function Login() {
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValue);
  const [login, setLogin] = useState(loginInitialValue);
  const { setUserAccount, setAuth } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const onIputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const SignupUser = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/signup`, signup);
      console.log("data:", data);
      setSignup(signupInitialValue);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const LoginUser = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, login);

      sessionStorage.setItem("accessToken", `Bearer ${data.accessToken}`);
      sessionStorage.setItem("refreshToken", `Bearer ${data.refreshToken}`);
      setUserAccount({ name: data.user.name, username: data.user.username });
      setAuth(true);
      navigate("/");
      setLogin(signupInitialValue);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="login" />

        {account === "login" ? (
          <Wrapper>
            <TextField
              id="standard-basic"
              variant="standard"
              label="Enter Username"
              name="username"
              value={login.username}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Enter Password"
              name="password"
              value={login.password}
              onChange={(e) => handleChange(e)}
            />
            <LoginBtn onClick={() => LoginUser()} variant="contained">
              Login
            </LoginBtn>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignBtn onClick={() => toggleSignup()}>Create an account</SignBtn>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              id="standard-basic"
              variant="standard"
              label="Enter Name"
              name="name"
              value={signup.name}
              onChange={(e) => onIputChange(e)}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Enter Username"
              name="username"
              value={signup.username}
              onChange={(e) => onIputChange(e)}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Enter Password"
              name="password"
              value={signup.password}
              onChange={(e) => onIputChange(e)}
            />

            <SignBtn onClick={() => SignupUser()}>Signup</SignBtn>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginBtn onClick={() => toggleSignup()} variant="contained">
              Already have an account
            </LoginBtn>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
}

export default Login;
