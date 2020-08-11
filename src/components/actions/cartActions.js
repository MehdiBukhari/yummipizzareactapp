
import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING, Get_MENU_Item, EMPTYCART, ProductList, LOGGEDIN, SIGNOUT, EURORATE, EUROTOTAL } from './action-types/cart-actions'

//add cart action
export const addToCart = (id) => {
    return {
        type: ADD_TO_CART,
        id
    }

}
//remove item action
export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        id
    }
}
//subtract qt action
export const subtractQuantity = (id) => {
    return {
        type: SUB_QUANTITY,
        id
    }
}
//add qt action
export const addQuantity = (id) => {
    return {
        type: ADD_QUANTITY,
        id
    }
}
//get menu items

export const itemsQuantity = (menuitems) => {
    return {
        type: Get_MENU_Item,
        menuitems
    }
}
//get Product list
export const productlist = (produts) => {
    return {
        type: ProductList,
        produts
    }

}
//loggedin
export const login = () => {
    return {
        type: LOGGEDIN
    }
}
//SIGNOUT
export const sigout = () => {
    return {
        type: SIGNOUT
    }
}

//EMPTYCART
export const makecartempty = () => {
    return {
        type: EMPTYCART
    }
}
//EURo RATE
export const seteuroRate = (rate) => {
    return {
        type: EURORATE,
        rate
    }
}
//EURo TOTAL
export const seteuroTOTAL = () => {
    return {
        type: EUROTOTAL
    }
}