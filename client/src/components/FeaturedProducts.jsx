import styled from "styled-components"
import Product, {FeaturedProduct} from "./Product";
import { Name } from "./Categories"
import {useEffect, useState} from "react";
import axios from "axios";
import {navbarHeight} from "./Navbar";

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
	}, [setProducts]);
	return (
		<Div>
			<div>
				<Name>Featured</Name>
				<Container>
					{products.map(item => (
						<FeaturedProduct item={item} key={item._id}/>
					))}
				</Container>
			</div>
		</Div>

	)
}

export default FeaturedProducts
