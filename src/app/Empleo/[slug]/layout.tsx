import { Metadata, ResolvingMetadata } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    // leer los parámetros de la ruta
    const slug = params.slug;
    // const proyecto = ProyectsData.find((p) => p.page.toLowerCase() === slug);
    /*  */
    const supabase = createServerComponentClient({ cookies });

    const { data: empleos } = await supabase.from("empleos").select();

    const empleo = empleos?.find((p) => p.id === slug);
    if (!empleo) {
        notFound();
    }

    return {
        title: `${empleo?.title} Empleo | Rilpni`,
        description: empleo?.description, // Agrega la descripción aquí
    };
}

/*  */
export default function RootProyect({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
