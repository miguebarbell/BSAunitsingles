import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
// import Pay from "./components/Pay"
// import Success from "./components/Success"
import Cart from "./pages/Cart"
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Success from "./pages/Success";
import Navbar from "./components/Navbar";

// const YELLOW = '#fdcf19';

function App() {
  const user = true;
  return (
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products/:category">
            <ProductList />
          </Route>
          <Route path="/product/:id">
            <Product/>
          </Route>
          <Route path="/cart">
            <Cart/>
          </Route>
          <Route path="/success">
            <Success/>
          </Route>

          <Route path="/login">
            {/*if user is logged, redirect to the home*/}
            {user ? <Redirect to="/"/> : <Login/>}
          </Route>
          <Route path="/register">
            {/*if user is logged, redirect to the home*/}
            {user ? <Redirect to="/"/> : <Register/>}
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
