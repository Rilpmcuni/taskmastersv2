"use client";
"use client";

import Link from "next/link";

export default function Home() {
    return (
        <main>
            <Link href="/app/ficha-profecional">ficha-profecional</Link>
            <Link href="/app/metricas">metricas</Link>
            <Link href="/app/cobro">cobro</Link>
        </main>
    );
}
