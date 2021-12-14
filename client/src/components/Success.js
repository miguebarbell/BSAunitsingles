import React from 'react'
import { navbarHeight} from "./Navbar";
import styled from "styled-components"


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