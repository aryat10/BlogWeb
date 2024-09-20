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
  background: ${(props) => (props.active ? "#fff" : "#fb641b")};
  color: ${(props) => (props.active ? "#2874f0" : "#fff")};
  height: 48px;
  border-radius: 2px;
  box-shadow: ${(props) =>
    props.active ? "0 2px 4px 0 rgb(0 0 0/20%)" : "none"};
`;

const RegisterAdjust = styled(Button)`
  text-transform: none;
  background: ${(props) => (props.active ? "#2874f0" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#2874f0")};
  height: 48px;
  border-radius: 2px;
  box-shadow: ${(props) =>
    props.active ? "none" : "0 2px 4px 0 rgb(0 0 0/20%)"};
`;

const Login = () => {
  const [account, setAccount] = useState("login");

  const handleRegisterClick = () => {
    setAccount("register");
  };

  const handleLoginClick = () => {
    setAccount("login");
  };

  const handleInputChange = (e) =>{
    console.log(e.target.name,e.target.value)
  }

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

            <RegisterAdjust
              onClick={handleRegisterClick}
              variant="text"
              active={account === "login"}
            >
              Create an account
            </RegisterAdjust>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField variant="standard" onChange={(e) => handleInputChange(e)} name = 'name' label="Name" />
            <TextField variant="standard" onChange={(e) => handleInputChange(e)} name = 'username' label="Create Username" />
            <TextField variant="standard" onChange={(e) => handleInputChange(e)}  name = 'password'label="Password" type="password" />

            <RegisterAdjust variant="contained" active={account === "register"}>
              Register
            </RegisterAdjust>

            <p style={{ textAlign: "center" }}>OR</p>
            <LoginAdjust
              onClick={handleLoginClick}
              variant="text"
              active={account === "register"}
            >
              Already have an account
            </LoginAdjust>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
