import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Signin from "./components/Sigin/Sigin";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/dashboard/dashboard";
import logout from "./components/logout/logout";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import ProductDetail from "./components/ProductDetail/Productdetail";
import OrderDetial from "./components/orderdetail/OrderDetail";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import CreateMenu from "./components/CreateMenu/CreateMenu";
import DispatchOrder from "./components/DispatchOrders/DispatchOrder";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/sign-up" component={Signup} />
            <Route path="/sign-in" component={Signin} />
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/userdashboard" component={UserDashboard} />
            <Route path="/logout" component={logout} />
            <Route exact path="/product/:id" component={ProductDetail}/> 
            <Route exact path="/order/:id" component={OrderDetial} /> 
            <Route path="/create-menu" component={CreateMenu}/>
            <Route path="/create-product" component={CreateProduct}/>
            <Route path="/dispatch-order" component={DispatchOrder}/>
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
