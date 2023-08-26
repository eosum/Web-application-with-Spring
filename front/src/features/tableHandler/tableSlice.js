import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    rows: []
};

const tableSlice = createSlice({
    name: "tableHandler",
    initialState,
    reducers: {
        setRows: (state, action) => {
            state.rows = action.payload;
        },
    }
});

export const {setRows} = tableSlice.actions;

export const selectRows = (state) => state.tableHandler.rows;

export default tableSlice.reducer;