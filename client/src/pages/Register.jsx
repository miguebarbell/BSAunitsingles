import styled from "styled-components";
import Footer from "../components/Footer";
import {yellow,  navbarHeight} from "../components/Navbar";
import wrapperbg from "../assets/images/C15.jpg";

export const changeLayout = "760px"

export const Button = styled.button`
grid-area: button;
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
display: grid;
grid-template-columns: 30% 70%;
grid-template-rows: 7;
grid-gap: 0 1.25rem;

grid-template-areas: 
"fnamelabel fnameinput" 
"lnamelabel lnameinput" 
"emaillabel emailinput" 
"passlabel passinput" 
"rpasslabel rpassinput" 
"agreement agreement" 
"button button" ;
// display: flex;
// flex-direction: column;
// justify-content: space-between;
// align-items: center;
// flex-wrap: wrap;
`;

export const Input = styled.input`
margin: 0.25rem;
padding: 0.25rem;
border-radius: 5px;
height: 2rem;
// &::before {
//     content: "click";
// };
`;
const Agreement = styled.span`
grid-area: agreement;
text-align: justify;
text-justify: inter-word;
`;

export const Label = styled.label`
text-align: right;
`

export const FooterWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
`;

const Register = () => {
    return (
        <Container bg={wrapperbg}>
            {/*<Navbar/>*/}
            <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Wrapper>

                <Title>
                    CREATE AN ACCOUNT
                </Title>
                <Form>
                    <Label style={{gridArea: "fnamelabel"}} for="name">First Name</Label>
                    <Input style={{gridArea: "fnameinput"}} id="name" type="text" placeholder="Brent" required/>
                    <Label style={{gridArea: "lnamelabel"}} for="lastname">Last name</Label>
                    <Input style={{gridArea: "lnameinput"}} id="lastname" type="text" placeholder="Lenahan" required/>
                    <Label style={{gridArea: "emaillabel"}} for="email">Email</Label>
                    <Input style={{gridArea: "emailinput"}} id="email" type="email" placeholder="brent@bsa.uk" required/>
                    {/*make a seudo element saying the specifications for the password*/}
                    <Label style={{gridArea: "passlabel"}} for="password">Password</Label>
                    <Input style={{gridArea: "passinput"}} id="password" type="password" placeholder="password" required/>
                    <Label style={{gridArea: "rpasslabel"}} for="password">RE-Password</Label>
                    <Input style={{gridArea: "rpassinput"}} type="password" placeholder="password" required/>
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


