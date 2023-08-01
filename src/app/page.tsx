"use client";
import Hero from "@/layouts/Hero";
import Features from "@/layouts/Features";
import Services from "@/layouts/Services";
import Contact from "@/layouts/Contact";
import CallUs from "@/layouts/CallUs";
import SocialProof from "@/layouts/SocialProof";
import Carousel from "@/layouts/Carousel";
import Jobs from "@/layouts/Jobs";
export default function Home() {
    return (
        <main>
            <Hero />
            <Features />
            <Services />
            <SocialProof />
            <Jobs />
            <Contact />
            <CallUs />
        </main>
    );
}
