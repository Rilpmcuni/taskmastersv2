"use client";
import { useState, useEffect, useCallback } from "react";

import Link from "next/link";

import SlotCounter from "react-slot-counter";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import HeroCards from "@/components/ui/HeroCards";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Collapse,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
type Metric = {
    name: any;
    cellPhone: any;
    rut: any;
    adress: any;
    number: any;
    propiedad: any;
    description: any;
    selectedService: any;
    selectedDetailService: any;
    isEmergency: any;
    selectedDay: any;
    hour: any;
    price: any;
};
export default function Home() {
    const supabase = createClientComponentClient();

    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchMetrics = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase.from("request")
                .select(`
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
            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setMetrics(data);
            }
        } catch (error) {
            console.log("Error fetching metrics: ", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMetrics();
    }, [fetchMetrics]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <Stack
                width={"100%"}
                display="flex"
                flexDirection={"row"}
                flexWrap={"wrap"}
                spacing={1}
            >
                <Typography variant="h5">
                    Solicitudes seleccionadas según tu perfil profesional
                </Typography>
                {metrics.map((metric, index) => (
                    <Card key={index} variant="outlined" sx={{ flexGrow: 1 }}>
                        <CardContent>
                            <Stack
                                width={"100%"}
                                direction={"row"}
                                justifyContent={"space-between"}
                                spacing={1}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 0.5,
                                    }}
                                >
                                    <Typography variant="h6">
                                        {metric.selectedService}
                                        {metric.selectedDetailService !== "" &&
                                            `, ${metric.selectedDetailService}`}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            alignSelf: "flex-start",
                                            paddingX: 1.5,
                                            paddingY: 0.3,
                                            borderRadius: 1,
                                            border: "1px #d9d9d9 solid",
                                            "&:hover": {
                                                opacity: 0.9,
                                            },
                                            boxShadow: "0 0 1px 2px #ffd234",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                pointerEvents: "none",
                                            }}
                                            variant="body1"
                                        >
                                            {metric.hour % 12 || 12}:00
                                            {metric.hour < 12 ? "am" : "pm"}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 0.5,
                                    }}
                                >
                                    <Chip
                                        label={metric.price}
                                        color="success"
                                        variant="outlined"
                                        size="medium"
                                        sx={{
                                            fontSize: "large",
                                            fontWeight: "bold",
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            // alignSelf: "flex-end",
                                            paddingX: 1.5,
                                            paddingY: 0.3,
                                            borderRadius: 1,
                                            border: "1px #d9d9d9 solid",
                                            "&:hover": {
                                                opacity: 0.9,
                                            },
                                            boxShadow: "0 0 1px 2px #ffd234",
                                        }}
                                    >
                                        <Typography
                                            sx={{ pointerEvents: "none" }}
                                            variant="caption"
                                        >
                                            {metric.selectedDay[0].replace(
                                                /\./g,
                                                ""
                                            )}
                                        </Typography>
                                        <Typography
                                            sx={{ pointerEvents: "none" }}
                                            variant="body1"
                                            fontWeight={"bold"}
                                        >
                                            {metric.selectedDay[1]}
                                        </Typography>
                                        <Typography
                                            sx={{ pointerEvents: "none" }}
                                            variant="caption"
                                        >
                                            {metric.selectedDay[2]}
                                        </Typography>
                                    </Box>
                                </Box>
                                {/* Renderiza los demás campos de la misma manera */}
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </main>
    );
}
