import React, { Component } from "react";
import fs from "fs";
import { Button, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./CreateProduct.css";
var FormData = require('form-data');
class CreateProduct extends Component {
    userdata;
    config
    constructor(props) {
        super(props);
        this.userdata = JSON.parse(localStorage.getItem('userData'));
        this.config = {
            headers: { Authorization: 'Bearer ' + this.userdata.access_token }
        };
        this.state = {
            ProData: {
                proname: "",
                descrpation: "",
                price: "",
                menuitemnid: "",
                isLoading: "",
                ProductPhoto: "",
            },
            msg: "",
            redirect: false,

        };
    }

    onChangehandler = (e, key) => {
        const { ProData } = this.state;
        if (e.target.files) {
            ProData[e.target.name] = e.target.files[0];
            this.setState({ ProData });
        } else {
            ProData[e.target.name] = e.target.value;
            this.setState({ ProData });
        }
        console.log(ProData)
    };

    onSubmitHandler = (e) => {
        if (this.state.ProData.name === "") {
            alert('All Fileds are Requried');
        } else {
            e.preventDefault();
            this.setState({ isLoading: true });
            var data = new FormData();
            data.append('proname', this.state.ProData.proname);
            data.append('descrpation', this.state.ProData.descrpation);
            data.append('price', this.state.ProData.price);
            data.append('menuitemnid', this.state.ProData.menuitemnid);
            data.append('ProductPhoto', this.state.ProData.ProductPhoto);

            axios
                .post("https://yummipizzalaravel.herokuapp.com/api/admin/food/create", data, this.config)
                .then((response) => {
                    console.log(response);
                    this.setState({ isLoading: false });
                    if (response.data.message === 'Successfully Product Created') {
                        this.setState({
                            msg: response.data.message,
                            ProData: {
                                proname: "",
                                descrpation: "",
                                price: "",
                                menuitemnid: "",
                                ProductPhoto: ""
                            },
                        });
                        setTimeout(() => {
                            this.setState({ msg: "", redirect: true });
                        }, 2000);
                    }


                });
        }

    };
    render() {
        const isLoading = this.state.isLoading;
        let menuitems = this.props.menuitems.length ? (
            this.props.menuitems.map(item => {
                return (
                    <option key={item.id} value={item.id}>{item.name}</option>
                )
            })
        ) :
            (
                ""
            )
        const login = localStorage.getItem("isLoggedIn");
        if (!login) {
            return <Redirect to="/" />;
        }
        return (
            <div className="row apni">
                <h6>Create Menu </h6>
                <form className="containers shadow">
                    <FormGroup>
                        <Label for="proname">Product Name</Label>
                        <Input
                            type="text"
                            name="proname"
                            placeholder="Enter Product name"
                            value={this.state.ProData.proname}
                            onChange={this.onChangehandler}
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="descrpation">Product Deatil</Label>
                        <Input
                            type="text"
                            name="descrpation"
                            placeholder="Enter Product detail"
                            value={this.state.ProData.descrpation}
                            onChange={this.onChangehandler}
                            required={true}
                        />

                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input
                            type="number"
                            name="price"
                            placeholder="Enter  price"
                            value={this.state.ProData.price}
                            onChange={this.onChangehandler}
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="menuname">Menu type</Label>
                        <Input
                            type="select"
                            name="menuitemnid"
                            placeholder="Choese Menu Type"
                            value={this.state.ProData.menuitemnid}
                            onChange={this.onChangehandler}
                            required={true}
                        >
                            <option value="">Choose Menu</option>
                            {menuitems}
                        </Input>
                    </FormGroup>
                    <br></br>
                    <FormGroup>
                        <Label for="ProductPhoto">Product Photo</Label>
                        <br></br>
                        <Input
                            type="file"
                            name="ProductPhoto"
                            placeholder="Choese Image of Food Item"
                            // value={this.state.ProData.ProductPhoto}
                            onChange={this.onChangehandler}
                            required={true}
                        />

                    </FormGroup>
                    <p className="text-white">{this.state.msg}</p>
                    <Button
                        className="text-center mb-4"
                        color="success"
                        onClick={this.onSubmitHandler}
                    >
                        Create Menu
            {isLoading ? (
                            <span
                                className="spinner-border spinner-border-sm ml-5"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                                <span></span>
                            )}
                    </Button>
                </form>
            </div>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        menuitems: state.menuitems
    }
}


export default connect(mapStateToProps)(CreateProduct)