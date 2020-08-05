import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Signin from "./components/Sigin/Sigin";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/dashboard/dashboard";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">

          <Navbar />

          <Switch>
            <Route exact path="/sign-up" component={Signup}></Route>
            <Route path="/sign-in" component={Signin}></Route>
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;