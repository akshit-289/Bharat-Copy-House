import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./screens/Login"; 
import Home from "./screens/Home";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import Signup from './screens/Signup';
import Checkout from './screens/Checkout';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrders';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
global.loggedIn = false;
global.cart = [];
function App() {
  return (
  <CartProvider>
    <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/createuser" element={<Signup />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/myOrder" element={<MyOrder />}></Route>
          </Routes>
        </div>
      </Router>
  </CartProvider>
  );
}

export default App;