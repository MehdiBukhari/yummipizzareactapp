import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { makecartempty } from '../actions/cartActions'
var FormData = require('form-data');
class Recipe extends Component {
    userdata;
    config
    constructor(props) {
        super(props);
        if (this.props.loggedin) {
            this.userdata = JSON.parse(localStorage.getItem('userData'));
            this.config = {
                headers: { Authorization: 'Bearer ' + this.userdata.access_token }
            };
        }

        this.state = {
            OrdData: {
                adress: "",
                mobileNumber: "",
            },
            msg: "",
            redirect: false,

        };
    }
    onChangehandler = (e, key) => {
        const { OrdData } = this.state;
        if (e.target.files) {
            OrdData[e.target.name] = e.target.files[0];
            this.setState({ OrdData });
        } else {
            OrdData[e.target.name] = e.target.value;
            this.setState({ OrdData });
        }
        console.log(OrdData)
    };

    onSubmitHandler = (e) => {
         if (this.state.OrdData.adress === "" || this.props.addedItems === []) {
            alert('Please Select Some Products to Ship and Enter Your Shipping Adress');
        } else {
            e.preventDefault();
            this.setState({ isLoading: true });
            let orderline = this.props.addedItems.length ? (
                this.props.addedItems.map(item => {
                    const container = {};

                    container['foodid'] = item.id;
                    container['Qunty'] = item.quantity;

                    return container;
                })
            ) : [];
            console.log(JSON.stringify(orderline));
            var data = new FormData();
            data.append('totalPrice', this.props.total);
            data.append('adress', this.state.OrdData.adress);
            data.append('mobileNumber', this.state.OrdData.mobileNumber);
            data.append('orderline', JSON.stringify(orderline));

            axios
                .post("https://yummipizzalaravel.herokuapp.com/api/user/orders/create", data, this.config)
                .then((response) => {
                    console.log(response.data.response);
                    this.setState({ isLoading: false });
                    if (response.data.message === 'Successfully Order Placed') {
                        this.setState({
                            msg: response.data.message,
                            OrdData: {
                                adress: "",
                                mobileNumber: "",
                            },
                        });
                        this.props.makecartempty();

                        setTimeout(() => {
                            this.setState({ msg: "", redirect: true });
                        }, 2000);

                    } else if (response.status === 403) {
                        this.setState({
                            msg: "You Are Not Allowed Place Orders Pleses Login as User",
                        });
                    }


                });
        }

    };
    componentWillUnmount() {
        if (this.refs.shipping.checked)
            this.props.substractShipping()
    }

    handleChecked = (e) => {
        if (e.target.checked) {
            this.props.addShipping();
        }
        else {
            this.props.substractShipping();
        }
    }

    render() {

        return (
            <div className="container">
                <div className="collection">
                    <li className="collection-item">
                        <label>
                            <input type="checkbox" ref="shipping" onChange={this.handleChecked} />
                            <span>Shipping(+6$)</span>
                        </label>
                    </li>
                    <li className="collection-item">
                        <FormGroup>
                            <Label for="adress">adress</Label>
                            <Input
                                type="text"
                                name="adress"
                                placeholder="Enter adress"
                                value={this.state.OrdData.adress}
                                onChange={this.onChangehandler}
                                required={true}
                            />
                        </FormGroup>
                    </li>
                    <li className="collection-item">
                        <FormGroup>
                            <Label for="mobileNumber">Mobile Number</Label>
                            <Input
                                type="text"
                                name="mobileNumber"
                                placeholder="Enter Mobile Number"
                                value={this.state.OrdData.mobileNumber}
                                onChange={this.onChangehandler}
                                required={true}
                            />
                        </FormGroup>
                    </li>
                    <li className="collection-item"><b>Total: {this.props.total} $</b></li>
                </div>
                <p className="text-white">{this.state.msg}</p>
                <div className="checkout">
                    <Link onClick={this.onSubmitHandler} className="waves-effect waves-light btn">Submit Order</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        total: state.total,
        loggedin: state.loggedin,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addShipping: () => { dispatch({ type: 'ADD_SHIPPING' }) },
        substractShipping: () => { dispatch({ type: 'SUB_SHIPPING' }) },
        makecartempty: () => { dispatch(makecartempty()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
