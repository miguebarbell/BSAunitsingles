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
    
`;
const LogoutBtn = styled.button`
    font-weight: bold;
    border-radius: 5px;
background-color: red;
    border: 0;
    padding: 0.25rem 0.5rem;
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
const Profile = () => {
    const history = useHistory();
    const {name, lastName, username, _id, isAdmin} = useSelector(state => state.user.currentUser);
    // console.log(name, lastName, email, username, _id);
    // console.log(user._id)
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
    // const cart = useSelector(state => state.cart)
    const makeRequest = async () => {
        // console.log(user)
        try {
            const res = await userRequest.get(`/api/orders/find/${_id}`)
            setOrders(res.data)
        } catch(err) {
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
        const res = await getOrder(id, {username :username, isAdmin : isAdmin})
        history.push("/order", {
            // address: res.data.address,
            // orderId: res.data._id,
            // card: res.data.card,
            // orderStatus: res.data.status,
            data:{...res.data}

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
                <EditBtn>Edit Account</EditBtn>
            </Header>
            <h2>Orders</h2>
            <Table>
                <tr>
                    <th>ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            {orders.map(order => (

               <tr>
                   <td>{order._id}</td>
                   <td>$ {order.amount.toFixed(2)} usd</td>
                   <td>{dateHumanReadable(order.createdAt)}</td>
                   <td>{order.status}</td>
                   <button onClick={() => {handleClick(order._id)}}>Details</button>
               </tr>
            ))}
            </Table>
            <LogoutBtn onClick={() => logout()}>LOG OUT</LogoutBtn>
        </Container>
    )
};

export default Profile;