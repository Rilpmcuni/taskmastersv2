"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Session {
    user: any;
}
type Metric = {
    id: any;
    name: any;
    cellPhone: any;
    rut: any;
    adress: any;
    number: any;
    propiedad: any;
    selectedService: string;
    selectedDetailService: any;
    isEmergency: any;
    selectedDay: any;
    hour: any;
    price: any;
    status: any;
    user_id: any;
    clientNote: any;
    profesionalNote: any;
    hourFinish: any;
    dayFinish: any;
};
type Profile = {
    full_name: any;
    lastName: any;
    ability: any;
    avatar_url: any;
    schedule: any;
    rut: any;
    cellPhone: any;
    updated_at: any;
};
// Crear el contexto
const SessionContext = createContext<
    | {
          sessionData: Session | null;
          metrics: Metric[] | null;
          profile: Profile | null;
          requestUpdate: () => void; // Agregar la nueva propiedad aquí
      }
    | undefined
>(undefined);

// Crear el proveedor del contexto
export default function SessionProvider({ children }: { children: any }) {
    const [sessionData, setSessionData] = useState<Session | null>(null);
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [updateSignal, setUpdateSignal] = useState(false);
    const supabase = createClientComponentClient();

    useEffect(() => {
        getSessionData();
        fetchMetrics();
        if (sessionData?.user?.id) {
            fetchProfile();
        }
    }, [sessionData?.user?.id, updateSignal]);

    function requestUpdate() {
        setUpdateSignal(!updateSignal); // Cambiar el valor de updateSignal para desencadenar el useEffect
    }
    async function getSessionData() {
        const {
            data: { session },
        } = await supabase.auth.getSession();
        setSessionData(session);
    }
    async function fetchMetrics() {
        const { data, error, status } = await supabase.from("request").select(
            `
                    id,
                    name,
                    cellPhone,
                    rut,
                    adress,
                    number,
                    propiedad,
                    selectedService,
                    selectedDetailService,
                    isEmergency,
                    selectedDay,
                    hour,
                    price,
                    status,
                    user_id,
                    clientNote,
                    profesionalNote,
                    hourFinish,
                    dayFinish
                `
        );
        // .eq("status", "published");
        if (data) {
            setMetrics(data);
        }
    }
    async function fetchProfile() {
        if (!sessionData?.user?.id) {
            return;
        }
        const { data, error, status } = await supabase
            .from("profiles")
            .select(
                `full_name, lastName, ability, avatar_url, schedule, rut, cellPhone, updated_at`
            )
            .eq("id", sessionData?.user?.id)
            .single();
        setProfile(data);
    }

    return (
        <SessionContext.Provider
            value={{ sessionData, metrics, profile, requestUpdate }}
        >
            {children}
        </SessionContext.Provider>
    );
}

// Crear un hook personalizado para usar el contexto
export const useSession = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
};

//
//
//
//
//
//
