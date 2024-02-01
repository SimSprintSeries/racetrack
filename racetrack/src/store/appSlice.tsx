import {createSlice} from "@reduxjs/toolkit";

interface IAppState {
    isDiscordLogged: boolean,
    apiServer: string
    userData: object
}

const initialState: IAppState = {
    isDiscordLogged: false,
    apiServer: 'https://rocktune.pl/api',
    userData: {id: 0, username: '', displayName: '', avatar: ''}
}

const appSlice = createSlice({
    name: 'pageData',
    initialState,
    reducers: {
        toggleLoginState: (state, action) => {
            state.isDiscordLogged = action.payload
        },
        saveUserData: (state, action) => {
            state.userData = action.payload
        }
    }
})

export const {toggleLoginState, saveUserData} = appSlice.actions
export default appSlice.reducer