import React, { Component } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "./Signup.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/cartActions";
class Signup extends Component {
    userData;
    constructor(props) {
        super(props);
        this.state = {
            signupData: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                "scope": "user",
                isLoading: "",
            },
            msg: "",
            redirect: false,
        };
    }

    onChangehandler = (e, key) => {
        const { signupData } = this.state;
        signupData[e.target.name] = e.target.value;
        this.setState({ signupData });
    };
    onSubmitHandler = (e) => {
        if (this.state.signupData.name === "" || this.state.signupData.email === "" || this.state.signupData.password === "" || this.state.signupData.password_confirmation === "") {
            alert('All Fileds are Requried');
        } else {
            e.preventDefault();
            this.setState({ isLoading: true });
            axios
                .post("https://yummipizzalaravel.herokuapp.com/api/auth/signup", this.state.signupData)
                .then((response) => {
                    console.log(response);
                    this.setState({ isLoading: false });
                    if (response.data.message === 'authorized') {
                        this.props.login();
                        this.setState({
                            msg: response.data.message,
                            signupData: {
                                name: "",
                                email: "",
                                password: "",
                                password_confirmation: "",
                            },
                        });
                        setTimeout(() => {
                            this.setState({ msg: "", redirect: true });
                        }, 2000);
                        localStorage.setItem("isLoggedIn", true);
                        localStorage.setItem("userData", JSON.stringify(response.data));
                    }
                    this.setState({ msg: response.data });
                    setTimeout(() => {
                        this.setState({ msg: "" });
                    }, 200000);

                });
        }

    };
    render() {
        const isLoading = this.state.isLoading;
        if (this.state.redirect) {
            return <Redirect to="/cart" />;
        }
        const login = localStorage.getItem("isLoggedIn");
        if (login) {
            return <Redirect to="/cart" />;
        }
        return (
            <div className="row apni">
                <h4>Registration </h4>
                <form className="containers shadow">
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={this.state.signupData.name}
                            onChange={this.onChangehandler}
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email id</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={this.state.signupData.email}
                            onChange={this.onChangehandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={this.state.signupData.password}
                            onChange={this.onChangehandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password_confirmation">Confrim Password</Label>
                        <Input
                            type="password"
                            name="password_confirmation"
                            placeholder="Enter password again"
                            value={this.state.signupData.password_confirmation}
                            onChange={this.onChangehandler}
                        />
                    </FormGroup>
                    <p className="text-white">{this.state.msg}</p>
                    <Button
                        className="text-center mb-4"
                        color="success"
                        onClick={this.onSubmitHandler}
                    >
                        Sign Up
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
                    <Link to="/sign-in" className="text-white ml-5">I'm already member</Link>
                </form>
            </div>

        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: () => { dispatch(login()) }
    }
}
export default connect(null, mapDispatchToProps)(Signup);