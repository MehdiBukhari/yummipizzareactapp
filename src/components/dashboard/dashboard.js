import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import axios from "axios";
class Dashboard extends Component {
    userdata
    constructor(props) {
        super(props);
        this.userdata = JSON.parse(localStorage.getItem('userData'));
        this.state = { Products: [], Orders: [], menus: [] };
        this.config = {
            headers: { Authorization: 'Bearer ' + this.userdata.access_token }
        };
    }
    handleClick = (id) => {
        this.props.addToCart(id);
        //console.log(this.props.items.length)
    }
    componentDidMount() {
        this.productlist();
        this.Orderlist();
        this.menulist();
    }
    productlist() {
        axios.post('http://localhost:8000/api/user/food', null).then((response) => {
            if (response.status === 200) {
                console.log(response.data)
                this.setState({ Products: response.data })
            }
        })
    }
    Orderlist() {
        console.log(this.config)
        axios.post('http://localhost:8000/api/admin/orders', null, this.config).then((response) => {
            if (response.status === 200) {
                console.log(response.data)
                this.setState({ Orders: response.data })
            }
        })
    }
    menulist() {
        axios.post('http://localhost:8000/api/admin/menuitems', null).then((response) => {
            if (response.status === 200) {
                this.setState({ menus: response.data })
            }
        })
    }
    render() {
        let productlist = this.state.Products.length ? (this.state.Products.map(product => {
            return (
                <tr>
                    <td>{product.id}</td>
                    <td>{product.proname}</td>
                    <td>{product.price}</td>
                    <td><Link className="btn waves-effect waves-light " to={"/product/" + product.id}>Detail</Link></td>
                </tr>
            )
        })) : (<p>Nothing</p>);
        let Orderlist = this.state.Orders.length ? (this.state.Orders.map(orde => {
            return (
                <tr>
                    <td>{orde.id}</td>
                    <td>{orde.userid}</td>
                    <td>{orde.mobileNumber},{orde.adress} </td>
                    <td><Link className="btn waves-effect waves-light " to={"/order/" + orde.id}>Detail</Link></td>
                </tr>
            )
        })) : (<p>Nothing</p>);
        let Menulist = this.state.menus.length ? (this.state.menus.map(mn => {
            return (
                <tr>
                    <td>{mn.id}</td>
                    <td>{mn.name}</td>
                </tr>
            )
        })) : (<p>Nothing</p>);
        return (
            <div>
                <div className="row">
                <div className="contanier">
                        <h5 className="center"> Yummi Pizza Store Area</h5>
                        <td><Link className="btn waves-effect waves-light " to="/create-menu">Create Menu</Link></td>
                        <td><Link className="btn waves-effect waves-light " to="/create-product">Create Product</Link></td> 
                </div>
                    
                </div>
                <div className="row">
                    <div className="col s2 offset-2">
                        <h5 className="center"> Menu Items</h5>
                        <table>
                            <thead>
                                <tr>
                                    <th>SNO</th>
                                    <th> Name</th>

                                </tr>
                            </thead>

                            <tbody>
                                {Menulist}
                            </tbody>
                        </table>
                    </div>
                    <div className="col s10">
                        <h5 className="center"> Yummi Pizza Store Orders</h5>
                        <table>
                            <thead>
                                <tr>
                                    <th>ORdNo</th>
                                    <th>CUSID</th>
                                    <th>Customer Adress</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {Orderlist}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">

                    <div className="col s12 shadow">
                        <h5 className="center"> Yummi Pizza Store Products</h5>
                        <table>
                            <thead>
                                <tr>
                                    <th>SNO</th>
                                    <th>Product Name</th>
                                    <th>Product Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {productlist}
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default Dashboard