export const selectIsAuth  = (state) =>{
    return state.auth.isAuth;
}
export const selectCurrentUserLogin  = (state) =>{
    return state.auth.login;
}
export const selectAuthUserProfile  = (state) =>{
    return state.auth.authProfile;
}