import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {Search, ShoppingCartOutlined} from "@material-ui/icons";
import {Badge} from "@material-ui/core";
import LOGO_BSA from "../assets/images/BSA.png";
import LOGO_BIRK from "../assets/images/BSA_Birk.png";
import {Link, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {getProducts} from "../redux/apiCalls";
import Fuse from "fuse.js";

export const layoutChange = '1000px';
export const yellow = '#fdcf19';
export const navbarHeight = '50px';

const MailTo = 'mailto:miguel@debloat.us?&subject=You%20are%20what%20we%20need.%20&body=Hi,%20I%20visited%20your%20projects%20have%20all%20the%20functionalities%20that%20we%20need,%20please%20give%20me%20more%20contact%20details.%20Thanks!';
const SearchBarInput = styled.input`
  border: none;
  background-color: ${yellow};
  height: 100%;
  width: 100%;
  font-size: 1rem;
  padding-left: 0.25rem;

  &:focus {
    outline: none;
  }
;
`;
const StyledBurger = styled.div`
  z-index: 7;
  @media (max-width: ${layoutChange}) {
    display: flex;
  }
  display: none;
  align-items: center;
  justify-content: space-around;
  flex-flow: column;
  position: fixed;
  top: 5px;
  right: 5px;
  width: calc(${navbarHeight} * .85);
  height: calc(${navbarHeight} * .85);
  padding: 2px;
  border: ${({open}) => open ? 'none' : '1px solid black'};
  border-radius: ${({open}) => open ? '50%' : '4px'};
  cursor: pointer;
  transition: all 0.5s linear;

  &:hover {
    background-color: ${({open}) => open ? 'transparent' : 'rgba(0, 0, 0, 0.3)'};

    div {
      background-color: ${({open}) => open ? 'red' : 'black'};
    }
  }

  div {
    background-color: black;
    width: 100%;
    height: 15%;
    transform-origin: 5px;
    transition: all 0.5s linear;

    &:hover {
    }

    &:nth-child(1) {
      transform: ${({open}) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    &:nth-child(3) {
      transform: ${({open}) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }

    &:nth-child(2) {
      display: ${({open}) => open ? 'none' : 'block'};
      transform: ${({open}) => open ? 'rotate(-45deg)' : 'rotate(0)'};
      opacity: ${({open}) => open ? 0 : 1};
    }
  }

  @media (max-width: ${layoutChange}) {
    display: flex;
  }

`;
const ProfileItem = styled.div`
  display: ${props => (props.user !== false) ? 'block' : 'none'};
  transition: all 0.3s ease;

  * {
    text-decoration: none;
  }

  &:hover {
    color: red;
  }
`;
const Burger = () => {
    const {currentUser} = useSelector(state => state.user);
    const [open, setOpen] = useState(false)
    const quantity = useSelector(state => state.cart.quantity)
    return (
        <>
            <StyledBurger open={open} onClick={() => setOpen(!open)}>
                <div/>
                <div/>
                <div/>
            </StyledBurger>
            <Menu open={open}>
                <RightMenu onClick={() => window.location = "/#categories"}>Categories</RightMenu>
                <RightMenu onClick={() => window.location = {MailTo}}>Contact</RightMenu>
                <MenuItem user={currentUser}><Link to="/register">Register</Link></MenuItem>
                <MenuItem user={currentUser}><Link to="/login">Login</Link></MenuItem>
                <ProfileItem user={currentUser}>Hi <Link to="/profile">{currentUser.name}</Link></ProfileItem>
                <Link to="/cart">
                    <MenuItem style={{display: 'block'}}><Badge color="secondary" badgeContent={quantity}>
                        <ShoppingCartOutlined/>Cart
                    </Badge></MenuItem>
                </Link>


            </Menu>
        </>
    )
};
const Container = styled.div`
  background-color: ${yellow};
  width: 100vw;
  height: ${navbarHeight};
  font-weight: bold;
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  top: 0;
  left: 0;
  position: fixed !important;
  z-index: 5;
  @media (max-width: ${layoutChange}) {
    &:nth-child(2) {
    }

    @media (max-width: 620px) {
      .birk {
        display: none;
      }
    }
  }
`;
const Logos = styled.div`
  max-width: 20%;
  display: flex;
  cursor: pointer;
  position: fixed;
  height: calc(${navbarHeight} * .85);
  top: 0;
  left: 0;
`;
const SearchContainer = styled.form`
  border: 0.5px solid black;
  min-width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 200px;
  @media (max-width: ${layoutChange}) {
    margin-left: 100px;
    width: 40%;
  }
`;
const SearchResults = styled.div`
  background-color: ${yellow};
  position: absolute;
  padding: 0.25rem 0;
  color: black;

  * {
    color: black;
    text-decoration: none;
    padding: 0.125rem 0;

    &:hover {
      color: red;
    }
  }
`;
const Menu = styled.div`
  a:link {
    color: inherit;
  }

  display: flex;
  align-items: center;
  // justify-content: flex-end;
  padding: 1rem;
  @media (max-width: ${layoutChange}) {
    display: ${({open}) => open ? 'flex' : 'none'};
    flex-flow: column;
    background-color: ${yellow};
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    min-width: 300px;
    width: 50vw;
    justify-content: space-around;
    transition: all 0.5s ease-in-out;
    transform: ${({open}) => open ? 'translateX(0)' : "translateX(100%)"};
    opacity: ${({open}) => open ? 1 : 0};
  }
`
const MenuItem = styled.div`
  display: ${props => (props.user === false) ? 'block' : 'none'};
  padding: 0 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: red;
    // outline: solid red 1px;
    // &:before {
    // content: '>';
    // position: absolute;
    // transform: translateX(-100%);
    // }
    // &:after {
    // content: '<';
    // }
  }

  //a:visited {color: black;};
  //a:link {
  //    color: inherit;
  //}
  * {
    text-decoration: none;
    //a:link {
    //    color: inherit;
    //}
  }
`
const RightMenu = styled.div`
  display: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: red;
    // outline: solid red 1px;
    // &:before {
    // content: '>';
    // position: absolute;
    // transform: translateX(-100%);
    // }
    // &:after {
    // content: '<';
    // position: absolute;
    // transform: translateX(100%);
    // }
  }

  @media (max-width: ${layoutChange}) {
    display: flex;
  }
`
const Navbar = () => {
    const history = useHistory();
    // const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState([])
    const searchResults = async () => {
        // console.log('accessing to search result')
        try {
            // console.log("products" + allProducts)
            const res = await getProducts()
            setAllProducts(res.data);
            // console.log("products" + allProducts)
        } catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
        searchResults()
    }, [])
    const Input = ({placeholder}) => {
        const [filtered, setFiltered] = useState([])
        // const [getTheProducts, setGetTheProducts] = useState(false)
        const clearInput = () => {
            setFiltered([])
        }

        // let showResults = false
        const [showResults, setShowResults] = useState(true)
        let timeouts = window.setTimeout(() => {
        }, 1)
        const handleInput = (e) => {
            while (timeouts--) window.clearTimeout(timeouts)
            window.setTimeout(() => {
                setShowResults(false)
            }, 4000)
            setShowResults(true)
            const searchWord = e.target.value;
            // console.log(filtered)
            if (searchWord === '') {
                setFiltered([])
            } else {
                // fuze search
                const options = {
                    keys: [
                        {
                            name: 'title',
                            weight: 0.4
                        }, {
                            name: 'desc',
                            weight: 0.3
                        }, {
                            name: 'sku',
                            weight: 0.3
                        }]
                }
                const fuse = new Fuse(allProducts, options)
                setFiltered(fuse.search(searchWord.toLowerCase()).map(item => item.item))
                // console.log(filtered)
            }
        }

        return (
            <div>
                <SearchBarInput
                    placeholder={placeholder}
                    onChange={handleInput}
                />
                {filtered.length > 0 && showResults && (
                    <SearchResults>
                        {filtered.slice(0, 25).map(item => {
                            return (
                                <Link key={item._id} to={`/product/${item._id}`} onClick={clearInput}>
                                    <p>{item.sku} - {item.title}</p>
                                </Link>
                            )
                        })}
                    </SearchResults>
                )}

            </div>
        )
    }
    const search = (e) => {
        e.preventDefault()
        // console.log('future search page')
        const query = e.target[0].value
        // document.getElement.placeholder = "Search other product..."
        history.push(`/search/${query}`)
    }
    return (
        <Container>
            <Link to="/">
                <Logos>
                    <img src={LOGO_BIRK} alt="BSA" className="birk"/>
                    <img src={LOGO_BSA} alt="O" className="bsa-logo"/>
                </Logos>
            </Link>
            <SearchContainer onSubmit={search}>
                <Input onClick={() => searchResults} placeholder="Find a product..."
                       style={{fontSize: "1.3rem", padding: "0 0.25rem"}}/>
                <Search onClick={search} style={{cursor: "pointer"}}/>
            </SearchContainer>
            <Burger/>
        </Container>
    )
}

export default Navbar