import NextNProgressClient from "@/components/function/NextNProgressClient";
import ThemeRegistry from "./ThemeRegistry";
import "./globals.css";
import { Suspense } from "react";

import { Capriola } from "next/font/google";
import ProgressBar from "@/components/function/ProgressBar";
import Loading from "./Loading";
const capriola = Capriola({
    subsets: ["latin"],
    weight: "400",
});

export const metadata = {
    title: "Reviasa | Conectando hogares con profesionales de servicios",
    description:
        "¡Bienvenido a Reviasa! Somos tu enlace con los profesionales más talentosos en servicios para el hogar. Explora las oportunidades para unirte a nuestro alegre equipo y ayuda a llevar la comodidad y la felicidad a cada hogar.",
    mobileWebAppCapable: "yes",
    generator: "Reviasa",
    applicationName: "Reviasa",
    referrer: "origin-when-cross-origin",
    keywords: ["Reviasa", "Reparaciones", "Mantenimiento"],
    authors: [{ name: "Reviasa" }],

    creator: "Reviasa",
    publisher: "Reviasa",
    manifest: "/manifest.json",
    icons: {
        icon: "/icon.png",
        shortcut: "/shortcut-icon.png",
        apple: "/apple-icon.png",
        other: {
            rel: "apple-touch-icon-precomposed",
            url: "/apple-touch-icon-precomposed.png",
        },
    },
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "Reviasa",
        description:
            "¡Bienvenido a Reviasa! Somos tu enlace con los profesionales más talentosos en servicios para el hogar. Explora las oportunidades para unirte a nuestro alegre equipo y ayuda a llevar la comodidad y la felicidad a cada hogar.",
        url: "https://Reviasa.vercel.app/",
        images: "/image.png",
        siteName: "Reviasa",
        locale: "es_CL",
        type: "website",
    },
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    twitter: {
        card: "summary_large_image",
        title: "Reviasa | Conectando hogares con profesionales de servicios",
        description:
            "¡Bienvenido a Reviasa! Somos tu enlace con los profesionales más talentosos en servicios para el hogar. Explora las oportunidades para unirte a nuestro alegre equipo y ayuda a llevar la comodidad y la felicidad a cada hogar.",
        siteId: "1467726470533754880",
        creator: "@Reviasa",
        creatorId: "1467726470533754880",
        images: {
            url: "/image.png",
            alt: "@Reviasa",
        },
    },
    viewport: {
        colorScheme: "light",
        themeColor: "light",
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
    },
    verification: {
        google: "google",
        yandex: "yandex",
        yahoo: "yahoo",
        other: {
            me: ["contacto@Reviasa", "https://Reviasa.vercel.app/"],
        },
    },
    category: "technology",
};

// capriola.style.fontFamily
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body
                className={capriola.className}
                style={{
                    margin: 0,
                    overscrollBehaviorY: "contain",
                    userSelect: "none",
                }}
            >
                <ThemeRegistry options={{ key: "mui" }}>
                    <NextNProgressClient>{children}</NextNProgressClient>
                </ThemeRegistry>
            </body>
        </html>
    );
}
