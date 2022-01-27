import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../redux/userRedux";
import {useEffect, useState} from "react";
import {userRequest} from "../requestMethods";
import {Table} from "./Success";
import {getOrder} from "../redux/apiCalls";
import {useHistory} from "react-router-dom";
import {navbarHeight, yellow} from "../components/Navbar";

const Container = styled.div`
  margin-top: ${navbarHeight};
  width: 100vw;
  min-width: 200px;
  max-width: 1980px;
  display: flex;
  //justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;

`;
const NoContainer = styled.div`
  padding: 3rem;
`
const LogoutBtn = styled.button`
  font-weight: bold;
  border-radius: 5px;
  background-color: red;
  border: 0;
  padding: 0.25rem 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${yellow};
    color: red;
  }
`;
const EditBtn = styled.button`
  font-weight: bold;
  border-radius: 5px;
  background-color: dodgerblue;
  border: 0;
  padding: 0.25rem 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${yellow};
    color: dodgerblue;
  }
`;
// const DetailsButton = styled.button``;
const Header = styled.div`
  padding-top: 5%;
  display: flex;
  width: 70vw;
  justify-content: space-around;
`;

const TrHeader = styled.tr`
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {


    display: block;
  }
`;
const TrBody = styled.tr`
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {


    display: block;
  }
`;

const Th = styled.th`
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {


    display: block;
  }`

const Td = styled.td`
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {


    display: block;
  }`

const Tbody = styled.tbody`
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {


    display: block;

    td:before {
      font-weight: bold;
    }

    td:nth-child(1):before {
      content: "ID: ";
    }

    td:nth-child(2):before {
      content: "Price: ";
    }

    td:nth-child(3):before {
      content: "Date: ";
    }

    td:nth-child(4):before {
      content: "Status: ";
    }
  }
`
const Thead = styled.thead`
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {


    display: block;
    position: absolute;
    top: -9999999px;
    left: -9999999px;
  }
`

const Profile = () => {
    const history = useHistory();
    const {name, lastName, username, _id, isAdmin} = useSelector(state => state.user.currentUser);
    // console.log(name, lastName, username, _id);
    // console.log(username._id)
    // hacer un userRequest
    const dateHumanReadable = (date) => {
        // console.log(date)
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const humanReadable = new Date(date)
        // console.log(humanReadable.toString())
        return `
        ${months[humanReadable.getMonth()]} 
        ${humanReadable.getUTCDate()},
        ${humanReadable.getFullYear()} - 
        ${humanReadable.getHours()}:${humanReadable.getMinutes()}`
    }
    const [orders, setOrders] = useState([]);
    // console.log(orders)
    // const cart = useSelector(state => state.cart)
    const makeRequest = async () => {
        // console.log(user)
        try {
            const res = await userRequest.get(`api/orders/find/${_id}`)

            setOrders(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        makeRequest()
    }, [makeRequest]);


    const dispatch = useDispatch()
    const logout = () => dispatch(logOut());
    const handleClick = async (id) => {
        // console.log(id)
        const res = await getOrder(id, {username: username, isAdmin: isAdmin})
        history.push("/order", {
            // address: res.data.address,
            // orderId: res.data._id,
            // card: res.data.card,
            // orderStatus: res.data.status,
            data: {...res.data}

        })

        // console.log(res)
        // return (
        //     <OrderDetails order={res}/>
        // )
    }
    return (
        <Container>
            <Header>
                <h1>Hello {name} {lastName}</h1>
                {/*<EditBtn>Edit Account</EditBtn>*/}
            </Header>
            {orders.length > 0 && (
                <>
                    <h2>Orders</h2>
                    <Table role="table">
                        <Thead role="rowgroup">
                            <TrHeader role="row">
                                <Th role="columnheader">ID</Th>
                                <Th role="columnheader">Amount</Th>
                                <Th role="columnheader">Date</Th>
                                <Th role="columnheader">Status</Th>
                            </TrHeader>
                        </Thead>
                        <Tbody role="rowgroup">
                            {orders.map((order, index) => (

                                <TrBody key={index} role="row">
                                    <Td role="cell">{order._id}</Td>
                                    <Td role="cell">$ {order.amount.toFixed(2)} usd</Td>
                                    <Td role="cell">{dateHumanReadable(order.createdAt)}</Td>
                                    <Td role="cell">{order.status}</Td>
                                    <Td role="cell">
                                        <button onClick={() => {
                                            handleClick(order._id)
                                        }}>Details
                                        </button>
                                    </Td>
                                </TrBody>
                            ))}
                        </Tbody>
                    </Table>
                </>
            ) || (
                <NoContainer>
                    <h1>You don't have any order yet...</h1>

                </NoContainer>
            )}
            <LogoutBtn onClick={() => logout()}>LOG OUT</LogoutBtn>
        </Container>
    )
};

export default Profile;