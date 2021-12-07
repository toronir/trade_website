const SET_AUTH_USER_DATA = "auth/SET_AUTH_USER_DATA";


let initialState = {
    authProfile: null,
    userId: null,
    email: null,
    login: null,
    isAuth: false,
};
let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    data: {userId, email, login, isAuth},
});

export const login = (email, password, isAuth) =>({
 
});

export default authReducer;