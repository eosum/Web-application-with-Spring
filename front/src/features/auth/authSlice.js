import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: undefined,
    password: undefined,
    errorMessage: undefined,
    isLogin: true
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.login = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        clearPassword: (state) => {
            state.password = undefined;
        },
        changeToLogin: (state) => {
            state.isLogin = true;
        },
        changeToRegister: (state) => {
            state.isLogin = false;
        },
        switchIsLogin: (state) => {
            state.isLogin = !state.isLogin;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
    }
});

export const {setLogin, setPassword, switchIsLogin,
                clearErrorMessage, setErrorMessage} = authSlice.actions;

export const selectLogin = (state) => state.auth.login;
export const selectPassword = (state) => state.auth.password;
export const selectIsLogin = (state) => state.auth.isLogin;
export const selectErrorMessage = (state) => state.auth.errorMessage;

export default authSlice.reducer;