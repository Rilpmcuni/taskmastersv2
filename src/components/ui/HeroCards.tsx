import { useSession } from "@/contexts/SessionContext";
import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import { Link as LinkMui } from "@mui/material";
import Link from "next/link";
import React from "react";
import SlotCounter from "react-slot-counter";
export default function HeroCards({
    sessionData,
    metrics,
    profile,
}: {
    sessionData: any;
    metrics: any;
    profile: any;
}) {
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

    const publishedData = filteredData.filter(
        (metric) => metric.status === "published"
    );

    const solicitedData = sortedMetrics.filter(
        (metric) => metric.user_id === sessionData?.user?.id
    );

    const solicitedDataSolicited = solicitedData.filter(
        (metric) => metric.status === "solicited"
    );

    const solicitedDataInProgress = solicitedData.filter(
        (metric) => metric.status === "inProgress"
    );

    const solicitedDataFinalized = solicitedData.filter(
        (metric) => metric.status === "finalized"
    );

    return (
        <>
            <Grid item xs={12}>
                <Card
                    variant="outlined"
                    sx={{
                        margin: "0.5rem",
                    }}
                >
                    <CardActionArea
                        LinkComponent={Link}
                        href={"/app/metricas/trabajos?tab=2"}
                        sx={{
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography>Trabajos finalizados</Typography>
                            <SlotCounter
                                value={solicitedDataFinalized.length}
                                sequentialAnimationMode
                                useMonospaceWidth
                                charClassName="charMd"
                                separatorClassName="sepaMd"
                            />
                            <Typography variant="caption">
                                Los clientes han indicado que han finalizado
                                contigo
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid container spacing={0.5}>
                <Grid item xs={6}>
                    <Card variant="outlined">
                        <CardActionArea
                            LinkComponent={Link}
                            href={"/app/metricas/solicitudes"}
                            sx={{
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                            >
                                <SlotCounter
                                    value={publishedData.length}
                                    sequentialAnimationMode
                                    useMonospaceWidth
                                    charClassName="charMini"
                                    separatorClassName="sepaMini"
                                />
                                <Typography>Solicitudes abiertas</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card variant="outlined">
                        <CardActionArea
                            LinkComponent={Link}
                            href={"/app/metricas/trabajos"}
                            sx={{
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                            >
                                <SlotCounter
                                    value={solicitedDataSolicited.length}
                                    sequentialAnimationMode
                                    useMonospaceWidth
                                    charClassName="charMini"
                                    separatorClassName="sepaMini"
                                />
                                <Typography>Trabajos solicitados</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card variant="outlined">
                        <CardActionArea>
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                            >
                                <SlotCounter
                                    value="12"
                                    sequentialAnimationMode
                                    useMonospaceWidth
                                    charClassName="charMini"
                                    separatorClassName="sepaMini"
                                />
                                <Typography>
                                    Valoraciones de clientes
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card variant="outlined">
                        <CardActionArea
                            LinkComponent={Link}
                            href={"/app/metricas/trabajos?tab=1"}
                            sx={{
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                            >
                                <SlotCounter
                                    value={solicitedDataInProgress.length}
                                    sequentialAnimationMode
                                    useMonospaceWidth
                                    charClassName="charMini"
                                    separatorClassName="sepaMini"
                                />
                                <Typography>Trabajos activos</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}
