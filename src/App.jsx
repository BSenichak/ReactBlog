import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import { Container, useTheme } from "@mui/material";
import AppRouter from "./components/AppRouter";

export default function App() {
    const theme = useTheme();
    useEffect(() => {
      document.body.style.backgroundColor = theme.palette.background.default;
      document.body.style.color = theme.palette.text.primary;
    })
    return (
        <>
            <Header />
            <Wrapper theme={theme}>
                <AppRouter/>
            </Wrapper>
        </>
    );
}

const Wrapper = styled(Container)`
    color: ${({ theme }) => theme.palette.text.primary};
    min-height: 100vh;
`;
