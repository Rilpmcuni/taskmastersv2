"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Capriola } from "next/font/google";

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

const Theme: React.FC<Props> = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    );
};
export default Theme;
