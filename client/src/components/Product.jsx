import styled from "styled-components"
import { Container, Image } from "./CategoryItem"


const Title = styled.h1`
font-size: 2vh;
`
const Price = styled.p`
font-size:2vh;
`



const Product = ({item}) => {
    return (
        <Container style={{margin: "2rem 0"}}>
            <Image src={item.image} />
            <Title>{item.title}</Title>
            <Price>$ {item.price}.00</Price>
        </Container>
    )
}

export default Product