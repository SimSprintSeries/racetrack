import {createSlice} from "@reduxjs/toolkit";

interface IAppState {
    isDiscordLogged: boolean,
    apiServer: string
    userData: IUserData
}

export interface IUserData {
    id: number,
    username: string,
    displayName: string,
    avatar: string,
    driverId: number
}

const userDataInitialState: IUserData = {
    id: 0,
    username: '',
    displayName: '',
    avatar: '',
    driverId: 0
}

const initialState: IAppState = {
    isDiscordLogged: false,
    apiServer: 'https://rocktune.pl/api',
    userData: userDataInitialState
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


