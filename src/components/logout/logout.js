import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { sigout } from "../actions/cartActions";
//const { Component } = require("react");
class logout extends Component {
    config
    state = {
        navigate: false,
    };
    userdata
    constructor() {
        super()
        this.userdata=JSON.parse(localStorage.getItem('userData'));
        this.config = {
            headers: { Authorization: 'Bearer '+this.userdata.access_token }
        };
    }
    componentDidMount(){
        this.logout();
    }
    logout(){
        console.log(this.config)
            axios.get('http://localhost:8000/api/auth/logout',this.config).then((response) => {
                console.log(response.data)
                //localStorage.setItem("isLoggedIn", false);
                localStorage.clear(); 
                    this.props.signout();
            })
    }
    render() { 
        localStorage.clear();     
        return <Redirect to="/" />
    }



}
const mapDispatchToProps = (dispatch) => {
    return {
        signout: () => { dispatch(sigout()) }
    }
}
export default connect(null, mapDispatchToProps)(logout);