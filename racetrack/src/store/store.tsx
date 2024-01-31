import {configureStore} from "@reduxjs/toolkit";
import pageData from "./appSlice";

const store = configureStore({
    reducer: {
        storeData: pageData
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;