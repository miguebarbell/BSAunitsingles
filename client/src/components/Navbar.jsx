import React, {useState} from 'react'
import styled from "styled-components";
import {Search, ShoppingCartOutlined} from "@material-ui/icons";
import {Badge} from "@material-ui/core";
import  LOGO_BSA  from "../assets/images/BSA.png";
import  LOGO_BIRK  from "../assets/images/BSA_Birk.png";

export const navbarHeight = '50px';
export const yellow = '#fdcf19';
const layoutChange = '1000px';


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
  width: calc(${navbarHeight}*.85);
  height: calc(${navbarHeight}*.85);
  padding: 2px;
  border: ${({open}) => open ? 'none' : '1px solid black'};
  border-radius: ${({open}) => open ? '50%' : '4px'};
  cursor: pointer;
  transition: all 0.5s linear;
  &:hover {
    background-color: ${({open}) => open? 'transparent' : 'rgba(0, 0, 0, 0.3)'};
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
  
`


const Burger = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
        <StyledBurger open={open} onClick={() => setOpen(!open)}>
            <div/>
            <div/>
            <div/>
        </StyledBurger>
        <Menu open={open}>
            <RightMenu>Categories</RightMenu>
            <RightMenu>Contact</RightMenu>
            <MenuItem>Register</MenuItem>
            <MenuItem>Login</MenuItem>
            <MenuItem><Badge color="primary" badgeContent={4}>
                <ShoppingCartOutlined/>Cart
            </Badge></MenuItem>
        </Menu>
        </>
    )
}

const Container = styled.div`
  background-color: ${yellow};
  width: 100vw;
  height: ${navbarHeight};
  font-weight: bold;
  display: flex;
  padding: 0.5rem 0;
  position: fixed;
  z-index: 5;
`
const Logos = styled.div`
  max-width: 20%;
  display: flex;
  cursor: pointer;
`
const SearchContainer = styled.div`
    border: 0.5px solid black;
    min-width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Input = styled.input`
  border: none;
  background-color: ${yellow};
  height: 100%;
  width: 100%;
  font-size: 1rem;
  &:focus { 
    outline: none;
    };
`
const Menu = styled.div`
  display: flex;
  align-items: center;
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
  padding: 0 1rem;
  cursor: pointer;
`

const RightMenu = styled.div`
  display: none;
  cursor: pointer;
  @media (max-width: ${layoutChange}) {
    display: flex;
  }
`

const Navbar = () => {
    return (
        <Container>
            <Logos>
                <img src={LOGO_BIRK} alt="BSA"></img>
                <img src={LOGO_BSA} alt="O"></img>
            </Logos>
            <SearchContainer>
                <Input style={{fontSize:"1.3rem", padding:"0 1rem"}}/>
                <Search/>
            </SearchContainer>
            <Burger/>
        </Container>
    )
}

export default Navbar