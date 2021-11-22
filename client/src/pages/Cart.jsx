import React from 'react'
import styled from "styled-components";
import Navbar, { navbarHeight } from "../components/Navbar";
import Footer from "../components/Footer";
import { yellow } from "../components/Navbar"

const Container = styled.div`
margin-top: ${navbarHeight};
min-height: calc(100vh - ${navbarHeight});
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
`;

const Title = styled.h1``;
const CartWrapper = styled.div`
min-height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
max-width: 1000px;
width:60%;
`

const Button = styled.button`
background-color: ${yellow};
border: 2px solid transparent;
padding: 0.25rem 0.5rem;
border-radius: 5px;
&:hover {
border: 2px solid black;
};
`;

const ButtonWrapper = styled.div`
width: 100%;
display: flex;
justify-content:space-between`;
const Cart = () => {
    return (
        <Container>
            <Navbar/>
            <CartWrapper>
                <Title>YOUR ORDER</Title>
                <ButtonWrapper>
                    <Button>Continue Shopping</Button>
                    <Button>Checkout</Button>
                </ButtonWrapper>

            </CartWrapper>

            <Footer/>
        </Container>
    )
}

export default Cart