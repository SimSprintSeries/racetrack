import {createSlice, current} from "@reduxjs/toolkit";
import React from "react";

const appSlice = createSlice({
    name: 'pageData',
    initialState: {
        isDiscordLogged: false,
        apiServer: ['http://57.128.195.196:8080/api']
    },
    reducers: {
        toggleLoginState: (state) => {
            state.isDiscordLogged = !state.current.isDiscordLogged
        }
    }
})

export const {toggleLoginState} = appSlice.actions
export default appSlice.reducer