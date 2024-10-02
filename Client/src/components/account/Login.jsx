import { useState } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { API } from '../../Service/api';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = () => {

    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, setError] = useState('');
    const [account, toggleAccount] = useState('login');

    const imageURL = "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const signupUser = async () => {
        try {
            let response = await API.userSignup(signup);
            console.log(response);  // Log the full response to check its structure
    
            if (response && response.isSuccess) {
                setError('');
                setSignup(signupInitialValues);
                toggleAccount('login');
            } else {
                setError(response?.msg || 'Something went wrong, try again later');
            }
        } catch (error) {
            console.error("Signup Error: ", error);
            
            // Extract error message from the error object
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Something went wrong! Please try again later.');
            } else {
                setError('Network error or server is down! Please try again later.');
            }
        }
    };
    
    

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    };

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="Logo" />
                {account === "login" ? (
                    <Wrapper>
                        <TextField variant="standard" value={login.username} onChange={onValueChange} name='username' label='Enter Username' />
                        <TextField variant="standard" value={login.password} onChange={onValueChange} name='password' label='Enter Password' />

                        {error && <Error>{error}</Error>}

                        <LoginButton variant="contained">Login</LoginButton>

                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <SignupButton onClick={toggleSignup} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                    </Wrapper>
                ) : (
                    <Wrapper>
                        <TextField variant="standard" onChange={onInputChange} name='name' label="Name" />
                        <TextField variant="standard" onChange={onInputChange} name='username' label="Create Username" />
                        <TextField variant="standard" onChange={onInputChange} name='password' label="Password" type="password" />

                        {error && <Error>{error}</Error>}

                        <SignupButton onClick={signupUser}>Signup</SignupButton>
                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <LoginButton variant="contained" onClick={toggleSignup}>Already have an account</LoginButton>
                    </Wrapper>
                )}
            </Box>
        </Component>
    );
};

export default Login;
