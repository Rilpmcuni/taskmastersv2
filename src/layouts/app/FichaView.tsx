"use client";
import { useCallback, useEffect, useState } from "react";
import { Typography, Stack, Box, TextField, Button } from "@mui/material";
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
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
// supabase

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Avatar from "./ChangeAvatar";
import TextFieldRut from "@/components/ui/TextFieldRut";
import TextFieldPhone from "@/components/ui/TextFieldPhone";
import { SimpleSnackbar } from "@/feedback/SnackBar";
import AvatarUser from "@/components/ui/AvatarUser";
import CalendarView from "./CalendarView";

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




// chip

export default function FichaView({ session }: { session: any }) {
    const [state, setState] = useState({
        gilad: true,
        jason: false,
        antoine: false,
    });

    const { gilad, jason, antoine } = state;
    const error = [gilad, jason, antoine].filter((v) => v).length !== 2;
    // chip
    const [personName, setPersonName] = useState<string[]>([]);



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
    const user = session?.user;

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("profiles")
                .select(
                    `full_name, lastName, ability, avatar_url, schedule, rut, cellPhone`
                ) // Agrega "cellPhone" aquí
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
                setCellPhone(data.cellPhone); // Añade esta línea
            }
        } catch (error) {
            // alert("Error loading user data!");
            // setLastName("Error");
            console.log("error traer datos");
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile();
    }, [user, getProfile]);

    return (
        <>
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
                            <Stack
                                width={"100%"}
                                direction={"column"}
                                alignItems={"center"}
                                spacing={1}
                            >
                                <AvatarUser size={200} />
                                <Stack
                                    width={"100%"}
                                    direction={"column"}
                                    spacing={1}
                                >
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                        }}
                                        variant="h5"
                                    >
                                        {fullname}, {lastName}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                        }}
                                        variant="body2"
                                        gutterBottom
                                    >
                                        {rut}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 0.5,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {personName.map((value) => (
                                            <Chip
                                                color="secondary"
                                                key={value}
                                                label={value}
                                            />
                                        ))}
                                    </Box>
                                    <Stack
                                        width={"100%"}
                                        direction={"column"}
                                        spacing={0.5}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            Contacto:
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                gap: 1,
                                            }}
                                        >
                                            <WhatsAppIcon />
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                }}
                                                variant="body1"
                                            >
                                                +56 {cellPhone}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                gap: 1,
                                            }}
                                        >
                                            <MailOutlineRoundedIcon />
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                }}
                                                variant="body1"
                                                gutterBottom
                                            >
                                                {session?.user.email}
                                            </Typography>
                                        </Box>
                                    </Stack>
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
                            Horario actual
                        </Typography>

                        <CalendarView
                            schedule={schedule}
                            setSchedule={setSchedule}
                        />
                    </Stack>,
                    <span>En construcción</span>,
                ]}
            />
        </>
    );
}
//
//
//
//
//
//
//
