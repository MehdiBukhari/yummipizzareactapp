import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart, productlist } from '../actions/cartActions'
import axios from "axios";
class Home extends Component {

    handleClick = (id) => {
        this.props.addToCart(id);
        //console.log(this.props.items.length)
    }
    componentDidMount(){
            this.productlist();
    }
    productlist(){
        axios.post('http://localhost:8000/api/user/food', null).then((response) => {
            if (response.status === 200) {
                console.log(response.data)
                this.props.productlist(response.data)
            }
        })
    }
    render() {
        let itemList = this.props.items.map(item => {
            return (
                <div className="card" key={item.id}>
                    <div className="card-image">
                        <img src={'http://localhost:8000/'+item.imagepath} alt={item.proname} />
                        <span className="card-title">{item.proname}</span>
                        <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={() => { this.handleClick(item.id) }}><i className="material-icons">add</i></span>
                    </div>

                    <div className="card-content">
                        <p>{item.descrpation}</p>
                        <p><b>Price: {item.price}$</b></p>
                    </div>
                </div>

            )
        })

        return (
            <div className="container">
                <h3 className="center">Food Items In Our Store</h3>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id) => { dispatch(addToCart(id)) },
        productlist:(products)=>{dispatch(productlist(products))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)