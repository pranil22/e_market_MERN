const { PRODUCT_FETCHED_SUCCESS, PRODUCT_FETCHED_LOADING, PRODUCT_FETCHED_FAILED } = require("../actionTypes/product");

const productReducer = (state = {
  products: [],
  loading: false,
  error: null  
}, action) => {
    switch(action.type) {
        case PRODUCT_FETCHED_SUCCESS: 
            return { ...state, products: action.payload, loading: false, error: null };

        case PRODUCT_FETCHED_LOADING:
            return { ...state, products: [], loading: true, error: null };

        case PRODUCT_FETCHED_FAILED:
            return { ...state, products: [], loading: false, error: action.payload };
            

        default: 
            return state;
    }
}

export default productReducer;