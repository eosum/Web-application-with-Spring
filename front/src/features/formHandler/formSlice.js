import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    x: 0,
    y: 0,
    r: 0,
    formError: undefined
};

const formSlice = createSlice({
    name: "formHandler",
    initialState,
    reducers: {
        setR: (state, action) => {
            state.r = action.payload;
        },
        setFormError: (state, action) => {
            state.formError = action.payload;
        },
        clearFormError: (state) => {
            state.formError = "";
        }
    }
});

export const {setR, setFormError, clearFormError } = formSlice.actions;
export const selectR = (state) => state.formHandler.r;
export const selectFormError = (state) => state.formHandler.formError;

export default formSlice.reducer;