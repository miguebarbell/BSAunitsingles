import styled from "styled-components";
import { categories} from "../data";

const itemSize = '10vw'
export const Container = styled.div`
  padding: 1rem;
  //border: 1px solid black;
  border-radius: 10px;
  //margin: 1rem;
  position: relative;
  height: ${itemSize};
  margin: 0.5rem;  
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`
export const Image = styled.img`
  height: ${itemSize};
  width: ${itemSize};
  z-index: 1;
  object-fit: cover;
  border-radius: 5px;
`
const Title = styled.h1`
  font-size: 1rem;
  position: absolute;
  z-index: 2;
  background-image: linear-gradient(0deg, transparent, rgba(250,250,250,0.4), white 60%);
  width: 100%;
  padding: 0.25rem;
  
`


const CategoryItem = ({item}) => {
    return (
        <Container>
            <Title>
                {item.category}
            </Title>
            <Image src={item.image}/>
        </Container>
    )
}

export default CategoryItem