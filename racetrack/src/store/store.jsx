import {configureStore} from "@reduxjs/toolkit";
import pageData from "./appSlice.jsx";

const store = configureStore({
    reducer: {
        storeData: pageData
    }
})

export default store;