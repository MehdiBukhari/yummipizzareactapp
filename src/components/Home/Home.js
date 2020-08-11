import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart, productlist,seteuroRate } from '../actions/cartActions'
import axios from "axios";
class Home extends Component {

    handleClick = (id) => {
        this.props.addToCart(id);
        //console.log(this.props.items.length)
    }
    componentDidMount() {
        this.productlist();
        this.getEuroRate();
    }
    productlist() {
        axios.post('https://yummipizzalaravel.herokuapp.com/api/user/food', null).then((response) => {
            if (response.status === 200) {
                console.log(response.data)
                this.props.productlist(response.data)
            }
        })
    }
    //get euro rate
    getEuroRate = () => {
        axios.get('https://api.exchangeratesapi.io/latest?base=USD', null).then((response) => {
            if (response.status === 200) {
                //console.log(response.data.rates.EUR)
                this.props.seteuroRate(response.data.rates.EUR)
                console.log(this.props.erurorate)
            }
        })
    }
    render() {
        let itemList = this.props.items.map(item => {
            return (

                <div className="card" key={item.id}>
                    <div className="card-image">
                        <img src={'https://yummipizzalaravel.herokuapp.com/' + item.imagepath} alt={item.proname} />
                        <span className="card-title">{item.proname}</span>
                        <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={() => { this.handleClick(item.id) }}><i className="material-icons">add</i></span>
                    </div>

                    <div className="card-content">
                        <p>{item.descrpation}</p>
                        <p><b>Price: {item.price}$</b></p>
                        <p><b>Price In Euro: €{item.price * parseFloat(this.props.erurorate).toFixed(2)}</b></p>
                    </div>
                </div>

            )
        })

        return (
            <div className="container">
                <h4 className="">Yummi Pizza</h4>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.items,
        erurorate: state.erurorate
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id) => { dispatch(addToCart(id)) },
        productlist: (products) => { dispatch(productlist(products)) },
        seteuroRate: (rate) => { dispatch(seteuroRate(rate)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)