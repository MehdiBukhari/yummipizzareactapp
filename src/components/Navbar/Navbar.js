import React, { Component } from 'react';
import M from "materialize-css";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from "axios";
import { itemsQuantity } from "../actions/cartActions";
import "./Navbar.css"
class Navbar extends Component {
    userdata
    userscope
    constructor(props) {
        super(props)
        this.state = { menus: [] }
        this.userdata = (localStorage.getItem('userData'))?JSON.parse(localStorage.getItem('userData')):null;
        this.userscope=this.userdata!=null?this.userdata.scope:"/";
    }
    componentDidMount() {
        this.menulist();
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });

    };
    menulist() {
        axios.post('http://localhost:8000/api/admin/menuitems', null).then((response) => {
            if (response.status === 200) {
                this.props.itemsQuantity(response.data)
            }
        })
    }
    render() {
        const login = localStorage.getItem("isLoggedIn");
        let menuitems = this.props.menuitems.length ? (
            this.props.menuitems.map(item => {
                return (
                    <li key={item.id}><Link to="#!">{item.name}</Link></li>
                )
            })
        ) :
            (
                <li>Nothing.</li>
            );
        return (
            <nav className="nav-wrapper apnibar">
                <div className="container">
                    <Link to="/" className="brand-logo">Yummi Pizza</Link>
                    <ul className="right">
                        <li><Link to="/">Home</Link></li>
                        <li><Link className="dropdown-trigger" to="#!" data-target="dropdown1">Our Unique Menu</Link><i className="material-icons">arrow_drop_down</i></li>
                        <ul id="dropdown1" className="dropdown-content" >
                            {menuitems}
                        </ul>
                        <li><Link to="/cart">Your cart have {this.props.items.length} kinds of products </Link></li>
                        {this.props.loggedin ? (
                            <li><Link to="/logout">Logout</Link></li>,
                            <li><Link to={this.userscope ==="user" ? "userdashboard":"/dashboard"}>My Dashboard</Link></li>

                        ) : (
                                <li><Link to="/sign-in">Sign-in</Link></li>
                            )}
                    </ul>
                </div>
            </nav>
        )
    }


}
const mapDispatchToProps = (dispatch) => {
    return {
        itemsQuantity: (menuitems) => { dispatch(itemsQuantity(menuitems)) },
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.addedItems,
        menuitems: state.menuitems,
        loggedin: state.loggedin
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);