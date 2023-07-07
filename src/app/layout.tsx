import Top from "@/layouts/Top";
import Provider from "./Provider";
import "./globals.css";
import { Capriola } from "next/font/google";
import Header from "@/layouts/Header";
import { Divider } from "@mui/material";

const capriola = Capriola({
    subsets: ["latin"],
    weight: "400",
});

export const metadata = {
    title: "taskMasters",
    description: "TaskMasters - Plataforma líder en servicios para el hogar y construcción",
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
                <Provider>
                    {/* <Top />
                    <Divider />
                    <Header/> */}
                    {children}
                </Provider>
            </body>
        </html>
    );
}
