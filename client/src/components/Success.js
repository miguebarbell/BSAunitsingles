import React from 'react'
import styled from "styled-components"
import {navbarHeight} from "./Navbar";


const Container = styled.div`
margin-top: ${navbarHeight};
// position: absolute;
// top: ${navbarHeight};
`
const Success = () => {
    return (
        <Container>
            <div>

                Success component
            </div>
        </Container>
    )
}

export default Success