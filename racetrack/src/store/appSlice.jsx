import {createSlice, current} from "@reduxjs/toolkit";
import React from "react";

const appSlice = createSlice({
    name: 'pageData',
    initialState: {
        isDiscordLogged: false,
        apiServer: ['https://rocktune.pl/api']
    },
    reducers: {
        toggleLoginState: (state) => {
            state.isDiscordLogged = !state.current.isDiscordLogged
        }
    }
})

export const {toggleLoginState} = appSlice.actions
export default appSlice.reducer