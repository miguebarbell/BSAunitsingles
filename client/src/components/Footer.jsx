import styled from "styled-components"
import {MailOutlined, Phone, Room} from "@material-ui/icons";


const yellow = '#fdcf19';

const Container = styled.div`
  padding: 0.5rem 0;
  display: flex;
  background-color: ${yellow};
  color: black;
`

const Left = styled.div`
  flex: 2.3;
  display: flex;
  flex-direction: column;
  text-align: justify;
  text-justify: inter-word;
  margin-right: 1rem;

`
const Logo = styled.h1`
  font-size: 1rem;
  margin-bottom: 3px;
`
const Desc = styled.p`
  margin: 0.25rem 0 0 0.125rem;
  font-size: 0.75rem;
  text-justify: inter-word;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 4.75rem;

`
// const Center = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-around;
// `
const Right = styled.div`
  //display: flex;
  //flex-direction: column;
  //justify-content: space-between;
  flex: 1;
  font-size: 0.75rem;
`
const ContactItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

// const Links = styled.div`
//`
const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>BSA Single Units</Logo>
                <Desc>Models we have parts for: C15 Star, C15T Trials, C15S Scrambler, C15SS Sport Star, C15 Pastoral,
                    C15 Starfire, C15 Roadster, B40 Star, B40SS Sport Star, B40 Enduro Star,B40 Roughrider, WDB40, BSA
                    441,B44GP Grand Prix, B44 Enduro, B44 Victor, B44 Victor Special, B44 Roadster, C25 Barracuda, B25
                    Starfire, B25 Fleetstar, B44 Shooting Star, B25T, B25SS, B50SS, B50T Trail, B50MX, TR25W Trophy,
                    T25T</Desc>
            </Left>
            {/*<Center>*/}
            {/*    <Links>*/}
            {/*        */}
            {/*    </Links>*/}
            {/*</Center>*/}
            <Right>
                <Logo>Contact</Logo>
                <ContactItem>
                    <MailOutlined style={{marginRight: '5px', height: '1.3rem'}}/>
                    <a href="mailto:peter@bsaunitsingles.com" style={{textDecoration: 'none', color: 'black'}}>
                        <span>peter@bsaunitsingles.com</span></a>
                </ContactItem>
                <ContactItem>
                    <Phone style={{marginRight: '5px', height: '1.3rem'}}/>
                    <span>(603) 532-7300</span>
                </ContactItem>

                <ContactItem>
                    <Room style={{marginRight: '5px', height: '1.3rem'}}/>
                    <span>New Hampshire, USA</span>
                </ContactItem>
            </Right>
        </Container>
    )
}

export default Footer