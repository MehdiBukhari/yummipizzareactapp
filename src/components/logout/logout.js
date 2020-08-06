import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
//const { Component } = require("react");
export default class logout extends Component {
    config
    state = {
        navigate: false,
    };
    constructor() {
        super()
        this.config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('userData.access_token')}` }
        };
    }
    render() {
        axios.get('http://localhost:8000/api/auth/logout', null, this.config).then((response) => {
            localStorage.clear();
            this.setState({
                navigate: true,
            });
        })
        const { navigate } = this.state;
        if (navigate) {
            return <Redirect to="/" />;
        }
        
    }



}
