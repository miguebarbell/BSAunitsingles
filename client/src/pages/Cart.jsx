import {useEffect, useState} from 'react'
import styled from "styled-components";
import {yellow, navbarHeight} from "../components/Navbar";
import Footer from "../components/Footer";
import { Add, Remove} from "@material-ui/icons";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {useDispatch, useSelector} from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import {Link, useHistory} from "react-router-dom";
import {delProduct, lessProduct, moreProduct} from "../redux/cartRedux";

// const STRIPE_KEY = process.env.REACT_APP_STRIPE_KEY;
const STRIPE_KEY = 'pk_test_51JjmTWBN6ojyqIxPr1Xg9QGKPn7hW1EmtON0UZ1fp6BZzBY01BCTvJRAOoqeHGhsbHu1618p0wPVl3y0EBdwLVFI002Tnn3HJN'

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
width: 90vw;
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
    * {
        text-decoration: none;
        a {
            color: inherit;
        }
    }
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
    // falta considerar un verdadero chippingn price y ese anadirlo al cart
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const [stripeToken, setStripeToken] = useState(null)
    const history = useHistory();
    const onToken = (token) => {
        setStripeToken(token);
        // console.log(stripeToken)
    };
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/api/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total*100,
                })
                history.push("/success", {
                    data: res.data,
                    // stripeData: res.data,
                    products: cart,
                })
            } catch {}
        }
        stripeToken && makeRequest()
        // stripeToken && cart.total >= 1 && makeRequest()
    }, [stripeToken, cart, history])
    const handleQuantity = (productId, type) => {
        if (type === '-') {
            if (productId.quantity > 0) {
                dispatch(lessProduct({...productId}))
            }
        } else if (productId.quantity < productId.onHand ) {
            dispatch(moreProduct({...productId}))
        }
    }
    const delItem = (product) => {
        dispatch(delProduct({...product}))
    }
    return (
        <Container>
            <CartWrapper>
                <NavCart>
                    <Title>YOUR ORDER</Title>
                    <ButtonWrapper>
                        <Button>Continue Shopping</Button>
                        <StripeCheckout
                            name="BSA Unit Singles LLC."
                            image="https://bsaunitsingles.s3.amazonaws.com/cart/BSA.jpg"
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={cart.total*100}
                            token={onToken}
                            stripeKey={STRIPE_KEY}>
                            <Button>Checkout</Button>
                        </StripeCheckout>

                    </ButtonWrapper>
                </NavCart>
                <Info>
                    {cart.products.map(product => (

                    <Product key={product._id}>
                        <ProductDetail>
                                  <Link to={`/product/${product._id}`}><Image src={product.img} alt={product.title}/></Link>
                           
                                  <Details>
                                  <ProductName><b>Item:</b> <Link to={`/product/${product._id}`}>{product.title}</Link></ProductName>
                                  <ProductSKU><b>SKU:</b> <Link to={`/product/${product._id}`}>{product.sku}</Link></ProductSKU>
                                  </Details>
                                  </ProductDetail>
                        <PriceDetail>
                            <ProductQty><b>Quantity:</b>
                                <Add title="more" style={{cursor: 'pointer'}} onClick={() => handleQuantity(product, '+')}/>
                                <Amount>{product.quantity}</Amount>
                                <Remove title='less' style={{cursor: 'pointer'}} onClick={() => handleQuantity(product, '-')}/>
                                <DeleteOutlineIcon title="remove item" style={{color: 'red', cursor: 'pointer'}} onClick={() => delItem(product)} />
                            </ProductQty>
                            <span><b>Unit Price: ${product.price} usd</b></span>
                            <span><b>Items Total: ${product.priceQty.toFixed(2)} usd</b></span>
                        </PriceDetail>
                    </Product>

                    ))}
                </Info>
                <SummaryWrapper>
                    <Summary>
                        <h1><b>Order Summary</b></h1>
                        <Subtotal><b>SubTotal: </b>${cart.total.toFixed(2)} usd</Subtotal>
                        <Shipping><b>Estimated Shipping: </b>$55</Shipping>
                    </Summary>
                    <TotalSummary>
                        <Total><b>Total: </b>${cart.total.toFixed(2)} usd</Total>
                    </TotalSummary>
                </SummaryWrapper>

            </CartWrapper>
            <Footer/>
        </Container>
    )
}

export default Cart
