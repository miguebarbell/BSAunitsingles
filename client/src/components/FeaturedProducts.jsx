import styled from "styled-components"
// import { popularProducts } from "../data"
import Product from "./Product";
import { Name } from "./Categories"
import Footer from "./Footer";
import { navbarHeight} from "./Navbar";
import {useEffect, useState} from "react";
import axios from "axios";

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

const FeaturedProducts = () => {
	const [products, setProducts] = useState([{}]);
	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await axios.get('http://localhost:5000/api/products?category=featured');
				setProducts(res.data)
				// console.log(res.data)
			} catch(e) {
				// console.log(e);
			}
		}
		getProducts();
	})
	// useEffect(() => {
	// 	cat && setFilteredProducts(
	// 		products.filter(item => Object.entries(filter).every(([key, value]) =>
	// 				item[key].includes(value)
	// 			)
	// 		)
	// 	)
	// }, [cat, filter, products])

	// const [filteredProducts, setFilteredProducts] = useState([{}]);
	// useEffect(() => {
	// 	if(sort==="newest") {
	// 		setFilteredProducts(prev =>
	// 			[...prev].sort((a, b) => a.createdAt - b.createdAt)
	// 		)
	// 	} else if (sort ==="asc") {
	// 		setFilteredProducts(prev =>
	// 			[...prev].sort((a, b) => a.price - b.price)
	// 		)
	// 	} else {
	// 		setFilteredProducts(prev =>
	// 			[...prev].sort((a, b) => b.price - a.price)
	// 		)
	// 	}
	// }, [sort])

	return (
		<Div>
			<div>
				<Name>Featured</Name>
				<Container>
					{products.map(item => (
						<Product item={item} key={item._id}/>
					))}
				</Container>
			</div>
			<Footer/>
		</Div>

	)
}

export default FeaturedProducts
