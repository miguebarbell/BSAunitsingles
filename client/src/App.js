import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Cart from "./pages/Cart"
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Success from "./pages/Success";
import Navbar from "./components/Navbar";
import {useSelector} from "react-redux";
import Profile from "./pages/Profile"
import Footer from "./components/Footer";
import OrderDetails from "./pages/OrderDetails";
import Admin from "./pages/Admin";
import SearchResults from "./pages/SearchResults";

function App() {

  const user = useSelector((state) => state.user.currentUser);

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
          <Route path="/peter">
            <Admin/>
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/"/> : <Login/>}
          </Route>
          <Route path="/register">
            {user ? <Redirect to="/"/> : <Register/>}
          </Route>
          <Route path="/profile">
            {user? <Profile/> : <Redirect to="/"/>}
          </Route>
          <Route path="/order">
            <OrderDetails/>
          </Route>
          <Route path="/search/:query">
            <SearchResults/>
          </Route>
        </Switch>
        <Footer/>
      </Router>
  );
}

export default App;
