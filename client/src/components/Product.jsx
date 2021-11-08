import styled from "styled-components"
// import { Container, Image } from "./CategoryItem"


const Title = styled.h3`
font-size: 1.5vh;
  text-align-last:justify;
`
const Price = styled.span`
font-size:1vh;
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
`


const Product = ({item}) => {
    return (
        <Container style={{margin: "2rem 0"}}>
            <Blur className="blur">
                <Title>{item.title}</Title>
                <Price>$ {item.price}.00</Price>
            </Blur>
            <Image src={item.img} />

        </Container>
    )
}

export default Product