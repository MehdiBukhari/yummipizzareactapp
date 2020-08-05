import React, { Component } from 'react';
import M from "materialize-css";
import { Link } from 'react-router-dom'
class Navbar extends Component {
    render() {
        const login = localStorage.getItem("isLoggedIn");
        return (

            <nav className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo">Yummi Pizza</Link>
                    <ul className="right">
                        <li><Link to="/">Home</Link></li>
                        <li><Link className="dropdown-trigger" to="#!" data-target="dropdown1">Menu<i class="material-icons right">arrow_drop_down</i></Link></li>
                        <ul id="dropdown1" className="dropdown-content" >
                            <li><Link to="#!">one</Link></li>
                            <li><Link to="#!">two</Link></li>
                            <li className="divider"></li>
                            <li><Link to="#!">three</Link></li>
                        </ul>

                        <li><Link to="/cart">My cart</Link></li>
                        <li><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>
                        {login ? (
                            <li><Link to="/dasboard">My Dashboard</Link></li>
                        ) : (
                                <li><Link to="/sign-in">Sign-in</Link></li>
                            )}
                    </ul>
                </div>
            </nav>
        )

    }
    componentDidMount() {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
    };

}


export default Navbar;