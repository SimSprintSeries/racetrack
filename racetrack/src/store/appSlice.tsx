import {createSlice} from "@reduxjs/toolkit";

interface IAppState {
    isDiscordLogged: boolean,
    apiServer: string
}

const initialState: IAppState = {
    isDiscordLogged: false,
    apiServer: 'https://rocktune.pl/api'
}

const appSlice = createSlice({
    name: 'pageData',
    initialState,
    reducers: {
        toggleLoginState: (state, action) => {
            state.isDiscordLogged = action.payload
        }
    }
})

export const {toggleLoginState} = appSlice.actions
export default appSlice.reducer