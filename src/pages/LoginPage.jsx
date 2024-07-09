import {
    Box,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    InputAdornment,
    Tooltip,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InfoIcon from "@mui/icons-material/Info";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
    let {t} = useTranslation();
    let [login, setLogin] = useState("");
    let [password, setPassword] = useState("");
    let [showPassword, setShowPassword] = useState(false);
    let [passwordError, setPasswordError] = useState("");
    let [loginError, setLoginError] = useState("");
    let [errorOpen, setErrorOpen] = useState(false);

    let validatePassword = (password) => {
        const lengthRegex = /^.{9,}$/;
        const nonEmptyRegex = /^.+$/;
        const complexRegex = /(?=.*[A-Z])/;
        const nodigitsRegex = /(?=.*\d)/;

        if (!lengthRegex.test(password)) {
            return t("login.passwordLength");
        } else if (!nonEmptyRegex.test(password)) {
            return t("login.passwordEmpty");
        } else if (!complexRegex.test(password)) {
            return t("login.passwordComplex");
        } else if (!nodigitsRegex.test(password)) {
            return t("login.passwordNoDigits");
        } else {
            return "";
        }
    };

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return "Invalid email address.";
        }
        return "";
    }
    return (
        <Wrapper>
            <Typography variant="h2">Login</Typography>
            <FormControl variant="standard">
                <InputLabel>Login</InputLabel>
                <Input
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    error={!!loginError}
                />
                <FormHelperText>{loginError}</FormHelperText>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel>Password</InputLabel>
                <Input
                sx={{marginRight: "2rem"}}
                    error={!!passwordError}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                        <InputAdornment
                            sx={{ cursor: "pointer" }}
                            position="end"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <VisibilityIcon />
                            ) : (
                                <VisibilityOffIcon />
                            )}
                        </InputAdornment>
                    }
                />
                <InfoIco>
                    <Tooltip title="Пароль має містити мінімум 8 символів, 1 велику букву та 1 цифру">
                        <InfoIcon />
                    </Tooltip>
                </InfoIco>
                <FormHelperText>{passwordError}</FormHelperText>
            </FormControl>
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => {
                    setLoginError(validateEmail(login));
                    setPasswordError(validatePassword(password));
                    if (validateEmail(login) === "" && validatePassword(password) === "") {
                        alert("Login successful");
                    }else {
                        setErrorOpen(true);
                    }
            }}>Login</Button>
            <Snackbar open={errorOpen} autoHideDuration={3000} onClose={() => setErrorOpen(false)}>
                <Alert severity="error" >{t("login.error")}</Alert>
            </Snackbar>
        </Wrapper>
    );
}

let Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    min-height: 90vh;
    text-align: center;
    margin: 0 auto;
    min-width: 300px;
    max-width: 500px;
`;

let InfoIco = styled.div`
    position: absolute;
    right: 0rem;
    top: 1.3rem;
    cursor: pointer;
`;
