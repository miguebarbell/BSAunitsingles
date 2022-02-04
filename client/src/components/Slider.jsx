import styled from "styled-components";
import {ArrowLeftOutlined, ArrowRightOutlined} from "@material-ui/icons";
import {useEffect, useState} from "react";
import {sliderItems} from "../data"
import {announcementHeight} from "./Announcement";
import {navbarHeight, yellow} from "./Navbar";

const Container = styled.div`
  width: 100vw;
  top: calc(${announcementHeight} + ${navbarHeight});
  height: calc(100vh - ${announcementHeight} - ${navbarHeight});
  display: flex;
  position: relative;
  overflow: hidden;
`
const Arrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: transparent;
  height: 30px;
  width: 30px;
  position: absolute;
  top: 50%;
  left: ${props => props.direction === "left" && "10px"};
  right: ${props => props.direction === "right" && "10px"};
  cursor: pointer;
  backdrop-filter: blur(5px);
  //opacity: .5;
  z-index: 2;

  &:hover {
    color: black;
    background-color: ${yellow};
  }
`
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  transition: all 1.5s ease;
  transform: translateX(${props => props.slideIndex * -100}vw);

`

const Slide = styled.div`
  display: flex;
  //align-items: center;
  height: 100%;
  width: 100vw;
  background: url(${props => props.bg}) no-repeat center;
  //background-repeat: no-repeat;
  background-size: cover;
  justify-content: flex-end;
  align-items: end;
`
const Title = styled.h1`
  //background-color: rgba(255, 255, 255, 0.15);
  background-color: ${yellow};
  opacity: 0.55;
  backdrop-filter: blur(45px);
  color: black;
  font-size: 2rem;
  max-width: 70%;
  padding: 2rem;
  border-radius: 5px;
  margin: 1rem;
`

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0)
    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1)
        } else {
            setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0)
        }
    }
    useEffect(() => {
        const interval = setInterval(handleClick, 5000, "right")
        return () => clearInterval(interval)
    })
    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick('left')}>
                <ArrowLeftOutlined fontSize="large"/>
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map((item) => (
                    <Slide bg={item.image} key={item.id}>
                        <Title>{item.title}</Title>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick('right')}>
                <ArrowRightOutlined fontSize="large"/>
            </Arrow>
        </Container>
    )
}

export default Slider