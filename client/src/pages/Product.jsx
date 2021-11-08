import styled from "styled-components"
import Announcement, {announcementHeight} from "../components/Announcement";
import Navbar, {navbarHeight, yellow} from "../components/Navbar";
import Products from "../components/Products";
import { Add, Remove } from "@material-ui/icons";

const Wrapper = styled.div`
  margin-top: calc(${navbarHeight} + ${announcementHeight} + 20px);
  display: flex;
  padding: 1rem;
  align-items: center;
`
const ImgContainer = styled.div``
const Image = styled.img`
  border-radius: 10px;
 max-height: 500px;
 height: 30vh;
 width: 30vh; 
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  
`
const Title = styled.h1`
font-weight: 200;
`
const Sku = styled.h5`

`
const Desc = styled.p`
  padding: 1rem 0;
`
const Price = styled.h4``
const InfoContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  //align-items: center;
  justify-content: space-between;
`
const Button = styled.button`
  font-weight: bold;
padding: 1rem;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: rgba(14, 30, 37, 0.12) 0 2px 4px 0, rgba(14, 30, 37, 0.32) 0 2px 16px 0;
  &:hover {
    background-color: ${yellow};
  }
`
const AddContainer = styled.div`
display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  padding: 2rem;
`
const AmountContainer = styled.div`
display: flex;
`
const Amount = styled.span`
  font-weight: bold;
padding: 0 0.5rem;`


const Container = styled.div``
const Product = () => {
    return (
        <Container>
            <Announcement/>
            <Navbar/>
            <Wrapper>
                 <ImgContainer>
                     <Image src="https://bsaunitsingles.com/itemimages/BSA/L622PREM.JPG"/>

                 </ImgContainer>
                <InfoContainer>
                    <Title>AMAL CONCENTRIC CARB 622 "LEFT" 22MM</Title>
                    <Sku>SKU: L622PREM</Sku>
                    <Desc>AMAL CONCENTRIC CARB 622 PREMIER "LEFT" 22MM (7/8" CHOKE)<br/>
                        ALUMINUM BODY<br/>
                        COMES WITH #3 SLIDE AND 120 MAIN JET<br/>
                        IF DIFFERENT SLIDE OR JET DESIRED PLEASE SPECIFY
                        PRIMER ON LEFT SIDE - MORE CONVENIENT FOR LEFT SIDE CARB MOUNTED C15 AND B40 MOTORS
                        FEATURES OF THE PREMIER:
                        CAST ALUMINUM BODY - LIGHTWIEGHT
                        PRECISION MANUFACTURED FORGED ALLOY HARD ANODISED THROTTLE SLIDE HAS A LOW FRICTION SURFACE FOR SMOOTHER OPERATION AND GREATER WEAR RESISTANCE
                        ETHANOL RESISTANT PUNCTURE PROOF STAYUP FLOAT
                        PRECISION ENGINEERED IDLE CIRCUT IMPROVES THE PICK UP PERFORMACE FROM IDLE
                        AND MOST IMPORTANTLY A REMOVABLE PILOT JET TO ALLOW ACCESS TO THE IDLE CIRCUT FOR CLEANING. THIS ALONE MAKES THIS CARB WORTH THE EXTRA MONEY!
                    </Desc>
                    <Price>$ 400.00</Price>
                    <AddContainer>
                        <AmountContainer>
                            <Remove/>
                            <Amount>1</Amount>
                            <Add/>
                        </AmountContainer>
                        <Button>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Products/>
        </Container>
    )
}

export default Product