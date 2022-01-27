import styled from "styled-components"
import Product from "./Product";
import {Name} from "./Categories"
import {useEffect, useState} from "react";
// import axios from "axios";
import {navbarHeight} from "./Navbar";
import {publicRequest} from "../requestMethods";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100vw;
    //height: calc(100vh - ${navbarHeight});
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

const Products = ({cat, filter, sort}) => {
    const [products, setProducts] = useState([{}]);
    useEffect(() => {
        const getProducts = async () => {
            try {
                // const res = await axios.get( cat ? `http://localhost:5000/api/products?category=${cat}` : 'http://localhost:5000/api/products?category=featured');
                // const res = await axios.get( cat ? `http://bsaserver.herokuapp.com:5000/api/products?category=${cat}` : 'http://localhost:5000/api/products?category=featured');
                const res = await publicRequest.get(cat ? `api/products?category=${cat}` : 'api/products?category=featured');
                setProducts(res.data)
                console.log(res.data)
            } catch (e) {
                console.log(e);
            }
        }
        getProducts();
    }, [cat])
    useEffect(() => {
        cat && setFilteredProducts(
            products.filter(item => Object.entries(filter).every(([key, value]) =>
                    item[key].includes(value)
                )
            )
        )
    }, [cat, filter, products])

    const [filteredProducts, setFilteredProducts] = useState([{}]);
    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts(prev =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            )
        } else if (sort === "asc") {
            setFilteredProducts(prev =>
                [...prev].sort((a, b) => a.price - b.price)
            )
        } else {
            setFilteredProducts(prev =>
                [...prev].sort((a, b) => b.price - a.price)
            )
        }
    }, [sort])

    return (
        <Div>
            <div>
                <Name>{cat}</Name>
                <Container>
                    {filteredProducts.map(item => (
                        <Product item={item} key={item._id}/>
                    ))}
                </Container>
            </div>
            {/*<Footer/>*/}
        </Div>

    )
}

export default Products