const { SEARCH_FETCHED_LOADING, SEARCH_FETCHED_SUCCESS, SEARCH_FETCHED_FAILED } = require("../actionTypes/product");

const searchReducer = (state = {
    products: [],
    loading: false,
    error: null  
}, action) => {
    switch(action.type) {
        case SEARCH_FETCHED_SUCCESS: 
            return { ...state, products: action.payload, loading: false, error: null };

        case SEARCH_FETCHED_LOADING:
            return { ...state, products: [], loading: true, error: null };

        case SEARCH_FETCHED_FAILED:
            return { ...state, products: [], loading: false, error: action.payload };

        default: 
            return state;
    }
}

export default searchReducer;