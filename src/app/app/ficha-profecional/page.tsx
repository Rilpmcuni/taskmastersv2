"use client";

import Link from "next/link";

import Horario from "@/components/function/Horario";
export default function Home() {
    return (
        <main>
            <Link href="/app">App</Link>
            <Horario/>
        </main>
    );
}
