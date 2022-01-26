import styled from "styled-components";
import {Container} from "./Success";
import {Link, useLocation} from "react-router-dom";
import {findProduct} from "../redux/apiCalls";
import {useEffect, useState} from "react";
import {yellow} from "../components/Navbar"
import Loading from "../components/Wait";

const Tr = styled.tr`
   background-color: ${({onhand}) => (onhand <= 0) ? "rgba(250, 0,0,0.2)" : "rgba(0,0,0,0.1)"};
  &:hover {
    img {
      display: block;
    }
  }
`
const GridResults = styled.table`
  * {
    text-align: start;
    padding: 0.125rem;
    text-decoration: none;
  }
  th {
    background-color: ${yellow};
  }
  tr:hover {
    background-color: ${yellow};
  }
  a {
    color: black;
    &:visited {
      color: purple;
    }
    &:hover {
      font-weight: bold;
    }
  }
`


const Image = styled.img`
  object-fit: cover;
  border-radius: 7px;
  display: none;
  position: fixed;
  top: 50%;
  right: 20%;
  transform: translate(0, -50%);
  background-color: red;
  min-height: 375px;
  min-width: 375px;
  width: 30vh;
  height: 30vh;
  max-width: 500px;
  max-height: 500px;
`
const SearchResults = () => {
    const location = useLocation();
    const [products, setProduct] = useState([])
    const query = location.pathname.split('/').slice(2,location.pathname.split('/').length)
    useEffect(() => {
        const getProducts = async (query) => {
            try {
                const res = await findProduct(query)
                const sorted = res.data.sort((a, b) => {
                    if (a.item.onHand <= 0 && b.item.onHand > 0) {
                        return 1
                    } else if (b.item.onHand <= 0 && a.item.onHand > 0) {
                        return -1
                    } else {
                        return 0
                    }
                })
                console.log(sorted)
                setProduct(sorted)

            } catch (err) {
                console.error(err)
            }
        }
        getProducts(query.join('/'))
    }, [products])
    console.log(products)
    return (
        <Container style={{backgroundColor:"white"}}>
            {((products.length === 0 && (
                <Loading text="loading..."/>
            )) || (products.length > 0 && (
                <h1>Showing {products.length} search results for: <strong>{query.join('/')}</strong></h1>
            )))}
            <GridResults>

                {(products.length > 0 && (
                    <tr>
                        <th>#</th>
                        <th>SKU</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>On hand</th>
                    </tr>
                ) )}
                {products.map((item, index) => (
                    <Tr onhand={item.item.onHand}>
                        <td><Link to={`/product/${item.item._id}`}>{item.item.sku}</Link></td>
                        <td><Link to={`/product/${item.item._id}`}>{item.item.title}</Link></td>
                        <td><Link to={`/product/${item.item._id}`}>{index}</Link></td>
                        <td><Link to={`/product/${item.item._id}`}>{item.item.price}</Link></td>
                        <td><Link to={`/product/${item.item._id}`}>{item.item.onHand}</Link></td>
                        <Image src={item.item.img}/>
                    </Tr>
                ))}
            </GridResults>
        </Container>
    )
}

export default SearchResults;