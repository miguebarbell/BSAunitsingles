import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar, {yellow,  navbarHeight} from "../components/Navbar";
import C15 from "../assets/images/C15.jpg";

const changeLayout = "760px"

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

const Title = styled.h1`
text-align: center;
// text-justify: inter-word;
@media (max-width: ${changeLayout}) {
font-size: 1.5rem;
}`;

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`;

const Input = styled.input`
margin: 0.25rem;
padding: 0.25rem;
width: 80%;
border-radius: 5px;
`;
const Agreement = styled.span`
text-align: justify;
text-justify: inter-word;
`;

const FooterWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
// height: 100%;
`;

const Register = () => {
    return (
        <Container bg={C15}>
            <Navbar/>
            <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
            </div>
            <FooterWrapper>
                <div></div>
                <Footer/>
            </FooterWrapper>
        </Container>
    )
};

export default Register;


