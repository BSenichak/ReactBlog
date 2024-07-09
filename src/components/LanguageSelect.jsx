import { IconButton } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleLang } from "../assets/store/generalReducer";

export default function LanguageSelect() {
    let lang = useSelector((state) => state.general.lang);
    let dispatch = useDispatch();
    return (
        <IconButton size="large" onClick={()=>dispatch(toggleLang())}>
            {lang == "uk" ? (
                <img src="https://flagcdn.com/16x12/ua.png" />
            ) : (
                <img src="https://flagcdn.com/16x12/gb.png"/>
            )}
        </IconButton>
    );
}
