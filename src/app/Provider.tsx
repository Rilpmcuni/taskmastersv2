"use client";
import * as React from "react";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Capriola } from "next/font/google";
import Header from "@/layouts/Header";
import Top from "@/layouts/Top";
import { Divider } from "@mui/material";
import Footer from "@/layouts/Footer";

const capriola = Capriola({
    subsets: ["latin"],
    weight: "400",
});

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1681ff",
        },
        secondary: {
            main: "#ffd234",
            dark: "#EFBE0A",
        },
        text: {
            primary: "#1e293b",
        },
    },
    shape: {
        borderRadius: 10,
    },
    spacing: 10,
    typography: {
        fontFamily: capriola.style.fontFamily,
        fontSize: 15,
        fontWeightLight: 400,
    },
});

type Props = {
    children: React.ReactNode;
};

const Provider: React.FC<Props> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <Top />
            <Divider />
            <Header />
            {children}
            <Footer />
        </ThemeProvider>
    );
};
export default Provider;
