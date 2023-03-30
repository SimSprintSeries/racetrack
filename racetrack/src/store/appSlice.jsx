import {createSlice} from "@reduxjs/toolkit";
import React from "react";

const appSlice = createSlice({
    name: 'pageData',
    initialState: {
        isLoaded: false
    },
    reducers: {
        toggleLoaded: (state, action) => {
            state.isLoaded = action.payload
        }
    }
})

export const {toggleLoaded} = appSlice.actions
export default appSlice.reducer