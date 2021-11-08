import styled from "styled-components"
import { popularProducts } from "../data"
import Product from "./Product";
import { Name } from "./Categories"
import Footer from "./Footer";
import { navbarHeight} from "./Navbar";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100vw;
  height: calc(100vh - ${navbarHeight});
  background-color: black;
  color: white;
`
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  //color: white;
  //background-color: black;
  //height: 100%;
`

const Products = () => {
    return (
        <Div>
            <div>
                <Name>Popular Products</Name>
            <Container>
            {popularProducts.map(item => (
                <Product item={item} key={item.id}/>
            ))}
            </Container>
            </div>
            <Footer/>
        </Div>

    )
}

export default Products