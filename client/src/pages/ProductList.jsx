import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";

const Container = styled.div`
`

const ProductList = () => {
    return (
        <Container>
            <Announcement/>
            <Navbar/>
            ProductList component
            <Footer/>
        </Container>
    )
}

export default ProductList