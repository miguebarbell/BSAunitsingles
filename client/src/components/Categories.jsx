import styled from "styled-components";
import { categories} from "../data";
import CategoryItem from "./CategoryItem";


const Container = styled.div`
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
        <div style={{minHeight: "100vh"}}>
        <Name>Categories</Name>
        <Container>
            {categories.map(item =>(
                <CategoryItem item={item} key={item.id}/>
            ))}
        </Container>
        </div>
    )
}

export default Categories