"use client";
import { useState } from "react";
import { Typography, Stack, Box, TextField } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Horario from "@/components/function/Horario";
import Image from "next/image";
import BasicTabs from "@/components/ui/BasicTabs";
import { TextFields } from "@mui/icons-material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import ListItemText from "@mui/material/ListItemText";
import ChangeCalendar from "@/components/function/ChangeCalendar";
// chip

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    "Gasfitería",
    "Electricista",
    "Instalaciones",
    "Mantención/reparacion Artefactos",
    "Pintor",
    "Carpintero",
    "Cerrajería",
    "Vidriero",
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

// chip

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
    // chip
    const theme = useTheme();
    const [personName, setPersonName] = useState<string[]>([]);

    const handleChangeChip = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    // chip
    return (
        <main>
            <Typography variant="h5">Configuración</Typography>
            <Typography variant="body2">
                Configura en cualquier momento, cuando lo necesites, cuando
                quieras.
            </Typography>

            <BasicTabs
                labels={["Perfil", "Calendario", "Usuario"]}
                contents={[
                    <Stack
                        spacing={2}
                        direction="row"
                        useFlexGap
                        flexWrap="wrap"
                        justifyContent={"center"}
                    >
                        <Stack width={"100%"} direction={"column"} spacing={1}>
                            <Typography
                                variant="h5"
                                fontWeight={900}
                                sx={{ flexGrow: 1, width: "100%" }}
                            >
                                Perfíl
                            </Typography>
                            <Stack width={"100%"} direction={"row"} spacing={1}>
                                <Image
                                    style={{
                                        pointerEvents: "none",
                                        borderRadius: "99rem",
                                    }}
                                    className=""
                                    src="/images/aver/person.jpg"
                                    alt="Reviasa"
                                    width={133}
                                    height={133}
                                />
                                <Stack
                                    width={"100%"}
                                    direction={"column"}
                                    spacing={1}
                                >
                                    <Stack
                                        width={"100%"}
                                        direction={"row"}
                                        spacing={1}
                                    >
                                        <TextField
                                            sx={{ flexGrow: 1 }}
                                            fullWidth
                                            id="outlined-basic"
                                            label="Nombre"
                                            value={"Christian"}
                                            variant="outlined"
                                        />
                                        <TextField
                                            sx={{ flexGrow: 1 }}
                                            fullWidth
                                            id="outlined-basic"
                                            label="Apellidos"
                                            value={"Lisantti"}
                                            variant="outlined"
                                        />
                                    </Stack>
                                    <TextField
                                        sx={{ flexGrow: 1 }}
                                        fullWidth
                                        id="outlined-basic"
                                        label="Correo"
                                        value={"Fabian.Lisantti@gmail.com"}
                                        variant="outlined"
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack width={"100%"} direction={"column"} spacing={1}>
                            <Typography
                                variant="h5"
                                fontWeight={900}
                                sx={{ flexGrow: 1, width: "100%" }}
                            >
                                Habilidades
                            </Typography>
                            <Stack width={"100%"} direction={"row"} spacing={1}>
                                <Stack
                                    width={"100%"}
                                    direction={"column"}
                                    spacing={1}
                                >
                                    <Stack
                                        width={"100%"}
                                        direction={"row"}
                                        spacing={1}
                                    >
                                        <TextField
                                            sx={{ flexGrow: 1 }}
                                            fullWidth
                                            id="outlined-basic"
                                            label="Nombre"
                                            value={"Christian"}
                                            variant="outlined"
                                        />
                                        <TextField
                                            sx={{ flexGrow: 1 }}
                                            fullWidth
                                            id="outlined-basic"
                                            label="Apellidos"
                                            value={"Lisantti"}
                                            variant="outlined"
                                        />
                                    </Stack>
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <InputLabel id="demo-multiple-chip-label">
                                            Habilidades
                                        </InputLabel>
                                        <Select
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            multiple
                                            value={personName}
                                            onChange={handleChangeChip}
                                            input={
                                                <OutlinedInput
                                                    id="select-multiple-chip"
                                                    label="Habilidades"
                                                />
                                            }
                                            renderValue={(selected) => (
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexWrap: "wrap",
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    {selected.map((value) => (
                                                        <Chip
                                                            key={value}
                                                            label={value}
                                                        />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {names.map((name) => (
                                                <MenuItem
                                                    dense
                                                    key={name}
                                                    value={name}
                                                    style={getStyles(
                                                        name,
                                                        personName,
                                                        theme
                                                    )}
                                                >
                                                    <Checkbox
                                                        sx={{
                                                            ml: -1,
                                                        }}
                                                        checked={
                                                            personName.indexOf(
                                                                name
                                                            ) > -1
                                                        }
                                                    />
                                                    <ListItemText
                                                        primary={name}
                                                    />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Stack>
                        </Stack>
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

                        <ChangeCalendar />
                    </Stack>,
                    <span>En construcción</span>,
                ]}
            />
        </main>
    );
}
