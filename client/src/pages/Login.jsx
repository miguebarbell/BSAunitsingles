import {Container, Button, FooterWrapper, Form, Input, Title, Wrapper} from "./Register";
import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
import wrapperbg from "../assets/images/C15.jpg"
import styled from "styled-components";
import {useState} from "react";
import {login} from "../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux";

export const Error = styled.span`
color: red;`;
const Link = styled.a``;
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector(state => state.user);
    // useEffect(() => {
    //     state.user.error = false
    // }, [username, password])
    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, {email, password});
    }


    return (
        <Container bg={wrapperbg}>
            {/*<Navbar/>*/}
            <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Wrapper style={{background: wrapperbg, width: '60vw', maxWidth: '400px', minWidth: '250px'}}>
                    <Title>SIGN IN</Title>
                    <Form style={{display: 'flex', flexDirection: 'column'}}>
                        {/*<label for="username">Username</label>*/}
                        <Input title="type your email" id="email" type="email" placeholder="bret@bsa.uk" required onChange={(e) => setEmail(e.target.value)}/>
                        {/*<label for="password">Password</label>*/}
                        <Input title="type your password" id="password" type="password" placeholder="password" required onChange={(e) => setPassword(e.target.value)}/>
                        <Button onClick={handleClick} disabled={isFetching}>Login</Button>
                        {error && <Error>Something went wrong...</Error>}
                        <Link style={{width:"100%"}}>Forgot password?</Link>
                        <Link style={{width:"100%"}}>Create a new account</Link>
                    </Form>
                </Wrapper>
            </div>
            <FooterWrapper>
                <div></div>
                <Footer/>
            </FooterWrapper>
        </Container>
    )
};

export default Login;