"use client";
import { useState, useEffect, useCallback, SetStateAction } from "react";

import Link from "next/link";

import SlotCounter from "react-slot-counter";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import HeroCards from "@/components/ui/HeroCards";
import {
    Box,
    Button,
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
import { useSession } from "@/contexts/SessionContext";
import FullScreenSolic from "@/feedback/FullScreenSolic";
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
interface Session {
    user: any;
}
export default function Home() {
    const [selectedSolic, setSelectedSolic] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = (product: SetStateAction<string>) => {
        setSelectedSolic(product);
        setDialogOpen(true);
    };
    const handleCardClick = (product: SetStateAction<string>) => {
        setSelectedSolic(product);
    };
    const { sessionData, metrics, profile } = useSession();

    const [loading, setLoading] = useState(false);

    const sortedMetrics = metrics ? [...metrics] : [];

    sortedMetrics.sort((a, b) => {
        // Convertir selectedDay[1] a número
        const dayA = parseInt(a.selectedDay[1], 10);
        const dayB = parseInt(b.selectedDay[1], 10);

        // Comparar selectedDay[1]
        if (dayA < dayB) return -1;
        if (dayA > dayB) return 1;

        // Si selectedDay[1] es igual, comparar hour
        if (a.hour < b.hour) return -1;
        if (a.hour > b.hour) return 1;

        return 0; // Si son iguales
    });
    const filteredData = sortedMetrics.filter((metric) =>
        profile?.ability.includes(metric.selectedService)
    );
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <Stack
                width={"100%"}
                display="flex"
                flexDirection={"column"}
                flexWrap={"wrap"}
                spacing={1}
            >
                {/* {sessionData?.user?.id}
                {profile?.ability}
                {sessionData?.user.id} */}
                <Typography variant="h5" padding={1}>
                    Solicitudes seleccionadas según tu perfil profesional
                </Typography>
                <Typography variant="body2" padding={1}>
                    Total: {filteredData.length}
                </Typography>
                {/* {selectedSolic} */}
                {filteredData.map((metric, index) => (
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
                                    <Typography
                                        variant="h6"
                                        fontWeight={"bold"}
                                    >
                                        {metric.selectedService}
                                        {metric.selectedDetailService !== "" &&
                                            `, ${metric.selectedDetailService}`}
                                    </Typography>
                                    <Divider variant="middle" />
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "flex-start",
                                            gap: 0.5,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                alignSelf: "flex-start",
                                                paddingX: 1.5,
                                                paddingY: 0.3,
                                                borderRadius: 1,
                                                border: "1px #d9d9d9 solid",
                                                "&:hover": {
                                                    opacity: 0.9,
                                                },
                                                boxShadow:
                                                    "0 0 1px 2px #ffd234",
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
                                        <Box
                                            sx={{
                                                flexDirection: "column",
                                                // alignSelf:"flex-start",
                                                gap: 1,
                                            }}
                                        >
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
                                                    boxShadow:
                                                        "0 0 1px 2px #ffd234",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        pointerEvents: "none",
                                                    }}
                                                    variant="body1"
                                                >
                                                    {metric.hour % 12 || 12}:00
                                                    {metric.hour < 12
                                                        ? "am"
                                                        : "pm"}
                                                </Typography>
                                            </Box>
                                            {metric.isEmergency && (
                                                <Chip
                                                    sx={{ marginTop: 0.5 }}
                                                    label={"¡Emergencia!"}
                                                    color="warning"
                                                    variant="outlined"
                                                />
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 0.5,
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        textAlign={"end"}
                                    >
                                        Ganancias preliminar
                                    </Typography>
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

                                    {metric.isEmergency && (
                                        <Chip
                                            label={"¡25% EXTRA!"}
                                            color="success"
                                            variant="outlined"
                                        />
                                    )}
                                    <Button
                                        onClick={() =>
                                            handleDialogOpen(
                                                metric.selectedService
                                            )
                                        }
                                        variant="contained"
                                    >
                                        Ver detalles
                                    </Button>
                                    <FullScreenSolic
                                        metric={metric}
                                        selectedProduct={selectedSolic}
                                        open={dialogOpen}
                                        onClose={() => setDialogOpen(false)}
                                    />
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
