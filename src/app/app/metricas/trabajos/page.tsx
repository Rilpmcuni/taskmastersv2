"use client";
import React, { useMemo, useState } from "react";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import FullScreenTrabajoSolic from "@/feedback/FullScreenTrabajoSolic";
import FullScreenTrabajoInProc from "@/feedback/FullScreenTrabajoInProc";
import FullScreenTrabajoInFini from "@/feedback/FullScreenTrabajoInFini";
import { useSession } from "@/contexts/SessionContext";
import BasicTabs from "@/components/ui/BasicTabs";
interface MetricCardProps {
    metric: {
        id: any;
        price: { value: number }[];
        isEmergency: boolean;
        selectedService: string;
        selectedDetailService: string;
        selectedDay: string[];
        hour: number;
        // Agrega aquí las demás propiedades de 'metric' con sus respectivos tipos
    };
    index: number;
    openDialogId: number | null;
    setOpenDialogId: (id: number | null) => void;
}
const calculatePreliminaryCost = (metric: {
    price: any[];
    isEmergency: any;
}) => {
    const total = metric.price.reduce(
        (sum: number, item: { value: number }) => sum + item.value,
        0
    );
    let emergencyFee = 0;
    if (metric.isEmergency) {
        emergencyFee = total * 0.5;
    }
    return total + emergencyFee;
};
interface NothingCardProps {
    on: string;
}

const MetricCard = ({
    metric,
    index,
    openDialogId,
    setOpenDialogId,
}: MetricCardProps) => {
    const preliminaryCost = calculatePreliminaryCost(metric);
    return (
        <Grid item xs={12}>
            <Card key={index} variant="outlined">
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
                            <Typography variant="h6" fontWeight={"bold"}>
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
                                        boxShadow: "0 0 1px 2px #ffd234",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            pointerEvents: "none",
                                        }}
                                        variant="caption"
                                    >
                                        {metric.selectedDay[0].replace(
                                            /\./g,
                                            ""
                                        )}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            pointerEvents: "none",
                                        }}
                                        variant="body1"
                                        fontWeight={"bold"}
                                    >
                                        {metric.selectedDay[1]}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            pointerEvents: "none",
                                        }}
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
                                            boxShadow: "0 0 1px 2px #ffd234",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                pointerEvents: "none",
                                            }}
                                            variant="body1"
                                        >
                                            {metric.hour % 12 || 12}
                                            :00
                                            {metric.hour < 12 ? "am" : "pm"}
                                        </Typography>
                                    </Box>
                                    {metric.isEmergency && (
                                        <Chip
                                            sx={{
                                                marginTop: 0.5,
                                            }}
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
                            <Chip
                                label={preliminaryCost.toLocaleString("es-CL", {
                                    style: "currency",
                                    currency: "CLP",
                                })}
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
                                    label={"¡50% EXTRA!"}
                                    color="success"
                                    variant="outlined"
                                />
                            )}
                            <Button
                                onClick={() => setOpenDialogId(index)}
                                variant="contained"
                            >
                                Ver detalles
                            </Button>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
            <FullScreenTrabajoSolic
                // key={index}
                metric={metric}
                open={openDialogId === index}
                onClose={() => setOpenDialogId(null)}
            />
        </Grid>
    );
};
const NothingCard = ({ on }: NothingCardProps) => {
    return (
        <Grid item xs={12}>
            <Alert severity="info">
                <AlertTitle>Oh...</AlertTitle>
                Aún sin Trabajos <strong>{on}</strong>
            </Alert>
        </Grid>
    );
};

export default function Home() {
    const [openDialogId, setOpenDialogId] = useState<number | null>(null);
    const { metrics, sessionData } = useSession();

    const sortedMetrics = useMemo(() => {
        const result = metrics ? [...metrics] : [];
        result.sort((a, b) => {
            const dayA = parseInt(a.selectedDay[1], 10);
            const dayB = parseInt(b.selectedDay[1], 10);

            if (dayA < dayB) return -1;
            if (dayA > dayB) return 1;

            if (a.hour < b.hour) return -1;
            if (a.hour > b.hour) return 1;

            return 0;
        });
        return result;
    }, [metrics]);

    const filteredData = useMemo(() => {
        return sortedMetrics.filter(
            (metric) => metric.user_id === sessionData?.user?.id
        );
    }, [sortedMetrics]);
    const solicdDataiteundefined = useMemo(() => {
        return filteredData.filter((metric) => metric.status === "solicited");
    }, [filteredData]);

    const inProgressData = useMemo(() => {
        return filteredData.filter((metric) => metric.status === "inProgress");
    }, [filteredData]);

    const finalizedData = useMemo(() => {
        return filteredData.filter((metric) => metric.status === "finalized");
    }, [filteredData]);

    return (
        <main>
            <Box>
                <Stack
                    width={"100%"}
                    display="flex"
                    flexDirection={"column"}
                    flexWrap={"wrap"}
                    direction={"column"}
                    spacing={1}
                >
                    <Typography
                        variant="h5"
                        paddingTop={1}
                        paddingX={1}
                        paddingBottom={0}
                    >
                        Lista de trabajos
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        paddingTop={0}
                        paddingX={1}
                        // paddingBottom={1}
                    >
                        Acá puedes ver el estado de tus trabajos
                    </Typography>
                </Stack>
                <BasicTabs
                    labels={["Solicitados", "En proceso", "Finalizados"]}
                    contents={[
                        <Grid container spacing={0.5}>
                            {solicdDataiteundefined.length > 0 ? (
                                solicdDataiteundefined.map((metric, index) => (
                                    <MetricCard
                                        key={index}
                                        metric={metric}
                                        index={index}
                                        setOpenDialogId={setOpenDialogId}
                                        openDialogId={openDialogId}
                                    />
                                ))
                            ) : (
                                <NothingCard on={"Solicitados"} />
                            )}
                        </Grid>,
                        <Grid container spacing={0.5}>
                            {inProgressData.length > 0 ? (
                                inProgressData.map((metric, index) => (
                                    <MetricCard
                                        key={index}
                                        metric={metric}
                                        index={index}
                                        setOpenDialogId={setOpenDialogId}
                                        openDialogId={openDialogId}
                                    />
                                ))
                            ) : (
                                <NothingCard on={"En proceso"} />
                            )}
                        </Grid>,
                        <Grid container spacing={0.5}>
                            {finalizedData.length > 0 ? (
                                finalizedData.map((metric, index) => (
                                    <MetricCard
                                        key={index}
                                        metric={metric}
                                        index={index}
                                        setOpenDialogId={setOpenDialogId}
                                        openDialogId={openDialogId}
                                    />
                                ))
                            ) : (
                                <NothingCard on={"Finalizados"} />
                            )}
                        </Grid>,
                    ]}
                />
            </Box>
        </main>
    );
}
