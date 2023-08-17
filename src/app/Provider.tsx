"use client";
import Header from "@/layouts/Header";
import Top from "@/layouts/Top";
import { Divider } from "@mui/material";
import Footer from "@/layouts/Footer";
import NextNProgressClient from "@/components/function/NextNProgressClient";
import Theme from "./Theme";
import ThemeRegistry from "./ThemeRegistry";




type Props = {
    children: React.ReactNode;
};

const Provider: React.FC<Props> = ({ children }) => {
    return (
        <ThemeRegistry options={{ key: "mui" }} >
            {/* <div style={{height:"100vh"}}></div> */}
            <NextNProgressClient />
            <Top />
            <Divider />
            <Header />
            {children}
            <Footer />
        </ThemeRegistry>
    );
};
export default Provider;
