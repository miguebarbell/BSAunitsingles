import styled from "styled-components";
import { useLocation } from "react-router-dom";
import {navbarHeight, yellow} from "../components/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {delCart} from "../redux/cartRedux";
import {pushOrder} from "../redux/apiCalls";

const pdfOrder = {

	content: [
// title
		{ text: 'Thanks for ordering', style: 'header' },
	],
// items
	table: {
		body: [
//header row
			['SKU', 'Item', 'Price'],
			['34-0990', 'Cable 8 inches', '15.99']
		]
				 },
// summary
	styles: {

/*
    font: string: name of the font
    fontSize: number: size of the font in pt
    fontFeatures: string[]: array of advanced typographic features supported in TTF fonts (supported features depend on font file)
    lineHeight: number: the line height (default: 1)
    bold: boolean: whether to use bold text (default: false)
    italics: boolean: whether to use italic text (default: false)
    alignment: string: (‘left’ or ‘center’ or ‘right’ or ‘justify’) the alignment of the text
    characterSpacing: number: size of the letter spacing in pt
    color: string: the color of the text (color name e.g., ‘blue’ or hexadecimal color e.g., ‘#ff5500’)
    background: string the background color of the text
    markerColor: string: the color of the bullets in a buletted list
    decoration: string: the text decoration to apply (‘underline’ or ‘lineThrough’ or ‘overline’)
    decorationStyle: string: the style of the text decoration (‘dashed’ or ‘dotted’ or ‘double’ or ‘wavy’)
    decorationColor: string: the color of the text decoration, see color
		*/
		header: {
		fontSize: 20,
		bold: true,
				},
tableItems: {
margin: [0, 5, 0, 15]
						},
}
};


const Container = styled.div`
margin-top: ${navbarHeight};
padding: 2rem;
`;
const Header = styled.h1``;
export const Table = styled.table`
  width: 70vw;
  min-width: 200px;
  max-width: 1980px;
  *{
    text-align: start;
    padding: 0.125rem;
  }
`;

const Success = () => {
    // si no fue sucessfull no borrar el carro, y avisar en la pagina que fue erroneo el payment
    // ver la forma de convertir a pdf e imprimir
	// push la order to the database [username, credit card, items, price per item, total price, billing info, email]
	//clear the cart
	const dispatch = useDispatch()
	dispatch(delCart())
    const location = useLocation()
	// get the billing information
	const billingAddress = location.state.data.source;
	// console.log(location.state.data)
	// get the cart information
	const cart = location.state.products
	const user = useSelector(state => state.user)
	const order = {total_amount: cart.total,
		total_products: cart.quantity,
		user: user,
		billingAddress: billingAddress,
		products: cart.products.map(product => ({'id' : product._id, 'name' : product.title, 'quantity' : product.quantity }))}
	pushOrder(order);


	// this is the successful try
    return (
        <Container>
	        <Header>Thanks for your order.</Header>
	        <Table>
		        <tr style={{backgroundColor: `${yellow}`}}>
			        <th>Item</th>
			        <th>Quantity</th>
			        <th>Price</th>
		        </tr>
	        {cart.products.map(item => (
				<tr>
					<td>{item.title}</td>
					<td>{item.quantity}</td>
					<td>${item.price} usd</td>
				</tr>
	        ))}
		        <tr style={{backgroundColor: 'rgba(0,0,0, 0)' }}>
			        <th></th>
			        <th style={{backgroundColor: 'rgba(0,0,0, 0.2)' }}>Subtotal</th><th style={{backgroundColor: 'rgba(0,0,0, 0.2)' }}>{cart.total} usd</th>
		        </tr>
		        <tr style={{backgroundColor: 'white' }}>
			        <th></th>
			        <th>Shipping</th><th>55 usd</th>
		        </tr>
		        <tr>
			        <th></th>
			        <th style={{backgroundColor: 'rgba(0,0,0, 0.4)' }}>Total</th><th style={{backgroundColor: 'rgba(0,0,0, 0.4)' }}>{cart.total} usd</th>
		        </tr>

	        </Table>
	        <h2>Billing Info</h2>
	        <div>Address: <span>{billingAddress.address_line1}, {billingAddress.address_city}, {billingAddress.address_state}, {billingAddress.address_zip}, {billingAddress.address_country}</span></div>
	        <div>Name: <span>{billingAddress.name}</span></div>
	        <div>Email: <span>{billingAddress.email}</span></div>
	        <div>Phone: <span>{billingAddress.phone}</span></div>
	        <div>Card: <span>**** **** **** {billingAddress.last4}</span></div>
        </Container>
    )
};

export default Success;
