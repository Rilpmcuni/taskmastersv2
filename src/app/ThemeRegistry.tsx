"use client";
import { Suspense } from 'react'
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
                {/* <Provider> */}
                {/* <NextNProgressClient /> */}
                    <Top />
                    <Divider />
                    <Header />
                    <Suspense fallback={<p>Loading feed...</p>}></Suspense>
                    <div
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
                    ></div>
                    {children}
                    <Footer />

                {/* </Provider> */}
            </ThemeProvider>
        </CacheProvider>
    );
}
