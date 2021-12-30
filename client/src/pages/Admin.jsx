import styled from "styled-components"
import {navbarHeight, yellow} from "../components/Navbar";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {getOrder, getOrders} from "../redux/apiCalls";
import {useEffect, useState} from "react";

const Container = styled.div`
  margin-top: ${navbarHeight};
  min-height: calc(100vh - ${navbarHeight});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  * {
    margin: 0.125rem;
  }
`;
const StatContainer = styled.div`
display: flex;
flex-wrap: wrap;`;
const StatTitle = styled.h3`
padding: 0.25rem 0;
`;
const StatField = styled.p``;
const Stat = styled.div`
border: 1px solid black;
  padding: 1rem;
  border-radius: 5px;
`;
const Button = styled.button`
  font-weight: bold;
  background-color: ${yellow};
  color: red;
  border: 0;
  padding: 0.25rem;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    color: ${yellow};
    background-color: red;
  }
`;


const Stats = () => {
	const [pending, setPending] = useState(0);
	const [shipped, setShipped] = useState(0);
	const [other, setOther] = useState(0);
	const orders = async () => {
		try {
			const res = await getOrders();
			// console.log(res.data)
			setPending(res.data.filter(order => order.status === "pending"))
			setShipped(res.data.filter(order => order.status === "shipped"))
			setOther(res.data.filter(order => order.status !== "pending" && order.status  !== "shipped"))
		} catch (e) {
			console.log(e);
		}
	}
	useEffect(() => {
		// will update all the stats in every change
		orders();
	}, [])
	return (
		<StatContainer>
			<Stat>
				<StatTitle>Order Resume</StatTitle>
				<StatField>Pending: {pending.length}</StatField>
				<StatField>Shipped: {shipped.length}</StatField>
				<StatField>Other Status: {other.length}</StatField>
				<StatField>Total: {other.length + pending.length + shipped.length}</StatField>
			</Stat>
			<Stat>
				<StatTitle>Income Resume</StatTitle>
				<StatField>Last 7 days: $1200 +$240</StatField>
				<StatField>Last 30 days: $5400 +$500</StatField>
			</Stat>
			<Stat>
				<StatTitle>Top 5 users</StatTitle>
				<StatField>1. </StatField>
				<StatField>2. </StatField>
				<StatField>3. </StatField>
				<StatField>4. </StatField>
				<StatField>5. </StatField>
			</Stat>
			<Stat>
				<StatTitle>Search</StatTitle>
				<input placeholder="Search an order"/>
				<input placeholder="Search an user"/>
			</Stat>
			{/*section to add del modify product*/}

		</StatContainer>
	)
}

const Admin = () => {
	const user = useSelector(state => state.user);
	if (!user.currentUser) {
	return (
		<Redirect to="/login"/>
		);} else if (user.currentUser.isAdmin) {
		return (
			<Container>
				<h3>Good day <strong>{user.currentUser.name}</strong></h3>
				<Stats/>
			</Container>
			)
	} else {
		return (
			<Redirect to="/"/>
		)
	}
};

export default Admin;
