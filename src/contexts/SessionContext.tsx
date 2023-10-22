"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Session {
    user: any;
}
type Metric = {
    name: any;
    cellPhone: any;
    rut: any;
    adress: any;
    number: any;
    propiedad: any;
    description: any;
    selectedService: string;
    selectedDetailService: any;
    isEmergency: any;
    selectedDay: any;
    hour: any;
    price: any;
};
type Profile = {
    full_name: any;
    lastName: any;
    ability: any;
    avatar_url: any;
    schedule: any;
    rut: any;
    cellPhone: any;
};
// Crear el contexto
const SessionContext = createContext<
    | {
          sessionData: Session | null;
          metrics: Metric[] | null;
          profile: Profile | null;
      }
    | undefined
>(undefined);

// Crear el proveedor del contexto
export default function SessionProvider({ children }: { children: any }) {
    const [sessionData, setSessionData] = useState<Session | null>(null);
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [profile, setProfile] = useState<Profile | null>(null);
    const supabase = createClientComponentClient();

    useEffect(() => {
        getSessionData();
        fetchMetrics();
        if (sessionData?.user?.id) {
            fetchProfile();
        }
    }, [sessionData?.user?.id]);

    async function getSessionData() {
        const {
            data: { session },
        } = await supabase.auth.getSession();
        setSessionData(session);
    }
    async function fetchMetrics() {
        const { data, error, status } = await supabase.from("request").select(`
                    name,
                    cellPhone,
                    rut,
                    adress,
                    number,
                    propiedad,
                    description,
                    selectedService,
                    selectedDetailService,
                    isEmergency,
                    selectedDay,
                    hour,
                    price
                `);
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
                `full_name, lastName, ability, avatar_url, schedule, rut, cellPhone`
            ) // Agrega "cellPhone" aquí
            .eq("id", sessionData?.user?.id)
            .single();
        setProfile(data);
    }

    return (
        <SessionContext.Provider value={{ sessionData, metrics, profile }}>
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
