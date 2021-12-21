import styled from "styled-components";
import {navbarHeight, yellow} from "../components/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../redux/userRedux";
import {useEffect, useState} from "react";
import {userRequest} from "../requestMethods";
import {Table} from "./Success";

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
const DetailsButton = styled.button``;
const Header = styled.div`
    padding-top: 5%;
    display: flex;
    width: 70vw;
    justify-content: space-around;
`;
const Profile = () => {
    const user = useSelector(state => state.user.currentUser);
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
    useEffect(() => {
        makeRequest()
    }, [])
    const makeRequest = async () => {
        try {
            const res = await userRequest.get(`/api/orders/find/${user._id}`)
            setOrders(res.data)
        } catch(err) {
            console.log(err)
        }
    }

    const dispatch = useDispatch()
    const logout = () => dispatch(logOut());
    return (
        <Container>
            <Header>
                <h1>Hello {user.name} {user.lastName}</h1>
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
                   <td>{order.amount} usd</td>
                   <td>{dateHumanReadable(order.createdAt)}</td>
                   <td>{order.status}</td>
                   <button>Details</button>
               </tr>
            ))}
            </Table>
            <LogoutBtn onClick={() => logout()}>LOG OUT</LogoutBtn>
        </Container>
    )
};

export default Profile;