import styled from "styled-components"
import {Link} from "react-router-dom";
// import { Container, Image } from "./CategoryItem"
const Title = styled.h3`
  font-size: 1.5vh;
  // text-align-last: justify;
  padding: 0 0.5vh;
  text-align: center;
`
const Price = styled.span`
font-size:1.5vh;
font-weight: bold; 
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 20vh;
  height: 20vh;
  max-height: 500px;
  background-color: white;
  border-radius: 3%;
  cursor: pointer;
  &:hover {
    .blur {
      display: flex;
    }
  }
`
const Blur  = styled.div`
  display: none;
  background-color: rgb(0,0,0,.4);
  position: absolute;
  left: 0;
  width: 20vh;
  height: 20vh;
  max-height: 500px;
  border-radius: 3%;
  color: white;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 400px;
  max-width: 400px;
  object-fit: cover;
  border-radius: 3%;
  // position: absolute;
`


const Product = ({item}) => {
    // console.log(item);
    return (
        <Container style={{margin: "2rem 0"}} key={item._id}>
            <Link to={`/product/${item._id}`}>
            <Blur className="blur">
                <Title>{item.title}</Title>
                {/*<Price>$ {item.price.toFixed(2)}</Price>*/}
                <Price>$ {item.price}</Price>
            </Blur>
            </Link>
            <Image src={item.img} />

        </Container>
    )
}

export default Product