import Providers from "@/components/function/NextNProgressClient";
import ThemeRegistry from "./ThemeRegistry";
import "./globals.css";
import { Capriola } from "next/font/google";
const capriola = Capriola({
    subsets: ["latin"],
    weight: "400",
});

export const metadata = {
    title: "Rilpni | La solución tecnológica para todos",
    description:
        "Rilpni: La solución tecnológica para todos, impulsa la eficiencia y ofrece herramientas innovadoras para resultados excepcionales",
    generator: "Rilpni",
    applicationName: "Rilpni",
    referrer: "origin-when-cross-origin",
    keywords: ["Rilpni", "Reparaciones", "Mantenimiento"],
    authors: [{ name: "Rilpni" }],
    colorScheme: "light",
    creator: "Rilpni",
    publisher: "Rilpni",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "Rilpni",
        description:
            "Rilpni: La solución tecnológica para todos, impulsa la eficiencia y ofrece herramientas innovadoras para resultados excepcionales",
        url: "https://rilpni.vercel.app/",
        images: "/image.png",
        siteName: "Rilpni",
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
    themeColor: "light",
    twitter: {
        card: "summary_large_image",
        title: "Rilpni | La solución tecnológica para todos",
        description:
            "Rilpni: La solución tecnológica para todos, impulsa la eficiencia y ofrece herramientas innovadoras para resultados excepcionales",
        siteId: "1467726470533754880",
        creator: "@Rilpni",
        creatorId: "1467726470533754880",
        images: {
            url: "/image.png",
            alt: "@Rilpni",
        },
    },
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
    },
    verification: {
        google: "google",
        yandex: "yandex",
        yahoo: "yahoo",
        other: {
            me: ["contacto@Rilpni", "https://rilpni.vercel.app/"],
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
            <body className={capriola.className} style={{ margin: 0 }}>
                <ThemeRegistry options={{ key: "mui" }}>
                    {children}
                </ThemeRegistry>
            </body>
        </html>
    );
}
