import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import axios from "axios";
class UserDashboard extends Component {
    userdata
    constructor(props) {
        super(props);
        this.userdata = JSON.parse(localStorage.getItem('userData'));
        this.state = { Orders: [] };
        this.config = {
            headers: { Authorization: 'Bearer ' + this.userdata.access_token }
        };
    }

    componentDidMount() {

        this.Orderlist();

    }
    Orderlist() {
        console.log(this.config)
        axios.post('https://yummipizzalaravel.herokuapp.com/api/user/orders/getUserOwnOrders', null, this.config).then((response) => {
            if (response.status === 200) {
                console.log(response.data)
                this.setState({ Orders: response.data })
            }
        })
    }

    render() {

        let Orderlist = this.state.Orders.length ? (this.state.Orders.map(orde => {
            return (
                <tr>
                    <td>{orde.id}</td>
                    <td>{orde.mobileNumber},{orde.adress} </td>
                    <td>{Date(orde.created_at)}</td>
                    <td>{Date(orde.updated_at)}</td>
                    {/* <td><Link className="btn waves-effect waves-light " to={"/order/" + orde.id}>Detail</Link></td> */}
                </tr>
            )
        })) : (<p>Nothing</p>);

        return (
            <div>
                <div className="row">
                    <div className="contanier">
                        <h5 className="center"> Yummi Pizza Customer Area</h5>
                    </div>

                </div>
                <div className="row">
                    <div className="col s12">
                        <h5 className="center"> You Orders history at Yummi Pizza</h5>
                        <table>
                            <thead>
                                <tr>
                                    <th>ORdNo</th>
                                    <th>Customer Adress</th>
                                    <th>Order Placed  At</th>
                                    <th>Last Updated</th>
                                    {/* <th>Actions</th> */}
                                </tr>
                            </thead>

                            <tbody>
                                {Orderlist}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserDashboard