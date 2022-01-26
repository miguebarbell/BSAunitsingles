import styled, {keyframes} from "styled-components";

const Animation = keyframes`
  0%,80% {
    transform: rotateY(360deg) 
  }
`

const Letter = styled.span`
  color: black;
  position: relative;
  display: inline-block;
  font-size: 40px;
  text-transform: uppercase;
  animation: ${Animation} 2s infinite;
  animation-delay: calc(.2s * ${(props) => props.delay})
`
const Wait = styled.div`
  position: fixed;
  
`
const Body = styled.div`
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 11;
`

const Loading = (text) => {
    return (
        <Body>
            <Wait>
                {text.text.split('').map((letter, index) => (
                    <Letter key={index} delay={index + 1}>{letter}</Letter>
                ))}
            </Wait>
        </Body>
    )


}
;

export default Loading;