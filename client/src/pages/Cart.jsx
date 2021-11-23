import React from 'react'
import styled from "styled-components";
import Navbar, {yellow, layoutChange, navbarHeight} from "../components/Navbar";
import Footer from "../components/Footer";
import {Add, Remove} from "@material-ui/icons";

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
// width:60%;
`
const Button = styled.button`
background-color: ${yellow};
border: 2px solid transparent;
padding: 0.25rem 0.5rem;
border-radius: 5px;
cursor: pointer;
&:hover {
border: 2px solid black;
};
`;
const ButtonWrapper = styled.div`
width: 100%;
display: flex;
justify-content:space-between;
`;
const Info = styled.div`
margin-top: calc(${navbarHeight} + 12vh);
display: flex;
flex-direction: column;
align-items: center;
width: 90wv;
`;
const Product = styled.div`
display: flex;
border-bottom: 1px solid grey;
width: 100%;
align-items: center;
padding: 1rem 0;
div {
// margin: 1rem 0;
}
`;
const ProductDetail = styled.div`
display: flex;
max-height: 300px;
// background-color: red;
width: 70vw;
height: 30vh;
`;
const PriceDetail = styled.div`
// background-color: orange;
display: flex;
max-height: 300px;
height: 30vh;
// height: 100%;
width: 20vw;
flex-direction: column;
justify-content: space-around;
align-items: center;
`;
const Image = styled.img`
object-fit: cover;
padding: 0.25rem;
border-radius: 10px;
max-width: 300px;
@media (max-width: 1000px) {
 width: 150px;
};
`;
const Details = styled.div`
display: flex;
flex-direction: column;
justify-content:space-around;
align-items: center;
width: 100%;
`;
const ProductName = styled.div``;
const ProductSKU = styled.div``;
const ProductQty = styled.div`
display: flex;
align-items: center;
`;
const Amount = styled.span`
font-weight: bold;
font-size: 1.2rem;
`;
const SummaryWrapper = styled.div`
margin: 2rem 0;
display: flex;
width: 90vw;
flex-direction: column;
`;
const Summary = styled.div`
flex: 1;
// background-color: grey;
// margin: 1rem 0;
border-bottom: 1px solid grey;
padding: 1rem 0;
`;
const Subtotal = styled.div``;
const Shipping = styled.div``;
const TotalSummary = styled.div``;
const Total = styled.div``;
const NavCart = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 90vw;
height: 12vh;
background-color: white;
position: fixed;
top: ${navbarHeight};
`;


const Cart = () => {
    return (
        <Container>
            <Navbar/>
            <CartWrapper>
                <NavCart>
                    <Title>YOUR ORDER</Title>
                    <ButtonWrapper>
                        <Button>Continue Shopping</Button>
                        <Button>Checkout</Button>
                    </ButtonWrapper>
                </NavCart>
                <Info>
                    <Product>
                        <ProductDetail>
                                  <Image src="https://bsaunitsingles.com/itemimages/BSA/97-3682.JPG" alt="item"/>
                                  <Details>
                                  <ProductName><b>Item:</b> Engine</ProductName>
                                  <ProductSKU><b>SKU:</b> 23124345</ProductSKU>
                                  </Details>
                                  </ProductDetail>
                        <PriceDetail>
                            <ProductQty><b>Qty:</b> <Add/> <Amount>4</Amount> <Remove/></ProductQty>
                            <span><b>200usd</b></span>
                        </PriceDetail>
                    </Product>
                </Info>
                <SummaryWrapper>
                    <Summary>
                        <h1><b>Order Summary</b></h1>
                        <Subtotal><b>SubTotal: </b>$1945</Subtotal>
                        <Shipping><b>Estimated Shipping: </b>$55</Shipping>
                    </Summary>
                    <TotalSummary>
                        <Total><b>Total: </b>$2000</Total>
                    </TotalSummary>
                </SummaryWrapper>

            </CartWrapper>
            <Footer/>
        </Container>
    )
}

export default Cart