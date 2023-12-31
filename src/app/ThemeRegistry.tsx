"use client";
import { Suspense } from "react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import theme from "/path/to/your/theme";
import { Capriola } from "next/font/google";

import { createTheme } from "@mui/material/styles";
import { useState } from "react";

import Header from "@/layouts/Header";
import Top from "@/layouts/Top";
import { Divider } from "@mui/material";
import Footer from "@/layouts/Footer";
import Providers from "@/components/function/NextNProgressClient";
// import NextNProgressClient from "@/components/function/NextNProgressClient";

const capriola = Capriola({
    subsets: ["latin"],
    weight: "400",
});
const theme = createTheme({
    components: {
        MuiListItem: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "capitalize",
                    // fontWeight: "bold",
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "none",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "1rem",
                },
            },
        },
    },
    palette: {
        mode: "light",
        primary: {
            main: "#1681ff",
            dark: "#449aff",
            light: "#449aff",
        },
        secondary: {
            main: "#ffd234",
            dark: "#ffdb5c",
        },
        text: {
            primary: "#1e293b",
        },
        success: {
            main: "#00af54",
            light: "#33bf76",
        },
        error: {
            main: "#fe4a49",
            light: "#FE6E6D",
        },
        info: {
            main: "#9a4c95",
            light: "#ae6faa",
        },
        divider: "#d9d9d9",
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
// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry(props: { options: any; children: any }) {
    const { options, children } = props;

    const [{ cache, flush }] = useState(() => {
        const cache = createCache(options);
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: string[] = [];
        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };
        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) {
            return null;
        }
        let styles = "";
        for (const name of names) {
            styles += cache.inserted[name];
        }
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(" ")}`}
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />
        );
    });

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {/* <Top />
                <Divider />
                <Header /> */}
                {/* <div
                    style={{
                        borderRadius: "1.5rem",
                        // border: "solid 1px black",
                        position: "fixed",
                        top: 63,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                        width: "100%",
                        boxShadow: "0px 0px 0px 15px white",
                        zIndex: 40,
                        pointerEvents: "none",
                    }}
                ></div> */}
                {children}
                {/* <Footer /> */}

                {/* </Provider> */}
            </ThemeProvider>
        </CacheProvider>
    );
}
