import {configureStore} from "@reduxjs/toolkit";
import pageData from "./appSlice.jsx";

const store = configureStore({
    reducer: {
        pageData
    }
})

export default store;