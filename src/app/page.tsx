"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Button from "@mui/material/Button";
import Top from "@/layouts/Top";
import { Link, Stack, Typography } from "@mui/material";
import Hero from "@/layouts/Hero";
import Features from "@/layouts/Features";
import Services from "@/layouts/Services";
import Contact from "@/layouts/Contact";
import CallUs from "@/layouts/CallUs";
export default function Home() {
    return (
        <main style={{ gap: 1 }}>
            <Hero />
            <Features />
            <Services />
            <Contact/>
            <CallUs/>
        </main>
    );
}
