const { FETCH_USERS } = require("../actionTypes/users");


const usersReducer = (state={
    users: []
}, action) => {
    switch(action.type) {
        case FETCH_USERS:
            return { ...state, users: action.payload };

        default:
            return state;
    }
};

export default usersReducer;