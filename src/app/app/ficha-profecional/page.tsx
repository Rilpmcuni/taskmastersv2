"use client";
import Hero from "@/layouts/Hero";
import Features from "@/layouts/Features";
import Link from "next/link";
import Services from "@/layouts/Services";
import Contact from "@/layouts/Contact";
import CallUs from "@/layouts/CallUs";
import SocialProof from "@/layouts/SocialProof";
import Carousel from "@/layouts/Carousel";
import Jobs from "@/layouts/Jobs";
import Horario from "@/components/function/Horario";
export default function Home() {
    return (
        <main>
            <Link href="/app">App</Link>
            <Horario/>
        </main>
    );
}
