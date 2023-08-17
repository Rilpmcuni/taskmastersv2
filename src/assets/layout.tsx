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

    const proyecto = empleos?.find((p) => p.id === slug);
    if (!proyecto) {
        redirect("/");
    }

    return {
        title: `Empleo ${proyecto?.title} | Rilpni`,
        description: proyecto?.description, // Agrega la descripción aquí
    };
}

/*  */
export default function RootProyect({
    children,
    proyecto, // Agregar 'proyecto' como prop
}: {
    children: React.ReactNode;
    proyecto: any; // Cambiar 'any' por el tipo adecuado del objeto 'proyecto'
}) {
    return (
        <>
            {" "}
            <p>El título del proyecto es: {proyecto?.title}</p>
            <p>Los trabajos son: {proyecto?.jobs}</p> {/* Usar 'proyecto?.jobs' */}
            {children}
        </>
    );
}
