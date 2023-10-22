import { Metadata, ResolvingMetadata } from "next";
/*  */

export const metadata = {
    title: "Reviasa",
    description: "Soy el Reviasa",
};
/*  */
export default function RootAuth({ children }: { children: React.ReactNode }) {
    return (
        <>
            <>{children}</>
        </>
    );
}
