"use client";
import { Typography, Stack, Box, TextField } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Horario from "@/components/function/Horario";
import Image from "next/image";
import BasicTabs from "@/components/ui/BasicTabs";
import { TextFields } from "@mui/icons-material";
import { useState } from "react";
export default function Home() {
    const [state, setState] = useState({
        gilad: true,
        jason: false,
        antoine: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const { gilad, jason, antoine } = state;
    const error = [gilad, jason, antoine].filter((v) => v).length !== 2;
    return (
        <main>
            <Typography variant="h5">Hola, "nombre de unsuario" 👋</Typography>
            <Image
                style={{ pointerEvents: "none", borderRadius: "99rem" }}
                className=""
                src="/images/aver/person.jpg"
                alt="Reviasa"
                width={133}
                height={133}
                priority
            />
            <BasicTabs
                labels={["Perfil", "Calendario", "Usuario"]}
                contents={[
                    <Stack
                        spacing={{ xs: 1, sm: 2 }}
                        direction="row"
                        useFlexGap
                        flexWrap="wrap"
                        justifyContent={"center"}
                    >
                        <Typography
                            variant="h5"
                            fontWeight={900}
                            sx={{ flexGrow: 1, width: "100%" }}
                        >
                            configura tu horario
                        </Typography>
                        <TextField
                            sx={{ flexGrow: 1 }}
                            fullWidth
                            id="outlined-basic"
                            label="Outlined"
                            variant="outlined"
                        />

                        <Typography
                            variant="h5"
                            fontWeight={900}
                            sx={{ flexGrow: 1, width: "100%" }}
                        >
                            Granulometría
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={900}
                            sx={{ flexGrow: 1, width: "100%" }}
                        >
                            Hormigón
                        </Typography>
                        <Box sx={{ width: "100%", paddingX: 2, paddingY: 1 }}>
                            <Typography
                                id="slider-asentamiento-de-hormigon"
                                gutterBottom
                                color="InactiveCaptionText"
                                sx={{ paddingBottom: "2rem" }}
                            >
                                Asentamiento de Hormigón
                            </Typography>
                        </Box>
                    </Stack>,

                    <Stack
                        spacing={{ xs: 1, sm: 2 }}
                        direction="row"
                        useFlexGap
                        flexWrap="wrap"
                        justifyContent={"center"}
                    >
                        <Typography
                            variant="h6"
                            fontWeight={900}
                            sx={{ flexGrow: 1, width: "100%" }}
                        >
                            Configura tu horario
                        </Typography>
                        <FormControl
                            sx={{ m: 3 }}
                            component="fieldset"
                            variant="standard"
                        >
                            <FormLabel component="legend">
                                Assign responsibility
                            </FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={gilad}
                                            onChange={handleChange}
                                            name="gilad"
                                        />
                                    }
                                    label="Gilad Gray"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={jason}
                                            onChange={handleChange}
                                            name="jason"
                                        />
                                    }
                                    label="Jason Killian"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={antoine}
                                            onChange={handleChange}
                                            name="antoine"
                                        />
                                    }
                                    label="Antoine Llorca"
                                />
                            </FormGroup>
                            <FormHelperText>Be careful</FormHelperText>
                        </FormControl>
                        <TextField
                            sx={{ flexGrow: 1 }}
                            fullWidth
                            id="outlined-basic"
                            label="Outlined"
                            variant="outlined"
                        />

                        <Typography
                            variant="h5"
                            fontWeight={900}
                            sx={{ flexGrow: 1, width: "100%" }}
                        >
                            Granulometría
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={900}
                            sx={{ flexGrow: 1, width: "100%" }}
                        >
                            Hormigón
                        </Typography>
                        <Box sx={{ width: "100%", paddingX: 2, paddingY: 1 }}>
                            <Typography
                                id="slider-asentamiento-de-hormigon"
                                gutterBottom
                                color="InactiveCaptionText"
                                sx={{ paddingBottom: "2rem" }}
                            >
                                Asentamiento de Hormigón
                            </Typography>
                        </Box>
                    </Stack>,
                    <span>En construcción</span>,
                ]}
            />
            <Horario />
        </main>
    );
}
