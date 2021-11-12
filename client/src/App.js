import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Pay from "./components/Pay"
import Success from "./components/Success"
import Cart from "./pages/Cart"
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";

const YELLOW = '#fdcf19';

function App() {
  return (
      <Register/>
      // <Product/>
      // <ProductList/>
      // <Home/>
      // <Router>
      //   <Switch>
      //     <Route path="/pay">
      //       <Pay/>
      //     </Route>
      //     <Route path="/success">
      //       <Success/>
      //     </Route>
      //   </Switch>
      // </Router>
  );
}

export default App;
