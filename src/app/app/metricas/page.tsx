"use client";

import Link from "next/link";

import SlotCounter from "react-slot-counter";

import HeroCards from "@/components/ui/HeroCards";
import {
    Card,
    CardActionArea,
    CardContent,
    Divider,
    Grid,
    Typography,
} from "@mui/material";
export default function Home() {
    return (
        <main>
            <Grid
                item
                xs={12}
                sx={{
                    margin: "0.5rem",
                }}
            >
                <Card
                    variant="outlined"
                    sx={{
                        background:
                            "rgba(255,219,92,1)",
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
                                value="$398,000"
                                startValue={"0"}
                                // containerClassName="conta"
                                // dummyCharacters={"450.000".split("")}
                                // duration={}
                                charClassName="char"
                                separatorClassName="sepa"
                            />
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Typography
                    variant="caption"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        // alignSelf: "flex-end",
                        // justifySelf: "flex-end",
                        textAlign: "end",
                    }}
                >
                    Ganacias en curso
                </Typography>
            </Grid>
            <Divider
                variant="middle"
                sx={{
                    marginBottom: "0.5rem",
                }}
            />
            <HeroCards />
        </main>
    );
}
