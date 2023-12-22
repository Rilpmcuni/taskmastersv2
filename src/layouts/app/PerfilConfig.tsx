"use client";
import { useCallback, useEffect, useState } from "react";
import { Typography, Stack, Box, TextField, Button } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Horario from "@/components/function/Horario";
import Image from "next/image";
import BasicTabs from "@/components/ui/BasicTabs";
import { TextFields } from "@mui/icons-material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import ListItemText from "@mui/material/ListItemText";
import ChangeCalendar from "@/components/function/ChangeCalendar";
// supabase

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Avatar from "./ChangeAvatar";
import TextFieldRut from "@/components/ui/TextFieldRut";
import TextFieldPhone from "@/components/ui/TextFieldPhone";
import { SimpleSnackbar } from "@/feedback/SnackBar";
import { useSession } from "@/contexts/SessionContext";
import ContractModal from "@/feedback/ContractModal";

interface UpdateProfileProps {
    lastName: string | null;
    ability: any | null;
    avatar_url: string | null;
    fullname: string | null;
    rut: string | null;
    cellPhone: string | null; // Añade esta línea
}

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
    "Gásfiter",
    "Electricísta",
    "Reparaciones",
    "Remodelación",
    "Instalación",
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

export default function PerfilConfig({ session }: { session: any }) {
    const { requestUpdate } = useSession();

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

    // supabase
    const supabase = createClientComponentClient();
    const [loading, setLoading] = useState(true);
    const [fullname, setFullname] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [schedule, setSchedule] = useState<any | null>(null);
    const [ability, setAbility] = useState<any | null>(null);
    const [avatar_url, setAvatarUrl] = useState(null);
    const [rut, setRut] = useState<string | null>(null);
    const [cellPhone, setCellPhone] = useState<string | null>(null);
    const [banco, setBanco] = useState<string | null>(null);
    const [tipoCuenta, setTipoCuenta] = useState<string | null>(null);
    const [numeroCuenta, setNumeroCuenta] = useState<string | null>(null);

    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const user = session?.user;

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("profiles")
                .select(
                    `full_name, lastName, ability, avatar_url, schedule, rut, cellPhone, banco, tipoCuenta, numeroCuenta` // Add "banco" and "tipoCuenta" here
                )
                .eq("id", user?.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setFullname(data.full_name);
                setLastName(data.lastName);
                setAbility(data.ability);
                setAvatarUrl(data.avatar_url);
                setPersonName(data.ability);
                setSchedule(data.schedule);
                setRut(data.rut);
                setCellPhone(data.cellPhone);
                setBanco(data.banco); // Add this line
                setTipoCuenta(data.tipoCuenta); // Add this line
                setNumeroCuenta(String(data.numeroCuenta)); // Añade esta línea
            }
        } catch (error) {
            console.log("error traer datos");
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile();
    }, [user, getProfile]);

    async function updateProfile({
        lastName,
        ability,
        avatar_url,
        schedule,
        rut,
        cellPhone,
        banco,
        tipoCuenta,
        numeroCuenta, // Añade esta línea
    }: UpdateProfileProps & {
        schedule: any;
        rut: string | null;
        cellPhone: string | null;
        banco: string | null;
        tipoCuenta: string | null;
        numeroCuenta: string | null; // Añade esta línea
    }) {
        setIsSaving(true);
        const { error } = await supabase.from("profiles").upsert({
            id: user?.id,
            full_name: fullname,
            lastName,
            ability: personName,
            avatar_url,
            schedule,
            rut,
            cellPhone,
            banco,
            tipoCuenta,
            numeroCuenta,
            updated_at: new Date().toISOString(),
        });
        requestUpdate();
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    }
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <main>
            {/* <Typography variant="h5">Configuración</Typography>
            <Typography variant="body2">
                Configura en cualquier momento, cuando lo necesites, cuando
                quieras.
            </Typography> */}

            <BasicTabs
                labels={["Perfil", "Calendario", "Facturación"]}
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
                                {user ? (
                                    <Avatar
                                        uid={user.id}
                                        url={avatar_url}
                                        size={150}
                                        onUpload={(url: any) => {
                                            setAvatarUrl(url);
                                        }}
                                    />
                                ) : (
                                    <span>nada</span>
                                )}
                                <Stack
                                    width={"100%"}
                                    direction={"column"}
                                    spacing={1}
                                >
                                    <Stack
                                        width={"100%"}
                                        direction={"column"}
                                        spacing={1}
                                    >
                                        <TextField
                                            sx={{ flexGrow: 1 }}
                                            fullWidth
                                            id="outlined-basic"
                                            label="Nombre"
                                            value={fullname || ""}
                                            onChange={(e) =>
                                                setFullname(e.target.value)
                                            }
                                            variant="outlined"
                                            disabled
                                        />
                                        <TextField
                                            sx={{ flexGrow: 1 }}
                                            fullWidth
                                            id="outlined-basic"
                                            label="Apellido"
                                            value={lastName || ""}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                            disabled
                                        />
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack
                                width={"100%"}
                                direction={"column"}
                                spacing={1}
                            >
                                <TextFieldPhone
                                    value={cellPhone || ""}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setCellPhone(e.target.value)}
                                />
                            </Stack>
                        </Stack>
                        <span className="text-caption">
                            *Comunicate con nosotros para actualizar datos
                            personales
                        </span>
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
                                                            color="secondary"
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
                            Programa tu horario
                        </Typography>

                        <ChangeCalendar
                            schedule={schedule}
                            setSchedule={setSchedule}
                        />
                    </Stack>,
                    <>
                        <span className="text-caption">
                            *Comunicate con nosotros para actualizar datos
                            personales
                        </span>
                        <ContractModal
                            sessionData={session}
                            open={dialogOpen}
                            onClose={() => setDialogOpen(false)}
                        >
                            <Button
                                color="success"
                                onClick={() => setDialogOpen(true)}
                                variant="contained"
                            >
                                Ver Contrato
                            </Button>
                        </ContractModal>
                        <Stack width={"100%"} direction={"column"} spacing={1}>
                            <Typography
                                variant="h5"
                                fontWeight={900}
                                sx={{ flexGrow: 1, width: "100%" }}
                            >
                                Información delicada
                            </Typography>
                            <Stack
                                width={"100%"}
                                direction={"column"}
                                spacing={1}
                            >
                                <TextField
                                    sx={{ flexGrow: 1 }}
                                    fullWidth
                                    id="outlined-basic"
                                    label="Correo"
                                    value={session?.user.email}
                                    disabled
                                    helperText="Contáctanos para cambiarlo."
                                    variant="outlined"
                                />
                                <TextFieldRut
                                    value={rut || ""}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setRut(e.target.value)}
                                    disabled
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="banco-select-label">
                                        Banco
                                    </InputLabel>
                                    <Select
                                        labelId="banco-select-label"
                                        id="banco-select"
                                        value={banco}
                                        label="Banco"
                                        onChange={(e) =>
                                            setBanco(e.target.value)
                                        }
                                    >
                                        <MenuItem value={"BancoEstado"}>
                                            BancoEstado
                                        </MenuItem>
                                        <MenuItem value={"Banco de Chile"}>
                                            Banco de Chile
                                        </MenuItem>
                                        <MenuItem value={"Santander"}>
                                            Santander
                                        </MenuItem>
                                        <MenuItem value={"Tenpo"}>
                                            Tenpo
                                        </MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel id="tipo-cuenta-select-label">
                                        Tipo de Cuenta
                                    </InputLabel>
                                    <Select
                                        labelId="tipo-cuenta-select-label"
                                        id="tipo-cuenta-select"
                                        value={tipoCuenta}
                                        label="Tipo de Cuenta"
                                        onChange={(e) =>
                                            setTipoCuenta(e.target.value)
                                        }
                                    >
                                        <MenuItem value={"Cuenta Rut"}>
                                            Cuenta Rut
                                        </MenuItem>
                                        <MenuItem value={"Cuenta Vista"}>
                                            Cuenta Vista
                                        </MenuItem>
                                        <MenuItem value={"Cuenta Corriente"}>
                                            Cuenta Corriente
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    type="number"
                                    sx={{ flexGrow: 1 }}
                                    fullWidth
                                    id="outlined-basic"
                                    label="N° de cuenta"
                                    value={numeroCuenta || ""}
                                    onChange={(e) =>
                                        setNumeroCuenta(e.target.value)
                                    }
                                    variant="outlined"
                                />
                            </Stack>
                        </Stack>
                    </>,
                ]}
            />
            <Button
                size="large"
                variant="contained"
                onClick={() =>
                    updateProfile({
                        fullname,
                        lastName,
                        ability: personName,
                        avatar_url,
                        schedule,
                        rut,
                        banco,
                        tipoCuenta,
                        cellPhone,
                        numeroCuenta,
                    })
                }
                disabled={loading || isSaving}
                fullWidth={true}
                startIcon={
                    isSaving ? (
                        <CircularProgress size={20} />
                    ) : saveSuccess ? (
                        <CheckCircleRoundedIcon />
                    ) : null
                }
                color={saveSuccess ? "success" : "primary"}
            >
                {isSaving
                    ? "Guardando..."
                    : saveSuccess
                    ? "¡Datos actualizados!"
                    : loading
                    ? "Cargando ..."
                    : "Guardar cambios"}
            </Button>
            {/* <SimpleSnackbar
                onClick={() =>
                    updateProfile({
                        fullname,
                        lastName,
                        ability: personName,
                        avatar_url,
                        schedule,
                        rut,
                        banco,
                        tipoCuenta,
                        cellPhone,
                    })
                }
                fullWidth={true}
                message={"¡Datos actualizados!"}
                disabled={loading}
            >
                {loading ? "Cargando ..." : "Guardar cambios"}
            </SimpleSnackbar> */}
        </main>
    );
}
//
//
//
//
//
//
//
