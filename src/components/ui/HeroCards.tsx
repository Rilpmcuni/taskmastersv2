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
export default function HeroCards() {
    const { sessionData, metrics, profile } = useSession();

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

    const solicitedDataFiltered = solicitedData.filter(
        (metric) => metric.status === "solicited"
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
                    <CardActionArea>
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography>Trabajos finalizados</Typography>
                            <SlotCounter
                                value="12"
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
                    <LinkMui
                        component={Link}
                        href={"/app/metricas/solicitudes"}
                        sx={{
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
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
                                        value={publishedData.length}
                                        sequentialAnimationMode
                                        useMonospaceWidth
                                        duration={2}
                                        charClassName="charMini"
                                        separatorClassName="sepaMini"
                                    />
                                    <Typography>
                                        Solicitudes recibidas
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </LinkMui>
                </Grid>
                <Grid item xs={6}>
                    <LinkMui
                        component={Link}
                        href={"/app/metricas/trabajos"}
                        sx={{
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
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
                                        value={solicitedDataFiltered.length}
                                        sequentialAnimationMode
                                        useMonospaceWidth
                                        duration={3}
                                        charClassName="charMini"
                                        separatorClassName="sepaMini"
                                    />
                                    <Typography>Trabajos activos</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </LinkMui>
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
                                    value="23"
                                    sequentialAnimationMode
                                    useMonospaceWidth
                                    duration={4}
                                    charClassName="charMini"
                                    separatorClassName="sepaMini"
                                />
                                <Typography>Cotizaciones enviadas</Typography>
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
                                    duration={5}
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
            </Grid>
        </>
    );
}
