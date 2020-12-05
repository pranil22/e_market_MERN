const { USER_LOGIN, USER_LOGOUT } = require("../actionTypes/user");

const userReducer = (state = {
    user: null
}, action) => {
    switch(action.type) {
        case USER_LOGIN:
            localStorage.setItem('user', JSON.stringify(action.payload))
            return { ...state, user: action.payload };

        case USER_LOGOUT:
            localStorage.clear();
            return { ...state, user: null };

        default:
            return state;
    }
}


export default userReducer;