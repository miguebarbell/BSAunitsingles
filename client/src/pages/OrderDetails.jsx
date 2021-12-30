import { useLocation } from "react-router-dom";
import {Container, Header, Table} from "./Success";


const OrderDetails = () => {
    const location = useLocation();
    // console.log(location.state)
    const address = location.state.data.address;
    const card = location.state.data.card;
    const products = location.state.data.products
    // console.log(card)
    // console.log(address)
    return (
        <Container>
            <Header>Details for Order {location.state.data._id}</Header>
            <h2>Status: {location.state.data.status}</h2>
            <Table>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Price</th>
                </tr>
                {products.map(item => (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price.toFixed(2)} usd</td>
                        <td>${item.subtotal.toFixed(2)} usd</td>
                    </tr>
                ))}
                <tr>
                    <th></th>
                    <th></th>
                    <th>Subtotal</th>
                    <th>$ {location.state.data.amount.toFixed(2)} usd</th>
                </tr>

                <tr style={{backgroundColor: 'white' }}>
                    <th></th>
                    <th></th>
                    <th>Shipping</th><th>$ 55.00 usd</th>
                </tr>
                <tr>
                    <th></th>
                    <th></th>
                    <th style={{backgroundColor: 'rgba(0,0,0, 0.4)' }}>Total</th><th style={{backgroundColor: 'rgba(0,0,0, 0.4)' }}>$ {location.state.data.amount.toFixed(2)} usd</th>
                </tr>

            </Table>
            <h2>Shipping information</h2>
            <p>Paid with {card.last4}</p>
            <p>Address: {address.street1} {address.city}, {address.state}, {address.zip}, {address.country}</p>
            <p>Telephone: {address.telephone}</p>
            <p>Email: {address.email}</p>
            <br/>
            <h3>If there is any issue with your order, please call us.</h3>
        </Container>
    )
};

export default OrderDetails;