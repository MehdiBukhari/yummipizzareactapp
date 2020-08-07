import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart, productlist } from '../actions/cartActions'
import axios from "axios";
class Menu extends Component {

    handleClick = (id) => {
        this.props.addToCart(id);
        //console.log(this.props.items.length)
    }
    componentDidMount() {
        //this.productlist();
    }
    // productlist() {
    //     axios.post('http://localhost:8000/api/user/food', null).then((response) => {
    //         if (response.status === 200) {
    //             console.log(response.data)
    //             this.props.productlist(response.data)
    //         }
    //     })
    // }
    render() {
        return (<h1>helo</h1>)
    }
}
export default Menu