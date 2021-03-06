import styled from "styled-components"
import Announcement, {announcementHeight} from "../components/Announcement";
// import Products from "../components/Products";
import {Add, Remove} from "@material-ui/icons";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {publicRequest} from "../requestMethods"
import FeaturedProducts from "../components/FeaturedProducts";
import {addProduct} from "../redux/cartRedux";
import {useDispatch} from "react-redux";
import {navbarHeight, yellow} from "../components/Navbar";

const Wrapper = styled.div`
  margin-top: calc(${navbarHeight} + ${announcementHeight});
  display: flex;
  padding: 2rem 1rem;
  align-items: center;
  width: 90vw;
  justify-content: center;
`
const ImgContainer = styled.div`
  ${({lock}) => lock ? "left: 0;" : ""};
  ${({lock}) => lock ? "top: 0;" : ""};
  position: ${({lock}) => lock ? "fixed" : "relative"};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({lock}) => lock ? "z-index: 10;" : ""};
  ${({lock}) => lock ? "width: 100vw;" : ""};
  ${({lock}) => lock ? "height: 100vh;" : ""};
  background-color: rgba(0, 0, 0, 0.5)
`
const Image = styled.img`
  border-radius: 10px;
  ${({lock}) => lock ? "" : "max-height: 500px;"}
  ${({lock}) => lock ? "max-height: 80vh;" : "height: 30vh;"}
  ${({lock}) => lock ? "max-width:80vw" : "width: 30vh;"}
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  cursor: pointer;

`
const Title = styled.h1`
  font-weight: 200;
`
const Sku = styled.h5`

`
const Desc = styled.div`
  max-width: 700px;
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
  // width: 400px;
  &:hover {
    background-color: ${yellow};
  }
`
const AddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 2rem;

`
const AmountContainer = styled.div`
  display: flex;

  .addrem {
    cursor: pointer;

    &:hover {
      color: red;
    }
  }
`
const Amount = styled.span`
  font-weight: bold;
  padding: 0 0.5rem;`
const Container = styled.div`
  background-color: white;

  * {
    //margin: 0;
    //padding: 0;
    //box-sizing: border-box;
  }
`
const Product = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2]
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [preview, setPreview] = useState(false)
    const dispatch = useDispatch()
    // console.log('loading product id: ' + id)
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get(`api/products/find/${id}`)
                setProduct(res.data);
                // console.log(res.data);
            } catch (e) {

            }
        }
        getProduct()
    }, [id])
    // useEffect(() => {
    //
    // }, [])

    const handleQuantity = (type) => {
        if (type === "-") {
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            quantity <= product.onHand && setQuantity(quantity + 1)
        }
    }
    const handleAdd = () => {
        // console.log(quantity)
        dispatch(addProduct({...product, quantity, priceQty: product.price * quantity}));
    };
    const getModels = () => {
        try {

            if (product.model[0] === product.model[1]) {
                return product.model[0]
            } else if (product.model[0] === "Fits All" || product.model[1] === "Fits All") {
                return "Fits All"
            } else {
                return `${product.model[0]} - ${product.model[1]}`
            }
        } catch (e) {
           console.error(e)
        }
    }


    return (
        <Container>
            <Announcement/>
            {/*<Navbar/>*/}
            <Wrapper>
                <ImgContainer lock={preview}>
                    <Image src={product.img} onClick={() => setPreview(!preview)} lock={preview}/>
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Sku>SKU: {product.sku}</Sku>
                    <Desc>
                        <p>Fits on: {getModels()}</p>
                        <p>Weight: {product.weight === 0 ? 0.1 : product.weight} lbs</p>
                        <p>{product.desc}</p>
                    </Desc>
                    <Price>$ {product.price}</Price>
                    {/*<Price>$ {product.price.toFixed(2)}</Price>*/}
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity("-")} className="addrem"/>
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity("+")} className="addrem"/>
                        </AmountContainer>
                        <Button onClick={handleAdd}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <FeaturedProducts/>
        </Container>
    )
}

export default Product
