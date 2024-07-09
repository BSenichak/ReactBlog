import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/clearStyles.css";
import "./assets/styles/index.css";
import store from "./assets/store/store";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, useTheme } from "@mui/material";
import { darkTheme, lightTheme } from "./assets/styles/themes";
import { useSelector, useDispatch } from "react-redux";
import { loadLang, loadTheme } from "./assets/store/generalReducer";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <Main />
    </Provider>
);

function Main() {
    const pageTheme = useSelector((state) => state.general.theme);
    const dispatch = useDispatch();
    const [render, setRender] = useState(true);
    if (render) {
        dispatch(loadTheme());
        dispatch(loadLang())
        setRender(false);
    }
    return (
        <BrowserRouter>
            <ThemeProvider theme={pageTheme == "dark" ? darkTheme : lightTheme}>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    );
}
