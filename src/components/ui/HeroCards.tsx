import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import React from "react";
import SlotCounter from "react-slot-counter";
export default function HeroCards() {
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
                                // alignItems: "center",
                                // textAlign: "center",
                            }}
                        >
                            <Typography>Trabajos cerrados</Typography>
                            <SlotCounter
                                value="12"
                                startValue={"0"}
                                // dummyCharacters={"450.000".split("")}
                                // duration={}
                                charClassName="charMd"
                                separatorClassName="sepaMd"
                            />
                            <Typography variant="caption">Los clientes han indicado que han cerrado contigo</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid container spacing={0.5}>
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
                                    startValue={"00"}
                                    // dummyCharacters={"450.000".split("")}
                                    duration={2}
                                    charClassName="charMini"
                                    separatorClassName="sepaMini"
                                />
                                <Typography>Solicitudes recibidas</Typography>
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
                                    value="43"
                                    startValue={"00"}
                                    // dummyCharacters={"450.000".split("")}
                                    duration={3}
                                    charClassName="charMini"
                                    separatorClassName="sepaMini"
                                />
                                <Typography>Personas contactadas</Typography>
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
                                    value="23"
                                    startValue={"00"}
                                    // dummyCharacters={"450.000".split("")}
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
                                    startValue={"00"}
                                    // dummyCharacters={"450.000".split("")}
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