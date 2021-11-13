import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar, {yellow,  navbarHeight} from "../components/Navbar";
import wrapperbg from "../assets/images/C15.jpg";

export const changeLayout = "760px"

export const Button = styled.button`
color: black;
font-weight: bold;
background-color: ${yellow};
padding: 0.25rem 0.5rem;
border-radius: 5px;
`

export const Container = styled.div`
position: absolute;
top: ${navbarHeight};
height: calc(100vh - ${navbarHeight});
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100vw;
background: rgba(255, 255, 255, .5) url(${props => props.bg})center no-repeat;
background-size: cover;
`;

export const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 60%;
max-width: 900px;
background: rgba(255, 255, 255, .65);
border-radius: 10px;
padding: 2rem;
backdrop-filter: blur(45px);
* {
    margin: 1rem 0;
}
@media (max-width: ${changeLayout}) {
width: 90%;
max-width: 500px;
}
`;

export const Title = styled.h1`
text-align: center;
// text-justify: inter-word;
@media (max-width: ${changeLayout}) {
font-size: 1.5rem;
}`;

export const Form = styled.form`
display: flex;
// flex-direction: column;
justify-content: space-between;
align-items: center;
flex-wrap: wrap;
`;

export const Input = styled.input`
margin: 0.25rem;
padding: 0.25rem;
width: 45%;
border-radius: 5px;
`;
const Agreement = styled.span`
text-align: justify;
text-justify: inter-word;
`;

export const FooterWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
// height: 100%;
`;

const Register = () => {
    return (
        <Container bg={wrapperbg}>
            <Navbar/>
            <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Wrapper>

                <Title>
                    CREATE AN ACCOUNT
                </Title>
                <Form>
                    <Input type="text" placeholder="name" required/>
                    <Input type="text" placeholder="last name" required/>
                    <Input type="text" placeholder="username" required/>
                    <Input type="email" placeholder="email" required/>
                    <Input type="password" placeholder="password" required/>
                    <Input type="password" placeholder="confirm password" required/>
                    <Agreement>
                        By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button type="submit">Create</Button>
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

export default Register;


