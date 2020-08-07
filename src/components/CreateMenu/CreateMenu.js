import React, { Component } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export default class CreateMenu extends Component {
    userdata;
    config
    constructor(props) {
        super(props);
        this.userdata = JSON.parse(localStorage.getItem('userData'));
        this.config = {
            headers: { Authorization: 'Bearer ' + this.userdata.access_token }
        };
        this.state = {
            MenuData: {
                name: "",
                isLoading: "",
            },
            msg: "",
            redirect: false,
        };
    }

    onChangehandler = (e, key) => {
        const { MenuData } = this.state;
        MenuData[e.target.name] = e.target.value;
        this.setState({ MenuData });
    };
    onSubmitHandler = (e) => {
        if (this.state.MenuData.name === "") {
            alert('All Fileds are Requried');
        } else {
            e.preventDefault();
            this.setState({ isLoading: true });
            axios
                .post("http://localhost:8000/api/admin/menu/create", this.state.MenuData, this.config)
                .then((response) => {
                    console.log(response);
                    this.setState({ isLoading: false });
                    if (response.data.message === 'Successfully Menu Type Created') {
                        this.setState({
                            msg: response.data.message,
                            MenuData: {
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
                        <Label for="name">Menu Name</Label>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Enter menu name"
                            value={this.state.MenuData.name}
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