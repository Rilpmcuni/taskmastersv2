import { Metadata, ResolvingMetadata } from "next";
/*  */

export const metadata = {
    title: "Pagar",
    description: "Soy el Pagar",
};
/*  */
export default function RootAuth({ children }: { children: React.ReactNode }) {
    return (
        <>
            <>{children}</>
        </>
    );
}
