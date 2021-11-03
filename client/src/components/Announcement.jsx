import styled from "styled-components";
import { navbarHeight } from "./Navbar";
export const announcementHeight = '1.2rem';


const Container = styled.div`
  top: ${navbarHeight};
  color: white;
  background-color: red;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: ${announcementHeight};
  z-index: 4;
  position: absolute;
`
const Announcement = () => {
    return (
        <Container>
            Next motorcycle meeting will be in my barn, free beer.
        </Container>
    )
}

export default Announcement