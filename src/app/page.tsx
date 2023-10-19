"use client";
import Link from "next/link";
import Hero from "@/layouts/Hero";
import Features from "@/layouts/Features";
import Services from "@/layouts/Services";
import Contact from "@/layouts/Contact";
import CallUs from "@/layouts/CallUs";
import SocialProof from "@/layouts/SocialProof";
import Jobs from "@/layouts/Jobs";
import Top from "@/layouts/Top";
import { Divider } from "@mui/material";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import InstallPWA from "@/feedback/InstallPWA";
export default function Home() {
    return (
        <main>
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
            {/* <Top />
            <Divider /> */}
            <Header />
            {/* <InstallPWA/> */}
            <Hero />
            <Features />
            <Services />
            <SocialProof />
            <Jobs />
            <Contact />
            <CallUs />
            <Footer />
        </main>
    );
}
