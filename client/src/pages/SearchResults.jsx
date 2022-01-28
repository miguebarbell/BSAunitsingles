import styled from "styled-components";
import {Container} from "./Success";
import {Link, useLocation} from "react-router-dom";
import {findProduct} from "../redux/apiCalls";
import {useEffect, useState} from "react";
import {yellow} from "../components/Navbar"
import Loading from "../components/Wait";
// 600px -> mobil

const Tbody = styled.tbody`
  @media screen and (max-width: 600px) {

    display: block;
  }

`

const Thead = styled.thead`
  @media screen and (max-width: 600px) {

    display: block;
  }

`

const Th = styled.th`
  @media screen and (max-width: 600px) {

    display: block;
  }

`

const TrBody = styled.tr`
  td:nth-child(3) {
    max-width: 40vw;
    @media screen and (max-width: 600px) {
      max-width: 90vw;
    }
  }

  @media screen and (max-width: 600px) {
    width: 95vw;
    display: block;
    td:before {
      font-weight: bold;
    }

    td:nth-child(1):before {
      content: "# ";
    }

    td:nth-child(2):before {
      content: "SKU: ";
    }

    td:nth-child(3):before {
      content: "Item: ";
    }

    td:nth-child(4):before {
      content: "Price: ";
    }

    td:nth-child(5):before {
      content: "On hand: ";
    }

    td:nth-child(5) {
      @media screen and (max-width: 600px) {
        margin-bottom: 1rem;
        border-bottom: 2px solid black;
      }
    }
  }

  background-color: ${({onhand}) => (onhand <= 0) ? "rgba(250, 0,0,0.2)" : "rgba(0,0,0,0.1)"};

  &:hover {
    img {
      display: block;
    }
  }
`
const TrHead = styled.tr`
  @media screen and (max-width: 600px) {
    position: absolute;
    top: -99999999px;
    left: -99999999999px;

    display: block;
  }

`


const Td = styled.td`
  @media screen and (max-width: 600px) {

    display: block;
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


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
  background-color: ${yellow};
  min-height: 375px;
  min-width: 375px;
  width: 30vh;
  height: 30vh;
  max-width: 500px;
  max-height: 500px;
  @media screen and (max-width: 1700px) {
    right: 0;
    //width: 30vh;
    //height: 25vh;
    min-height: 100px;
    min-width: 100px;
    @media screen and (max-width: 1175px) {
      top: 80%;
    }

  }
`
const SearchResults = () => {
    const location = useLocation();
    const [products, setProduct] = useState([])
    const query = location.pathname.split('/').slice(2, location.pathname.split('/').length)
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
        <Container style={{backgroundColor: "white"}}>
            {((products.length === 0 && (
                <Loading text="loading..."/>
            )) || (products.length > 0 && (
                <h1>Showing {products.length} search results for: <strong>{query.join('/')}</strong></h1>
            )))}
            <GridResults role="table">

                {(products.length > 0 && (
                    <Thead role="rowgroup">
                        <TrHead role="row">
                            <Th role="columnheader">#</Th>
                            <Th role="columnheader">SKU</Th>
                            <Th role="columnheader">Item</Th>
                            <Th role="columnheader">Price</Th>
                            <Th role="columnheader">On hand</Th>
                        </TrHead>
                    </Thead>
                ))}
                <Tbody role="rowgroup">
                    {products.map((item, index) => (
                        <TrBody onhand={item.item.onHand} role="row">
                            <Td role="cell"><Link to={`/product/${item.item._id}`}>{index + 1}</Link></Td>
                            <Td role="cell"><Link to={`/product/${item.item._id}`}>{item.item.sku}</Link></Td>
                            <Td role="cell"><Link
                                to={`/product/${item.item._id}`}>{item.item.title}</Link>
                            </Td>
                            <Td role="cell"><Link to={`/product/${item.item._id}`}>{item.item.price}</Link></Td>
                            <Td role="cell"><Link to={`/product/${item.item._id}`}>{item.item.onHand}</Link></Td>
                            <Image src={item.item.img}/>
                        </TrBody>
                    ))}
                </Tbody>
            </GridResults>
        </Container>
    )
}

export default SearchResults;