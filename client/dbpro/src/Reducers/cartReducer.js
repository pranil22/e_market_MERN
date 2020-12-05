import { ADD_TO_CART, REMOVE_FROM_CART } from "../actionTypes/cart";

const cartReducer = (state = {
    cartItems: []
}, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            const newItem = action.payload;
            const product = state.cartItems.filter(item => item._id === newItem._id)[0];
            if(product) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item => item._id === newItem._id?newItem:item)
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [ ...state.cartItems, newItem ]
                }
            }
            
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item._id !== action.payload)
            }

        default:
            return state;
    }
}

export default cartReducer;