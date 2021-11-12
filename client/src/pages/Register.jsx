import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar, {yellow,  navbarHeight} from "../components/Navbar";
import C15 from "../assets/images/C15.jpg";


const Container = styled.div`
position: absolute;
top: ${navbarHeight};
height: calc(100vh - ${navbarHeight});
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100vw;
background: rgba(0, 0, 0, .5) url(${props => props.bg})center no-repeat;
background-size: cover;
`;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 60%;
// height: 100%;
background: rgba(255, 255, 255, .65);
border-radius: 10px;
padding: 2rem;
backdrop-filter: blur(45px);
transform: translateY(50%);
`;

const Title = styled.h1``;

const Form = styled.form`
display: flex;
flex-direction: column;
`;

const Input = styled.input`
margin: 0.25rem;
padding: 0.25rem;
`;
const Agreement = styled.span``;

const FooterWrapper = styled.div`
`;

const Register = () => {
    return (
        <Container bg={C15}>
            <Navbar/>
            <Wrapper>

                <Title>
                    CREATE AN ACCOUNT
                </Title>
                <Form>
                    <Input placeholder="name"/>
                    <Input placeholder="last name"/>
                    <Input placeholder="username"/>
                    <Input placeholder="email"/>
                    <Input placeholder="password"/>
                    <Input placeholder="confirm password"/>
                    <Agreement>
                        By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                </Form>
            </Wrapper>
            <FooterWrapper>
                <Footer/>
            </FooterWrapper>
        </Container>
    )
};

export default Register;


