import styled from "styled-components";
import { categories} from "../data";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
padding: 1rem;
`
const CategoryContainer = styled.div`
  display: flex;
  padding: 1rem;
  flex-wrap: wrap;
  justify-content: space-around;
`

export const Name = styled.h1`
text-transform:capitalize;
`


const Categories = () => {
    return (
        <Container>
        <Name>Categories</Name>
        <CategoryContainer>
            {categories.map(item =>(
                <CategoryItem item={item} key={item.id}/>
            ))}
        </CategoryContainer>
        </Container>
    )
}

export default Categories