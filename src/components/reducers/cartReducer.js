import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING, Get_MENU_Item, ProductList, LOGGEDIN ,SIGNOUT} from '../actions/action-types/cart-actions'


const initState = {
    items: [],
    addedItems: [],
    total: 0,
    menuitems: [],
    loggedin: (localStorage.getItem("isLoggedIn"))?true:false
}

const cartReducer = (state = initState, action) => {

    //INSIDE HOME COMPONENT
    if (action.type === ADD_TO_CART) {
        let addedItem = state.items.find(item => item.id === action.id)
        //check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item => action.id === item.id)
        if (existed_item) {
            addedItem.quantity += 1
            return {
                ...state,
                total: state.total + parseInt(addedItem.price)
            }
        }
        else {
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + parseInt(addedItem.price)

            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal
            }
            
        }
    }
    if (action.type === REMOVE_ITEM) {
        let itemToRemove = state.addedItems.find(item => action.id === item.id)
        let new_items = state.addedItems.filter(item => action.id !== item.id)

        //calculating the total
        let newTotal = state.total - (parseInt(itemToRemove.price) * parseInt(itemToRemove.quantity))
        console.log(itemToRemove)
        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if (action.type === ADD_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        addedItem.quantity += 1
        let newTotal = state.total + parseInt(addedItem.price)
        return {
            ...state,
            total: newTotal
        }
    }
    if (action.type === SUB_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        //if the qt == 0 then it should be removed
        if (addedItem.quantity === 1) {
            let new_items = state.addedItems.filter(item => item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                total: newTotal
            }
        }

    }
    if (action.type === ADD_SHIPPING) {
        return {
            ...state,
            total: state.total + 6
        }
    }

    if (action.type === 'SUB_SHIPPING') {
        return {
            ...state,
            total: state.total - 6
        }
    }
    if (action.type === Get_MENU_Item) {
        return {
            ...state,
            menuitems: action.menuitems
        }

    } if (action.type === ProductList) {
        return {
            ...state,
            items: action.produts
        }
    }if(action.type=== LOGGEDIN){
        return{
            ...state,
            loggedin:true
        }
    }
    if (action.type === SIGNOUT) {
        return {
            ...state,
            loggedin: false
        }
    }

    else {
        return state
    }

}


export default cartReducer
