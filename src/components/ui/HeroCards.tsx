import { useSession } from "@/contexts/SessionContext";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { darken } from "@mui/system";
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
    const theme = useTheme();
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
                        opacity: 0.8,
                        backgroundImage: `repeating-radial-gradient( circle at 0 0, transparent 0, #ffffff 32px ), repeating-linear-gradient( #ffdb5c55, #449aff )`,
                        color: darken(theme.palette.text.primary, 0.6),
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
                    <Card
                        variant="outlined"
                        sx={{
                            backgroundColor: `${
                                publishedData.length > 0
                                    ? `${theme.palette.info.light}50`
                                    : "#E0E0E0"
                            }`,
                            opacity: 0.8,

                            background: `radial-gradient(circle, transparent 20%, ${
                                publishedData.length > 0 ? `#cea8cc` : "#E0E0E0"
                            } 20%, ${
                                publishedData.length > 0 ? `#cea8cc` : "#E0E0E0"
                            } 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, ${
                                publishedData.length > 0 ? `#cea8cc` : "#E0E0E0"
                            } 20%, ${
                                publishedData.length > 0 ? `#cea8cc` : "#E0E0E0"
                            } 80%, transparent 80%, transparent) 60px 60px, linear-gradient(${
                                publishedData.length > 0
                                    ? theme.palette.info.light
                                    : "#AFAFAF"
                            } 4.800000000000001px, transparent 4.800000000000001px) 0 -2.4000000000000004px, linear-gradient(90deg, ${
                                publishedData.length > 0
                                    ? theme.palette.info.light
                                    : "#AFAFAF"
                            } 4.800000000000001px, ${
                                publishedData.length > 0 ? `#cea8cc` : "#E0E0E0"
                            } 4.800000000000001px) -2.4000000000000004px 0`,
                            backgroundSize:
                                "120px 120px, 120px 120px, 60px 60px, 60px 60px",
                            color: darken(
                                publishedData.length > 0
                                    ? theme.palette.info.dark
                                    : "#000",
                                0.6
                            ),
                        }}
                    >
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
                    <Card
                        variant="outlined"
                        sx={{
                            backgroundColor: `${
                                solicitedDataSolicited.length > 0
                                    ? `${theme.palette.primary.light}50`
                                    : "#E0E0E0"
                            }`,
                            opacity: 0.8,
                            background: `repeating-linear-gradient( 45deg, ${
                                solicitedDataSolicited.length > 0
                                    ? `${theme.palette.primary.light}`
                                    : "#AFAFAF"
                            }, ${
                                solicitedDataSolicited.length > 0
                                    ? `${theme.palette.primary.light}`
                                    : "#AFAFAF"
                            } 20px, ${
                                solicitedDataSolicited.length > 0
                                    ? `${theme.palette.primary.light}50`
                                    : "#E0E0E0"
                            } 20px, ${
                                solicitedDataSolicited.length > 0
                                    ? `${theme.palette.primary.light}50`
                                    : "#E0E0E0"
                            } 100px )`,
                            color: darken(
                                publishedData.length > 0
                                    ? theme.palette.primary.dark
                                    : "#000",
                                0.6
                            ),
                        }}
                    >
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
                                    // color: theme.palette.success.dark,
                                }}
                            >
                                <SlotCounter
                                    value={solicitedDataSolicited.length}
                                    sequentialAnimationMode
                                    useMonospaceWidth
                                    charClassName="charMini"
                                    separatorClassName="sepaMini"
                                />
                                <Typography variant="body1">
                                    Trabajos solicitados
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card
                        variant="outlined"
                        sx={{
                            backgroundColor: `${
                                solicitedDataSolicited.length > 0
                                    ? `${theme.palette.error.light}50`
                                    : "#E0E0E0"
                            }`,
                            opacity: 0.8,
                            backgroundImage: `linear-gradient(${
                                solicitedDataSolicited.length > 0
                                    ? `${theme.palette.error.light}`
                                    : "#AFAFAF"
                            } 4px, transparent 4px), linear-gradient(to right, ${
                                solicitedDataSolicited.length > 0
                                    ? `${theme.palette.error.light}`
                                    : "#AFAFAF"
                            } 4px, ${
                                solicitedDataSolicited.length > 0
                                    ? `${theme.palette.error.light}50`
                                    : "#E0E0E0"
                            } 4px)`,
                            backgroundSize: "80px 80px",
                            color: darken(
                                publishedData.length > 0
                                    ? theme.palette.error.dark
                                    : "#000",
                                0.6
                            ),
                        }}
                    >
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
                    <Card
                        variant="outlined"
                        sx={{
                            backgroundColor: `${
                                solicitedDataInProgress.length > 0
                                    ? `${theme.palette.success.light}50`
                                    : "#E0E0E0"
                            }`,
                            opacity: 0.8,
                            background: `repeating-linear-gradient( -45deg, ${
                                solicitedDataInProgress.length > 0
                                    ? `${theme.palette.success.light}`
                                    : "#AFAFAF"
                            }, ${
                                solicitedDataInProgress.length > 0
                                    ? `${theme.palette.success.light}`
                                    : "#AFAFAF"
                            } 20px, ${
                                solicitedDataInProgress.length > 0
                                    ? `${theme.palette.success.light}50`
                                    : "#E0E0E0"
                            } 20px, ${
                                solicitedDataInProgress.length > 0
                                    ? `${theme.palette.success.light}50`
                                    : "#E0E0E0"
                            } 100px )`,
                            color: darken(
                                publishedData.length > 0
                                    ? theme.palette.success.dark
                                    : "#000",
                                0.6
                            ),
                        }}
                    >
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
