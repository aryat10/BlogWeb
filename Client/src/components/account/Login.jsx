import { useState } from "react";
import { Box, TextField, Button, styled } from "@mui/material";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginAdjust = styled(Button)`
  text-transform: none;
  background: #fb641b;
  height: 48px;
  border-radius: 2px;
`;

const RegisterAdjust = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #28740;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);
`;

const Login = () => {
  const [account, setAccount] = useState("login");

  const handleRegisterClick = () => {
    setAccount("register");
  };

  const handleLoginClick = () => {
    setAccount("login");
  };

  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="Logo" />
        {account === "login" ? (
          <Wrapper>
            <TextField variant="standard" label="Username" />
            <TextField variant="standard" label="Password" type="password" />
            <LoginAdjust variant="contained">Login</LoginAdjust>
            <p style={{ textAlign: "center" }}>OR</p>
            <RegisterAdjust onClick={handleRegisterClick} variant="text">
              Create an account
            </RegisterAdjust>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField variant="standard" label="Name" />
            <TextField variant="standard" label="Username" />
            <TextField variant="standard" label="Password" type="password" />
            <RegisterAdjust variant="contained">Register</RegisterAdjust>
            <p style={{ textAlign: "center" }}>OR</p>
            <LoginAdjust onClick={handleLoginClick} variant="text">
              Already have an account
            </LoginAdjust>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
