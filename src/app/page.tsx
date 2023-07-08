"use client";
import Hero from "@/layouts/Hero";
import Features from "@/layouts/Features";
import Services from "@/layouts/Services";
import Contact from "@/layouts/Contact";
import CallUs from "@/layouts/CallUs";
import SocialProof from "@/layouts/SocialProof";
import Carousel from "@/layouts/Carousel";
export default function Home() {
    return (
        <main>
            <Hero />
            <Features />
            <Services />
            <SocialProof/>
            <Contact/>
            <CallUs/>
        </main>
    );
}
