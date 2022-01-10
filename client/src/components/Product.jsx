import styled from "styled-components"
import {Link} from "react-router-dom";
// import { Container, Image } from "./CategoryItem"
const Title = styled.h3`
    color: black;
    font-size: 1rem;
  // text-align-last: justify;
    padding: 0 0.5vh;
    text-align: center;
`
const Price = styled.span`
    color: black;
font-size:1rem;
font-weight: bold; 
`
const Container = styled.div`
    * {
        text-decoration: none;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 20vh;
    height: 30vh;
    min-height: 300px;
    min-width: 200px;
  //max-height: 500px;
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
  height: 66.66%;
  max-height: 400px;
  max-width: 400px;
  object-fit: cover;
  //border-radius: 3%;
  // position: absolute;
`

const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //background-color: violet;
    //height: 100%;
`;

const Product = ({item}) => {
    // console.log(item);
    return (
        <Container style={{margin: "2rem 0"}} key={item._id}>
            <Link to={`/product/${item._id}`} style={{display:'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <Image src={item.img} />
            <DescriptionContainer>
                <Title>{item.title}</Title>
                <Price>$ {item.price}</Price>
            </DescriptionContainer>
            </Link>
        </Container>
    )
}

 export const FeaturedProduct = ({item}) => {
    return (
        <Container style={{margin: "2rem 0", height: "20vh", minHeight: "200px"}} key={item._id}>
            <Link to={`/product/${item._id}`}>
                <Blur className="blur">
                    <Title style={{color: "white"}}>{item.title}</Title>
                    <Price style={{color: "white"}}>$ {item.price}</Price>
                </Blur>
            </Link>
            <Image src={item.img} style={{height: "100%", borderRadius: "3%"}}/>

        </Container>
    )
}

export default Product