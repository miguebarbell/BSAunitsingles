import styled from "styled-components"
import {loadStripe} from "@stripe/stripe-js";
import {CardElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import {useState} from "react";
import {publicRequest} from "../requestMethods";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {yellow} from "./Navbar";

const STRIPE_KEY = 'pk_test_51JjmTWBN6ojyqIxPr1Xg9QGKPn7hW1EmtON0UZ1fp6BZzBY01BCTvJRAOoqeHGhsbHu1618p0wPVl3y0EBdwLVFI002Tnn3HJN'
const stripePromise = loadStripe(STRIPE_KEY)

const Container = styled.div``;
const InputContainer = styled.div`
display: flex;
width: 100%;
  //justify-content: space-around;
`;


const Form = styled.form`
	  position: fixed !important;
	  top: 0;
	  left: 0;
	  height: 100vh;
	  width: 100vw;
	  background-color: rgba(0, 0, 0, 0.8);
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  //* {
      //  margin: 1rem;
      //}
      
	  .StripeElement {
		  height: 40px;
		  padding: 10px 12px;
		  width: 100%;
		  color: #32325d;
		  background-color: white;
		  border: 1px solid transparent;
		  border-radius: 4px;
		  box-shadow: 0 1px 3px 0 #e6ebf1;
		  -webkit-transition: box-shadow 150ms ease;
		  transition: box-shadow 150ms ease;
	}
		.StripeElement--focus {
		  box-shadow: 0 1px 3px 0 #cfd7df;
	}
		.StripeElement--invalid {
	  border-color: #fa755a;
	}
		.StripeElement--webkit-autofill {
	  background-color: #fefde5 !important;
}
	`;
const Input = styled.input`
	  margin: 0 0 1rem 1rem;
      height: 40px;
      padding: 10px 12px;
      width: 100%;
      color: #32325d;
      background-color: white;
      border: 1px solid transparent;
      border-radius: 4px;
      box-shadow: 0 1px 3px 0 #e6ebf1;
      -webkit-transition: box-shadow 150ms ease;
      transition: box-shadow 150ms ease;
	  &:focus {
        box-shadow: 0 1px 3px 0 #cfd7df;
	  }
	`;
const Fieldset = styled.fieldset`
	  display: flex;
	  flex-direction: column;
	  padding: 1rem;
	  margin: 0 15px 20px;
		//padding: 0;
		border-style: none;
	  color: black;
		background-color: ${yellow};
		will-change: opacity, transform;
		box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #829fff;
		border-radius: 4px;
	  min-width: 40%;
	  min-height: 20%;
	  
	
	`;
const FormRow = styled.div`
	  color: black;
	  background-color: white;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-align: center;
		align-items: center;
		margin-left: 15px;
		border-top: 1px solid #819efc;
	  min-width: 90%;
	  //min-height: 20%;
	`
const PaymentForm = () => {

	const [cardDetails, setCardDetails] = useState({})
	const CARD_OPTIONS = {
	  style: {
		base: {
		  color: "#32325d",
		  fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
		  fontSmoothing: "antialiased",
		  fontSize: "16px",
		  "::placeholder": {
			color: "#aab7c4",
		  },
		},
		invalid: {
		  color: "#fa755a",
		  iconColor: "#fa755a",
		},
	  },
	}
	const [success, setSuccess] = useState(false);
	const stripe = useStripe();
	const elements = useElements();
	const [inputs, setInputs] = useState({});
	const handleSubmit = async (e) => {
		e.preventDefault()
		setInputs({
			name: e.target.name.value,
			lastname: e.target.lastname.value,
			street: e.target.street.value,
			city: e.target.city.value,
			state: e.target.state.value,
			country: e.target.country.value,
			zip: e.target.zip.value,
			telephone: e.target.telephone.value,
			email: e.target.email.value,
		})
		// console.log(inputs)
		const {error, paymentMethod} = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement)
		})

		if (!error) {
			try {
				const {id} = paymentMethod
				// console.log("payment Method", paymentMethod)
				setCardDetails(paymentMethod)
				// console.log("id", id)
				console.log(cart.total)
				const res = await publicRequest.post("checkout/payment", {
					// amount: 'este es el error',
					amount: (+cart.total) * 100,
					id
				})
				if (res.data.success) {
					console.log("Successful payment")
					console.log("resdata", res.data)
					setSuccess(true)
				}
			} catch (err) {
				console.log("Payment Failed ", err)
			}
		} else {
			console.log(error.message)
		}
	}
;
	const cart = useSelector(state => state.cart)
	const history = useHistory();
	// check all the data that we want to collect

  // const handleChange = (event) => {
	//   event.preventDefault();
	//   const name = event.target.name;
	//   const value = event.target.value;
	//   setInputs(values => ({...values, [name]: value}))
  // }

	// console.log(inputs)
	// console.log(elements)
	return (
		<Container>
			{!success ?
			<Form onSubmit={handleSubmit}>
				<Fieldset>
					<h1>CHECK OUT</h1>
					<InputContainer>
						<Input
						       id="name"
						       placeholder="Name" type="text" required/>
						<Input
							id="lastname"
							placeholder="Lastname" type="text" required/>
					</InputContainer>
					<InputContainer>
						<Input
							id="street"
							placeholder="Street" type="text" required/>
						<Input
							id="state"
							placeholder="State" type="text" required/>
					</InputContainer>
					<InputContainer>
						<Input
							id="city"
							placeholder="City" type="text" required/>
						<Input
							id="country"
							placeholder="Country" type="text" required/>
						<Input
							id="zip"
							placeholder="Zip" type="text"/>
					</InputContainer>
					<InputContainer>
						<Input
							id="telephone"
							placeholder="Telephone" type="text" required/>
						<Input
							id="email"
							placeholder="E-mail" type="email" required/>
					</InputContainer>
					<FormRow>
						<CardElement options={CARD_OPTIONS}/>
					</FormRow>
				</Fieldset>
				<button>PAY</button>
			</Form> :
				history.push("/success", {
					billingAddress: inputs,
					products: cart,
					card: cardDetails
					// card: res.data
				})
			}
		</Container>
	)
}

export default function CheckoutForm() {
	return (
		<Elements stripe={stripePromise}>
			<PaymentForm/>
		</Elements>
	)

}