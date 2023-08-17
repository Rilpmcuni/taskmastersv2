import Provider from "./Provider";
import ThemeRegistry from "./ThemeRegistry";
import "./globals.css";
import { Capriola } from "next/font/google";
const capriola = Capriola({
    subsets: ["latin"],
    weight: "400",
});

export const metadata = {
    title: "Tamíz.LA | La solución tecnológica para profesionales laboratoristas",
    description:
        "Tamíz.LA: La solución tecnológica para laboratoristas viales que optimiza el trabajo, impulsa la eficiencia y ofrece herramientas innovadoras para resultados excepcionales en el laboratorio vial.",
    generator: "Tamíz.LA",
    applicationName: "Tamíz.LA",
    referrer: "origin-when-cross-origin",
    keywords: ["Tamíz.LA", "Laboratorio", "Vial"],
    authors: [{ name: "Tamíz.LA" }],
    colorScheme: "light",
    creator: "Tamíz.LA",
    publisher: "Tamíz.LA",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "Tamíz.LA | La solución tecnológica para profesionales laboratoristas",
        description:
            "Tamíz.LA: La solución tecnológica para laboratoristas viales que optimiza el trabajo, impulsa la eficiencia y ofrece herramientas innovadoras para resultados excepcionales en el laboratorio vial.",
        url: "http://tamizla-beta.vercel.app",
        images: "/image.png",
        siteName: "Tamíz.LA",
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
        title: "Tamíz.LA | La solución tecnológica para profesionales laboratoristas",
        description:
            "Tamíz.LA: La solución tecnológica para laboratoristas viales que optimiza el trabajo, impulsa la eficiencia y ofrece herramientas innovadoras para resultados excepcionales en el laboratorio vial.",
        siteId: "1467726470533754880",
        creator: "@Tamíz.LA",
        creatorId: "1467726470533754880",
        images: {
            url: "/image.png",
            alt: "@Tamíz.LA",
        },
    },
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
    },
    // verification: {
    //     google: "google",
    //     yandex: "yandex",
    //     yahoo: "yahoo",
    //     other: {
    //         me: ["contacto@tamiz.la", "http://tamizla-beta.vercel.app"],
    //     },
    // },
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
                    {/* <Provider> */}
                    <div
                        style={{
                            borderRadius: "1.5rem",
                            // border: "solid 1px black",
                            position: "fixed",
                            top: 60,
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
                    {children}
                    {/* </Provider> */}
                </ThemeRegistry>
            </body>
        </html>
    );
}
