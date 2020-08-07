import React, { Component } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export default class CreateProduct extends Component {
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
                descrpation:"",
                price:"",
                menuitemnid:"",
                ProductPhoto:"",
                isLoading: "",
            },
            msg: "",
            redirect: false,
        };
    }

    onChangehandler = (e, key) => {
        const { ProData } = this.state;
        ProData[e.target.name] = e.target.value;
        this.setState({ ProData });
    };
    onSubmitHandler = (e) => {
        if (this.state.ProData.name === "") {
            alert('All Fileds are Requried');
        } else {
            e.preventDefault();
            this.setState({ isLoading: true });
            axios
                .post("http://localhost:8000/api/admin/food/create", this.state.ProData, this.config)
                .then((response) => {
                    console.log(response);
                    this.setState({ isLoading: false });
                    if (response.data.message === 'Successfully Menu Type Created') {
                        this.setState({
                            msg: response.data.message,
                            ProData: {
                                name: "",
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
                        <Label for="detail">Product Deatil</Label>
                        <Input
                            type="text"
                            name="detail"
                            placeholder="Enter Product detail"
                            value={this.state.ProData.detail}
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
                        <Label for="menuname">Menu</Label>
                        <Input
                            type="text"
                            name="menuname"
                            placeholder="Choese Menu Type"
                            value={this.state.ProData.menuname}
                            onChange={this.onChangehandler}
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="proimg">Product Photo</Label>
                        <Input
                            type="file"
                            name="proimg"
                            placeholder="Choese Image of Food Item"
                            value={this.state.ProData.proimg}
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