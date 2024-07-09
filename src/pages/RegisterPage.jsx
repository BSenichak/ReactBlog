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
    FormControlLabel,
    Checkbox,
    Link as MuiLink,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InfoIcon from "@mui/icons-material/Info";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
    let { t } = useTranslation();
    let [login, setLogin] = useState("");
    let [password, setPassword] = useState("");
    let [repeadtedPassword, setRepeatedPassword] = useState("");
    let [nickname, setNickname] = useState("");
    let [showPassword, setShowPassword] = useState(false);
    let [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
    let [passwordError, setPasswordError] = useState("");
    let [repeadtedPasswordError, setRepeatedPasswordError] = useState("");
    let [loginError, setLoginError] = useState("");
    let [nicknameError, setNicknameError] = useState("");
    let [errorOpen, setErrorOpen] = useState(false);
    let [terms, setTerms] = useState(false);
    let [termsError, setTermsError] = useState("");
    let [termsWindow, setTermsWindow] = useState(false);

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
            return t("login.emailInvalid");
        }
        return "";
    }

    function validateNickname(nickname) {
        const nonEmptyRegex = /^.+$/;
        if (!nonEmptyRegex.test(nickname)) {
            return t("login.nicknameEmpty");
        }
        return "";
    }

    let validateRepeatedPassword = (repeadtedPassword) => {
        if (repeadtedPassword !== password) {
            return t("login.passwordsNotMatch");
        }
        return "";
    };

    let validateTerms = () => {
        if (!terms) {
            return t("login.termsNotChecked");
        }
        return "";
    };

    return (
        <Wrapper>
            <Typography variant="h2" sx={{ marginBottom: "2rem" }}>
                {t("Register.title")}
            </Typography>
            <FormControl variant="standard">
                <InputLabel>{t("login.nick")}</InputLabel>
                <Input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    error={!!nicknameError}
                />
                <FormHelperText>{nicknameError}</FormHelperText>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel>{t("login.email")}</InputLabel>
                <Input
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    error={!!loginError}
                />
                <FormHelperText>{loginError}</FormHelperText>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel>{t("login.password")}</InputLabel>
                <Input
                    sx={{ marginRight: "2rem" }}
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
                    <Tooltip title={t("login.passwordInfo")}>
                        <InfoIcon />
                    </Tooltip>
                </InfoIco>
                <FormHelperText>{passwordError}</FormHelperText>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel>{t("login.repeatpassword")}</InputLabel>
                <Input
                    error={!!repeadtedPasswordError}
                    value={repeadtedPassword}
                    onChange={(e) => setRepeatedPassword(e.target.value)}
                    type={showRepeatedPassword ? "text" : "password"}
                    endAdornment={
                        <InputAdornment
                            sx={{ cursor: "pointer" }}
                            position="end"
                            onClick={() =>
                                setShowRepeatedPassword(!showRepeatedPassword)
                            }
                        >
                            {showRepeatedPassword ? (
                                <VisibilityIcon />
                            ) : (
                                <VisibilityOffIcon />
                            )}
                        </InputAdornment>
                    }
                />
                <FormHelperText>{repeadtedPasswordError}</FormHelperText>
            </FormControl>
            <FormControl error={!!termsError}>
                <FormControlLabel
                    label={
                        <>
                            {t("login.terms")}{" "}
                            <MuiLink
                                onClick={(e) => {
                                    e.preventDefault();
                                    setTermsWindow(true);
                                }}
                            >
                                {t("login.termsLink")}
                            </MuiLink>
                        </>
                    }
                    control={
                        <Checkbox
                            checked={terms}
                            onChange={(e) => setTerms(e.target.checked)}
                        />
                    }
                />
                <FormHelperText sx={{ mt: -1.5, ml: 0 }}>
                    {validateTerms()}
                </FormHelperText>
            </FormControl>
            <TermDialog state={termsWindow} toggle={setTermsWindow} />
            <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => {
                    setLoginError(validateEmail(login));
                    setPasswordError(validatePassword(password));
                    setNicknameError(validateNickname(nickname));
                    setRepeatedPasswordError(
                        validateRepeatedPassword(repeadtedPassword)
                    );
                    if (
                        validateEmail(login) === "" &&
                        validatePassword(password) === "" &&
                        validateNickname(nickname) === "" &&
                        validateRepeatedPassword(repeadtedPassword) === "" &&
                        validateTerms() === ""
                    ) {
                        alert("Login successful");
                    } else {
                        setErrorOpen(true);
                    }
                }}
            >
                {t("Register.button")}
            </Button>
            <Snackbar
                open={errorOpen}
                autoHideDuration={3000}
                onClose={() => setErrorOpen(false)}
            >
                <Alert severity="error">{t("login.error")}</Alert>
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

let TermDialog = ({ state, toggle }) => {
    let { t } = useTranslation();
    return (
        <Dialog open={state} onClose={() => toggle(false)}>
            <DialogTitle>{t("login.termsTitle")}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography variant="span" sx={{ fontWeight: "bold" }}>
                        {t("login.termsText1")}
                    </Typography>
                    <br />
                    {t("login.termsText2")}
                    <br />
                    <br />
                    <Typography variant="span" sx={{ fontWeight: "bold" }}>
                        {t("login.termsText3")}
                    </Typography>

                    <br />
                    {t("login.termsText4")}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => toggle(false)}>
                    {t("login.termsButton")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
