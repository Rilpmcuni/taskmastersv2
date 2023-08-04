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
    description:
        "TaskMasters - Plataforma líder en servicios para el hogar",
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
                    {/* <Aver /> */}
                    {/* <Top />
                    <Divider />
                    <Header/> */}
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
                </Provider>
            </body>
        </html>
    );
}
