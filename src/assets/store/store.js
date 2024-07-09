import { Tuple, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import generalReducer from "./generalReducer";
import auth from "./auth";

export default  configureStore({
    reducer: {
        general: generalReducer,
        auth
    },
    middleware: ()=> new Tuple(thunk, logger)
})